# Revamp 04 — Hyper Graph Sandbox

Status: DRAFT · Owner: Nikhil · Date: 2026-10-06
Depends on: 01-user-journey.md, 03-sandbox.md

Same account, register panel, verify email, 30-day / pay-as-you-go rules as
the DocIntel sandbox (doc 03). Default model: **GPT-6 Luna**.

---

## 1. Principle

**No new UI.** The sandbox is the existing Hyper Graph app
(`purple8-graph/frontend/`) on a sandbox deployment.

**The product is the MCP server.** The user connects their AI agent (Claude,
Cursor, VS Code) to Hyper Graph and builds their application by talking to it.
The agent creates the frontend and the application; Hyper Graph is the backend
it **configures** (schema, data, workflows, RAG). The app is where the user
logs in to see how that backend is configured.

The only addition to the existing app is the **"Connect your agent"** card.

---

## 2. Flow

```
Homepage [Try Hyper Graph]  or  DocIntel result [Send to Hyper Graph]
  ▼
Register panel + "Verify yourself" email (same as doc 03)
  ▼
Logged in → Hyper Graph app opens on a sample dataset
  ▼
"Connect your agent" card: one-click config for Claude / Cursor / VS Code
  ▼
User builds their app through their agent; the agent configures the
Hyper Graph backend over MCP → user logs in to the app to see that configuration
```

---

## 3. Storage

- **Shared multi-tenant storage** (`tenancy.py`, shared mode).
- Clear disclaimer on sign-up and in the app header:
  "Sandbox — do not upload sensitive or personal data."
- Tenant data deleted at day 30 (unless they convert to paid).

## 4. Sample datasets

- One per domain (e.g. Finance, Legal, AEC, Support), user picks on first
  login so the graph is never empty.
- **Auto-cleared** the first time the user ingests their own data, or sends a
  DocIntel result. One prompt: "Replace the sample with your data?"

## 5. Send to Hyper Graph (upsell)

- Button on every DocIntel sandbox result.
- Not signed up for Graph yet → Graph sandbox is enabled on the same parent
  account (no second registration), result lands in their graph, app opens.

## 6. Connecting the agent (MCP)

- "Connect your agent" card (the only new element in the existing app) shows
  a ready-to-paste config for Claude, Cursor and VS Code.
- **Keys exist but are abstracted**, same as DocIntel: the sandbox key is
  issued behind the scenes and already filled into the config the user copies.
  The user never has to generate, find or manage it.
- MCP and A2A both available in the sandbox; same 30-day limits.

## 7. Hide in sandbox

Admin and multi-tenancy screens: `SysAdmin`, tenants, `KeyManagement`,
storage settings, danger zone. Done through existing roles, not new screens.

## 8. Limits (30 days)

| Item | Limit |
|---|---|
| Graph size | Free-plan quota (10K nodes, 100K edges) |
| Queries | ~500 / day |
| RAG answers (Luna) | ~50 / day |
| Upload | CSV / JSON, 2 MB |

---

## 9. Code checks — fixed 2026-10-07

| # | Check | Status |
|---|---|---|
| V1 | Analytics in shared tenancy | **Fixed.** Link prediction, triangle counting, bridges and `profile_collection` (and therefore `rag.tune_collection`) are now tenant-scoped in `tenancy.py`, with tests in `tests/test_tenancy.py`. Still blocked in shared mode: MST, bipartite, biconnected, motifs, structural roles, fraud rings, simrank, temporal/dynamic PageRank. Any upsell is intentional, never a cover for a gap. |
| V2 | Sandbox key auto-issued and filled into the MCP config | Build item. |
| V3 | Hiding admin screens by role | **Fixed.** Key Management and Settings are admin-only in the nav (`Layout.tsx`) and guarded by `AdminRoute` (`App.tsx`). |

## 10. Open decisions

| # | Question | Decision |
|---|---|---|
| G1 | Sample domains to ship | **Finance, Legal, AEC, Support** |
| G2 | Limits in §8 | **Agreed (RAG: 50 answers / day on Luna)** |
