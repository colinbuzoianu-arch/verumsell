# Custos on verumsell — brief for Claude Code

## Assets (already in the repo)
- `public/brand/custos-mark.svg` — gate mark, ink + rust. Use as `logo` in lib/products.ts.
- `public/brand/custos-mark-reversed.svg` — for dark backgrounds.
- `public/brand/custos-logo-primary.svg` / `-reversed.svg` — mark + wordmark (outlined, no font needed).
- `public/brand/custos-mark.png` (512 px), `custos-logo-primary.png` — raster fallbacks.
- `public/brand/custos-landing-hero.png` — screenshot of the Custos landing hero (2880×1540, retina).
- `design/custos/landing.html` + `landing-full.png` — the full Custos landing page design.
  Reference only, never served. It is the source of truth for copy, layout and colours.

## Brand
- Ink `#16181D`, ivory `#F4F1EA`, rust accent `#B3401A` (on dark: `#E2683C`).
- Display: Newsreader. Body: IBM Plex Sans. Code/labels: IBM Plex Mono.
- On the verumsell site keep the site's own fonts and layout system; use the Custos colours
  only inside the Custos page and card (like Buzomed/GED use their own accents).

## Entry for lib/products.ts
```ts
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
```
Add `--custos-rust: #B3401A;` (and `--custos-ink: #16181D;`) next to the other product colour
variables. No `url` yet: add `https://custos.worldlegalservice.com` when that site is live.

## Custom page: app/work/custos/
A dedicated page like `app/work/buzomed/`, rebuilt from `design/custos/landing.html`:
hero with the live-decisions panel, the three problem statements, "How it works" diagram,
six capabilities, agent passport + policy code, EU AI Act / NIS2 / GDPR, open core, and a
closing call to action. Exclude `custos` from `generateStaticParams` in `app/work/[slug]`
exactly the way `buzomed` is excluded.

Adaptations for the verumsell context:
- Drop the landing page's own top navigation and language switcher (the site has its own nav).
- Keep "← All work", category and status pill at the top, matching other work pages.
- The early-access form becomes a "Become a design partner" button linking to `/contact`
  (no new form or backend on verumsell).
- Keep the "Illustrative event stream" label. No invented statistics or customer names.
- Add `custos-landing-hero.png` as a visual where it helps (e.g. in the hero on mobile) and as
  the Open Graph image for the page if the site's OG setup allows a static image.
