import Link from "next/link";
import { CATEGORIES, byCategory } from "../../lib/products";

export const metadata = {
  title: "Work — Verumsell",
  description: "The full portfolio of expert-driven AI products from Verumsell studio.",
};

export default function WorkPage() {
  return (
    <>
      {/* hero */}
      <section
        style={{
          padding: "160px 32px 80px",
          maxWidth: 1440,
          margin: "0 auto",
        }}
      >
        <div className="eyebrow fade-up d1" style={{ marginBottom: 32 }}>
          <span className="bar" style={{ width: 32, marginRight: 12, height: 2 }} /> Studio archive
        </div>
        <h1
          className="display fade-up d2"
          style={{
            fontSize: "clamp(56px, 9vw, 144px)",
            fontWeight: 300,
            marginBottom: 40,
          }}
        >
          The work,
          <br />
          <em
            style={{
              fontStyle: "italic",
              fontWeight: 500,
              fontVariationSettings: "'opsz' 144, 'wght' 500",
            }}
          >
            organised.
          </em>
        </h1>
        <p
          className="fade-up d3"
          style={{
            fontSize: 19,
            lineHeight: 1.65,
            color: "var(--ink-soft)",
            maxWidth: 720,
          }}
        >
          Every product Verumsell has shipped or is shipping. Grouped by domain rather than
          chronology — that way, what we do becomes clearer than when we did it.
        </p>
      </section>

      {/* category sections */}
      {CATEGORIES.map((cat, i) => {
        const items = byCategory(cat);
        if (items.length === 0) return null;
        return (
          <section
            key={cat}
            style={{
              padding: "80px 32px",
              maxWidth: 1440,
              margin: "0 auto",
              borderTop: "1px solid var(--line-soft)",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 2.5fr",
                gap: 80,
                alignItems: "flex-start",
              }}
            >
              <div style={{ position: "sticky", top: 100 }}>
                <div
                  className="eyebrow"
                  style={{ marginBottom: 16, color: "var(--ink-muted)" }}
                >
                  {String(i + 1).padStart(2, "0")} / Domain
                </div>
                <h2
                  className="display"
                  style={{
                    fontSize: "clamp(36px, 4vw, 56px)",
                    lineHeight: 1,
                    marginBottom: 16,
                  }}
                >
                  {cat}
                </h2>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    letterSpacing: "0.12em",
                    color: "var(--ink-muted)",
                    textTransform: "uppercase",
                  }}
                >
                  {items.length} {items.length === 1 ? "product" : "products"}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {items.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/work/${p.slug}`}
                    style={{
                      background: p.background,
                      color: p.accentInk,
                      padding: "40px 40px",
                      display: "grid",
                      gridTemplateColumns: "1fr auto",
                      gap: 32,
                      alignItems: "center",
                      transition: "transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 16,
                          marginBottom: 12,
                          flexWrap: "wrap",
                        }}
                      >
                        <h3
                          className="display"
                          style={{ fontSize: "clamp(32px, 3.5vw, 48px)", lineHeight: 1 }}
                        >
                          {p.name}
                        </h3>
                        <StatusPill status={p.status} ink={p.accentInk} />
                        {p.subBrand && (
                          <span
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: 10,
                              letterSpacing: "0.14em",
                              textTransform: "uppercase",
                              opacity: 0.7,
                            }}
                          >
                            ↳ {p.subBrand}
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize: 16, lineHeight: 1.55, opacity: 0.85, maxWidth: 580 }}>
                        {p.tagline}
                      </p>
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                      }}
                    >
                      View →
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}
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
