import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Workflow Orchestration — Purple8 Hyper Graph",
  description:
    "Purple8 Hyper Graph ships workflow orchestration out of the box — stateful multi-stage pipelines, SLA enforcement, human-in-the-loop gates, event-driven triggers, and a full audit trail. No Airflow, no Temporal, no LangGraph. Just one process.",
  path: "/products/purple8/workflow-orchestration",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Workflow Orchestration — Purple8 Hyper Graph",
  description:
    "Purple8 Hyper Graph provides production-grade workflow orchestration in-process: stateful stage machines, SLA monitoring, human-in-the-loop approval gates, CDC event triggers, and an immutable audit trail — all through journey.* MCP tools.",
  url: "https://www.purple8.ai/products/purple8/workflow-orchestration/",
  publisher: { "@type": "Organization", name: "Purple8 Inc.", url: "https://www.purple8.ai" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.purple8.ai/" },
      { "@type": "ListItem", position: 2, name: "Purple8 Hyper Graph", item: "https://www.purple8.ai/products/purple8/" },
      { "@type": "ListItem", position: 3, name: "Workflow Orchestration", item: "https://www.purple8.ai/products/purple8/workflow-orchestration/" },
    ],
  },
  mainEntity: {
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does workflow orchestration work in Purple8?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Purple8's Journey Engine is the workflow orchestration layer. You define a workflow as a set of stages with SLA policies and optional human-approval gates. Each workflow instance is stored as a graph node; every state transition becomes an immutable graph edge. AI agents or application code advance instances through stages by calling journey.* MCP tools — no DAG files, no YAML config, no separate scheduler process.",
        },
      },
      {
        "@type": "Question",
        name: "What does Purple8 replace in a typical workflow stack?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Purple8 replaces Airflow, Temporal, LangGraph, LangChain, LangSmith, and a separate audit/tracing service — all at once, in a single process. The graph IS the workflow state machine, the audit trail, and the observability layer simultaneously.",
        },
      },
      {
        "@type": "Question",
        name: "Can workflows trigger on data changes (CDC)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Purple8 has a built-in Change Data Capture event bus. When a node or edge is created or updated in the graph, subscribers receive the event and can start or advance workflow instances automatically — without polling.",
        },
      },
      {
        "@type": "Question",
        name: "How are SLA breaches handled?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Each stage in a Journey definition can have a SLAPolicy specifying a deadline and escalation action. The SLAMonitor background thread checks running instances continuously. When a breach occurs, a SLA_BREACHED edge is written to the graph — immutably — and the escalation action fires. journey.sla_alerts surfaces all active breaches to agents or dashboards.",
        },
      },
      {
        "@type": "Question",
        name: "Can human approvals be required at specific workflow stages?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — HITL (Human-In-The-Loop) gates are first-class in Journey Engine. A stage marked as requiring approval pauses the instance until journey.resolve_hitl is called by an authorised user. The approver's identity, decision, and timestamp are written as immutable graph edges. journey.list_hitl surfaces all pending decisions.",
        },
      },
    ],
  },
};

const journeyTools = [
  { name: "journey.define", desc: "Define a workflow with stages, SLA policies, and HITL requirements" },
  { name: "journey.list", desc: "List all workflow definitions in the system" },
  { name: "journey.start", desc: "Start a new workflow instance for an entity" },
  { name: "journey.advance", desc: "Advance an instance to the next stage" },
  { name: "journey.status", desc: "Get current stage, SLA status, and history for an instance" },
  { name: "journey.sla_alerts", desc: "List all instances with active SLA breaches or at-risk stages" },
  { name: "journey.list_hitl", desc: "List all workflow instances pending a human decision" },
  { name: "journey.resolve_hitl", desc: "Record a human approval or rejection decision" },
  { name: "journey.audit", desc: "Return the full, tamper-evident history of any instance as graph edges" },
];

const vsCompetitors = [
  {
    label: "Airflow",
    col: "border-zinc-800",
    pill: "bg-zinc-800 text-zinc-400",
    points: [
      "DAG files in Python — developers must code every flow",
      "Scheduler is a separate process to operate",
      "No graph memory — context is flat key-value",
      "HITL requires custom sensors or external triggers",
      "Audit trail in separate logs; not queryable",
    ],
  },
  {
    label: "Temporal",
    col: "border-zinc-800",
    pill: "bg-zinc-800 text-zinc-400",
    points: [
      "Separate server cluster to deploy and operate",
      "Workflow code in dedicated Worker processes",
      "No native knowledge graph or vector search",
      "HITL via signals — requires custom handling",
      "High operational complexity for small teams",
    ],
  },
  {
    label: "LangGraph",
    col: "border-zinc-800",
    pill: "bg-zinc-800 text-zinc-400",
    points: [
      "In-memory state machine — no durable persistence by default",
      "No SLA enforcement or breach detection",
      "No HITL gate primitive",
      "Audit requires LangSmith (separate service, cost)",
      "Graph is code, not data — hard to query or observe",
    ],
  },
  {
    label: "Purple8 Journey Engine",
    col: "border-purple-700/60",
    pill: "bg-purple-900/40 text-purple-300",
    points: [
      "No DAGs, no YAML — define in plain language via MCP",
      "In-process — zero extra services to operate",
      "Full knowledge graph memory on every workflow instance",
      "HITL gates are first-class primitives",
      "Audit trail IS the graph — always on, always queryable",
    ],
  },
];

const useCases = [
  {
    icon: "🏦",
    title: "Loan origination",
    desc: "Multi-stage underwriting with automated risk scoring, compliance checks, and mandatory human review before approval — full audit trail for regulators.",
  },
  {
    icon: "🧾",
    title: "Invoice processing",
    desc: "DocIntel extracts line items, Journey Engine routes to approvers based on spend thresholds, CDC triggers downstream payment on approval.",
  },
  {
    icon: "🏗️",
    title: "Construction permit workflow",
    desc: "BIM model ingested via DocIntel, structural and MEP checks run automatically, human sign-off required per discipline, timeline SLAs enforced per stage.",
  },
  {
    icon: "🛡️",
    title: "Security incident response",
    desc: "SOC detector fires → containment workflow starts → analyst reviews and approves response → every action timestamped as an immutable graph edge.",
  },
  {
    icon: "🤝",
    title: "Supplier onboarding",
    desc: "Document collection, KYC verification, risk scoring, commercial term review, contract signing — each stage gated, SLA-tracked, fully auditable.",
  },
  {
    icon: "📋",
    title: "Compliance review",
    desc: "Triggered by regulatory change, assigns review tasks across legal and operations, tracks completion, escalates breaches, produces audit evidence automatically.",
  },
];

const storageModel = [
  { shape: "Node", label: "JourneyDefinition", desc: "The workflow template — stages, SLA policies, HITL config" },
  { shape: "Node", label: "JourneyInstance", desc: "One running workflow — current stage, start time, entity reference" },
  { shape: "Edge", label: "ADVANCED_TO", desc: "Each stage transition — who/what triggered it, when" },
  { shape: "Edge", label: "SLA_BREACHED", desc: "Written on breach — stage, deadline, time over — never deleted" },
  { shape: "Edge", label: "HITL_RESOLVED", desc: "Human decision — approver identity, outcome, timestamp" },
];

export default function WorkflowOrchestrationPage() {
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
            <span className="text-zinc-400">Workflow Orchestration</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden py-20">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-48 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-purple-900/15 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-700/40 bg-purple-950/40 px-4 py-1.5 text-sm font-medium text-purple-200">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-400" />
              </span>
              Part of Purple8 Hyper Graph · No extra services · Built in
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Workflow Orchestration.{" "}
              <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                Without the stack.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
              Purple8&apos;s Journey Engine is a production-grade workflow orchestration
              layer built directly into the graph database. Define stages, SLA policies,
              and human-approval gates in plain language via MCP tools. Every state
              transition becomes an immutable graph edge. The scheduler, the audit trail,
              and the workflow state all live in the same store as your data.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a href="/register/" className="rounded-full bg-purple-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-purple-900/40 transition-colors hover:bg-purple-500">
                Start free
              </a>
              <a href="/quickstart/" className="text-base font-semibold text-zinc-300 transition-colors hover:text-white">
                See how it works →
              </a>
            </div>
          </div>
        </section>

        {/* Storage model */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">How it stores state</p>
              <h2 className="mt-3 text-3xl font-bold text-white">The graph IS the state machine</h2>
              <p className="mt-4 text-zinc-400 max-w-xl mx-auto">
                Every workflow concept maps to a graph primitive. There is no separate
                workflow database — the same store that holds your knowledge graph holds
                your process state, and both are queryable together.
              </p>
            </div>
            <div className="space-y-3">
              {storageModel.map((row) => (
                <div key={row.label} className="flex items-start gap-5 rounded-xl border border-white/8 bg-white/[0.02] px-6 py-4">
                  <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider mt-0.5 ${row.shape === "Node" ? "bg-purple-950/60 text-purple-400 border border-purple-800/50" : "bg-zinc-900 text-zinc-400 border border-zinc-700"}`}>
                    {row.shape}
                  </span>
                  <div>
                    <code className="text-sm font-mono text-purple-300">{row.label}</code>
                    <p className="mt-0.5 text-sm text-zinc-500">{row.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MCP Tools */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">journey.* namespace</p>
              <h2 className="mt-3 text-3xl font-bold text-white">9 MCP tools. Agents run the whole pipeline.</h2>
              <p className="mt-3 text-zinc-500 text-sm max-w-lg mx-auto">
                An AI agent can define a workflow, start instances, advance stages, handle
                SLA breaches, surface HITL decisions, and retrieve the full audit trail —
                entirely through natural language tool calls.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {journeyTools.map((t) => (
                <div key={t.name} className="flex items-start gap-4 rounded-xl border border-white/8 bg-white/[0.015] px-5 py-4">
                  <code className="shrink-0 rounded bg-purple-950/60 px-2 py-0.5 text-xs font-mono text-purple-300">{t.name}</code>
                  <p className="text-sm text-zinc-400">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">Why not Airflow, Temporal, or LangGraph?</p>
              <h2 className="mt-3 text-3xl font-bold text-white">One less service to run. One less bill to pay.</h2>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {vsCompetitors.map((col) => (
                <div key={col.label} className={`rounded-2xl border ${col.col} bg-white/[0.02] p-6`}>
                  <div className={`inline-block rounded-full px-3 py-1 text-sm font-semibold mb-5 ${col.pill}`}>{col.label}</div>
                  <ul className="space-y-3">
                    {col.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2 text-sm text-zinc-400">
                        <span className="mt-1 shrink-0 text-zinc-600">•</span>{pt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use cases */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">Use cases</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Workflows teams are running today</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {useCases.map((uc) => (
                <div key={uc.title} className="rounded-2xl border border-white/8 bg-white/[0.02] p-6">
                  <div className="text-3xl mb-4">{uc.icon}</div>
                  <h3 className="text-base font-semibold text-white mb-2">{uc.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{uc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">FAQ</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Common questions</h2>
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

        {/* Related */}
        <section className="border-t border-white/5 py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-6">Related capabilities</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Link href="/products/purple8/agentic-process-automation/" className="group rounded-xl border border-white/8 bg-white/[0.02] px-6 py-5 transition-colors hover:border-purple-700/50">
                <p className="text-sm font-semibold text-purple-300 group-hover:text-purple-200">🤖 Agentic Process Automation →</p>
                <p className="mt-1 text-xs text-zinc-500">AI agents orchestrate entire business processes end-to-end via MCP tools</p>
              </Link>
              <Link href="/products/purple8/quantum-optimisation/" className="group rounded-xl border border-white/8 bg-white/[0.02] px-6 py-5 transition-colors hover:border-violet-700/50">
                <p className="text-sm font-semibold text-violet-300 group-hover:text-violet-200">⚛️ Quantum-Inspired Optimisation →</p>
                <p className="mt-1 text-xs text-zinc-500">Combine workflows with combinatorial optimisation — routing, scheduling, allocation</p>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-white/5 py-20 text-center">
          <div className="mx-auto max-w-2xl px-4">
            <h2 className="text-3xl font-bold text-white">Replace Airflow in an afternoon</h2>
            <p className="mt-4 text-zinc-400">
              Free to start. Journey Engine is part of the base product. Point it at your first process and go.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a href="/register/" className="rounded-full bg-purple-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-purple-900/40 transition-colors hover:bg-purple-500">
                Start free
              </a>
              <a href="/products/purple8/" className="text-base font-semibold text-zinc-300 transition-colors hover:text-white">
                Explore Purple8 Hyper Graph →
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
