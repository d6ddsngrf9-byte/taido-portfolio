"use client";

import { useState } from "react";
import Link from "next/link";

type NavProps = {
  activeLink?: string;
};

export default function Nav({ activeLink }: NavProps) {
  const [open, setOpen] = useState(false);

  const green = "#3a5545";
  const textColor = "rgba(58,85,69,0.7)";
  const activeColor = green;

  return (
    <>
      <nav style={{ background: "var(--paper)", borderBottom: "1px solid #e0e0e0", position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}
        className="px-6 md:px-10 h-20 flex items-center justify-between">

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
        <div className="hidden md:flex gap-6 text-xs font-light" style={{ color: textColor, letterSpacing: "0.08em" }}>
          <Link href="/#works" className="hover:opacity-100 transition-opacity" style={{ color: activeLink === "works" ? activeColor : textColor }}>Works</Link>
          <Link href="/about" className="hover:opacity-100 transition-opacity" style={{ color: activeLink === "about" ? activeColor : textColor }}>About</Link>
          <a href="https://note.com/maedatoshiyuk1" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity" style={{ color: activeLink === "blog" ? activeColor : textColor }}>Blog</a>
          <a href="https://madeastore.stores.jp/" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity" style={{ color: activeLink === "store" ? activeColor : textColor }}>Store</a>
          <Link href="/#contact" className="hover:opacity-100 transition-opacity" style={{ color: activeLink === "contact" ? activeColor : textColor }}>Contact</Link>
        </div>

        {/* Menu icon button */}
        <button
          className="md:hidden w-8 h-8 flex items-center justify-center"
          onClick={() => setOpen(!open)}
          aria-label="メニュー"
        >
          {open ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="2" y1="2" x2="16" y2="16" stroke={green} strokeWidth="1.2"/>
              <line x1="16" y1="2" x2="2" y2="16" stroke={green} strokeWidth="1.2"/>
            </svg>
          ) : (
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="0" y1="1" x2="20" y2="1" stroke={green} strokeWidth="1.2"/>
              <line x1="0" y1="7" x2="20" y2="7" stroke={green} strokeWidth="1.2"/>
              <line x1="0" y1="13" x2="20" y2="13" stroke={green} strokeWidth="1.2"/>
            </svg>
          )}
        </button>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden absolute top-full left-0 right-0 z-50 flex flex-col gap-0"
            style={{ background: "var(--paper)", borderTop: "1px solid #eee", borderBottom: "1px solid #e0e0e0" }}>
            {[
              { href: "/#works", label: "Works", key: "works" },
              { href: "/about", label: "About", key: "about" },
              { href: "https://note.com/maedatoshiyuk1", label: "Blog", key: "blog" },
              { href: "https://madeastore.stores.jp/", label: "Store", key: "store" },
              { href: "/#contact", label: "Contact", key: "contact" },
            ].map((item) => (
              <Link key={item.key} href={item.href}
                onClick={() => setOpen(false)}
                className="px-6 py-4 text-xs font-light"
                style={{
                  color: activeLink === item.key ? activeColor : textColor,
                  borderBottom: "1px solid #f0f0f0",
                  letterSpacing: "0.08em",
                }}>
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* 固定ヘッダー分の余白 */}
      <div className="h-20" aria-hidden="true" />
    </>
  );
}
