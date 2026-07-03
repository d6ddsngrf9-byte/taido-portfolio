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
  const description = ((formData.get('description') as string) ?? '').trim();
  const rawCategory = ((formData.get('category') as string) ?? '').trim();
  const category = (CATEGORIES.some((c) => c.id === rawCategory) ? rawCategory : 'graphic-design') as Category;

  if (!client || !year || !description) {
    return { error: '必須項目を入力してください' };
  }

  let id = ((formData.get('id') as string) ?? '').trim();
  if (!id) id = `${client}-${Date.now()}`;
  id = id.replace(/[^a-zA-Z0-9-]/g, '-').toLowerCase().replace(/^-+|-+$/g, '');
  if (!id) return { error: 'IDが不正です' };

  const files = (formData.getAll('images') as File[]).filter((f) => f && f.size > 0);
  const buffers: Buffer[] = [];
  for (const f of files) {
    buffers.push(Buffer.from(await f.arrayBuffer()));
  }

  try {
    const res = await commitNewWork({ id, client, year, description, category }, buffers);
    return { success: true, id: res.id };
  } catch (e) {
    return { error: '登録に失敗しました：' + (e instanceof Error ? e.message : String(e)) };
  }
}
