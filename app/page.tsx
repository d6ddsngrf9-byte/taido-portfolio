import { Noto_Sans_JP } from "next/font/google";
import { projects } from "@/lib/projects";

const notoSans = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-noto-sans",
});

const skills = [
  { ja: "グラフィックデザイン", en: "Graphic Design" },
  { ja: "アートディレクション", en: "Art Direction" },
  { ja: "ブランディング", en: "Branding" },
  { ja: "編集・コピーライティング", en: "Editorial / Copywriting" },
  { ja: "写真撮影", en: "Photography" },
  { ja: "SNS / 広報設計", en: "SNS / PR" },
  { ja: "動画・YouTube制作", en: "Video" },
];

export default function Home() {
  return (
    <div className={`${notoSans.variable} font-[family-name:var(--font-noto-sans)]`}>

      {/* Nav — moss green */}
      <nav style={{ background: "#4a5c3a", color: "white" }}
        className="px-6 md:px-10 h-14 flex items-center justify-between">
        <span className="text-sm font-light tracking-widest">taido.design</span>
        <div className="flex gap-8 text-xs font-light" style={{ color: "rgba(255,255,255,0.55)" }}>
          <a href="#works" className="hover:text-white transition-colors">Works</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
      </nav>

      {/* Hero — moss green */}
      <section style={{ background: "#4a5c3a" }} className="px-6 md:px-10 pb-20 pt-16 md:pt-24">
        <h1
          className="font-bold leading-none text-white"
          style={{ fontSize: "clamp(3rem, 9vw, 8rem)", letterSpacing: "-0.03em" }}
        >
          文脈を、<br />かたちに。
        </h1>
        <p className="mt-6 text-sm font-light" style={{ color: "rgba(255,255,255,0.55)" }}>
          Designer / Art Director — 前田 敏幸 / 大阪府豊中市
        </p>

        {/* Meta bar inside hero */}
        <div className="mt-16 pt-8 grid grid-cols-2 md:grid-cols-4 gap-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }}>
          {[
            { label: "Name", value: "前田 敏幸" },
            { label: "Base", value: "大阪府豊中市" },
            { label: "Role", value: "Designer / Art Director" },
            { label: "Mail", value: "hello@taido.design", href: "mailto:hello@taido.design" },
          ].map(({ label, value, href }) => (
            <div key={label}>
              <p className="text-xs font-light mb-1 tracking-widest uppercase"
                style={{ color: "rgba(255,255,255,0.35)" }}>{label}</p>
              {href
                ? <a href={href} className="text-sm font-light text-white hover:opacity-60 transition-opacity">{value}</a>
                : <p className="text-sm font-light text-white">{value}</p>
              }
            </div>
          ))}
        </div>
      </section>

      {/* Works — white */}
      <section id="works" style={{ background: "white" }}>
        <div className="px-6 md:px-10 py-5 flex items-center justify-between"
          style={{ borderBottom: "1px solid #eee" }}>
          <h2 className="text-xs font-light tracking-widest" style={{ color: "#aaa" }}>WORKS</h2>
          <span className="text-xs font-light" style={{ color: "#ccc" }}>{projects.length} categories</span>
        </div>
        <div className="grid grid-cols-2" style={{ borderBottom: "1px solid #eee" }}>
          {projects.map((project) => (
            <div key={project.id} className="group" style={{ borderRight: "1px solid #eee", borderBottom: "1px solid #eee", marginRight: "-1px" }}>
              <div className="px-5 pt-5 pb-3">
                <h3 className="text-xs font-light mb-1" style={{ color: "#444" }}>{project.label}</h3>
                <div className="flex flex-wrap gap-x-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs font-light" style={{ color: "#ccc" }}>{tag}</span>
                  ))}
                </div>
              </div>
              <div
                className="w-full flex items-center justify-center transition-colors group-hover:bg-neutral-100"
                style={{ aspectRatio: "4 / 3", background: "#f8f8f8" }}
              >
                <span className="text-xs font-light tracking-widest uppercase" style={{ color: "#ddd" }}>
                  {project.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About — moss green */}
      <section id="about" style={{ background: "#4a5c3a", color: "white" }}
        className="px-6 md:px-10 py-24">
        <h2 className="text-xs font-light tracking-widest mb-12"
          style={{ color: "rgba(255,255,255,0.4)" }}>ABOUT</h2>
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <p className="font-bold leading-tight mb-8 text-white"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              重いを軽く、<br />かたいをゆるく。
            </p>
            <p className="text-sm font-light leading-loose" style={{ color: "rgba(255,255,255,0.65)" }}>
              社会的意義や文脈を、外に届く言葉・デザイン・写真・導線に変換する。
              地域・福祉・文化・出版・個人店・小規模事業者を主な顧客として、
              グラフィックデザインからブランディング、写真撮影、SNS広報設計まで
              一貫して手がける。
            </p>
          </div>
          <div>
            <p className="text-xs font-light tracking-widest mb-6"
              style={{ color: "rgba(255,255,255,0.35)" }}>DISCIPLINES</p>
            <div className="space-y-0">
              {skills.map((skill) => (
                <div key={skill.en} className="flex items-center justify-between py-3"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                  <span className="text-sm font-light text-white">{skill.ja}</span>
                  <span className="text-xs font-light" style={{ color: "rgba(255,255,255,0.35)" }}>{skill.en}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact — white */}
      <section id="contact" style={{ background: "white" }}
        className="px-6 md:px-10 py-24">
        <h2 className="text-xs font-light tracking-widest mb-12" style={{ color: "#aaa" }}>CONTACT</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <p className="text-xs font-light mb-3" style={{ color: "#aaa" }}>Address</p>
            <p className="text-sm font-light leading-relaxed" style={{ color: "#555" }}>
              大阪府豊中市<br />Toyonaka, Osaka, Japan
            </p>
          </div>
          <div>
            <p className="text-xs font-light mb-3" style={{ color: "#aaa" }}>Mail</p>
            <a href="mailto:hello@taido.design"
              className="text-sm font-light hover:opacity-50 transition-opacity"
              style={{ color: "#111", textDecoration: "underline", textUnderlineOffset: "4px" }}>
              hello@taido.design
            </a>
          </div>
          <div>
            <p className="text-xs font-light mb-3" style={{ color: "#aaa" }}>Follow us</p>
            <a href="https://www.instagram.com/maedatoshiyuk1_works/"
              target="_blank" rel="noopener noreferrer"
              className="text-sm font-light hover:opacity-50 transition-opacity"
              style={{ color: "#111", textDecoration: "underline", textUnderlineOffset: "4px" }}>
              Instagram
            </a>
          </div>
        </div>
      </section>

      {/* Footer — moss green */}
      <footer style={{ background: "#3a4a2c" }}
        className="px-6 md:px-10 py-6 flex items-center justify-between">
        <span className="text-xs font-light" style={{ color: "rgba(255,255,255,0.35)" }}>
          Copyright © 2026 taido.design All Rights Reserved.
        </span>
        <span className="text-xs font-light" style={{ color: "rgba(255,255,255,0.35)" }}>
          Osaka, Japan
        </span>
      </footer>

    </div>
  );
}
