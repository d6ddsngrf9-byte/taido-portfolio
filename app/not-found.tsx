import Link from "next/link";
import Nav from "@/app/components/Nav";

const linkStyle = {
  color: "#333",
  textDecoration: "underline",
  textUnderlineOffset: "4px",
  letterSpacing: "0.06em",
} as const;

export default function NotFound() {
  return (
    <div
      style={{
        background: "var(--paper)",
        minHeight: "100vh",
        fontFamily: "'Optima', 'Optima Nova', Candara, sans-serif",
      }}
    >
      <Nav />
      <main className="px-6 md:px-10 py-24 max-w-3xl">
        <p className="text-xs font-light mb-4" style={{ color: "#3a5545", letterSpacing: "0.12em" }}>404</p>
        <h1 className="font-light mb-6" style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", color: "#111", lineHeight: 1.5 }}>
          Page not found
        </h1>
        <p className="text-xs font-light mb-10" style={{ color: "#666", lineHeight: 2 }}>
          お探しのページは見つかりませんでした。<br />
          アドレスが変わったか、削除された可能性があります。
        </p>
        <nav className="flex flex-col gap-3 text-xs font-light" aria-label="ナビゲーション">
          <Link href="/" style={linkStyle}>トップへ戻る</Link>
          <Link href="/#works" style={linkStyle}>Works を見る</Link>
          <Link href="/#contact" style={linkStyle}>Contact へ</Link>
        </nav>
      </main>
    </div>
  );
}
