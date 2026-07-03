import Image from "next/image";
import { Noto_Sans_JP } from "next/font/google";
import { getProjects } from "@/lib/projects";
import Nav from "@/app/components/Nav";
import WorksGrid from "@/app/components/WorksGrid";
import ContactForm from "@/app/components/ContactForm";

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
  const projects = getProjects();
  return (
    <div className={`${notoSans.variable}`} style={{ fontFamily: "'Optima', 'Optima Nova', Candara, var(--font-noto-sans), sans-serif" }}>

      <Nav theme="dark" />

      {/* Hero */}
      <section style={{ background: "#3a5545" }} className="px-6 md:px-10 pt-14 pb-14">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1
              className="font-light text-white"
              style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", letterSpacing: "-0.01em", lineHeight: 1.3 }}
            >
              文脈を、<br />かたちに。
            </h1>
            <p className="hidden md:block mt-5 font-light" style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.95rem", lineHeight: 1.9, letterSpacing: "0.03em" }}>
              社会的意義や文脈を、<br />外に届く言葉・デザイン・写真・導線に変換する。
            </p>
            <p className="mt-4 text-xs font-light" style={{ color: "rgba(255,255,255,0.7)", letterSpacing: "0.05em" }}>
              Designer / Art Director
            </p>
          </div>
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
            <Image
              src="/photobook-spread.jpg"
              alt="Works"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>

      </section>

      {/* Works */}
      <section id="works" style={{ background: "white" }}>
        <div className="px-6 md:px-10 py-4 flex items-center justify-between"
          style={{ borderBottom: "1px solid #e0e0e0" }}>
          <h2 className="text-xs font-light tracking-widest" style={{ color: "#888", letterSpacing: "0.12em" }}>WORKS</h2>
          <span className="text-xs font-light" style={{ color: "#aaa" }}>{projects.length} works</span>
        </div>
        <WorksGrid projects={projects} />
      </section>

      {/* About */}
      <section id="about" style={{ background: "#3a5545", color: "white" }}
        className="px-6 md:px-10 py-16">
        <h2 className="text-xs font-light tracking-widest mb-10"
          style={{ color: "rgba(255,255,255,0.6)", letterSpacing: "0.12em" }}>ABOUT</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="font-light text-white mb-6"
              style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", letterSpacing: "-0.01em", lineHeight: 1.5 }}>
              届く言葉と、<br />残るかたち。
            </p>
            <p className="text-xs font-light leading-loose" style={{ color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
              社会的意義や文脈を、外に届く言葉・デザイン・写真・導線に変換する。
              地域・福祉・文化・出版・個人店・小規模事業者を主な顧客として、
              グラフィックデザインからブランディング、写真撮影、SNS広報設計まで
              一貫して手がける。
            </p>
          </div>
          <div>
            <p className="text-xs font-light tracking-widest mb-5"
              style={{ color: "rgba(255,255,255,0.6)", letterSpacing: "0.12em" }}>DISCIPLINES</p>
            <div>
              {skills.map((skill) => (
                <div key={skill.en} className="flex items-center justify-between py-2"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
                  <span className="text-xs font-light text-white">{skill.ja}</span>
                  <span className="text-xs font-light" style={{ color: "rgba(255,255,255,0.6)", fontSize: "10px" }}>{skill.en}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ background: "white" }}
        className="px-6 md:px-10 py-16">
        <h2 className="text-xs font-light tracking-widest mb-10" style={{ color: "#888", letterSpacing: "0.12em" }}>CONTACT</h2>
        <div className="grid md:grid-cols-2 gap-16">
          <ContactForm />
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-xs font-light mb-2" style={{ color: "#888", letterSpacing: "0.08em" }}>Address</p>
              <p className="text-xs font-light leading-loose" style={{ color: "#333" }}>
                大阪府豊中市<br />Toyonaka, Osaka, Japan
              </p>
            </div>
            <div>
              <p className="text-xs font-light mb-2" style={{ color: "#888", letterSpacing: "0.08em" }}>Follow</p>
              <a href="https://www.instagram.com/maedatoshiyuk1_works/"
                target="_blank" rel="noopener noreferrer"
                className="text-xs font-light hover:opacity-50 transition-opacity"
                style={{ color: "#111", textDecoration: "underline", textUnderlineOffset: "4px" }}>
                Instagram
              </a>
            </div>
            <div>
              <p className="text-xs font-light mb-2" style={{ color: "#888", letterSpacing: "0.08em" }}>Blog</p>
              <a href="https://note.com/maedatoshiyuk1"
                target="_blank" rel="noopener noreferrer"
                className="text-xs font-light hover:opacity-50 transition-opacity"
                style={{ color: "#111", textDecoration: "underline", textUnderlineOffset: "4px" }}>
                note
              </a>
            </div>
            <div>
              <p className="text-xs font-light mb-2" style={{ color: "#888", letterSpacing: "0.08em" }}>Store</p>
              <a href="https://madeastore.stores.jp/"
                target="_blank" rel="noopener noreferrer"
                className="text-xs font-light hover:opacity-50 transition-opacity"
                style={{ color: "#111", textDecoration: "underline", textUnderlineOffset: "4px" }}>
                made a store
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#3a4a2c" }}
        className="px-6 md:px-10 py-4 flex items-center justify-between">
        <span className="text-xs font-light" style={{ color: "rgba(255,255,255,0.5)", fontSize: "10px" }}>
          © 2026 taido.design
        </span>
        <span className="text-xs font-light" style={{ color: "rgba(255,255,255,0.5)", fontSize: "10px" }}>
          Osaka, Japan
        </span>
      </footer>

    </div>
  );
}
