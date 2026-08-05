"use client";

import { useState } from "react";

const objections = [
  {
    q: "\"Single process means single point of failure.\"",
    a: "High availability on Purple8 means 3 replicas of one binary, not 36 instances of 12 separate services. You get the same resilience with a far smaller operational surface. Each replica is stateless at the application layer; persistent state lives in the storage engine, which replicates across nodes via the write-ahead log.",
  },
  {
    q: "\"Monoliths don't scale.\"",
    a: "Consolidith scales down to a laptop and up to horizontal replicas without changing a single line of application code. What it removes is scaling complexity, not scaling capability. The hardware-bounded memory model means you will never need to re-provision infrastructure just because your data set grew.",
  },
  {
    q: "\"What if one capability, like vector search, consumes too many resources? Can I scale just that part?\"",
    a: "Yes. Because all capabilities share the same process and storage engine, resource pressure is visible in one place rather than scattered across twelve dashboards. You scale the whole node horizontally by adding a replica, and the load balancer routes compute-heavy queries to the least-loaded node automatically. That is simpler than microservices, where you first have to identify which of twelve services is the bottleneck, provision it separately, and then manage the traffic between them. If you genuinely need workload isolation, for example bulk ingestion running alongside latency-sensitive API queries, Purple8 supports deployment topologies where ingestion nodes and query nodes run as separate replica sets from the same binary, with no code changes required.",
  },
  {
    q: "\"You'll be locked in.\"",
    a: "Every capability is exposed through standard REST or MCP tools. Your application talks HTTP and nothing else. You can swap the backend while keeping the interface unchanged. AI agents have no visibility into what runs underneath their tool calls. The same lock-in concern applies to every managed service you currently depend on, multiplied by twelve.",
  },
  {
    q: "\"We already have data in Postgres and Pinecone. Migration is too risky.\"",
    a: "Purple8 does not require a hard cutover. The REST ingest API and the data.* MCP tools accept structured records, documents, and embeddings directly. You can run both systems in parallel and migrate one entity type or collection at a time. Most teams start with a single new use case, such as a new RAG pipeline or a new workflow, rather than touching existing tables at all. The old stack stays live until you are ready to retire it.",
  },
  {
    q: "\"Our cloud provider already offers managed Postgres, managed Pinecone, managed everything. Why not just use those?\"",
    a: "Managed services solve the provisioning problem, not the integration problem. You still write the glue code between your managed vector store, your managed graph database, your managed workflow engine, and your managed auth service. Every one of those boundaries is a network call, a potential schema mismatch, and a separate monthly invoice. Purple8 removes the boundaries, not just the provisioning. A single pip install or docker run replaces the entire managed stack and runs identically on your laptop, on any cloud, and in an air-gapped environment.",
  },
  {
    q: "\"How do we know Purple8 will still exist in three years?\"",
    a: "The Python package is open to inspect, the REST and MCP interfaces are publicly documented, and the storage format is not proprietary binary. Your data does not become inaccessible if you stop using Purple8. The commercial tier adds support SLAs and enterprise features, but the core engine is not gated behind a cloud control plane. You are never one company decision away from losing access to your own data.",
  },
  {
    q: "\"Our security and compliance team requires each component to be audited separately.\"",
    a: "Fewer components means a smaller audit surface, not a larger one. A single process has one network exposure, one set of CVEs to track, one patching cadence, and one place to apply your encryption and access control policy. AES-256 encryption and the SOC agent are on by default, so your auditor is reviewing a system that is already hardened rather than one where security was added per service after the fact. Compliance artefacts including audit logs, access records, and data lineage are all queryable from the same graph, with no log aggregation pipeline required.",
  },
  {
    q: "\"My team knows Postgres, Redis, and LangChain. There will be a learning curve.\"",
    a: "Purple8's REST API maps closely to concepts your team already knows. Nodes are records, edges are foreign keys, and vector search is a query parameter. The MCP tools are designed to be called in plain English by an AI agent, so your team does not need to learn a new query language. The Journey Engine maps directly to the workflow patterns your team currently builds in Airflow or hand-rolled state machines. We believe the ramp-up will be shorter than you expect, because there is no new query language to learn, no distributed system mental model to internalise, and no inter-service wiring to reason about. The complexity that typically drives long onboarding timelines simply is not there.",
  },
  {
    q: "\"We run on Kubernetes. Does Purple8 fit our existing infrastructure?\"",
    a: "Yes. Purple8 ships as a standard container image and exposes a single HTTP port. It runs as a Kubernetes Deployment or StatefulSet with no custom operator required. The /health and /ready endpoints integrate directly with Kubernetes liveness and readiness probes, and the /metrics endpoint works with any Prometheus scrape configuration. Horizontal scaling is a replica count change. Nothing in your existing Kubernetes tooling needs to change.",
  },
];

const migrationSteps = [
  { n: "1", t: "Agent reads from the source system", d: "Point an AI agent at the source. It reads records through the source REST API, a direct database connector, or a file export. No bespoke migration script is needed." },
  { n: "2", t: "Agent writes into Purple8", d: "The agent calls data.ingest_text or data.ingest_file to push entities into Purple8 as graph nodes and edges, with relationships preserved rather than flattened into rows." },
  { n: "3", t: "Journey Engine tracks progress", d: "Each entity type or data partition maps to a stage in a MigrationJourney definition. SLA policies surface stalled stages automatically. Failed batches are retried without human input." },
  { n: "4", t: "Agent verifies parity", d: "graph.counts on Purple8 is compared against source record counts. Any gap triggers a targeted re-run of the affected stage rather than restarting the whole migration." },
  { n: "5", t: "Single human approval gate", d: "One HITL gate in the Journey definition. The agent presents a parity report; a human reviews and approves. Everything before and after this gate runs autonomously." },
];

export default function CollapsibleObjections() {
  const [open, setOpen] = useState<number | null>(null);
  const [migOpen, setMigOpen] = useState(false);

  return (
    <div className="mt-10 space-y-3">
      {objections.map((o, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className={`rounded-2xl border transition-colors duration-200 ${
              isOpen
                ? "border-purple-700/50 bg-[#11111b]"
                : "border-purple-900/30 bg-[#11111b] hover:border-purple-800/50"
            }`}
          >
            <button
              className="flex w-full items-start justify-between gap-4 px-7 py-5 text-left"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="text-base font-semibold text-zinc-300 italic leading-snug">{o.q}</span>
              <span className={`mt-0.5 shrink-0 flex h-6 w-6 items-center justify-center rounded-full border transition-all duration-200 ${isOpen ? "border-purple-600 bg-purple-600/20 text-purple-300 rotate-180" : "border-zinc-700 text-zinc-500"}`}>
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}>
              <p className="px-7 pb-6 text-sm leading-relaxed text-zinc-400">{o.a}</p>
            </div>
          </div>
        );
      })}

      {/* Migration question with reference architecture */}
      <div className={`rounded-2xl border transition-colors duration-200 ${migOpen ? "border-purple-700/50 bg-[#11111b]" : "border-purple-900/30 bg-[#11111b] hover:border-purple-800/50"}`}>
        <button
          className="flex w-full items-start justify-between gap-4 px-7 py-5 text-left"
          onClick={() => setMigOpen((o) => !o)}
          aria-expanded={migOpen}
        >
          <span className="text-base font-semibold text-zinc-300 italic leading-snug">
            &ldquo;Can Purple8 handle system-to-system migration with minimal human involvement? Is there a reference architecture for that?&rdquo;
          </span>
          <span className={`mt-0.5 shrink-0 flex h-6 w-6 items-center justify-center rounded-full border transition-all duration-200 ${migOpen ? "border-purple-600 bg-purple-600/20 text-purple-300 rotate-180" : "border-zinc-700 text-zinc-500"}`}>
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>

        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${migOpen ? "max-h-[2400px] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="space-y-6 px-7 pb-8">
            <p className="text-sm leading-relaxed text-zinc-400">
              Yes, and this is where the MCP-native design pays off most clearly. Migration in
              Purple8 is not a one-time, human-driven export and import operation. It is an
              ongoing, agent-orchestrated process that runs autonomously until complete, with a
              single human approval gate before the final cutover.
            </p>

            <div className="space-y-2">
              {migrationSteps.map((s) => (
                <div key={s.n} className="flex gap-3 rounded-xl border border-purple-900/25 bg-[#0d0d16] px-4 py-3">
                  <span className="mt-0.5 shrink-0 text-sm font-bold text-purple-400">{s.n}</span>
                  <div>
                    <p className="text-xs font-semibold text-white">{s.t}</p>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-zinc-500">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Reference architecture diagram */}
            <div className="rounded-2xl border border-purple-800/30 bg-[#0d0d16] p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-5">Reference architecture</p>

              <div className="flex flex-col items-center">

                {/* Source systems */}
                <div className="flex w-full max-w-lg gap-2 justify-center">
                  {["Postgres", "Pinecone", "S3 / Files", "Legacy API"].map((src) => (
                    <div key={src} className="flex-1 rounded-lg border border-zinc-800 bg-[#11111b] px-2 py-2 text-center">
                      <p className="text-[10px] text-zinc-500">{src}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col items-center py-2">
                  <div className="h-6 w-px border-l border-dashed border-zinc-700" />
                  <svg className="h-3 w-3 text-zinc-600" fill="currentColor" viewBox="0 0 10 10"><path d="M5 10 L0 3 L10 3 Z" /></svg>
                </div>

                {/* Agent */}
                <div className="rounded-xl border border-violet-800/50 bg-violet-950/20 px-6 py-3 text-center">
                  <p className="text-xs font-semibold text-violet-300">Migration Agent</p>
                  <p className="text-[10px] text-zinc-600 mt-0.5">reads source · calls data.ingest_* · verifies parity</p>
                </div>

                <div className="flex flex-col items-center py-2">
                  <div className="h-6 w-px border-l border-dashed border-zinc-700" />
                  <svg className="h-3 w-3 text-zinc-600" fill="currentColor" viewBox="0 0 10 10"><path d="M5 10 L0 3 L10 3 Z" /></svg>
                </div>

                {/* Journey */}
                <div className="rounded-xl border border-purple-800/50 bg-purple-950/20 px-6 py-3 text-center">
                  <p className="text-xs font-semibold text-purple-300">MigrationJourney</p>
                  <p className="text-[10px] text-zinc-600 mt-0.5">one stage per entity type · SLA monitoring · single HITL approval gate</p>
                </div>

                <div className="flex flex-col items-center py-2">
                  <div className="h-6 w-px border-l border-dashed border-zinc-700" />
                  <svg className="h-3 w-3 text-zinc-600" fill="currentColor" viewBox="0 0 10 10"><path d="M5 10 L0 3 L10 3 Z" /></svg>
                </div>

                {/* Purple8 */}
                <div className="rounded-xl border border-emerald-800/50 bg-emerald-950/20 px-6 py-3 text-center">
                  <p className="text-xs font-semibold text-emerald-300">Purple8 Graph</p>
                  <p className="text-[10px] text-zinc-600 mt-0.5">graph nodes · edges · embeddings · full-text search · all in one process</p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3 text-[11px]">
                <div className="rounded-lg border border-zinc-800 bg-[#11111b] px-3 py-2.5">
                  <p className="font-semibold text-zinc-400 mb-1">No big-bang cutover</p>
                  <p className="text-zinc-600">Source and destination run in parallel throughout the migration. The old system is retired only after parity is confirmed and approved.</p>
                </div>
                <div className="rounded-lg border border-zinc-800 bg-[#11111b] px-3 py-2.5">
                  <p className="font-semibold text-zinc-400 mb-1">One human touchpoint</p>
                  <p className="text-zinc-600">A single approval gate before cutover. The agent handles everything before and after that point without further human involvement.</p>
                </div>
                <div className="rounded-lg border border-zinc-800 bg-[#11111b] px-3 py-2.5">
                  <p className="font-semibold text-zinc-400 mb-1">Full audit trail</p>
                  <p className="text-zinc-600">Every record ingested, every parity check, and every retry is stored as an immutable edge in the graph. Migration history is queryable indefinitely.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
