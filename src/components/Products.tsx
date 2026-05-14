const hyperGraphFeatures = [
  "Graph + vector + document store + full-text — one embedded engine, no JVM, no external services",
  "openCypher query language with native hybrid graph-vector search",
  "Journey Engine: stateful workflow orchestration with SLA monitoring & human-in-the-loop",
  "Native MCP server — Flat Vector, GraphRAG & Hybrid RAG exposed as native AI agent tools",
  "SuperGraph Federation: cross-instance Cypher with explicit human approval gates",
  "AES-256-GCM envelope encryption via Local, Vault, AWS KMS, GCP KMS, or Azure Key Vault",
  "Multi-tenancy with per-tenant DEK — tenant isolation enforced at the storage layer",
  "Rust-accelerated core for full-text search, SLA scanning & document indexing",
];

const docIntelFeatures = [
  "PDF, DOCX, XLSX, PPTX, HTML, TXT, CSV, EML, EPUB — all standard enterprise formats",
  "IFC/IFCZIP (IFC2x3/4/4x3), DXF, DWG, STEP, STL, OBJ, GLTF/GLB, G-code — CAD & BIM native",
  "Sketch & whiteboard analysis via GPT-4o vision, Azure AI Vision, or Google Vision",
  "5 OCR engines: Tesseract · Azure Document Intelligence · Google Vision · AWS Textract · Purple8 OCR",
  "Purple8 OCR — self-hosted, zero data egress: proprietary preprocessing pipeline with layout detection and table reconstruction. Keeps sensitive documents entirely within your infrastructure.",
  "Proprietary GLiNER-Purple8 NER model fine-tuned on domain corpora — multi-stage entity and relationship extraction",
  "Connectors: SharePoint (MS Graph), Confluence, AWS S3, generic webhook (batch + push)",
  "SSE streaming results, Redis-backed job store, concurrent pipeline with backpressure control",
  "Emits structured entity graphs directly into Purple8 Hyper Graph",
  "Sends agentic hints to Hyper Graph for optimised chunking and embedding strategy",
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
            Purpose-built AI infrastructure
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-zinc-500">
            Two production-ready products that give AI applications the
            infrastructure they actually need — not retrofitted databases, not
            plugins. Built AI-native from the ground up.
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
                <h3 className="text-xl font-bold text-white">Purple8 Hyper Graph</h3>
                <span className="rounded-full border border-purple-700/40 bg-purple-900/30 px-2.5 py-0.5 text-xs text-purple-400">v0.46</span>
              </div>
              <p className="mt-1 text-sm text-zinc-500">Hyper Graph — a category of one</p>

              <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                A unified embedded engine combining graph storage, vector search, document
                store, and full-text search. Ships with a Journey Engine for stateful AI
                workflows, a native MCP server, three production RAG architectures, and AES-256-GCM
                envelope encryption. No JVM. No Docker required.{" "}
                <code className="rounded bg-zinc-900 px-1.5 py-0.5 text-xs text-purple-300">
                  pip install purple8-hyper-graph
                </code>
              </p>

              {/* Live benchmark pills */}
              <div className="mt-5 flex flex-wrap gap-2">
                <ProductBadge label="openCypher" />
                <ProductBadge label="Journey Engine" />
                <ProductBadge label="MCP Native" />
                <ProductBadge label="Claude Code" />
                <ProductBadge label="Cursor" />
                <ProductBadge label="GitHub Copilot" />
                <ProductBadge label="SuperGraph" />
                <ProductBadge label="Rust Core" />
              </div>

              <FeatureList items={hyperGraphFeatures} />

              <div className="mt-8 flex items-center gap-4">
                <a href="#waitlist" className="rounded-full bg-purple-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-500">
                  Request Access
                </a>
                <a href="#features" className="text-sm text-purple-400 hover:text-purple-300">
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
                <span className="rounded-full border border-violet-700/40 bg-violet-900/30 px-2.5 py-0.5 text-xs text-violet-400">v0.8</span>
              </div>
              <p className="mt-1 text-sm text-zinc-500">Document intelligence microservice</p>

              <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                A stateless document intelligence microservice that parses 70+ enterprise document formats —
                including CAD/DXF, BIM/IFC, sketches, and audio — through a proprietary NER model
                (GLiNER-Purple8) and LLM-assisted extraction. Emits structured entity graphs
                directly into Purple8 Hyper Graph.
              </p>

              {/* Stat pills */}
              <div className="mt-5 flex flex-wrap gap-2">
                <ProductBadge label="70+ File Formats" />
                <ProductBadge label="CAD & BIM/IFC Native" />
                <ProductBadge label="Zero Data Egress" />
                <ProductBadge label="Self-Hosted OCR" />
                <ProductBadge label="Parallel Extraction" />
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <ProductBadge label="GLiNER-Purple8" />
                <ProductBadge label="SharePoint" />
                <ProductBadge label="Confluence" />
              </div>

              <FeatureList items={docIntelFeatures} />

              <div className="mt-8 flex items-center gap-4">
                <a href="#waitlist" className="rounded-full bg-purple-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-500">
                  Request Access
                </a>
                <a href="#features" className="text-sm text-purple-400 hover:text-purple-300">
                  Explore features →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Coming soon teaser */}
        <div className="mt-8 rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/30 px-8 py-6 text-center">
          <p className="text-sm text-zinc-600">
            More products coming soon —{" "}
            <a href="#waitlist" className="text-purple-400 hover:text-purple-300">
              join the waitlist
            </a>{" "}
            to get notified.
          </p>
        </div>
      </div>
    </section>
  );
}
