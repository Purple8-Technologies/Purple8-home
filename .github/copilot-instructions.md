# Purple8.ai Landing Page — Copilot Instructions

## Project
Marketing landing page for Purple8 Inc. (purple8.ai).
Stack: Next.js 14 (App Router) · TypeScript · Tailwind CSS · shadcn/ui.

## Company
- Legal name: **Purple8 Inc.** (incorporated in Delaware, USA)
- Brand name: **Purple8**
- GitHub org: `Purple8-Technologies`
- Remote: `https://github.com/Purple8-Technologies/Purple8-home.git`

## Structure
- `src/app/` — App Router pages and layouts
- `src/components/` — Reusable UI components (Navbar, Hero, ProductCard, WaitlistForm, Footer)
- `src/lib/` — Utility functions

## Products
- **Purple8 Hyper Graph** — multi-model embedded graph + vector database
- **Purple8 DocIntel** — document intelligence microservice (format count: see `src/lib/facts.ts`)
- More products coming soon

## Canonical Facts (website)

Product numbers (tool counts, formats, languages, benchmarks, versions) are never typed into code, docs or copy. The single reference is the **Canonical Facts** table in `purple8-graph/.github/copilot-instructions.md`; the website reads them from `Purple8-home/src/lib/facts.ts`. When a number changes, update both in the same change. Public copy uses the rounded figure (e.g. "110+ tools", "70+ formats").

All figures on the site import `FACTS` from `src/lib/facts.ts`. Never write a number directly into a page or component.

## Style
- Dark theme: background `#0a0a0f`, accent purple `#7c3aed` / `#a855f7`
- Font: Inter (via next/font)
- Mobile-first, responsive

## Deployment
GitHub Pages via `.github/workflows/deploy.yml` (static Next.js export to `./out`,
served at `www.purple8.ai` per `public/CNAME`). `npm run build` must pass before
every commit — the build produces the static export that Pages publishes.
