---
title: "The AI agent is the developer — building a production loan backend without writing a line of code"
description: "A step-by-step walkthrough of Claude building a complete multi-stage loan application backend — graph storage, vector RAG, workflow engine, SLA enforcement, and audit trail — entirely through Purple8's MCP tools. No code written."
date: "2026-07-22"
author: "Purple8 Team"
tags: ["mcp", "agents", "journey-engine", "rag", "no-code"]
---

Last week we pointed Claude Desktop at a fresh Purple8 instance and gave it one
instruction:

> *"Build a loan application backend. It needs multi-stage workflow with SLA,
> human-in-the-loop approvals, a knowledge base of lending policies, and a full
> audit trail. Use the Purple8 tools."*

We did not write a single line of application code. This is what happened.

---

## Why this is even possible

Most databases expose a query interface. Most workflow engines expose an API.
Purple8 exposes **49 MCP tools** — `graph.*`, `journey.*`, `rag.*`, `data.*`,
`memory.*` — that map directly to backend operations. An AI agent with access
to those tools can design a schema, build a workflow, ingest documents, and
start handling requests, all through natural language.

The agent is not generating code to run later. It is calling production tools
in real time, on a running backend, with the results persisted in the graph.
When it finishes, the backend exists and is live.

This is what we mean by *"AI-native"*. Not an AI wrapper around a traditional
database. A backend that was designed from day one so that an agent could
build it.

---

## The session, step by step

### Step 1 — Define the workflow

Claude called `journey.define` with a six-stage loan lifecycle:

```
Application Received → Document Verification → Credit Assessment
→ Underwriting Review [HITL] → Approval Decision → Disbursement
```

Each stage got an SLA policy: document verification has a 24-hour hard
deadline; underwriting has a 48-hour soft deadline with a 4-hour escalation
window. The HITL gate on underwriting means no instance can advance past that
stage without a human officer approving it via `journey.resolve_hitl`.

One tool call. The workflow is live and accepting instances.

### Step 2 — Ingest the policy knowledge base

Claude called `data.ingest_file` three times — one for each lending policy
document (credit risk framework, AML guidelines, underwriting manual). Each
document was chunked, embedded, and stored in the graph as nodes with
`REFERENCES` edges back to the originating document.

The RAG layer was immediately queryable. Claude tested it:

```
rag.hybrid_query: "What is the maximum LTV ratio for a first-time buyer?"
→ "Per the underwriting manual (section 4.2), the maximum LTV for a
   first-time buyer is 90% subject to mortgage insurance requirements..."
```

No vector database configured separately. No embedding pipeline set up. The
documents went in, the knowledge is queryable.

### Step 3 — Start the first loan application

Claude called `journey.start` with a borrower entity and immediately had a
live workflow instance. The instance is a graph node. Its current stage, its
history, and its associated borrower data are all graph edges — queryable,
traversable, auditable.

### Step 4 — Advance through the stages

Claude advanced the instance through document verification and credit
assessment by calling `journey.advance` with structured payloads representing
the credit check output. At each transition, an immutable `ADVANCED_TO` edge
was written to the graph with the timestamp, the actor, and the data payload.

At underwriting, the instance stopped. It cannot advance without a human
decision. Claude surfaced the pending task with `journey.list_hitl` and
demonstrated the approval flow with `journey.resolve_hitl`. The instance
advanced to the approval decision stage.

### Step 5 — Query the audit trail

```
journey.audit: instance_id="loan-001"
→ [
    {stage: "Application Received",   entered: "2026-07-22T09:14Z", actor: "claude"},
    {stage: "Document Verification",  entered: "2026-07-22T09:15Z", actor: "claude"},
    {stage: "Credit Assessment",      entered: "2026-07-22T09:16Z", actor: "claude"},
    {stage: "Underwriting Review",    entered: "2026-07-22T09:17Z", actor: "claude",
                                      hitl_resolved_by: "officer@bank.com"},
    {stage: "Approval Decision",      entered: "2026-07-22T09:31Z", actor: "claude"},
  ]
```

Every transition, every HITL decision, every SLA breach — stored as graph
edges. Immutable. No separate logging infrastructure. No LangSmith. No
Airflow run history. The graph *is* the audit trail.

---

## What Claude did not need

This is the list that matters:

| What you'd normally provision | What Claude used instead |
|---|---|
| PostgreSQL for application state | `graph.*` — nodes and edges |
| Pinecone / pgvector for policy RAG | `rag.*` — already in the graph |
| LangGraph for the workflow state machine | `journey.*` — Journey Engine |
| LangSmith for tracing | `journey.audit` — immutable graph edges |
| Airflow for SLA scheduling | `SLAMonitor` — built into Journey Engine |
| Auth0 for HITL user identity | Purple8 RBAC — enforced per tool |
| A developer to write any of this | Claude — via 49 MCP tools |

The frontend still needs to be built — a loan officer UI, a borrower portal.
But the entire backend: data layer, search, workflow, audit, SLA, RAG — Claude
built it in one session, on a running instance, with zero code.

---

## The implication for teams

A non-technical product manager with Claude Desktop and a Purple8 instance can:

- Define the workflow in plain English
- Ingest the policy documents that govern it
- Start instances and advance them
- Surface SLA breaches and HITL queues
- Query the audit trail for compliance

Before writing the first line of frontend code. Before involving an engineer
for backend design. The product manager is the developer, and the AI agent is
their interface to the backend.

This is not automation. Automation replaces repetitive tasks. This is a
category shift: the backend itself is now buildable through natural language
because the backend was designed to be MCP-native from day one.

---

## Try it

You need a running Purple8 instance and an MCP-compatible client (Claude
Desktop, Cursor, or any client that supports the MCP protocol).

1. Start Purple8 — [Docker quickstart →](/quickstart)
2. Generate an API key in `/lcnc/api-keys`
3. [Connect your MCP client →](/blog/mcp-client-integration)
4. Load the loan template:

```
journey.define: load template "loan_application"
```

The `loan_application` template is one of five pre-built Journey Engine
templates in Purple8. It comes with the six stages, SLA policies, and HITL
gate pre-configured. From there, Claude can start instances, ingest your
actual policy documents, and have a working backend in under ten minutes.

The five templates — loan application, customer onboarding, support
escalation, compliance review, supplier approval — are a starting point, not a
ceiling. Any workflow that can be expressed as stages with transitions,
approvals, and SLAs can be defined through `journey.define`. The agent handles
the rest.

---

*Purple8 Hyper Graph is an embedded multi-model database purpose-built for AI
applications. One process. One port. Graph, vector, RAG, workflow, and full-text
— no external dependencies. [Get the Developer edition free →](/register)*
