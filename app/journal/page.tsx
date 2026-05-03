import Link from "next/link";

export const metadata = {
  title: "Journal — Verumsell",
  description: "Notes from the studio on AI products, expert systems, and product thinking.",
};

const POSTS = [
  {
    slug: "expert-systems-vs-wrappers",
    title: "Expert systems vs. AI wrappers",
    excerpt:
      "What separates a tool people pay for from a chatbot they forget about. The case for source-bounded AI.",
    date: "Coming soon",
    category: "Product thinking",
  },
  {
    slug: "earned-progress",
    title: "Earned progress: why we gate our education apps",
    excerpt:
      "How a quiz pass plus proof-of-work upload changes whether students actually learn — or just feel like they did.",
    date: "Coming soon",
    category: "Education",
  },
  {
    slug: "vivo-build-notes",
    title: "Building Vivo: notes on a clinical AI workflow",
    excerpt:
      "Forty years of homeopathic literature, a 35-question intake, and the source-approval model that keeps the AI honest.",
    date: "Coming soon",
    category: "Build notes",
  },
];

export default function JournalPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section
        style={{
          padding: "160px 32px 80px",
          maxWidth: 1440,
          margin: "0 auto",
        }}
      >
        <div className="eyebrow" style={{ marginBottom: 32 }}>
          <span className="bar" style={{ width: 32, marginRight: 12, height: 2 }} />
          Studio journal
        </div>
        <h1
          className="display"
          style={{
            fontSize: "clamp(44px, 9vw, 144px)",
            fontWeight: 300,
            marginBottom: 40,
          }}
        >
          Notes from
          <br />
          <em
            style={{
              fontStyle: "italic",
              fontWeight: 500,
              fontVariationSettings: "'opsz' 144, 'wght' 500",
            }}
          >
            the workbench.
          </em>
        </h1>
        <p
          style={{
            fontSize: "clamp(16px, 1.8vw, 19px)",
            lineHeight: 1.65,
            color: "var(--ink-soft)",
            maxWidth: 720,
          }}
        >
          Build notes, product thinking, and the occasional rant about why most AI products
          don&apos;t actually work. New entries land when there&apos;s something worth saying.
        </p>
      </section>

      {/* ── POST LIST ── */}
      <section
        style={{
          padding: "80px 32px",
          maxWidth: 1440,
          margin: "0 auto",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {POSTS.map((p, i) => (
            <article
              key={p.slug}
              className="grid-journal-row"
              style={{
                padding: "48px 0",
                borderTop: "1px solid var(--line-soft)",
                borderBottom: i === POSTS.length - 1 ? "1px solid var(--line-soft)" : "none",
              }}
            >
              {/* category label */}
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  color: "var(--ink-muted)",
                  textTransform: "uppercase",
                  paddingTop: 6,
                }}
              >
                {p.category}
              </div>

              {/* title + excerpt — now the wide centre column */}
              <div>
                <h2
                  className="display"
                  style={{
                    fontSize: "clamp(28px, 3.5vw, 48px)",
                    lineHeight: 1.05,
                    marginBottom: 16,
                  }}
                >
                  {p.title}
                </h2>
                <p
                  style={{
                    fontSize: "clamp(15px, 1.6vw, 17px)",
                    lineHeight: 1.65,
                    color: "var(--ink-soft)",
                  }}
                >
                  {p.excerpt}
                </p>
              </div>

              {/* date — right-aligned on desktop, left on mobile */}
              <div
                className="journal-date"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  color: "var(--ink-muted)",
                  textTransform: "uppercase",
                  textAlign: "right",
                  paddingTop: 6,
                }}
              >
                {p.date}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── SUBSCRIBE / CTA ── */}
      <section
        style={{
          padding: "100px 32px",
          maxWidth: 1440,
          margin: "0 auto",
          borderTop: "1px solid var(--line-soft)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 32,
        }}
      >
        <div>
          <div className="eyebrow" style={{ marginBottom: 16 }}>Stay in the loop</div>
          <h3
            className="display"
            style={{ fontSize: "clamp(28px, 4vw, 56px)", lineHeight: 1.05 }}
          >
            Worth following,
            <em
              style={{
                fontStyle: "italic",
                fontWeight: 500,
                fontVariationSettings: "'opsz' 144, 'wght' 500",
              }}
            >
              {" "}if you build things.
            </em>
          </h3>
        </div>
        <Link
          href="/contact"
          style={{
            display: "inline-block",
            padding: "18px 32px",
            border: "1px solid var(--ink)",
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          Get in touch →
        </Link>
      </section>
    </>
  );
}
