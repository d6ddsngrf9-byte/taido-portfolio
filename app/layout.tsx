import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "taido.design — 前田敏幸",
  description:
    "グラフィックデザイン・アートディレクション・ブランディング。大阪府豊中市を拠点に活動するデザイナー前田敏幸のポートフォリオ。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${geistSans.variable} h-full`}>
      <body className="min-h-full bg-white text-neutral-900 antialiased">
        {children}
      </body>
    </html>
  );
}
