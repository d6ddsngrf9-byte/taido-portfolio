import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Noto_Sans_JP } from 'next/font/google';
import { getWork, getWorks, CATEGORIES } from '@/lib/projects';
import Nav from '@/app/components/Nav';

const notoSans = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-noto-sans',
});

const labelStyle = { color: '#bbb', letterSpacing: '0.12em' } as const;

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

  return (
    <div
      className={notoSans.variable}
      style={{ fontFamily: "'Optima', 'Optima Nova', Candara, var(--font-noto-sans), sans-serif", background: 'var(--paper)', minHeight: '100vh' }}
    >
      <Nav />

      <main className="px-6 md:px-10 py-12 max-w-5xl">
        {/* Meta */}
        <div className="mb-10" style={{ borderBottom: '1px solid #eee', paddingBottom: '1.5rem' }}>
          <p className="text-xs font-light mb-2" style={{ color: '#3a5545', letterSpacing: '0.1em' }}>
            {catLabels(work.categories).join('・')}
          </p>
          <p className="text-xs font-light mb-1" style={{ color: '#aaa', letterSpacing: '0.08em' }}>{work.year}</p>
          <h1 className="font-light" style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', color: '#111', lineHeight: 1.4 }}>
            {work.title}
          </h1>
          <p className="font-light mt-3" style={{ color: '#555', fontSize: '0.95rem', lineHeight: 1.9 }}>{work.lead}</p>

          {(work.client || work.services?.length) && (
            <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8">
              {work.client && (
                <div>
                  <dt className="text-xs font-light mb-1" style={labelStyle}>CLIENT</dt>
                  <dd className="text-xs font-light" style={{ color: '#333' }}>{work.client}</dd>
                </div>
              )}
              {work.services?.length ? (
                <div>
                  <dt className="text-xs font-light mb-1" style={labelStyle}>SERVICES</dt>
                  <dd className="text-xs font-light" style={{ color: '#333', lineHeight: 1.9 }}>{work.services.join(' / ')}</dd>
                </div>
              ) : null}
            </dl>
          )}
        </div>

        {/* Case study body（データがある項目のみ表示） */}
        {work.challenge && <Section label="CONTEXT / CHALLENGE" body={work.challenge} />}
        {work.approach && <Section label="APPROACH" body={work.approach} />}
        {work.design && <Section label="DESIGN" body={work.design} />}

        {/* Images */}
        {work.images.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {work.images.map((img, i) => (
              <figure key={i} className="m-0">
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4/3', background: '#f0f0f0' }}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>
                {img.caption && (
                  <figcaption className="text-xs font-light mt-2" style={{ color: '#999' }}>{img.caption}</figcaption>
                )}
              </figure>
            ))}
          </div>
        ) : null}

        {work.deliverables?.length ? (
          <div className="mt-10" style={{ borderTop: '1px solid #eee', paddingTop: '1.5rem' }}>
            <p className="text-xs font-light mb-3" style={labelStyle}>DELIVERABLES</p>
            <ul className="text-xs font-light" style={{ color: '#333', lineHeight: 2 }}>
              {work.deliverables.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
          </div>
        ) : null}

        {work.outcome && <Section label="OUTCOME" body={work.outcome} />}

        {work.credits?.length ? (
          <div className="mt-10" style={{ borderTop: '1px solid #eee', paddingTop: '1.5rem' }}>
            <p className="text-xs font-light mb-3" style={labelStyle}>CREDITS</p>
            <dl className="text-xs font-light" style={{ color: '#333', lineHeight: 2 }}>
              {work.credits.map((c, i) => (
                <div key={i} className="flex gap-4">
                  <dt style={{ color: '#999', minWidth: '8em' }}>{c.role}</dt>
                  <dd>{c.name}</dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}

        {/* Prev / Next（表示順を基準） */}
        {(prev || next) && (
          <nav className="mt-14 grid grid-cols-2 gap-4" style={{ borderTop: '1px solid #eee', paddingTop: '1.5rem' }} aria-label="作品ナビゲーション">
            <div>{prev && <WorkLink dir="prev" work={prev} />}</div>
            <div className="flex justify-end">{next && <WorkLink dir="next" work={next} />}</div>
          </nav>
        )}

        <div className="mt-8">
          <Link href="/#works" className="text-xs font-light" style={{ color: '#aaa', letterSpacing: '0.08em', textDecoration: 'underline', textUnderlineOffset: '4px' }}>
            ← Works に戻る
          </Link>
        </div>
      </main>

      <footer style={{ borderTop: '1px solid #eee', marginTop: '48px' }} className="px-6 md:px-10 py-4 flex items-center justify-between">
        <span style={{ fontSize: '10px', color: '#ccc' }}>© 2026 taido.design</span>
      </footer>
    </div>
  );
}

function Section({ label, body }: { label: string; body: string }) {
  return (
    <div className="mt-10">
      <p className="text-xs font-light mb-3" style={labelStyle}>{label}</p>
      <p className="font-light" style={{ color: '#333', fontSize: '0.95rem', lineHeight: 2 }}>{body}</p>
    </div>
  );
}

function WorkLink({ dir, work }: { dir: 'prev' | 'next'; work: { slug: string; title: string; thumbnail: { src: string } } }) {
  const isNext = dir === 'next';
  return (
    <Link
      href={`/works/${work.slug}`}
      className="inline-flex items-center gap-3 group"
      style={{ textDecoration: 'none', flexDirection: isNext ? 'row-reverse' : 'row' }}
    >
      <span className="relative shrink-0 overflow-hidden" style={{ width: '48px', height: '48px', background: '#f0f0f0' }}>
        <Image src={work.thumbnail.src} alt="" fill sizes="48px" className="object-cover" />
      </span>
      <span className={isNext ? 'text-right' : ''}>
        <span className="block text-xs font-light" style={{ color: '#aaa', letterSpacing: '0.06em' }}>{isNext ? 'next →' : '← prev'}</span>
        <span className="block text-xs font-light" style={{ color: '#333' }}>{work.title}</span>
      </span>
    </Link>
  );
}
