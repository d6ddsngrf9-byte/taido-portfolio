import { Noto_Sans_JP } from "next/font/google";
import Nav from "@/app/components/Nav";

const notoSans = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-noto-sans",
});

export default function About() {
  return (
    <div className={`${notoSans.variable}`} style={{ background: "white", fontFamily: "'Optima', 'Optima Nova', Candara, var(--font-noto-sans), sans-serif" }}>

      <Nav theme="light" activeLink="about" />

      <main className="px-6 md:px-10 py-16 max-w-5xl">

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">

          {/* Left: Profile photo placeholder */}
          <div
            style={{ width: "100%", aspectRatio: "3/4", background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span className="text-xs font-light" style={{ color: "#ccc", letterSpacing: "0.1em" }}>PHOTO / ILLUSTRATION</span>
          </div>

          {/* Right: Text */}
          <div>

            {/* Name */}
            <div className="mb-16">
              <p className="text-xs font-light mb-1" style={{ color: "#bbb", letterSpacing: "0.12em" }}>NAME</p>
              <p className="text-sm font-light" style={{ color: "#111" }}>前田 敏幸　Maeda Toshiyuki</p>
              <p className="text-xs font-light mt-1" style={{ color: "#aaa" }}>Designer / Art Director</p>
            </div>

            {/* Concept */}
            <div className="mb-16" style={{ borderTop: "1px solid #eee", paddingTop: "2rem" }}>
              <p className="text-xs font-light mb-6" style={{ color: "#bbb", letterSpacing: "0.12em" }}>CONCEPT</p>
              <p className="font-light leading-loose" style={{ color: "#111", fontSize: "clamp(1.1rem, 2vw, 1.4rem)", lineHeight: 1.9 }}>
                社会的意義や文脈を、<br />
                外に届く言葉・デザイン・写真・導線に変換する。
              </p>
              <p className="text-xs font-light leading-loose mt-6" style={{ color: "#666", lineHeight: 2.2 }}>
                地域・福祉・文化・出版・個人店・小規模事業者を主な顧客として、
                グラフィックデザインからブランディング、写真撮影、SNS広報設計まで
                一貫して手がける。
              </p>
            </div>

            {/* Base */}
            <div style={{ borderTop: "1px solid #eee", paddingTop: "2rem" }}>
              <p className="text-xs font-light mb-3" style={{ color: "#bbb", letterSpacing: "0.12em" }}>BASE</p>
              <p className="text-xs font-light" style={{ color: "#555" }}>大阪府豊中市　Toyonaka, Osaka, Japan</p>
            </div>

          </div>

        </div>

      </main>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #eee" }}
        className="px-6 md:px-10 py-4 flex items-center justify-between mt-8">
        <span className="text-xs font-light" style={{ color: "#ccc", fontSize: "10px" }}>© 2026 taido.design</span>
        <span className="text-xs font-light" style={{ color: "#ccc", fontSize: "10px" }}>Osaka, Japan</span>
      </footer>

    </div>
  );
}
