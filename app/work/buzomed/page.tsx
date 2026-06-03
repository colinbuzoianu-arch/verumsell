import Link from "next/link";

export const metadata = {
  title: "Buzomed — Verumsell",
  description:
    "Multi-tenant SaaS for occupational medicine practices in Romania. Full examination workflow, fișe de aptitudine, encrypted CNP storage, recalls, reports, and Stripe billing.",
};

export default function BuzomedPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section
        style={{
          background: "linear-gradient(135deg, #DCEAF5 0%, #B8D8DA 100%)",
          color: "#0A1F3A",
          padding: "160px 32px 100px",
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ maxWidth: 1440, margin: "0 auto", width: "100%" }}>
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
              color: "#0A1F3A",
            }}
          >
            ← All work
          </Link>

          <div
            style={{
              display: "flex",
              gap: 16,
              marginBottom: 32,
              flexWrap: "wrap",
              alignItems: "center",
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
              Occupational Health
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                padding: "6px 10px",
                border: "1px solid #0A1F3A",
                opacity: 0.8,
              }}
            >
              ● Live
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                opacity: 0.7,
              }}
            >
              ↳ Part of Buzomed
            </span>
          </div>

          <h1
            className="display"
            style={{
              fontSize: "clamp(48px, 11vw, 200px)",
              fontWeight: 400,
              lineHeight: 0.9,
              marginBottom: 32,
              color: "#0A1F3A",
            }}
          >
            Buzomed
          </h1>
          <p
            className="display"
            style={{
              fontSize: "clamp(20px, 3vw, 40px)",
              fontWeight: 300,
              fontStyle: "italic",
              maxWidth: 900,
              opacity: 0.85,
              lineHeight: 1.2,
              color: "#0A1F3A",
            }}
          >
            Occupational medicine, modernised.
          </p>
        </div>
      </section>

      {/* ── OVERVIEW ── */}
      <section style={{ padding: "100px 32px", maxWidth: 1440, margin: "0 auto" }}>
        <div className="grid-detail">
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>
              01 / Overview
            </div>
          </div>
          <div
            style={{
              fontSize: "clamp(18px, 2vw, 22px)",
              lineHeight: 1.55,
              color: "var(--ink-soft)",
            }}
          >
            Buzomed is a multi-tenant SaaS platform for occupational medicine
            cabinets in Romania. It handles everything from the first company
            contract to the signed fișă de aptitudine that goes back to the
            employer — and all the operational work in between: employees,
            workplaces, scheduled and completed examinations, vaccination
            records, invoicing, and regulatory reports.
            <br />
            <br />
            The platform is built around the real unit of work in medicina
            muncii: a company sends employees for periodic check-ups, a
            practitioner examines them, and a legally compliant document
            certifies whether each employee is fit for their role. Buzomed
            automates that cycle end-to-end — across as many cabinets as use
            the platform, with full tenant isolation and GDPR-grade data
            handling.
          </div>
        </div>
      </section>

      {/* ── EXPERT LAYER ── */}
      <section
        style={{
          padding: "100px 32px",
          maxWidth: 1440,
          margin: "0 auto",
          borderTop: "1px solid var(--line-soft)",
        }}
      >
        <div className="grid-detail">
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>
              02 / The expert layer
            </div>
            <h3
              className="display"
              style={{ fontSize: "clamp(24px, 3vw, 40px)", lineHeight: 1.05 }}
            >
              What&apos;s behind the platform
            </h3>
          </div>
          <div
            style={{ fontSize: 19, lineHeight: 1.65, color: "var(--ink-soft)" }}
          >
            Built by someone who spent years inside health and safety — not by
            someone who looked up the legislation. The data model reflects how
            medicina muncii actually works: companies are customers, employees
            are patients, workplaces carry the risk profile that determines
            examination type and frequency, and the fișă de aptitudine is the
            legal output the whole workflow converges on.
            <br />
            <br />
            CNP (the Romanian personal identification number) is stored
            AES-256-GCM encrypted with a per-tenant salt — it never sits in
            plain text, not even in backups. Row-level security enforces tenant
            boundaries at the database layer, so no application-side mistake
            can leak one cabinet&apos;s data to another. Every sensitive read and
            write lands in an immutable audit log.
          </div>
        </div>
      </section>

      {/* ── FEATURE SECTIONS ── */}

      {/* Examination workflow */}
      <section
        style={{
          padding: "100px 32px",
          maxWidth: 1440,
          margin: "0 auto",
          borderTop: "1px solid var(--line-soft)",
        }}
      >
        <div className="grid-detail">
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>
              03 / Core workflow
            </div>
            <h3
              className="display"
              style={{ fontSize: "clamp(24px, 3vw, 40px)", lineHeight: 1.05 }}
            >
              Schedule → Examine → Sign → Archive
            </h3>
          </div>
          <div
            style={{ fontSize: 19, lineHeight: 1.65, color: "var(--ink-soft)" }}
          >
            <p style={{ marginBottom: 20 }}>
              The examination workflow is the heart of Buzomed. Each
              examination moves through a clear lifecycle: scheduled →
              in_progress → completed (or cancelled / no_show). At completion,
              the practitioner records the verdict — <em>apt</em>,{" "}
              <em>apt condiționat</em>, <em>inapt temporar</em>, or{" "}
              <em>inapt</em> — along with contraindications, restrictions, and
              the recommended recall interval.
            </p>
            <p style={{ marginBottom: 20 }}>
              The <strong>fișă de aptitudine</strong> is generated immediately
              from the completed examination data. It follows the HG 355/2007
              format, pre-filled with all employee, company, workplace, and
              practitioner data. Print-ready from the browser, with a
              dedicated print stylesheet that produces a clean A4 page — no
              headers, no nav, just the document.
            </p>
            <p>
              Completed fișe are archived to the employee&apos;s document
              history. The practitioner&apos;s professional code, title, and
              signature method are recorded against the examination for the
              audit trail.
            </p>
          </div>
        </div>
      </section>

      {/* Employee & company management */}
      <section
        style={{
          padding: "100px 32px",
          maxWidth: 1440,
          margin: "0 auto",
          borderTop: "1px solid var(--line-soft)",
        }}
      >
        <div className="grid-detail">
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>
              04 / Companies & employees
            </div>
            <h3
              className="display"
              style={{ fontSize: "clamp(24px, 3vw, 40px)", lineHeight: 1.05 }}
            >
              The actual structure of the practice
            </h3>
          </div>
          <div
            style={{ fontSize: 19, lineHeight: 1.65, color: "var(--ink-soft)" }}
          >
            <p style={{ marginBottom: 20 }}>
              Companies are the billing unit. Each company can have multiple
              workplaces, each workplace carries a risk profile (physical,
              chemical, biological, ergonomic, psychosocial hazards) with
              auto-suggestions based on CAEN activity code. Employees are
              assigned to workplaces — and that assignment, with its start
              date and reason, is what drives examination type and scheduling.
            </p>
            <p style={{ marginBottom: 20 }}>
              <strong>Bulk import</strong> accepts CSV or Excel files with
              fuzzy header detection — the cabinet can paste their existing HR
              export and the importer figures out which column means what,
              including Romanian address parsing and ambiguous column names
              like "nume" (which can mean full name or last name depending on
              context).
            </p>
            <p>
              Employees can be archived (left employment, transferred, retired)
              rather than deleted, preserving the medical history. CNP is
              revealed on-demand with a dedicated reveal action, never shown in
              listing views.
            </p>
          </div>
        </div>
      </section>

      {/* Recalls & scheduling */}
      <section
        style={{
          padding: "100px 32px",
          maxWidth: 1440,
          margin: "0 auto",
          borderTop: "1px solid var(--line-soft)",
        }}
      >
        <div className="grid-detail">
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>
              05 / Recalls & scheduling
            </div>
            <h3
              className="display"
              style={{ fontSize: "clamp(24px, 3vw, 40px)", lineHeight: 1.05 }}
            >
              Nothing falls through the cracks
            </h3>
          </div>
          <div
            style={{ fontSize: 19, lineHeight: 1.65, color: "var(--ink-soft)" }}
          >
            <p style={{ marginBottom: 20 }}>
              Every completed examination automatically creates a recall for
              the next one, based on the recommended interval. The recall
              queue surfaces overdue and upcoming examinations filtered by
              company, workplace, department, examination type, and time
              horizon (overdue / this week / this month / next 90 days).
            </p>
            <p>
              <strong>Bulk scheduling</strong> from the recall queue lets the
              practitioner select a group of employees and schedule all their
              next examinations in one wizard — choosing date, time, location,
              and practitioner once and applying it across the selection. The
              dashboard surfaces overdue recalls as the first action item
              practitioners see on login.
            </p>
          </div>
        </div>
      </section>

      {/* Vaccinations & medical events */}
      <section
        style={{
          padding: "100px 32px",
          maxWidth: 1440,
          margin: "0 auto",
          borderTop: "1px solid var(--line-soft)",
        }}
      >
        <div className="grid-detail">
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>
              06 / Vaccinations & medical events
            </div>
            <h3
              className="display"
              style={{ fontSize: "clamp(24px, 3vw, 40px)", lineHeight: 1.05 }}
            >
              The full occupational health record
            </h3>
          </div>
          <div
            style={{ fontSize: 19, lineHeight: 1.65, color: "var(--ink-soft)" }}
          >
            <p style={{ marginBottom: 20 }}>
              Vaccination records are tracked per employee with vaccine name,
              administration date, lot number, administration route (IM, SC,
              oral, intranasal), and administering practitioner. The full
              vaccination history is available on the employee profile and in
              their document archive.
            </p>
            <p>
              Workplace accidents, sudden illness episodes, and first-aid
              events are recorded as <strong>medical events</strong> with
              outcome tracking (recovered, hospitalized, ongoing treatment).
              These feed the regulatory reporting that Romanian occupational
              medicine practices are required to produce.
            </p>
          </div>
        </div>
      </section>

      {/* Reports */}
      <section
        style={{
          padding: "100px 32px",
          maxWidth: 1440,
          margin: "0 auto",
          borderTop: "1px solid var(--line-soft)",
        }}
      >
        <div className="grid-detail">
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>
              07 / Reports
            </div>
            <h3
              className="display"
              style={{ fontSize: "clamp(24px, 3vw, 40px)", lineHeight: 1.05 }}
            >
              The numbers that matter to the practice
            </h3>
          </div>
          <div
            style={{ fontSize: 19, lineHeight: 1.65, color: "var(--ink-soft)" }}
          >
            <p style={{ marginBottom: 20 }}>
              The reports section covers three views: examination volume by
              month (with company and date-range filters), examination
              expiration forecast (which employees are due or overdue and
              when), and practitioner workload (examinations per practitioner
              over a period). All reports are exportable to CSV.
            </p>
            <p>
              Annual company reports can be drafted in a prose editor per
              company — a structured document the cabinet produces for the
              employer at the end of each contractual year, summarising health
              status and recommendations. Company-level printable reports are
              available on demand.
            </p>
          </div>
        </div>
      </section>

      {/* Contracts & invoicing */}
      <section
        style={{
          padding: "100px 32px",
          maxWidth: 1440,
          margin: "0 auto",
          borderTop: "1px solid var(--line-soft)",
        }}
      >
        <div className="grid-detail">
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>
              08 / Contracts & invoicing
            </div>
            <h3
              className="display"
              style={{ fontSize: "clamp(24px, 3vw, 40px)", lineHeight: 1.05 }}
            >
              The business side of the cabinet
            </h3>
          </div>
          <div
            style={{ fontSize: 19, lineHeight: 1.65, color: "var(--ink-soft)" }}
          >
            <p style={{ marginBottom: 20 }}>
              Each client company can have one or more contracts (draft →
              active → expired / terminated), with start and end dates, value,
              and notes. Contracts are the anchor for the billing relationship.
            </p>
            <p>
              Invoices are managed per company — line items, totals, issue
              date, due date, and status (draft / issued / paid / overdue).
              Invoice numbers are auto-sequenced. The practice&apos;s own issuer
              details (name, CIF, address, bank account) are configured once
              and stamped on every invoice.
            </p>
          </div>
        </div>
      </section>

      {/* Security & multi-tenancy */}
      <section
        style={{
          padding: "100px 32px",
          maxWidth: 1440,
          margin: "0 auto",
          borderTop: "1px solid var(--line-soft)",
        }}
      >
        <div className="grid-detail">
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>
              09 / Security & multi-tenancy
            </div>
            <h3
              className="display"
              style={{ fontSize: "clamp(24px, 3vw, 40px)", lineHeight: 1.05 }}
            >
              GDPR-grade from the ground up
            </h3>
          </div>
          <div
            style={{ fontSize: 19, lineHeight: 1.65, color: "var(--ink-soft)" }}
          >
            <p style={{ marginBottom: 20 }}>
              Every row in the database carries a <code>tenantId</code>.
              Supabase row-level security policies enforce isolation at the
              PostgreSQL layer — even if application code had a bug, one
              tenant cannot read another&apos;s data. This is not optional middleware;
              it is the security model.
            </p>
            <p style={{ marginBottom: 20 }}>
              CNP is stored AES-256-GCM encrypted with a unique salt derived
              per tenant. Decryption only happens on explicit user action in a
              dedicated reveal component. The hash of the CNP is stored
              separately for deduplication checks without ever needing to
              decrypt in bulk.
            </p>
            <p>
              All sensitive actions are written to an immutable audit log with
              actor, action, entity type, entity ID, and timestamp. Role-based
              access (practice_admin, practitioner, assistant, company_hr)
              controls what each user can see and do — configurable per
              practice without touching code.
            </p>
          </div>
        </div>
      </section>

      {/* Subscription & billing */}
      <section
        style={{
          padding: "100px 32px",
          maxWidth: 1440,
          margin: "0 auto",
          borderTop: "1px solid var(--line-soft)",
        }}
      >
        <div className="grid-detail">
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>
              10 / Subscriptions
            </div>
            <h3
              className="display"
              style={{ fontSize: "clamp(24px, 3vw, 40px)", lineHeight: 1.05 }}
            >
              Self-serve, Stripe-powered
            </h3>
          </div>
          <div
            style={{ fontSize: 19, lineHeight: 1.65, color: "var(--ink-soft)" }}
          >
            <p style={{ marginBottom: 20 }}>
              New practices register, verify their email, and are in a 14-day
              free trial within minutes. No sales call. Trial-to-paid
              conversion is handled entirely through Stripe Checkout — the
              practitioner picks a tier, pays, and their subscription activates
              instantly via webhook.
            </p>
            <p style={{ marginBottom: 20 }}>
              Pricing tiers are based on active employee count: Starter (up to
              100), Growth (up to 500), Pro (up to 2,000), Enterprise
              (unlimited). The subscription system enforces the caps — adding
              an employee beyond the plan limit surfaces a clear upgrade prompt
              rather than silently failing.
            </p>
            <p>
              A Brevo-powered email sequence runs throughout the trial:
              welcome, day-7 nudge, day-11 nudge, expiry warning, and
              post-expiry. Past-due and unpaid subscriptions trigger internal
              admin alerts. Demo tenants with realistic seeded data are
              available for practitioner onboarding without touching production
              data.
            </p>
          </div>
        </div>
      </section>

      {/* Highlights grid */}
      <section
        style={{
          padding: "100px 32px",
          maxWidth: 1440,
          margin: "0 auto",
          borderTop: "1px solid var(--line-soft)",
        }}
      >
        <div className="eyebrow" style={{ marginBottom: 48 }}>
          Feature summary
        </div>
        <div
          className="grid-4col"
          style={{ gap: 2 }}
        >
          {[
            { label: "Examination workflow", value: "Schedule → verdict → signed fișă" },
            { label: "CNP encryption", value: "AES-256-GCM, per-tenant salt" },
            { label: "Tenant isolation", value: "Supabase RLS at database layer" },
            { label: "Bulk import", value: "CSV/Excel with fuzzy header detection" },
            { label: "Recall engine", value: "Automated scheduling from interval" },
            { label: "Workplace risk profiles", value: "CAEN-keyed hazard suggestions" },
            { label: "Vaccination records", value: "Full history per employee" },
            { label: "Medical events", value: "Accidents, illness, first aid" },
            { label: "Reports", value: "Volume, expiration, practitioner workload" },
            { label: "Annual company reports", value: "Prose editor + print layout" },
            { label: "Contracts & invoices", value: "Per-company, auto-numbered" },
            { label: "Role-based access", value: "Admin, practitioner, assistant, HR" },
            { label: "Audit log", value: "Immutable, actor + action + entity" },
            { label: "Billing", value: "Stripe, 4 tiers by employee count" },
            { label: "Trial sequence", value: "Brevo email automation, 14-day" },
            { label: "Demo tenants", value: "Seeded data for onboarding" },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                background: "var(--paper-tint)",
                padding: "32px 28px",
                borderLeft: "2px solid var(--buzomed, #4A90C4)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  opacity: 0.6,
                  marginBottom: 10,
                }}
              >
                {item.label}
              </div>
              <div style={{ fontSize: 16, lineHeight: 1.45 }}>{item.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
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
          <div className="eyebrow" style={{ marginBottom: 16 }}>
            Try it
          </div>
          <h3
            className="display"
            style={{ fontSize: "clamp(28px, 4vw, 56px)", lineHeight: 1.0 }}
          >
            14-day free trial.
            <br />
            <em
              style={{
                fontStyle: "italic",
                fontWeight: 500,
                fontVariationSettings: "'opsz' 144, 'wght' 500",
              }}
            >
              No credit card required.
            </em>
          </h3>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
          <a
            href="https://buzomed.com"
            target="_blank"
            rel="noopener noreferrer"
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
            Open Buzomed →
          </a>
          <Link
            href="/work"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              opacity: 0.6,
            }}
          >
            ← All work
          </Link>
        </div>
      </section>
    </>
  );
}
