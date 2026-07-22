import type { Metadata } from "next";
import { Space_Grotesk, Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

/* 表示用（見出し・英字ラベル）。figure.ai の Neue Machina に相当する技術系グロテスク */
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

/* 本文用。figure.ai の Neue Haas Grotesk に相当する中立グロテスク */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
});

const SITE_DESCRIPTION =
  "大阪・豊中を拠点に、グラフィックデザイン、ブランディング、編集、写真、広報設計を行うtaido.design（前田敏幸）のポートフォリオ。";

export const metadata: Metadata = {
  metadataBase: new URL("https://taido.design"),
  title: "taido.design｜前田敏幸",
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: "taido.design｜前田敏幸",
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: "taido.design",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "taido.design｜前田敏幸",
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${spaceGrotesk.variable} ${inter.variable} ${notoSansJP.variable} h-full`}
    >
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
