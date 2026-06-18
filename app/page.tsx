import { Noto_Sans_JP } from "next/font/google";
import { projects } from "@/lib/projects";

const notoSans = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
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
    <div className={`${notoSans.variable} font-[family-name:var(--font-noto-sans)] bg-white text-neutral-900`}>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-neutral-100">
        <div className="px-8 md:px-16 h-14 flex items-center justify-between">
          <span className="text-sm font-bold tracking-widest">taido.design</span>
          <div className="flex gap-8 text-xs font-light tracking-widest text-neutral-400">
            <a href="#works" className="hover:text-neutral-900 transition-colors">Works</a>
            <a href="#about" className="hover:text-neutral-900 transition-colors">About</a>
            <a href="#contact" className="hover:text-neutral-900 transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-14">
        {/* Full-width photo */}
        <div
          className="w-full flex items-end"
          style={{ background: "#eeebe5", minHeight: "75vh", position: "relative" }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-xs tracking-widest text-neutral-300 uppercase">Photo coming soon</p>
          </div>
          <div className="relative z-10 px-8 md:px-16 pb-12">
            <h1
              className="font-black leading-none text-neutral-900"
              style={{ fontSize: "clamp(3rem, 9vw, 8rem)", letterSpacing: "-0.03em" }}
            >
              文脈を、<br />かたちに。
            </h1>
          </div>
        </div>
        {/* Meta bar */}
        <div className="px-8 md:px-16 py-6 border-b border-neutral-100 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-neutral-300 tracking-widest uppercase mb-1">Name</p>
            <p className="text-sm font-light">前田 敏幸</p>
          </div>
          <div>
            <p className="text-xs text-neutral-300 tracking-widest uppercase mb-1">Base</p>
            <p className="text-sm font-light">大阪府豊中市</p>
          </div>
          <div>
            <p className="text-xs text-neutral-300 tracking-widest uppercase mb-1">Role</p>
            <p className="text-sm font-light">Designer / Art Director</p>
          </div>
          <div>
            <p className="text-xs text-neutral-300 tracking-widest uppercase mb-1">Contact</p>
            <a href="mailto:hello@taido.design" className="text-sm font-light hover:opacity-50 transition-opacity">
              hello@taido.design
            </a>
          </div>
        </div>
      </section>

      {/* Works */}
      <section id="works" className="px-8 md:px-16 pt-20 pb-32">
        <div className="flex items-baseline justify-between mb-10 border-b border-neutral-100 pb-4">
          <h2 className="text-xs font-light tracking-widest text-neutral-400 uppercase">Works</h2>
          <span className="text-xs font-light text-neutral-300">{projects.length} categories</span>
        </div>

        {/* Tile grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-neutral-100">
          {projects.map((project) => (
            <div key={project.id} className="bg-white group">
              {/* Image area */}
              <div
                className="w-full bg-neutral-50 flex items-center justify-center transition-colors group-hover:bg-neutral-100"
                style={{ aspectRatio: "4 / 3" }}
              >
                <span className="text-xs text-neutral-200 tracking-widest uppercase font-light">
                  {project.category}
                </span>
              </div>
              {/* Meta */}
              <div className="px-4 py-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-sm font-bold leading-tight">{project.label}</h3>
                </div>
                <p className="text-xs font-light text-neutral-400 tracking-wider uppercase mb-3">
                  {project.category}
                </p>
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs font-light text-neutral-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="px-8 md:px-16">
        <div className="border-t border-neutral-100" />
      </div>

      {/* About */}
      <section id="about" className="px-8 md:px-16 pt-20 pb-32">
        <div className="flex items-baseline justify-between mb-10 border-b border-neutral-100 pb-4">
          <h2 className="text-xs font-light tracking-widest text-neutral-400 uppercase">About</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 mb-20">
          <div>
            <p
              className="font-bold leading-tight mb-8"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.02em", lineHeight: 1.2 }}
            >
              重いを軽く、<br />かたいをゆるく。
            </p>
            <p className="text-sm font-light text-neutral-500 leading-loose">
              社会的意義や文脈を、外に届く言葉・デザイン・写真・導線に変換する。
              地域・福祉・文化・出版・個人店・小規模事業者を主な顧客として、
              グラフィックデザインからブランディング、写真撮影、SNS広報設計まで
              一貫して手がける。
            </p>
          </div>
          <div>
            <p className="text-xs font-light tracking-widest text-neutral-300 uppercase mb-6">Disciplines</p>
            <div className="space-y-0">
              {skills.map((skill) => (
                <div
                  key={skill.en}
                  className="flex items-center justify-between py-3 border-b border-neutral-50"
                >
                  <span className="text-sm font-light">{skill.ja}</span>
                  <span className="text-xs font-light text-neutral-300 tracking-wider">{skill.en}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="px-8 md:px-16">
        <div className="border-t border-neutral-100" />
      </div>

      {/* Contact */}
      <section id="contact" className="px-8 md:px-16 pt-20 pb-32">
        <div className="flex items-baseline justify-between mb-10 border-b border-neutral-100 pb-4">
          <h2 className="text-xs font-light tracking-widest text-neutral-400 uppercase">Contact</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-16 items-end">
          <div>
            <p
              className="font-bold leading-tight mb-8"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.02em", lineHeight: 1.2 }}
            >
              お仕事の<br />ご相談
            </p>
            <p className="text-sm font-light text-neutral-500 leading-loose">
              地域・福祉・文化・出版・個人店・小規模事業者・IT企業・<br />
              教育医療介護領域からのご依頼をお待ちしています。
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-xs font-light tracking-widest text-neutral-300 uppercase mb-2">Email</p>
              <a
                href="mailto:hello@taido.design"
                className="text-lg font-light hover:opacity-50 transition-opacity tracking-tight"
              >
                hello@taido.design →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-100 px-8 md:px-16 py-8 flex items-center justify-between">
        <span className="text-xs font-light text-neutral-300 tracking-widest">
          © 2026 taido.design / 前田敏幸
        </span>
        <span className="text-xs font-light text-neutral-300 tracking-widest uppercase">
          Osaka, Japan
        </span>
      </footer>
    </div>
  );
}
