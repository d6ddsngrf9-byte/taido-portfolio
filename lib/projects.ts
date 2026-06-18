export type Project = {
  id: string;
  category: string;
  label: string;
  tags: string[];
  image?: string;
};

export const projects: Project[] = [
  {
    id: "branding-vi",
    category: "Branding / VI",
    label: "ブランディング・VI",
    tags: ["ロゴ", "名刺", "VI", "ブランドブック"],
    image: "/DSC07047.JPG",
  },
  {
    id: "editorial",
    category: "Editorial",
    label: "編集・印刷物",
    tags: ["冊子", "リーフレット", "ZINE", "フリーペーパー"],
    image: "/260116-010.JPG",
  },
  {
    id: "photography",
    category: "Photography",
    label: "写真撮影",
    tags: ["商品", "人物", "空間", "イベント"],
    image: "/DSC01805.jpg",
  },
  {
    id: "sns",
    category: "SNS / PR",
    label: "SNS・広報設計",
    tags: ["Instagram", "運用設計", "キャプション", "自動化"],
    image: "/アートボード 1 のコピー 2@4x.PNG",
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
    image: "/揚輝荘1.JPG",
  },
  {
    id: "artdirection",
    category: "Art Direction",
    label: "アートディレクション",
    tags: ["クリエイティブ設計", "撮影ディレクション", "全体監修"],
    image: "/4-5.PNG",
  },
  {
    id: "crowdfunding",
    category: "Crowdfunding Support",
    label: "クラファン支援",
    tags: ["動画台本", "バナー", "文章", "PR設計"],
    image: "/CURA1.JPG",
  },
];
