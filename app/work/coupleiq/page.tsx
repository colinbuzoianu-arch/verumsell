import Link from "next/link";
import { bySubBrand } from "../../../lib/products";

export const metadata = {
  title: "CoupleIQ — Verumsell",
  description: "Relationship apps grounded in 40 years of relationship science.",
};

export default function CoupleIQPage() {
  const products = bySubBrand("CoupleIQ");

  return (
    <>
      {/* hero — coupleiq palette takeover */}
      <section
        style={{
          background: "var(--coupleiq-cream)",
          color: "var(--accentInk, #3A1208)",
          padding: "160px 32px 100px",
          minHeight: "85vh",
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
              color: "var(--coupleiq)",
              marginBottom: 48,
              display: "inline-block",
            }}
          >
            ← All work
          </Link>

          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--coupleiq)",
              marginBottom: 32,
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 32,
                height: 2,
                background: "var(--coupleiq)",
                marginRight: 12,
                verticalAlign: "middle",
              }}
            />
            Verumsell sub-brand · Established 2026
          </div>

          <h1
            className="display"
            style={{
              fontSize: "clamp(72px, 14vw, 220px)",
              fontWeight: 400,
              lineHeight: 0.85,
              marginBottom: 32,
              color: "var(--coupleiq)",
              letterSpacing: "-0.04em",
            }}
          >
            Couple<em style={{ fontStyle: "italic" }}>IQ</em>
          </h1>

          <p
            style={{
              fontSize: "clamp(22px, 2.5vw, 32px)",
              fontWeight: 300,
              lineHeight: 1.35,
              maxWidth: 840,
              color: "#3A1208",
            }}
          >
            Relationships deserve more than guesswork. CoupleIQ is the line of apps that gives
            couples honest, science-backed answers — privately, and in five minutes or less.
          </p>
        </div>
      </section>

      {/* manifesto */}
      <section
        style={{
          background: "var(--coupleiq)",
          color: "var(--coupleiq-cream)",
          padding: "120px 32px",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: 80,
          }}
        >
          <div
            className="eyebrow"
            style={{ color: "rgba(245, 235, 216, 0.7)" }}
          >
            The thesis
          </div>
          <div className="display" style={{ fontSize: "clamp(28px, 3.2vw, 44px)", lineHeight: 1.2 }}>
            <p style={{ marginBottom: 32 }}>
              Most couples wait too long to ask the hard questions. The result is a slow drift
              they only notice when it's already a chasm.
            </p>
            <p>
              Every CoupleIQ app is built on the same idea: the right question, asked at the right
              time, with science behind the answer.
            </p>
          </div>
        </div>
      </section>

      {/* the apps */}
      <section style={{ padding: "120px 32px", maxWidth: 1440, margin: "0 auto" }}>
        <div className="eyebrow" style={{ marginBottom: 24 }}>
          The apps
        </div>
        <h2
          className="display"
          style={{ fontSize: "clamp(44px, 6vw, 88px)", marginBottom: 64, maxWidth: 900 }}
        >
          Two products,
          <br />
          <em
            style={{
              fontStyle: "italic",
              fontWeight: 500,
              fontVariationSettings: "'opsz' 144, 'wght' 500",
            }}
          >
            two relationship moments.
          </em>
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {products.map((p) => (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              style={{
                background: p.background,
                color: p.accentInk,
                padding: "56px 48px",
                minHeight: 460,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    opacity: 0.7,
                    marginBottom: 24,
                  }}
                >
                  CoupleIQ · {p.year}
                </div>
                <h3
                  className="display"
                  style={{
                    fontSize: "clamp(40px, 5vw, 72px)",
                    lineHeight: 0.95,
                    marginBottom: 24,
                  }}
                >
                  {p.name}
                </h3>
                <p style={{ fontSize: 18, lineHeight: 1.55, marginBottom: 24, maxWidth: 460 }}>
                  {p.tagline}
                </p>
                <p style={{ fontSize: 15, lineHeight: 1.6, opacity: 0.8, maxWidth: 460 }}>
                  {p.description}
                </p>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  marginTop: 32,
                }}
              >
                Read the case →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* coming soon teaser */}
      <section
        style={{
          padding: "100px 32px",
          maxWidth: 1440,
          margin: "0 auto",
          borderTop: "1px solid var(--line-soft)",
        }}
      >
        <div className="eyebrow" style={{ marginBottom: 24 }}>
          On the roadmap
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            { name: "Argument Autopsy", desc: "Structured post-conflict analysis" },
            { name: "Future Compatibility", desc: "Long-term alignment across life domains" },
            { name: "Invisible Load Index", desc: "Mapping the household mental load" },
          ].map((c) => (
            <div
              key={c.name}
              style={{
                background: "var(--paper-warm)",
                padding: "36px 32px",
                minHeight: 180,
                borderTop: "2px solid var(--coupleiq)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  color: "var(--ink-muted)",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                ◌ Concept
              </div>
              <h4
                className="display"
                style={{ fontSize: 28, marginBottom: 8, lineHeight: 1.05 }}
              >
                {c.name}
              </h4>
              <p style={{ fontSize: 14, color: "var(--ink-muted)" }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
