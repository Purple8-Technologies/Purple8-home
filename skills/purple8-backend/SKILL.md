---
name: purple8-backend
description: >
  Build, configure, and operate complete AI-native application backends on Purple8 Hyper Graph
  over MCP (Unified LPG + RDF + Hypergraph, HNSW Vector Search, Structured Tables, Hybrid GraphRAG,
  Stateful Journey Workflows with SLAs & HITL Gates, Event Automation, Webhooks, Quantum QUBO
  Optimisation, and Cryptographic Audit Governance) plus Frontend-Only TypeScript UIs.
  Use when asked to build a backend, knowledge graph, RDF ontology + property graph, RAG pipeline,
  compliance/underwriting workflow, multi-agent system, or full-stack AI app with Purple8.
---

# Purple8 Hyper Graph — AI Agent Builder Skill

Purple8 Hyper Graph (`https://www.purple8.ai` · Docs: `https://docs.graph.purple8.ai`) is **SOTA AI-native backend infrastructure in a single process** that replaces the fragmented 8–12 service AI stack (PostgreSQL, Neo4j, Stardog/RDF, Pinecone, LangChain, Temporal/Airflow, Kafka/CDC, Svix/Webhooks, Auth0/KMS, and SIEM/Compliance) with **176 RBAC-governed MCP tools across 19 namespaces**.

## 1. Connect Over MCP (Focused Tool Profiles)

Connect to any self-hosted Purple8 container (`http://localhost:8100`) or the Cloud Sandbox (`https://purple8-graph-sandbox.fly.dev`):

- **`/mcp?profile=starter` (28 tools, recommended default):** Schema modeling, Unified LPG + RDF graph CRUD/queries, hybrid search, structured table & Markdown commit, and Journey workflows + HITL.
- **`/mcp?profile=builder` (117 tools):** Starter + full `schema.*`, `data.*` tables, `memory.*`, `models.*`, `egress.*`, `scheduler.*`, `feedback.*`, and `registry.*`.
- **`/mcp?profile=ops` (37 tools):** `journey.*`, `sentinel.*`, `guardrails.*`, `feedback.*`, and `admin.*`.
- **`/mcp` or `/mcp?profile=full` (176 tools):** All 19 namespaces including `aec.*`, `soc.*`, `supergraph.*`, `quantum.*`, and `evolution.*`.

```bash
# Claude Code CLI
claude mcp add --transport http purple8 "https://<host>/mcp?profile=starter" \
  --header "X-API-Key: <your-api-or-sandbox-key>"

# Or zero-edit project initialization via Purple8 CLI:
p8 launch --app my-app --blueprint workflow_journey
```

---

## 2. The 3-Phase AI-Native Application Lifecycle

### Phase 1 — Configure the Complete Backend Over MCP (Zero Server LLM or DocIntel Required)
When connected via MCP, **you (the AI agent) are the developer and reasoning engine**. You do **not** need a server-side LLM key or DocIntel configured to build or operate the backend:

1. **Define & Validate the Schema (`schema.*`):**
   - Call `schema.define_node_type` (`properties` supports `string`/`str`, `integer`/`int`, `float`/`number`, `boolean`/`bool`, `datetime`, `list`/`array`, `dict`/`object`; `data_classification`: `public` | `internal` | `restricted` | `highly_restricted`).
   - Call `schema.define_edge_type` and verify with `schema.validate`.
2. **Use Both LPG + RDF on a Single Instance (`graph.*`):**
   - **Operational LPG (`graph.add_node`, `graph.add_edge`):** Store mutable entities, relationships, weights, and vector embeddings. *(Note: `graph.add_node` takes `type` as a singular string, not `labels` list.)*
   - **Canonical RDF (`graph.assert_statement`, `graph.import_nquads`):** Store formal domain ontologies (FIBO, SNOMED, ISO, IFC/bSDD), regulatory rules, and named-graph provenance quads.
   - **Unified LPG ↔ RDF Bridge (`iri_properties` + `graph.semantic_query`):** Store an IRI string on any LPG node/edge property (e.g. `{"jurisdiction_iri": "urn:fibo:jurisdiction:VG"}`), assert RDF quads on that IRI, and join LPG (`model="lpg"`, `model="lpg_edge"`) with RDF (`model="rdf"`) in **one indexed conjunctive query** via `graph.semantic_query`!
3. **Commit Structured Tables & Markdown Directly OR Parse 70+ Formats via DocIntel (`data.*`):**
   - **App-Generated / Agent-Extracted Data (No DocIntel required):** Call `data.commit` with `entities`, `relationships`, `markdown`, `raw_text`, `file_bytes_b64` (base64 of text so a `File` anchor node is created), `tables`, and `links`. Query rows with `data.get_table(table_id=...)` and `data.query_table_rows(table_id=..., where={...})`.
   - **Unstructured 70+ Format Document Parsing (Requires Purple8 DocIntel):** Call `data.ingest_file` / `data.ingest_text` when parsing PDFs, Office docs, CAD/BIM, or OCR images via `P8G_DOCINTEL_URL`.
4. **Zero-LLM Hybrid Retrieval (`graph.*`):**
   - Call `graph.hybrid_search`, `graph.vector_search`, `graph.traverse`, `graph.shortest_path`, or `graph.query` (Cypher) — returns sub-millisecond vector + graph results for you to synthesize.
5. **Stateful Workflows, SLAs, HITL, Automation & Governance (`journey.*`, `scheduler.*`, `egress.*`, `admin.*`):**
   - Call `journey.define` (always before `journey.start`) → `journey.start` → `journey.advance` → `journey.list_hitl` / `journey.resolve_hitl` → `journey.audit`.
   - Register automations with `scheduler.add_trigger`, outbound HMAC webhooks with `egress.add_sink`, safety checks with `guardrails.evaluate`, legal holds with `admin.hold_place`, retention policies with `admin.retention_set(match={"labels": [...]}, retain_days=..., action="archive"|"purge"|"anonymise")`, and verify the cryptographic hash-chain with `admin.audit_verify`.

---

### Phase 2 — Build the Frontend UI When Requested ("Frontend-Only" Application Pattern)
Because Purple8 **is** the entire backend, **never scaffold a custom middle-tier API server** (no Express, FastAPI, or ORM glue). When asked to build a frontend UI:
1. Run `p8 sdk ts --out src/lib/purple8.ts` to generate the standalone zero-dependency `Purple8Client`.
2. Build the React / Next.js / Vite UI directly against `Purple8Client` (`hybridSearch`, `semanticQuery`, `assertStatement`, `queryTableRows`, `addNode`, `addEdge`, `startJourney`, `advanceJourney`, `listHitlTasks`, `resolveHitlTask`, `invokeMcpTool`).

---

### Phase 3 — Post-Build Runtime LLM & Model Router Configuration (POC & Production)
Once the application (backend + frontend) is built, customers connect their favorite LLM provider (OpenAI, Anthropic, Google/Vertex, AWS Bedrock, Azure OpenAI, Mistral, Cohere, xAI, or local Ollama/vLLM in `/dashboard/ai` or `PUT /ai/config`) or configure the dynamic **Model Router** via `models.*` (`models.search_known`, `models.upsert`, `models.set_policy`, `models.route_explain`). This powers runtime server-side RAG synthesis (`rag.query`, `rag.hybrid_query`, `rag.profile_collection` → `rag.tune_collection`) and Journey `ai_step` hooks across `small` / `default` / `flagship` model tiers.
