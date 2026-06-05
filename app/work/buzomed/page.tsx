"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

// ─── Translations ────────────────────────────────────────────────────────────

const T = {
  ro: {
    backLink: "← Toate proiectele",
    category: "Medicină Muncii",
    partOf: "↳ Parte din Verumsell",
    tagline: "Medicina muncii, modernizată.",

    s01_eyebrow: "01 / Prezentare generală",
    s01_body1:
      "Buzomed este o platformă SaaS multi-tenant pentru cabinetele de medicina muncii din România. Gestionează tot ce ține de activitatea cabinetului — de la primul contract cu o firmă până la fișa de aptitudine semnată care ajunge înapoi la angajator — și tot ce se întâmplă între ele: angajați, locuri de muncă, examinări programate și finalizate, evidența vaccinărilor, facturare și rapoarte de reglementare.",
    s01_body2:
      "Platforma este construită în jurul unității reale de lucru din medicina muncii: o firmă trimite angajații la controale periodice, medicul îi examinează, iar un document cu valoare legală certifică dacă fiecare angajat este apt pentru rolul său. Buzomed automatizează acest ciclu de la cap la coadă — indiferent de câte cabinete folosesc platforma, cu izolare completă între chiriași și protecție a datelor la nivel GDPR.",

    s02_eyebrow: "02 / Stratul de expertiză",
    s02_heading: "Ce stă în spatele platformei",
    s02_body1:
      "Construită de cineva care a petrecut ani întregi în securitate și sănătate în muncă — nu de cineva care a citit legislația pe fugă. Modelul de date reflectă cum funcționează medicina muncii în realitate: firmele sunt clienți, angajații sunt pacienți, locurile de muncă poartă profilul de risc care determină tipul și frecvența examinărilor, iar fișa de aptitudine este documentul legal spre care converge întregul flux de lucru.",
    s02_body2:
      "CNP-ul (codul numeric personal) este stocat criptat AES-256-GCM cu un salt per chiriaș — nu apare niciodată în text clar, nici măcar în backup-uri. Politicile de securitate la nivel de rând (Row-Level Security) aplică izolarea chiriașilor direct la nivelul bazei de date, astfel încât nicio eroare la nivel de aplicație nu poate expune datele unui cabinet altora. Fiecare citire și scriere sensibilă este înregistrată într-un jurnal de audit imutabil.",

    s03_eyebrow: "03 / Flux de lucru principal",
    s03_heading: "Programare → Examinare → Semnare → Arhivare",
    s03_body1:
      "Fluxul de examinare este inima Buzomed. Fiecare examinare parcurge un ciclu clar: programată → în desfășurare → finalizată (sau anulată / neprezentată). La finalizare, medicul înregistrează verdictul — apt, apt condiționat, inapt temporar sau inapt — împreună cu contraindicații, restricții și intervalul de rechemare recomandat.",
    s03_body2:
      "Fișa de aptitudine este generată imediat din datele examinării finalizate. Respectă formatul HG 355/2007, completată automat cu toate datele angajatului, firmei, locului de muncă și medicului. Gata de tipărit din browser, cu un stylesheet dedicat care produce o pagină A4 curată — fără anteturi, fără navigare, doar documentul.",
    s03_body3:
      "Fișele finalizate sunt arhivate în istoricul documentelor angajatului. Codul profesional, titlul și metoda de semnare a medicului sunt înregistrate în examinare pentru trasabilitate.",

    s04_eyebrow: "04 / Firme și angajați",
    s04_heading: "Structura reală a cabinetului",
    s04_body1:
      "Firmele sunt unitatea de facturare. Fiecare firmă poate avea mai multe locuri de muncă, iar fiecare loc de muncă poartă un profil de risc (factori fizici, chimici, biologici, ergonomici, psihosociali) cu sugestii automate pe baza codului CAEN. Angajații sunt atribuiți locurilor de muncă — iar această atribuire, cu data de început și motivul, determină tipul de examinare și programarea.",
    s04_body2:
      "Importul în masă acceptă fișiere CSV sau Excel cu detectare fuzzy a antetelor — cabinetul poate lipi exportul HR existent, iar importatorul determină ce înseamnă fiecare coloană, inclusiv parsarea adreselor românești și a numelor de coloane ambigue precum \"nume\" (care poate însemna nume complet sau prenume, în funcție de context).",
    s04_body3:
      "Angajații pot fi arhivați (au plecat din firmă, transferați, pensionați) în loc să fie șterși, păstrând istoricul medical. CNP-ul este afișat la cerere printr-o acțiune dedicată de dezvăluire, nu în listele generale.",

    s05_eyebrow: "05 / Rechemări și programări",
    s05_heading: "Nimic nu trece neobservat",
    s05_body1:
      "Fiecare examinare finalizată creează automat o rechemare pentru următoarea, pe baza intervalului recomandat. Coada de rechemări afișează examinările expirate și cele viitoare, cu filtre după firmă, loc de muncă, departament, tip de examinare și orizont de timp (expirate / această săptămână / această lună / următoarele 90 de zile).",
    s05_body2:
      "Programarea în masă din coada de rechemări permite medicului să selecteze un grup de angajați și să programeze toate examinările lor viitoare într-un singur wizard — alegând data, ora, locația și medicul o singură dată pentru toată selecția. Dashboard-ul afișează rechemările expirate ca primul element de acțiune la autentificare.",

    s06_eyebrow: "06 / Vaccinări și evenimente medicale",
    s06_heading: "Dosarul complet de sănătate ocupațională",
    s06_body1:
      "Evidența vaccinărilor este ținută per angajat, cu numele vaccinului, data administrării, numărul de lot, calea de administrare (IM, SC, oral, intranazal) și medicul care a administrat. Istoricul complet al vaccinărilor este disponibil în profilul angajatului și în arhiva documentelor sale.",
    s06_body2:
      "Accidentele de muncă, episoadele de îmbolnăvire bruscă și evenimentele de prim ajutor sunt înregistrate ca evenimente medicale cu urmărirea evoluției (recuperat, spitalizat, tratament în curs). Acestea alimentează raportarea de reglementare pe care cabinetele de medicina muncii din România sunt obligate să o producă.",

    s07_eyebrow: "07 / Rapoarte",
    s07_heading: "Datele care contează pentru cabinet",
    s07_body1:
      "Secțiunea de rapoarte acoperă trei vizualizări: volumul examinărilor pe lună (cu filtre după firmă și interval de date), prognoza expirărilor (ce angajați sunt scadenți sau depășiți și când) și încărcarea medicilor (examinări per medic pe o perioadă). Toate rapoartele pot fi exportate în CSV.",
    s07_body2:
      "Rapoartele anuale pentru firme pot fi redactate într-un editor de text per firmă — un document structurat pe care cabinetul îl produce pentru angajator la finalul fiecărui an contractual, rezumând starea de sănătate și recomandările. Rapoartele imprimabile la nivel de firmă sunt disponibile la cerere.",

    s08_eyebrow: "08 / Contracte și facturare",
    s08_heading: "Latura de business a cabinetului",
    s08_body1:
      "Fiecare firmă client poate avea unul sau mai multe contracte (ciornă → activ → expirat / reziliat), cu date de început și sfârșit, valoare și note. Contractele sunt ancora relației de facturare.",
    s08_body2:
      "Facturile sunt gestionate per firmă — poziții, totaluri, dată de emitere, scadență și status (ciornă / emisă / plătită / restantă). Numerotarea facturilor este automată. Datele proprii ale cabinetului (denumire, CIF, adresă, cont bancar) sunt configurate o singură dată și aplicate pe fiecare factură.",

    s09_eyebrow: "09 / Securitate și multi-tenant",
    s09_heading: "Conformitate GDPR de la zero",
    s09_body1:
      "Fiecare înregistrare din baza de date poartă un tenantId. Politicile de securitate la nivel de rând din Supabase aplică izolarea la nivelul PostgreSQL — chiar dacă codul aplicației ar avea un bug, un chiriaș nu poate citi datele altui chiriaș. Aceasta nu este middleware opțional; este modelul de securitate.",
    s09_body2:
      "CNP-ul este stocat criptat AES-256-GCM cu un salt unic derivat per chiriaș. Decriptarea are loc doar la acțiunea explicită a utilizatorului, printr-o componentă dedicată de dezvăluire. Hash-ul CNP-ului este stocat separat pentru verificări de duplicare, fără a fi necesară decriptarea în masă.",
    s09_body3:
      "Toate acțiunile sensibile sunt scrise într-un jurnal de audit imutabil cu actor, acțiune, tip de entitate, ID entitate și marcaj de timp. Controlul accesului bazat pe roluri (practice_admin, practitioner, assistant, company_hr) controlează ce poate vedea și face fiecare utilizator — configurabil per cabinet fără modificări de cod.",

    s10_eyebrow: "10 / Abonamente",
    s10_heading: "Self-serve, alimentat de Stripe",
    s10_body1:
      "Cabinetele noi se înregistrează, verifică adresa de email și sunt în perioada de probă de 14 zile în câteva minute. Niciun apel de vânzări. Conversia din perioadă de probă în abonament plătit este gestionată integral prin Stripe Checkout — medicul alege un plan, plătește, iar abonamentul se activează instant prin webhook.",
    s10_body2:
      "Planurile de prețuri sunt bazate pe numărul de angajați activi: Starter (până la 100), Growth (până la 500), Pro (până la 2.000), Enterprise (nelimitat). Sistemul de abonamente aplică limitele — adăugarea unui angajat peste limita planului afișează un prompt clar de upgrade în loc să eșueze silențios.",
    s10_body3:
      "O secvență de emailuri alimentată de Brevo rulează pe toată durata perioadei de probă: bun venit, reamintire în ziua 7, reamintire în ziua 11, avertizare expirare și post-expirare. Abonamentele cu plată restantă sau neplătite declanșează alerte interne pentru administrator. Tenanți demo cu date realiste pre-populate sunt disponibili pentru onboarding-ul medicilor fără a atinge datele de producție.",

    featureLabel: "Rezumat funcționalități",
    features: [
      { label: "Flux examinări", value: "Programare → verdict → fișă semnată" },
      { label: "Criptare CNP", value: "AES-256-GCM, salt per tenant" },
      { label: "Izolare tenant", value: "Supabase RLS la nivelul bazei de date" },
      { label: "Import în masă", value: "CSV/Excel cu detectare fuzzy antete" },
      { label: "Motor rechemări", value: "Programare automată pe baza intervalului" },
      { label: "Profiluri risc locuri de muncă", value: "Sugestii factori de risc pe baza CAEN" },
      { label: "Evidență vaccinări", value: "Istoric complet per angajat" },
      { label: "Evenimente medicale", value: "Accidente, îmbolnăviri, prim ajutor" },
      { label: "Rapoarte", value: "Volum, expirări, încărcare medici" },
      { label: "Rapoarte anuale firme", value: "Editor text + layout imprimare" },
      { label: "Contracte și facturi", value: "Per firmă, numerotare automată" },
      { label: "Control acces pe roluri", value: "Admin, medic, asistent, HR" },
      { label: "Jurnal audit", value: "Imutabil, actor + acțiune + entitate" },
      { label: "Facturare", value: "Stripe, 4 planuri după număr angajați" },
      { label: "Secvență perioadă probă", value: "Automatizare email Brevo, 14 zile" },
      { label: "Tenanți demo", value: "Date pre-populate pentru onboarding" },
    ],

    ctaEyebrow: "Încearcă",
    ctaHeading: "14 zile gratuit.",
    ctaSubheading: "Fără card de credit.",
    ctaButton: "Deschide Buzomed →",
    ctaBack: "← Toate proiectele",
  },

  en: {
    backLink: "← All work",
    category: "Occupational Health",
    partOf: "↳ Part of Verumsell",
    tagline: "Occupational medicine, modernised.",

    s01_eyebrow: "01 / Overview",
    s01_body1:
      "Buzomed is a multi-tenant SaaS platform for occupational medicine cabinets in Romania. It handles everything from the first company contract to the signed fișă de aptitudine that goes back to the employer — and all the operational work in between: employees, workplaces, scheduled and completed examinations, vaccination records, invoicing, and regulatory reports.",
    s01_body2:
      "The platform is built around the real unit of work in medicina muncii: a company sends employees for periodic check-ups, a practitioner examines them, and a legally compliant document certifies whether each employee is fit for their role. Buzomed automates that cycle end-to-end — across as many cabinets as use the platform, with full tenant isolation and GDPR-grade data handling.",

    s02_eyebrow: "02 / The expert layer",
    s02_heading: "What's behind the platform",
    s02_body1:
      "Built by someone who spent years inside health and safety — not by someone who looked up the legislation. The data model reflects how medicina muncii actually works: companies are customers, employees are patients, workplaces carry the risk profile that determines examination type and frequency, and the fișă de aptitudine is the legal output the whole workflow converges on.",
    s02_body2:
      "CNP (the Romanian personal identification number) is stored AES-256-GCM encrypted with a per-tenant salt — it never sits in plain text, not even in backups. Row-level security enforces tenant boundaries at the database layer, so no application-side mistake can leak one cabinet's data to another. Every sensitive read and write lands in an immutable audit log.",

    s03_eyebrow: "03 / Core workflow",
    s03_heading: "Schedule → Examine → Sign → Archive",
    s03_body1:
      "The examination workflow is the heart of Buzomed. Each examination moves through a clear lifecycle: scheduled → in_progress → completed (or cancelled / no_show). At completion, the practitioner records the verdict — apt, apt condiționat, inapt temporar, or inapt — along with contraindications, restrictions, and the recommended recall interval.",
    s03_body2:
      "The fișă de aptitudine is generated immediately from the completed examination data. It follows the HG 355/2007 format, pre-filled with all employee, company, workplace, and practitioner data. Print-ready from the browser, with a dedicated print stylesheet that produces a clean A4 page — no headers, no nav, just the document.",
    s03_body3:
      "Completed fișe are archived to the employee's document history. The practitioner's professional code, title, and signature method are recorded against the examination for the audit trail.",

    s04_eyebrow: "04 / Companies & employees",
    s04_heading: "The actual structure of the practice",
    s04_body1:
      "Companies are the billing unit. Each company can have multiple workplaces, each workplace carries a risk profile (physical, chemical, biological, ergonomic, psychosocial hazards) with auto-suggestions based on CAEN activity code. Employees are assigned to workplaces — and that assignment, with its start date and reason, is what drives examination type and scheduling.",
    s04_body2:
      "Bulk import accepts CSV or Excel files with fuzzy header detection — the cabinet can paste their existing HR export and the importer figures out which column means what, including Romanian address parsing and ambiguous column names like \"nume\" (which can mean full name or last name depending on context).",
    s04_body3:
      "Employees can be archived (left employment, transferred, retired) rather than deleted, preserving the medical history. CNP is revealed on-demand with a dedicated reveal action, never shown in listing views.",

    s05_eyebrow: "05 / Recalls & scheduling",
    s05_heading: "Nothing falls through the cracks",
    s05_body1:
      "Every completed examination automatically creates a recall for the next one, based on the recommended interval. The recall queue surfaces overdue and upcoming examinations filtered by company, workplace, department, examination type, and time horizon (overdue / this week / this month / next 90 days).",
    s05_body2:
      "Bulk scheduling from the recall queue lets the practitioner select a group of employees and schedule all their next examinations in one wizard — choosing date, time, location, and practitioner once and applying it across the selection. The dashboard surfaces overdue recalls as the first action item practitioners see on login.",

    s06_eyebrow: "06 / Vaccinations & medical events",
    s06_heading: "The full occupational health record",
    s06_body1:
      "Vaccination records are tracked per employee with vaccine name, administration date, lot number, administration route (IM, SC, oral, intranasal), and administering practitioner. The full vaccination history is available on the employee profile and in their document archive.",
    s06_body2:
      "Workplace accidents, sudden illness episodes, and first-aid events are recorded as medical events with outcome tracking (recovered, hospitalized, ongoing treatment). These feed the regulatory reporting that Romanian occupational medicine practices are required to produce.",

    s07_eyebrow: "07 / Reports",
    s07_heading: "The numbers that matter to the practice",
    s07_body1:
      "The reports section covers three views: examination volume by month (with company and date-range filters), examination expiration forecast (which employees are due or overdue and when), and practitioner workload (examinations per practitioner over a period). All reports are exportable to CSV.",
    s07_body2:
      "Annual company reports can be drafted in a prose editor per company — a structured document the cabinet produces for the employer at the end of each contractual year, summarising health status and recommendations. Company-level printable reports are available on demand.",

    s08_eyebrow: "08 / Contracts & invoicing",
    s08_heading: "The business side of the cabinet",
    s08_body1:
      "Each client company can have one or more contracts (draft → active → expired / terminated), with start and end dates, value, and notes. Contracts are the anchor for the billing relationship.",
    s08_body2:
      "Invoices are managed per company — line items, totals, issue date, due date, and status (draft / issued / paid / overdue). Invoice numbers are auto-sequenced. The practice's own issuer details (name, CIF, address, bank account) are configured once and stamped on every invoice.",

    s09_eyebrow: "09 / Security & multi-tenancy",
    s09_heading: "GDPR-grade from the ground up",
    s09_body1:
      "Every row in the database carries a tenantId. Supabase row-level security policies enforce isolation at the PostgreSQL layer — even if application code had a bug, one tenant cannot read another's data. This is not optional middleware; it is the security model.",
    s09_body2:
      "CNP is stored AES-256-GCM encrypted with a unique salt derived per tenant. Decryption only happens on explicit user action in a dedicated reveal component. The hash of the CNP is stored separately for deduplication checks without ever needing to decrypt in bulk.",
    s09_body3:
      "All sensitive actions are written to an immutable audit log with actor, action, entity type, entity ID, and timestamp. Role-based access (practice_admin, practitioner, assistant, company_hr) controls what each user can see and do — configurable per practice without touching code.",

    s10_eyebrow: "10 / Subscriptions",
    s10_heading: "Self-serve, Stripe-powered",
    s10_body1:
      "New practices register, verify their email, and are in a 14-day free trial within minutes. No sales call. Trial-to-paid conversion is handled entirely through Stripe Checkout — the practitioner picks a tier, pays, and their subscription activates instantly via webhook.",
    s10_body2:
      "Pricing tiers are based on active employee count: Starter (up to 100), Growth (up to 500), Pro (up to 2,000), Enterprise (unlimited). The subscription system enforces the caps — adding an employee beyond the plan limit surfaces a clear upgrade prompt rather than silently failing.",
    s10_body3:
      "A Brevo-powered email sequence runs throughout the trial: welcome, day-7 nudge, day-11 nudge, expiry warning, and post-expiry. Past-due and unpaid subscriptions trigger internal admin alerts. Demo tenants with realistic seeded data are available for practitioner onboarding without touching production data.",

    featureLabel: "Feature summary",
    features: [
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
    ],

    ctaEyebrow: "Try it",
    ctaHeading: "14-day free trial.",
    ctaSubheading: "No credit card required.",
    ctaButton: "Open Buzomed →",
    ctaBack: "← All work",
  },
} as const;

type Lang = keyof typeof T;

export default function BuzomedPage() {
  const [lang, setLang] = useState<Lang>("ro");

  useEffect(() => {
    const saved = localStorage.getItem("buzomed-lang") as Lang | null;
    if (saved === "en" || saved === "ro") setLang(saved);
  }, []);

  const switchLang = (l: Lang) => {
    setLang(l);
    localStorage.setItem("buzomed-lang", l);
  };

  const t = T[lang];

  const btnBase: React.CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    padding: "6px 12px",
    border: "1px solid #0A1F3A",
    cursor: "pointer",
    background: "transparent",
    color: "#0A1F3A",
    opacity: 0.6,
    transition: "opacity 0.2s, background 0.2s",
  };
  const btnActive: React.CSSProperties = {
    ...btnBase,
    background: "#0A1F3A",
    color: "#DCEAF5",
    opacity: 1,
  };

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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 48,
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <Link
              href="/work"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                opacity: 0.7,
                color: "#0A1F3A",
              }}
            >
              {t.backLink}
            </Link>

            <div style={{ display: "flex", gap: 0 }}>
              <button
                onClick={() => switchLang("ro")}
                style={lang === "ro" ? btnActive : btnBase}
                aria-pressed={lang === "ro"}
              >
                RO
              </button>
              <button
                onClick={() => switchLang("en")}
                style={{ ...(lang === "en" ? btnActive : btnBase), borderLeft: "none" }}
                aria-pressed={lang === "en"}
              >
                EN
              </button>
            </div>
          </div>

          <div style={{ display: "flex", gap: 16, marginBottom: 32, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", opacity: 0.7 }}>
              {t.category}
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", padding: "6px 10px", border: "1px solid #0A1F3A", opacity: 0.8 }}>
              ● Live
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.7 }}>
              {t.partOf}
            </span>
          </div>

          <h1 className="display" style={{ fontSize: "clamp(48px, 11vw, 200px)", fontWeight: 400, lineHeight: 0.9, marginBottom: 32, color: "#0A1F3A" }}>
            Buzomed
          </h1>
          <p className="display" style={{ fontSize: "clamp(20px, 3vw, 40px)", fontWeight: 300, fontStyle: "italic", maxWidth: 900, opacity: 0.85, lineHeight: 1.2, color: "#0A1F3A" }}>
            {t.tagline}
          </p>
        </div>
      </section>

      {/* ── OVERVIEW ── */}
      <section style={{ padding: "100px 32px", maxWidth: 1440, margin: "0 auto" }}>
        <div className="grid-detail">
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>{t.s01_eyebrow}</div>
          </div>
          <div style={{ fontSize: "clamp(18px, 2vw, 22px)", lineHeight: 1.55, color: "var(--ink-soft)" }}>
            {t.s01_body1}<br /><br />{t.s01_body2}
          </div>
        </div>
      </section>

      {/* ── EXPERT LAYER ── */}
      <section style={{ padding: "100px 32px", maxWidth: 1440, margin: "0 auto", borderTop: "1px solid var(--line-soft)" }}>
        <div className="grid-detail">
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>{t.s02_eyebrow}</div>
            <h3 className="display" style={{ fontSize: "clamp(24px, 3vw, 40px)", lineHeight: 1.05 }}>{t.s02_heading}</h3>
          </div>
          <div style={{ fontSize: 19, lineHeight: 1.65, color: "var(--ink-soft)" }}>
            {t.s02_body1}<br /><br />{t.s02_body2}
          </div>
        </div>
      </section>

      {/* ── CORE WORKFLOW ── */}
      <section style={{ padding: "100px 32px", maxWidth: 1440, margin: "0 auto", borderTop: "1px solid var(--line-soft)" }}>
        <div className="grid-detail">
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>{t.s03_eyebrow}</div>
            <h3 className="display" style={{ fontSize: "clamp(24px, 3vw, 40px)", lineHeight: 1.05 }}>{t.s03_heading}</h3>
          </div>
          <div style={{ fontSize: 19, lineHeight: 1.65, color: "var(--ink-soft)" }}>
            <p style={{ marginBottom: 20 }}>{t.s03_body1}</p>
            <p style={{ marginBottom: 20 }}>{t.s03_body2}</p>
            <p>{t.s03_body3}</p>
          </div>
        </div>
      </section>

      {/* ── COMPANIES & EMPLOYEES ── */}
      <section style={{ padding: "100px 32px", maxWidth: 1440, margin: "0 auto", borderTop: "1px solid var(--line-soft)" }}>
        <div className="grid-detail">
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>{t.s04_eyebrow}</div>
            <h3 className="display" style={{ fontSize: "clamp(24px, 3vw, 40px)", lineHeight: 1.05 }}>{t.s04_heading}</h3>
          </div>
          <div style={{ fontSize: 19, lineHeight: 1.65, color: "var(--ink-soft)" }}>
            <p style={{ marginBottom: 20 }}>{t.s04_body1}</p>
            <p style={{ marginBottom: 20 }}>{t.s04_body2}</p>
            <p>{t.s04_body3}</p>
          </div>
        </div>
      </section>

      {/* ── RECALLS ── */}
      <section style={{ padding: "100px 32px", maxWidth: 1440, margin: "0 auto", borderTop: "1px solid var(--line-soft)" }}>
        <div className="grid-detail">
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>{t.s05_eyebrow}</div>
            <h3 className="display" style={{ fontSize: "clamp(24px, 3vw, 40px)", lineHeight: 1.05 }}>{t.s05_heading}</h3>
          </div>
          <div style={{ fontSize: 19, lineHeight: 1.65, color: "var(--ink-soft)" }}>
            <p style={{ marginBottom: 20 }}>{t.s05_body1}</p>
            <p>{t.s05_body2}</p>
          </div>
        </div>
      </section>

      {/* ── VACCINATIONS ── */}
      <section style={{ padding: "100px 32px", maxWidth: 1440, margin: "0 auto", borderTop: "1px solid var(--line-soft)" }}>
        <div className="grid-detail">
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>{t.s06_eyebrow}</div>
            <h3 className="display" style={{ fontSize: "clamp(24px, 3vw, 40px)", lineHeight: 1.05 }}>{t.s06_heading}</h3>
          </div>
          <div style={{ fontSize: 19, lineHeight: 1.65, color: "var(--ink-soft)" }}>
            <p style={{ marginBottom: 20 }}>{t.s06_body1}</p>
            <p>{t.s06_body2}</p>
          </div>
        </div>
      </section>

      {/* ── REPORTS ── */}
      <section style={{ padding: "100px 32px", maxWidth: 1440, margin: "0 auto", borderTop: "1px solid var(--line-soft)" }}>
        <div className="grid-detail">
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>{t.s07_eyebrow}</div>
            <h3 className="display" style={{ fontSize: "clamp(24px, 3vw, 40px)", lineHeight: 1.05 }}>{t.s07_heading}</h3>
          </div>
          <div style={{ fontSize: 19, lineHeight: 1.65, color: "var(--ink-soft)" }}>
            <p style={{ marginBottom: 20 }}>{t.s07_body1}</p>
            <p>{t.s07_body2}</p>
          </div>
        </div>
      </section>

      {/* ── CONTRACTS ── */}
      <section style={{ padding: "100px 32px", maxWidth: 1440, margin: "0 auto", borderTop: "1px solid var(--line-soft)" }}>
        <div className="grid-detail">
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>{t.s08_eyebrow}</div>
            <h3 className="display" style={{ fontSize: "clamp(24px, 3vw, 40px)", lineHeight: 1.05 }}>{t.s08_heading}</h3>
          </div>
          <div style={{ fontSize: 19, lineHeight: 1.65, color: "var(--ink-soft)" }}>
            <p style={{ marginBottom: 20 }}>{t.s08_body1}</p>
            <p>{t.s08_body2}</p>
          </div>
        </div>
      </section>

      {/* ── SECURITY ── */}
      <section style={{ padding: "100px 32px", maxWidth: 1440, margin: "0 auto", borderTop: "1px solid var(--line-soft)" }}>
        <div className="grid-detail">
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>{t.s09_eyebrow}</div>
            <h3 className="display" style={{ fontSize: "clamp(24px, 3vw, 40px)", lineHeight: 1.05 }}>{t.s09_heading}</h3>
          </div>
          <div style={{ fontSize: 19, lineHeight: 1.65, color: "var(--ink-soft)" }}>
            <p style={{ marginBottom: 20 }}>{t.s09_body1}</p>
            <p style={{ marginBottom: 20 }}>{t.s09_body2}</p>
            <p>{t.s09_body3}</p>
          </div>
        </div>
      </section>

      {/* ── SUBSCRIPTIONS ── */}
      <section style={{ padding: "100px 32px", maxWidth: 1440, margin: "0 auto", borderTop: "1px solid var(--line-soft)" }}>
        <div className="grid-detail">
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>{t.s10_eyebrow}</div>
            <h3 className="display" style={{ fontSize: "clamp(24px, 3vw, 40px)", lineHeight: 1.05 }}>{t.s10_heading}</h3>
          </div>
          <div style={{ fontSize: 19, lineHeight: 1.65, color: "var(--ink-soft)" }}>
            <p style={{ marginBottom: 20 }}>{t.s10_body1}</p>
            <p style={{ marginBottom: 20 }}>{t.s10_body2}</p>
            <p>{t.s10_body3}</p>
          </div>
        </div>
      </section>

      {/* ── FEATURE GRID ── */}
      <section style={{ padding: "100px 32px", maxWidth: 1440, margin: "0 auto", borderTop: "1px solid var(--line-soft)" }}>
        <div className="eyebrow" style={{ marginBottom: 48 }}>{t.featureLabel}</div>
        <div className="grid-4col" style={{ gap: 2 }}>
          {t.features.map((item) => (
            <div key={item.label} style={{ background: "var(--paper-tint)", padding: "32px 28px", borderLeft: "2px solid var(--buzomed, #4A90C4)" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.6, marginBottom: 10 }}>
                {item.label}
              </div>
              <div style={{ fontSize: 16, lineHeight: 1.45 }}>{item.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "100px 32px", maxWidth: 1440, margin: "0 auto", borderTop: "1px solid var(--line-soft)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 32 }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 16 }}>{t.ctaEyebrow}</div>
          <h3 className="display" style={{ fontSize: "clamp(28px, 4vw, 56px)", lineHeight: 1.0 }}>
            {t.ctaHeading}<br />
            <em style={{ fontStyle: "italic", fontWeight: 500, fontVariationSettings: "'opsz' 144, 'wght' 500" }}>
              {t.ctaSubheading}
            </em>
          </h3>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
          <a href="https://buzomed.com" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "20px 40px", background: "var(--ink)", color: "var(--paper)", fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase" }}>
            {t.ctaButton}
          </a>
          <Link href="/work" style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.6 }}>
            {t.ctaBack}
          </Link>
        </div>
      </section>
    </>
  );
}
