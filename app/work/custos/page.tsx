import type { Metadata } from "next";
import Link from "next/link";

const INK = "#16181D";
const IVORY = "#F4F1EA";
const RUST = "var(--custos-rust, #B3401A)";

export const metadata: Metadata = {
  title: "Custos — Verumsell",
  description: "Runtime control for AI agents, built by World Legal Service.",
  openGraph: {
    title: "Custos — runtime control for AI agents",
    description:
      "Custos sits between a company's AI agents and the tools they use. Every call is identified, checked against policy, recorded, and then allowed, blocked or held for a human.",
    images: ["/brand/custos-landing-hero.png"],
  },
};

const DECISIONS: {
  time: string;
  agent: string;
  action: string;
  note: string;
  verdict: "ALLOW" | "HOLD" | "BLOCK";
}[] = [
  { time: "14:02:11", agent: "invoice-processor", action: "sap.read_invoice", note: "in scope · finance", verdict: "ALLOW" },
  { time: "14:02:12", agent: "invoice-processor", action: "sap.execute_payment", note: "needs approval from finance-lead", verdict: "HOLD" },
  { time: "14:02:15", agent: "support-agent", action: "crm.export_contacts", note: "4,112 records to an external domain", verdict: "BLOCK" },
  { time: "14:02:19", agent: "hr-assistant", action: "payroll.read_salaries", note: "outside agent scope", verdict: "BLOCK" },
  { time: "14:02:20", agent: "research-bot", action: "web.fetch", note: "public source", verdict: "ALLOW" },
  { time: "14:02:24", agent: "sales-copilot", action: "mail.send", note: "contains IBAN and personal ID number", verdict: "BLOCK" },
];

const VERDICT_STYLE: Record<string, { bg: string; fg: string }> = {
  ALLOW: { bg: "#123D2E", fg: "#7FD8B0" },
  HOLD: { bg: "#473713", fg: "#F2C96B" },
  BLOCK: { bg: "#4A1D18", fg: "#FF9C8C" },
};

const PROBLEMS = [
  {
    heading: "Agents act with real credentials.",
    body: "They read mailboxes, query ERPs and call payment APIs using tokens a person handed them once and forgot.",
  },
  {
    heading: "Nobody signed off on the scope.",
    body: "An agent built for invoices can often reach payroll too. The permission model was designed for people, not software that acts at machine speed.",
  },
  {
    heading: "Logs arrive after the damage.",
    body: "Monitoring tells you what an agent did yesterday. Custos decides what it may do in the next millisecond.",
  },
];

const CAPABILITIES = [
  { heading: "Identity for every agent", body: "Each agent gets its own short-lived credentials, a named owner and an expiry date. No more shared API keys." },
  { heading: "Policy as code", body: "Least-privilege rules in Cedar, versioned in Git and checked for gaps before they go live." },
  { heading: "Content inspection", body: "Personal data, secrets, IBANs and bulk exports are caught in the request itself, not in a weekly report." },
  { heading: "Human approval", body: "Risky actions pause and wait for a named person to approve them in the dashboard, in Slack or in Teams." },
  { heading: "Tamper-evident audit", body: "Every decision is hash-chained and signed, so the log can prove it has not been edited." },
  { heading: "Fast enough to forget", body: "Built in Rust to add only a few milliseconds per call. Self-hosted or in our EU cloud." },
];

const COMPLIANCE = [
  { name: "EU AI Act", body: "Human oversight and automatic record-keeping, built into every agent action rather than written into a policy document." },
  { name: "NIS2", body: "Access control and least privilege for non-human identities, with evidence you can export for audits and customer questionnaires." },
  { name: "GDPR", body: "Personal data is detected before it leaves. Self-host it, or use our control plane hosted in Frankfurt." },
];

export default function CustosPage() {
  return (
    <>
      <style>{`
        .custos-mobile-hero { display: block; margin-top: 32px; }
        .custos-live-panel { display: block; }
        @media (max-width: 768px) {
          .custos-live-panel { display: none; }
        }
        @media (min-width: 769px) {
          .custos-mobile-hero { display: none; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section
        style={{
          background: "linear-gradient(135deg, #F4F1EA 0%, #E6D3C4 100%)",
          color: INK,
          padding: "160px 32px 100px",
        }}
      >
        <div style={{ maxWidth: 1440, margin: "0 auto" }}>
          <Link
            href="/work"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              opacity: 0.7,
              marginBottom: 48,
              display: "inline-block",
              color: INK,
            }}
          >
            ← All work
          </Link>

          <div style={{ display: "flex", gap: 16, marginBottom: 32, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", opacity: 0.7 }}>
              AI Governance
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", padding: "6px 10px", border: `1px solid ${INK}`, opacity: 0.8 }}>
              ◌ In dev
            </span>
          </div>

          <h1 className="display" style={{ fontSize: "clamp(48px, 11vw, 160px)", fontWeight: 400, lineHeight: 0.9, marginBottom: 24, color: INK }}>
            Custos
          </h1>

          <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", color: RUST, marginBottom: 20 }}>
            Runtime control for AI agents
          </div>

          <p className="display" style={{ fontSize: "clamp(22px, 3.2vw, 44px)", fontWeight: 300, fontStyle: "italic", maxWidth: 820, lineHeight: 1.15, marginBottom: 28, color: INK }}>
            Every agent gets a badge. Every action gets checked.
          </p>

          <p style={{ fontSize: 18, lineHeight: 1.6, maxWidth: 560, color: "var(--ink-soft)", marginBottom: 36 }}>
            Custos sits between your AI agents and the tools they use. Each call is identified,
            checked against your policy, recorded, and then allowed, blocked or held for a
            human. Before it happens, not after.
          </p>

          <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap", marginBottom: 56 }}>
            <Link
              href="/contact"
              style={{
                display: "inline-block",
                padding: "18px 32px",
                background: RUST,
                color: "#FFFFFF",
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Become a design partner
            </Link>
            <a href="#how" style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", color: INK, opacity: 0.7 }}>
              See how it works →
            </a>
          </div>

          {/* live decisions panel (desktop/tablet) */}
          <div
            className="custos-live-panel"
            style={{ background: INK, color: IVORY, maxWidth: 760 }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", borderBottom: "1px solid #2B2E35", fontFamily: "var(--font-mono)", fontSize: 12, color: "#9EA1A8" }}>
              <span>custos · live decisions</span>
              <span>tenant: acme-gmbh</span>
            </div>
            <div>
              {DECISIONS.map((d, i) => {
                const v = VERDICT_STYLE[d.verdict];
                return (
                  <div
                    key={i}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "64px minmax(0, 1fr) 72px",
                      gap: 14,
                      padding: "13px 20px",
                      borderBottom: i < DECISIONS.length - 1 ? "1px solid #23262C" : "none",
                      alignItems: "start",
                      fontFamily: "var(--font-mono)",
                      fontSize: 13,
                    }}
                  >
                    <span style={{ color: "#7E828A" }}>{d.time}</span>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      <span>
                        <span style={{ color: IVORY }}>{d.agent}</span>{" "}
                        <span style={{ color: "#7E828A" }}>→</span>{" "}
                        <span style={{ color: "#C9C6BD" }}>{d.action}</span>
                      </span>
                      <span style={{ color: "#9EA1A8", fontSize: 12 }}>{d.note}</span>
                    </div>
                    <span style={{ justifySelf: "end", fontWeight: 500, fontSize: 12, padding: "3px 8px", background: v.bg, color: v.fg }}>
                      {d.verdict}
                    </span>
                  </div>
                );
              })}
            </div>
            <div style={{ padding: "12px 20px", fontSize: 12, color: "#7E828A" }}>Illustrative event stream</div>
          </div>

          {/* mobile fallback image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/custos-landing-hero.png"
            alt="Custos live decisions panel"
            className="custos-mobile-hero"
            style={{ width: "100%", maxWidth: 760, display: "block" }}
          />
        </div>
      </section>

      {/* ── THE PROBLEM ── */}
      <section style={{ background: INK, color: IVORY }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "80px 32px", display: "flex", flexWrap: "wrap", gap: 40 }}>
          {PROBLEMS.map((p, i) => (
            <div key={i} style={{ flex: "1 1 280px", display: "flex", flexDirection: "column", gap: 12 }}>
              <h3 className="display" style={{ fontSize: "clamp(22px, 2.6vw, 30px)", lineHeight: 1.2, fontWeight: 400, color: IVORY }}>
                {p.heading}
              </h3>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: "#B9B6AD" }}>{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" style={{ padding: "100px 32px", maxWidth: 1440, margin: "0 auto" }}>
        <div className="grid-detail" style={{ marginBottom: 56 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 16, color: RUST }}>How it works</div>
          </div>
          <div>
            <h3 className="display" style={{ fontSize: "clamp(26px, 3.4vw, 44px)", lineHeight: 1.1, marginBottom: 20 }}>
              One checkpoint on the path every agent already takes.
            </h3>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--ink-soft)" }}>
              Agents reach tools through MCP servers and APIs. Point them at Custos instead,
              and every call passes four steps in a few milliseconds.
            </p>
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center" }}>
          <div style={{ flex: "1 1 200px", display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--ink-muted)" }}>
              Your agents
            </div>
            {["Claude & Copilot agents", "In-house agents", "Automation workflows"].map((t) => (
              <div key={t} style={{ padding: "14px 16px", background: "#FFFFFF", border: "1px solid var(--line-soft)", fontSize: 14 }}>
                {t}
              </div>
            ))}
          </div>

          <div style={{ flex: "0 0 auto", padding: "0 8px" }} aria-hidden="true">
            <svg viewBox="0 0 64 24" width="40" height="24"><path d="M4 12h52M48 5l8 7-8 7" fill="none" stroke={INK} strokeWidth={1.5} /></svg>
          </div>

          <div style={{ flex: "1.4 1 320px", background: INK, color: IVORY, padding: 28, display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span className="display" style={{ fontSize: 24, fontWeight: 500 }}>Custos gateway</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#9EA1A8" }}>single Rust binary</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10 }}>
              {[
                ["01 Identify", "Which agent, whose, with what token"],
                ["02 Decide", "Policy check: allow, block or hold"],
                ["03 Inspect", "Personal data, secrets, bulk exports"],
                ["04 Record", "Signed, tamper-evident audit entry"],
              ].map(([label, desc]) => (
                <div key={label} style={{ padding: 14, border: "1px solid #33363E", display: "flex", flexDirection: "column", gap: 4 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#F2B08A" }}>{label}</span>
                  <span style={{ fontSize: 14, color: "#C9C6BD", lineHeight: 1.45 }}>{desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ flex: "0 0 auto", padding: "0 8px" }} aria-hidden="true">
            <svg viewBox="0 0 64 24" width="40" height="24"><path d="M4 12h52M48 5l8 7-8 7" fill="none" stroke={INK} strokeWidth={1.5} /></svg>
          </div>

          <div style={{ flex: "1 1 200px", display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--ink-muted)" }}>
              Your tools &amp; data
            </div>
            {["MCP servers", "SaaS & ERP APIs", "Databases & LLM providers"].map((t) => (
              <div key={t} style={{ padding: "14px 16px", background: "#FFFFFF", border: "1px solid var(--line-soft)", fontSize: 14 }}>
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SIX CAPABILITIES ── */}
      <section style={{ padding: "100px 32px", maxWidth: 1440, margin: "0 auto", borderTop: "1px solid var(--line-soft)" }}>
        <div className="grid-detail" style={{ marginBottom: 48 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>Zero trust, applied to agents</div>
          </div>
          <h3 className="display" style={{ fontSize: "clamp(24px, 3vw, 40px)", lineHeight: 1.1 }}>
            Zero trust, applied to the workers you didn&apos;t hire.
          </h3>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {CAPABILITIES.map((c, i) => (
            <div key={c.heading} style={{ flex: "1 1 300px", background: "var(--paper-warm)", padding: "32px 28px", borderTop: `2px solid ${RUST}` }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", color: "var(--ink-muted)", marginBottom: 12 }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <h4 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{c.heading}</h4>
              <p style={{ fontSize: 15, lineHeight: 1.55, color: "var(--ink-soft)" }}>{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── POLICIES: AGENT PASSPORT + CEDAR CODE ── */}
      <section id="policy" style={{ padding: "100px 32px", maxWidth: 1440, margin: "0 auto", borderTop: "1px solid var(--line-soft)" }}>
        <div className="grid-detail" style={{ marginBottom: 48 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 16, color: RUST }}>Policies</div>
          </div>
          <div>
            <h3 className="display" style={{ fontSize: "clamp(24px, 3vw, 40px)", lineHeight: 1.1, marginBottom: 20 }}>
              Write the rule once. It holds on every call.
            </h3>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--ink-soft)" }}>
              Each agent has a passport: an owner, a scope and an expiry. Policies are written
              in Cedar, a language built for authorization that can be checked mathematically,
              so you can prove that no agent can ever reach payroll.
            </p>
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 32 }}>
          {/* passport card */}
          <div style={{ flex: "1 1 380px", background: "#FFFFFF", border: "1px solid var(--line-soft)", padding: 32, display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--ink-muted)" }}>
                  Agent passport
                </span>
                <span className="display" style={{ fontSize: 26, fontWeight: 500 }}>InvoiceProcessor</span>
              </div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, padding: "4px 8px", background: "#E3F1EA", color: "#0B5A40" }}>active</span>
            </div>
            <dl style={{ margin: 0, display: "grid", gridTemplateColumns: "110px minmax(0, 1fr)", gap: "10px 16px", fontSize: 14 }}>
              <dt style={{ color: "var(--ink-muted)" }}>Owner</dt><dd style={{ margin: 0 }}>Finance · finance-lead</dd>
              <dt style={{ color: "var(--ink-muted)" }}>Identity</dt><dd style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: 13 }}>finance-bot-17</dd>
              <dt style={{ color: "var(--ink-muted)" }}>Token expires</dt><dd style={{ margin: 0 }}>in 55 minutes</dd>
            </dl>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 20, fontSize: 14 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontWeight: 600 }}>May</span>
                <span style={{ color: "#0B5A40" }}>✓ Read invoices</span>
                <span style={{ color: "#0B5A40" }}>✓ Read SAP vendors</span>
                <span style={{ color: "#0B5A40" }}>✓ Draft payment proposal</span>
                <span style={{ color: "#8A5300" }}>◐ Execute payment, with approval</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontWeight: 600 }}>May not</span>
                <span style={{ color: "#9B1C1C" }}>✕ HR records</span>
                <span style={{ color: "#9B1C1C" }}>✕ Payroll</span>
                <span style={{ color: "#9B1C1C" }}>✕ Customer database</span>
                <span style={{ color: "#9B1C1C" }}>✕ Send data outside the EU</span>
              </div>
            </div>
          </div>

          {/* cedar code */}
          <div style={{ flex: "1.4 1 460px", background: INK, display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "14px 24px", borderBottom: "1px solid #2B2E35", fontFamily: "var(--font-mono)", fontSize: 12, color: "#9EA1A8" }}>
              policies/finance.cedar
            </div>
            <pre style={{ margin: 0, padding: 24, fontFamily: "var(--font-mono)", fontSize: 13, lineHeight: 1.7, color: IVORY, whiteSpace: "pre-wrap" }}>
              <span style={{ color: "#7E828A" }}>{"// InvoiceProcessor may read and propose, never pay alone"}</span>{"\n"}
              <span style={{ color: "#F2B08A" }}>permit</span>{" ("}{"\n"}
              {"  principal == Agent::\"invoice-processor\","}{"\n"}
              {"  action in [Action::\"sap.read_invoice\","}{"\n"}
              {"             Action::\"sap.create_payment_proposal\"],"}{"\n"}
              {"  resource in Domain::\"finance\""}{"\n"}
              {");"}{"\n\n"}
              <span style={{ color: "#FF8A7A" }}>forbid</span>{" ("}{"\n"}
              {"  principal,"}{"\n"}
              {"  action == Action::\"sap.execute_payment\","}{"\n"}
              {"  resource"}{"\n"}
              {") "}<span style={{ color: "#F2B08A" }}>unless</span>{" { context.approved_by in Role::\"finance-lead\" };"}{"\n\n"}
              <span style={{ color: "#FF8A7A" }}>forbid</span>{" ("}{"\n"}
              {"  principal,"}{"\n"}
              {"  action,"}{"\n"}
              {"  resource in Domain::\"payroll\""}{"\n"}
              {");"}
            </pre>
          </div>
        </div>
      </section>

      {/* ── EU AI ACT / NIS2 / GDPR ── */}
      <section id="europe" style={{ background: "#E9E4D8", color: INK }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "100px 32px" }}>
          <div className="eyebrow" style={{ marginBottom: 16, color: RUST }}>Built in Europe, for European rules</div>
          <h3 className="display" style={{ fontSize: "clamp(26px, 3.4vw, 44px)", lineHeight: 1.1, maxWidth: 820, marginBottom: 48 }}>
            Your auditor will ask who let the agent do that. Have the answer.
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24, marginBottom: 32 }}>
            {COMPLIANCE.map((c) => (
              <div key={c.name} style={{ flex: "1 1 280px", background: "#F4F1EA", padding: 28, display: "flex", flexDirection: "column", gap: 12 }}>
                <span className="display" style={{ fontSize: 24, fontWeight: 500 }}>{c.name}</span>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--ink-soft)", margin: 0 }}>{c.body}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: "var(--ink-muted)", margin: 0 }}>
            Custos provides technical controls and evidence. It does not by itself make an
            organisation compliant.
          </p>
        </div>
      </section>

      {/* ── OPEN CORE ── */}
      <section id="open" style={{ padding: "100px 32px", maxWidth: 1440, margin: "0 auto", borderTop: "1px solid var(--line-soft)" }}>
        <div style={{ maxWidth: 820, marginBottom: 48 }}>
          <div className="eyebrow" style={{ marginBottom: 16, color: RUST }}>Open core</div>
          <h3 className="display" style={{ fontSize: "clamp(26px, 3.4vw, 44px)", lineHeight: 1.1 }}>
            Read the code that guards your agents.
          </h3>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
          <div style={{ flex: "1 1 380px", border: `1px solid ${INK}`, padding: 36, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span className="display" style={{ fontSize: 26, fontWeight: 500 }}>Custos Gateway</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 13 }}>Apache 2.0</span>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--ink-soft)", margin: 0 }}>
              The enforcement point. Open source, written in Rust, one binary, runs next to
              your agents.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 14 }}>
              <span>MCP proxy with per-agent identity</span>
              <span>Cedar policy evaluation</span>
              <span>Local audit log</span>
              <span>Docker or bare binary</span>
            </div>
            <pre style={{ margin: "8px 0 0", padding: "14px 16px", background: INK, color: IVORY, fontFamily: "var(--font-mono)", fontSize: 13 }}>
              $ custos run --policy ./policies
            </pre>
          </div>
          <div style={{ flex: "1 1 380px", background: INK, color: IVORY, padding: 36, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span className="display" style={{ fontSize: 26, fontWeight: 500 }}>Custos Control</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "#9EA1A8" }}>commercial</span>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: "#B9B6AD", margin: 0 }}>
              For companies running agents across teams. Self-hosted or EU cloud.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 14 }}>
              <span>Agent inventory and owners</span>
              <span>Approval queue for held actions</span>
              <span>Signed, searchable audit trail</span>
              <span>Compliance evidence packs in EN, DE and RO</span>
              <span>SSO and role-based access</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        id="access"
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
          <div className="eyebrow" style={{ marginBottom: 16, color: RUST }}>In development · design partners wanted</div>
          <h3 className="display" style={{ fontSize: "clamp(28px, 4vw, 56px)", lineHeight: 1.05, maxWidth: 680 }}>
            Running agents in production?
            <br />
            <em style={{ fontStyle: "italic", fontWeight: 500, fontVariationSettings: "'opsz' 144, 'wght' 500" }}>
              Build Custos with us.
            </em>
          </h3>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
          <Link
            href="/contact"
            style={{
              display: "inline-block",
              padding: "20px 40px",
              background: RUST,
              color: "#FFFFFF",
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Become a design partner
          </Link>
          <Link href="/work" style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.6 }}>
            ← All work
          </Link>
        </div>
      </section>
    </>
  );
}
