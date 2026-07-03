import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Noto_Sans_JP } from 'next/font/google';
import { getProject, getProjects, CATEGORIES } from '@/lib/projects';
import Nav from '@/app/components/Nav';
import Link from 'next/link';

const notoSans = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-noto-sans',
});

export async function generateStaticParams() {
  return getProjects().map((p) => ({ id: p.id }));
}

export default async function WorkPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProject(id);
  if (!project) notFound();

  const all = getProjects();
  const sameCategory = all.filter((p) => p.category === project.category);
  const idx = sameCategory.findIndex((p) => p.id === id);
  const prev = idx > 0 ? sameCategory[idx - 1] : null;
  const next = idx < sameCategory.length - 1 ? sameCategory[idx + 1] : null;
  const cat = CATEGORIES.find((c) => c.id === project.category);

  return (
    <div
      className={notoSans.variable}
      style={{ fontFamily: "'Optima', 'Optima Nova', Candara, var(--font-noto-sans), sans-serif", background: 'var(--paper)', minHeight: '100vh' }}
    >
      <Nav />

      <main className="px-6 md:px-10 py-12 max-w-5xl">
        {/* Meta */}
        <div className="mb-10" style={{ borderBottom: '1px solid #eee', paddingBottom: '1.5rem' }}>
          {cat && (
            <p className="text-xs font-light mb-2" style={{ color: '#3a5545', letterSpacing: '0.1em' }}>
              {cat.ja}
            </p>
          )}
          <p className="text-xs font-light mb-1" style={{ color: '#aaa', letterSpacing: '0.08em' }}>
            {project.year}
          </p>
          <h1 className="font-light" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', color: '#111', lineHeight: 1.4 }}>
            {project.client}
          </h1>
          <p className="text-xs font-light mt-2" style={{ color: '#666', lineHeight: 1.8 }}>
            {project.description}
          </p>
        </div>

        {/* Images */}
        {project.images.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.images.map((src, i) => (
              <div key={i} className="relative w-full overflow-hidden" style={{ aspectRatio: '4/3', background: '#f0f0f0' }}>
                <Image
                  src={src}
                  alt={`${project.client} ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <div style={{ height: '200px', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '11px', color: '#ccc', letterSpacing: '0.1em' }}>NO IMAGE</span>
          </div>
        )}

        {/* Prev / Next within same category */}
        {(prev || next) && (
          <div className="mt-12 flex items-center justify-between"
            style={{ borderTop: '1px solid #eee', paddingTop: '1.5rem' }}>
            <div>
              {prev && (
                <Link href={`/works/${prev.id}`} style={{ textDecoration: 'none' }}>
                  <p className="text-xs font-light" style={{ color: '#aaa', letterSpacing: '0.06em', marginBottom: '2px' }}>← prev</p>
                  <p className="text-xs font-light" style={{ color: '#333' }}>{prev.client}</p>
                </Link>
              )}
            </div>
            <div className="text-right">
              {next && (
                <Link href={`/works/${next.id}`} style={{ textDecoration: 'none' }}>
                  <p className="text-xs font-light" style={{ color: '#aaa', letterSpacing: '0.06em', marginBottom: '2px' }}>next →</p>
                  <p className="text-xs font-light" style={{ color: '#333' }}>{next.client}</p>
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Back */}
        <div className="mt-8">
          <Link href="/#works" className="text-xs font-light" style={{ color: '#aaa', letterSpacing: '0.08em', textDecoration: 'underline', textUnderlineOffset: '4px' }}>
            ← Works に戻る
          </Link>
        </div>
      </main>

      <footer style={{ borderTop: '1px solid #eee', marginTop: '48px' }}
        className="px-6 md:px-10 py-4 flex items-center justify-between">
        <span style={{ fontSize: '10px', color: '#ccc' }}>© 2026 taido.design</span>
      </footer>
    </div>
  );
}
