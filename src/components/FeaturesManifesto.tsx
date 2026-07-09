"use client";

/**
 * FeaturesManifesto — Option D
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
      "Storage, search, workflow, RAG, auth, and encryption — single binary, single port. Replaces 20+ services before you write a line of code.",
  },
  {
    claim: "AI agents operate it natively.",
    proof:
      "A first-class agent interface with 31 tools, RBAC-enforced. Claude, Cursor, and Copilot connect directly — no wrapper, no glue code.",
  },
  {
    claim: "Three RAG modes. Self-tuning.",
    proof:
      "Flat vector, graph-augmented, and hybrid retrieval built in. The system profiles your corpus and persists the optimal configuration automatically.",
  },
  {
    claim: "Workflows without a framework.",
    proof:
      "Stateful pipelines, SLA enforcement, human-approval gates, and an immutable audit trail built in. Replaces LangChain, LangGraph, LangSmith, and Airflow — no DAG files, no separate orchestration service, no tracing backend.",
  },
  {
    claim: "Memory bounded by hardware, not data.",
    proof:
      "Ingest 2 million records or 20 million — peak memory stays the same. A proprietary property of our storage engine with no known equivalent.",
  },
  {
    claim: "Documents become knowledge, automatically.",
    proof:
      "Feed it PDFs, contracts, CAD drawings, BIM models. A proprietary extraction pipeline turns unstructured content into structured, queryable knowledge.",
  },
  {
    claim: "AI-native. Without burning the planet.",
    proof:
      "One process instead of 20+ services means fewer servers, less idle compute, and no cross-service network waste. The architecture is the efficiency argument — not a benchmark number.",
  },
  {
    claim: "You own it. Completely.",
    proof:
      "Self-hosted. Native installers for macOS, Linux, and Windows. No telemetry, no data egress, no vendor access. Air-gap capable.",
  },
];

export default function FeaturesManifesto() {
  return (
    <section id="features" className="bg-[#0a0a0f] py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* Section label */}
        <p className="text-xs font-semibold uppercase tracking-widest text-purple-400">
          Why Purple8
        </p>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
          Eight reasons it&apos;s a category of one.
        </h2>

        {/* Rows */}
        <div className="mt-16 space-y-0 divide-y divide-zinc-900">
          {EIGHT.map(({ claim, proof }, i) => (
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

      </div>
    </section>
  );
}
