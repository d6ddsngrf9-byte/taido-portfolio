import { Noto_Serif_JP } from "next/font/google";
import { projects } from "@/lib/projects";

const notoSerif = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto-serif",
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
      className={`${notoSerif.variable} font-[family-name:var(--font-geist-sans)]`}
      style={{ background: "var(--paper)", color: "var(--ink)" }}
    >
      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{ background: "var(--paper)", borderBottom: "1px solid var(--rule)" }}
      >
        <div className="max-w-5xl mx-auto px-8 h-12 flex items-center justify-between">
          <span
            className="text-sm tracking-widest uppercase"
            style={{ fontFamily: "var(--font-noto-serif)", letterSpacing: "0.2em" }}
          >
            taido.design
          </span>
          <div className="flex gap-8 text-xs tracking-widest uppercase" style={{ color: "var(--ink-light)" }}>
            <a href="#about" className="hover:opacity-60 transition-opacity">About</a>
            <a href="#works" className="hover:opacity-60 transition-opacity">Works</a>
            <a href="#contact" className="hover:opacity-60 transition-opacity">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-20 px-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-8">
            <p
              className="text-xs tracking-widest uppercase mb-6"
              style={{ color: "var(--ink-light)", fontFamily: "var(--font-geist-mono, monospace)" }}
            >
              Designer / Art Director — 大阪府豊中市
            </p>
            <h1
              className="text-6xl md:text-8xl font-bold leading-none tracking-tight mb-8"
              style={{ fontFamily: "var(--font-noto-serif)", letterSpacing: "-0.02em" }}
            >
              前田<br />敏幸
            </h1>
            <div style={{ width: "3rem", height: "2px", background: "var(--ink)", marginBottom: "2rem" }} />
            <p className="text-base leading-loose max-w-md" style={{ color: "var(--ink-light)" }}>
              社会的意義や文脈を、<br />
              外に届く言葉・デザイン・写真・導線に変換する。
            </p>
          </div>
          <div
            className="hidden md:flex col-span-4 items-end justify-end pb-4"
            style={{ color: "var(--rule)", fontSize: "10px", letterSpacing: "0.1em", writingMode: "vertical-rl" }}
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
            <p
              className="text-xs tracking-widest uppercase mb-2"
              style={{ color: "var(--ink-light)", fontFamily: "var(--font-geist-mono, monospace)" }}
            >
              01 — About
            </p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2
                  className="text-2xl font-bold mb-6"
                  style={{ fontFamily: "var(--font-noto-serif)" }}
                >
                  重いを軽く、<br />かたいをゆるく。
                </h2>
                <p className="text-sm leading-loose mb-4" style={{ color: "var(--ink-light)" }}>
                  地域・福祉・文化・出版・個人店・小規模事業者を主な顧客として、
                  グラフィックデザインからブランディング、写真撮影、SNS広報設計まで一貫して手がける。
                </p>
                <p className="text-sm leading-loose" style={{ color: "var(--ink-light)" }}>
                  クライアントの思想・背景・文脈を外向けの言葉とビジュアルへ翻訳する編集的アプローチで、
                  社会的意義のある仕事に向き合う。
                </p>
              </div>
              <div>
                <p
                  className="text-xs tracking-widest uppercase mb-4"
                  style={{ color: "var(--ink-light)", fontFamily: "var(--font-geist-mono, monospace)" }}
                >
                  Skills
                </p>
                <ul className="space-y-3">
                  {skills.map((skill, i) => (
                    <li
                      key={skill}
                      className="flex items-center gap-4 text-sm"
                      style={{ borderBottom: "1px solid var(--rule)", paddingBottom: "0.75rem" }}
                    >
                      <span
                        className="text-xs w-5 text-right shrink-0"
                        style={{ color: "var(--rule)", fontFamily: "var(--font-geist-mono, monospace)" }}
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
            <p
              className="text-xs tracking-widest uppercase mb-2"
              style={{ color: "var(--ink-light)", fontFamily: "var(--font-geist-mono, monospace)" }}
            >
              02 — Works
            </p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <div className="space-y-0">
              {projects.map((project, i) => (
                <div
                  key={project.id}
                  className="group py-6 grid grid-cols-12 gap-4 items-baseline transition-colors"
                  style={{ borderBottom: "1px solid var(--rule)", cursor: "default" }}
                >
                  <div className="col-span-1">
                    <span
                      className="text-xs"
                      style={{ color: "var(--rule)", fontFamily: "var(--font-geist-mono, monospace)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="col-span-11 md:col-span-4">
                    <p className="text-xs mb-1" style={{ color: "var(--ink-light)" }}>{project.client}</p>
                    <h3 className="text-sm font-bold" style={{ fontFamily: "var(--font-noto-serif)" }}>
                      {project.title}
                    </h3>
                  </div>
                  <div className="col-span-12 md:col-span-4 md:col-start-6">
                    <p className="text-xs leading-relaxed" style={{ color: "var(--ink-light)" }}>
                      {project.description}
                    </p>
                  </div>
                  <div className="col-span-12 md:col-span-2 md:text-right">
                    <span
                      className="text-xs tracking-wider"
                      style={{ color: "var(--rule)", fontFamily: "var(--font-geist-mono, monospace)" }}
                    >
                      {project.type}
                    </span>
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
            <p
              className="text-xs tracking-widest uppercase mb-2"
              style={{ color: "var(--ink-light)", fontFamily: "var(--font-geist-mono, monospace)" }}
            >
              03 — Contact
            </p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2
              className="text-3xl font-bold mb-6"
              style={{ fontFamily: "var(--font-noto-serif)" }}
            >
              お仕事のご相談
            </h2>
            <p className="text-sm leading-loose mb-8 max-w-md" style={{ color: "var(--ink-light)" }}>
              地域・福祉・文化・出版・個人店・小規模事業者・IT企業・教育医療介護領域からのご依頼をお待ちしています。
            </p>
            <a
              href="mailto:hello0615@icloud.com"
              className="inline-flex items-center gap-3 text-sm tracking-wider hover:opacity-60 transition-opacity"
              style={{ borderBottom: "1px solid var(--ink)", paddingBottom: "0.25rem" }}
            >
              hello0615@icloud.com
              <span style={{ color: "var(--ink-light)" }}>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--rule)", background: "var(--paper-dark)" }}>
        <div className="max-w-5xl mx-auto px-8 py-6 flex items-center justify-between">
          <span
            className="text-xs tracking-widest"
            style={{ color: "var(--ink-light)", fontFamily: "var(--font-geist-mono, monospace)" }}
          >
            © 2026 taido.design / 前田敏幸
          </span>
          <span
            className="text-xs tracking-widest"
            style={{ color: "var(--ink-light)", fontFamily: "var(--font-geist-mono, monospace)" }}
          >
            OSAKA, JAPAN
          </span>
        </div>
      </footer>
    </div>
  );
}
