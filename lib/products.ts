export type Status = "live" | "beta" | "in-development";

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  category: "Health & Wellness" | "Education" | "Relationships" | "Sales & Training" | "Occupational Health" | "AI Governance";
  status: Status;
  year: string;
  url?: string;
  /** When true, cards link directly to `url` instead of an internal case page. */
  external?: boolean;
  /** Optional brand mark rendered as a watermark on feature cards. */
  logo?: string;
  subBrand?: "CoupleIQ" | "Buzomed" | "Anima Mundi";
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
    slug: "studiu-en2026",
    name: "Studiu EN26",
    tagline: "AI study companion for Evaluarea Națională",
    category: "Education",
    status: "live",
    year: "2026",
    url: "https://en26.verumsell.com",
    accent: "var(--studiu)",
    accentInk: "#3A0E07",
    background: "linear-gradient(135deg, #FCE5E1 0%, #D6E3EE 100%)",
    description:
      "A Romanian-language study tracker for 8th graders preparing for Evaluarea Națională. Generates lessons, runs Socratic tutoring, gates progress on quiz performance + proof of work.",
    expertLayer:
      "Curriculum-mapped to the official Evaluarea Națională syllabus for Romanian and Mathematics. Progress unlocks only after a quiz pass and an uploaded proof-of-work — earned, not skipped.",
    audience: "Romanian 8th-grade students and their parents preparing for the June exams.",
    highlights: [
      "Full curriculum coverage: Română and Matematică",
      "AI tutor that explains, drills, and tests",
      "Two-gate unlocking: quiz pass + work-photo verification",
      "Weekly study plan with countdown to exam day",
    ],
  },
  {
    slug: "anima-mundi",
    name: "Anima Mundi",
    tagline: "Spiritual guidance through six archetypal voices",
    category: "Health & Wellness",
    status: "beta",
    year: "2025",
    url: "https://animamundi.verumsell.com",
    subBrand: "Anima Mundi",
    accent: "var(--animamundi-glow)",
    accentInk: "#E8E2F5",
    background: "linear-gradient(135deg, #2A1F4A 0%, #15102A 100%)",
    description:
      "An AI spiritual companion that speaks through six archetypal guides — the Sage, the Mystic, the Healer, the Warrior, the Lover, and the Trickster. Reflection, not fortune-telling.",
    expertLayer:
      "Each archetype is grounded in Jungian psychology and classical wisdom traditions, with its own distinct voice, perspective, and way of questioning.",
    audience: "People seeking a reflective, symbolic space to think through life's questions.",
    highlights: [
      "Six distinct archetypal guides, each with its own voice",
      "Grounded in Jungian archetypes and wisdom traditions",
      "Conversation as reflection, not prediction",
      "Live at animamundi.verumsell.com",
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
    tagline: "Camera-based ergonomics, without the wearables",
    category: "Occupational Health",
    status: "beta",
    year: "2026",
    url: "https://staturalabs.com",
    logo: "/brand/statura_logo_on_light.png",
    accent: "var(--sld-steel)",
    accentInk: "var(--sld-slate)",
    background: "linear-gradient(135deg, #E4E8EA 0%, #C3CBCF 100%)",
    description:
      "A camera-based workplace ergonomics assessment platform for industrial and manufacturing environments. Single-camera pose analysis scores real work against ISO 11228 and EN 1005 ergonomic standards — no wearables, no employee identifiers, and video is discarded the instant it's processed.",
    expertLayer:
      "Built workstation-first, not worker-first: the data model carries no employee identifiers by design. Pose estimation runs client-side, video is never stored, and every score traces back to a documented ISO 11228 / EN 1005 methodology. Legal counsel has reviewed the approach twice on EU AI Act classification and GDPR — scheduled and continuous monitoring are treated as legally distinct products, not a toggle.",
    audience: "EU manufacturing and industrial employers, sold B2B — currently in a non-commercial field pilot at a drilling-equipment manufacturing facility.",
    highlights: [
      "Single 2D camera, client-side MediaPipe pose estimation — video discarded post-inference",
      "Workstation-centric data model: no employee identifiers stored",
      "Scoring engine mapped to ISO 11228 and EN 1005 ergonomic standards",
      "Dual assessment modes — scheduled spot-checks and continuous monitoring — treated as separate products under legal review",
      "EU AI Act classification memo and Article 9 (biometric data) legal opinion in progress",
      "Bilingual consent workflow built in from day one",
    ],
  },
  {
    slug: "splitornot",
    name: "SplitOrNot",
    tagline: "Relationship health, honestly scored",
    category: "Relationships",
    status: "live",
    year: "2026",
    url: "https://splitornot.com",
    subBrand: "CoupleIQ",
    accent: "var(--coupleiq)",
    accentInk: "#3A1208",
    background: "linear-gradient(135deg, #F5EBD8 0%, #E8C9BA 100%)",
    description:
      "A multi-dimensional relationship health analyzer. Maps communication, intimacy, alignment, and conflict patterns — then names the risks and prescribes what to actually change.",
    expertLayer:
      "Built on the Gottman Method's predictors, attachment theory, and conflict-style research. Every insight ties back to a specific answer pattern — diagnostic, not generic.",
    audience: "Couples ready to get an honest read and do the work.",
    highlights: [
      "Multi-dimensional relationship audit across 4 domains",
      "Specific risks named, not glossed over",
      "Concrete improvement vectors — what to actually change",
      "Built on 40 years of relationship science",
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
      "Same engine as Studiu EN26, scaled to the Bacalaureat. Multi-subject curriculum, two-gate progression, exam-day countdown. In active development.",
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
];

export const CATEGORIES = [
  "Health & Wellness",
  "Occupational Health",
  "AI Governance",
  "Education",
  "Relationships",
  "Sales & Training",
] as const;

export function bySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function byCategory(cat: string): Product[] {
  return PRODUCTS.filter((p) => p.category === cat);
}

export function bySubBrand(brand: "CoupleIQ" | "Buzomed" | "Anima Mundi"): Product[] {
  return PRODUCTS.filter((p) => p.subBrand === brand);
}
