import { projects } from "@/lib/projects";

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
    <div className="font-[family-name:var(--font-geist-sans)]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-neutral-100">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="text-sm font-semibold tracking-tight">taido.design</span>
          <div className="flex gap-6 text-sm text-neutral-500">
            <a href="#about" className="hover:text-neutral-900 transition-colors">About</a>
            <a href="#works" className="hover:text-neutral-900 transition-colors">Works</a>
            <a href="#contact" className="hover:text-neutral-900 transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
        <p className="text-sm text-neutral-400 mb-4 tracking-widest uppercase">Designer / Art Director</p>
        <h1 className="text-5xl font-bold tracking-tight leading-tight mb-6">
          前田 敏幸
        </h1>
        <p className="text-xl text-neutral-500 max-w-xl leading-relaxed">
          社会的意義や文脈を、外に届く言葉・デザイン・写真・導線に変換する。<br />
          大阪府豊中市を拠点に活動するデザイナー。
        </p>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-6 max-w-4xl mx-auto border-t border-neutral-100">
        <p className="text-xs text-neutral-400 tracking-widest uppercase mb-10">About</p>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">taido.design</h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              地域・福祉・文化・出版・個人店・小規模事業者を主な顧客として、
              グラフィックデザインからブランディング、写真撮影、SNS広報設計まで一貫して手がける。
            </p>
            <p className="text-neutral-600 leading-relaxed">
              「重いを軽く、かたいをゆるく」をキーワードに、
              クライアントの思想・背景・文脈を外向けの言葉とビジュアルへ翻訳する。
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4">Skills</h3>
            <ul className="space-y-2">
              {skills.map((skill) => (
                <li key={skill} className="flex items-center gap-2 text-neutral-700">
                  <span className="w-1 h-1 rounded-full bg-neutral-400 inline-block" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Works */}
      <section id="works" className="py-24 px-6 max-w-4xl mx-auto border-t border-neutral-100">
        <p className="text-xs text-neutral-400 tracking-widest uppercase mb-10">Works</p>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="border border-neutral-100 rounded-lg p-6 hover:border-neutral-300 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs text-neutral-400">{project.type}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  project.status === "進行中"
                    ? "bg-neutral-100 text-neutral-500"
                    : "bg-neutral-900 text-white"
                }`}>
                  {project.status}
                </span>
              </div>
              <p className="text-xs text-neutral-400 mb-1">{project.client}</p>
              <h3 className="font-semibold text-neutral-900 mb-2">{project.title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-1 mt-4">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-neutral-50 text-neutral-500 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6 max-w-4xl mx-auto border-t border-neutral-100">
        <p className="text-xs text-neutral-400 tracking-widest uppercase mb-10">Contact</p>
        <div className="max-w-lg">
          <h2 className="text-2xl font-semibold mb-4">お仕事のご相談</h2>
          <p className="text-neutral-600 leading-relaxed mb-8">
            地域・福祉・文化・出版・個人店・小規模事業者・IT企業・教育医療介護領域からのご依頼をお待ちしています。
          </p>
          <a
            href="mailto:hello0615@icloud.com"
            className="inline-flex items-center gap-2 bg-neutral-900 text-white px-6 py-3 rounded-full text-sm hover:bg-neutral-700 transition-colors"
          >
            メールで問い合わせる
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-100 py-8 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between text-xs text-neutral-400">
          <span>© 2026 taido.design / 前田敏幸</span>
          <span>大阪府豊中市</span>
        </div>
      </footer>
    </div>
  );
}
