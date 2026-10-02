"use client";

import { useState } from "react";
import { ARCHITECTURE_COPY, type Lang } from "@/lib/custosArchitectureContent";

const INK = "#16181D";
const IVORY = "#F4F1EA";
const RUST = "var(--custos-rust, #B3401A)";

function LangToggle({ lang, onChange }: { lang: Lang; onChange: (l: Lang) => void }) {
  const base: React.CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    letterSpacing: "0.1em",
    padding: "5px 10px",
    border: "1px solid #4A4D55",
    cursor: "pointer",
    background: "transparent",
    color: IVORY,
    opacity: 0.6,
  };
  const active: React.CSSProperties = { ...base, background: IVORY, color: INK, opacity: 1, borderColor: IVORY };
  return (
    <div style={{ display: "flex", gap: 0 }}>
      <button onClick={() => onChange("en")} style={lang === "en" ? active : base} aria-pressed={lang === "en"}>
        EN
      </button>
      <button onClick={() => onChange("de")} style={{ ...(lang === "de" ? active : base), borderLeft: "none" }} aria-pressed={lang === "de"}>
        DE
      </button>
    </div>
  );
}

export default function CustosArchitectureDeepDive() {
  const [lang, setLang] = useState<Lang>("en");
  const c = ARCHITECTURE_COPY[lang];

  return (
    <div style={{ marginTop: 64, border: `1px solid ${INK}` }}>
      <div
        style={{
          background: INK,
          color: IVORY,
          padding: "16px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          letterSpacing: "0.04em",
        }}
      >
        <span>{c.panelLabel}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ color: "#9EA1A8" }}>{c.panelSub}</span>
          <LangToggle lang={lang} onChange={setLang} />
        </div>
      </div>

      <div style={{ padding: "28px 24px 8px", maxWidth: 760 }}>
        <p className="display" style={{ fontSize: "clamp(18px, 2.2vw, 24px)", fontStyle: "italic", fontWeight: 300, lineHeight: 1.3, color: INK }}>
          {c.quote}
        </p>
      </div>

      <div className="custos-deepdive-toc" style={{ display: "flex", flexWrap: "wrap", gap: 8, padding: "12px 24px 20px" }}>
        {c.sections.map((s, i) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.04em",
              padding: "6px 10px",
              border: "1px solid var(--line-soft)",
              color: "var(--ink-soft)",
              whiteSpace: "nowrap",
            }}
          >
            {String(i + 1).padStart(2, "0")} {s.title.split(" — ")[0].split(":")[0]}
          </a>
        ))}
        <a
          href="#deep-stack"
          style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.04em", padding: "6px 10px", border: "1px solid var(--line-soft)", color: "var(--ink-soft)", whiteSpace: "nowrap" }}
        >
          {c.tocStackLabel}
        </a>
        <a
          href="#deep-status"
          style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.04em", padding: "6px 10px", border: "1px solid var(--line-soft)", color: "var(--ink-soft)", whiteSpace: "nowrap" }}
        >
          {c.tocStatusLabel}
        </a>
      </div>

      <div className="custos-deepdive-scroll" style={{ maxHeight: 640, overflowY: "auto", borderTop: "1px solid var(--line-soft)", background: "var(--paper-warm)" }}>
        <div style={{ padding: "8px 24px 40px" }}>
          {c.sections.map((s, i) => (
            <section key={s.id} id={s.id} style={{ scrollMarginTop: 16, padding: "32px 0", borderBottom: "1px solid var(--line-soft)" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", color: RUST, marginBottom: 10 }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <h4 className="display" style={{ fontSize: "clamp(20px, 2.4vw, 28px)", fontWeight: 400, lineHeight: 1.15, marginBottom: 16, color: INK }}>
                {s.title}
              </h4>
              {s.blocks.map((b, j) =>
                b.type === "p" ? (
                  <p key={j} style={{ fontSize: 15, lineHeight: 1.65, color: "var(--ink-soft)", marginBottom: 14, maxWidth: 820 }}>
                    {b.text}
                  </p>
                ) : (
                  <ul key={j} style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12, maxWidth: 820 }}>
                    {b.items.map((item, k) => (
                      <li key={k} style={{ fontSize: 15, lineHeight: 1.65, color: "var(--ink-soft)", paddingLeft: 20, position: "relative" }}>
                        <span style={{ position: "absolute", left: 0, color: RUST }}>—</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )
              )}
            </section>
          ))}

          <section id="deep-stack" style={{ scrollMarginTop: 16, padding: "32px 0", borderBottom: "1px solid var(--line-soft)" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", color: RUST, marginBottom: 10 }}>
              {c.stackIndexLabel}
            </div>
            <h4 className="display" style={{ fontSize: "clamp(20px, 2.4vw, 28px)", fontWeight: 400, lineHeight: 1.15, marginBottom: 16, color: INK }}>
              {c.stackHeading}
            </h4>
            <div style={{ overflowX: "auto" }}>
              <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 560, fontSize: 14 }}>
                <thead>
                  <tr>
                    {[c.stackHeaders.layer, c.stackHeaders.choice, c.stackHeaders.why].map((h) => (
                      <th
                        key={h}
                        style={{
                          textAlign: "left",
                          padding: "10px 16px 10px 0",
                          fontFamily: "var(--font-mono)",
                          fontSize: 11,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "var(--ink-muted)",
                          borderBottom: `1px solid ${INK}`,
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {c.stack.map((row) => (
                    <tr key={row.layer}>
                      <td style={{ padding: "12px 16px 12px 0", borderBottom: "1px solid var(--line-soft)", fontWeight: 600, verticalAlign: "top" }}>
                        {row.layer}
                      </td>
                      <td style={{ padding: "12px 16px 12px 0", borderBottom: "1px solid var(--line-soft)", fontFamily: "var(--font-mono)", fontSize: 13, verticalAlign: "top", color: "var(--ink-soft)" }}>
                        {row.choice}
                      </td>
                      <td style={{ padding: "12px 0 12px", borderBottom: "1px solid var(--line-soft)", color: "var(--ink-soft)", verticalAlign: "top" }}>
                        {row.why}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="deep-status" style={{ scrollMarginTop: 16, padding: "32px 0 8px" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", color: RUST, marginBottom: 10 }}>
              {c.statusIndexLabel}
            </div>
            <h4 className="display" style={{ fontSize: "clamp(20px, 2.4vw, 28px)", fontWeight: 400, lineHeight: 1.15, marginBottom: 16, color: INK }}>
              {c.statusHeading}
            </h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 32 }}>
              <div style={{ flex: "1 1 320px" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "#0B5A40", marginBottom: 12 }}>
                  {c.builtTodayLabel}
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                  {c.builtToday.map((item, i) => (
                    <li key={i} style={{ fontSize: 14, lineHeight: 1.6, color: "var(--ink-soft)", paddingLeft: 20, position: "relative" }}>
                      <span style={{ position: "absolute", left: 0, color: "#0B5A40" }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ flex: "1 1 320px" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--ink-muted)", marginBottom: 12 }}>
                  {c.roadmapLabel}
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                  {c.roadmap.map((item, i) => (
                    <li key={i} style={{ fontSize: 14, lineHeight: 1.6, color: "var(--ink-soft)", paddingLeft: 20, position: "relative" }}>
                      <span style={{ position: "absolute", left: 0, color: "var(--ink-muted)" }}>◌</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
