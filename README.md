# Verumsell

The studio site for Verumsell — an independent product studio building expert-driven AI applications.

## Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Plain CSS with CSS variables (no Tailwind, no CSS-in-JS runtime) 
- **Fonts:** Fraunces (display) · JetBrains Mono · Inter — loaded from Google Fonts
- **Deployment:** Vercel

## Local development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Project structure

```
app/
  layout.tsx              ← root layout, wraps everything in Nav + Footer
  page.tsx                ← home page (hero, featured work, sub-brands, about teaser)
  about/page.tsx          ← about the studio
  contact/page.tsx        ← contact page
  journal/page.tsx        ← studio journal (placeholder posts)
  work/
    page.tsx              ← full portfolio listing by category
    [slug]/page.tsx       ← dynamic product detail page
    coupleiq/page.tsx     ← CoupleIQ sub-brand page
    anima-mundi/page.tsx  ← Anima Mundi sub-brand page

components/
  Nav.tsx                 ← top nav with inline SVG wordmark
  Footer.tsx              ← footer

lib/
  products.ts             ← single source of truth for all product data

styles/
  globals.css             ← design tokens, typography, base styles

public/brand/             ← Verumsell logo assets
```

## Deploying to Vercel

### Option 1 — via Vercel dashboard (easiest)

1. Push this folder to a GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel auto-detects Next.js. Just click **Deploy**.
4. After deploy, go to **Settings → Domains** in the project and add `verumsell.com`.
5. Vercel will give you DNS records to add at your domain registrar.

### Option 2 — via Vercel CLI

```bash
npm i -g vercel
vercel
# follow prompts; when asked, link to a new project
vercel --prod
```

### DNS for verumsell.com

At your domain registrar, set:

- **A record:** `@` → `76.76.21.21`
- **CNAME record:** `www` → `cname.vercel-dns.com`

Or transfer nameservers to Vercel (simpler but less flexible).

### Sub-domains for the apps

Each Vercel project can claim its own subdomain. For example:

- `homeopathy.verumsell.com` → Vivo project
- `studiu.verumsell.com` → Studiu EN26 project
- `splitornot.verumsell.com` → SplitOrNot project (or keep splitornot.com)
- `animamundi.verumsell.com` → Anima Mundi project

In each app's Vercel project, go to **Settings → Domains** and add the subdomain. The DNS auto-resolves once `verumsell.com` is on Vercel.

## Editing content

All product data lives in `lib/products.ts`. To add a new product:

1. Add a new entry to the `PRODUCTS` array.
2. The home page, work page, sub-brand pages, and individual product page all auto-update.

To change the live URLs of each app, set the `url` field on each product.

## Notes on the design

- The aesthetic is **editorial studio** — black on warm ivory, oversized Fraunces serif, mono accents.
- The geometric horizontal bars throughout reference the Verumsell logo.
- Each product carries its own colour identity (Vivo sage, Studiu red/blue, CoupleIQ coral, Anima Mundi violet) — these come through on category and detail pages without breaking the master brand.
- Sub-brands (CoupleIQ, Anima Mundi) get their own takeover pages with full palette inversion.
