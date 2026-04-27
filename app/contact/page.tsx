"use client";

import { useState } from "react";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
          <span className="bar" style={{ width: 32, marginRight: 12, height: 2 }} /> Get in touch
        </div>
        <h1
          className="display"
          style={{
            fontSize: "clamp(56px, 9vw, 144px)",
            fontWeight: 300,
            marginBottom: 40,
          }}
        >
          Let's talk.
        </h1>
        <p
          style={{
            fontSize: 22,
            lineHeight: 1.6,
            color: "var(--ink-soft)",
            maxWidth: 720,
          }}
        >
          Custom builds, sub-brand collaborations, B2B licensing, or a project that needs an expert
          system behind the AI — drop a line.
        </p>
      </section>

      {/* contact grid */}
      <section
        style={{
          padding: "80px 32px",
          maxWidth: 1440,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
        }}
      >
        <ContactCard
          label="Email"
          value="hello@verumsell.com"
          onCopy={() => copy("hello@verumsell.com")}
          large
        />
        <ContactCard
          label="Location"
          value="Timișoara, Romania"
          subtitle="Remote-first · Operating in EU and US time zones"
        />
      </section>

      {/* what we take on */}
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
            marginBottom: 48,
          }}
        >
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>
              What we take on
            </div>
          </div>
          <div style={{ fontSize: 19, lineHeight: 1.65, color: "var(--ink-soft)" }}>
            Verumsell is small by design. We work on a few projects a year — the ones where the
            problem actually matches the studio's edge.
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {SERVICES.map((s, i) => (
            <div
              key={s.title}
              style={{
                padding: "40px 32px",
                background: "var(--paper-warm)",
                borderTop: "2px solid var(--ink)",
                minHeight: 220,
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
                {String(i + 1).padStart(2, "0")} / Service
              </div>
              <h4 className="display" style={{ fontSize: 28, marginBottom: 12, lineHeight: 1.05 }}>
                {s.title}
              </h4>
              <p style={{ fontSize: 14, lineHeight: 1.55, color: "var(--ink-soft)" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {copied && (
        <div
          style={{
            position: "fixed",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            background: "var(--ink)",
            color: "var(--paper)",
            padding: "12px 24px",
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            zIndex: 200,
          }}
        >
          ✓ Copied to clipboard
        </div>
      )}
    </>
  );
}

const SERVICES = [
  {
    title: "Custom expert systems",
    desc: "End-to-end builds: domain research, source curation, prompt engineering, frontend, deployment. For companies that have the expertise but not the build capacity.",
  },
  {
    title: "Sub-brand collaboration",
    desc: "Have a domain Verumsell could plausibly extend into? We occasionally absorb adjacent brands as new product lines.",
  },
  {
    title: "B2B licensing",
    desc: "Practitioner tiers and white-label arrangements for products like Remedium and Couple Analyzer.",
  },
];

function ContactCard({
  label,
  value,
  subtitle,
  onCopy,
  large,
}: {
  label: string;
  value: string;
  subtitle?: string;
  onCopy?: () => void;
  large?: boolean;
}) {
  return (
    <div
      onClick={onCopy}
      style={{
        background: large ? "var(--ink)" : "var(--paper-warm)",
        color: large ? "var(--paper)" : "var(--ink)",
        padding: "48px 40px",
        minHeight: 240,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: onCopy ? "pointer" : "default",
        position: "relative",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          opacity: 0.7,
        }}
      >
        {label}
      </div>
      <div>
        <div
          className="display"
          style={{
            fontSize: large ? "clamp(32px, 4vw, 56px)" : "clamp(28px, 3vw, 40px)",
            lineHeight: 1.05,
            marginBottom: subtitle ? 12 : 0,
          }}
        >
          {value}
        </div>
        {subtitle && (
          <p
            style={{
              fontSize: 14,
              opacity: 0.7,
              marginTop: 8,
            }}
          >
            {subtitle}
          </p>
        )}
        {onCopy && (
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              opacity: 0.6,
              marginTop: 16,
            }}
          >
            Click to copy →
          </div>
        )}
      </div>
    </div>
  );
}
