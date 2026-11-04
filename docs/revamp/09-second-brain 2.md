# 09 — Purple8 Second Brain (B2C)

> Status: product + architecture proposal · October 2026
> Builds on: Purple8 Graph (engine, MCP, KMS, auth) + Purple8 DocIntel (parse → chunk → extract)

## 1. The product in one line

**Save everything. Keep it on your own devices — iPhone, Android, Windows, Mac, Linux, any browser. Chat with it using the AI you already have — Siri, Gemini, Copilot, Claude, ChatGPT, or your own agent.**

Purple8 ships no model of its own. iOS and Android now ship on-device models; desktop users already have agents. Purple8 is the memory those AIs are missing: a private, structured, searchable graph of everything the user has saved.

## 2. Why this wins

| Others | Purple8 Second Brain |
|---|---|
| Your data on their cloud (Mem, Notion AI, Rewind) | Your data on your hardware; cloud is optional and end-to-end encrypted |
| Their model, their subscription | Your model: Siri / Apple Intelligence, Gemini Nano, Claude, ChatGPT, a local model |
| Notes app with search bolted on | Graph + vectors + full text + entity extraction (people, places, projects, dates) |
| Install a desktop app (Obsidian) | Open a URL; install as a PWA; thin native shell only where the OS requires it |
| Cloud cost grows with every user's data | Cloud holds metadata only — near-zero marginal cost per user |

Positioning: **"The AI on your phone is smart. It just doesn't know you. Purple8 is what it remembers."**

## 3. Three layers

| Layer | Runs on | Responsibility |
|---|---|---|
| **Storage** | User's laptop / phone disk | Raw items in any format + local index |
| **Logic** | Browser / PWA (WebAssembly + WebGPU), thin native shell on mobile | Parse, chunk, extract, embed, index, search, answer |
| **Cloud** | Purple8 | Accounts, device registry, sync signalling, encrypted catalog, agent relay, optional encrypted backup |

## 4. Privacy tiers (user's choice, per collection)

| Tier | Where data lives | What Purple8 cloud sees |
|---|---|---|
| **This device only** | One device | Account + device ID |
| **My devices** | User's devices, synced peer-to-peer (WebRTC) | Connection signalling only |
| **Cloud save** | Devices + encrypted cloud copy (always reachable) | Ciphertext it cannot read |

Keys are derived and held on the user's devices. "We couldn't read your second brain if we wanted to" must be literally true — including titles, tags and embeddings, which reveal content and are therefore encrypted too.

## 5. Chat with your data — bring your own AI

The Second Brain is a **retrieval and memory layer**. The answering model belongs to the user.

| AI | How it connects | Notes |
|---|---|---|
| **Siri / Apple Intelligence** | iOS **App Intents** ("Ask Second Brain…", "Save this to Second Brain") + Apple's on-device **Foundation Models** framework to compose answers from retrieved context | Requires a native iOS shell — a PWA cannot register App Intents or call Foundation Models |
| **Gemini (Android)** | Android app actions / intents + on-device **Gemini Nano** (AICore / ML Kit GenAI) | Native Android shell; Nano availability is limited to recent devices |
| **Chrome built-in AI** | Desktop Chrome Prompt API (Gemini Nano in the browser) | Works in the PWA directly, no shell |
| **Claude / ChatGPT / Cursor / any agent** | **MCP** — the cloud relays `rag.*` / `memory.*` tool calls to the user's online device; only results return | Reuses Graph's MCP server and agent guard |
| **Fallback** | Small local model via WebLLM, or user-supplied API key with explicit per-request consent | For devices without an OS model |

Rule: **retrieval always runs on the device.** Only the few retrieved passages are handed to whichever model the user picked, and with the on-device OS models, nothing leaves the phone at all.

### 5.1 Every OS, one core

The future is AI models and agents on every device. Second Brain must be the memory for all of them, so the product is **one portable core + thin per-OS adapters**:

```
            ┌──────────────── Purple8 Brain Core (Rust → WebAssembly + native) ───────────────┐
            │ graph · HNSW · BM25 · DocIntel-lite · embeddings · encryption · P2P sync · MCP   │
            └──────────────────────────────────────────────────────────────────────────────────┘
   iOS / iPadOS     Android        Windows          macOS           Linux / ChromeOS    Web (any browser)
   App Intents      App Actions    Windows AI APIs  App Intents     MCP / local model   PWA + Chrome
   Foundation       Gemini Nano    (Phi Silica),    Apple           (Ollama, WebLLM)    built-in AI
   Models → Siri    → Gemini       Copilot actions  Intelligence
```

| OS | OS assistant / model | Integration surface | Shell |
|---|---|---|---|
| **iOS / iPadOS** | Siri, Apple Intelligence (Foundation Models) | App Intents, Share extension, Spotlight | Thin native (Swift) hosting the core |
| **Android** | Gemini, Gemini Nano (AICore) | App Actions / intents, share target, widgets | Thin native (Kotlin) hosting the core |
| **Windows** | Copilot, Windows AI APIs (Phi Silica on Copilot+ PCs) | App Actions on Windows, share target, MCP for local agents | PWA (installable from Edge / Store) + small native bridge where an API needs it |
| **macOS** | Apple Intelligence, Siri | App Intents, Shortcuts, Spotlight | Same Swift shell as iOS (Catalyst / SwiftUI) |
| **Linux / ChromeOS** | Local models (Ollama, WebLLM), Chrome built-in AI | MCP, PWA | PWA only |
| **Any browser** | Chrome built-in AI or local WebLLM | Web | PWA only |
| **Agents anywhere** | Claude, ChatGPT, Copilot, Cursor, custom | **MCP** (and A2A) via the Purple8 relay or a local endpoint | — |

Design rules:
1. **One core, compiled twice**: `wasm32` for browsers/PWA, native (`aarch64`/`x86_64`) for mobile and desktop shells via UniFFI. Same storage format on every OS, so a brain moves between devices byte-for-byte.
2. **Adapters are thin**: each shell only (a) registers the OS's assistant hooks, (b) calls the OS model with retrieved context, (c) grants storage. No business logic in shells.
3. **MCP is the universal agent port**: any agent on any OS reaches the brain through the same tool surface (`brain.search`, `brain.save`, `brain.ask_context`), locally or via the cloud relay.
4. **Model-agnostic by contract**: the core returns ranked, cited passages; it never assumes a model. New OS models plug in as adapters without touching the core.
5. **Graceful fallback**: no OS model → Chrome built-in AI → WebLLM local model → user's API key with explicit consent.

### 5.2 The Digital Self

The end state of a second brain is a **digital self**: a structured, owned model of who a person is, which any agent the user authorises can understand.

**What it holds** (all as graph nodes and edges, extracted by DocIntel from what the user saves):

| Facet | Examples | Source |
|---|---|---|
| **Identity** | Born in, nationalities, languages, family (with consent) | Passport scan, user entry |
| **Life timeline** | Homes, schools, jobs, countries visited, major events | Documents, photos' EXIF/location, calendar, tickets |
| **Credentials** | Degrees, certifications, licences, awards | Certificates (PDF/image), **W3C Verifiable Credentials** / Open Badges where issued |
| **Knowledge & skills** | What they've studied, built, written | Notes, documents, code, articles |
| **Memories** | Trips, people met, conversations, photos | Journals, photos, messages the user saves |
| **How they think** | Values, preferences, opinions, decision patterns, writing style | Journals, notes, past decisions, user's own reflections |
| **Preferences** | Food, travel, work style, accessibility needs | Explicit + inferred (always shown and editable) |

**What it enables**
- *"Book me a trip"* — the agent already knows passport nationality, visa history, seat preference, dietary needs.
- *"Apply for this job"* — the agent assembles verified certifications and a CV in the user's own voice.
- *"What would I think about this?"* — the agent reasons from the user's documented values and past decisions.
- *Legacy* — an optional, user-controlled record for family.

**Disclosure model — the core of the design.** Agents never get "the self"; they get **scoped views**:
1. **Profiles / personas**: *Travel*, *Professional*, *Health*, *Family*, *Private*. Each is a subgraph with its own policy.
2. **Per-agent grants**: which persona, which facets, read-only, for how long — granted by the person, revocable, logged (GOV-1 audit chain).
3. **Selective disclosure**: prove a fact without revealing the document ("holds a valid PMP", "over 18", "EU citizen") using verifiable-credential presentations.
4. **Answer, don't export**: by default agents ask questions and get answers; bulk export of the graph requires explicit human confirmation (the human-intent action guard).
5. **Inferences are visible**: anything the system *infers* ("prefers aisle seats", "values autonomy") is labelled as inferred, shown to the user, and editable or deletable.

**Risks that must be designed in, not bolted on**
- **Identity theft**: a digital self is the most valuable target a person owns. Device-only by default; cloud save only end-to-end encrypted; high-risk grants require device biometrics.
- **Special-category data** (health, religion, politics, sexuality, biometrics — GDPR Art. 9): never inferred automatically; only stored when the user adds it, and excluded from every persona unless explicitly included.
- **Impersonation**: an agent "speaking as" the user must disclose that it is an agent; no voice/likeness cloning in scope.
- **Other people's data**: memories contain family and friends. Store them as references the user controls, never shared outward without their own consent mechanism.
- **Death and incapacity**: a user-defined legacy contact and an explicit delete-on-death option.
- **Accuracy**: credentials from issuers are verified; self-reported ones are marked self-reported. Agents must see the difference.

Positioning: **"Your digital self, owned by you. Agents get to know you — only as much as you allow."**

### 5.3 Legacy

A digital self can outlive its owner. What a person documents — their story, their reasoning, their values, the advice they'd give — can be passed on deliberately, on their terms.

**What a legacy can be**
- **An archive**: memories, photos, letters, the life timeline, the places they lived and visited — curated by them, for specific people.
- **A voice-of-record**: family can *ask* the legacy ("What did Dad think about choosing a career?", "Where was Grandma born and why did she leave?") and get answers **quoted and cited from what the person actually wrote or recorded**.
- **Messages for later**: notes released on a date or event ("for your 18th birthday", "when you get married").
- **Practical handover**: where documents are, what accounts exist, wishes — without exposing passwords (those stay with dedicated password-manager legacy features).

**The Family Vault** — what families actually need on the worst day of their lives, in one place:

| Section | Contents | Released to |
|---|---|---|
| **Words for loved ones** | Advice, thoughts, life lessons, letters to each child/partner/friend, recorded voice or video messages | Each named person, privately |
| **Legal** | Copy of the will, power of attorney, advance directive / living will, guardianship wishes for children | Executor; family as the owner chooses |
| **Financial** | Insurance policies (life, home, health), pensions, bank and investment account list, debts, property deeds | Executor / named beneficiaries |
| **Practical** | Where the originals are kept, lawyer and accountant contacts, subscriptions to cancel, utilities, vehicles, pets' care | Executor / household |
| **Wishes** | Funeral and burial preferences, organ donation, music, who to tell | Legacy contacts, immediately |
| **Memories** | Family history, recipes, photos with the stories behind them, the family tree, places that mattered | Family, as curated |

Notes:
- **A copy of a will is not the will.** Most jurisdictions require the signed original. The vault holds a copy for reference and records **where the original is and who the executor/lawyer is**. We never present a stored copy as legally binding.
- **Insurance and accounts**: the most common post-death problem is families not knowing a policy or account exists. A simple, current list solves it — DocIntel extracts insurer, policy number, beneficiary and renewal date from the uploaded policy automatically.
- **Keep it current**: periodic gentle prompts ("Your home insurance renewed last month — update the vault?") driven by extracted renewal dates.
- **Useful while alive too**: the same vault is the household's emergency binder — illness, hospitalisation, or a partner needing to step in.

**Design principles (non-negotiable)**
1. **The person decides, while alive.** Legacy is opt-in, per persona, per recipient. Nothing becomes a legacy by default.
2. **Answers from their words, not invented ones.** The legacy cites sources; it does not generate new opinions in the person's name. If the record doesn't contain an answer, it says so. No simulated "they would say…".
3. **No impersonation.** It is always presented as an archive of the person, never as the person. No voice or likeness cloning.
4. **Named legacy contacts + verification.** Release is triggered by legacy contacts with a waiting period and proof of death/incapacity, mirroring Apple Legacy Contact / Google Inactive Account Manager patterns.
5. **Recipients choose too.** Grief is personal; recipients can decline, pause, or close the legacy. Interaction is gentle by design (no notifications, no engagement loops).
6. **Delete is always an option.** The owner can choose "delete everything when I'm gone" instead.
7. **Others in the memories.** Content about living people is released only to recipients the owner names, and those people can request removal.

**Technical fit**: legacy = a persona + a time/event-locked grant + key escrow split among legacy contacts (threshold secret sharing, e.g. 2-of-3), so neither Purple8 nor any single contact can open it alone. Cloud-save tier is required for legacy, since devices may be lost.

Positioning: **"Leave more than photos. Leave how you thought — in your own words."**

> Note on the "no native installers" rule: that rule governs how the Purple8 *database* ships (pip / Docker). For B2C mobile, a thin App Store / Play Store shell is the price of Siri and Gemini integration. It hosts the same WebAssembly logic layer; it does not fork the product.

## 6. What carries over from Purple8 (reuse map)

**Reused as-is — cloud layer**
- Auth, accounts, 4-tier RBAC (simplified to personal), multi-tenancy (one tenant per user)
- KMS envelope encryption (wraps the cloud-save tier)
- CDC event bus → sync signalling; supergraph registry → device registry
- MCP server + human-intent action guard → agent relay
- GOV-1 hash-chained audit → "what accessed my brain" log for users

**Reused as design + code, rebuilt for the browser — logic layer**
- **Graph engine** → Rust crate compiled to `wasm32`: graph store, HNSW, BM25 full text, on OPFS / granted folder. Same data model and query API as Graph.
- **DocIntel** → text / Markdown / HTML / PDF (pdf.js) / images (OCR in WebAssembly); in-house `text_splitter` ports directly; GLiNER entities via ONNX Runtime Web; DocIntel ontologies reused verbatim. Heavy formats (CAD, BIM, complex Office) go to cloud DocIntel **only** for users who opt in.
- **Embeddings** → 384-dim model on WebGPU (same dimension class as Graph's defaults).
- **RAG** → `hybrid_rag` / `graph_rag` fusion logic reimplemented over the WebAssembly engine.

**New**
- PWA shell + storage access (visible folder on desktop Chromium; OPFS elsewhere; `navigator.storage.persist()`)
- Peer-to-peer sync with conflict resolution (version vectors / CRDT per item)
- Client-side encryption for cloud save; key backup / recovery UX
- iOS and Android thin shells (App Intents, Foundation Models, Gemini Nano bridges)

## 7. Platform realities to design around

- **Storage access**: real folders only on desktop Chromium. Safari / Firefox / mobile use app-private OPFS on the device disk.
- **Eviction**: non-installed sites on iOS may be cleared after ~7 days unused — install as PWA / native shell and request persistent storage.
- **Background work**: browsers suspend inactive tabs; indexing and peer sync run while the app is open (native shells get limited background time).
- **Availability**: device-only data is unreachable when that device is off. Agents via MCP need one online device or cloud save.
- **OS model coverage**: Apple Intelligence and Gemini Nano run on recent hardware only — the fallback path is mandatory, not optional.

## 8. Phased plan

| Phase | Deliverable | Exit criteria |
|---|---|---|
| **0 — Engine spike** | Rust core: graph + HNSW + BM25; builds for `wasm32` (OPFS) **and** native via UniFFI; WebGPU / native embeddings | 10k notes/PDFs indexed on a laptop, an iPhone and an Android phone; same file format on all three; measure ingest time, search p95, memory |
| **1 — PWA MVP** | Capture (paste, upload, share target, web clipper), search, chat via Chrome built-in AI / local fallback; device-only tier | Daily-usable on Windows, macOS, Linux, ChromeOS; nothing leaves the device |
| **2 — My devices** | Peer-to-peer sync + conflict handling; device registry | Laptop ↔ phone sync, cloud sees signalling only |
| **3 — Bring your own AI** | iOS/macOS shell (App Intents + Foundation Models → Siri), Android shell (Gemini Nano), Windows bridge (Windows AI APIs / Copilot actions), MCP relay for Claude / ChatGPT / any agent | "Hey Siri / Hey Google / Copilot, what did the plumber quote me?" answered on-device |
| **4 — Cloud save** | Client-side-encrypted backup; recovery keys | Lose a device, restore everything; Purple8 holds only ciphertext |
| **5 — DocIntel depth** | GLiNER entities on-device, more formats, opt-in cloud parsing | Entities + relationships power "who / when / which project" questions |

## 9. Business model sketch (ties to 08-pricing-model)

- **Free**: one device, device-only tier, bring-your-own AI.
- **Plus**: all devices + peer sync + MCP relay for desktop agents.
- **Pro**: cloud save (encrypted storage, priced per GB) + opt-in cloud DocIntel for heavy formats.

Cloud cost per free user is approximately an account row and a signalling channel — the sustainability story and the unit economics are the same argument.

## 10. Open questions

1. Recovery: if a device-only user loses the device, the data is gone. Is that acceptable for the Free tier, with a prominent warning?
2. Shell order after the PWA — iOS (Siri headline), Android (reach), or Windows (Copilot+ PCs, enterprise crossover)?
3. Does the MCP relay need a "device sleeping" queue, or fail fast with a clear message?
4. Separate brand ("Second Brain by Purple8") or a consumer tier of Purple8?
5. Digital Self: which personas ship first (Travel and Professional are the clearest agent use cases), and which credential issuers to integrate first (Open Badges, EU Digital Identity Wallet, university VCs)?
