# Purple8 — Multi-Agent Demo (Shot List + Script)

**Runtime:** 2:15 full cut · 45s social cut
**Thesis:** *The AI agents are the developers. The graph is the shared brain. No orchestration framework, no separate DB/vector/workflow services — one container.*
**Recorded against:** `ghcr.io/purple8-technologies/purple8-graph:developer` (local `p8g:localtest` is identical)

---

## The Use Case — "Autonomous Deal Desk"

A B2B SaaS company receives an inbound enterprise deal. **Four specialized Claude agents** run a full back-office workflow by pointing at ONE Purple8 MCP endpoint. None of them shares code or a message bus — **they coordinate by reading and writing the same Purple8 graph.**

| Agent | Role | Purple8 MCP tools it calls |
|---|---|---|
| **Intake Agent** | Ingests the RFP, MSA, and security questionnaire | `data.ingest_file`, `graph.add_node` |
| **Analyst Agent** | Builds the knowledge graph, answers deal questions via RAG | `rag.hybrid_query`, `graph.traverse`, `graph.pagerank` |
| **Risk Agent** | Cross-checks security answers vs. policy, flags gaps | `rag.graph_query`, `graph.add_edge` (RISK_FLAGGED) |
| **Orchestrator Agent** | Runs the approval Journey with SLA + human gate | `journey.define`, `journey.start`, `journey.advance`, `journey.sla_alerts`, `journey.resolve_hitl` |

**Why it wows:** The Risk Agent reads a `RISK_FLAGGED` edge the moment the Analyst writes it — no callback, no queue, no LangGraph state object. The graph *is* the coordination layer. That is the demo's single most important 8 seconds.

---

## SHOT LIST

### SEG 0 — Cold open (0:00–0:12)
| Time | Screen | On-screen text | VO |
|---|---|---|---|
| 0:00 | Black. One line types in a terminal: `docker run -p 8100:8100 …:developer` | — | "This is the entire backend for an AI application." |
| 0:06 | Boot logs scroll; freeze on `mcp_sse_transport_mounted` + `license_ok` | `1 container. 0 external services.` | "No Postgres. No Pinecone. No LangGraph. No Airflow. One container." |

> **Shot tip:** Use the real boot log we verified — `mcp_sse_transport_mounted endpoints=['/mcp/sse', …]` is the proof frame. Don't fake it.

### SEG 1 — Four agents connect (0:12–0:30)
| Time | Screen | On-screen text | VO |
|---|---|---|---|
| 0:12 | 2×2 grid, four Claude Desktop windows, each labeled (Intake / Analyst / Risk / Orchestrator) | `4 agents · 1 MCP endpoint` | "Four AI agents. Each points at the same Purple8 MCP server." |
| 0:22 | Zoom one window's MCP config: `url: http://localhost:8100/mcp/sse` | — | "No SDK. No glue code. They just call tools." |

### SEG 2 — Intake ingests (0:30–0:50)
| Time | Screen | On-screen text | VO |
|---|---|---|---|
| 0:30 | Intake Agent prompt: *"Ingest RFP.pdf, MSA.pdf, Security-Questionnaire.xlsx and build the deal graph."* | — | "The Intake agent drops three documents in…" |
| 0:38 | Tool-call stream fires: `data.ingest_file ×3` → `graph.add_node` | Highlight each tool call | "…and Purple8 turns them into a knowledge graph. Entities, relationships, embeddings — automatically." |

> **Shot tip:** The **tool-call stream is the star of the whole video.** Slow it to ~1.3× real time so viewers read the tool names. This is the "agent is the developer" proof.

### SEG 3 — The coordination moment (0:50–1:20) ★ money shot
| Time | Screen | On-screen text | VO |
|---|---|---|---|
| 0:50 | Analyst Agent: *"Which security controls does the customer require?"* → `rag.hybrid_query` returns grounded answer w/ citations | `Grounded in the graph` | "The Analyst queries the graph and gets an answer grounded in the actual documents." |
| 1:02 | Analyst writes `graph.add_edge REQUIRES_CONTROL`; **cut to Risk Agent window** which, unprompted, reacts: `graph.poll_changes` → sees the new edge → `rag.graph_query` | `No queue. No callback.` | "The moment the Analyst writes to the graph, the Risk agent sees it — because they share the same brain." |
| 1:12 | Risk Agent writes `graph.add_edge RISK_FLAGGED` on a missing SOC-2 control | Red pulse on the flagged node | "It cross-checks every control against policy and flags the gap. No message bus. The graph *is* the message bus." |

### SEG 4 — Orchestrator runs the Journey (1:20–1:50)
| Time | Screen | On-screen text | VO |
|---|---|---|---|
| 1:20 | Orchestrator: *"Start the deal-approval journey, 24h SLA, human sign-off on any RISK_FLAGGED item."* → `journey.define` + `journey.start` | `SLA + Human-in-the-loop` | "The Orchestrator spins up an approval workflow — SLA timers, human gates — in one sentence." |
| 1:34 | `journey.sla_alerts` shows the clock; a HITL task appears | `journey.resolve_hitl` | "The flagged control blocks the deal until a human approves. Every step is on the clock." |

### SEG 5 — The reveal (1:50–2:15)
| Time | Screen | On-screen text | VO |
|---|---|---|---|
| 1:50 | Flip to LCNC console `/lcnc` — same data: graph view, Journey SLA timer, immutable audit trail | `You wrote zero backend code.` | "Everything those agents built is right here. The graph. The workflow. A full audit trail of every agent action." |
| 2:04 | Pull back to the single terminal from SEG 0 | `1 container replaced 8 services.` | "Postgres, Pinecone, Neo4j, LangGraph, Airflow, an audit service — one container replaced all of it." |
| 2:10 | Logo + CTA | `Point your agent at it → sandbox.purple8.ai` | "Point your own agent at it. Link's below." |

---

## 45-SECOND SOCIAL CUT
Use only: SEG 0 (0:06 boot frame) → SEG 3 the coordination moment (full) → SEG 5 reveal (LCNC + "1 container replaced 8 services") → CTA. Lead with the money shot in the first 3 seconds for the scroll-stopper.

---

## PRODUCTION — how to actually make it

### 1. Screen capture
- **Tool:** Screen Studio (macOS) — auto-zoom on clicks, smooth cursor, clean 60fps. This single tool makes an amateur capture look pro. (Alt: ScreenFlow, or OBS if you'll edit in DaVinci.)
- Record each agent window separately at 1512×982, composite the 2×2 grid in the editor — sharper than recording the whole desktop.
- **Slow the tool-call streams** in post to ~1.3× real time so names are readable.

### 2. AI voiceover — recommended path
| Option | Quality | Cost | Notes |
|---|---|---|---|
| **ElevenLabs** (v3 / Turbo) | Best | ~$5–22/mo | Use a calm "documentary narrator" voice (e.g. *Adam*, *Daniel*, or a custom clone). Export per-segment WAV, drop on the timeline. **This is what I'd use.** |
| **OpenAI TTS** (`gpt-4o-mini-tts`) | Very good | pennies | `voice=onyx` or `ash`; scriptable via API for fast re-cuts. Good if you'll iterate the script a lot. |
| **PlayHT / WellSaid** | Good | $$ | More "corporate" presets. |

**Workflow that saves you re-records:** put each VO line in a separate file/segment so when you tweak wording you only regenerate one clip. Generate at 48kHz. Add a *tiny* bed of room tone so silence between lines isn't dead-flat.

**Direction for the model:** prompt the voice for *"measured, confident, technical documentary — like a Fireship video narrator but slower."* Add commas and ellipses in the script (already done above) to control pacing — TTS honors punctuation.

### 3. Music + polish
- Low, minimal synth bed (Artlist / Epidemic Sound "tech ambient"). Duck it −18dB under VO.
- One subtle "whoosh" on each scene cut; one "ding" on the `RISK_FLAGGED` red pulse. Don't overdo SFX.
- Captions burned in (SEG on-screen text) — 70% of social views are muted.

### 4. Assembly (fastest path)
1. Screen Studio → export segments.
2. ElevenLabs → per-segment VO WAVs.
3. **CapCut** (free, fast) or **DaVinci Resolve** (free, pro) → drop video + VO + captions + music, export 1080p (and a 9:16 crop for the social cut).

**Total realistic effort:** 1 day to script + record captures, half a day to VO + edit. The local image is already verified, so you can capture today.

---

## PRE-FLIGHT CHECKLIST (before you hit record)
- [ ] Seed corpus ready (RFP.pdf, MSA.pdf, Security-Questionnaire.xlsx) — reuse for the sandbox too
- [ ] Four Claude Desktop MCP configs pointing at the running container
- [ ] Journey template defined (deal-approval, 24h SLA, HITL on RISK_FLAGGED)
- [ ] `graph.poll_changes` demonstrated working between Analyst→Risk (the money shot)
- [ ] LCNC login + graph view + Journey timer render (verified working locally)
- [ ] Terminal font ≥ 18pt, light-on-dark, no personal paths visible
