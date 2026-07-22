import Image from "next/image";
import { getWorks } from "@/lib/projects";
import { CATEGORIES } from "@/lib/categories";
import Nav from "@/app/components/Nav";
import WorksGrid from "@/app/components/WorksGrid";
import ContactForm from "@/app/components/ContactForm";
import Cta from "@/app/components/Cta";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[] }>;
}) {
  const works = getWorks();
  const sp = await searchParams;
  const catParam = typeof sp.category === "string" ? sp.category : null;
  const activeCategory = CATEGORIES.some((c) => c.id === catParam) ? catParam : null;

  return (
    <>
      <Nav />

      {/* ===== Hero：中央は空け、文字は下端に寄せる ===== */}
      <section aria-label="イントロダクション">
        <div className="grid md:grid-cols-2" style={{ minHeight: "calc(100svh - 5rem)" }}>
          {/* ビジュアル（モバイルは上／デスクトップは右へ裁ち落とし） */}
          <div
            className="relative order-1 md:order-2"
            style={{ minHeight: "46svh", background: "#e9e5dc" }}
          >
            <Image
              src="/photobook-spread.jpg"
              alt="澄毅 写真集の誌面"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          {/* テキスト（下端に寄せる） */}
          <div className="order-2 md:order-1 flex flex-col justify-end px-6 md:px-10 pt-12 pb-14 md:pb-20">
            <span className="label">Designer / Art Director</span>

            <h1
              className="display mt-6"
              style={{ fontSize: "clamp(2.1rem, 4.6vw, 4rem)", color: "var(--green)" }}
            >
              文脈を、かたちに。
            </h1>

            <p
              className="mt-7 font-light"
              style={{ color: "var(--body)", fontSize: "0.95rem", lineHeight: 2 }}
            >
              社会的意義や文脈を、外に届く
              <br />
              言葉・デザイン・写真・導線に変換する。
            </p>

            <div className="mt-10">
              <Cta href="/#works">Works</Cta>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Works ===== */}
      <section id="works" className="pt-24 md:pt-40 pb-20 md:pb-32">
        <div className="px-6 md:px-10 flex items-baseline justify-between mb-10 md:mb-16">
          <h2 className="label label--green">Works</h2>
          <span className="label">{works.length} projects</span>
        </div>
        <WorksGrid works={works} initialCategory={activeCategory} />
      </section>

      {/* ===== About ===== */}
      <section id="about" className="px-6 md:px-10 pt-20 md:pt-32 pb-20 md:pb-32">
        <h2 className="label label--green mb-10 md:mb-16">About</h2>

        <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-start">
          <div>
            <p
              className="display"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)", lineHeight: 1.45 }}
            >
              届く言葉と、
              <br />
              残るかたち。
            </p>
            <p
              className="mt-8 font-light"
              style={{ color: "var(--body)", fontSize: "0.9rem", lineHeight: 2.1, maxWidth: "34em" }}
            >
              社会的意義や文脈を、外に届く言葉・デザイン・写真・導線に変換する。
              地域・福祉・文化・出版・個人店・小規模事業者を主な顧客として、
              グラフィックデザインからブランディング、写真撮影、SNS広報設計まで
              一貫して手がける。
            </p>
            <div className="mt-10">
              <Cta href="/about">Profile</Cta>
            </div>
          </div>

          <div>
            <span className="label mb-6">Disciplines</span>
            <div style={{ borderTop: "1px solid var(--rule)" }}>
              {CATEGORIES.map((cat) => (
                <a
                  key={cat.id}
                  href={`/?category=${cat.id}#works`}
                  className="flex items-baseline justify-between py-4 transition-opacity hover:opacity-55"
                  style={{ borderBottom: "1px solid var(--rule)", textDecoration: "none" }}
                >
                  <span className="font-light" style={{ color: "var(--ink)", fontSize: "0.9rem" }}>
                    {cat.ja}
                  </span>
                  <span className="label" style={{ fontSize: "10px" }}>
                    {cat.en}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Contact ===== */}
      <section id="contact" className="px-6 md:px-10 pt-20 md:pt-32 pb-24 md:pb-36">
        <h2 className="label label--green mb-10 md:mb-16">Contact</h2>

        <div className="grid md:grid-cols-2 gap-14 md:gap-20">
          <ContactForm />

          <div className="flex flex-col gap-10">
            <div>
              <span className="label mb-3">Address</span>
              <p className="font-light" style={{ color: "var(--body)", fontSize: "0.9rem", lineHeight: 2 }}>
                大阪府豊中市
                <br />
                Toyonaka, Osaka, Japan
              </p>
            </div>

            <div className="flex flex-col gap-4 items-start">
              <Cta href="https://www.instagram.com/maedatoshiyuk1_works/" external>
                Instagram
              </Cta>
              <Cta href="https://note.com/maedatoshiyuk1" external>
                note
              </Cta>
              <Cta href="https://madeastore.stores.jp/" external>
                made a store
              </Cta>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
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
