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
      "A first-class agent interface with 71 tools across 11 namespaces, RBAC-enforced. Claude, Cursor, and Copilot connect directly — no wrapper, no glue code.",
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
      "Purple8 fits its ingest footprint to the RAM you give it — peak memory tracks your hardware, not your corpus size. Validated: 8.84 million passages ingested on a 24 GB machine with peak memory holding around 9 GB. The same corpus runs on a small machine or a large one; you trade time for memory, never correctness.",
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
      "Self-hosted. Ships as a Docker image or pip wheel — runs anywhere Python or containers run. Your data never leaves your infrastructure: no content egress, no vendor access. Optional anonymized version telemetry (no PII, no customer data) is opt-out with one env var. Air-gap capable.",
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
    <section id="features" className="bg-[#0a0a0f] py-24 sm:py-32">
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

      </div>
    </section>
  );
}
