'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import type { WorkImage } from '@/lib/projects';

export default function WorkGallery({ images }: { images: WorkImage[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const [slide, setSlide] = useState(0); // 0 = 表面 / 1 = 裏面
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const touchX = useRef<number | null>(null);

  const open = (i: number) => { setIndex(i); setSlide(0); };
  const close = useCallback(() => {
    setIndex((prev) => { if (prev !== null) triggers.current[prev]?.focus(); return null; });
    setSlide(0);
  }, []);
  const step = useCallback((d: number) => {
    setIndex((prev) => (prev === null ? prev : (prev + d + images.length) % images.length));
    setSlide(0);
  }, [images.length]);

  const current = index === null ? null : images[index];
  const slides = current ? (current.back ? [current, current.back] : [current]) : [];

  const moveSlide = useCallback((d: number) => {
    setSlide((s) => Math.min(Math.max(s + d, 0), Math.max(slides.length - 1, 0)));
  }, [slides.length]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); close(); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); moveSlide(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); moveSlide(-1); }
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prevOverflow; };
  }, [index, close, step, moveSlide]);

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

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.caption ?? current.alt}
          onClick={close}
          className="fixed inset-0 z-[100] flex flex-col"
          style={{ background: 'rgba(14,14,12,0.985)' }}
        >
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

          {/* 表裏のカルーセル：スワイプで送る */}
          <div
            className="relative flex-1 min-h-0 overflow-hidden mx-4 md:mx-12"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              touchX.current = null;
              if (Math.abs(dx) < 40) return;
              moveSlide(dx < 0 ? 1 : -1);
            }}
          >
            <div
              className="flex h-full"
              style={{
                width: `${slides.length * 100}%`,
                transform: `translateX(-${slide * (100 / slides.length)}%)`,
                transition: 'transform .45s cubic-bezier(.4,0,.2,1)',
              }}
            >
              {slides.map((s, i) => (
                <div key={i} className="relative h-full" style={{ width: `${100 / slides.length}%` }}>
                  <Image src={s.src} alt={s.alt} fill sizes="100vw" className="object-contain" priority={i === 0} />
                </div>
              ))}
            </div>
          </div>

          <div className="shrink-0 px-4 md:px-12 py-5 flex flex-wrap items-center justify-between gap-4" onClick={(e) => e.stopPropagation()}>
            <span className="label" style={{ color: 'rgba(255,255,255,0.7)', textTransform: 'none', letterSpacing: '0.06em' }}>
              {current.caption}
              {slides.length > 1 && (
                <span style={{ marginLeft: '0.8em', color: 'rgba(255,255,255,0.45)' }}>{slide === 0 ? '表面' : '裏面'}</span>
              )}
            </span>

            <span className="flex items-center gap-5">
              {/* 表裏のドット */}
              {slides.length > 1 && (
                <span className="flex items-center gap-2" role="tablist" aria-label="表面と裏面">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      role="tab"
                      aria-selected={slide === i}
                      aria-label={i === 0 ? '表面' : '裏面'}
                      onClick={() => setSlide(i)}
                      style={{
                        width: 9, height: 9, borderRadius: '50%', padding: 0, border: 'none', cursor: 'pointer',
                        background: slide === i ? '#fff' : 'rgba(255,255,255,0.32)',
                        transition: 'background .3s ease',
                      }}
                    />
                  ))}
                </span>
              )}

              {images.length > 1 && (
                <>
                  <button type="button" onClick={() => step(-1)} aria-label="前の公演" className="label"
                    style={{ color: 'rgba(255,255,255,0.75)', background: 'transparent', border: 'none', cursor: 'pointer' }}>←</button>
                  <span className="label" style={{ color: 'rgba(255,255,255,0.45)' }}>{index! + 1} / {images.length}</span>
                  <button type="button" onClick={() => step(1)} aria-label="次の公演" className="label"
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
