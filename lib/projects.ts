export type Project = {
  id: string;
  client: string;
  title: string;
  type: string;
  tags: string[];
  description: string;
  status: "進行中" | "完了";
};

export const projects: Project[] = [
  {
    id: "noel-nova",
    client: "Noël Nova",
    title: "ブランド構築プロジェクト",
    type: "ブランディング・撮影・動画",
    tags: ["ブランディング", "VI", "撮影", "動画"],
    description:
      "アイシングクッキー作家のブランド全体設計。ロゴ/VI、名刺、ブランドカード、撮影、動画、講座導線整備。",
    status: "進行中",
  },
  {
    id: "hotta-carpet",
    client: "堀田カーペット",
    title: "SNS・ブランディングサポート",
    type: "月額サポート",
    tags: ["SNS", "ブランディング", "月額"],
    description:
      "老舗カーペットメーカーの月額ブランディングサポート。SNS運用と広報設計を担当。",
    status: "進行中",
  },
  {
    id: "tactile-house",
    client: "Tactile Material株式会社",
    title: "TACTILE HOUSE OSAKA SNS運用",
    type: "SNS運用",
    tags: ["SNS", "Instagram", "自動化"],
    description:
      "Instagramキャプション運用。Mac mini自動化パイプラインによる効率的なコンテンツ配信。",
    status: "進行中",
  },
  {
    id: "osaka-univ",
    client: "大阪大学（老年看護学）",
    title: "クラウドファンディング支援",
    type: "動画台本・バナーデザイン",
    tags: ["動画", "バナー", "大学", "医療"],
    description:
      "老年看護学分野のクラウドファンディング。動画台本の構成とバナーデザインを制作。",
    status: "進行中",
  },
  {
    id: "hoshitoiro",
    client: "みつぼしart星田 / Atelier Shiroito",
    title: "星十色 ブランディング支援",
    type: "ブランディング・地域連携",
    tags: ["地域", "福祉", "アート", "ブランディング"],
    description:
      "交野市の地域文化と福祉を結ぶアート活動のブランディング支援。",
    status: "進行中",
  },
  {
    id: "pilina",
    client: "Pilina（NPO）",
    title: "おおさかレモネードスタンドプロジェクト",
    type: "リーフレット",
    tags: ["NPO", "印刷物", "リーフレット"],
    description:
      "NPO法人のレモネードスタンドプロジェクト向け三つ折りリーフレットを制作。",
    status: "進行中",
  },
  {
    id: "artbook-osaka",
    client: "ARTBOOK OSAKA",
    title: "アートブックフェア制作支援",
    type: "デザイン・編集",
    tags: ["出版", "アート", "イベント"],
    description: "大阪のアートブックフェアの制作・編集・広報まわりを支援。",
    status: "進行中",
  },
  {
    id: "zinefest",
    client: "ZINEFEST",
    title: "ZINEフェスト制作支援",
    type: "デザイン・広報",
    tags: ["ZINE", "出版", "イベント"],
    description: "ZINEフェスティバルの広報・デザイン制作を担当。",
    status: "進行中",
  },
];
