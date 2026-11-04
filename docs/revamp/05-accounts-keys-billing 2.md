# Revamp 05 — Accounts, Keys & Billing

Status: DRAFT · Owner: Nikhil · Date: 2026-10-07
Depends on: 01, 03, 04

---

## 1. Principle

- **One parent account, two products.** One login (verified email), with
  DocIntel and Hyper Graph each holding their own credit balance, plan and keys.
- **Command-center is the account system.** It already has users, Stripe
  checkout + webhook, licence issuing and the email service. We extend it; no
  new service.
- **No gateway hop.** Requests go straight to DocIntel / Hyper Graph. Each
  product checks the key itself and reports usage to command-center. (A proxy
  in front of both would add latency, a single point of failure and another
  machine — against the one-process principle.)

---

## 2. Account model

```
Account (email, verified_at, mfa_enabled, created_at)
 ├── pool_mode: common | per_product   (customer's choice, 08)
 ├── common_pool: balance, prepay (payg | monthly | annual), period_ends_at
 ├── Product: DocIntel
 │     status: sandbox | active | suspended
 │     free_credit ($10, never pooled), sandbox_ends_at, sandbox_files_used (≤ 50)
 │     pool (when per_product): balance, prepay, period_ends_at, auto_topup
 │     keys[]  (name, prefix, hash, spend_cap, created_at, last_used, revoked)
 └── Product: Hyper Graph
       status, free_credit ($10), sandbox_ends_at
       tenant_id  (shared-mode tenant, see 04)
       pool (when per_product)
       keys[]
```

- Graph product is enabled on first "Try Hyper Graph" or "Send to Hyper Graph".
- Stripe: one Stripe customer per account.
- Spend order per job: that product's free credit → its pool (or the common
  pool). Usage is always recorded per product.

## 3. Keys

| Item | Spec |
|---|---|
| Sandbox key | Issued per product through one Command Center flow (`/public/sandbox/{product}`), emailed, 30 days, one active key per customer per product, active in one place only. Used behind the session and pre-filled into the MCP config (04 §6). |
| Projects | One account → many projects; each project has its own independent key per product. First project gets the free credit; others are pay-as-you-go or monthly/annual packs. Customer sees all keys on their account page. |
| Data movement | Separate from keys. "Send to Hyper Graph": DocIntel asks Command Center for the customer's Graph project(s) and uses the **Graph** key (04 §5). |
| Paid keys | Unlimited per product, named by the user, shown **once** at creation. Stored as a hash only. |
| Scope | Product-specific (a DocIntel key does not work on Graph). Graph keys are bound to the account's tenant. |
| Spend cap | Optional per key; stops the key when reached. |
| Revocation | Immediate; products re-check revocation lists on a short interval. |
| MFA | Required before creating or revealing a paid key (03 §8). |

## 4. Usage & credits

- Each product records a usage event per billable action, with its actual
  resource use (Luna tokens, CPU seconds, storage).
- Events are batched to command-center; the billing agent charges
  10 × actual cost and debits the right pool (08).
- Balance at zero → product returns HTTP 402 with a link to add credits.
- Auto top-up (optional) charges the saved card when the balance falls below
  a threshold.

## 5. Console (customer view)

On purple8.ai (`/console`), per product tab:
- Balance, free credit left, forecast (run-out date), "Add credits", auto top-up
- Keys (create, name, cap, revoke)
- Usage history and chart in $ (by day, by key)
- Connect your agent (MCP / A2A config)

---

## 6. Strip / Change / Add (command-center)

| Type | Item |
|---|---|
| Keep | Developer licence flow (`/public/developer/*`) — open-ended, self-hosted only |
| Keep | Sandbox capacity waitlist (`sandbox_capacity.py`) — per product, as a cost safety valve; revisit on demand/performance data (D2) |
| Change | `/public/sandbox/docintel` → generic `/public/sandbox/{product}` (done: docintel, graph) |
| Change | Stripe checkout: subscription licence → credits / plan per product |
| Change | Licences: kept for Enterprise self-host only |
| Add | `Account` + per-product records (§2) |
| Add | Key create / list / revoke with hashing and spend caps |
| Add | Usage ingest endpoint + balance debit + 402 contract |
| Add | MFA (authenticator app / passkey) for sensitive actions |

---

## 7. Open decisions

| # | Question | Decision |
|---|---|---|
| D1 | Existing paid self-host licence holders | **Unchanged.** When the sandbox launches, every existing user (paid licence, free Developer licence, old sandbox key) gets an invite email to try it. |
| D2 | Drop the sandbox capacity waitlist, or keep it as a cost safety valve? | **Keep, per product** (2026-10-08). Decide later from demand and performance; browser-side (WebAssembly) processing reduces server load (§8). |
| D3 | Console: page on purple8.ai, or inside each product's app? | **purple8.ai** (`/console`). Static page; all data comes from command-center APIs with the session cookie. |
| D4 | Usage reporting interval and behaviour when command-center is unreachable | **Every 60 s; products keep serving and send the backlog later.** |

---

## 8. Hybrid (customer-device) processing

Use the customer's CPU wherever it does not change results, to cut our
compute cost and improve speed.

| Where | What runs on the customer's device | Status |
|---|---|---|
| DocIntel sandbox (browser) | Entity extraction (NER) in the browser | Exists: `browser_ner.py` + sandbox assets. Make it the default in the sandbox. |
| DocIntel SDK / pip | Parsing (all formats) locally; only text is sent for relationship extraction | To design |
| Hyper Graph | Embedded engine via pip for local/dev use | Exists (pip wheel) |

The LLM step (relationships, RAG answers on Luna) stays on our side.
