import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // 管理画面アップロードの上限（画像はブラウザ側で圧縮済みだが余裕を持たせる）
      bodySizeLimit: "4mb",
    },
  },
  async redirects() {
    // 旧slug（カテゴリ名ベース）→ 案件固有slug の 301
    return [
      { source: "/works/branding-vi", destination: "/works/musubibana", statusCode: 301 },
      { source: "/works/photography", destination: "/works/sumi-takeshi-photobook", statusCode: 301 },
    ];
  },
};

export default nextConfig;
