'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { Work } from '@/lib/projects';
import { CATEGORIES } from '@/lib/categories';

export default function WorksGrid({ works, initialCategory = null }: { works: Work[]; initialCategory?: string | null }) {
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

  return (
    <>
      {/* Filter tabs */}
      <div className="px-6 md:px-10 py-3 flex gap-0 overflow-x-auto"
        style={{ borderBottom: '1px solid #e0e0e0', scrollbarWidth: 'none' }}>
        <button
          onClick={() => setActive(null)}
          className="shrink-0 text-xs font-light px-3 py-1 mr-1 transition-colors"
          style={{
            color: active === null ? '#111' : '#aaa',
            background: active === null ? '#f0f0f0' : 'transparent',
            borderRadius: '2px',
            letterSpacing: '0.06em',
          }}
        >
          All
        </button>
        {tabs.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActive(active === cat.id ? null : cat.id)}
            className="shrink-0 text-xs font-light px-3 py-1 mr-1 transition-colors"
            style={{
              color: active === cat.id ? '#111' : '#aaa',
              background: active === cat.id ? '#f0f0f0' : 'transparent',
              borderRadius: '2px',
              letterSpacing: '0.06em',
              whiteSpace: 'nowrap',
            }}
          >
            {cat.ja}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3" style={{ borderBottom: '1px solid #e0e0e0' }}>
        {filtered.map((work) => (
          <a
            key={work.slug}
            href={`/works/${work.slug}${active ? `?category=${active}` : ''}`}
            className="group"
            style={{ borderRight: '1px solid #e0e0e0', borderBottom: '1px solid #e0e0e0', marginRight: '-1px', display: 'block', textDecoration: 'none' }}
          >
            <div className="w-full relative overflow-hidden" style={{ aspectRatio: '4 / 3', background: '#f0f0f0' }}>
              {work.thumbnail?.src ? (
                <Image
                  src={work.thumbnail.src}
                  alt={work.thumbnail.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-103"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span style={{ color: '#bbb', fontSize: '10px' }}>{work.title}</span>
                </div>
              )}
            </div>
            <div className="px-4 pt-2 pb-5">
              <p className="font-light truncate" style={{ fontSize: '11px', letterSpacing: '0.03em', color: '#111' }}>
                {work.title}
              </p>
              <p className="font-light truncate mt-1" style={{ fontSize: '10px' }}>
                <span style={{ color: '#888', marginRight: '0.6em' }}>{work.year}</span>
                <span style={{ color: '#666' }}>{catText(work.categories)}</span>
              </p>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
