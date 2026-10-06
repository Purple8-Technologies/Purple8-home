# Revamp 02 — User Experience (Homepage & Brand Shell)

Status: DRAFT · Owner: Nikhil · Date: 2026-10-06
Depends on: 01-user-journey.md

Reference feel: **Purple8 Lens** — calm, brand-first, one idea per screen.

---

## 1. Homepage — first screen (above the fold)

```
┌──────────────────────────────────────────────────────────────────────┐
│ [Purple8+ logo]   Products ▾   Developers   Pricing   Benchmarks     │
│                                            [☀/☾]   [Get API key]     │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│              ◉━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  (comet)        │
│                                                                      │
│                       P U R P L E 8   (large logo)                   │
│                                                                      │
│      Less Complexity.   Infinite Possibility.   Real Impact.         │
│                                                                      │
│      ～～～～～～～～  purple wave (ambient, background) ～～～～～～～～      │
│                                                                      │
│                 [Try DocIntel]      [Try Hyper Graph]                │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
          ↓  below the fold: lift-and-shift existing sections
```

### Elements
| Element | Spec |
|---|---|
| **Header** | Purple8+ logo top-left. Nav: Products ▾ (DocIntel, Hyper Graph), Developers, Pricing, Benchmarks. Right: day/night toggle, "Get API key". Banner strip above header: "Now launching Purple8 Cloud". |
| **Large logo** | Centre stage, the hero itself. No headline copy competing with it. |
| **Comet line** | Longer than current dynamic line. Bright comet head, tapering trail that fades. Slow, continuous travel (long loop, ~8–12 s). |
| **Tagline** | "Less Complexity. Infinite Possibility. Real Impact." — three beats, each can fade in sequentially once. |
| **Purple wave** | Soft, layered sine waves behind/under the logo, slow drift. Ambient — never louder than the logo. |
| **Two buttons** | Entry to the sandbox for each product (journey step 1). Keeps the brand screen from being a dead end. |

### Below the fold
Footer only. No product cards — the two hero buttons are the only entry
points from the homepage.

### Current homepage → Hyper Graph product page
The current homepage is effectively a Hyper Graph product page. It moves,
as-is, to `/products/hyper-graph` (lift-and-shift, nothing discarded).
The existing Graph product page (`/products/purple8`) is retired and
redirected there.

---

## 2. Theme — day / night

| | Day (default) | Night |
|---|---|---|
| Background | White `#ffffff` | `#0a0a0f` (current) |
| Accent | `#7c3aed` / `#a855f7` | same |
| Text | near-black | current |
| Wave | lighter purple, low opacity | current glow intensity |

- Toggle persists (localStorage); first visit follows OS `prefers-color-scheme`
  (fallback: day).
- No flash of wrong theme on load (set class before paint).
- "Game Throne" stays an **internal codename only** — not shown on the site.

---

## 3. My thoughts / recommendations

1. **Brand-first hero is right**, with one guardrail: the two "Try" buttons must
   be on the first screen. Without them the page is beautiful but the journey
   in doc 01 has no entry point.
2. **Day/night toggle top-right**, not top-left. Top-left is the logo's
   place by convention; putting both there crowds it. (If you meant the logo
   top-left — agreed.)
3. **Motion discipline**: comet + wave are the only animations on screen 1.
   Respect `prefers-reduced-motion` (static comet + still wave).
4. **Performance**: SVG/CSS animation only — no canvas/WebGL libraries. Hero
   must stay fast on mobile (LCP < 2.5 s). Logo is the LCP element; keep it
   inline SVG.
5. **White theme contrast**: `#a855f7` on white fails text-contrast — use
   `#7c3aed` (or darker) for text/links in day mode; lighter purple only for
   decoration.
6. **Mobile**: logo scales down, tagline stacks into three lines, comet trail
   shortens, buttons stack.

---

## 4. Strip / Change / Add

| Type | Item |
|---|---|
| Change | `Hero` component → brand hero (logo, comet, tagline, wave, 2 buttons) |
| Change | `Purple8Logo` line → longer comet with trail |
| Change | Global theme → white default + night variant |
| Change | `Navbar` → Products dropdown, toggle, "Get API key" |
| Add | Theme toggle + persistence |
| Add | "Now launching Purple8 Cloud" banner |
| Keep | All sections below the hero (lift-and-shift) |

---

## 5. Open decisions

| # | Question | Decision |
|---|---|---|
| U1 | Toggle position | **Top-right** |
| U2 | Hero buttons | **Two: "Try DocIntel", "Try Hyper Graph"** |
| U3 | Tagline | **Sequential fade-in, once** |
| U4 | Purple8+ logo | **Existing asset, unchanged** (comet applies to the hero line only) |
| U5 | Theme contrast | **Standard contrast rules per theme** |
| U6 | Current homepage | **Moves to `/products/hyper-graph`; old Graph page retired** |
