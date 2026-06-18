import { Noto_Sans_JP } from "next/font/google";
import { projects } from "@/lib/projects";

const notoSans = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-noto-sans",
});

const skills = [
  "グラフィックデザイン",
  "アートディレクション",
  "ブランディング",
  "編集・コピーライティング",
  "写真撮影",
  "SNS / 広報設計",
  "動画・YouTube制作",
];

export default function Home() {
  return (
    <div
      className={`${notoSans.variable} font-[family-name:var(--font-noto-sans)]`}
      style={{ background: "var(--paper)", color: "var(--ink)" }}
    >
      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{ background: "var(--paper)", borderBottom: "1px solid var(--rule)" }}
      >
        <div className="max-w-5xl mx-auto px-8 h-12 flex items-center justify-between">
          <span className="text-sm font-bold tracking-widest uppercase">
            taido.design
          </span>
          <div className="flex gap-8 text-xs font-light tracking-widest uppercase" style={{ color: "var(--ink-light)" }}>
            <a href="#about" className="hover:opacity-60 transition-opacity">About</a>
            <a href="#works" className="hover:opacity-60 transition-opacity">Works</a>
            <a href="#contact" className="hover:opacity-60 transition-opacity">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-12 max-w-5xl mx-auto px-8">
        {/* Hero image */}
        <div
          className="w-full mt-8 mb-10 flex items-center justify-center overflow-hidden"
          style={{
            height: "60vh",
            minHeight: "320px",
            background: "var(--paper-dark)",
            border: "1px solid var(--rule)",
            position: "relative",
          }}
        >
          {/* Photo placeholder — replace src with your image */}
          <div className="text-center" style={{ color: "var(--rule)" }}>
            <div className="text-4xl mb-3">+</div>
            <p className="text-xs tracking-widest uppercase font-light">Photo coming soon</p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 pb-20">
          <div className="col-span-12 md:col-span-8">
            <p
              className="text-xs font-light tracking-widest uppercase mb-5"
              style={{ color: "var(--ink-light)" }}
            >
              Designer / Art Director — Osaka, Japan
            </p>
            <h1
              className="font-black leading-none tracking-tight mb-8"
              style={{ fontSize: "clamp(3.5rem, 10vw, 7rem)", letterSpacing: "-0.03em" }}
            >
              前田<br />敏幸
            </h1>
            <div style={{ width: "2.5rem", height: "2px", background: "var(--ink)", marginBottom: "1.5rem" }} />
            <p className="text-base font-light leading-loose max-w-md" style={{ color: "var(--ink-light)" }}>
              社会的意義や文脈を、<br />
              外に届く言葉・デザイン・写真・導線に変換する。
            </p>
          </div>
          <div
            className="hidden md:flex col-span-4 items-end justify-end pb-1"
            style={{ color: "var(--rule)", fontSize: "9px", letterSpacing: "0.15em", writingMode: "vertical-rl", fontWeight: 300 }}
          >
            GRAPHIC DESIGN · ART DIRECTION · BRANDING · EDITORIAL
          </div>
        </div>
      </section>

      {/* Rule */}
      <div className="max-w-5xl mx-auto px-8">
        <div style={{ borderTop: "1px solid var(--rule)" }} />
      </div>

      {/* About */}
      <section id="about" className="py-20 px-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <p className="text-xs font-light tracking-widest uppercase mb-2" style={{ color: "var(--ink-light)" }}>
              01 — About
            </p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold mb-6" style={{ lineHeight: 1.4 }}>
                  重いを軽く、<br />かたいをゆるく。
                </h2>
                <p className="text-sm font-light leading-loose mb-4" style={{ color: "var(--ink-light)" }}>
                  地域・福祉・文化・出版・個人店・小規模事業者を主な顧客として、
                  グラフィックデザインからブランディング、写真撮影、SNS広報設計まで一貫して手がける。
                </p>
                <p className="text-sm font-light leading-loose" style={{ color: "var(--ink-light)" }}>
                  クライアントの思想・背景・文脈を外向けの言葉とビジュアルへ翻訳する編集的アプローチで、
                  社会的意義のある仕事に向き合う。
                </p>
              </div>
              <div>
                <p className="text-xs font-light tracking-widest uppercase mb-4" style={{ color: "var(--ink-light)" }}>
                  Skills
                </p>
                <ul className="space-y-0">
                  {skills.map((skill, i) => (
                    <li
                      key={skill}
                      className="flex items-center gap-4 text-sm font-light py-3"
                      style={{ borderBottom: "1px solid var(--rule)" }}
                    >
                      <span
                        className="text-xs w-5 text-right shrink-0 font-light"
                        style={{ color: "var(--rule)" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rule */}
      <div className="max-w-5xl mx-auto px-8">
        <div style={{ borderTop: "1px solid var(--rule)" }} />
      </div>

      {/* Works */}
      <section id="works" className="py-20 px-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <p className="text-xs font-light tracking-widest uppercase mb-2" style={{ color: "var(--ink-light)" }}>
              02 — Works
            </p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{ background: "var(--rule)" }}>
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="group flex flex-col justify-between p-6"
                  style={{ background: "var(--paper)", aspectRatio: "1 / 1" }}
                >
                  <span className="text-xs font-light tracking-widest uppercase" style={{ color: "var(--rule)" }}>
                    {project.category}
                  </span>
                  <div>
                    <h3 className="text-base font-bold mb-3" style={{ lineHeight: 1.3 }}>
                      {project.label}
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-light"
                          style={{ color: "var(--ink-light)" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Rule */}
      <div className="max-w-5xl mx-auto px-8">
        <div style={{ borderTop: "1px solid var(--rule)" }} />
      </div>

      {/* Contact */}
      <section id="contact" className="py-20 px-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <p className="text-xs font-light tracking-widest uppercase mb-2" style={{ color: "var(--ink-light)" }}>
              03 — Contact
            </p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="font-black mb-6" style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              お仕事の<br />ご相談
            </h2>
            <p className="text-sm font-light leading-loose mb-10 max-w-md" style={{ color: "var(--ink-light)" }}>
              地域・福祉・文化・出版・個人店・小規模事業者・IT企業・教育医療介護領域からのご依頼をお待ちしています。
            </p>
            <a
              href="mailto:hello@taido.design"
              className="inline-flex items-center gap-3 text-sm tracking-wider hover:opacity-60 transition-opacity font-light"
              style={{ borderBottom: "1px solid var(--ink)", paddingBottom: "0.25rem" }}
            >
              hello@taido.design
              <span style={{ color: "var(--ink-light)" }}>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--rule)", background: "var(--paper-dark)" }}>
        <div className="max-w-5xl mx-auto px-8 py-6 flex items-center justify-between">
          <span className="text-xs font-light tracking-widest" style={{ color: "var(--ink-light)" }}>
            © 2026 taido.design / 前田敏幸
          </span>
          <span className="text-xs font-light tracking-widest" style={{ color: "var(--ink-light)" }}>
            OSAKA, JAPAN
          </span>
        </div>
      </footer>
    </div>
  );
}
