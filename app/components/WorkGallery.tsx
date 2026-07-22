'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import type { WorkImage } from '@/lib/projects';

export default function WorkGallery({ images }: { images: WorkImage[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const [showBack, setShowBack] = useState(false);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);

  const open = (i: number) => { setIndex(i); setShowBack(false); };
  const close = useCallback(() => {
    setIndex((prev) => { if (prev !== null) triggers.current[prev]?.focus(); return null; });
    setShowBack(false);
  }, []);
  const step = useCallback((d: number) => {
    setIndex((prev) => (prev === null ? prev : (prev + d + images.length) % images.length));
    setShowBack(false);
  }, [images.length]);

  // キーボード操作と背面スクロールの固定
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); close(); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
      else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        if (images[index]?.back) { e.preventDefault(); setShowBack((v) => !v); }
      }
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prevOverflow; };
  }, [index, close, step, images]);

  const current = index === null ? null : images[index];
  const shown = current && showBack && current.back ? current.back : current;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-16">
        {images.map((img, i) => (
          <figure key={i} className="m-0">
            <button
              ref={(el) => { triggers.current[i] = el; }}
              type="button"
              onClick={() => open(i)}
              className="group block w-full p-0 cursor-zoom-in"
              style={{ border: 'none', background: 'transparent' }}
              aria-label={`${img.caption ?? img.alt} を拡大`}
            >
              <span className="relative block w-full overflow-hidden" style={{ aspectRatio: '4/3', background: '#e9e5dc' }}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </span>
            </button>
            {(img.caption || img.back) && (
              <figcaption className="label mt-3 flex items-center gap-3" style={{ textTransform: 'none', letterSpacing: '0.06em' }}>
                <span>{img.caption}</span>
                {img.back && <span style={{ color: 'var(--green)' }}>表裏</span>}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {current && shown && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={shown.alt}
          onClick={close}
          className="fixed inset-0 z-[100] flex flex-col"
          style={{ background: 'rgba(14,14,12,0.985)' }}
        >
          {/* 上部：閉じる */}
          <div className="flex justify-end p-4 md:p-6 shrink-0">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); close(); }}
              aria-label="閉じる"
              className="label"
              style={{ color: 'rgba(255,255,255,0.75)', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '12px' }}
            >
              Close ×
            </button>
          </div>

          {/* 画像 */}
          <div className="relative flex-1 min-h-0 mx-4 md:mx-12" onClick={(e) => e.stopPropagation()}>
            <Image src={shown.src} alt={shown.alt} fill sizes="100vw" className="object-contain" priority />
          </div>

          {/* 下部：キャプションと操作 */}
          <div className="shrink-0 px-4 md:px-12 py-5 flex flex-wrap items-center justify-between gap-4" onClick={(e) => e.stopPropagation()}>
            <span className="label" style={{ color: 'rgba(255,255,255,0.7)', textTransform: 'none', letterSpacing: '0.06em' }}>
              {current.caption}
              {current.back && <span style={{ marginLeft: '0.8em', color: 'rgba(255,255,255,0.45)' }}>{showBack ? '裏面' : '表面'}</span>}
            </span>

            <span className="flex items-center gap-5">
              {current.back && (
                <button
                  type="button"
                  onClick={() => setShowBack((v) => !v)}
                  className="cta cta--paper"
                  style={{ fontSize: '0.8rem', padding: '0.6em 1.2em' }}
                >
                  {showBack ? '表面を見る' : '裏面を見る'}
                </button>
              )}
              {images.length > 1 && (
                <>
                  <button type="button" onClick={() => step(-1)} aria-label="前の画像" className="label"
                    style={{ color: 'rgba(255,255,255,0.75)', background: 'transparent', border: 'none', cursor: 'pointer' }}>←</button>
                  <span className="label" style={{ color: 'rgba(255,255,255,0.45)' }}>{index! + 1} / {images.length}</span>
                  <button type="button" onClick={() => step(1)} aria-label="次の画像" className="label"
                    style={{ color: 'rgba(255,255,255,0.75)', background: 'transparent', border: 'none', cursor: 'pointer' }}>→</button>
                </>
              )}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
