# Revamp 01 — User Journey

Status: DRAFT · Owner: Nikhil · Date: 2026-10-06

Doc 1 of the revamp series. Defines how a visitor goes from first touch to a
paying API user. Docs 02–08 build on this one (index in §6).

---

## 1. Principles

1. **Value before identity.** Visitor opens the sandbox straight away; the
   register panel appears only on first Run.
2. **One account, keys per product.** One login; each product has its own
   keys, and a key works the same over REST, MCP and A2A.
3. **Minimum touchpoints.** Try → verify email → use → add credits.
4. **Products sold separately.** DocIntel or Hyper Graph alone; Graph is the upsell.
5. **Simple model story.** Purple8 runs on GPT-6 Luna by default. Customers
   may plug in their own model. Nothing else to choose.

---

## 2. Target journey

```
Visitor (homepage: [Try DocIntel] / [Try Hyper Graph])
  │
  ▼
[1] Sandbox opens immediately
  │  first Run → register panel (name, email, terms) on the same screen
  ▼
[2] "Verify yourself" email → back in the sandbox, logged in (login never expires)
  │  $10 free credits for that product, 30 days, sandbox limits (03, 08)
  ▼
[3] Free credits used / day 30 / limit hit → "Add credits" (08)
  │  pay as you go, monthly prepay (10% off) or annual prepay (20% off)
  ▼
[4] Console on purple8.ai: balance, forecast, usage, keys, connect your agent (05)
  │
  ▼  (upsell) "Send to Hyper Graph" — greyed out "Coming soon" until Graph release
[5] Hyper Graph enabled on the same account, with its own $10 free credits
```

Self-host / Enterprise: separate "Talk to us" path from Pricing. Not part of
the self-serve funnel.

---

## 3. Current state (as found in code)

| Path | Pages | Ends in |
|---|---|---|
| Try DocIntel | `/try/docintel` → email → `purple8-docintel.fly.dev/try` | Sandbox on another domain, dead end |
| Free Developer | `/register` → email magic link → `/activate` | Self-host licence JWT + `docker run` |
| Paid | `/checkout/create-session` → Stripe → `/checkout/success` | Self-host licence JWT |
| Legacy | `/beta`, `/download` | Redirect to `/register` |

Problems: three identity systems, email gate on every path, sandbox off-site,
no Cloud endpoint anywhere, "free Developer" conflicts with no-free-tier.

---

## 4. Strip / Change / Add

### Strip
| Item | Location | Reason |
|---|---|---|
| Free Developer registration | `Purple8-home/src/app/register/` | No free tier; replaced by sandbox |
| Magic-link activation | `Purple8-home/src/app/activate/` | Replaced by sign-in |
| Emailed sandbox key form | `Purple8-home/src/app/try/docintel/` | Replaced by in-sandbox register panel + verify email (03) |
| `/beta`, `/download` redirects | `Purple8-home/src/app/{beta,download}/` | Legacy |
| Off-site sandbox UI | `purple8-docintel.fly.dev/try` | Moves on-site |
| Endpoints | command-center `/public/register`, `/public/developer/{register,activate,recover}`, `/public/sandbox/docintel` | Replaced by account flow |

### Change
| Item | From → To |
|---|---|
| Checkout | Issues self-host licence → buys credits (pay as you go / monthly / annual) for the Cloud account |
| `/checkout/success` | Polls licence → returns to the Console with the new balance |
| Licences | Default output → Enterprise/self-host only |
| Primary CTA | "Register / Download" → "Try DocIntel" + "Try Hyper Graph" |

### Add
| Item | Purpose |
|---|---|
| Sandbox page per product (DocIntel on-site; Graph = existing app) | Step 1 |
| Register panel + "Verify yourself" email + session | Step 2 |
| Console on purple8.ai (balance, forecast, usage, keys, connect your agent) | Step 4 |
| "Send to Hyper Graph" upsell | Step 5 |
| Bring-your-own-model setting in Console | Optional override of GPT-6 Luna |

---

## 5. Decisions

| # | Question | Decision |
|---|---|---|
| D1 | Existing free Developer licence holders — honour or migrate? | **Honour (licences unchanged).** Invited to the sandbox at launch (see 05, D1). |
| D2 | Sign-in method | **Email verify link** (03). Social sign-in (GitHub / Google): not at launch. |
| D3 | Sandbox limits | **Decided in 03 (S2) and 08:** $10 free credits per product, 30 days, 50 files, 2 MB per file. |

---

## 6. Revamp doc index

| Doc | Topic | Status |
|---|---|---|
| 01 | User journey (this doc) | Decided |
| 02 | User experience: homepage, theme, comet logo | Decided; preview built locally |
| 03 | DocIntel sandbox: register panel, verify email, limits | Decided |
| 04 | Hyper Graph sandbox: existing app, connect your agent, samples | Decided; tenancy + admin fixes done |
| 05 | Accounts, keys, billing (command-center, console, hybrid processing) | Decided |
| 06 | API / MCP / A2A surface + test harness | Decided |
| 07 | SaaS infrastructure (Fly, cost controls, metering) | 3 open (F1–F3) |
| 08 | Pricing: actual cost × 10, billing agent, prepay options | Decided |
