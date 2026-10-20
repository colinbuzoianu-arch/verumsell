export type Status = "live" | "beta" | "in-development";

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  category: "Health & Wellness" | "Education" | "Sales & Training" | "Occupational Health" | "AI Governance";
  status: Status;
  year: string;
  url?: string;
  /** When true, cards link directly to `url` instead of an internal case page. */
  external?: boolean;
  /** Optional brand mark rendered as a watermark on feature cards. */
  logo?: string;
  subBrand?: "Buzomed";
  accent: string;
  accentInk: string;
  background: string;
  description: string;
  expertLayer: string;
  audience: string;
  highlights: string[];
}

export const PRODUCTS: Product[] = [
  {
    slug: "buzomed",
    name: "Buzomed",
    tagline: "Occupational medicine, modernised",
    category: "Occupational Health",
    status: "live",
    year: "2026",
    url: "https://buzomed.com",
    subBrand: "Buzomed",
    logo: "/brand/buzomed-mark.png",
    accent: "var(--buzomed)",
    accentInk: "#0A1F3A",
    background: "linear-gradient(135deg, #DCEAF5 0%, #B8D8DA 100%)",
    description:
      "A multi-tenant SaaS for occupational medicine practices. Patient records, company contracts, scheduled examinations, signed fișe de aptitudine, vaccination tracking, and regulatory reporting — built for the workflow Romanian medicina muncii actually runs on, with a clear path to DACH.",
    expertLayer:
      "Built around the real operational shape of an occupational medicine practice: companies as customers, employees as patients, role-based examinations, and the regulatory paperwork that has to come out the other end. AES-256-GCM encrypted CNP storage, row-level security, and full audit logging — GDPR-grade from day one.",
    audience: "Occupational medicine practitioners and clinics in Romania, expanding to Germany and the wider DACH region.",
    highlights: [
      "Multi-tenant practice management with full data isolation (Supabase RLS)",
      "Complete examination workflow: schedule → conduct → verdict → signed fișă de aptitudine",
      "AES-256-GCM encrypted CNP with per-tenant salt — GDPR-grade from day one",
      "Bulk employee import from CSV/Excel with fuzzy Romanian address parsing",
      "Automated recall system: overdue and upcoming examination alerts",
      "Workplace risk profiles keyed to CAEN hazard categories (physical, chemical, biological, ergonomic, psychosocial)",
      "Contract and invoice management per client company",
      "Vaccination tracking with administration route and lot number",
      "Reports dashboard: examination volumes, expiration forecasts, practitioner workload",
      "Full audit log and document archive per employee/examination",
      "Role-based access: practice_admin, practitioner, assistant, company_hr",
      "Stripe subscription billing with tiered pricing by active employee count",
    ],
  },
  {
    slug: "ged",
    name: "GED",
    tagline: "Keep every obligation in the green.",
    category: "Occupational Health",
    status: "live",
    year: "2026",
    url: "https://getexpirationdate.com",
    logo: "/brand/ged-mark.svg",
    accent: "var(--ged-green)",
    accentInk: "#16211C",
    background: "linear-gradient(135deg, #ECEFE9 0%, #BFE0CB 100%)",
    description:
      "A safety & health compliance platform that watches every date a workplace can't afford to miss — training certificates, PPE service life, equipment inspections, chemical safety-sheet reviews, and permit renewals. Everything lives on one colour-coded board, with reminders reaching the responsible owner well before anything lapses, and the whole record exporting audit-ready in a single click.",
    expertLayer:
      "Multi-tenant and compliance-by-design: EU-hosted, GDPR-minimal — dates and evidence, never sensitive detail — with role-based access and a full audit trail. Escalating reminders reach the responsible owner at 60, 30 and 7 days out, and escalate further if a renewal slips past its date.",
    audience: "EHS and HR managers at small and mid-sized industrial companies in Romania and the DACH region.",
    highlights: [
      "Live radar dashboard — every obligation on one board, colour-coded by status, filtered by area, owner or type",
      "Escalating reminders — alerts at 60, 30 and 7 days that escalate to the owner if a renewal slips past its date",
      "One-click audit export — a timestamped PDF register, with the certificate behind each item, ready for any inspection",
      "Spreadsheet import — upload the list a company already keeps; GED builds the live register in minutes",
      "Multi-site rollup — several sites, each with its own board and owners, from one account",
      "Roles & audit trail — admin / manager / viewer access, with every change to a date logged",
    ],
  },
  {
    slug: "wls",
    name: "WLS",
    tagline: "Rethinking the rules that govern us",
    category: "AI Governance",
    status: "live",
    year: "2026",
    url: "https://worldlegalservice.com",
    external: true,
    logo: "/brand/wls-mark.png",
    accent: "var(--wls-gold)",
    accentInk: "#1C1710",
    background: "linear-gradient(135deg, #FAF8F1 0%, #EDE5CE 100%)",
    description:
      "World Legal Services — an independent publication on AI governance. Analysis of the EU AI Act, machine ethics, and the frameworks emerging to govern intelligent systems, published in English, Romanian, and German.",
    expertLayer:
      "Written from working knowledge of EU regulatory practice and hands-on AI system development — policy analysis grounded in how these systems are actually built, deployed, and governed.",
    audience: "Policymakers, compliance professionals, and anyone tracking how AI regulation takes shape in Europe.",
    highlights: [
      "Trilingual publication: English, Romanian, German",
      "Five content pillars covering AI governance end to end",
      "EU AI Act analysis and institutional mapping",
      "Briefings format for fast-moving regulatory developments",
    ],
  },
  {
    slug: "statura-labs-dynamics",
    name: "Statura Labs Dynamics",
    tagline: "Ergonomic risk, measured like an instrument — no camera, no wearables",
    category: "Occupational Health",
    status: "live",
    year: "2026",
    url: "https://staturalabs.com",
    logo: "/brand/statura_logo_on_light.png",
    accent: "var(--sld-steel)",
    accentInk: "var(--sld-slate)",
    background: "linear-gradient(135deg, #E4E8EA 0%, #C3CBCF 100%)",
    description:
      "An instrumented ergonomics risk-assessment platform for industrial and manufacturing workplaces. A trained assessor rates real postures in the field; load, force and duration are captured as structured context; and joint angles are scored region by region against ISO 11228 and EN 1005. No camera, no wearables, no sensors — a posture is assessed, never a person — and the output is a documented report, ready for the company's EHS file.",
    expertLayer:
      "Built to measure what used to be estimated. Every threshold traces back to a documented ISO 11228 / EN 1005 methodology rather than a proprietary black box, and the scoring logic is versioned and documented. The data model carries no identity data by design — each measurement is tied to a workstation, never to a name, face or personnel file — with GDPR data minimisation and current EU AI Act requirements designed in from the first line of code, not retrofitted. Legal limits, terminology and the generated document all follow the country a workplace is actually in.",
    audience: "Occupational safety and health staff across the DACH region — the people who own the Evaluierung, the SGD and the labour-inspectorate file. Live in Austria, with Germany and Switzerland in preparation; currently in a technical pilot with industrial manufacturing partners.",
    highlights: [
      "Observation-based assessment: a trained assessor rates real postures in the field — no camera, no wearables, no sensors",
      "Load, force, duration and tool captured as structured context alongside each posture",
      "Joint angles scored region by region — trunk, neck, shoulders, elbows, wrists and knees",
      "Thresholds mapped to ISO 11228 and EN 1005, with scoring logic versioned and documented — no proprietary black box",
      "A posture is assessed, never a person: no identity data, each measurement tied to a workstation, not a name or face",
      "Country-aware output: legal limits, terminology and the generated EHS document follow the workplace's country",
      "GDPR data minimisation and EU AI Act alignment designed in from day one, not retrofitted",
      "Interface in English, German and Romanian",
      "On the roadmap: human–robot shared-workspace assessment, in technical pilot under separate functional-safety review",
    ],
  },
  {
    slug: "studiu-bac",
    name: "Studiu BAC",
    tagline: "Bacalaureat preparation",
    category: "Education",
    status: "in-development",
    year: "2026",
    accent: "var(--studiu-blue)",
    accentInk: "#0A1F2E",
    background: "linear-gradient(135deg, #D6E3EE 0%, #A8C5D9 100%)",
    description:
      "The same study-companion engine, scaled to the Bacalaureat. Multi-subject curriculum, two-gate progression, exam-day countdown. In active development.",
    expertLayer: "Coming soon.",
    audience: "Romanian high-school students preparing for the Bacalaureat.",
    highlights: [
      "Romanian, Mathematics, and chosen specialty subject",
      "Earned-progress system with proof gating",
      "Mock-exam mode with timed conditions",
      "Targeted release: spring 2027",
    ],
  },
  {
    slug: "sales-trainer",
    name: "Sales Trainer",
    tagline: "Practice, not theory",
    category: "Sales & Training",
    status: "in-development",
    year: "2027",
    accent: "var(--salestraining)",
    accentInk: "#0F1F1A",
    background: "linear-gradient(135deg, #D6E0DA 0%, #A8B8B0 100%)",
    description:
      "AI-powered sales role-play. Stand in front of a difficult prospect and rehearse — with feedback grounded in 20 years of sales-training methodology, not LinkedIn quotes.",
    expertLayer: "Coming soon.",
    audience: "Sales professionals, founders, and anyone who has to close.",
    highlights: [
      "Realistic prospect role-play with adaptive personas",
      "Feedback grounded in proven methodology",
      "Scenario library: cold outreach, objection handling, negotiation, closing",
      "B2B tier for sales teams",
    ],
  },
  {
    slug: "vivo",
    name: "Vivo",
    tagline: "AI-guided homeopathic consultation",
    category: "Health & Wellness",
    status: "live",
    year: "2026",
    url: "https://vivo.verumsell.com",
    accent: "var(--vivo)",
    accentInk: "#1F3A1A",
    background: "linear-gradient(135deg, #E8EDD9 0%, #DDD3B8 100%)",
    description:
      "A 35-question constitutional intake interview that produces a personalised remedy protocol grounded in vetted materia medica. Not a chatbot — a structured clinical workflow with the rigour homeopathy actually demands.",
    expertLayer:
      "Built on a curated knowledge base of approved materia medica sources. The AI never invents — it works strictly within sources that have been vetted at the database level.",
    audience: "Practitioners, students of homeopathy, and individuals seeking a thoughtful first-line consultation.",
    highlights: [
      "35-question constitutional intake mapped to classical homeopathic frameworks",
      "Personalised remedy + potency + dosing protocol with full rationale",
      "Source-bounded AI: no fabrication outside vetted materia medica",
      "Lifestyle considerations and clinical cautions included",
    ],
  },
  {
    slug: "custos",
    name: "Custos",
    tagline: "Runtime control for AI agents",
    category: "AI Governance",
    status: "in-development",
    year: "2026",
    logo: "/brand/custos-mark.svg",
    accent: "var(--custos-rust)",
    accentInk: "#16181D",
    background: "linear-gradient(135deg, #F4F1EA 0%, #E6D3C4 100%)",
    description:
      "Custos sits between a company's AI agents and the tools they use. Every call is identified, checked against policy, recorded in a tamper-evident log, and then allowed, blocked or held for a human — before it happens, not after.",
    expertLayer:
      "Built as infrastructure, not a chatbot: a single Rust gateway that runs inside the customer's network, default-deny Cedar policies, hash-chained audit records with keyed hashing of arguments for GDPR, and fail-closed behaviour on every error path. The gateway is open source; Custos Control adds agent management, human approvals and evidence exports for the EU AI Act, NIS2 and GDPR.",
    audience:
      "European companies running AI agents in production — security, IT and compliance teams in the DACH region and Romania.",
    highlights: [
      "Own identity and short-lived token for every agent, with a named owner",
      "Default-deny policies in Cedar, versioned and checked before they go live",
      "Detects IBANs, card numbers, CNP, Steuer-ID, secrets and bulk exports in each call",
      "Risky actions wait for a named person to approve them",
      "Hash-chained audit log that proves it was not edited",
      "Self-hosted in the customer's network; open-source gateway, Apache 2.0",
    ],
  },
];

export const CATEGORIES = [
  "Occupational Health",
  "AI Governance",
  "Education",
  "Health & Wellness",
  "Sales & Training",
] as const;

export function bySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function byCategory(cat: string): Product[] {
  return PRODUCTS.filter((p) => p.category === cat);
}

export function bySubBrand(brand: "Buzomed"): Product[] {
  return PRODUCTS.filter((p) => p.subBrand === brand);
}
