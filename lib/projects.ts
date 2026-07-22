import fs from 'fs';
import path from 'path';
import type { Category } from './categories';
export type { Category } from './categories';
export { CATEGORIES } from './categories';

export type Credit = { role: string; name: string };

export type WorkImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
  /** 裏面。あると拡大表示のなかで表裏を切り替えられる */
  back?: { src: string; alt: string };
};

export type Work = {
  slug: string;
  title: string;
  year: string;
  client?: string;
  categories: Category[];
  services?: string[];
  lead: string;
  // ケーススタディ本文（データがある項目のみ表示する）
  challenge?: string;
  approach?: string;
  design?: string;
  deliverables?: string[];
  outcome?: string;
  credits?: Credit[];
  thumbnail: WorkImage;
  images: WorkImage[];
  featured?: boolean;
  order?: number;
  publishedAt?: string;
};

export function getWorks(): Work[] {
  const filePath = path.join(process.cwd(), 'content/works.json');
  const data = fs.readFileSync(filePath, 'utf-8');
  const works = JSON.parse(data) as Work[];
  // 表示順: order 昇順 → 未指定は後ろ。同順は記載順を維持（安定ソート）
  return works
    .map((w, i) => ({ w, i }))
    .sort((a, b) => {
      const ao = a.w.order ?? Number.MAX_SAFE_INTEGER;
      const bo = b.w.order ?? Number.MAX_SAFE_INTEGER;
      return ao === bo ? a.i - b.i : ao - bo;
    })
    .map(({ w }) => w);
}

export function getWork(slug: string): Work | undefined {
  return getWorks().find((w) => w.slug === slug);
}

// 実際に作品が存在するカテゴリのみ（空カテゴリを除外するため）
export function getUsedCategories(): Category[] {
  const used = new Set<Category>();
  for (const w of getWorks()) for (const c of w.categories) used.add(c);
  return Array.from(used);
}
