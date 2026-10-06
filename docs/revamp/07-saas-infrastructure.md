# Revamp 07 — SaaS Infrastructure

Status: DRAFT · Owner: Nikhil · Date: 2026-10-07
Depends on: 03–06

Start small, one region, grow when usage shows it. No new services.

---

## 1. Current state (fly.toml)

| App | Region | Size | Always on | Storage |
|---|---|---|---|---|
| `purple8-docintel` | lhr | 2 CPU / 4 GB | 1 machine min, others stop when idle | volume `docintel_data` (job store) |
| `purple8-graph` | lhr | 2 CPU / 2 GB | yes (no auto-stop) | volume `p8g_data` |
| `purple8-command-center` | lhr | 1 CPU / 512 MB | yes | none (stores accounts in Graph) |

---

## 2. Target at launch

| App | Role | Scaling |
|---|---|---|
| **DocIntel** | Sandbox + paid API | 1 warm machine always on (GLiNER loaded, no cold start). Extra machines start on demand, stop when idle. |
| **Hyper Graph — sandbox** | Shared-tenancy sandbox (04) | **New app**, separate from the production graph. 1 machine + volume. |
| **Hyper Graph — production** | Paid customers + command-center data | Unchanged. Moves to dedicated per-customer machines only for Enterprise. |
| **Command-center** | Accounts, keys, billing, usage | Unchanged size; usage ingest added (05). |

Region: **lhr only** at launch.

---

## 3. Things that must change before scaling past one machine

| # | Issue | Why it matters | Fix |
|---|---|---|---|
| I1 | DocIntel sandbox results live **in process memory** | With 2+ machines, a user's next request can land on a machine that doesn't have their result. | Route a user's requests to the same machine (Fly sticky routing), or keep scaling at 1 until fixed. |
| I2 | DocIntel SSE stream is per-process | Same as I1 for live progress. | Same fix; polling already works across machines. |
| I3 | Graph sandbox is stateful (one volume) | Can't add machines freely. | Scale up (bigger machine) first; per-tenant limits (04 §8) keep it bounded. |
| I4 | Command-center uses the production graph for its own data | A heavy customer load could slow account/billing calls. | Acceptable at launch; watch latency. |

---

## 4. Cost controls

1. Sandbox limits (03, 04): 30 days, 50 files, 2 MB, 50 RAG answers/day.
2. Customer-device processing (05 §8): browser NER in the sandbox by default.
3. Idle DocIntel machines stop automatically; only one stays warm.
4. **Daily spend cap on our Luna key** — if hit, sandbox LLM calls pause with a
   clear message; paid traffic unaffected.
5. Per-key spend caps (05 §3).

---

## 5. Usage metering

- Each product queues usage events locally (file on its volume) and sends a
  batch to command-center every 60 s (05, D4).
- Command-center unreachable → keep queueing, send later. Never block a request.
- Each event has a unique ID so a resend is never charged twice.

---

## 6. Monitoring (existing pieces)

| Signal | Source |
|---|---|
| Health | `/health`, `/ready` on every app |
| Metrics | `/metrics` (Prometheus) on DocIntel and Graph |
| Alerts | Graph `alerting.py` (Slack / PagerDuty) |
| Launch dashboards | sign-ups, verifications, sandbox runs, conversions to paid, Luna spend/day, error rate |

---

## 7. Later (not at launch)

- Second region (US) once there is demand from there.
- Dedicated Fly machines / AWS for Enterprise (custom contracts).
- AWS / Azure / GCP marketplace listings — need metered billing (05) live first.

---

## 8. Strip / Change / Add

| Type | Item |
|---|---|
| Add | `purple8-graph-sandbox` Fly app + volume |
| Add | Daily Luna spend cap for sandbox traffic |
| Add | Local usage queue + 60 s sender in DocIntel and Graph |
| Change | DocIntel: sticky routing before running 2+ machines (I1, I2) |
| Keep | Everything else in the current fly.toml files |

---

## 9. Open decisions

| # | Question | Decision |
|---|---|---|
| F1 | Graph sandbox machine size to start (e.g. 2 CPU / 4 GB) | _tbd_ |
| F2 | Daily Luna spend cap for the sandbox | _tbd (with pricing)_ |
| F3 | Sticky routing now, or stay at one DocIntel machine for launch? | _tbd_ |
