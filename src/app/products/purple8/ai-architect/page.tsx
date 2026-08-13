import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "AI Architect Intelligence — Purple8 Hyper Graph",
  description:
    "Purple8 Hyper Graph is the knowledge backend behind Purple8 AI Architect. Every drawing, compliance check, structural analysis, RIBA stage, and design decision is a node and edge in the project graph — queryable, auditable, and AI-ready from day one.",
  path: "/products/purple8/ai-architect",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "AI Architect Intelligence — Purple8 Hyper Graph",
  description:
    "Architecture software stores files. Purple8 Hyper Graph stores knowledge. Every room, wall, structural element, compliance clause, cost estimate, design decision, and RIBA stage transition is a typed node in the project graph. AI Architect runs on top of that graph. When you ask a question in Chat, the answer comes from your actual project — not a generic model.",
  url: "https://www.purple8.ai/products/purple8/ai-architect/",
  publisher: { "@type": "Organization", name: "Purple8 Inc.", url: "https://www.purple8.ai" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.purple8.ai/" },
      { "@type": "ListItem", position: 2, name: "Purple8 Hyper Graph", item: "https://www.purple8.ai/products/purple8/" },
      { "@type": "ListItem", position: 3, name: "AI Architect Intelligence", item: "https://www.purple8.ai/products/purple8/ai-architect/" },
    ],
  },
  mainEntity: {
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How is this different from Autodesk's AI features?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Autodesk AI works within Autodesk's file formats and data model. Purple8 Hyper Graph is the data layer: every room, element, compliance clause, cost estimate, design decision, and project stage lives as a graph node with typed relationship edges. AI Architect's chat, algorithms, and collaboration features all query that graph directly. You can ask a question across your entire project history — not just the open file.",
        },
      },
      {
        "@type": "Question",
        name: "How does the project knowledge graph work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Every interaction with AI Architect writes to the graph. A room drawn on Canvas becomes a Space node. A compliance check becomes a ComplianceIssue edge. A stage advance becomes an immutable JourneyInteraction node. An IFC upload becomes IfcEntity nodes with DERIVED_FROM provenance edges. The hybrid RAG engine queries all of it — vector similarity plus graph traversal — to ground every AI chat response in your actual project data.",
        },
      },
      {
        "@type": "Question",
        name: "What are the Phase 8 algorithms?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Twelve graph algorithm phases run directly against the live project graph: Space Syntax and VGA integration scoring, structural topology rigidity and load path tracing, MEP max-flow and thermal zone simulation, generative design with constraint propagation, spectral analysis and robustness indexing, IFC ingestion and clash detection, hypergraph analysis, and MORL multi-objective optimisation with GCN. Each phase runs against the actual project graph — not a static file export.",
        },
      },
      {
        "@type": "Question",
        name: "How does multi-user collaboration work without a WebSocket server?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Canvas shapes are persisted to Purple8 Graph as CanvasShape nodes via Cypher. Outbound changes debounce at 2 seconds and diff against a serialised-length fingerprint. Inbound changes poll every 4 seconds. Last-Write-Wins merge is applied in-client. Live cursors are broadcast and received via Purple8 Graph's Change Data Capture SSE stream. Multiple architects see each other's work in near real-time without any WebSocket infrastructure.",
        },
      },
      {
        "@type": "Question",
        name: "How does the Design Process Graph work with human-in-the-loop?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Design Process Graph is a six-gate orchestrator backed by the Purple8 Journey Engine — not an in-process state machine. Every gate entry, artefact, pass, and fail is an immutable interaction node in the project graph. Gates 2, 3, and 4 are human-in-the-loop checkpoints: the agent returns a hitl_required signal, the architect reviews and approves, and the next gate resumes by reconstructing state from the journey audit trail. No in-memory state is required. The process is resumable across server restarts.",
        },
      },
    ],
  },
};

const patterns = [
  {
    number: "01",
    icon: "🧠",
    title: "Project Knowledge Graph",
    subtitle: "Graph-Native Data Model",
    desc: "Architecture software stores files. Purple8 stores knowledge. Every room, wall, structural element, compliance clause, cost estimate, RFI, spec, and BIM element is a typed node with relationship edges. When you ask a question in Chat, the hybrid RAG engine traverses vector similarity and graph relationships simultaneously — grounding every answer in your actual project, not a generic model. The entire project history is queryable from day one.",
    tags: ["Hybrid RAG", "Cypher traversal", "BIM graph", "Project memory"],
  },
  {
    number: "02",
    icon: "🏗️",
    title: "Design Process Graph",
    subtitle: "Six-Gate Orchestration · HITL",
    desc: "The Design Process Graph is a six-gate orchestrator backed by the Purple8 Journey Engine. It is not an in-process state machine. Every gate entry, artefact, pass, and fail is an immutable interaction node in the project graph — queryable, auditable, and resumable across restarts. Gates 2, 3, and 4 are HITL checkpoints: the architect reviews, approves, and the next gate resumes from the graph audit trail. The QCRT framework scores every design option on Quality, Code compliance, Risk, and Time.",
    tags: ["Journey Engine", "HITL gates", "QCRT framework", "Immutable audit"],
  },
  {
    number: "03",
    icon: "📐",
    title: "Precision Vector Canvas",
    subtitle: "GEA · GIA · NLA · AI Overlays",
    desc: "The Canvas is a 4,160-line vector drawing surface backed by a Web Worker. GEA/GIA/NLA area layers to RICS standard. Shoelace signed area. Arc tool with 3-point circumcircle. Space Syntax VGA overlays, structural span warnings, and wellbeing score — all computed in the Web Worker, all sourced from the project graph. The 3D view extrudes rooms and generates wall geometry with door and window openings from the same graph data. Solar overlay runs latitude-accurate sun paths from live GPS.",
    tags: ["GEA/GIA/NLA", "Space Syntax VGA", "Three.js 3D", "Solar path", "Web Worker"],
  },
  {
    number: "04",
    icon: "🤝",
    title: "Multi-User Collaboration via Graph CDC",
    subtitle: "Live Cursors · Shape Sync · No WebSocket",
    desc: "Canvas shapes sync to Purple8 Graph as CanvasShape nodes via Cypher. Outbound changes debounce at 2 seconds against a diff fingerprint. Inbound poll every 4 seconds with Last-Write-Wins merge. Live cursors broadcast and receive through the Purple8 Graph Change Data Capture SSE stream — colour-coded with user initials. Multiple architects see each other's work in near real-time with no WebSocket server required.",
    tags: ["CDC SSE", "LWW merge", "Shape sync", "Cursor presence"],
  },
  {
    number: "05",
    icon: "⚡",
    title: "Phase 8 Algorithm Suite",
    subtitle: "12 Graph Algorithms · Live Project Data",
    desc: "Twelve algorithm phases run directly against the live project graph. Space Syntax and VGA integration scoring. Structural topology rigidity and load path tracing via Tarjan and Dijkstra. MEP max-flow with Edmonds-Karp. Generative design via constraint propagation and Louvain community detection. Spectral analysis and Fiedler value for robustness. SIMP topology optimisation. MORL with GCN multi-objective optimisation. Hypergraph minimum transversal. Every result writes back to the graph as metadata, available to the next AI chat response.",
    tags: ["Space Syntax", "Structural topology", "MEP max-flow", "Generative design", "GCN"],
  },
  {
    number: "06",
    icon: "📋",
    title: "RIBA Lifecycle — Journey Engine",
    subtitle: "14 Stages · Immutable Audit Trail",
    desc: "14 RIBA-mapped project stages from concept brief to post-occupancy evaluation, managed by the Purple8 Journey Engine as graph state. Stage advance is restricted to principal architect role. Each transition is an immutable JourneyInteraction node. SLA monitoring is a graph query against stage timestamps. Scenario branching stores up to 5 named snapshots. The project brief is extracted from Chat conversation in real-time and pre-fills the Journey onboarding form — no re-entering what the AI already captured.",
    tags: ["14 RIBA stages", "SLA monitoring", "Scenario branching", "RBAC"],
  },
  {
    number: "07",
    icon: "🏛️",
    title: "AEC Compliance Intelligence",
    subtitle: "NBC · IBC · RERA · HDB · Neufert",
    desc: "The floor plan compliance engine checks against NBC India 2016, IBC 2021, RERA, HDB Singapore, BS 6465, and Neufert dimensional standards. Building code and regulatory nodes are continuously hydrated into the graph by the Knowledge Hydrator — Gemini 2.5 Flash with Google Search grounding against an official domain allowlist. Every compliance check cites the exact clause reference. Market price nodes for 30+ global markets with RICS BCIS, Turner & Townsend, JLL, and RLB sources update the cost estimator in real time.",
    tags: ["NBC/IBC/RERA", "Knowledge Hydrator", "Clause references", "30+ markets"],
  },
  {
    number: "08",
    icon: "📄",
    title: "IFC Round-Trip & DocIntel",
    subtitle: "Import · Extract · Commit · Export",
    desc: "IFC import via ifcopenshell processes 12 IFC classes: Wall, Column, Beam, Slab, Window, Door, Stair, Ramp, DuctSegment, PipeSegment, Space, Zone. Each entity lands as an IfcEntity staging node with a DERIVED_FROM provenance edge to its native graph node. DocIntel ingests PDF, IFC, DXF, DOCX, and HTML documents through a 4-step wizard — source, extract, compare, commit. Extracted entities become graph nodes queryable by the hybrid RAG engine. IFC export is JSON-LD with IFC 4.3 entity mapping.",
    tags: ["ifcopenshell", "IFC 4.3", "DocIntel", "Provenance edges"],
  },
  {
    number: "09",
    icon: "🎨",
    title: "AI Massing, Layout, and Render",
    subtitle: "Graph-Derived Strategies · FAL/FLUX",
    desc: "The massing generator derives the site polygon from the largest closed Canvas shape and sends it to the massing tool with FAR, setbacks, and storey count. Three strategies — Compact Bar, Linear Slab, Split Wings — generate as graph-computed options with area schedules and SVG thumbnails. The layout engine runs Vastu, Intelligent Grid, and Compact Cluster strategies in parallel, applying graph-based adjacency scoring and the correct ft-to-px coordinate transform with Y-axis flip. Renders run via FAL/FLUX image-to-image on floor plan or 3D scene captures.",
    tags: ["Massing generator", "Layout AI", "Vastu", "FAL/FLUX renders"],
  },
  {
    number: "10",
    icon: "🖊️",
    title: "Apple Pencil Sketch with AI Handoff",
    subtitle: "Freehand · Interpret · Render · Journey",
    desc: "The Sketch surface handles pressure, tilt, and coalesced Apple Pencil events with EMA stroke stabilisation. Three brush styles, 8 layers with per-layer undo, mirror symmetry, and an underlay import for tracing. AI Interpret runs a Gemini pass over the sketch and returns room labels and spatial reads. Render produces a photorealistic architectural render via FAL/FLUX. Send to Project flattens the sketch to JPEG and attaches it to the active project stage via sessionStorage handoff — no file upload, no re-navigation.",
    tags: ["Apple Pencil", "EMA stabilisation", "AI Interpret", "Journey handoff"],
  },
];

const comparison = [
  { item: "Project data model", legacy: "Files in a folder hierarchy", purple8: "Typed graph nodes with relationship edges" },
  { item: "AI grounding", legacy: "Generic model, no project context", purple8: "Hybrid RAG over your actual project graph" },
  { item: "Compliance checks", legacy: "Manual lookup against PDFs", purple8: "Live graph nodes from continuously updated sources" },
  { item: "Multi-user collaboration", legacy: "File locking or cloud sync", purple8: "Graph CDC with LWW merge and live cursors" },
  { item: "Algorithm results", legacy: "One-off export to third-party solver", purple8: "Written back to graph, available to next AI query" },
  { item: "Project lifecycle", legacy: "Spreadsheet or project management tool", purple8: "14 RIBA stages as immutable graph state" },
  { item: "Design audit trail", legacy: "Reconstructed from email and file history", purple8: "Every decision an immutable graph edge, timestamped" },
];

const targetCustomers = [
  {
    icon: "🏢",
    title: "Architecture Firms",
    desc: "From concept brief to post-occupancy evaluation. Chat with your project in plain English, draw on a precision canvas, run compliance against live building codes, and manage the full RIBA lifecycle without switching tools. The knowledge graph accumulates across every project — institutional knowledge that does not leave when a principal does.",
  },
  {
    icon: "🏗️",
    title: "Engineering Consultancies",
    desc: "Structural topology, MEP flow, and spectral analysis running against the live project graph. Phase 8 algorithms cover Maxwell rigidity, Tarjan bridge detection, Edmonds-Karp max-flow, Fiedler spectral bisection, and SIMP topology optimisation. Results write back to the graph and become available to the next AI query in the same session.",
  },
  {
    icon: "🏛️",
    title: "Government & Public Sector AEC",
    desc: "Compliance against NBC India 2016, IBC 2021, RERA, and HDB Singapore — continuously updated from official sources via the Knowledge Hydrator. Full immutable audit trail on every design decision, stage transition, and approval. On-premise or private cloud deployment with KMS encryption at rest.",
  },
  {
    icon: "🌐",
    title: "BIM & Digital Twin Platforms",
    desc: "Purple8 Graph is the knowledge layer your BIM platform is missing. IFC round-trip with provenance edges, clash detection via graph traversal, change impact propagation via BFS, and a hybrid RAG engine that can answer questions about your model without a file export. Embed via API or deploy as a standalone service.",
  },
  {
    icon: "🎓",
    title: "Architectural Education",
    desc: "A full professional design environment in the browser. Canvas runs on iPad with Apple Pencil. Chat explains compliance, spatial logic, and cultural design frameworks from first principles. Phase 8 algorithms introduce students to computational design methods through live projects, not synthetic datasets.",
  },
  {
    icon: "🏘️",
    title: "Real Estate Developers",
    desc: "Site massing analysis, cost estimation across 30+ global markets, solar and GIS analysis, and feasibility scoring before the first planning application. The project brief extracted from Chat pre-fills the Journey onboarding form. Cost nodes update from RICS BCIS, Turner & Townsend, JLL, and RLB sources automatically.",
  },
];

export default function AiArchitectIntelligencePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main id="main-content" className="bg-[#0a0a0f] pt-16">

        {/* Breadcrumb */}
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-8">
          <nav className="flex items-center gap-2 text-xs text-zinc-600">
            <Link href="/" className="hover:text-zinc-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products/purple8/" className="hover:text-zinc-400 transition-colors">Purple8 Hyper Graph</Link>
            <span>/</span>
            <span className="text-zinc-400">AI Architect Intelligence</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden py-20">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-48 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-teal-900/10 blur-3xl" />
            <div className="absolute top-32 -right-32 h-64 w-64 rounded-full bg-cyan-900/8 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-700/40 bg-teal-950/40 px-4 py-1.5 text-sm font-medium text-teal-200">
              <span className="text-base">🏛️</span>
              Purple8 Hyper Graph · Architecture · Engineering · Construction
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Architecture software stores files.{" "}
              <span className="bg-gradient-to-r from-teal-400 to-cyan-300 bg-clip-text text-transparent">
                Purple8 stores knowledge.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
              Every room, wall, structural element, compliance clause, cost estimate, and design
              decision is a typed node in the project graph. AI Architect runs on top of it.
              When you ask a question in Chat, the answer comes from your actual project —
              traversing graph relationships and vector embeddings simultaneously.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-lg mx-auto">
              {[
                { stat: "14", label: "RIBA stages as graph state" },
                { stat: "12", label: "Phase 8 algorithms" },
                { stat: "30+", label: "Global cost markets" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-teal-900/40 bg-teal-950/20 px-4 py-4 text-center">
                  <p className="text-2xl font-bold text-teal-300">{s.stat}</p>
                  <p className="mt-1 text-xs text-zinc-500 leading-tight">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="mailto:sales@purple8.ai?subject=Purple8 AI Architect — live demo request"
                className="rounded-full bg-teal-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-teal-900/40 transition-colors hover:bg-teal-500"
              >
                Ask for a live demo
              </a>
            </div>
          </div>
        </section>

        {/* The core problem */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-teal-400">The problem</p>
                <h2 className="mt-3 text-3xl font-bold text-white">A project is a knowledge graph. Architecture tools treat it like a filing cabinet.</h2>
                <p className="mt-5 text-zinc-400 leading-relaxed">
                  An architecture project contains hundreds of interdependent entities: rooms,
                  walls, structural elements, compliance requirements, cost estimates, design
                  decisions, stage approvals, and document references. Every one of those entities
                  has typed relationships to the others.
                </p>
                <p className="mt-4 text-zinc-400 leading-relaxed">
                  Traditional AEC software stores files. When you need to know whether a
                  structural change on Level 3 affects the MEP routing on Level 2, you open
                  four files and cross-reference manually. When you want to ask why a compliance
                  issue was resolved three weeks ago, you search through email.
                </p>
                <p className="mt-4 text-zinc-400 leading-relaxed">
                  Purple8 Graph is the single canonical data store for the entire project.
                  Every interaction — drawing, compliance check, algorithm run, stage transition,
                  design decision — writes to the graph. AI Architect queries it directly.
                </p>
              </div>
              <div className="space-y-3">
                {[
                  { label: "BRIEF → PROJECT_JOURNEY", detail: "Concept brief extracted from Chat, RIBA Stage 0 begins" },
                  { label: "SPACE → COMPLIANCE_ISSUE", detail: "Room below NBC corridor width — clause NBC 2016 §8.4.2" },
                  { label: "ELEMENT → STRUCTURAL_RESULT", detail: "Phase 8.2 load path trace — critical member identified" },
                  { label: "STAGE → JOURNEY_INTERACTION", detail: "Stage 3 approved by principal architect — immutable edge" },
                  { label: "INTERACTION → RAG_CONTEXT", detail: "Hybrid RAG surfaces this evidence in next Chat response" },
                ].map((row, i) => (
                  <div key={row.label} className="flex items-start gap-4 rounded-xl border border-white/8 bg-white/[0.02] px-5 py-3">
                    <span className="shrink-0 text-xs font-mono text-zinc-600 mt-0.5 w-5">{i + 1}</span>
                    <code className="shrink-0 text-xs font-mono text-teal-400 mt-0.5">{row.label}</code>
                    <p className="text-sm text-zinc-400">{row.detail}</p>
                  </div>
                ))}
                <p className="text-xs text-zinc-600 pt-1">Every interaction writes to the graph. Every AI answer traverses it. The project gets smarter with every session.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Patterns */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-teal-400">Solution patterns</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Ten ways Purple8 Graph powers AI Architect.</h2>
              <p className="mt-4 max-w-2xl mx-auto text-zinc-400">
                Each capability below is a graph operation, not a separate module or a file export to a third-party service.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {patterns.map((p) => (
                <div key={p.number} className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 hover:border-teal-700/40 transition-colors">
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-2xl">{p.icon}</span>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-mono text-teal-700">{p.number}</span>
                        <h3 className="text-base font-semibold text-white">{p.title}</h3>
                      </div>
                      <p className="text-xs font-semibold text-teal-400 uppercase tracking-widest">{p.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-4">{p.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-teal-950/50 border border-teal-900/40 px-2.5 py-0.5 text-xs text-teal-300">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-teal-400">Side by side</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Traditional AEC tools vs. graph-native design intelligence</h2>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-white/8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/8">
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest text-zinc-500">Capability</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest text-zinc-500">Traditional AEC Software</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest text-teal-400">Purple8 AI Architect ✦</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, i) => (
                    <tr key={row.item} className={i % 2 === 0 ? "bg-white/[0.01]" : ""}>
                      <td className="px-6 py-4 font-medium text-zinc-300">{row.item}</td>
                      <td className="px-6 py-4 text-zinc-500">{row.legacy}</td>
                      <td className="px-6 py-4 text-teal-300 font-medium">{row.purple8}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-teal-400">Who uses this</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Built for every firm that designs the built environment</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {targetCustomers.map((tc) => (
                <div key={tc.title} className="rounded-2xl border border-white/8 bg-white/[0.02] p-6">
                  <div className="text-3xl mb-4">{tc.icon}</div>
                  <h3 className="text-base font-semibold text-white mb-2">{tc.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{tc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-teal-400">FAQ</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Questions from architecture and engineering teams</h2>
            </div>
            <div className="space-y-8">
              {(jsonLd.mainEntity as { mainEntity: { name: string; acceptedAnswer: { text: string } }[] }).mainEntity.map((faq) => (
                <div key={faq.name} className="border-b border-white/8 pb-8">
                  <h3 className="text-lg font-semibold text-white mb-2">{faq.name}</h3>
                  <p className="text-zinc-400 leading-relaxed">{faq.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related capabilities */}
        <section className="border-t border-white/5 py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-6">Capabilities used in this workflow</p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {[
                { href: "/products/purple8/rag-pipeline/", label: "GraphRAG", desc: "Hybrid RAG over project graph — every answer cited" },
                { href: "/products/purple8/workflow-orchestration/", label: "Workflow Orchestration", desc: "14 RIBA stages as Journey Engine graph state" },
                { href: "/products/purple8/agentic-process-automation/", label: "Agentic Process Automation", desc: "6-gate Design Process Graph with HITL checkpoints" },
                { href: "/products/purple8/multi-agent-systems/", label: "Multi-Agent Systems", desc: "Parallel algorithm runs with shared project graph memory" },
                { href: "/products/purple8/scenario-simulation/", label: "Scenario Simulation", desc: "5-snapshot scenario branching on the project graph" },
                { href: "/products/purple8/quantum-optimisation/", label: "Quantum Optimisation", desc: "Multi-objective Pareto optimisation via MORL and GCN" },
              ].map((cap) => (
                <Link key={cap.href} href={cap.href} className="group rounded-xl border border-white/8 bg-white/[0.02] px-5 py-4 transition-colors hover:border-teal-700/50">
                  <p className="text-sm font-semibold text-teal-300 group-hover:text-teal-200">{cap.label} →</p>
                  <p className="mt-1 text-xs text-zinc-500">{cap.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-white/5 py-20 text-center">
          <div className="mx-auto max-w-2xl px-4">
            <h2 className="text-3xl font-bold text-white">See the project knowledge graph in action</h2>
            <p className="mt-4 text-zinc-400">
              AI Architect is live at architect.purple8.ai. Draw a floor plan, run compliance,
              ask a question in Chat, and watch every interaction write to the graph in real time.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="mailto:sales@purple8.ai?subject=Purple8 AI Architect — live demo request"
                className="rounded-full bg-teal-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-teal-900/40 transition-colors hover:bg-teal-500"
              >
                Ask for a live demo
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
