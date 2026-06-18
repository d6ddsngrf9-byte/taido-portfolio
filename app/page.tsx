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
      <section className="pt-14 min-h-screen flex flex-col">
        {/* Big photo area */}
        <div
          className="flex-1 w-full flex items-end"
          style={{ background: "#f0ede8", minHeight: "70vh", position: "relative" }}
        >
          {/* placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-xs tracking-widest text-neutral-300 uppercase">Photo coming soon</p>
          </div>
          {/* Tagline overlay */}
          <div className="relative z-10 p-10 md:p-16">
            <h1
              className="font-black leading-none text-neutral-900"
              style={{ fontSize: "clamp(2.8rem, 8vw, 6.5rem)", letterSpacing: "-0.02em" }}
            >
              文脈を、<br />
              かたちに。
            </h1>
          </div>
        </div>
        {/* Sub copy */}
        <div className="px-10 md:px-16 py-10 border-t border-neutral-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-sm font-light text-neutral-500 leading-loose">
            グラフィックデザイン・アートディレクション・ブランディング<br className="md:hidden" />
            <span className="hidden md:inline"> / </span>大阪府豊中市
          </p>
          <p className="text-xs font-light tracking-widest text-neutral-300 uppercase">
            Designer / Art Director — 前田 敏幸
          </p>
        </div>
      </section>

      {/* Works */}
      <section id="works" className="px-8 md:px-16 py-24">
        <div className="flex items-baseline justify-between mb-12">
          <h2 className="text-xs font-light tracking-widest text-neutral-400 uppercase">Works</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-neutral-100">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-white overflow-hidden"
              style={{ aspectRatio: "1 / 1" }}
            >
              {/* Image area */}
              <div
                className="w-full bg-neutral-50 flex items-center justify-center transition-colors group-hover:bg-neutral-100"
                style={{ height: "65%" }}
              >
                <span className="text-xs text-neutral-200 tracking-widest uppercase">
                  {project.category}
                </span>
              </div>
              {/* Text area */}
              <div className="px-4 py-4" style={{ height: "35%" }}>
                <p className="text-xs font-light text-neutral-400 mb-1 tracking-wider uppercase">
                  {project.category}
                </p>
                <h3 className="text-sm font-bold leading-tight">{project.label}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-8 md:px-16 py-24 border-t border-neutral-100">
        <div className="max-w-3xl">
          <h2 className="text-xs font-light tracking-widest text-neutral-400 uppercase mb-12">About</h2>
          <p
            className="font-bold leading-tight mb-12 text-neutral-900"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.01em" }}
          >
            重いを軽く、<br />かたいをゆるく。
          </p>
          <p className="text-sm font-light text-neutral-500 leading-loose mb-6 max-w-xl">
            社会的意義や文脈を、外に届く言葉・デザイン・写真・導線に変換する。
            地域・福祉・文化・出版・個人店・小規模事業者を主な顧客として、
            グラフィックデザインからブランディング、写真撮影、SNS広報設計まで一貫して手がける。
          </p>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-8">
            {skills.map((skill) => (
              <div key={skill} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-neutral-200 shrink-0" />
                <span className="text-xs font-light text-neutral-500">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-8 md:px-16 py-24 border-t border-neutral-100">
        <h2 className="text-xs font-light tracking-widest text-neutral-400 uppercase mb-12">Contact</h2>
        <div className="max-w-lg">
          <p
            className="font-bold leading-tight mb-10 text-neutral-900"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.01em" }}
          >
            お仕事の<br />ご相談
          </p>
          <p className="text-sm font-light text-neutral-500 leading-loose mb-10">
            地域・福祉・文化・出版・個人店・小規模事業者・IT企業・教育医療介護領域からのご依頼をお待ちしています。
          </p>
          <a
            href="mailto:hello@taido.design"
            className="inline-flex items-center gap-3 text-sm font-light tracking-wider text-neutral-900 hover:opacity-50 transition-opacity"
            style={{ borderBottom: "1px solid #1a1a1a", paddingBottom: "4px" }}
          >
            hello@taido.design
            <span className="text-neutral-400">→</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-100 px-8 md:px-16 py-8 flex items-center justify-between">
        <span className="text-xs font-light text-neutral-300 tracking-widest">
          © 2026 taido.design / 前田敏幸
        </span>
        <span className="text-xs font-light text-neutral-300 tracking-widest">
          OSAKA, JAPAN
        </span>
      </footer>

    </div>
  );
}
