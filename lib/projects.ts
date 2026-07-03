import fs from 'fs';
import path from 'path';
import type { Category } from './categories';
export type { Category } from './categories';
export { CATEGORIES } from './categories';

export type Project = {
  id: string;
  client: string;
  year: string;
  description: string;
  category: Category;
  images: string[];
  coverImage: string;
};

export function getProjects(): Project[] {
  const filePath = path.join(process.cwd(), 'content/works.json');
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data) as Project[];
}

export function getProject(id: string): Project | undefined {
  return getProjects().find((p) => p.id === id);
}
