'use server';

import fs from 'fs';
import path from 'path';
import { getProjects } from '@/lib/projects';

export async function addWork(formData: FormData) {
  const password = formData.get('password') as string;
  if (password !== process.env.ADMIN_PASSWORD) {
    return { error: 'パスワードが違います' };
  }

  const client = (formData.get('client') as string).trim();
  const year = (formData.get('year') as string).trim();
  const description = (formData.get('description') as string).trim();
  const id = (formData.get('id') as string).trim() ||
    `${client}-${Date.now()}`.replace(/[^a-zA-Z0-9-]/g, '-').toLowerCase();

  if (!client || !year || !description) {
    return { error: '必須項目を入力してください' };
  }

  // Save uploaded images
  const imageFiles = formData.getAll('images') as File[];
  const savedImages: string[] = [];

  for (const file of imageFiles) {
    if (!file || file.size === 0) continue;
    const ext = file.name.split('.').pop();
    const fileName = `${id}-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const filePath = path.join(process.cwd(), 'public/works', fileName);
    fs.mkdirSync(path.join(process.cwd(), 'public/works'), { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);
    savedImages.push(`/works/${fileName}`);
  }

  const newWork = {
    id,
    client,
    year,
    description,
    images: savedImages,
    coverImage: savedImages[0] ?? '',
  };

  const projects = getProjects();
  projects.push(newWork);

  const jsonPath = path.join(process.cwd(), 'content/works.json');
  fs.writeFileSync(jsonPath, JSON.stringify(projects, null, 2));

  return { success: true, id };
}
