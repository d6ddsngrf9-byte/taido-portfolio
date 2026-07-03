'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Project } from '@/lib/projects';
import { CATEGORIES } from '@/lib/categories';

export default function WorksGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<string | null>(null);

  const filtered = active ? projects.filter((p) => p.category === active) : projects;

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
        {CATEGORIES.map((cat) => (
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
      <div className="grid grid-cols-2" style={{ borderBottom: '1px solid #e0e0e0' }}>
        {filtered.map((project) => (
          <a
            key={project.id}
            href={`/works/${project.id}${active ? `?category=${active}` : ''}`}
            className="group"
            style={{ borderRight: '1px solid #e0e0e0', borderBottom: '1px solid #e0e0e0', marginRight: '-1px', display: 'block', textDecoration: 'none' }}
          >
            <div className="w-full relative overflow-hidden" style={{ aspectRatio: '4 / 3', background: '#f0f0f0' }}>
              {project.coverImage ? (
                <Image
                  src={project.coverImage}
                  alt={project.client}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-103"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span style={{ color: '#bbb', fontSize: '10px' }}>{project.description}</span>
                </div>
              )}
            </div>
            <div className="px-4 pt-2 pb-5">
              <p className="font-light truncate" style={{ fontSize: '10px', letterSpacing: '0.03em' }}>
                <span style={{ color: '#888', marginRight: '0.6em' }}>{project.year}</span>
                <span style={{ color: '#111', marginRight: '0.6em' }}>{project.client}</span>
                <span style={{ color: '#666' }}>{project.description}</span>
              </p>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
