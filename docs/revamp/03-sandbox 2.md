# Revamp 03 — Sandbox Experience

Status: DRAFT · Owner: Nikhil · Date: 2026-10-06
Depends on: 01-user-journey.md, 02-user-experience.md

DocIntel sandbox first; Hyper Graph sandbox follows the same pattern.

---

## 1. Principle

**The customer never sees a key.** In the sandbox, identity is a verified
email and a login session. Keys, tokens and licences exist only behind the
scenes. API keys appear later, and only when the customer asks for API access
(doc 01, step 4).

---

## 2. Flow

```
Homepage
  │  [Try DocIntel]
  ▼
Sandbox page (/products/docintel/sandbox) — loads immediately
  │  user picks a sample or drops a file → clicks Run
  ▼
Register panel (overlay on the same screen, sandbox stays visible behind it)
  │  Name · Email · ☐ I accept the Terms        [Continue]
  ▼
Panel switches to: "Check your inbox to verify your email."
  │  (the selected file / sample is held in the browser)
  ▼
Email: "Verify yourself"  →  one button  →  link back to the sandbox
  ▼
Returns to the sandbox, already logged in
  │  the pending run starts automatically
  ▼
Result: entities, relationships, graph view
```

Returning visitors who are still logged in skip straight to the result.
Returning visitors who have logged out enter their email and get the same
"verify yourself" link.

---

## 3. Register panel

| Item | Spec |
|---|---|
| Form | Overlay on the sandbox page, not a new page or redirect |
| Fields | Name, Email, Terms checkbox. Nothing else (company is dropped) |
| After submit | Same panel: "Check your inbox", resend link, change-email link |
| Close | Allowed; the sandbox stays browsable, but Run asks for the panel again |
| Theme | Follows day/night |

## 4. Email

- Subject: **Verify yourself**
- Body: one line plus one button ("Verify and continue"). No key, no
  instructions, no marketing.
- The link expires and can be used once.
- Sender: `Purple8 <hello@purple8.ai>` (to confirm).

## 5. Session

- Clicking the link verifies the email and starts a login session (secure
  cookie), then lands the user back on the sandbox they came from.
- The sandbox calls run on the session. The browser never holds a key.
- Session lifetime: never expires (free sandbox access still ends at 30 days; see §8).

---

## 6. Strip / Change / Add

| Type | Item |
|---|---|
| Strip | `/try/docintel` form page (name/email/company → emailed key) |
| Strip | Off-site sandbox at `purple8-docintel.fly.dev/try` and its "paste your key" step |
| Strip | Sandbox key email and waitlist copy |
| Change | Command-center `/public/sandbox/docintel`: issue a verify link instead of a key |
| Change | DocIntel sandbox calls: authenticated by session (via command-center), not by key |
| Add | On-site sandbox page per product, reached from the hero buttons |
| Add | Register overlay with pending-run hand-off across the email verify |
| Add | Verify endpoint that creates the session and redirects to the sandbox |
| Add | "Verify yourself" email template |

---

## 7. Open decisions

| # | Question | Decision |
|---|---|---|
| S1 | When does the register panel appear? | **On first Run only** |
| S2 | Sandbox limits per verified user | **50 files, 2 MB max per file, 30 days from verification** |
| S3 | Session lifetime | **Login never expires. Free sandbox access ends after 30 days** |
| S4 | One account across both sandboxes? | **Yes: one parent account, two products (APIs), billed separately** |
| S5 | Existing sandbox-key holders | **Log in by email; old keys retired** (MFA: see §8) |

---

## 8. After the 30-day sandbox: pay as you go

Model follows OpenAI / Anthropic consoles.

| Item | Spec |
|---|---|
| Trigger | $10 free credits used, day 30, or 50 files — whichever first (see 08) → sandbox shows "Add credits to continue" |
| Payment | Pay as you go, monthly prepay (10% off) or annual prepay (20% off). No subscriptions (see 08) |
| Top-up | Buy more credits any time; optional auto top-up below a threshold |
| API keys | Unlimited keys per product; keys draw from that product's free credit first, then the paid pool (common or per product, customer's choice; see 08) |
| Per-key limits | Optional spend cap per key (so a team can split the balance) |
| Usage view | Per product, per key, per day |

### Account shape
```
Parent account (one login, one email)
 ├── pool_mode    — common | per_product
 ├── common_pool  — paid credit (if common)
 ├── DocIntel     — $10 free credit, paid pool (if per_product), keys[]
 └── Hyper Graph  — $10 free credit, paid pool (if per_product), keys[]
```
Full model in 05 §2.

### Login security (MFA)
- The email verify link already proves the user owns the inbox, so it is
  enough to sign in and use the sandbox.
- Because login never expires, ask for a **second factor** (authenticator app
  or passkey) before sensitive actions: adding a card, buying credits,
  creating or revealing an API key, changing the account email.
- MFA is optional at signup, then required the first time the user does one of
  those actions.

### Open
| # | Question | Decision |
|---|---|---|
| B1 | Credits: separate per product or shared? | **Customer's choice** (common pool or per product); usage always shown per product. See 08. |
| B2 | Credit prices, top-up amounts, plan tiers | **Decided in 08**: price = actual cost × 10; PAYG, monthly prepay −10%, annual prepay −20% |
| B3 | Unused sandbox allowance at day 30 | **Expires** |
