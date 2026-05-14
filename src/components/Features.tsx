const features = [
  {
    category: "Hyper Graph",
    title: "Three RAG Architectures, One Engine",
    description:
      "Three production RAG architectures in a single engine: Flat Vector (MRR 0.64), GraphRAG with multi-hop subgraph context (MRR 0.76), and Hybrid Graph-Vector RAG with result fusion and semantic path scoring (MRR 0.85 — 117% multi-hop improvement over flat vector). All three exposed as native MCP tools.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
      />
    ),
    color: "purple",
  },
  {
    category: "Hyper Graph",
    title: "Bring Your Own Model",
    description:
      "Purple8 is fully model-agnostic. Use OpenAI, Anthropic, Google Gemini, Mistral, or any self-hosted open-weight model — Llama, Phi, Qwen, and others. Plug in your own embeddings, your own LLM, your own inference stack. Purple8 handles the graph, vector, and retrieval layer; you stay in control of the AI.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z"
      />
    ),
    color: "purple",
  },
  {
    category: "Hyper Graph",
    title: "Journey Engine",
    description:
      "Stateful workflow orchestration baked into the database. Define multi-step AI pipelines with SLA monitoring, automatic retry, and human-in-the-loop review queues. Benchmarked at sub-millisecond stage advance, hundreds of journey instances per second at scale — no external orchestrator required.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
      />
    ),
    color: "purple",
  },
  {
    category: "Hyper Graph",
    title: "Native MCP Server",
    description:
      "The first MCP-native graph database. Works out of the box with Claude Code, Cursor, GitHub Copilot, Windsurf, and any MCP-compatible AI tool or agent framework. LLM agents query knowledge graphs, run vector similarity search, and trigger journeys as native tools — without custom glue code. Sub-millisecond node lookup latency.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z"
      />
    ),
    color: "violet",
  },
  {
    category: "Hyper Graph",
    title: "SuperGraph Federation",
    description:
      "Enterprise cross-instance graph federation. Declare peers, require explicit human approval before any peer is queried, execute federated openCypher across approved instances in parallel, and stitch results with partial-result honesty — no silent data gaps.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253"
      />
    ),
    color: "purple",
  },
  {
    category: "Hyper Graph",
    title: "Multi-Tenancy & Envelope Encryption",
    description:
      "Per-tenant AES-256-GCM envelope encryption via Local, HashiCorp Vault, AWS KMS, GCP KMS, or Azure Key Vault. Sub-millisecond DEK cache hits. Zero overhead on write operations. 500k+ QPS aggregate throughput, sub-10ms tenant provisioning, 0 isolation leaks across 500 tenants.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
      />
    ),
    color: "violet",
  },
  {
    category: "DocIntel",
    title: "GLiNER-Purple8 NER Model",
    description:
      "A proprietary named-entity-recognition model fine-tuned on domain-specific corpora across engineering, legal, financial, and AEC documents. Proprietary multi-stage pipeline for entity extraction and relationship linking — with deduplication across large document sets.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
      />
    ),
    color: "violet",
  },
  {
    category: "DocIntel",
    title: "70+ Format Extraction incl. CAD & BIM",
    description:
      "PDF, DOCX, XLSX, PPTX, HTML, CSV, EML — plus IFC/IFCZIP (10-section structured BIM output), DXF/DWG, STEP, STL, OBJ, GLTF, G-code, and sketch/whiteboard analysis. Five OCR engines including Purple8 OCR — a self-hosted, zero-egress option with proprietary preprocessing and layout detection for documents that can't leave your infrastructure. All through a single API.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
      />
    ),
    color: "violet",
  },
  {
    category: "DocIntel",
    title: "Enterprise Connectors",
    description:
      "SharePoint (MS Graph API), Confluence, AWS S3, and generic webhook — each supporting both batch pull and push webhooks. SSE streaming results per job. Redis-backed job store for multi-worker deployments. Secure URL processing and Bearer auth throughout.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
      />
    ),
    color: "purple",
  },
];

type Color = "purple" | "violet";

const colorMap: Record<Color, { badge: string; icon: string; glow: string }> = {
  purple: {
    badge: "bg-purple-500/10 text-purple-400",
    icon: "bg-purple-600/20 text-purple-400",
    glow: "bg-purple-700/10 group-hover:bg-purple-600/20",
  },
  violet: {
    badge: "bg-violet-500/10 text-violet-400",
    icon: "bg-violet-600/20 text-violet-400",
    glow: "bg-violet-700/10 group-hover:bg-violet-600/20",
  },
};

export default function Features() {
  return (
    <section id="features" className="bg-[#0d0d17] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
            Core Capabilities
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Enterprise-grade from day one
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-zinc-500">
            Every capability ships in the core — not bolted on. Hyper Graph and
            DocIntel give AI applications the infrastructure primitives they
            need to reason, retrieve, and act reliably at scale.
          </p>
        </div>

        {/* Feature grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => {
            const c = colorMap[f.color as Color];
            return (
              <div
                key={f.title}
                className="group relative overflow-hidden rounded-2xl border border-zinc-800/60 bg-[#11111b] p-6 transition-all hover:border-zinc-700/60"
              >
                {/* Glow */}
                <div
                  className={`pointer-events-none absolute -top-16 -right-16 h-32 w-32 rounded-full blur-3xl transition-all ${c.glow}`}
                />

                <div className="relative">
                  {/* Category badge */}
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${c.badge}`}
                  >
                    {f.category}
                  </span>

                  {/* Icon */}
                  <div
                    className={`mt-4 inline-flex h-10 w-10 items-center justify-center rounded-xl ${c.icon}`}
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      {f.icon}
                    </svg>
                  </div>

                  <h3 className="mt-4 text-base font-semibold text-white">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                    {f.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
