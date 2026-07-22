'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { Work } from '@/lib/projects';
import { CATEGORIES } from '@/lib/categories';

export default function WorksGrid({
  works,
  initialCategory = null,
}: {
  works: Work[];
  initialCategory?: string | null;
}) {
  const [active, setActive] = useState<string | null>(initialCategory);

  // DISCIPLINES などから ?category= 付きで来たとき、その絞り込みに追従する
  useEffect(() => {
    setActive(initialCategory);
  }, [initialCategory]);

  const filtered = active ? works.filter((w) => w.categories.some((c) => c === active)) : works;

  // 実際に作品があるカテゴリだけフィルタに表示（空カテゴリ非表示）
  const used = new Set(works.flatMap((w) => w.categories));
  const tabs = CATEGORIES.filter((c) => used.has(c.id));

  const catText = (ids: string[]) =>
    ids.map((id) => CATEGORIES.find((c) => c.id === id)?.ja ?? id).join('・');

  const tabStyle = (on: boolean) => ({
    fontSize: '0.8rem',
    color: on ? 'var(--green)' : 'var(--muted)',
    borderBottom: `1px solid ${on ? 'var(--green)' : 'transparent'}`,
    paddingBottom: '3px',
    whiteSpace: 'nowrap' as const,
    transition: 'color .3s ease, border-color .3s ease',
  });

  return (
    <>
      {/* 絞り込み（罫線の箱をやめ、下線だけで状態を示す） */}
      <div className="px-6 md:px-10 flex gap-6 overflow-x-auto mb-10 md:mb-14" style={{ scrollbarWidth: 'none' }}>
        <button onClick={() => setActive(null)} className="shrink-0 font-light" style={tabStyle(active === null)}>
          All
        </button>
        {tabs.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActive(active === cat.id ? null : cat.id)}
            className="shrink-0 font-light"
            style={tabStyle(active === cat.id)}
          >
            {cat.ja}
          </button>
        ))}
      </div>

      {/* グリッド：囲み罫をやめ、余白で分ける */}
      <div className="px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
        {filtered.map((work) => (
          <a
            key={work.slug}
            href={`/works/${work.slug}${active ? `?category=${active}` : ''}`}
            className="group block"
            style={{ textDecoration: 'none' }}
          >
            <div
              className="w-full relative overflow-hidden"
              style={{ aspectRatio: '4 / 3', background: '#e9e5dc' }}
            >
              {work.thumbnail?.src ? (
                <Image
                  src={work.thumbnail.src}
                  alt={work.thumbnail.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="label">{work.title}</span>
                </div>
              )}
            </div>

            <div className="pt-5">
              <p className="font-light" style={{ fontSize: '1rem', color: 'var(--ink)' }}>
                {work.title}
              </p>
              <p className="label mt-2" style={{ fontSize: '10px', textTransform: 'none', letterSpacing: '0.1em' }}>
                {work.year}　{catText(work.categories)}
              </p>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
