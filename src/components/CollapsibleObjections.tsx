"use client";

import { useState } from "react";

const objections = [
  {
    q: "\"Single process means single point of failure.\"",
    a: "High availability on Purple8 means 3 replicas of one binary, not 36 instances of 12 separate services. You get the same resilience with a dramatically smaller operational surface. Each replica is stateless at the app layer; state lives in the storage engine which handles write-ahead log replication between nodes.",
  },
  {
    q: "\"Monoliths don't scale.\"",
    a: "Consolidith scales down to a laptop and up to horizontal replicas without changing a line of application code. What it eliminates is scaling complexity, not scaling capability. The hardware-bounded memory model means you never need to re-provision infrastructure because your data set doubled.",
  },
  {
    q: "\"What if one capability (e.g. vector search) consumes too many resources — can I scale just that part?\"",
    a: "Yes. Because all capabilities share the same process and the same storage engine, resource pressure is visible in one place rather than scattered across 12 dashboards. You scale the whole node horizontally (add a replica), and the load balancer routes vector-heavy queries to the least-loaded node automatically. In practice, this is simpler than microservices: you don't need to identify which of 12 services is the bottleneck, provision it separately, and then manage inter-service traffic. You add one node. If a specific workload genuinely needs isolation (say, bulk document ingestion running alongside latency-sensitive API queries) Purple8 supports deployment topologies where ingestion nodes and query nodes run as separate replica sets from the same binary, with no code changes required.",
  },
  {
    q: "\"You'll be locked in.\"",
    a: "Every capability is exposed via standard REST or MCP tools. Your application talks HTTP and nothing else. Swap the backend, keep the interface. AI agents don't know or care what runs underneath their tool calls. The same lock-in question applies equally to every service you currently depend on, multiplied by 12.",
  },
];

export default function CollapsibleObjections() {
  const [open, setOpen] = useState<number | null>(null);

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
              <span className="text-base font-semibold text-zinc-300 italic leading-snug">
                {o.q}
              </span>
              <span
                className={`mt-0.5 shrink-0 flex h-6 w-6 items-center justify-center rounded-full border transition-all duration-200 ${
                  isOpen
                    ? "border-purple-600 bg-purple-600/20 text-purple-300 rotate-180"
                    : "border-zinc-700 text-zinc-500"
                }`}
              >
                <svg
                  className="h-3.5 w-3.5 transition-transform duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="px-7 pb-6 text-sm leading-relaxed text-zinc-400">{o.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
