const hyperGraphFeatures = [
  "Write only the frontend — storage, search, RAG, workflows, auth, and encryption are all Purple8",
  "Storage, vector search, document store, and full-text — one embedded engine, one process, one port",
  "Native hybrid search with a cost-based query planner — no separate search service",
  "Three built-in RAG modes: flat vector, graph-augmented, and hybrid — MRR 0.85 on the hybrid path",
  "Autonomous RAG tuning — the system profiles your corpus and persists optimal retrieval configuration",
  "Stateful workflow engine: multi-stage pipelines, SLA monitoring, human-approval gates, AI step persistence",
  "49-tool MCP agent interface — RBAC-enforced, works with Claude, Cursor, Copilot, and any MCP-compatible agent",
  "Cross-instance federated queries with human approval gates",
  "AES-256-GCM envelope encryption via Local, Vault, AWS, GCP, or Azure key management",
  "Per-tenant storage isolation enforced at the brick layer — not row filtering. Each tenant gets cryptographically separate data partitions with autonomous threat detection.",
  "Browser-based admin console — zero npm, zero config",
];

const docIntelFeatures = [
  "PDF, DOCX, XLSX, PPTX, HTML, EML, EPUB, TXT/CSV — all standard enterprise formats",
  "IFC/IFCZIP, DXF, DWG, STEP, STL, OBJ, GLTF/GLB, G-code — full CAD & BIM native",
  "SAP IDocs, financial XML, structured config formats",
  "Proprietary NER model — two-pass hybrid: named entity extraction + LLM relationship mapping",
  "Five OCR engines including a self-hosted option — documents never leave your infrastructure",
  "Self-hosted OCR with proprietary preprocessing, layout detection, and table reconstruction",
  "75+ language detection — entity names extracted in their native script",
  "Five domain extraction profiles: AEC · Contract · Financial · Scientific · General",
  "Connectors: SharePoint, Confluence, AWS S3, and generic webhook — batch and push modes",
  "Emits structured knowledge directly into Purple8; sends optimised embedding hints automatically",
];

function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm text-zinc-400">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-600/20 text-purple-400">
            <svg
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function ProductBadge({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-0.5 text-xs font-medium text-purple-300">
      {label}
    </span>
  );
}

export default function Products() {
  return (
    <section id="products" className="bg-[#0a0a0f] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
            Products
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Two products. Your whole backend.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-500">
            <span className="text-zinc-300">Purple8</span> is the backend your app
            runs on — storage, search, RAG, workflows, auth, and encryption in one
            process. <span className="text-zinc-300">DocIntel</span> turns any
            document into queryable knowledge inside it. Together they replace 20+
            services — you build only the frontend.
          </p>
        </div>

        {/* Product cards */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {/* ── Hyper Graph ── */}
          <div className="group relative overflow-hidden rounded-2xl border border-purple-900/40 bg-[#11111b] p-8 transition-all hover:border-purple-600/50">
            <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-purple-700/10 blur-3xl transition-all group-hover:bg-purple-600/20" />

            <div className="relative">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600/20">
                <svg className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                </svg>
              </div>

              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold text-white">Purple8</h3>
              </div>
              <p className="mt-1 text-sm text-zinc-500">A category of one</p>

              <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                A unified AI-native backend — storage, vector search, document store,
                full-text, workflow orchestration, RAG, auth, and encryption in a single
                process. No JVM. No external services. Docker image and pip wheel
                available.
              </p>

              {/* Capability badges */}
              <div className="mt-5 flex flex-wrap gap-2">
                <ProductBadge label="Agent Native" />
                <ProductBadge label="Stateful Workflows" />
                <ProductBadge label="Hybrid RAG" />
                <ProductBadge label="Claude" />
                <ProductBadge label="Cursor" />
                <ProductBadge label="GitHub Copilot" />
                <ProductBadge label="Federated Queries" />
                <ProductBadge label="Air-Gap Ready" />
              </div>

              <FeatureList items={hyperGraphFeatures} />

              <div className="mt-8 flex items-center gap-4">
                <a href="/#pricing" className="rounded-full bg-purple-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-500">
                  Get Started
                </a>
                <a href="/features" className="text-sm text-purple-400 hover:text-purple-300">
                  Explore features →
                </a>
              </div>
            </div>
          </div>

          {/* ── DocIntel ── */}
          <div className="group relative overflow-hidden rounded-2xl border border-purple-900/40 bg-[#11111b] p-8 transition-all hover:border-purple-600/50">
            <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-violet-700/10 blur-3xl transition-all group-hover:bg-violet-600/20" />

            <div className="relative">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600/20">
                <svg className="h-6 w-6 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>

              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold text-white">Purple8 DocIntel</h3>
              </div>
              <p className="mt-1 text-sm text-zinc-500">Document intelligence microservice</p>

              <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                A stateless document intelligence microservice that parses 70+ enterprise
                document formats — including CAD, BIM, sketches, and audio — through a
                proprietary extraction model and LLM-assisted relationship mapping. Emits
                structured knowledge directly into Purple8.
              </p>

              {/* Stat pills */}
              <div className="mt-5 flex flex-wrap gap-2">
                <ProductBadge label="70+ File Formats" />
                <ProductBadge label="CAD & BIM Native" />
                <ProductBadge label="Zero Data Egress" />
                <ProductBadge label="Self-Hosted OCR" />
                <ProductBadge label="Parallel Extraction" />
                <ProductBadge label="SharePoint" />
                <ProductBadge label="Confluence" />
              </div>

              <FeatureList items={docIntelFeatures} />

              <div className="mt-8 flex items-center gap-4">
                <a href="/#pricing" className="rounded-full bg-purple-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-500">
                  Get Started
                </a>
                <a href="/features" className="text-sm text-purple-400 hover:text-purple-300">
                  Explore features →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Coming soon teaser */}
        <div className="mt-8 rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/30 px-8 py-6 text-center">
          <p className="text-sm text-zinc-600">
            More products coming soon.
          </p>
        </div>
      </div>
    </section>
  );
}
