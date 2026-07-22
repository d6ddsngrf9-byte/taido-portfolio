import type { Metadata } from "next";
import Nav from "@/app/components/Nav";
import Cta from "@/app/components/Cta";

const ABOUT_DESCRIPTION =
  "前田敏幸／taido.design のプロフィール。社会的意義や文脈を、外に届く言葉・デザイン・写真・導線に変換する。大阪府豊中市を拠点に活動。";

export const metadata: Metadata = {
  title: "About｜taido.design",
  description: ABOUT_DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About｜taido.design",
    description: ABOUT_DESCRIPTION,
    url: "/about",
    siteName: "taido.design",
    locale: "ja_JP",
    type: "profile",
  },
};

export default function About() {
  return (
    <>
      <Nav activeLink="about" />

      <main className="px-6 md:px-10 pt-16 md:pt-28 pb-24 max-w-5xl">
        <span className="label label--green">About</span>

        {/* 1画面1メッセージ：まずコンセプトだけを大きく置く */}
        <p
          className="display mt-8 md:mt-12"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", lineHeight: 1.5 }}
        >
          社会的意義や文脈を、外に届く
          <br className="hidden md:inline" />
          言葉・
          <br className="md:hidden" />
          デザイン・写真・導線に変換する。
        </p>

        <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-start mt-16 md:mt-28">
          {/* Left: Profile photo placeholder */}
          <div
            style={{
              width: "100%",
              aspectRatio: "3/4",
              background: "#e9e5dc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span className="label">Photo / Illustration</span>
          </div>

          {/* Right: Details */}
          <div>
            <div>
              <span className="label mb-3">Name</span>
              <p className="font-light" style={{ color: "var(--ink)", fontSize: "1rem" }}>
                前田 敏幸　Maeda Toshiyuki
              </p>
              <span className="label mt-2">Designer / Art Director</span>
            </div>

            <div className="mt-14" style={{ borderTop: "1px solid var(--rule)", paddingTop: "2rem" }}>
              <span className="label mb-4">Practice</span>
              <p
                className="font-light"
                style={{ color: "var(--body)", fontSize: "0.9rem", lineHeight: 2.2 }}
              >
                地域・福祉・文化・出版・個人店・小規模事業者を主な顧客として、
                グラフィックデザインからブランディング、写真撮影、SNS広報設計まで
                一貫して手がける。
              </p>
            </div>

            <div className="mt-14" style={{ borderTop: "1px solid var(--rule)", paddingTop: "2rem" }}>
              <span className="label mb-3">Base</span>
              <p className="font-light" style={{ color: "var(--body)", fontSize: "0.9rem" }}>
                大阪府豊中市　Toyonaka, Osaka, Japan
              </p>
            </div>

            <div className="mt-14">
              <Cta href="/#contact">Contact</Cta>
            </div>
          </div>
        </div>
      </main>

      <footer
        style={{ borderTop: "1px solid var(--rule)" }}
        className="px-6 md:px-10 py-6 flex items-center justify-between"
      >
        <span className="label" style={{ fontSize: "10px" }}>
          © 2026 taido.design
        </span>
        <span className="label" style={{ fontSize: "10px" }}>
          Osaka, Japan
        </span>
      </footer>
    </>
  );
}
