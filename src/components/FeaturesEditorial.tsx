"use client";

/**
 * FeaturesEditorial — Option B + Elements of A
 *
 * Each feature is a full-width asymmetric row that snaps into focus as
 * you scroll. Left: the bold claim + what Purple8 replaces (struck through).
 * Right: the outcome sentence. No cards, no icons, no grid.
 *
 * The "replacement" column (Option A elements) makes the value visceral —
 * you see what disappears, not just what you gain.
 *
 * Swap into page.tsx by replacing <Features /> with <FeaturesEditorial />
 */

const FEATURES = [
  {
    claim: "One process.\nNo orchestration tax.",
    replaces: ["Postgres", "Redis", "Pinecone", "Message queue", "Auth service"],
    outcome:
      "Everything your AI application needs — storage, search, workflow, RAG, auth, encryption — in a single binary on a single port. Not a bundle. One thing.",
  },
  {
    claim: "AI agents operate it natively.",
    replaces: ["Wrapper APIs", "Custom glue code", "Manual orchestration"],
    outcome:
      "A first-class agent interface with 22 tools, RBAC-enforced. Claude, Cursor, and Copilot connect directly. An agent can build, query, and monitor your entire backend without a human writing backend code.",
  },
  {
    claim: "Three RAG modes.\nSelf-tuning.",
    replaces: ["RAG framework", "Embedding pipeline config", "Manual tuning"],
    outcome:
      "Flat vector, graph-augmented, and hybrid retrieval — all built in. The system profiles your corpus and autonomously persists the optimal retrieval configuration. You don't configure RAG. It configures itself.",
  },
  {
    claim: "Workflows without a framework.",
    replaces: ["Airflow", "LangGraph", "LangSmith", "Separate tracing service"],
    outcome:
      "Stateful pipelines, SLA enforcement, human-approval gates, and an immutable audit trail — all stored as data, queryable as data. No DAG files. No separate orchestration service.",
  },
  {
    claim: "Memory bounded by\nhardware, not data.",
    replaces: ["Memory scaling concerns", "Compaction stalls", "RSS growth tuning"],
    outcome:
      "Ingest 2 million records or 20 million — peak memory stays the same. A proprietary property of our storage engine with no known equivalent in any database system.",
  },
  {
    claim: "Documents become\nknowledge, automatically.",
    replaces: ["Unstructured.io", "Custom NER pipeline", "Extraction glue code"],
    outcome:
      "Feed it PDFs, contracts, CAD drawings, BIM models, spreadsheets. A proprietary extraction pipeline — including our own model trained for knowledge-intensive domains — turns unstructured content into structured, traversable knowledge.",
  },
  {
    claim: "Enterprise security,\nday one.",
    replaces: ["Auth0", "Separate KMS", "SIEM / SOC tooling"],
    outcome:
      "Envelope encryption, per-tenant key isolation, four-tier access control, and autonomous threat containment. Not a module you add. Present from the first instantiation, enforced at the storage layer.",
  },
  {
    claim: "You own it.\nCompletely.",
    replaces: ["Vendor lock-in", "Data egress", "SaaS dependencies"],
    outcome:
      "Self-hosted. Native installers for macOS, Linux, and Windows. No telemetry, no data leaving your environment, no vendor access. The same binary runs on a developer laptop and in a regulated, air-gapped enterprise.",
  },
];

export default function FeaturesEditorial() {
  return (
    <section id="features" className="bg-[#0a0a0f]">

      {/* Section header */}
      <div className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 sm:pt-32 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-purple-400">
          Why Purple8
        </p>
        <div className="mt-3 flex items-end justify-between gap-8">
          <h2 className="max-w-2xl text-3xl font-bold text-white sm:text-4xl">
            Your team ships a production AI application
            <span className="text-zinc-500"> without building a backend.</span>
          </h2>
          <p className="hidden max-w-xs text-sm leading-relaxed text-zinc-500 lg:block">
            Eight capabilities. Each one eliminates a category of infrastructure
            your team would otherwise build, operate, and pay for separately.
          </p>
        </div>
      </div>

      {/* Feature rows */}
      <div className="mx-auto mt-16 max-w-7xl divide-y divide-zinc-900 border-t border-zinc-900 px-4 sm:px-6 lg:px-8">
        {FEATURES.map(({ claim, replaces, outcome }, i) => (
          <div
            key={i}
            className="group grid grid-cols-1 gap-8 py-12 transition-colors hover:bg-white/[0.015] sm:py-14 lg:grid-cols-[1fr_auto_1fr] lg:gap-16"
          >
            {/* Left — claim */}
            <div className="flex items-start gap-4">
              <span className="mt-1 shrink-0 text-xs font-semibold tabular-nums text-purple-500 opacity-60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="whitespace-pre-line text-2xl font-bold text-white sm:text-3xl">
                {claim}
              </h3>
            </div>

            {/* Centre — replaces (strikethrough graveyard) */}
            <div className="flex flex-col justify-center gap-2 lg:items-center lg:border-x lg:border-zinc-900 lg:px-12">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">
                Replaces
              </p>
              {replaces.map((item) => (
                <span
                  key={item}
                  className="text-sm text-zinc-600 line-through decoration-zinc-700"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Right — outcome */}
            <div className="flex items-center">
              <p className="text-base leading-relaxed text-zinc-400">
                {outcome}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom breathing room */}
      <div className="h-24 sm:h-32" />

    </section>
  );
}
