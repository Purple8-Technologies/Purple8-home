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

- **Separate Fly app:** `purple8-graph-sandbox` (`fly.sandbox.toml`, own
  volume `p8g_sandbox_data`). Production `purple8-graph` (AI Architect and
  paying tenants) runs with sandbox mode off, so sandbox data never touches it.
- **Shared multi-tenant storage** (`tenancy.py`, shared mode).
- Clear disclaimer on sign-up and in the app header:
  "Sandbox — do not upload sensitive or personal data."
- Tenant data deleted at day 30 (unless they convert to paid).

## 4. Sample datasets

- One per domain (e.g. Finance, Legal, AEC, Support), user picks on first
  login so the graph is never empty.
- **Auto-cleared** the first time the user ingests their own data, or sends a
  DocIntel result. No prompt; one-line notice: "Sample removed; your data is
  now the only data in the graph."
- Samples only load into an empty graph, so sample and user data never mix
  (409 otherwise). Switching between samples is allowed while no user data
  exists. **Built:** `sandbox_samples.py`, `routers/sandbox.py`,
  `SampleDataCard.tsx`.

## 5. Send to Hyper Graph (upsell)

- Button on every DocIntel sandbox result. **Data movement only — keys never
  cross products.**
- DocIntel asks Command Center (service call) for the customer's Hyper Graph
  projects, identified by DocIntel's own key id → Customer record. Command
  Center returns endpoint + Graph key per project. No Graph project yet → one
  is issued through the normal Graph sandbox flow (capacity waitlist, key
  emailed) — no second registration.
- Several projects → the user picks one. One → no prompt.
- DocIntel commits the result with the **Graph key**; Graph validates its own
  key as usual. The app opens signed in to that project.

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
| V2 | Sandbox key auto-issued and filled into the MCP config | **Built.** `POST /mcp/clients/{client}/connect` issues an agent key (90 days, one live key per user per client, re-connect revokes the old one; API keys cannot mint) and returns the config with the key filled in, shown once. Configs now point at the hosted `<server>/mcp` (Streamable HTTP, `X-API-Key`) — nothing to `pip install`; Claude Desktop bridges via `npx mcp-remote`. "Connect your agent" card on the Dashboard and MCP Console. Tests: `tests/test_mcp_connect.py`. |
| V4 | 30-day limits (§3, §8) | **Built** behind `P8G_SANDBOX=1`: 500 queries + 50 RAG answers / tenant / UTC day (429), free-plan tenants expire at day 30 (403) and an hourly sweep hard-deletes them (shared-store purge included), disclaimer + days-left banner on every page. Counters are in-process: single-replica sandbox only. Tests: `tests/test_sandbox_policy.py`. |
| V5 | Graph sandbox key + Send to Hyper Graph (§5) | **Rebuilt 2026-10-08.** Command Center issues a Hyper Graph sandbox key (`aud=graph-sandbox`) through the same flow as DocIntel (`/public/sandbox/{product}`, `purple8.ai/try/graph`, per-product waitlist, admin page with product selector). Graph accepts **only** `graph-sandbox` keys (`POST /auth/sandbox/exchange`, `/sandbox/start#key=…`). Send to Hyper Graph: DocIntel → CC `POST /public/sandbox/graph/projects` → Graph key → commit (§5). Tests: CC `test_graph_sandbox_key.py`, `test_data_movement.py`; Graph `test_sandbox_identity.py`; DocIntel `test_send_to_graph.py`. |
| V3 | Hiding admin screens by role | **Fixed.** Key Management and Settings are admin-only in the nav (`Layout.tsx`) and guarded by `AdminRoute` (`App.tsx`). |

## 10. Open decisions

| # | Question | Decision |
|---|---|---|
| G1 | Sample domains to ship | **Finance, Legal, AEC, Support** |
| G2 | Limits in §8 | **Agreed (RAG: 50 answers / day on Luna)** |
