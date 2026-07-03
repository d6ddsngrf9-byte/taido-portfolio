"use client";

import { useState } from "react";
import Link from "next/link";

type NavProps = {
  theme?: "dark" | "light";
  activeLink?: string;
};

export default function Nav({ theme = "dark", activeLink }: NavProps) {
  const [open, setOpen] = useState(false);

  const isDark = theme === "dark";
  const bg = isDark ? "#3a5545" : "white";
  const textColor = isDark ? "rgba(255,255,255,0.7)" : "#aaa";
  const logoFilter = isDark ? "brightness(0) invert(1)" : "none";
  const borderBottom = isDark ? "none" : "1px solid #eee";
  const activeColor = isDark ? "white" : "#111";

  return (
    <nav style={{ background: bg, borderBottom, position: "relative" }}
      className="px-6 md:px-10 h-20 flex items-center justify-between">

      <Link href="/">
        <img src="/logo.svg" alt="taido.design" style={{ height: "35px", filter: logoFilter }} />
      </Link>

      {/* Desktop links */}
      <div className="hidden md:flex gap-6 text-xs font-light" style={{ color: textColor, letterSpacing: "0.08em" }}>
        <Link href="/#works" className="hover:opacity-100 transition-opacity" style={{ color: activeLink === "works" ? activeColor : textColor }}>Works</Link>
        <Link href="/about" className="hover:opacity-100 transition-opacity" style={{ color: activeLink === "about" ? activeColor : textColor }}>About</Link>
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
            <line x1="2" y1="2" x2="16" y2="16" stroke={isDark ? "rgba(255,255,255,0.8)" : "#333"} strokeWidth="1.2"/>
            <line x1="16" y1="2" x2="2" y2="16" stroke={isDark ? "rgba(255,255,255,0.8)" : "#333"} strokeWidth="1.2"/>
          </svg>
        ) : (
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="1" x2="20" y2="1" stroke={isDark ? "rgba(255,255,255,0.8)" : "#333"} strokeWidth="1.2"/>
            <line x1="0" y1="7" x2="20" y2="7" stroke={isDark ? "rgba(255,255,255,0.8)" : "#333"} strokeWidth="1.2"/>
            <line x1="0" y1="13" x2="20" y2="13" stroke={isDark ? "rgba(255,255,255,0.8)" : "#333"} strokeWidth="1.2"/>
          </svg>
        )}
      </button>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden absolute top-full left-0 right-0 z-50 flex flex-col gap-0"
          style={{ background: bg, borderTop: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #eee" }}>
          {[
            { href: "/#works", label: "Works", key: "works" },
            { href: "/about", label: "About", key: "about" },
            { href: "/#contact", label: "Contact", key: "contact" },
          ].map((item) => (
            <Link key={item.key} href={item.href}
              onClick={() => setOpen(false)}
              className="px-6 py-4 text-xs font-light"
              style={{
                color: activeLink === item.key ? activeColor : textColor,
                borderBottom: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #f0f0f0",
                letterSpacing: "0.08em",
              }}>
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
