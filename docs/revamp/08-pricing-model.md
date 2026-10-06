# Revamp 08 — Pricing Model (actual cost × 10)

Status: DRAFT · Owner: Nikhil · Date: 2026-10-07
Depends on: 03, 04, 05, 07

---

## 1. The rule

**Customer is charged 10 × what each job actually cost us.**

```
charge (in $)  = 10 × actual cost of that job
free credits   = $10 per product  →  our max cost = $1 per product tried (CAC)
```

No price tables, no pass types, no per-format rates to maintain.

---

## 2. Billing agent (backend)

One background job in command-center. That is the whole pricing system.

```
DocIntel / Graph ──usage events──▶ Billing agent ──debit $──▶ product balance
   (per job: tokens, CPU s,          actual cost × 10           ──▶ console
    storage, model used)
```

| Step | What it does |
|---|---|
| Collect | Receives per-job usage: Luna tokens in/out, CPU seconds, storage GB-hours, own-model flag |
| Cost | Turns usage into our actual $ using current rates (Luna token price, Fly machine price, storage price) |
| Charge | Multiplies by 10, debits the product balance |
| Show | Writes the line to the customer's usage history |

- Rates live in one config the agent reads; when Luna or Fly prices change,
  only that config changes.
- Own model (BYO): the LLM cost is zero for us, so it is not charged.
- Each event has a unique ID: never charged twice (07 §5).

---

## 3. What the customer sees (like GitHub billing)

- **Balance in $** per product.
- **Usage history**: date, key, what ran (e.g. "invoice.pdf — 3 pages"), $ spent.
- Daily/monthly chart of $ spent.
- Add credits, auto top-up.

No tokens, CPU seconds or multipliers are shown, only dollars.

---

## 4. Free start

| Item | Value |
|---|---|
| Free credits | $10 **per product** on first use (DocIntel and Hyper Graph each get their own). Never pooled or shared, so the customer sees exactly what we invested in each product for them. |
| Time limit | 30 days |
| Other limits | 50 files, 2 MB per file (DocIntel); graph size + 50 RAG answers/day (Graph) |
| Ends when | Credits used, day 30, or a limit hit, whichever first |
| Unused credits | Expire at day 30 |

---

## 5. Guards

| Guard | Why |
|---|---|
| Balance hard-stops at $0 (402) | No unpaid usage |
| Daily Luna spend cap on sandbox traffic | Protects the free tier (07 §4) |
| Per-key spend caps | Customer control (05 §3) |

## 6. Not covered by the 10× (track separately)

Always-on machines (warm DocIntel, Graph sandbox, command-center) are a
fixed monthly cost. The agent reports monthly: fixed cost vs. total margin
from paid usage → break-even.

---

## 7. Prepaid credits (no subscriptions)

Everything is pay as you go. No recurring subscriptions.

| Item | Rule |
|---|---|
| Option | Discount | How it works |
|---|---|---|
| Pay as you go | 0% | Top up any amount, any time; optional auto top-up |
| Monthly prepay | **10%** | Pay upfront for a month's credit; pool for that month |
| Annual prepay | **20%** | Pay upfront for a year's credit; **one pool for the whole year**, usable at any pace |

| Item | Rule |
|---|---|
| Pool scope | **Customer chooses:** one common pool for the account, or a separate pool per product |
| Pool runs out | Customer tops up at the pay-as-you-go rate (or auto top-up) — no overage bills, no surprises |
| Unused prepay | Expires at the end of its period (month / year) |
| Margin check | 10× rule minus 20% discount = 8× our cost at worst — still safe |
| Transparency | Console always shows: balance, spend to date, and a **forecast** |

### Forecast (in the console)
- Based on the customer's recent daily spend (e.g. last 30 days).
- Shows: projected spend this month, and the date the balance is expected to
  run out.
- Alerts by email at e.g. 50% / 80% / 100% of balance, and when the forecast
  says it will run out within 7 days.

---

## 8. Decisions

| # | Question | Decision |
|---|---|---|
| P1 | $10 free credit per product or per account? | **Per product** — DocIntel $10, Hyper Graph $10 |
| P2 | Plans | **No subscriptions. Pay as you go (0%), monthly prepay (10% off), annual prepay (20% off)** |
| P3 | Annual pool: one pool or monthly buckets? | **One pool for the year** |
| P4 | Pool per product or common? | **Customer's choice** for paid credits (common pool or per product). **Free credits are never pooled:** each product's free $10 is spent only on that product, and is used before any paid credit. |

## 9. Open

| # | Question | Decision |
|---|---|---|
| P5 | Monthly prepay: auto-renew or one-off? | **Both.** Default is a one-off purchase with a reminder email near month end. Auto-renew is opt-in, clearly labelled, and can be turned off any time. |
