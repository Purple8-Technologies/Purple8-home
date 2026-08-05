"use client";

import { useState } from "react";

const risks = [
  {
    title: "Blast radius vulnerability",
    severity: "Real risk, mitigated by isolation topology",
    severityColour: "text-amber-400 border-amber-800/40 bg-amber-950/20",
    body: "Placing multi-model storage, workflow orchestration, threat detection, and document parsing inside a single process creates a larger blast radius than a microservices architecture. A large bulk ingestion job pushing data through the graph write path competes for memory with live query operations on the same replica. If resource limits are not enforced at the Kubernetes level, a memory spike on one workload can affect everything else running in that replica.",
    mitigation: "Purple8's storage engine uses a seal-and-evict cycle that bounds peak memory per ingestion batch rather than allowing it to grow with corpus size. The hardware-aware auto-configuration, enabled with a single flag on GraphEngine, calculates batch geometry at startup to keep peak process memory within a configurable fraction of available RAM, defaulting to 75%. Beyond that, Purple8 supports dedicated replica sets from the same binary: ingestion nodes and query nodes run as separate Kubernetes Deployments with independent CPU and memory quotas, so an ingestion spike on one set cannot affect query latency on another. That topology requires deliberate configuration upfront. Teams running a single undifferentiated replica pool without resource quotas carry more blast radius exposure than they would with isolated microservices.",
    mitigationLabel: "What we do about it",
  },
  {
    title: "Single release cadence",
    severity: "Real constraint, worth planning for",
    severityColour: "text-amber-400 border-amber-800/40 bg-amber-950/20",
    body: "A single binary means every capability ships in the same release. A team that finds a bug in their RAG retrieval path cannot patch and redeploy that capability in isolation. They must build, test, and release the entire product artifact, including the storage engine, authentication layer, and everything else, regardless of whether those components changed.",
    mitigation: "Purple8's blue/green deployment model means a full release is a four-step operation with zero downtime: spin up new replicas, warm the vector index, cut over the load balancer, drain the old set. The mechanical cost of releasing the full artifact is lower than it looks. The real consideration is test coverage: any release that touches the storage or write-ahead log path should go through the full regression suite. For teams iterating rapidly on a specific capability early in development, that full pipeline adds overhead that isolated microservices would not impose. For production systems where the storage and authentication layers are stable, this constraint rarely surfaces.",
    mitigationLabel: "The honest assessment",
  },
  {
    title: "Resource contention within a single process",
    severity: "Real risk at high concurrency, addressable by horizontal scale",
    severityColour: "text-amber-400 border-amber-800/40 bg-amber-950/20",
    body: "Purple8's vector search index is held entirely in memory. Graph traversals read from the storage engine at query time. The Journey Engine's SLA monitor runs as a live background process. The SOC agent evaluates threat detection rules continuously. All of these compete for the same CPU and memory on a single replica. In a microservices architecture each workload gets its own process with its own resource envelope. A spike in vector search concurrency can affect graph traversal latency on the same node if it is not sized for the combined load.",
    mitigation: "Horizontal scaling adds capacity to the whole node. That is less surgical than scaling a single microservice, but the operational cost is also far lower: one replica count change rather than identifying which of twelve services is under pressure and managing the downstream effects. The dedicated replica topology handles the most common case, separating bulk ingestion from latency-sensitive query traffic, with no code changes required. For teams with predictable, relatively homogeneous workloads the contention concern is manageable with correct node sizing. For teams running unpredictable concurrent spikes across vector search, graph traversal, and workflow execution simultaneously, workload separation and capacity planning require more upfront work than isolated services would.",
    mitigationLabel: "What we do about it",
  },
];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <span className={`shrink-0 flex h-6 w-6 items-center justify-center rounded-full border transition-all duration-200 ${open ? "border-amber-600 bg-amber-600/20 text-amber-300 rotate-180" : "border-zinc-700 text-zinc-500"}`}>
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </span>
  );
}

export default function HonestRisks() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="mt-10 space-y-3">
      {risks.map((r, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className={`rounded-2xl border transition-colors duration-200 ${isOpen ? "border-amber-800/50 bg-[#11111b]" : "border-zinc-800 bg-[#11111b] hover:border-zinc-700"}`}
          >
            <button
              className="flex w-full items-start justify-between gap-4 px-7 py-5 text-left"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <div className="flex flex-col gap-1.5">
                <span className="text-base font-semibold text-white leading-snug">{r.title}</span>
                <span className={`inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${r.severityColour}`}>
                  {r.severity}
                </span>
              </div>
              <ChevronIcon open={isOpen} />
            </button>

            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"}`}>
              <div className="px-7 pb-7 space-y-4">
                <p className="text-sm leading-relaxed text-zinc-400">{r.body}</p>
                <div className="rounded-xl border border-zinc-800 bg-[#0d0d16] px-5 py-4">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500 mb-2">{r.mitigationLabel}</p>
                  <p className="text-sm leading-relaxed text-zinc-400">{r.mitigation}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
