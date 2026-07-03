export type Category =
  | 'graphic-design'
  | 'art-direction'
  | 'branding'
  | 'editorial'
  | 'photography'
  | 'sns-pr'
  | 'video';

export const CATEGORIES: { id: Category; ja: string; en: string }[] = [
  { id: 'graphic-design', ja: 'グラフィックデザイン', en: 'Graphic Design' },
  { id: 'art-direction', ja: 'アートディレクション', en: 'Art Direction' },
  { id: 'branding', ja: 'ブランディング', en: 'Branding' },
  { id: 'editorial', ja: '編集・コピーライティング', en: 'Editorial / Copywriting' },
  { id: 'photography', ja: '写真撮影', en: 'Photography' },
  { id: 'sns-pr', ja: 'SNS / 広報設計', en: 'SNS / PR' },
  { id: 'video', ja: '動画・YouTube制作', en: 'Video' },
];
