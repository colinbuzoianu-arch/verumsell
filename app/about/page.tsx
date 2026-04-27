import Link from "next/link";

export const metadata = {
  title: "About — Verumsell",
  description: "How a cross-disciplinary background became an independent product studio.",
};

export default function AboutPage() {
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
          <span className="bar" style={{ width: 32, marginRight: 12, height: 2 }} />
          About the studio
        </div>
        <h1
          className="display fade-up d2"
          style={{
            fontSize: "clamp(56px, 9vw, 144px)",
            fontWeight: 300,
            marginBottom: 40,
          }}
        >
          One operator,
          <br />
          <em
            style={{
              fontStyle: "italic",
              fontWeight: 500,
              fontVariationSettings: "'opsz' 144, 'wght' 500",
            }}
          >
            several disciplines.
          </em>
        </h1>
      </section>

      {/* origin — two column with photo */}
      <section
        style={{
          padding: "80px 32px",
          maxWidth: 1440,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: 80,
          alignItems: "flex-start",
        }}
      >
        <div>
          <div className="eyebrow" style={{ marginBottom: 16 }}>
            01 / Origin
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 56, alignItems: "flex-start" }}>
          {/* photo */}
          <div style={{ position: "relative" }}>
            <img
              src="/brand/colin.JPG"
              alt="Colin Buzoianu"
              style={{
                width: "100%",
                aspectRatio: "3/4",
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
                filter: "grayscale(15%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "20px 20px 16px",
                background: "linear-gradient(to top, rgba(10,10,10,0.7) 0%, transparent 100%)",
              }}
            >
              <div style={{ color: "var(--paper)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                Colin Buzoianu
              </div>
              <div style={{ color: "rgba(242,239,233,0.7)", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4 }}>
                Founder · Timișoara, Romania
              </div>
            </div>
          </div>
          {/* text */}
          <div style={{ fontSize: 18, lineHeight: 1.65, color: "var(--ink-soft)" }}>
            <p style={{ marginBottom: 24 }}>
              Verumsell is an independent product studio founded by{" "}
              <strong style={{ color: "var(--ink)" }}>Colin Buzoianu</strong> in Timișoara, Romania.
            </p>
            <p style={{ marginBottom: 24 }}>
              The brief is simple: the world has plenty of AI wrappers. What it doesn't have enough of
              is AI applications built on actual expertise — the kind of products where the logic is
              informed by years of practice in a real domain.
            </p>
            <p>
              Verumsell builds those.
            </p>
          </div>
        </div>
      </section>

      {/* disciplines */}
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
            alignItems: "flex-start",
          }}
        >
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>
              02 / The cross-section
            </div>
            <h3
              className="display"
              style={{ fontSize: "clamp(28px, 3vw, 40px)", lineHeight: 1.05 }}
            >
              Why breadth matters
            </h3>
          </div>
          <div style={{ fontSize: 19, lineHeight: 1.65, color: "var(--ink-soft)" }}>
            <p>
              The single most useful thing about a cross-disciplinary background is that it lets you
              recognise where one field's tools can solve another field's problems. A health and
              safety mindset (audit, document, verify) sharpens a homeopathic intake. Acting
              training (presence, persona) shapes how an AI guide sounds. Years in front of a
              corporate training room teach you what actually changes behaviour — and what's just
              theatre.
            </p>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 16,
          }}
        >
          {DISCIPLINES.map((d, i) => (
            <div
              key={d.title}
              style={{
                padding: "40px 36px",
                background: "var(--paper-warm)",
                borderTop: "2px solid var(--ink)",
                minHeight: 200,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  color: "var(--ink-muted)",
                  marginBottom: 16,
                }}
              >
                {String(i + 1).padStart(2, "0")} / Discipline
              </div>
              <h4 className="display" style={{ fontSize: 32, marginBottom: 12, lineHeight: 1.05 }}>
                {d.title}
              </h4>
              <p style={{ fontSize: 15, lineHeight: 1.55, color: "var(--ink-soft)" }}>{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* approach */}
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
            03 / Approach
          </div>
          <h3
            className="display"
            style={{ fontSize: "clamp(28px, 3vw, 40px)", lineHeight: 1.05 }}
          >
            How we build
          </h3>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {APPROACH.map((a, i) => (
            <div
              key={a.title}
              style={{
                paddingBottom: 32,
                borderBottom:
                  i < APPROACH.length - 1 ? "1px solid var(--line-soft)" : "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 24,
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 14,
                    color: "var(--ink-muted)",
                    minWidth: 32,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h4
                    className="display"
                    style={{
                      fontSize: 28,
                      marginBottom: 8,
                      lineHeight: 1.1,
                    }}
                  >
                    {a.title}
                  </h4>
                  <p
                    style={{
                      fontSize: 17,
                      lineHeight: 1.6,
                      color: "var(--ink-soft)",
                    }}
                  >
                    {a.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* facts strip */}
      <section
        style={{
          padding: "80px 32px",
          maxWidth: 1440,
          margin: "0 auto",
          borderTop: "1px solid var(--line-soft)",
        }}
      >
        <div className="eyebrow" style={{ marginBottom: 32 }}>
          The facts
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}>
          <Fact label="Founded" value="2024" />
          <Fact label="Based in" value="Timișoara, RO" />
          <Fact label="Team size" value="01" />
          <Fact label="Stack" value="Next.js · Vercel · Claude API" />
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "100px 32px",
          maxWidth: 1440,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h3
          className="display"
          style={{ fontSize: "clamp(40px, 5vw, 72px)", marginBottom: 32 }}
        >
          Got a problem that needs
          <em
            style={{
              fontStyle: "italic",
              fontWeight: 500,
              fontVariationSettings: "'opsz' 144, 'wght' 500",
            }}
          >
            {" "}an expert behind the AI?
          </em>
        </h3>
        <Link
          href="/contact"
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
          Start a conversation →
        </Link>
      </section>
    </>
  );
}

const DISCIPLINES = [
  {
    title: "Health & Safety",
    desc: "Certified professional. The discipline of audit, document, verify. Informs the rigour behind Remedium and shapes how Verumsell handles anything clinical.",
  },
  {
    title: "Corporate Training",
    desc: "Years designing and delivering programs that actually change behaviour. The foundation of every education product the studio builds — Studiu EN26, Studiu BAC, Sales Trainer.",
  },
  {
    title: "Acting (formal training)",
    desc: "Presence, persona, voice. What gives the Anima Mundi archetypes their distinctness, and what shapes how every product on this site sounds.",
  },
  {
    title: "Service Management",
    desc: "Building things that work for real users, not just demo. A bias toward quiet reliability over flashy features.",
  },
];

const APPROACH = [
  {
    title: "Expertise first, AI second",
    desc: "We start with what an expert would actually do, then ask what AI lets us deliver at scale. The opposite — start with AI and bolt on a use case — is how you end up with a wrapper.",
  },
  {
    title: "Source-bounded systems",
    desc: "AI hallucinations are mostly a curation problem. We build with vetted source material — materia medica, official curricula, peer-reviewed research — so the model has somewhere honest to land.",
  },
  {
    title: "Earned progress",
    desc: "Especially in our education work, we don't let users fake their way through. Quizzes, proof-of-work, and gated unlocks turn the app into something that actually helps you learn, not just feel like you did.",
  },
  {
    title: "Privacy as default",
    desc: "Where we can avoid storing personal data, we do. Most CoupleIQ assessments hold nothing after the session ends.",
  },
];

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.16em",
          color: "var(--ink-muted)",
          textTransform: "uppercase",
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      <div className="display" style={{ fontSize: 28, lineHeight: 1 }}>
        {value}
      </div>
    </div>
  );
}
