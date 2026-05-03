export type Status = "live" | "beta" | "in-development";

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  category: "Health & Wellness" | "Education" | "Relationships" | "Spirituality" | "Sales & Training";
  status: Status;
  year: string;
  url?: string;
  subBrand?: "CoupleIQ" | "Anima Mundi";
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
    slug: "expiration-date",
    name: "Expiration Date",
    tagline: "Does your relationship have an end date?",
    category: "Relationships",
    status: "live",
    year: "2026",
    url: "https://getexpirationdate.com",
    subBrand: "CoupleIQ",
    accent: "var(--coupleiq)",
    accentInk: "#3A1208",
    background: "linear-gradient(135deg, #F0DCC8 0%, #D9A892 100%)",
    description:
      "A 5-minute forecast that tells you where your relationship is heading. Punchy, private, and built on the same science therapists use — not vibes.",
    expertLayer:
      "Question set designed against the Gottman Method's predictors, attachment theory, and conflict-pattern research. The AI synthesises a forecast, not a horoscope.",
    audience: "Couples who feel something is off and want a clear, private read on what.",
    highlights: [
      "5-minute, 15-question diagnostic",
      "Relationship forecast with risk vectors",
      "Built on Gottman + attachment + conflict-style frameworks",
      "Private — no answers stored",
    ],
  },
  {
    slug: "anima-mundi",
    name: "Anima Mundi",
    tagline: "AI-powered spiritual guidance",
    category: "Spirituality",
    status: "beta",
    year: "2026",
    url: "https://project-qdb1y.vercel.app",
    subBrand: "Anima Mundi",
    accent: "var(--animamundi)",
    accentInk: "#E8D8A8",
    background: "linear-gradient(135deg, #2A1F4A 0%, #4A3A6E 100%)",
    description:
      "Six archetypal guides. Voice in, voice out. A different kind of conversation about meaning, direction, and the questions that don't have search-engine answers.",
    expertLayer:
      "Six distinct archetypal personas — each a different lens on the same question. Voice I/O for a conversation that feels less like a chatbot and more like consultation.",
    audience: "Anyone navigating questions of meaning, transition, or inner direction.",
    highlights: [
      "Six archetypal avatar personas",
      "Voice input and voice output (full conversation, not text)",
      "Live at a Vercel deployment with serverless API",
      "GA4 analytics, custom domain options",
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
];

export const CATEGORIES = [
  "Health & Wellness",
  "Education",
  "Relationships",
  "Spirituality",
  "Sales & Training",
] as const;

export function bySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function byCategory(cat: string): Product[] {
  return PRODUCTS.filter((p) => p.category === cat);
}

export function bySubBrand(brand: "CoupleIQ" | "Anima Mundi"): Product[] {
  return PRODUCTS.filter((p) => p.subBrand === brand);
}
