import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getWork, getWorks, CATEGORIES } from '@/lib/projects';
import Nav from '@/app/components/Nav';

function catLabels(ids: string[]) {
  return ids.map((id) => CATEGORIES.find((c) => c.id === id)?.ja ?? id);
}

export function generateStaticParams() {
  return getWorks().map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) return { title: 'ページが見つかりません｜taido.design' };
  const cats = catLabels(work.categories).join('・');
  const title = `${work.title}｜${cats}｜taido.design`;
  const description = work.lead;
  const url = `/works/${slug}`;
  const image = work.thumbnail.src;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: 'article', images: [{ url: image }] },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) notFound();

  const all = getWorks();
  const idx = all.findIndex((w) => w.slug === work.slug);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx < all.length - 1 ? all[idx + 1] : null;

  // 1点目は全画面ビジュアルとして使い、残りをグリッドへ
  const lead = work.images[0] ?? work.thumbnail;
  const rest = work.images.slice(1);

  return (
    <>
      <Nav />

      {/* ===== Lead visual =====
           縦長の紙モノを切らずに見せるため、同じ画像を引き延ばして背景に敷き、
           その上に作品全体（object-contain）を重ねる */}
      <section
        aria-hidden="true"
        className="relative overflow-hidden"
        style={{ height: '70svh', minHeight: 360, background: '#e9e5dc' }}
      >
        <Image
          src={lead.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          style={{ filter: 'blur(32px)', transform: 'scale(1.18)' }}
        />
        <Image src={lead.src} alt="" fill sizes="100vw" className="object-contain" priority />
      </section>

      <main className="px-6 md:px-10 pt-14 md:pt-20 pb-24 max-w-5xl">
        {/* ===== Title ===== */}
        <span className="label label--green">{catLabels(work.categories).join(' / ')}</span>

        <h1 className="display mt-5" style={{ fontSize: 'clamp(1.7rem, 3.4vw, 2.9rem)' }}>
          {work.title}
        </h1>

        <span className="label mt-4">{work.year}</span>

        <p className="mt-7 font-light" style={{ color: 'var(--body)', fontSize: '0.95rem', lineHeight: 2 }}>
          {work.lead}
        </p>

        {(work.client || work.services?.length) && (
          <dl className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-10">
            {work.client && (
              <div>
                <dt className="label mb-2">Client</dt>
                <dd className="font-light" style={{ color: 'var(--ink)', fontSize: '0.85rem' }}>{work.client}</dd>
              </div>
            )}
            {work.services?.length ? (
              <div>
                <dt className="label mb-2">Services</dt>
                <dd className="font-light" style={{ color: 'var(--ink)', fontSize: '0.85rem', lineHeight: 2 }}>
                  {work.services.join(' / ')}
                </dd>
              </div>
            ) : null}
          </dl>
        )}

        {/* ===== Case study（データがある項目のみ） ===== */}
        {work.challenge && <Section label="Context / Challenge" body={work.challenge} />}
        {work.approach && <Section label="Approach" body={work.approach} />}
        {work.design && <Section label="Design" body={work.design} />}

        {/* ===== Images ===== */}
        {rest.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-16">
            {rest.map((img, i) => (
              <figure key={i} className="m-0">
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4/3', background: '#e9e5dc' }}>
                  <Image src={img.src} alt={img.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                </div>
                {img.caption && <figcaption className="label mt-3" style={{ textTransform: 'none', letterSpacing: '0.06em' }}>{img.caption}</figcaption>}
              </figure>
            ))}
          </div>
        ) : null}

        {work.deliverables?.length ? (
          <div className="mt-16" style={{ borderTop: '1px solid var(--rule)', paddingTop: '1.75rem' }}>
            <span className="label mb-4">Deliverables</span>
            <ul className="font-light" style={{ color: 'var(--ink)', fontSize: '0.85rem', lineHeight: 2.2 }}>
              {work.deliverables.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {work.outcome && <Section label="Outcome" body={work.outcome} />}

        {work.credits?.length ? (
          <div className="mt-16" style={{ borderTop: '1px solid var(--rule)', paddingTop: '1.75rem' }}>
            <span className="label mb-4">Credits</span>
            <dl className="font-light" style={{ color: 'var(--ink)', fontSize: '0.85rem', lineHeight: 2.2 }}>
              {work.credits.map((c, i) => (
                <div key={i} className="flex gap-6">
                  <dt style={{ color: 'var(--muted)', minWidth: '9em' }}>{c.role}</dt>
                  <dd>{c.name}</dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}

        {/* ===== Prev / Next ===== */}
        {(prev || next) && (
          <nav
            className="mt-20 grid grid-cols-2 gap-6"
            style={{ borderTop: '1px solid var(--rule)', paddingTop: '1.75rem' }}
            aria-label="作品ナビゲーション"
          >
            <div>{prev && <WorkLink dir="prev" work={prev} />}</div>
            <div className="flex justify-end">{next && <WorkLink dir="next" work={next} />}</div>
          </nav>
        )}

        <div className="mt-12">
          <Link
            href="/#works"
            className="label transition-opacity hover:opacity-55"
            style={{ color: 'var(--green)' }}
          >
            ← Back to Works
          </Link>
        </div>
      </main>

      <footer
        style={{ borderTop: '1px solid var(--rule)' }}
        className="px-6 md:px-10 py-6 flex items-center justify-between"
      >
        <span className="label" style={{ fontSize: '10px' }}>© 2026 taido.design</span>
        <span className="label" style={{ fontSize: '10px' }}>Osaka, Japan</span>
      </footer>
    </>
  );
}

function Section({ label, body }: { label: string; body: string }) {
  return (
    <div className="mt-16">
      <span className="label mb-4">{label}</span>
      <p className="prose-jp font-light" style={{ fontSize: '0.95rem' }}>
        {body}
      </p>
    </div>
  );
}

function WorkLink({ dir, work }: { dir: 'prev' | 'next'; work: { slug: string; title: string; thumbnail: { src: string } } }) {
  const isNext = dir === 'next';
  return (
    <Link
      href={`/works/${work.slug}`}
      className="inline-flex items-center gap-4 group"
      style={{ textDecoration: 'none', flexDirection: isNext ? 'row-reverse' : 'row' }}
    >
      <span className="relative shrink-0 overflow-hidden" style={{ width: '56px', height: '56px', background: '#e9e5dc' }}>
        <Image src={work.thumbnail.src} alt="" fill sizes="56px" className="object-cover" />
      </span>
      <span className={isNext ? 'text-right' : ''}>
        <span className="label" style={{ fontSize: '10px' }}>{isNext ? 'Next' : 'Prev'}</span>
        <span className="block font-light mt-1" style={{ color: 'var(--ink)', fontSize: '0.85rem' }}>
          {work.title}
        </span>
      </span>
    </Link>
  );
}
