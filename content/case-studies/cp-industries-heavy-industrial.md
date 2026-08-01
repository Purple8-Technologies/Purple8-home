---
title: "From rotary piercing mill to real-time operational intelligence"
description: "How Purple8's single-binary engine can replace CP Industries' fragmented plant-floor data stack — sub-millisecond telemetry ingestion, automated ASME/DOT compliance, and AI-driven routing optimisation, all without a single external service."
date: "2026-07-30"
customer: "CP Industries"
industry: "Heavy Industrial Manufacturing"
result: "One process replacing five: telemetry, compliance, routing, document parsing, and predictive maintenance — unified"
tags: ["manufacturing", "aec", "compliance", "predictive-maintenance", "rag"]
---

## Who CP Industries is

Christy Park Industries — operating globally as **CP Industries** — is a
heavy-industrial manufacturer headquartered in McKeesport, Pennsylvania.
Founded in 1897 as a seamless tube mill, they are among the world's leading
producers of large-diameter, seamless steel high-pressure containment vessels
and gas cylinders.

Their pressure vessels operate in some of the most demanding environments on
Earth:

- **Aerospace & Defense** — ground-support storage at NASA launch sites;
  high-pressure flasks for the U.S. Navy.
- **Energy & Transportation** — DOT-approved cylinders for tube trailers
  hauling compressed industrial gases across North America.
- **Industrial & Chemical** — large-scale storage for CNG, hydrogen, and
  petrochemical processing.

Every vessel CP Industries ships must survive ASME Section VIII, DOT 3AA/3T,
and programme-specific NASA or Navy qualification. The margin for error is
zero.

---

## The operational challenges

### 1. Factory-floor telemetry with no unified home

CP Industries' McKeesport plant runs massive rotary piercing mills,
multi-pass drawing benches, induction furnaces, and hydraulic test stands.
Each station emits continuous sub-millisecond streams of vibration, thermal,
and pressure readings. Today that data lives in isolated PLCs and SCADA
historians. There is no single layer that can correlate a furnace temperature
drift with the downstream wall-thickness variance it will cause three process
steps later.

### 2. Compliance documentation is a paper mountain

Every cylinder produced generates:
- Material test reports (MTRs) for each heat of steel
- Ultrasonic and magnetic particle inspection logs
- Heat-treatment and normalising certificates
- Hydrostatic test records
- Serialised certificates of conformance for DOT, ASME, NASA, and Navy

These documents arrive in PDF, XLSX, XML, and proprietary mill formats.
Matching them to the correct serial-numbered vessel — and confirming all
required documents are present before a shipment is released — is largely a
manual, error-prone process that creates bottlenecks on every government
contract.

### 3. Production routing is unpredictable

Historical employee feedback from the McKeesport plant documents operational
friction: heavy steel products are routed between manufacturing stations
without a coherent, data-driven sequence. A billet that should flow
Piercing → Drawing → Annealing → Straightening → NDT → Hydro-Test instead
bounces based on machine availability signals that are never aggregated into
a single routing decision layer. The result is excess material handling,
extended cycle times, and utilisation imbalance across the plant floor.

---

## What Purple8 does — concretely

Purple8 is a single-binary, in-process database that combines graph storage,
vector search, full-text retrieval, document intelligence, and a workflow
engine in one deployable unit. No Kafka. No separate vector DB. No external
compliance microservice. One `docker run`.

### Real-time telemetry and predictive maintenance

Purple8's **`BrickCoreStorage` (Cortex)** engine ingests high-frequency time-
series data from mill sensors directly into the graph. The seal-and-evict
memory model keeps peak RSS bounded regardless of how many data points
accumulate — the same hardware that handles 2 million readings handles 20
million without re-provisioning.

Once in the graph, Purple8's **Journey Engine** models each cylinder's
production lifecycle as a stateful workflow:

```
[Billet Cast] → [Rotary Piercing] → [Mandrel Drawing] → [Annealing]
→ [Straightening] → [UT Inspection] → [Hydro Test] → [Certified Ship-Ready]
```

Every stage carries `SLAPolicy` thresholds. If furnace temperature telemetry
deviates beyond a configurable band during Annealing, the Journey Engine flags
the cylinder instance, triggers a Human-In-The-Loop (HITL) review, and emits
a graph edge `SLA_BREACHED` — immutably, before the part advances. Plant
engineers see a real-time alert, not a post-mortem failure report.

The **AEC structural module** (`aec/structural.py`) and **MEP flow analysis**
(`aec/mep.py`) — originally built for building information modelling — map
directly onto mill equipment topology: critical machine relationships (which
piercing mill feeds which draw bench), max-flow capacity constraints across
production lines, and bridge-detection to identify single points of failure
that would cascade a line stoppage.

### Automated ASME and DOT compliance processing

**Purple8 DocIntel** (port 8200) parses every document format CP Industries
produces — PDF test reports, XLSX material certs, XML mill data — and
extracts structured entities (heat number, pressure rating, cylinder serial,
inspection result, certifying engineer) with no template configuration
required.

Those entities are committed back to the Purple8 Graph against the correct
cylinder node via `POST /ingest/commit`. Compliance status becomes a live
graph query:

```
Is cylinder SN-2847-X ship-ready for Aerospace contract A-7731?
→ Check: MTR present ✓  UT log present ✓  Hydro cert present ✓
  NASA NHB 1700.7 cert present ✗  → HOLD, flag for document re-submission
```

This replaces a manual clerk review on every government shipment with a
sub-second graph traversal. Discrepancies surface before a crate is loaded,
not after a Navy QA inspector rejects it at port.

Purple8's **RAG pipeline** (`rag.hybrid_query`) lets compliance engineers ask
natural-language questions across the full document corpus:

> *"Show me all cylinders from Heat 44A that shipped to NASA KSC since
> January 2025 and confirm their hydrostatic test pressures."*

The answer is retrieved from graph nodes and original source documents in one
round-trip — no SQL, no Elasticsearch cluster, no separate document management
system.

### Predictive routing optimisation

Purple8's **graph algorithms** (`core/algorithms.py`) provide the decision
layer for production routing:

- **Shortest path (Dijkstra)** across the station graph gives the minimum-
  handling route for a cylinder of a given OD and wall thickness.
- **Betweenness centrality** identifies which stations are current bottlenecks
  — the nodes every route passes through — so plant managers can target
  capacity investment accurately.
- **Community detection (Louvain)** clusters product families with similar
  routing profiles, enabling schedule batching that reduces furnace setups and
  tooling changeovers.
- **Link prediction** surfaces latent correlations between upstream process
  parameters (pierce ratio, mandrel speed) and downstream inspection failures,
  giving process engineers earlier leverage than end-of-line defect analysis
  currently allows.

The **cost-based query planner** selects the cheapest strategy for each
routing query automatically — a `PROPERTY_INDEX_SCAN` for serial-number
lookup, a `TRAVERSAL` for station-graph navigation, a `HYBRID` search for
"find similar cylinders with the same failure pattern." No query tuning needed.

---

## Architecture: what replaces what

| Today at CP Industries | With Purple8 |
|---|---|
| Isolated SCADA historians | One Purple8 graph — all telemetry co-located with product records |
| Manual MTR / cert matching | DocIntel auto-extraction + graph compliance queries |
| Spreadsheet-based routing decisions | Graph algorithms (shortest path, centrality, Louvain) |
| Paper/email HITL review for anomalies | Journey Engine HITL gates — tracked, audited, immutable |
| Separate compliance DB per contract | Multi-tenant namespacing — one engine, isolated per programme |
| No predictive maintenance layer | SLA monitors + anomaly edges fire before failures cascade |

One process. One port. Zero new infrastructure services to operate.

---

## Why the single-binary architecture matters for heavy industrial

CP Industries' IT environment is not a cloud-native startup. It is an
industrial plant network with air-gapped segments, strict change-control
windows, and OT/IT separation requirements. Purple8's single-binary model
(`pip install` or `docker run`) means:

- **One approval, one deployment** — not eight services, eight change tickets,
  eight runbooks.
- **On-premises or private cloud** — no data leaves the facility. AES-256-GCM
  envelope encryption is on by default from the first `GraphEngine()` call.
- **Bounded resource footprint** — `CortexAutoConfig` solves the right memory
  geometry for whatever hardware the plant network provides. The engine runs on
  a 16 GB industrial server the same way it runs on a 128 GB cloud VM.
- **MCP-native** — an AI agent (Claude, Copilot, or an internal assistant
  model) can query compliance status, trigger routing recalculations, and
  resolve HITL holds entirely through natural language, without writing
  application code.

---

## The bottom line

CP Industries has been manufacturing to zero-defect standards since 1897. The
operational intelligence layer around their plant has not kept pace with the
precision of the vessels they build. Purple8 closes that gap — not by adding
complexity, but by consolidating what already exists into a single,
AI-native operational backbone.

> One binary. Sub-millisecond ingestion. Instant compliance.  
> Predictive routing. Full audit trail.  
> The same machine that handles today's production handles tomorrow's growth.
