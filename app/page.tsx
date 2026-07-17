import Link from "next/link";
import { PRODUCTS } from "../lib/products";

export default function Home() {
  const live = PRODUCTS.filter((p) => p.status === "live" || p.status === "beta");

  return (
    <>
      {/* ─────────── HERO ─────────── */}
      <section
        className="section-hero"
        style={{
          minHeight: "100vh",
          padding: "140px 32px 80px",
          maxWidth: 1440,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 80,
        }}
      >
        <div style={{ maxWidth: 1100 }}>
          <div className="eyebrow fade-up d1" style={{ marginBottom: 32 }}>
            <span className="bar" style={{ width: 32, marginRight: 12, height: 2 }} />
            Independent product studio · Est. Timișoara
          </div>

          <h1
            className="display fade-up d2"
            style={{
              fontSize: "clamp(44px, 9vw, 144px)",
              fontWeight: 300,
              fontVariationSettings: "'opsz' 144, 'wght' 300",
              marginBottom: 40,
            }}
          >
            AI-powered apps,
            <br />
            <em
              style={{
                fontStyle: "italic",
                fontWeight: 500,
                fontVariationSettings: "'opsz' 144, 'wght' 500",
              }}
            >
              built on real expertise.
            </em>
          </h1>

          <div
            className="grid-2col fade-up d3"
            style={{ maxWidth: 880, marginTop: 56 }}
          >
            <p style={{ fontSize: 18, lineHeight: 1.65, color: "var(--ink-soft)" }}>
              Anyone can wrap a chatbot. We build expert systems — occupational medicine software
              for the workflow Romanian clinics actually run on (Buzomed), AI governance analysis
              grounded in EU law (WLS), and camera-based ergonomics assessment built to a documented
              ISO standard, not a wearable gimmick (Statura Labs Dynamics).
            </p>
            <p style={{ fontSize: 18, lineHeight: 1.65, color: "var(--ink-soft)" }}>
              The AI is the delivery layer. The expertise is the product — years of health &amp;
              safety consultancy, corporate training, and regulatory practice behind every product.
              That&apos;s the difference between a wrapper and a tool you&apos;d actually pay for.
            </p>
          </div>
        </div>

        {/* hero meta strip */}
        <div
          className="grid-4col fade-up d5"
          style={{
            paddingTop: 40,
            borderTop: "1px solid var(--line-soft)",
          }}
        >
          <Stat n="07" label="Live products" />
          <Stat n="02" label="Sub-brands" />
          <Stat n="02" label="In development" />
          <Stat n="01" label="Operator" />
        </div>
      </section>

      {/* ─────────── FEATURED WORK ─────────── */}
      <section className="section-work" style={{ padding: "120px 32px", maxWidth: 1440, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 64,
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <div>
            <div className="eyebrow" style={{ marginBottom: 20 }}>
              <span className="bar" style={{ width: 20, marginRight: 12, height: 2 }} /> 01 / Work
            </div>
            <h2
              className="display"
              style={{ fontSize: "clamp(36px, 6vw, 88px)", maxWidth: 820 }}
            >
              Live in the world,
              <br />
              <em
                style={{
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontVariationSettings: "'opsz' 144, 'wght' 500",
                }}
              >
                solving real problems.
              </em>
            </h2>
          </div>
          <Link
            href="/work"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "14px 22px",
              border: "1px solid var(--ink)",
            }}
          >
            See all work →
          </Link>
        </div>

        {/* asymmetric featured grid */}
        <div className="grid-12col">
          <FeatureCard product={live[0]} span={7} large />
          <FeatureCard product={live[1]} span={5} />
          <FeatureCard product={live[2]} span={5} />
          <FeatureCard product={live[3]} span={7} large />
          <FeatureCard product={live[4]} span={7} large />
          <FeatureCard product={live[5]} span={5} />
        </div>
      </section>

      {/* ─────────── SUB-BRANDS ─────────── */}
      <section
        className="section-brands"
        style={{
          padding: "120px 32px",
          maxWidth: 1440,
          margin: "0 auto",
        }}
      >
        <div className="eyebrow" style={{ marginBottom: 20 }}>
          <span className="bar" style={{ width: 20, marginRight: 12, height: 2 }} /> 02 / Sub-brands
        </div>
        <h2
          className="display"
          style={{
            fontSize: "clamp(36px, 6vw, 88px)",
            maxWidth: 1000,
            marginBottom: 64,
          }}
        >
          When a product line earns its
          <em
            style={{
              fontStyle: "italic",
              fontWeight: 500,
              fontVariationSettings: "'opsz' 144, 'wght' 500",
            }}
          >
            {" "}own identity.
          </em>
        </h2>

        <div className="grid-2col">
          <SubBrandCard
            name="WLS"
            href="https://worldlegalservice.com"
            external
            background="#FAF8F1"
            textColor="var(--wls-gold)"
            bodyColor="rgba(28, 23, 16, 0.75)"
            linkLabel="Visit the publication →"
            pillars={[
              { name: "AI Governance", blurb: "Can algorithms replace or augment political institutions?" },
              { name: "Humanoid Robotics & Law", blurb: "Liability, personhood, labor law, weapons systems." },
              { name: "EU Policy Critique", blurb: "Resource allocation and democratic accountability, held to account." },
              { name: "Global Peace Frameworks", blurb: "Where international law is failing, and what comes next." },
              { name: "Eastern European Angle", blurb: "Romania, Hungary, and post-communist governance as a case study." },
            ]}
          />
          <SubBrandCard
            name="Buzomed"
            description="Occupational medicine practice management for Romanian clinics, expanding to DACH. Multi-tenant SaaS for the day-to-day of medicina muncii — companies, employees, examinations, reports."
            href="/work/buzomed"
            background="var(--buzomed)"
            textColor="var(--paper)"
            headingColor="var(--buzomed-teal)"
            bodyColor="rgba(242, 239, 233, 0.9)"
          />
        </div>
      </section>

      {/* ─────────── ABOUT TEASER ─────────── */}
      <section
        className="section-about grid-about"
        style={{
          padding: "120px 32px",
          maxWidth: 1440,
          margin: "0 auto",
        }}
      >
        <div>
          <div className="eyebrow" style={{ marginBottom: 20 }}>
            <span className="bar" style={{ width: 20, marginRight: 12, height: 2 }} /> 03 / About
          </div>
          <h2 className="display" style={{ fontSize: "clamp(36px, 5vw, 72px)", marginBottom: 32 }}>
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
          </h2>
          <Link
            href="/about"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "14px 22px",
              border: "1px solid var(--ink)",
              display: "inline-block",
            }}
          >
            The full story →
          </Link>
        </div>
        <div style={{ fontSize: 19, lineHeight: 1.7, color: "var(--ink-soft)" }}>
          <p style={{ marginBottom: 24 }}>
            Verumsell is run by{" "}
            <strong style={{ color: "var(--ink)" }}>Colin Buzoianu</strong> — health and safety
            professional, corporate trainer, formally trained actor, and small business owner.
          </p>
          <p style={{ marginBottom: 24 }}>
            That cross-disciplinary background is the studio&apos;s edge. A health and safety background
            informs Vivo&apos;s clinical rigour. Training experience shapes the education products.
            Acting and psychology underpin the relationship work.
          </p>
          <p>The breadth is the feature, not the bug.</p>
        </div>
      </section>

      {/* ─────────── CTA ─────────── */}
      <section
        className="section-cta"
        style={{
          padding: "120px 32px",
          maxWidth: 1440,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <div className="eyebrow" style={{ marginBottom: 20 }}>
          Working together
        </div>
        <h2
          className="display"
          style={{ fontSize: "clamp(36px, 7vw, 104px)", maxWidth: 1100, margin: "0 auto 48px" }}
        >
          Got an idea that needs
          <em
            style={{
              fontStyle: "italic",
              fontWeight: 500,
              fontVariationSettings: "'opsz' 144, 'wght' 500",
            }}
          >
            {" "}an expert behind the AI?
          </em>
        </h2>
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

/* ─────────── helpers ─────────── */

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div
        className="display"
        style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 400, marginBottom: 8 }}
      >
        {n}
      </div>
      <div className="eyebrow">{label}</div>
    </div>
  );
}

function FeatureCard({
  product,
  span,
  large,
  wide,
}: {
  product: (typeof PRODUCTS)[number];
  span: number;
  large?: boolean;
  wide?: boolean;
}) {
  const external = Boolean(product.external && product.url);

  const cardStyle: React.CSSProperties = {
    gridColumn: `span ${span}`,
    background: product.background,
    color: product.accentInk,
    padding: large ? "56px 48px" : wide ? "72px 56px" : "40px 36px",
    minHeight: large ? 480 : wide ? 360 : 360,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative",
    overflow: "hidden",
    transition: "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
  };

  const content = (
    <>
      {product.logo && product.slug === "buzomed" && (
        <img
          src={product.logo}
          alt=""
          aria-hidden
          style={{
            position: "absolute",
            right: 12,
            bottom: large ? 80 : 62,
            width: large ? 220 : 170,
            height: "auto",
            opacity: 0.45,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      )}
      {product.logo && product.slug !== "buzomed" && (
        <img
          src={product.logo}
          alt=""
          aria-hidden
          style={{
            position: "absolute",
            right: -36,
            bottom: -28,
            height: large ? 300 : 240,
            width: "auto",
            opacity: 0.45,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      )}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 32,
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
            {product.category}
          </span>
          <StatusPill status={product.status} ink={product.accentInk} />
        </div>
        <h3
          className="display"
          style={{
            fontSize: large ? "clamp(36px, 5vw, 80px)" : wide ? "clamp(32px, 5vw, 72px)" : "clamp(28px, 4vw, 56px)",
            marginBottom: 16,
            lineHeight: 0.95,
          }}
        >
          {product.name}
        </h3>
        <p
          style={{
            fontSize: large ? 18 : 16,
            lineHeight: 1.55,
            maxWidth: 480,
            opacity: 0.85,
          }}
        >
          {product.tagline}
        </p>
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 32,
          position: "relative",
          zIndex: 1,
        }}
      >
        <span>{product.subBrand ? `↳ ${product.subBrand}` : product.year}</span>
        <span>{external ? "Visit site →" : "View case →"}</span>
      </div>
    </>
  );

  if (external) {
    return (
      <a href={product.url} target="_blank" rel="noreferrer" style={cardStyle}>
        {content}
      </a>
    );
  }

  return (
    <Link href={`/work/${product.slug}`} style={cardStyle}>
      {content}
    </Link>
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

function SubBrandCard({
  name,
  description,
  pillars,
  background,
  textColor,
  headingColor,
  bodyColor,
  href,
  external,
  linkLabel = "Explore the line →",
}: {
  name: string;
  description?: string;
  pillars?: { name: string; blurb: string }[];
  background: string;
  textColor: string;
  headingColor?: string;
  bodyColor: string;
  href: string;
  external?: boolean;
  linkLabel?: string;
}) {
  const cardStyle: React.CSSProperties = {
    background,
    color: textColor,
    padding: "64px 48px",
    minHeight: 380,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative",
    overflow: "hidden",
  };

  const inner = (
    <>
      <div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            opacity: 0.7,
            marginBottom: 32,
          }}
        >
          Sub-brand
        </div>
        <h3
          className="display"
          style={{
            fontSize: "clamp(36px, 5vw, 80px)",
            marginBottom: 24,
            lineHeight: 0.95,
            color: headingColor ?? textColor,
          }}
        >
          {name}
        </h3>
        {description && (
          <p style={{ fontSize: 17, lineHeight: 1.6, color: bodyColor, maxWidth: 460 }}>
            {description}
          </p>
        )}
        {pillars && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {pillars.map((p, i) => (
              <div key={p.name} style={{ display: "flex", gap: 14 }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: headingColor ?? textColor,
                    opacity: 0.55,
                    flexShrink: 0,
                    paddingTop: 2,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p style={{ fontSize: 14, lineHeight: 1.55, color: bodyColor, maxWidth: 420 }}>
                  <span
                    style={{
                      fontWeight: 600,
                      letterSpacing: "0.02em",
                      color: headingColor ?? textColor,
                    }}
                  >
                    {p.name}
                  </span>
                  {" — "}
                  {p.blurb}
                </p>
              </div>
            ))}
          </div>
        )}
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
        {linkLabel}
      </div>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" style={cardStyle}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} style={cardStyle}>
      {inner}
    </Link>
  );
}
