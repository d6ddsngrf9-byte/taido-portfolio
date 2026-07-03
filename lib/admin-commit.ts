import sharp from 'sharp';
import type { Category } from './categories';

const OWNER = process.env.GITHUB_OWNER || 'd6ddsngrf9-byte';
const REPO = process.env.GITHUB_REPO || 'taido-portfolio';
const BRANCH = process.env.GITHUB_BRANCH || 'main';
const API = 'https://api.github.com';

export type WorkMeta = {
  id: string;
  client: string;
  year: string;
  description: string;
  category: Category;
};

type TreeItem = {
  path: string;
  mode: '100644';
  type: 'blob';
  sha?: string;
  content?: string;
};

async function ghJson<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
    cache: 'no-store',
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub ${res.status} @ ${path}: ${body.slice(0, 200)}`);
  }
  return res.json() as Promise<T>;
}

// 長辺1600pxに縮小し JPEG(q80) に。EXIF回転も反映。
async function optimize(buffer: Buffer): Promise<Buffer> {
  return sharp(buffer)
    .rotate()
    .resize(1600, 1600, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 80 })
    .toBuffer();
}

// 画像を圧縮しつつ works.json に1件追加し、GitHubへ「1コミット」で反映する。
export async function commitNewWork(meta: WorkMeta, imageBuffers: Buffer[]) {
  if (!process.env.GITHUB_TOKEN) throw new Error('GITHUB_TOKEN未設定');

  // 1. 画像を最適化して blob 候補に
  const imagePaths: string[] = [];
  const imageItems: { path: string; base64: string }[] = [];
  let i = 0;
  for (const buf of imageBuffers) {
    i += 1;
    const optimized = await optimize(buf);
    const fileName = `${meta.id}-${i}.jpg`;
    imageItems.push({ path: `public/works/${fileName}`, base64: optimized.toString('base64') });
    imagePaths.push(`/works/${fileName}`);
  }

  // 2. 現在の works.json を取得して追記
  const fileMeta = await ghJson<{ content: string }>(
    `/repos/${OWNER}/${REPO}/contents/content/works.json?ref=${BRANCH}`
  );
  const works = JSON.parse(Buffer.from(fileMeta.content, 'base64').toString('utf-8')) as unknown[];
  // 同じIDが既にあれば拒否（連続送信などによる二重登録を防ぐ）
  if ((works as { id?: string }[]).some((w) => w?.id === meta.id)) {
    throw new Error(`ID「${meta.id}」は既に使われています。別のIDにしてください。`);
  }
  works.push({
    id: meta.id,
    client: meta.client,
    year: meta.year,
    description: meta.description,
    category: meta.category,
    images: imagePaths,
    coverImage: imagePaths[0] ?? '',
  });
  const worksContent = JSON.stringify(works, null, 2) + '\n';

  // 3. 最新コミットとベースツリー
  const ref = await ghJson<{ object: { sha: string } }>(
    `/repos/${OWNER}/${REPO}/git/ref/heads/${BRANCH}`
  );
  const latestSha = ref.object.sha;
  const latestCommit = await ghJson<{ tree: { sha: string } }>(
    `/repos/${OWNER}/${REPO}/git/commits/${latestSha}`
  );

  // 4. 画像を blob 化してツリー項目に
  const tree: TreeItem[] = [];
  for (const item of imageItems) {
    const blob = await ghJson<{ sha: string }>(`/repos/${OWNER}/${REPO}/git/blobs`, {
      method: 'POST',
      body: JSON.stringify({ content: item.base64, encoding: 'base64' }),
    });
    tree.push({ path: item.path, mode: '100644', type: 'blob', sha: blob.sha });
  }
  // works.json はインライン内容で
  tree.push({ path: 'content/works.json', mode: '100644', type: 'blob', content: worksContent });

  // 5. ツリー作成
  const newTree = await ghJson<{ sha: string }>(`/repos/${OWNER}/${REPO}/git/trees`, {
    method: 'POST',
    body: JSON.stringify({ base_tree: latestCommit.tree.sha, tree }),
  });

  // 6. コミット作成
  const commit = await ghJson<{ sha: string }>(`/repos/${OWNER}/${REPO}/git/commits`, {
    method: 'POST',
    body: JSON.stringify({
      message: `作品追加: ${meta.client}（${meta.id}）`,
      tree: newTree.sha,
      parents: [latestSha],
    }),
  });

  // 7. ブランチを進める（→ Vercelが再ビルド）
  await ghJson(`/repos/${OWNER}/${REPO}/git/refs/heads/${BRANCH}`, {
    method: 'PATCH',
    body: JSON.stringify({ sha: commit.sha }),
  });

  return { id: meta.id, commit: commit.sha, imagePaths };
}
