import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
    <html lang="ja" className={`${geistSans.variable} h-full`}>
      <body className="min-h-full text-neutral-900 antialiased">
        {children}
      </body>
    </html>
  );
}
