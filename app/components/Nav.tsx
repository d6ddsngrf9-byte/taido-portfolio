"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type NavProps = {
  activeLink?: string;
  /** ヒーローに重ねる場合 true（上端では透過、スクロールで紙色になる） */
  overlay?: boolean;
};

const LINKS = [
  { href: "/#works", label: "Works", key: "works", external: false },
  { href: "/about", label: "About", key: "about", external: false },
  { href: "https://note.com/maedatoshiyuk1", label: "Blog", key: "blog", external: true },
  { href: "https://madeastore.stores.jp/", label: "Store", key: "store", external: true },
  { href: "/#contact", label: "Contact", key: "contact", external: false },
];

export default function Nav({ activeLink, overlay = false }: NavProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = !overlay || scrolled;
  const green = "#3a5545";

  const linkStyle = {
    fontFamily: "var(--font-display)",
    textTransform: "uppercase" as const,
    letterSpacing: "0.16em",
    fontSize: "11px",
    color: green,
  };

  return (
    <>
      <nav
        style={{
          background: solid ? "var(--paper)" : "transparent",
          borderBottom: `1px solid ${solid && scrolled ? "var(--rule)" : "transparent"}`,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "background-color .4s ease, border-color .4s ease",
        }}
        className="px-6 md:px-10 h-20 flex items-center justify-between"
      >
        <Link href="/" aria-label="taido.design" className="block">
          <span
            aria-hidden="true"
            style={{
              display: "block",
              width: "143px",
              height: "35px",
              backgroundColor: green,
              WebkitMaskImage: "url(/logo.svg)",
              maskImage: "url(/logo.svg)",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "left center",
              maskPosition: "left center",
              WebkitMaskSize: "contain",
              maskSize: "contain",
            }}
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex gap-8">
          {LINKS.map((item) =>
            item.external ? (
              <a
                key={item.key}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-55"
                style={{ ...linkStyle, opacity: activeLink === item.key ? 1 : 0.75 }}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.key}
                href={item.href}
                className="transition-opacity hover:opacity-55"
                style={{ ...linkStyle, opacity: activeLink === item.key ? 1 : 0.75 }}
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        {/* Menu icon button */}
        <button
          className="md:hidden w-8 h-8 flex items-center justify-center"
          onClick={() => setOpen(!open)}
          aria-label="メニュー"
          aria-expanded={open}
        >
          {open ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="2" y1="2" x2="16" y2="16" stroke={green} strokeWidth="1.2" />
              <line x1="16" y1="2" x2="2" y2="16" stroke={green} strokeWidth="1.2" />
            </svg>
          ) : (
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="0" y1="1" x2="20" y2="1" stroke={green} strokeWidth="1.2" />
              <line x1="0" y1="7" x2="20" y2="7" stroke={green} strokeWidth="1.2" />
              <line x1="0" y1="13" x2="20" y2="13" stroke={green} strokeWidth="1.2" />
            </svg>
          )}
        </button>

        {/* Mobile menu */}
        {open && (
          <div
            className="md:hidden absolute top-full left-0 right-0 z-50 flex flex-col"
            style={{ background: "var(--paper)", borderTop: "1px solid var(--rule)" }}
          >
            {LINKS.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-6 py-5"
                style={{ ...linkStyle, borderBottom: "1px solid var(--rule)" }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* 固定ヘッダー分の余白（ヒーローに重ねる場合は不要） */}
      {!overlay && <div className="h-20" aria-hidden="true" />}
    </>
  );
}
