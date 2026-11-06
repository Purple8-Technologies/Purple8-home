"use client";
import { FACTS as F } from "@/lib/facts";

/**
 * FeaturesManifesto - Option D
 *
 * Large typographic "8" anchors each row. No cards, no grid, no icons.
 * The number sits huge and low-opacity in the background; the claim
 * overlays it in white; a one-line proof sits below. Feels like an
 * art-direction choice, not a template.
 *
 * Swap into page.tsx by replacing <Features /> with <FeaturesManifesto />
 */

const EIGHT = [
  {
    claim: "One process. No orchestration tax.",
    proof:
      "Storage, search, workflow, RAG, auth, and encryption - single binary, single port. Replaces 20+ services before you write a line of code.",
  },
  {
    claim: "AI agents operate it natively.",
    proof:
      `A first-class agent interface with ${F.mcpTools} tools, RBAC-enforced. Claude, Cursor, and Copilot connect directly - no wrapper, no glue code.`,
  },
  {
    claim: "Three RAG modes. Self-tuning.",
    proof:
      "Flat vector, graph-augmented, and hybrid retrieval built in. The system profiles your corpus and persists the optimal configuration automatically.",
  },
  {
    claim: "Agentic process automation. Built in.",
    proof:
      `Stateful workflows, SLA enforcement, human-approval gates, and an immutable audit trail - all in the same process. AI agents orchestrate end-to-end business processes through ${F.mcpTools} MCP tools, with no DAG files, no separate orchestration service, no tracing backend. Replaces LangChain, LangGraph, LangSmith, and Airflow.`,
  },
  {
    claim: "Memory bounded by hardware, not data.",
    proof:
      "Purple8 fits its ingest footprint to the RAM you give it - peak memory tracks your hardware, not your corpus size. Validated: 8.84 million passages ingested on a 24 GB machine with peak memory holding around 9 GB. The same corpus runs on a small machine or a large one; you trade time for memory, never correctness.",
  },
  {
    claim: "Documents become knowledge, automatically.",
    proof:
      "Feed it PDFs, contracts, CAD drawings, BIM models. A proprietary extraction pipeline turns unstructured content into structured, queryable knowledge.",
  },
  {
    claim: "AI-native. Without burning the planet.",
    proof:
      "One process instead of 20+ services means fewer servers, less idle compute, and no cross-service network waste. The architecture is the efficiency argument - not a benchmark number.",
  },
  {
    claim: "You own it. Completely.",
    proof:
      "Self-hosted. Ships as a Docker image or pip wheel - runs anywhere Python or containers run. Your data never leaves your infrastructure: no content egress, no vendor access. Optional anonymized version telemetry (no PII, no customer data) is opt-out with one env var. Air-gap capable.",
  },
];

export default function FeaturesManifesto({
  variant = "full",
}: {
  variant?: "full" | "highlight";
}) {
  const isHighlight = variant === "highlight";
  const rows = isHighlight ? EIGHT.slice(0, 4) : EIGHT;

  return (
    <section id="features" className="py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* Section label */}
        <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
          Why Purple8
        </p>
        {isHighlight ? (
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            A category of one.
          </h2>
        ) : (
          <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Eight reasons it&rsquo;s a category of one.
          </h1>
        )}

        {/* Rows */}
        <div className="mt-16 space-y-0 divide-y divide-zinc-900">
          {rows.map(({ claim, proof }, i) => (
            <div
              key={i}
              className="group relative flex items-start gap-6 py-10 transition-colors hover:bg-white/[0.02]"
            >
              {/* Background number */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -left-2 top-1/2 -translate-y-1/2 select-none text-[7rem] font-black leading-none text-white/[0.06] transition-all duration-300 group-hover:text-white/[0.10] sm:text-[9rem]"
              >
                {i + 1}
              </span>

              {/* Small foreground number */}
              <span className="relative mt-1 w-6 shrink-0 text-sm font-semibold tabular-nums text-purple-500">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Text */}
              <div className="relative">
                <p className="text-xl font-semibold text-white sm:text-2xl">
                  {claim}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {proof}
                </p>
              </div>
            </div>
          ))}
        </div>

        {isHighlight && (
          <div className="mt-12 text-center">
            <a
              href="/features/"
              className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-6 py-2.5 text-sm font-semibold text-purple-300 transition-colors hover:bg-purple-500/20"
            >
              See all eight reasons &rarr;
            </a>
          </div>
        )}

        {!isHighlight && (
          <div className="mt-20 space-y-8 rounded-2xl border border-purple-900/40 bg-[#11111b] p-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-purple-400">
                Technical Verification Reference (For Architects &amp; AI Agents)
              </p>
              <h2 className="mt-2 text-2xl font-bold text-white">
                Production Guarantees: CRUD, Scoped Agent Permissions, Portability &amp; DR
              </h2>
              <p className="mt-2 text-sm text-zinc-400">
                Answers to the exact production architecture questions evaluated when comparing Purple8 against a conventional PostgreSQL + API + Vector + Queue stack:
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-zinc-800 bg-[#0a0a0f] p-5">
                <h3 className="text-base font-semibold text-white">
                  1. Transactional CRUD, Constraints &amp; Structured Tables
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                  Purple8 is not only a graph/vector engine - it includes first-class relational{" "}
                  <code>Table</code> and <code>Row</code> storage (<code>data.commit</code>,{" "}
                  <code>data.get_table</code>, <code>data.query_table_rows</code>,{" "}
                  <code>data.index_table_columns</code>) and strict schema validation (
                  <code>schema.define_node_type</code>, <code>schema.define_edge_type</code>)
                  enforcing required fields, property types (<code>string</code>, <code>integer</code>,{" "}
                  <code>float</code>, <code>boolean</code>, <code>datetime</code>, <code>list</code>,{" "}
                  <code>dict</code>), enums, and <code>immutable_properties</code> on every write
                  with WAL <code>fdatasync</code> durability before mutation.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-[#0a0a0f] p-5">
                <h3 className="text-base font-semibold text-white">
                  2. Why You Don&apos;t Need a Custom &ldquo;App API&rdquo; Wrapper
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                  You never need to expose all {F.mcpTools} MCP tools to an end-user AI assistant.
                  Every Purple8 API key supports cryptographic{" "}
                  <code>allowed_tools</code> and <code>allowed_labels</code> allowlists (for example,
                  restricting an assistant key strictly to{" "}
                  <code>[&quot;rag.hybrid_query&quot;, &quot;journey.start&quot;, &quot;graph.add_node&quot;]</code>{" "}
                  on <code>[&quot;Account&quot;, &quot;Task&quot;]</code>), combined with 4-tier RBAC,
                  per-record ownership policies, <code>human_only=true</code> destructive locks, and{" "}
                  <code>requires_hitl: true</code> human approval gates.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-[#0a0a0f] p-5">
                <h3 className="text-base font-semibold text-white">
                  3. Open Portability, Export Formats &amp; Zero Lock-In
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                  Export 100% of your records, schemas, relationships, and workflows at any time in
                  open-standard formats: <strong>JSON</strong>, <strong>CSV</strong>,{" "}
                  <strong>GraphML</strong> (<code>GET /export?format=json|csv|graphml</code>),{" "}
                  <strong>W3C RDF 1.1 N-Quads</strong> (<code>output_format: &quot;nquads&quot;</code>),
                  and full application blueprints (<code>GET /sandbox/blueprint?include_data=true</code>{" "}
                  &rarr; <code>POST /sandbox/import-blueprint</code>) that migrate schemas,{" "}
                  <code>JourneyDefinition</code> state machines, and data between instances in one call.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-[#0a0a0f] p-5">
                <h3 className="text-base font-semibold text-white">
                  4. Backups, Disaster Recovery (RPO/RTO) &amp; Integrity
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                  <code>IncrementalBackupManager</code> writes streaming JSONL snapshots with a change
                  journal and SHA-256 manifest to <strong>AWS S3</strong>,{" "}
                  <strong>Google Cloud Storage</strong>, <strong>Azure Blob Storage</strong>, or local
                  disk (<code>POST /backup/create</code>, <code>POST /backup/restore</code>). For HA,
                  WAL streaming replication in <code>SYNC</code> mode achieves{" "}
                  <strong>RPO &approx; 0</strong> with automatic follower promotion failover and
                  online non-destructive CRC32 storage scrubbing (<code>admin.storage_scrub</code>).
                </p>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-[#0a0a0f] p-5">
                <h3 className="text-base font-semibold text-white">
                  5. Email, Webhook, Calendar &amp; Enterprise Connectors
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                  Built-in outbound SMTP service (<code>admin.smtp_configure</code>) for reminders and
                  transactional emails, inbound HMAC-SHA256 webhook connectors (
                  <code>/v1/connectors/webhook/&#123;id&#125;</code>) with idempotency &amp; retry,
                  outbound signed CDC event sinks (<code>egress.add_sink</code> with exponential
                  backoff), cron/interval/event triggers (<code>scheduler.add_trigger</code>), and
                  EML/MSG email + SharePoint/Confluence/S3 ingestion via DocIntel.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-[#0a0a0f] p-5">
                <h3 className="text-base font-semibold text-white">
                  6. Compliance Controls, Audit Chain &amp; Support SLAs
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                  Every state transition and mutation is recorded in a tamper-evident SHA-256 hash
                  chain verifiable at runtime (<code>admin.audit_verify</code>). Built-in GDPR/compliance
                  primitives include Legal Holds (<code>admin.hold_place</code>), automated retention
                  sweeps (<code>admin.retention_set</code>: purge, archive, or anonymise), declarative
                  PII masking, AES-256-GCM envelope encryption (Vault/AWS/GCP/Azure KMS), and
                  24&times;7&times;365 Severity-1 enterprise SLAs (&lt;1 hour response).
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
