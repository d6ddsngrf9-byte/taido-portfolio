export type Project = {
  id: string;
  category: string;
  label: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    id: "branding-vi",
    category: "Branding / VI",
    label: "ブランディング・VI",
    tags: ["ロゴ", "名刺", "VI", "ブランドブック"],
  },
  {
    id: "editorial",
    category: "Editorial",
    label: "編集・印刷物",
    tags: ["冊子", "リーフレット", "ZINE", "フリーペーパー"],
  },
  {
    id: "photography",
    category: "Photography",
    label: "写真撮影",
    tags: ["商品", "人物", "空間", "イベント"],
  },
  {
    id: "sns",
    category: "SNS / PR",
    label: "SNS・広報設計",
    tags: ["Instagram", "運用設計", "キャプション", "自動化"],
  },
  {
    id: "video",
    category: "Video",
    label: "動画・映像",
    tags: ["台本", "撮影", "YouTube", "リール"],
  },
  {
    id: "copywriting",
    category: "Copywriting",
    label: "コピーライティング",
    tags: ["キャッチコピー", "ブランドコピー", "Web文章"],
  },
  {
    id: "artdirection",
    category: "Art Direction",
    label: "アートディレクション",
    tags: ["クリエイティブ設計", "撮影ディレクション", "全体監修"],
  },
  {
    id: "crowdfunding",
    category: "Crowdfunding Support",
    label: "クラファン支援",
    tags: ["動画台本", "バナー", "文章", "PR設計"],
  },
];
