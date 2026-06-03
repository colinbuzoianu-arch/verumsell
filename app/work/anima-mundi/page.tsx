import Link from "next/link";
import { bySubBrand } from "../../../lib/products";

export const metadata = {
  title: "Anima Mundi — Verumsell",
  description: "AI-powered spiritual guidance through six archetypal voices.",
};

const ANIMA_URL = "https://project-qdb1y.vercel.app";

export default function AnimaMundiPage() {
  const products = bySubBrand("Anima Mundi");

  return (
    <>
      {/* hero — deep violet takeover */}
      <section
        style={{
          background: "linear-gradient(180deg, #2A1F4A 0%, #15102A 100%)",
          color: "var(--paper)",
          padding: "160px 32px 100px",
          minHeight: "85vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* subtle constellation backdrop */}
        <svg
          width="100%"
          height="100%"
          style={{ position: "absolute", inset: 0, opacity: 0.18, pointerEvents: "none" }}
          xmlns="http://www.w3.org/2000/svg"
        >
          {Array.from({ length: 60 }).map((_, i) => {
            const x = (i * 137.5) % 100;
            const y = (i * 71.3) % 100;
            const r = (i % 3) + 0.5;
            return (
              <circle
                key={i}
                cx={`${x}%`}
                cy={`${y}%`}
                r={r}
                fill="var(--animamundi-glow)"
                opacity={0.3 + (i % 5) * 0.15}
              />
            );
          })}
        </svg>

        <div style={{ maxWidth: 1440, margin: "0 auto", width: "100%", position: "relative" }}>
          <Link
            href="/work"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--animamundi-glow)",
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
              color: "var(--animamundi-glow)",
              marginBottom: 32,
              opacity: 0.85,
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 32,
                height: 2,
                background: "var(--animamundi-glow)",
                marginRight: 12,
                verticalAlign: "middle",
              }}
            />
            Verumsell sub-brand · The contemplative line
          </div>

          <h1
            className="display"
            style={{
              fontSize: "clamp(48px, 11vw, 180px)",
              fontWeight: 300,
              fontStyle: "italic",
              lineHeight: 0.9,
              marginBottom: 32,
              color: "var(--paper)",
              fontVariationSettings: "'opsz' 144, 'wght' 300",
            }}
          >
            Anima Mundi
          </h1>

          <p
            style={{
              fontSize: "clamp(18px, 2.5vw, 32px)",
              fontWeight: 300,
              lineHeight: 1.4,
              maxWidth: 880,
              color: "rgba(242, 239, 233, 0.85)",
              marginBottom: 48,
            }}
          >
            Six archetypal voices. A different kind of conversation about meaning, direction, and
            the questions that don&apos;t have search-engine answers.
          </p>

          {/* PRIMARY CTA — launch the app */}
          <a
            href={ANIMA_URL}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-block",
              padding: "18px 36px",
              background: "var(--animamundi-glow)",
              color: "#1A1208",
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            Launch Anima Mundi →
          </a>
        </div>
      </section>

      {/* manifesto */}
      <section style={{ padding: "120px 32px", background: "var(--paper)" }}>
        <div
          className="grid-detail"
          style={{ maxWidth: 1100, margin: "0 auto" }}
        >
          <div className="eyebrow">The thesis</div>
          <div className="display" style={{ fontSize: "clamp(22px, 3.2vw, 44px)", lineHeight: 1.25 }}>
            <p style={{ marginBottom: 32 }}>
              Some questions don&apos;t want answers. They want a witness — someone to sit with them,
              turn them over, hold them up to a different light.
            </p>
            <p style={{ color: "var(--ink-soft)" }}>
              Anima Mundi is six different lights. Voice in. Voice out. The kind of conversation
              you used to have with a wise friend at 2am.
            </p>
          </div>
        </div>
      </section>

      {/* the six archetypes */}
      <section
        style={{
          background: "var(--animamundi)",
          color: "var(--paper)",
          padding: "120px 32px",
        }}
      >
        <div style={{ maxWidth: 1440, margin: "0 auto" }}>
          <div className="eyebrow" style={{ color: "var(--animamundi-glow)", marginBottom: 24 }}>
            The six voices
          </div>
          <h2
            className="display"
            style={{ fontSize: "clamp(32px, 5vw, 72px)", marginBottom: 64, maxWidth: 900 }}
          >
            Each one a different way
            <em style={{ fontStyle: "italic", fontWeight: 500, fontVariationSettings: "'opsz' 144, 'wght' 500" }}>
              {" "}of seeing.
            </em>
          </h2>

          <div className="grid-3col-archetypes">
            {[
              { name: "The Sage", role: "Wisdom and discernment" },
              { name: "The Mystic", role: "The unseen and the symbolic" },
              { name: "The Healer", role: "Emotional integration" },
              { name: "The Warrior", role: "Will and courage" },
              { name: "The Lover", role: "Connection and meaning" },
              { name: "The Trickster", role: "Reframing and disruption" },
            ].map((a) => (
              <div
                key={a.name}
                style={{
                  padding: "40px 32px",
                  border: "1px solid rgba(212, 168, 87, 0.25)",
                  background: "rgba(0, 0, 0, 0.2)",
                  minHeight: 200,
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
                    color: "var(--animamundi-glow)",
                    marginBottom: 16,
                    textTransform: "uppercase",
                  }}
                >
                  Archetype
                </div>
                <div>
                  <h4
                    className="display"
                    style={{ fontSize: 32, marginBottom: 8, lineHeight: 1, fontStyle: "italic", color: "var(--animamundi-glow)" }}
                  >
                    {a.name}
                  </h4>
                  <p style={{ fontSize: 14, color: "rgba(242, 239, 233, 0.7)" }}>{a.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* product card + launch CTA */}
      <section style={{ padding: "120px 32px", maxWidth: 1440, margin: "0 auto" }}>
        <div className="eyebrow" style={{ marginBottom: 24 }}>The app</div>
        {products.map((p) => (
          <div
            key={p.slug}
            style={{
              background: "linear-gradient(135deg, #2A1F4A 0%, #4A3A6E 100%)",
              color: "var(--paper)",
              padding: "72px 56px",
              display: "block",
              minHeight: 360,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div className="grid-product-card" style={{ alignItems: "flex-end", height: "100%" }}>
              <div>
                <h3
                  className="display"
                  style={{
                    fontSize: "clamp(36px, 6vw, 96px)",
                    lineHeight: 0.9,
                    marginBottom: 24,
                    fontStyle: "italic",
                    fontWeight: 300,
                    color: "var(--animamundi-glow)",
                  }}
                >
                  Anima Mundi
                </h3>
                <p style={{ fontSize: 19, lineHeight: 1.55, maxWidth: 640, color: "rgba(242, 239, 233, 0.85)", marginBottom: 36 }}>
                  {p.description}
                </p>
                <a
                  href={ANIMA_URL}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-block",
                    padding: "16px 32px",
                    background: "var(--animamundi-glow)",
                    color: "#1A1208",
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                  }}
                >
                  Open the app →
                </a>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--animamundi-glow)",
                  alignSelf: "flex-end",
                }}
              >
                ○ Beta
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
