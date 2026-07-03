import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // 管理画面アップロードの上限（画像はブラウザ側で圧縮済みだが余裕を持たせる）
      bodySizeLimit: "4mb",
    },
  },
};

export default nextConfig;
