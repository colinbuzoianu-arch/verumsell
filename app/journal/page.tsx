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
            fontSize: "clamp(56px, 9vw, 144px)",
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
            fontSize: 19,
            lineHeight: 1.65,
            color: "var(--ink-soft)",
            maxWidth: 720,
          }}
        >
          Build notes, product thinking, and the occasional rant about why most AI products don't
          actually work. New entries land when there's something worth saying.
        </p>
      </section>

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
              style={{
                padding: "48px 0",
                borderTop: "1px solid var(--line-soft)",
                borderBottom: i === POSTS.length - 1 ? "1px solid var(--line-soft)" : "none",
                display: "grid",
                gridTemplateColumns: "1fr 3fr 1fr",
                gap: 48,
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  color: "var(--ink-muted)",
                  textTransform: "uppercase",
                }}
              >
                {p.category}
              </div>
              <div>
                <h2
                  className="display"
                  style={{
                    fontSize: "clamp(32px, 3.5vw, 48px)",
                    lineHeight: 1.05,
                    marginBottom: 16,
                  }}
                >
                  {p.title}
                </h2>
                <p
                  style={{
                    fontSize: 17,
                    lineHeight: 1.6,
                    color: "var(--ink-soft)",
                    maxWidth: 600,
                  }}
                >
                  {p.excerpt}
                </p>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  color: "var(--ink-muted)",
                  textTransform: "uppercase",
                  textAlign: "right",
                }}
              >
                {p.date}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
