import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  /** paper = 画像の上に白で置く場合 */
  tone?: "ink" | "paper";
  external?: boolean;
};

/** figure.ai 由来：角丸アウトライン＋↗ の最小CTA */
export default function Cta({ href, children, tone = "ink", external = false }: Props) {
  const className = `cta cta--${tone}`;
  const inner = (
    <>
      <span>{children}</span>
      <span className="cta__arrow" aria-hidden="true">
        ↗
      </span>
    </>
  );

  if (external) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {inner}
    </Link>
  );
}
