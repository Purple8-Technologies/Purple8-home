import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Purple8 Architect — AI Design Platform for Architects",
  description:
    "Draw floor plans. Run compliance. Analyse structure, solar, and MEP. Manage the full project lifecycle. Purple8 Architect is the AI-native design platform for architecture firms.",
  path: "/products/architect",
});

const surfaces = [
  {
    tag: "AI Chat",
    color: "text-teal-400",
    border: "border-teal-900/40",
    title: "Ask anything about your project",
    desc: "Conversational AI grounded in your entire project knowledge base — drawings, specs, RFIs, contracts, BIM models, and code compliance. The chat agent auto-dispatches to 14 AEC tools and routes results back into your project graph. Every answer cites its source.",
    items: [
      "Every answer is grounded in your actual project documents — drawings, specs, contracts, BIM models",
      "Understands your whole project — asks about Level 3 structural issues and gets a real answer, not a generic one",
      "Covers compliance, cost, structural, MEP, solar, spatial design, and cultural design guidance",
      "Cites the exact document, page, and clause behind every response — no hallucinations",
      "Chat automatically pre-fills your project brief — one click saves it to the project lifecycle",
    ],
  },
  {
    tag: "Canvas",
    color: "text-cyan-400",
    border: "border-cyan-900/40",
    title: "Precision floor plan design with AI overlays",
    desc: "Vector drawing surface built for architects — not a whiteboard tool. GEA/GIA/NLA area layers to RICS standard, multi-user live cursors, 3D view with door and window openings, and AI-generated massing and layout suggestions. Runs in the browser. Works on iPad.",
    items: [
      "Draw polygon rooms with arc walls, symbols (door, window, stair, lift), and dimension annotations",
      "GEA / GIA / NLA area layers with live schedule — RICS-standard from day one",
      "Space Syntax (VGA) · Structural span warnings · Wellbeing score overlays",
      "3D view — extruded rooms, wall geometry, door/window openings via Three.js",
      "AI massing generator — 3 strategies (Compact Bar, Linear Slab, Split Wings)",
      "AI layout suggestions — Vastu · Intelligent Grid · Compact Cluster, applied one-click",
      "Solar overlay with live GPS and device compass for true-north sun paths",
      "Multi-user shape sync and live cursors — no WebSocket server required",
      "Export: PDF · SVG · DXF (AutoCAD) · CSV area schedule",
    ],
  },
  {
    tag: "Sketch",
    color: "text-emerald-400",
    border: "border-emerald-900/40",
    title: "Freehand design with Apple Pencil intelligence",
    desc: "A freehand drawing board built for early-stage ideation. Pressure, tilt, and coalesced events for Apple Pencil. AI interprets your sketch and generates photorealistic renders. Sketches hand off directly to the project journey.",
    items: [
      "Apple Pencil with pressure, tilt, and coalesced events — fine, bold, and pencil brush styles",
      "8 layers with per-layer undo, mirror symmetry, import underlay for tracing",
      "AI Interpret — describes rooms, spatial reads, and design intent from your sketch",
      "\"Send to Project →\" attaches sketch to the active project stage in Journey",
    ],
  },
  {
    tag: "Projects (Journey)",
    color: "text-teal-300",
    border: "border-teal-900/30",
    title: "Full RIBA lifecycle. Zero spreadsheets.",
    desc: "14 RIBA-mapped project stages from brief to handover, managed by the Purple8 Journey Engine. Stage approvals, SLA monitoring, scenario branching, and a full immutable audit trail — all stored in the project knowledge graph.",
    items: [
      "14 RIBA-mapped stages from concept brief to post-occupancy evaluation",
      "Human-in-the-loop approval gates — stage advance restricted to principal architect role",
      "Scenario branching — up to 5 named snapshots per project",
      "SLA monitoring — know which deliverables are at risk before they slip",
      "Full immutable audit trail: every design decision, tool run, and stage transition",
      "Pre-filled from Chat draft — no re-entering what the AI already knows",
    ],
  },
  {
    tag: "Algorithms",
    color: "text-teal-400",
    border: "border-teal-900/40",
    title: "12 Phase 8 design algorithms. All running on the graph.",
    desc: "Structural, MEP, spatial, and generative analysis built directly into the graph engine — no export, no third-party solver. Results feed back into the knowledge base so every AI response can reason over them. Chat routes directly to the relevant algorithm tab.",
    items: [
      "Space Syntax & VGA — visibility graph, integration scoring, axial maps",
      "Structural topology — rigidity, load path tracing, critical member detection",
      "MEP max-flow / min-cut — fault isolation, energy balance, thermal zone simulation",
      "Spectral optimisation — Fiedler value, robustness index, natural frequency estimation",
      "Generative design — constraint propagation, Pareto-optimised spatial layouts",
      "IFC / BIM — ingestion, clash detection, change propagation, delta sync, rewriting",
      "Chat → Algorithm routing: AI responses link directly to the relevant algorithm tab",
    ],
  },
  {
    tag: "GIS & Site",
    color: "text-cyan-400",
    border: "border-cyan-900/40",
    title: "Site intelligence before you draw the first line",
    desc: "Solar path, space syntax, wind, flood, ecology, and urban context analysis — all available before you open Canvas. Grounded in live regulatory and market data via the Knowledge Hydrator.",
    items: [
      "Solar analysis — summer / equinox / winter sun paths with latitude-accurate angles",
      "Flood, seismic, and climate context from verified sources",
      "Space syntax and urban context — connectivity and integration scoring",
      "Knowledge Hydrator — building codes and market prices continuously updated from official sources",
    ],
  },
];

const replaces = [
  { name: "Autodesk Construction Cloud", reason: "project workflows + document management" },
  { name: "Procore", reason: "project management + RFI tracking" },
  { name: "BIM 360", reason: "model coordination + clash detection" },
  { name: "SketchUp / Rhino", reason: "concept massing + 3D modelling" },
  { name: "Bluebeam", reason: "drawing markup + review" },
  { name: "PowerBI / Tableau", reason: "project analytics" },
  { name: "Separate AI chat tools", reason: "design assistance" },
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
              Architecture · Engineering · Construction · Private Beta
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              The design platform that thinks{" "}
              <span className="bg-gradient-to-r from-teal-400 to-cyan-300 bg-clip-text text-transparent">
                while you draw.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
              Draw floor plans. Run compliance. Analyse structure, solar, and MEP.
              Chat with your project in plain English. Manage the full RIBA lifecycle
              without leaving your browser. Purple8 Architect is the AI-native design
              platform for architecture firms — powered by Purple8.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="mailto:sales@purple8.ai?subject=Purple8 Architect — beta access request"
                className="rounded-full bg-teal-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-teal-900/40 transition-colors hover:bg-teal-500"
              >
                Request beta access
              </a>
              <a
                href="mailto:sales@purple8.ai?subject=Purple8 Architect demo"
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

        {/* Design surfaces */}
        <section className="py-20 border-t border-white/5">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold uppercase tracking-widest text-teal-400 mb-3">What&apos;s inside</p>
              <h2 className="text-3xl font-bold text-white">Every surface an architect needs. One platform.</h2>
            </div>
            <div className="space-y-8">
              {surfaces.map((s) => (
                <div key={s.tag} className={`rounded-2xl border ${s.border} bg-[#11111b] p-8 sm:p-10`}>
                  <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
                    <div>
                      <p className={`text-xs font-semibold uppercase tracking-widest ${s.color} mb-3`}>{s.tag}</p>
                      <h3 className="text-2xl font-bold text-white">{s.title}</h3>
                      <p className="mt-4 text-sm leading-relaxed text-zinc-400">{s.desc}</p>
                    </div>
                    <ul className="space-y-2.5">
                      {s.items.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm text-zinc-400">
                          <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-600/15 ${s.color}`}>
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
          </div>
        </section>

        {/* Replaces */}
        <section className="py-20 border-t border-white/5">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-400 mb-3">Consolidation</p>
            <h2 className="text-3xl font-bold text-white">One platform. Not seven subscriptions.</h2>
            <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
              Architecture firms typically juggle separate tools for drawing, project management,
              model coordination, and AI chat. Architect brings them together in one knowledge graph.
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

        {/* CTA */}
        <section className="py-24 border-t border-white/5">
          <div className="mx-auto max-w-2xl px-4 text-center">
            <h2 className="text-3xl font-bold text-white">
              Try it at architect.purple8.ai
            </h2>
            <p className="mt-4 text-zinc-400">
              Purple8 Architect is in private beta. Request access directly at the app,
              or contact sales for a guided demonstration and enterprise deployment options.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="mailto:sales@purple8.ai?subject=Purple8 Architect — beta access request"
                className="rounded-full bg-teal-600 px-8 py-3.5 text-base font-semibold text-white hover:bg-teal-500 transition-colors shadow-lg shadow-teal-900/30"
              >
                Request beta access
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
