# Purple8 — Positioning Document
**Version 1.0 · June 2026 · Internal**

---

## 1. The Problem We're Actually Solving

### What builders say they need
"I want to build an AI application."

### What they actually need — and don't know yet

Every AI application, without exception, eventually requires:

- **Persistent memory** — context that survives across sessions, users, and agents
- **Structured relationships** — not just stored data, but data that knows how it connects to other data
- **Semantic search** — finding things by meaning, not just keyword
- **Workflow orchestration** — multi-step processes with state, approvals, and failure recovery
- **Audit trail** — immutable record of every decision, especially AI decisions
- **Security** — auth, encryption at rest, role-based access, multi-tenancy
- **A way for AI agents to call all of it** — a protocol, not just an API

Nobody builds any of this on day one. They don't know they need it until they're in month 4, month 7, month 9 — and by then they've committed to a stack of 8 to 12 separate services they're now responsible for running, scaling, and keeping alive.

### The 9-month journey nobody talks about

```
Month 1   "I'll use OpenAI + SQLite. Simple."
Month 2   "I need a vector store. Added Pinecone."
Month 3   "I need persistent memory. Added Redis."
Month 4   "I need multi-step workflows. Added LangChain."
Month 5   "I need audit logs. Added Postgres."
Month 6   "I need auth. Added Auth0."
Month 7   "I need my agents to call all this. Added MCP wiring."
Month 8   "We have a compliance requirement. Everything needs encryption."
Month 9   12 services. 3 engineers on rotation.
          Still not in production.
          The actual AI problem is now buried under an infrastructure problem.
```

This is not a failure of execution. It is the **inevitable outcome of building AI applications on infrastructure that was not designed for AI applications.**

Purple8 is designed for this from day one.

---

## 2. What Purple8 Is

Purple8 is not a graph database. It is not a vector store. It is not an AI framework. It is not middleware.

**Purple8 is the persistent layer that AI agents operate on and humans govern.**

One process. One port. Everything included.

| What AI applications need | What Purple8 provides |
|---|---|
| Persistent memory across sessions | Graph + vector index, in-process |
| Relationships between entities | Native graph engine (nodes, edges, traversal) |
| Semantic and hybrid search | HNSW vector index + full-text, unified query |
| Workflow orchestration + state | Journey Engine — multi-stage, SLA, HITL |
| Audit trail | Immutable graph edges — every decision, every transition |
| Auth + access control | JWT + API-key, 4-tier RBAC, multi-tenancy |
| Encryption at rest | AES-256-GCM, envelope encryption, Local/Vault/AWS/GCP/Azure KMS |
| AI agent interface | MCP server — 31 tools, 5 namespaces, RBAC-enforced |
| Document intelligence | Purple8 DocIntel — 70+ formats, GLiNER + LLM extraction |

**What Purple8 replaces in a typical AI stack:**

Postgres · Neo4j · Pinecone · Weaviate · LangChain · LangGraph · LangSmith · Airflow · Temporal · Auth0 · Keycloak · Elasticsearch · Splunk · Unstructured.io

That is not a feature list. That is a consolidation argument.

---

## 3. The Inversion — Why This Is Hard to Explain

Every tool in the AI ecosystem is built on the same assumption:

> **AI helps humans build faster.**

Purple8 is built on the opposite assumption:

> **AI executes. Humans govern.**

This is not a subtle difference. It is a fundamental inversion of the human-machine relationship in software development.

### The old model
Human writes code → Human configures services → Human builds the backend → AI assists occasionally
*(Tools like Claude Code and Codex accelerate this — the human is still the executor, AI writes the boilerplate faster. The model has not changed, only the speed.)*

### The Purple8 model
Human defines intent → AI agent calls Purple8 MCP tools → Purple8 executes → Human governs outcomes via HITL gates, SLA alerts, LCNC console

The human role is not eliminated. It is **elevated**. From executor to governor. From writing SQL to approving decisions. From debugging integrations to setting policy.

This is not obvious to people who have spent their career as executors. It feels like a demotion before it feels like a promotion. The marketing job is to make the promotion legible before the demotion anxiety kicks in.

### The analogy that lands

When a company hires a highly capable team, the founder doesn't write every line of code. They set direction, review outcomes, approve significant decisions, and intervene when something goes wrong. The team executes.

Purple8 makes AI the team. HITL gates, Journey approvals, the LCNC console, SLA alerts — these are the **governance layer**. Not for the AI's benefit. For the human's.

---

## 4. The Architecture — Why It's Different

### Loosely coupled by design — for users, not just engineers

Purple8 is two products that work independently and integrate optionally. This is not just a technical property. It is a **commercial and adoption property**.

A buyer does not have to commit to the full stack to get value. They can start with one product, prove it in their environment, and add the other when they are ready. No forced bundling. No "you must use all of it."

| Start here | Get this value | Add this later | Get this additional value |
|---|---|---|---|
| **Graph only** | Graph, vector, RAG, journeys, MCP, auth, KMS — everything | **+ DocIntel** | 70+ format ingestion, entity extraction, chunking hints |
| **DocIntel only** | Parse any document, extract entities and relationships, emit anywhere | **+ Graph** | Persist, query, traverse, and reason over extracted knowledge |

Most AI infrastructure platforms require you to re-architect when you need a new capability. Purple8 adds capabilities by adding a port number.

```
Purple8 Hyper Graph  (:8100)
  — graph, vector, document, full-text
  — RAG pipelines, Journey Engine, auth, KMS
  — AEC vertical, SOC vertical
  — 31 MCP tools

Purple8 DocIntel  (:8200)             ← optional, add when ready
  — 70+ document formats
  — GLiNER (Pass 1: entity extraction)
  — LLM (Pass 2: relationship extraction)
  — OCR, connectors, chunking hints → Graph

Your frontend / AI agent
  — calls Graph REST API or MCP
  — DocIntel is invisible middleware
```

- Graph runs without DocIntel
- DocIntel runs without Graph
- Both run without any cloud service dependency
- MCP server is a spawned process — not a service to manage

### Bounded memory — corpus-independent RSS

The single most important architectural property no existing database shares:

**Peak RSS does not grow with corpus size.**

BrickCoreStorage's seal-and-evict cycle means the same 24 GB machine that ingests 2M documents can ingest 20M documents with identical memory behaviour. You trade time, not hardware. This is not a performance optimisation. It is a cost and sustainability argument — you don't need to re-provision infrastructure every time your knowledge base doubles.

### One process vs. twelve

The energy and cost argument is structural, not benchmarked:

| | Traditional AI stack | Purple8 |
|---|---|---|
| Services | 8–12 separate processes | 1 |
| Servers (minimum HA) | 24–36 (3× per service) | 3 |
| Network hops per RAG query | 4–8 | 0 (in-process) |
| Idle compute | All 8–12 services, 24/7 | 1 process |
| Runbooks | 8–12 | 1 |

This is not a claim about raw performance. It is a claim about **operational surface area** — and operational surface area is where AI applications die in production.

---

## 5. The Buyer Personas

### Persona 1 — The Month 1 Builder

**Who:** Solo developer or small team, starting a new AI application. Using OpenAI, maybe LangChain. Database decision not made yet or SQLite/Postgres just dropped in.

**What they think they need:** A fast way to add AI to their app.

**What they actually need:** Everything Purple8 provides — they just don't know it yet.

**Their fear:** Wasting time on the wrong choices early.

**The message that lands:**
> *"Start with what everyone else rebuilds after 9 months."*

**The trigger:** Show them the Month 9 scenario. Make it vivid. They will recognise it as their future immediately.

---

### Persona 2 — The Burned Founder / Architect

**Who:** 6–18 months into building an AI application. Has 8+ services. On-call is a burden. The actual AI problem is buried under the infrastructure problem.

**What they think they need:** To fix the mess.

**What they actually need:** To start again with the right substrate.

**Their fear:** That "starting again" means another 9 months.

**The message that lands:**
> *"Everything you needed before you knew you needed it."*

**The trigger:** The replace list. When they see Postgres + Neo4j + Pinecone + LangChain + Airflow + Auth0 + Elasticsearch on one line, and "Purple8" on the other, they feel the weight of what they're carrying.

---

### Persona 3 — The Enterprise Architect

**Who:** Evaluating AI infrastructure for a team or organisation. Responsible for compliance, security, audit. Has been burned by AI sprawl — five teams using five different stacks.

**What they think they need:** Governance over AI infrastructure.

**What they actually need:** A single substrate with built-in audit, RBAC, encryption, and multi-tenancy.

**Their fear:** AI liability — who approved this decision? What data did it use? Can we prove it?

**The message that lands:**
> *"Every decision your AI makes is an immutable edge in the graph. Forever. Auditable by anyone with a query."*

**The trigger:** The Journey Engine + immutable audit trail demo. Show a compliance officer approving a HITL decision from the LCNC console. No code. No SQL. Click approve.

---

## 6. The Category We Are Creating

We are not entering an existing category. We are creating one.

**The category name:** AI-native substrate

**What it means:** The persistent, operational foundation that AI agents run on and humans govern. Not a tool. Not middleware. Not a database. The **ground**.

**Why "substrate" and not "platform":**
- "Platform" implies you build on top of it by writing code. Purple8 is operated by AI agents calling MCP tools.
- "Substrate" implies the ground beneath everything — what gives the system memory, relationships, workflow, and auditability without you having to build any of it.

**The category definition:**
> An AI-native substrate is a system that AI agents can build, query, and operate without human intermediaries — while giving humans the governance layer (HITL, audit, SLA, RBAC) to remain in control of outcomes.

Purple8 is the first AI-native substrate.

---

## 7. What We Are Not

It is as important to be clear about what Purple8 is not as what it is.

| Purple8 is not… | Because… |
|---|---|
| An AI wrapper | The AI calls Purple8. Purple8 doesn't wrap AI. |
| A graph database | Graph is one model of four (graph + vector + document + FTS). |
| A vector store | Vector is one capability of many. |
| A LangChain replacement | LangChain orchestrates LLM calls. Purple8 is the persistent substrate LangChain chains talk to. |
| An AI agent | Purple8 is what agents operate on, not an agent itself. |
| A no-code tool | The LCNC console is governance UI. Purple8's "no-code" interface is the MCP server — AI agents call it in natural language. |
| A cloud service | Purple8 runs in your infrastructure. No data leaves unless you choose to connect an external LLM. |

---

## 8. The Offer

Each product is available independently or together. No forced bundling.

**Purple8 Hyper Graph**

| Tier | Price | Limits |
|---|---|---|
| **Developer** | Free | 50K nodes · 1 MCP agent · local only · full Journey Engine (HITL · SLA) for evaluation |
| **Starter** | $1,199/mo · $999/mo annual | 5M nodes · 3 MCP agents · production scale · agentic/late-chunking RAG · local KMS · lineage · backup |
| **Pro** | $6,999/mo · $5,832/mo annual | 50M nodes · 10 MCP agents · SSO · AEC · SOC · CDC · cloud backup |
| **Enterprise** | Custom | Unlimited · Raft HA · sharding · federation · managed KMS · dedicated support |

**Purple8 DocIntel**

| Tier | Price | Limits |
|---|---|---|
| **Beta** | Free | 500 docs/mo · 1 worker · webhook · Tesseract + P8OCR |
| **Self-Hosted** | $299/mo | Unlimited docs · All connectors · All OCR · All LLMs |
| **Enterprise** | Custom | Self-Hosted + SSO/SAML · Air-gapped · Custom connectors |

Self-hosted. One license key per product. No usage metering. No data leaving your environment. No per-seat fees. No per-document charges.

**The adoption argument:**
Start with one. Add the other when you need it. You are never locked into the full stack on day one — but the full stack is always one port number away.

**The pricing argument:**
> The 12 services Purple8 replaces cost more than $1,199/month to run, before a single engineer's time is counted. DocIntel at $299/month is the same argument for document intelligence alone.

---

## 9. The Single Sentence

If Purple8 could only say one thing to every buyer:

> *"You're about to spend 9 months building what Purple8 already is."*

---

## 10. What We Do Not Claim

Purple8's sustainability and performance properties are real but must be stated carefully:

- **Do not claim specific speedup multipliers** — the actual ratio depends on corpus structure and has not been measured at full scale. State the architectural reason, not a number.
- **Do not claim Purple8 eliminates all infrastructure concerns** — it eliminates the multi-service coordination problem. You still need to run and backup one process.
- **Do not claim AI agents can do everything without humans** — Purple8 is designed for human governance, not human elimination. The HITL gates are not optional escape hatches; they are a core feature.
- **Do not position Purple8 as a competitor to LLM providers** — Purple8 is substrate. LLMs are the cognitive layer that runs on it.

---

*This document is the source of truth for all Purple8 marketing copy, landing page messaging, conference talks, and investor materials. All external copy should be derivable from a section here.*

*Owner: Nikhil Dutt · Last updated: June 2026*
