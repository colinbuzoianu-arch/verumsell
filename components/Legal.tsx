import Link from "next/link";

export function LangToggle({
  lang,
  onChange,
}: {
  lang: "en" | "ro";
  onChange: (l: "en" | "ro") => void;
}) {
  const btnBase: React.CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    padding: "6px 12px",
    border: "1px solid var(--ink)",
    cursor: "pointer",
    background: "transparent",
    color: "var(--ink)",
    opacity: 0.6,
    transition: "opacity 0.2s, background 0.2s",
  };
  const btnActive: React.CSSProperties = {
    ...btnBase,
    background: "var(--ink)",
    color: "var(--paper)",
    opacity: 1,
  };
  return (
    <div style={{ display: "flex", gap: 0 }}>
      <button
        onClick={() => onChange("en")}
        style={lang === "en" ? btnActive : btnBase}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
      <button
        onClick={() => onChange("ro")}
        style={{ ...(lang === "ro" ? btnActive : btnBase), borderLeft: "none" }}
        aria-pressed={lang === "ro"}
      >
        RO
      </button>
    </div>
  );
}

export function LegalHero({
  eyebrow,
  title,
  updated,
  intro,
  langToggle,
}: {
  eyebrow: string;
  title: React.ReactNode;
  updated: string;
  intro?: React.ReactNode;
  langToggle?: React.ReactNode;
}) {
  return (
    <section style={{ padding: "160px 32px 60px", maxWidth: 880, margin: "0 auto" }}>
      {langToggle && (
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 24 }}>
          {langToggle}
        </div>
      )}
      <div className="eyebrow" style={{ marginBottom: 32 }}>
        <span className="bar" style={{ width: 32, marginRight: 12, height: 2 }} />
        {eyebrow}
      </div>
      <h1
        className="display"
        style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 300, marginBottom: 20 }}
      >
        {title}
      </h1>
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--ink-muted)",
          marginBottom: intro ? 32 : 0,
        }}
      >
        Last updated: {updated}
      </p>
      {intro && (
        <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--ink-soft)" }}>{intro}</p>
      )}
    </section>
  );
}

export function LegalSection({
  index,
  title,
  children,
}: {
  index: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ padding: "40px 32px", maxWidth: 880, margin: "0 auto", borderTop: "1px solid var(--line-soft)" }}>
      <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            color: "var(--ink-muted)",
            minWidth: 32,
            paddingTop: 4,
          }}
        >
          {String(index).padStart(2, "0")}
        </div>
        <div style={{ flex: 1 }}>
          <h2 className="display" style={{ fontSize: "clamp(22px, 3vw, 30px)", marginBottom: 16, lineHeight: 1.1 }}>
            {title}
          </h2>
          <div style={{ fontSize: 16, lineHeight: 1.75, color: "var(--ink-soft)" }}>{children}</div>
        </div>
      </div>
    </section>
  );
}

// Shared identity block for the entity acting as data controller / site
// operator. Pull this from one place so Privacy and Terms never drift out
// of sync with each other.
//
// By the user's choice, the registered office is disclosed at the
// city/county level only — no street address is published here. CUI,
// Trade Registry number, and EUID are public Trade Registry facts.
export const ENTITY = {
  legalName: "Verumsell SRL",
  cui: "51132090",
  regCom: "J2025002367001",
  euid: "ROONRC.J2025002367001",
  registeredAt: {
    en: "Trade Registry Office attached to the Timiș Tribunal",
    ro: "Oficiul Registrului Comerțului de pe lângă Tribunalul Timiș",
  },
  city: "Timișoara, Timiș County, Romania",
  email: "legal@verumsell.com",
};

export function EntityBlock({ lang = "en" }: { lang?: "en" | "ro" }) {
  const labels =
    lang === "ro"
      ? { regCom: "Nr. Reg. Com.", registeredAt: "Înregistrată la", office: "Sediu social", contact: "Contact" }
      : { regCom: "Trade Registry no.", registeredAt: "Registered with", office: "Registered office", contact: "Contact" };

  return (
    <div
      style={{
        background: "var(--paper-warm)",
        borderLeft: "3px solid var(--ink)",
        padding: "20px 24px",
        marginTop: 12,
        marginBottom: 12,
        fontSize: 15,
        lineHeight: 1.8,
      }}
    >
      <strong>{ENTITY.legalName}</strong>
      <br />
      CUI: {ENTITY.cui}
      <br />
      {labels.regCom}: {ENTITY.regCom}
      <br />
      EUID: {ENTITY.euid}
      <br />
      {labels.registeredAt}: {ENTITY.registeredAt[lang]}
      <br />
      {labels.office}: {ENTITY.city}
      <br />
      {labels.contact}:{" "}
      <Link href={`mailto:${ENTITY.email}`} style={{ textDecoration: "underline" }}>
        {ENTITY.email}
      </Link>
    </div>
  );
}
