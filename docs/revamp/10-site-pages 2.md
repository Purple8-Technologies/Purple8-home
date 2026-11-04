# Revamp 10 — Site Pages (beyond the homepage)

*Status: plan only. Nothing built from this doc yet. Homepage (`BrandHome.tsx`, doc 02) is out of scope and not touched.*

## 0. Decisions (2026-10-10)

| # | Decision |
|---|---|
| X1 | **Focus: DocIntel and Hyper Graph only** until both are fully live and earning. Architect, Nexus and other products: no pages, no links, no work. |
| X2 | **Self-hosted = Pro and Enterprise only.** Lower self-host tiers retired. CTA is **"Talk to us"** → email to `hello@purple8.ai`. |
| X3 | **Benchmarks page keeps competitor comparisons** (content already in docs). |
| X4 | **Pricing + Stripe are out of this doc.** Separate discussion and flow doc; §5 below is notes only, not a plan. |
| X5 | Architecture day/night: **built** (`ThemeToggle`, scoped `.p8-themed` CSS, pre-paint script). |

---

## 1. Page inventory

| Page | Route | Action |
|---|---|---|
| Homepage | `/` | **Keep as designed** (02). Not touched. |
| Product pages | `/products/{hyper-graph,docintel,…}` | **Rebuild** to the canonical template (§2) |
| Architecture | `/architecture` | **Keep content and layout.** Add day/night only (§3) |
| Benchmarks | `/benchmarks` | **Review** (§4) |
| Pricing | `/pricing` | **Rebuild** after the Stripe flow is agreed (§5) |
| Stripe integration | command-center + `/checkout` | **Plan first, then build** (§5) |
| About | `/about` | **Keep** |
| Support | `/support` | **Keep** |
| Everything else | — | Already decided in 01–09 (e.g. strip `/register`, `/activate`, `/beta`, `/download`) |

---

## 2. Product page template (canonical)

Every product page has the same four blocks, in the same order. Nothing else.

| # | Block | Rule |
|---|---|---|
| 1 | **What is it?** | One sentence. No sub-bullets. |
| 2 | **Why is it different?** | Three proofs maximum. Each proof = one line + a link to evidence (benchmark, doc, code). |
| 3 | **How do I start?** | Three paths, identical card layout on every product page: **Sandbox** · **Self-hosted** · **Purple8 Cloud** |
| 4 | **Features** | A plain, scannable feature list (grouped, no marketing copy). |

### 2.1 The three paths (same wording site-wide)

| | Sandbox | Self-hosted | Purple8 Cloud |
|---|---|---|---|
| One line | Try it now, synthetic data | Your infrastructure, your data | Managed by Purple8 |
| Cost line | $10 free credit · 30 days | Licence (Enterprise / existing holders) | Pay as you go · Coming soon |
| Button | **Try {Product}** | **Self-host** | **Join the waitlist** |
| Goes to | `/try/{product}` (03/04) | `/products/{product}#self-host` or contact | Per-product waitlist (doc 05, D2) |

### 2.2 Build approach
- One shared component, e.g. `ProductPage({ what, proofs[3], features[] })`. Paths block is fixed, not per-page, so wording can't drift.
- Product pages become data, not layouts.

### 2.3 Decisions (2026-10-10)
| # | Question | Decision |
|---|---|---|
| PP1 | Products at launch | **Hyper Graph and DocIntel only.** All other products wait until these two are live and earning. |
| PP2 | Self-hosted path | **Pro and Enterprise only; lower self-host tiers retired.** CTA = **"Talk to us"** → email to hello@purple8.ai. |
| PP3 | Three proofs per product | Open — draft from benchmarks/README, owner approves. |

---

## 3. Architecture page — day/night only

- Content and layout unchanged.
- Apply the same theme tokens as 02 §2 (white default, night `#0a0a0f`, `#7c3aed` for text on white).
- Check diagrams/SVGs and code blocks in both themes; replace hard-coded dark colours with theme variables.
- Acceptance: no hard-coded background/text colours left on the page; contrast passes in both themes.

---

## 4. Benchmarks page

- Use only figures from `purple8-graph/benchmarks/results/` with date + hardware per figure.
- Same headline numbers as the product-page proofs, so every claim links here.
- Day/night as §3.

| # | Question | Decision |
|---|---|---|
| B1 | Competitor comparisons | **Keep** (already documented). |

---

## 5. Pricing + Stripe — process first

> **2026-10-10: Pricing and Stripe move to a separate discussion and doc. The notes below are input only; nothing here is decided.**

### 5.1 Today (found in code)
- command-center Stripe webhook handles **subscription** events: `checkout.session.completed`, `customer.subscription.updated/deleted`, `invoice.paid`, `invoice.payment_failed`.
- Checkout issues a **self-host licence** (`/checkout/create-session`, `/checkout/success` polls for licence).

### 5.2 Target (from 01, 05, 08)
- No subscriptions. **Prepaid credits** in $: pay as you go (0%), monthly prepay (10% off), annual prepay (20% off).
- $10 free credit per product, used first, never pooled.
- Paid credits: customer chooses common pool or per-product pool.
- Billing agent debits 10 × actual cost from usage events.
- Balance zero → HTTP 402 + link to add credits. Optional auto top-up.
- Console at `purple8.ai/console`.
- Existing licence holders unchanged.

### 5.3 Flows to agree before building

| # | Flow | Steps (proposal) |
|---|---|---|
| F1 | **Buy credits** | Console → choose amount + plan (PAYG / monthly / annual) + pool → Stripe Checkout (`mode=payment`) → webhook `checkout.session.completed` → credit ledger entry → Console shows new balance |
| F2 | **Auto top-up** | Opt-in in Console → save card (Checkout `mode=setup`) → balance < threshold → off-session PaymentIntent → webhook `payment_intent.succeeded` → ledger credit; failure → email + no retry loop |
| F3 | **Monthly prepay renewal** | Default one-off + reminder email near month end. Opt-in auto-renew uses F2's saved card. |
| F4 | **Refunds / disputes** | `charge.refunded`, `charge.dispute.created` → reverse unused credit; flag account |
| F5 | **Invoices / receipts** | Stripe receipts for card; tax handling (Stripe Tax?) |
| F6 | **Licence purchases (Enterprise)** | Keep current subscription path, or move to invoiced/manual only? |

### 5.4 Principles
- **Ledger is the source of truth**, in command-center; Stripe is payment only. Every credit/debit is an idempotent ledger row keyed by Stripe event ID or usage event ID.
- Webhooks verified by signature; replay-safe.
- No price IDs hard-coded in the site — pricing page reads the catalog from command-center (`catalog.py` already exists).
- Test end-to-end in Stripe test mode with the Stripe CLI before go-live.

### 5.5 Open (must be decided before building)
| # | Question |
|---|---|
| S1 | Credit amounts offered (fixed packs e.g. $25/$100/$500, or any amount ≥ $X)? |
| S2 | Do credits expire? (Annual pool: end of year? PAYG: never / 12 months?) |
| S3 | Tax: Stripe Tax on, which jurisdictions? |
| S4 | Refund policy for unused credit. |
| S5 | F6 — what happens to the existing subscription/licence checkout? |
| S6 | Pricing page shows example costs per action (e.g. "about $0.0X per page") or only the credit model? |

### 5.6 Pricing page (built after 5.5 is closed)
- Three columns matching §2.1: Sandbox (free $10) · Cloud (credits, PAYG / monthly −10% / annual −20%) · Self-hosted / Enterprise (contact).
- One worked example of cost per action per product.
- FAQ: credits, pools, expiry, refunds, BYO model (LLM cost not charged).

---

## 6. Build order (proposal)

1. Day/night on Architecture (small, no dependencies).
2. Product page template + Hyper Graph and DocIntel pages.
3. Benchmarks review.
4. Close §5.5 → build ledger + Stripe flows in command-center (test mode) → pricing page + Console.

---

## Canonical facts rule

Every public number lives in `src/lib/facts.ts` and nowhere else. Pages import `FACTS`; no figure is typed into a page. Fast-growing counts are published rounded down with "+". Each measured figure names its source result file in `purple8-graph/benchmarks/results/`.
