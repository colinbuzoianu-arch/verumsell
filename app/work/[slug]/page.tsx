import { notFound } from "next/navigation";
import Link from "next/link";
import { PRODUCTS, bySlug } from "../../../lib/products";

export function generateStaticParams() {
  // Sub-brands have their own dedicated pages at /work/coupleiq and /work/anima-mundi
  // We exclude those slugs here to avoid route collision.
  return PRODUCTS
    .filter((p) => p.slug !== "anima-mundi" && p.slug !== "coupleiq")
    .map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = bySlug(params.slug);
  if (!p) return {};
  return {
    title: `${p.name} — Verumsell`,
    description: p.tagline,
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const p = bySlug(params.slug);
  if (!p) notFound();

  const others = PRODUCTS.filter((x) => x.slug !== p.slug).slice(0, 3);

  return (
    <>
      {/* coloured hero */}
      <section
        style={{
          background: p.background,
          color: p.accentInk,
          padding: "160px 32px 100px",
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ maxWidth: 1440, margin: "0 auto", width: "100%" }}>
          <Link
            href="/work"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              opacity: 0.7,
              marginBottom: 48,
              display: "inline-block",
            }}
          >
            ← All work
          </Link>

          <div
            style={{
              display: "flex",
              gap: 16,
              marginBottom: 32,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                opacity: 0.7,
              }}
            >
              {p.category}
            </span>
            <StatusPill status={p.status} ink={p.accentInk} />
            {p.subBrand && (
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  opacity: 0.7,
                }}
              >
                ↳ Part of {p.subBrand}
              </span>
            )}
          </div>

          <h1
            className="display"
            style={{
              fontSize: "clamp(64px, 11vw, 200px)",
              fontWeight: 400,
              lineHeight: 0.9,
              marginBottom: 32,
            }}
          >
            {p.name}
          </h1>
          <p
            className="display"
            style={{
              fontSize: "clamp(24px, 3vw, 40px)",
              fontWeight: 300,
              fontStyle: "italic",
              maxWidth: 900,
              opacity: 0.85,
              lineHeight: 1.2,
            }}
          >
            {p.tagline}
          </p>
        </div>
      </section>

      {/* description */}
      <section
        style={{
          padding: "100px 32px",
          maxWidth: 1440,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: 80,
        }}
      >
        <div>
          <div className="eyebrow" style={{ marginBottom: 16 }}>
            01 / Overview
          </div>
        </div>
        <div style={{ fontSize: 22, lineHeight: 1.55, color: "var(--ink-soft)" }}>
          {p.description}
        </div>
      </section>

      {/* expert layer (the differentiator) */}
      <section
        style={{
          padding: "100px 32px",
          maxWidth: 1440,
          margin: "0 auto",
          borderTop: "1px solid var(--line-soft)",
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: 80,
        }}
      >
        <div>
          <div className="eyebrow" style={{ marginBottom: 16 }}>
            02 / The expert layer
          </div>
          <h3
            className="display"
            style={{ fontSize: "clamp(28px, 3vw, 40px)", lineHeight: 1.05 }}
          >
            What's behind the AI
          </h3>
        </div>
        <div style={{ fontSize: 19, lineHeight: 1.65, color: "var(--ink-soft)" }}>
          {p.expertLayer}
        </div>
      </section>

      {/* highlights */}
      <section
        style={{
          padding: "100px 32px",
          maxWidth: 1440,
          margin: "0 auto",
          borderTop: "1px solid var(--line-soft)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: 80,
            marginBottom: 64,
          }}
        >
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>
              03 / Capabilities
            </div>
            <h3
              className="display"
              style={{ fontSize: "clamp(28px, 3vw, 40px)", lineHeight: 1.05 }}
            >
              What it does
            </h3>
          </div>
          <div>
            <p style={{ fontSize: 17, color: "var(--ink-muted)", marginBottom: 8 }}>For:</p>
            <p style={{ fontSize: 19, lineHeight: 1.6 }}>{p.audience}</p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          {p.highlights.map((h, i) => (
            <div
              key={i}
              style={{
                padding: "32px 28px",
                background: "var(--paper-warm)",
                borderTop: `2px solid ${p.accent}`,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  color: "var(--ink-muted)",
                  marginBottom: 12,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <p style={{ fontSize: 17, lineHeight: 1.5 }}>{h}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      {p.status !== "in-development" && (
        <section
          style={{
            padding: "100px 32px",
            maxWidth: 1440,
            margin: "0 auto",
            borderTop: "1px solid var(--line-soft)",
            textAlign: "center",
          }}
        >
          <h3
            className="display"
            style={{ fontSize: "clamp(36px, 5vw, 64px)", marginBottom: 32 }}
          >
            Try it.
          </h3>
          <a
            href={p.url ?? "#"}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-block",
              padding: "20px 40px",
              background: "var(--ink)",
              color: "var(--paper)",
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Open {p.name} →
          </a>
        </section>
      )}

      {p.status === "in-development" && (
        <section
          style={{
            padding: "100px 32px",
            maxWidth: 1440,
            margin: "0 auto",
            borderTop: "1px solid var(--line-soft)",
            textAlign: "center",
          }}
        >
          <div className="eyebrow" style={{ marginBottom: 16 }}>
            In development
          </div>
          <h3
            className="display"
            style={{ fontSize: "clamp(36px, 5vw, 64px)", marginBottom: 24 }}
          >
            Get notified when it ships.
          </h3>
          <Link
            href="/contact"
            style={{
              display: "inline-block",
              padding: "20px 40px",
              border: "1px solid var(--ink)",
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Drop me a line →
          </Link>
        </section>
      )}

      {/* other work */}
      <section
        style={{
          padding: "100px 32px",
          maxWidth: 1440,
          margin: "0 auto",
          borderTop: "1px solid var(--line-soft)",
        }}
      >
        <div className="eyebrow" style={{ marginBottom: 32 }}>
          More from the studio
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {others.map((o) => (
            <Link
              key={o.slug}
              href={`/work/${o.slug}`}
              style={{
                background: o.background,
                color: o.accentInk,
                padding: "36px 32px",
                minHeight: 220,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  opacity: 0.7,
                }}
              >
                {o.category}
              </div>
              <div>
                <h4
                  className="display"
                  style={{ fontSize: 36, marginBottom: 8, lineHeight: 1 }}
                >
                  {o.name}
                </h4>
                <p style={{ fontSize: 14, opacity: 0.85 }}>{o.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function StatusPill({ status, ink }: { status: string; ink: string }) {
  const labels: Record<string, string> = {
    live: "● Live",
    beta: "○ Beta",
    "in-development": "◌ In dev",
  };
  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        padding: "6px 10px",
        border: `1px solid ${ink}`,
        opacity: 0.8,
      }}
    >
      {labels[status] ?? status}
    </span>
  );
}
