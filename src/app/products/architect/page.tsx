import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Purple8 Architect — AI-Native Project Intelligence for AEC",
  description:
    "Ask anything about your project. Track every workflow. Analyse every model. Purple8 Architect is the AI brain for architecture, engineering, and construction firms.",
  path: "/products/architect",
});

const pillars = [
  {
    tag: "Project AI Assistant",
    color: "text-teal-400",
    border: "border-teal-900/40",
    title: "Ask anything about your project",
    desc: "Natural language over your entire project knowledge base — drawings, specifications, RFIs, submittals, contracts, meeting notes, and BIM models. Ask \"which structural members have load path issues on Level 3\" and get an answer in seconds, not days.",
    items: [
      "Query drawings, specs, and BIM models in plain English",
      "Cross-document reasoning — surfaces conflicts automatically",
      "Cites the exact document, page, and clause for every answer",
      "Works with your existing SharePoint, Confluence, or S3 stores",
    ],
  },
  {
    tag: "Project Intelligence",
    color: "text-cyan-400",
    border: "border-cyan-900/40",
    title: "Every workflow. Every milestone. Every risk.",
    desc: "Built-in project lifecycle management — from design brief to handover. Multi-stage workflows with approval gates, SLA monitoring, and a full immutable audit trail. Your project manager and your AI work from the same source of truth.",
    items: [
      "Design approval workflows with human-in-the-loop gates",
      "SLA monitoring — know which deliverables are at risk before they slip",
      "Change impact tracing — propagate IFC model changes to downstream tasks automatically",
      "Immutable audit trail stored in the knowledge graph, not a separate system",
    ],
  },
  {
    tag: "Design Intelligence",
    color: "text-emerald-400",
    border: "border-emerald-900/40",
    title: "Analysis that runs on the model, not beside it",
    desc: "Structural, MEP, spatial, and generative analysis built directly into the graph engine — no export, no third-party solver, no data round-trip. Results feed directly into the project knowledge base so the AI assistant can reason over them.",
    items: [
      "BIM/IFC ingestion — clash detection, change propagation, delta sync",
      "Structural topology — rigidity, load path tracing, critical member detection",
      "MEP max-flow/min-cut — fault isolation and energy balance modelling",
      "Space syntax & VGA — visibility analysis and egress optimisation",
      "Spectral analysis — structural robustness index and frequency estimation",
      "Multi-objective generative design — Pareto-optimised spatial layouts",
    ],
  },
  {
    tag: "Document Intelligence",
    color: "text-teal-300",
    border: "border-teal-900/30",
    title: "Every document. Instantly searchable.",
    desc: "Purple8 DocIntel ingests 70+ file formats including IFC, DXF, DWG, STEP, PDF, and all office formats. Entity extraction, relationship mapping, and semantic indexing happen automatically — so the moment a drawing lands in your project, it is queryable.",
    items: [
      "IFC, DXF, DWG, STEP, STL, OBJ, GLB — full CAD and BIM native",
      "PDF, DOCX, XLSX, PPTX — all standard project document formats",
      "Proprietary two-pass extraction: named entities + relationship mapping",
      "Five OCR engines including a self-hosted option — data never leaves your infrastructure",
    ],
  },
];

const replaces = [
  { name: "Autodesk Construction Cloud", reason: "project workflows + document management" },
  { name: "Procore", reason: "project management + RFI tracking" },
  { name: "BIM 360", reason: "model coordination + clash detection" },
  { name: "Bluebeam", reason: "drawing markup + review workflows" },
  { name: "SharePoint / Confluence", reason: "document store + search" },
  { name: "PowerBI / Tableau", reason: "project analytics + dashboards" },
];

const personas = [
  {
    role: "Project directors & owners",
    icon: "🏛️",
    points: [
      "Single source of truth across the entire project lifecycle",
      "Ask plain-English questions about programme, risk, and cost",
      "Approval workflows with full audit trail",
    ],
  },
  {
    role: "Architects & design leads",
    icon: "✏️",
    points: [
      "AI assistant over all drawings, specs, and BIM models",
      "Automated clash detection and change propagation",
      "Generative layout and space optimisation",
    ],
  },
  {
    role: "Structural & MEP engineers",
    icon: "⚙️",
    points: [
      "Load path tracing and rigidity checking on the live model",
      "MEP max-flow, fault isolation, thermal zone simulation",
      "Spectral robustness index and frequency estimation",
    ],
  },
  {
    role: "Contractors & site teams",
    icon: "🦺",
    points: [
      "Ask the model: what changed since last week?",
      "RFI and submittal workflows with automated routing",
      "SLA alerts before deliverables miss critical dates",
    ],
  },
];

export default function ArchitectPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-[#0a0a0f] pt-16">

        {/* Hero */}
        <section className="relative overflow-hidden py-24 sm:py-32">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-48 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-teal-900/10 blur-3xl" />
            <div className="absolute top-32 -right-32 h-64 w-64 rounded-full bg-cyan-900/8 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-700/40 bg-teal-950/40 px-4 py-1.5 text-sm font-medium text-teal-200">
              AEC · Engineering · Construction · Enterprise
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Your project has a brain now.{" "}
              <span className="bg-gradient-to-r from-teal-400 to-cyan-300 bg-clip-text text-transparent">
                Ask it anything.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
              Purple8 Architect is the AI-native intelligence layer for AEC firms.
              Every drawing, model, specification, contract, and workflow lives in one
              knowledge graph — and your whole team can query it in plain English.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="mailto:sales@purple8.ai?subject=Purple8 Architect demo"
                className="rounded-full bg-teal-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-teal-900/40 transition-colors hover:bg-teal-500"
              >
                Request a demo
              </a>
              <a
                href="mailto:sales@purple8.ai?subject=Purple8 Architect inquiry"
                className="text-base font-semibold text-zinc-300 transition-colors hover:text-white"
              >
                Talk to sales →
              </a>
            </div>
            <p className="mt-4 text-sm text-zinc-500">
              Enterprise pricing ·{" "}
              <a href="mailto:sales@purple8.ai" className="text-teal-400 hover:text-teal-300">sales@purple8.ai</a>
            </p>
          </div>
        </section>

        {/* Four pillars */}
        <section className="py-20 border-t border-white/5">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8">
            {pillars.map((p) => (
              <div key={p.tag} className={`rounded-2xl border ${p.border} bg-[#11111b] p-8 sm:p-10`}>
                <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
                  <div>
                    <p className={`text-xs font-semibold uppercase tracking-widest ${p.color} mb-3`}>{p.tag}</p>
                    <h2 className="text-2xl font-bold text-white">{p.title}</h2>
                    <p className="mt-4 text-sm leading-relaxed text-zinc-400">{p.desc}</p>
                  </div>
                  <ul className="space-y-3">
                    {p.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-zinc-400">
                        <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-600/15 ${p.color}`}>
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Replaces */}
        <section className="py-20 border-t border-white/5">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-400 mb-3">Consolidation</p>
            <h2 className="text-3xl font-bold text-white">One platform. Not six subscriptions.</h2>
            <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
              AEC firms typically run half a dozen separate tools that don&apos;t talk to each other.
              Architect replaces them with a single AI-native knowledge graph that knows your whole project.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {replaces.map((r) => (
                <div key={r.name} className="rounded-xl border border-zinc-800 bg-[#11111b] px-5 py-3 text-left">
                  <p className="text-sm font-medium text-zinc-400 line-through decoration-zinc-600">{r.name}</p>
                  <p className="text-xs text-zinc-600 mt-0.5">{r.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Personas */}
        <section className="py-20 border-t border-white/5">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold uppercase tracking-widest text-teal-400 mb-3">Who it&apos;s for</p>
              <h2 className="text-3xl font-bold text-white">Every role on the project. One shared brain.</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {personas.map((p) => (
                <div key={p.role} className="rounded-xl border border-teal-900/30 bg-[#11111b] p-6">
                  <div className="text-2xl mb-3">{p.icon}</div>
                  <h3 className="font-semibold text-teal-300 mb-3">{p.role}</h3>
                  <ul className="space-y-2">
                    {p.points.map((pt) => (
                      <li key={pt} className="text-xs text-zinc-400 flex items-start gap-2">
                        <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-teal-500" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 border-t border-white/5">
          <div className="mx-auto max-w-2xl px-4 text-center">
            <h2 className="text-3xl font-bold text-white">
              Ready to give your project a brain?
            </h2>
            <p className="mt-4 text-zinc-400">
              We work with architecture firms, engineering consultancies, and construction
              groups to deploy Architect on your infrastructure — air-gapped or cloud.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="mailto:sales@purple8.ai?subject=Purple8 Architect demo"
                className="rounded-full bg-teal-600 px-8 py-3.5 text-base font-semibold text-white hover:bg-teal-500 transition-colors shadow-lg shadow-teal-900/30"
              >
                Request a demo
              </a>
              <a
                href="mailto:sales@purple8.ai?subject=Purple8 Architect"
                className="text-base font-semibold text-zinc-300 hover:text-white transition-colors"
              >
                sales@purple8.ai →
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

const capabilities = [
  { icon: "🏗️", label: "BIM & IFC Intelligence", desc: "Parse IFC models into a live knowledge graph. Clash detection, change propagation, and delta sync — automatically." },
  { icon: "🔬", label: "Structural Analysis", desc: "Rigidity checking, load path tracing, critical member detection, and Cuthill-McKee FEM ordering." },
  { icon: "🌊", label: "MEP Flow Analysis", desc: "Max-flow/min-cut for MEP networks. Thermal zone simulation, energy balance, and fault isolation." },
  { icon: "👁️", label: "Space Syntax & VGA", desc: "Visibility graph analysis, integration scoring, axial maps — for spatial design optimisation." },
  { icon: "⚡", label: "Spectral Optimisation", desc: "Graph Laplacian, Fiedler value, spectral bisection, and natural frequency estimation for large structures." },
  { icon: "🧬", label: "Topology Optimisation", desc: "SIMP-on-graph density loop, sensitivity filter, multi-material support, and IFC/OBJ export." },
  { icon: "🤖", label: "Multi-Objective RL", desc: "Gym-compatible environment with Pareto front tracking — optimise VGA, egress, spectral gap, and MEP flow simultaneously." },
  { icon: "📐", label: "Generative Design", desc: "Graph-colouring + constraint propagation for spatial allocation. Egress optimisation via Dijkstra/min-cut." },
];

export default function ArchitectPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-[#0a0a0f] pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden py-24">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-48 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-teal-900/12 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-700/40 bg-teal-950/40 px-4 py-1.5 text-sm font-medium text-teal-200">
              AEC · Engineering · Enterprise · Built on Purple8
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              AI-native design intelligence{" "}
              <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                for AEC and engineering.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
              Purple8 Architect brings graph-native structural analysis, BIM intelligence,
              MEP flow simulation, and multi-objective generative design to architecture,
              engineering, and construction teams — powered by the Purple8 AEC vertical.
            </p>

            {/* Contact sales CTA */}
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="mailto:sales@purple8.ai?subject=Purple8 Architect inquiry"
                className="rounded-full bg-teal-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-teal-900/40 transition-colors hover:bg-teal-500"
              >
                Contact sales
              </a>
              <a
                href="mailto:sales@purple8.ai?subject=Purple8 Architect demo request"
                className="text-base font-semibold text-zinc-300 transition-colors hover:text-white"
              >
                Request a demo →
              </a>
            </div>
            <p className="mt-4 text-sm text-zinc-500">
              For pricing and availability, contact{" "}
              <a href="mailto:sales@purple8.ai" className="text-teal-400 hover:text-teal-300">sales@purple8.ai</a>
            </p>
          </div>
        </section>

        {/* Capabilities */}
        <section className="py-20 border-t border-white/5">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-teal-400">AEC Intelligence</p>
              <h2 className="mt-3 text-3xl font-bold text-white">12 specialised algorithms. One platform.</h2>
              <p className="mt-4 text-zinc-400">
                Every capability runs directly on the graph — no external simulation solvers, no data export required.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {capabilities.map((c) => (
                <div key={c.label} className="rounded-xl border border-zinc-800 bg-[#11111b] p-5">
                  <div className="text-2xl mb-3">{c.icon}</div>
                  <h3 className="font-semibold text-white">{c.label}</h3>
                  <p className="mt-1 text-sm text-zinc-400">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* For whom */}
        <section className="py-20 border-t border-white/5">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-sm font-semibold uppercase tracking-widest text-teal-400">Who it&apos;s for</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Built for the teams that design the built world.</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                { role: "Architecture firms", desc: "Space analysis, VGA, generative layout, and BIM coordination — all from one AI-accessible knowledge graph." },
                { role: "Structural engineers", desc: "Load path analysis, rigidity checking, critical member detection, and spectral robustness index." },
                { role: "MEP & sustainability teams", desc: "Energy balance modelling, MEP max-flow, fault isolation, and thermal zone simulation." },
              ].map((w) => (
                <div key={w.role} className="rounded-xl border border-teal-900/40 bg-[#11111b] p-6">
                  <h3 className="font-semibold text-teal-300">{w.role}</h3>
                  <p className="mt-2 text-sm text-zinc-400">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 border-t border-white/5">
          <div className="mx-auto max-w-xl px-4 text-center">
            <h2 className="text-3xl font-bold text-white">Bring AI-native design intelligence to your firm.</h2>
            <p className="mt-4 text-zinc-400">
              Contact our sales team to discuss your requirements, deployment options, and a tailored demonstration.
            </p>
            <div className="mt-8">
              <a
                href="mailto:sales@purple8.ai?subject=Purple8 Architect"
                className="rounded-full bg-teal-600 px-8 py-3.5 text-base font-semibold text-white hover:bg-teal-500"
              >
                Contact sales@purple8.ai
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
