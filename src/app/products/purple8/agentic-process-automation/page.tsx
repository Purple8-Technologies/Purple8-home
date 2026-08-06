import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Agentic Process Automation — Purple8 Hyper Graph",
  description:
    "Purple8 Hyper Graph is the AI-native backend for agentic process automation. Journey Engine, 82 MCP tools, graph memory, SLA enforcement, and human-in-the-loop gates — all built in. No Airflow, no LangGraph, no custom glue code.",
  path: "/products/purple8/agentic-process-automation",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Agentic Process Automation — Purple8 Hyper Graph",
  description:
    "Purple8 Hyper Graph provides out-of-the-box agentic process automation: AI agents orchestrate multi-stage workflows, enforce SLAs, handle human-in-the-loop approvals, and maintain an immutable audit trail — all through 82 MCP tools, with no custom orchestration code.",
  url: "https://www.purple8.ai/products/purple8/agentic-process-automation/",
  publisher: { "@type": "Organization", name: "Purple8 Inc.", url: "https://www.purple8.ai" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.purple8.ai/" },
      { "@type": "ListItem", position: 2, name: "Purple8 Hyper Graph", item: "https://www.purple8.ai/products/purple8/" },
      { "@type": "ListItem", position: 3, name: "Agentic Process Automation", item: "https://www.purple8.ai/products/purple8/agentic-process-automation/" },
    ],
  },
  mainEntity: {
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is agentic process automation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Agentic process automation (APA) is the use of AI agents — rather than humans or rigid scripts — to orchestrate, execute, and adapt multi-step business processes end-to-end. Unlike traditional RPA (which records mouse clicks) or BPM (which follows fixed flowcharts), agentic automation reasons about context, handles exceptions autonomously, and learns from each run.",
        },
      },
      {
        "@type": "Question",
        name: "How does Purple8 support agentic process automation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Purple8's Journey Engine provides the stateful workflow layer AI agents need: multi-stage process definitions, SLA enforcement, human-in-the-loop approval gates, and an immutable audit trail — all stored in the graph and accessible to agents through 82 MCP tools. An agent can start a process instance, advance it through stages, handle exceptions, and surface decisions for human review entirely through natural language tool calls.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between agentic automation and RPA?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "RPA automates fixed sequences of UI actions and breaks when screens change. Agentic automation uses AI agents that reason about intent, retrieve context from a knowledge graph, adapt to new inputs, and make decisions — without being programmed for every edge case. Purple8 provides the persistent memory, workflow state, and tool interface that make agentic automation reliable in production.",
        },
      },
      {
        "@type": "Question",
        name: "Does agentic automation require a separate workflow engine?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Not with Purple8. The Journey Engine is built into the same process as the graph database, vector search, RAG pipeline, and authentication layer. There is no Airflow, no Temporal, no LangGraph — agents call journey.* MCP tools directly and the workflow runs in-process.",
        },
      },
      {
        "@type": "Question",
        name: "Can Purple8 handle human-in-the-loop (HITL) steps in agentic workflows?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Stages in a Journey Engine process can require human approval before the instance advances. The journey.list_hitl MCP tool surfaces pending decisions; journey.resolve_hitl unblocks them. The audit trail of who approved what, when, and why is stored immutably in the graph as edges.",
        },
      },
    ],
  },
};

const useCases = [
  {
    icon: "📋",
    title: "Loan origination & compliance",
    desc: "An agent ingests the application, extracts entities via DocIntel, traverses the customer's relationship graph to assess risk, advances through underwriting stages, gates on human review, and maintains a full audit trail — without application code.",
  },
  {
    icon: "🏥",
    title: "Patient pathway management",
    desc: "Multi-stage clinical workflows with SLA enforcement per stage. Agents track referrals, flag delays, surface HITL tasks for clinicians, and log every state transition immutably.",
  },
  {
    icon: "🏗️",
    title: "Procurement & supplier approval",
    desc: "Agents route purchase requests, verify supplier credentials against the knowledge graph, enforce spend limits, escalate exceptions to the right approver, and close the loop with automated PO generation.",
  },
  {
    icon: "🛡️",
    title: "Security incident response",
    desc: "SOC vertical detects anomalies, triggers a containment workflow, escalates to human analysts for critical decisions, and documents the entire response chain as an auditable graph.",
  },
  {
    icon: "📄",
    title: "Contract lifecycle automation",
    desc: "Ingest contracts via DocIntel, extract obligations and parties, track milestone dates through Journey Engine stages, alert when SLAs approach, route renewals to stakeholders with full version history.",
  },
  {
    icon: "🤝",
    title: "Customer onboarding",
    desc: "KYC document ingestion, entity extraction, risk scoring via graph traversal, staged approval with HITL gates, and automated account provisioning — end-to-end, agent-driven.",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Define the process",
    detail: "Call journey.define with stage definitions, SLA policies, and HITL requirements. Natural language descriptions are enough.",
  },
  {
    step: "02",
    title: "Agent starts an instance",
    detail: "journey.start creates a workflow instance stored as a graph node. Every state transition becomes an edge — the graph IS the process state machine.",
  },
  {
    step: "03",
    title: "Agent advances through stages",
    detail: "The agent calls journey.advance after completing each stage's work. SLA timers run automatically; breaches create SLA_BREACHED edges.",
  },
  {
    step: "04",
    title: "Humans approve where required",
    detail: "HITL gates pause the workflow. A portal surfaces pending decisions via journey.list_hitl. The approver's decision is an immutable graph edge.",
  },
  {
    step: "05",
    title: "Audit trail is always there",
    detail: "Every transition, AI action, and human decision is stored as a graph edge. journey.audit returns the complete, tamper-evident history of any instance.",
  },
];

export default function AgenticProcessAutomationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main id="main-content" className="bg-[#0a0a0f] pt-16">

        {/* Breadcrumb */}
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-8 pb-0">
          <nav className="flex items-center gap-2 text-xs text-zinc-600">
            <Link href="/" className="hover:text-zinc-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products/purple8/" className="hover:text-zinc-400 transition-colors">Purple8 Hyper Graph</Link>
            <span>/</span>
            <span className="text-zinc-400">Agentic Process Automation</span>
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
              Part of Purple8 Hyper Graph · Built in · No extra services
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Agentic Process Automation.{" "}
              <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                Out of the box.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
              Purple8 gives AI agents everything they need to run real business processes
              end-to-end: stateful workflows, SLA enforcement, human-approval gates,
              knowledge graph memory, and a full audit trail. Through 82 MCP tools, in a
              single process. An agent that can call <code className="text-purple-300 text-base">journey.advance</code> can
              run a loan application, a compliance review, or a supplier approval from
              start to finish.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="/register/"
                className="rounded-full bg-purple-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-purple-900/40 transition-colors hover:bg-purple-500"
              >
                Start free
              </a>
              <a href="/quickstart/" className="text-base font-semibold text-zinc-300 transition-colors hover:text-white">
                See how it works →
              </a>
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">What makes it agentic</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Not RPA. Not BPM. Agentic.</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {[
                {
                  label: "RPA",
                  colour: "border-zinc-800",
                  pill: "bg-zinc-800 text-zinc-400",
                  points: ["Records UI clicks — breaks when screens change", "No reasoning — fixed scripts only", "No memory between runs", "Fails silently on exceptions"],
                },
                {
                  label: "Traditional BPM",
                  colour: "border-zinc-800",
                  pill: "bg-zinc-800 text-zinc-400",
                  points: ["Fixed flowcharts — every path pre-defined", "Requires developers to model every exception", "Audit trail in a separate log system", "Separate orchestration service to operate"],
                },
                {
                  label: "Purple8 Agentic Automation",
                  colour: "border-purple-700/60",
                  pill: "bg-purple-900/40 text-purple-300",
                  points: ["Agent reasons about intent and context", "Handles exceptions without pre-programming", "Knowledge graph memory persists across runs", "SLA enforcement and HITL built in", "Audit trail is the graph — immutable, always on"],
                },
              ].map((col) => (
                <div key={col.label} className={`rounded-2xl border ${col.colour} bg-white/[0.02] p-6`}>
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

        {/* How it works */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">How it works</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Five steps. Zero orchestration service.</h2>
            </div>
            <div className="space-y-8">
              {howItWorks.map((s) => (
                <div key={s.step} className="flex items-start gap-6">
                  <div className="shrink-0 text-3xl font-bold text-purple-800/60 w-12 text-right">{s.step}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{s.title}</h3>
                    <p className="mt-1 text-zinc-400">{s.detail}</p>
                  </div>
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
              <h2 className="mt-3 text-3xl font-bold text-white">What teams are automating</h2>
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

        {/* Stack replaced */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">Stack consolidation</p>
            <h2 className="mt-3 text-3xl font-bold text-white">One process replaces five services</h2>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {["Airflow / Temporal", "LangGraph", "LangChain", "LangSmith", "Pinecone / Weaviate", "Neo4j", "Auth0", "Elasticsearch"].map((s) => (
                <span key={s} className="rounded-full border border-zinc-700 bg-zinc-900/60 px-4 py-2 text-sm text-zinc-400 line-through decoration-zinc-600">{s}</span>
              ))}
            </div>
            <div className="mt-6">
              <span className="rounded-full border border-purple-700/60 bg-purple-950/40 px-6 py-2.5 text-base font-semibold text-purple-200">
                Purple8 Hyper Graph — all of the above, in one process
              </span>
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
              <Link href="/products/purple8/workflow-orchestration/" className="group rounded-xl border border-white/8 bg-white/[0.02] px-6 py-5 transition-colors hover:border-purple-700/50">
                <p className="text-sm font-semibold text-purple-300 group-hover:text-purple-200">🔄 Workflow Orchestration →</p>
                <p className="mt-1 text-xs text-zinc-500">Stateful pipelines, SLA enforcement, CDC triggers — replaces Airflow and Temporal</p>
              </Link>
              <Link href="/products/purple8/quantum-optimisation/" className="group rounded-xl border border-white/8 bg-white/[0.02] px-6 py-5 transition-colors hover:border-violet-700/50">
                <p className="text-sm font-semibold text-violet-300 group-hover:text-violet-200">⚛️ Quantum-Inspired Optimisation →</p>
                <p className="mt-1 text-xs text-zinc-500">NP-hard combinatorial problems — VRP, scheduling, portfolio — callable by agents</p>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-white/5 py-20 text-center">
          <div className="mx-auto max-w-2xl px-4">
            <h2 className="text-3xl font-bold text-white">Ready to automate your first process?</h2>
            <p className="mt-4 text-zinc-400">Free to start, runs on your machine, and takes about 60 seconds to install.</p>
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
