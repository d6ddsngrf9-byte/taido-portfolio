import { Noto_Sans_JP } from "next/font/google";
import Link from "next/link";

const notoSans = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-noto-sans",
});

export default function About() {
  return (
    <div className={`${notoSans.variable} font-[family-name:var(--font-noto-sans)]`} style={{ background: "white" }}>

      {/* Nav */}
      <nav style={{ borderBottom: "1px solid #eee" }}
        className="px-6 md:px-10 h-10 flex items-center justify-between">
        <Link href="/" className="text-xs font-light" style={{ color: "#111", letterSpacing: "0.15em" }}>taido.design</Link>
        <div className="flex gap-6 text-xs font-light" style={{ color: "#aaa", letterSpacing: "0.08em" }}>
          <Link href="/#works" className="hover:text-black transition-colors">Works</Link>
          <Link href="/about" className="hover:text-black transition-colors" style={{ color: "#111" }}>About</Link>
          <Link href="/#contact" className="hover:text-black transition-colors">Contact</Link>
        </div>
      </nav>

      <main className="px-6 md:px-10 py-16 max-w-4xl">

        {/* Profile photo placeholder */}
        <div className="mb-16"
          style={{ width: "100%", maxWidth: "360px", aspectRatio: "3/4", background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span className="text-xs font-light" style={{ color: "#ccc", letterSpacing: "0.1em" }}>PHOTO / ILLUSTRATION</span>
        </div>

        {/* Name */}
        <div className="mb-16" style={{ borderTop: "1px solid #eee", paddingTop: "2rem" }}>
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

        {/* Career */}
        <div className="mb-16" style={{ borderTop: "1px solid #eee", paddingTop: "2rem" }}>
          <p className="text-xs font-light mb-6" style={{ color: "#bbb", letterSpacing: "0.12em" }}>CAREER</p>
          <div className="space-y-0">
            {[
              { year: "----", text: "（仮）経歴・学歴を記入" },
              { year: "----", text: "（仮）経歴を記入" },
              { year: "----", text: "（仮）taido.design 設立" },
            ].map((item, i) => (
              <div key={i} className="flex gap-8 py-3" style={{ borderBottom: "1px solid #f0f0f0" }}>
                <span className="text-xs font-light shrink-0" style={{ color: "#bbb", letterSpacing: "0.05em", paddingTop: "1px" }}>{item.year}</span>
                <span className="text-xs font-light" style={{ color: "#555", lineHeight: 1.8 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Base */}
        <div style={{ borderTop: "1px solid #eee", paddingTop: "2rem" }}>
          <p className="text-xs font-light mb-3" style={{ color: "#bbb", letterSpacing: "0.12em" }}>BASE</p>
          <p className="text-xs font-light" style={{ color: "#555" }}>大阪府豊中市　Toyonaka, Osaka, Japan</p>
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
