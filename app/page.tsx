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
              Anyone can wrap a chatbot. We build expert systems — homeopathy with vetted materia
              medica, exam prep mapped to the official curriculum, relationship analysis grounded in
              40 years of science.
            </p>
            <p style={{ fontSize: 18, lineHeight: 1.65, color: "var(--ink-soft)" }}>
              The AI is the delivery layer. The expertise is the product. That&apos;s the difference
              between a wrapper and a tool you&apos;d actually pay for.
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
          <Stat n="04" label="Live products" />
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
          <FeatureCard product={live[4]} span={12} wide />
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
            name="CoupleIQ"
            description="Relationship apps grounded in real psychology. SplitOrNot and Couple Analyzer — diagnose where things are, surface what's hidden, prescribe what to do."
            accent="var(--coupleiq)"
            href="/work/coupleiq"
          />
          <SubBrandCard
            name="Anima Mundi"
            description="Spiritual guidance through six archetypal voices. A contemplative companion for the questions search engines can't answer."
            accent="var(--animamundi)"
            href="/work/anima-mundi"
            dark
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
  return (
    <Link
      href={`/work/${product.slug}`}
      style={{
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
      }}
    >
      <div>
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
        }}
      >
        <span>{product.subBrand ? `↳ ${product.subBrand}` : product.year}</span>
        <span>View case →</span>
      </div>
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
  accent,
  href,
  dark,
}: {
  name: string;
  description: string;
  accent: string;
  href: string;
  dark?: boolean;
}) {
  return (
    <Link
      href={href}
      style={{
        background: dark ? "var(--animamundi)" : "var(--coupleiq-cream)",
        color: dark ? "var(--paper)" : "var(--coupleiq)",
        padding: "64px 48px",
        minHeight: 380,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
      }}
    >
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
            color: dark ? "var(--animamundi-glow)" : accent,
          }}
        >
          {name}
        </h3>
        <p
          style={{
            fontSize: 17,
            lineHeight: 1.6,
            color: dark ? "rgba(242, 239, 233, 0.85)" : "rgba(58, 18, 8, 0.85)",
            maxWidth: 460,
          }}
        >
          {description}
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
        Explore the line →
      </div>
    </Link>
  );
}
