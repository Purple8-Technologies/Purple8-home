# Revamp 06 — API, MCP & A2A Surface + Test Harness

Status: DRAFT · Owner: Nikhil · Date: 2026-10-07
Depends on: 05-accounts-keys-billing.md

Every product is reachable three ways with the **same key** (05 §3):
REST for applications, MCP for AI agents, A2A for other agents.

---

## 1. Current state (as found in code)

| | REST | MCP | A2A |
|---|---|---|---|
| **DocIntel** | ✅ `/process`, `/process/url`, `/jobs/*`, connectors | ❌ none | ❌ none |
| **Hyper Graph** | ✅ full API | ✅ `/mcp` (streamable HTTP) + `/mcp/sse`, 98 tools | ✅ `/.well-known/agent-card.json`, `/a2a`, `/a2a/tasks` |

**The gap is DocIntel MCP + A2A.** Graph is already complete.

---

## 2. DocIntel — what to add

Small surface. Wraps the existing REST endpoints in-process (no new service).

### MCP tools (`docintel.*`)
| Tool | Maps to | Purpose |
|---|---|---|
| `docintel.process_file` | `POST /process` | Extract from an uploaded file (base64) |
| `docintel.process_url` | `POST /process/url` | Extract from a URL (SSRF guard applies) |
| `docintel.job_status` | `GET /jobs/{id}` | Status + result |
| `docintel.list_jobs` | `GET /jobs` | Recent jobs |
| `docintel.formats` | `GET /formats` | Supported formats |
| `docintel.send_to_graph` | emit to Graph | Push a result into the caller's Hyper Graph (needs Graph enabled on the account) |

Endpoint: `POST /mcp` (streamable HTTP), same transport as Graph.

### A2A
- `GET /.well-known/agent-card.json` — one skill: "extract entities and
  relationships from a document".
- `POST /a2a` — task in (file/URL), task out (result), polling via
  `/a2a/tasks/{id}`. Mirrors Graph's router so both behave identically.

---

## 3. Shared contract (both products)

| Item | Rule |
|---|---|
| Auth | `Authorization: Bearer <key>` on REST, MCP and A2A |
| Errors | Same shape everywhere; `402` = out of credits (with link), `401` bad key, `429` limit |
| Usage | Every billable call reports one usage event (05 §4), regardless of entry point |
| Versioning | REST under `/v1`; MCP tool names are the contract — never renamed, only added |
| Sandbox | Same endpoints; the sandbox key is scoped and limited (03, 04) |

---

## 4. Test harness (gate for each LinkedIn release)

One script per product that proves the three entry points give the **same
result** for the same input.

```
for each sample (format-matrix fixtures for DocIntel; sample datasets for Graph):
    r1 = REST call
    r2 = MCP tool call
    r3 = A2A task
    assert r1 == r2 == r3   (entities/relationships, or query results)
    assert usage events recorded = 3
    assert sandbox limits enforced (51st file → refused; expired → 402)
```

- Runs in CI (local) and against production (Fly) before each release.
- Output: a short markdown report in `benchmarks/results/`, the evidence for
  the release post.
- Client checks: a real MCP connection from Claude Desktop, Cursor and VS Code
  using the "Connect your agent" config (04 §6), verified once per release.

---

## 5. Release order

1. **DocIntel**: add MCP + A2A → harness green on prod → LinkedIn release #1.
2. **Hyper Graph**: sandbox + harness green on prod → release #2.

---

## 6. Strip / Change / Add

| Type | Item |
|---|---|
| Add | DocIntel `/mcp` with the 6 `docintel.*` tools |
| Add | DocIntel A2A card + task endpoints |
| Add | Harness scripts (DocIntel, Graph) + report output |
| Change | Both products: key check + usage event per call (05) |
| Change | DocIntel sandbox "connect your agent" snippet → DocIntel's own MCP (today it points to Graph's) |

---

## 7. Open decisions

| # | Question | Decision |
|---|---|---|
| A1 | `docintel.send_to_graph` in the first DocIntel release? | **Shown greyed out, "Coming soon"** in the sandbox and console until the Graph release. The MCP tool itself is added only when it works, so agents never call a tool that fails. |
| A2 | REST `/v1` prefix now? | **Yes.** `/v1/...` is the documented path; old paths stay as aliases. |
