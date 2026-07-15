'use server';

import { commitNewWork } from '@/lib/admin-commit';
import { CATEGORIES } from '@/lib/categories';
import type { Category } from '@/lib/categories';

export async function verifyPassword(password: string) {
  const ok = !!process.env.ADMIN_PASSWORD && password === process.env.ADMIN_PASSWORD;
  return { ok };
}

export async function addWork(formData: FormData) {
  const password = (formData.get('password') as string) ?? '';
  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return { error: 'パスワードが違います' };
  }

  const client = ((formData.get('client') as string) ?? '').trim();
  const year = ((formData.get('year') as string) ?? '').trim();
  const lead = ((formData.get('description') as string) ?? '').trim();
  const rawCategory = ((formData.get('category') as string) ?? '').trim();
  const category = (CATEGORIES.some((c) => c.id === rawCategory) ? rawCategory : 'graphic-design') as Category;

  if (!client || !year || !lead) {
    return { error: '必須項目を入力してください' };
  }

  let slug = ((formData.get('id') as string) ?? '').trim();
  if (!slug) slug = `${client}-${Date.now()}`;
  slug = slug.replace(/[^a-zA-Z0-9-]/g, '-').toLowerCase().replace(/^-+|-+$/g, '');
  if (!slug) return { error: 'slugが不正です' };

  const files = (formData.getAll('images') as File[]).filter((f) => f && f.size > 0);
  const buffers: Buffer[] = [];
  for (const f of files) {
    buffers.push(Buffer.from(await f.arrayBuffer()));
  }

  try {
    // titleは暫定でclient（案件名）。詳細はworks.jsonで後から編集
    const res = await commitNewWork({ slug, title: client, client, year, lead, category }, buffers);
    return { success: true, id: res.slug };
  } catch (e) {
    return { error: '登録に失敗しました：' + (e instanceof Error ? e.message : String(e)) };
  }
}
