import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Multi-Agent Systems & AI Agent Swarms — Purple8 Hyper Graph",
  description:
    "Purple8 Hyper Graph is the shared-memory substrate for multi-agent AI systems. Agent swarms read and write the same persistent knowledge graph, coordinate via CDC events, and are governed by per-agent RBAC — all in one process.",
  path: "/products/purple8/multi-agent-systems",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Multi-Agent Systems & AI Agent Swarms — Purple8 Hyper Graph",
  description:
    "Purple8 provides the persistent shared memory, coordination primitives, and RBAC governance that AI agent swarms need. Multiple agents — researcher, analyst, writer, reviewer — all operate on the same knowledge graph, with full auditability.",
  url: "https://www.purple8.ai/products/purple8/multi-agent-systems/",
  publisher: { "@type": "Organization", name: "Purple8 Inc.", url: "https://www.purple8.ai" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.purple8.ai/" },
      { "@type": "ListItem", position: 2, name: "Purple8 Hyper Graph", item: "https://www.purple8.ai/products/purple8/" },
      { "@type": "ListItem", position: 3, name: "Multi-Agent Systems", item: "https://www.purple8.ai/products/purple8/multi-agent-systems/" },
    ],
  },
  mainEntity: {
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the main problem with multi-agent systems today?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most multi-agent frameworks (AutoGen, CrewAI, LangGraph) treat memory as a side effect — agents pass messages and state lives in RAM, lost between runs and invisible to other agents. This means Agent B cannot see what Agent A discovered unless you explicitly code the handoff. Purple8 solves this by making the knowledge graph the shared memory: every agent reads and writes the same persistent store, so every discovery is immediately available to the swarm.",
        },
      },
      {
        "@type": "Question",
        name: "How does Purple8 coordinate agents without message passing?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Via the CDC (Change Data Capture) event bus. When any agent writes a node or edge to the graph, all subscribers receive the event immediately. Agent B can subscribe to 'new FINDING nodes written by Agent A' and react without polling, without a message queue, and without Agent A knowing Agent B exists. This makes swarm coordination emergent rather than explicitly programmed.",
        },
      },
      {
        "@type": "Question",
        name: "How is access controlled across agents in a swarm?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Each agent authenticates with its own API key and is assigned a role (viewer/editor/admin/super_admin). RBAC is enforced per MCP tool call — a researcher agent can add nodes and edges but cannot delete them; a reviewer agent can read but not write. This is enforced at the graph engine level, not in application code, so it cannot be bypassed.",
        },
      },
      {
        "@type": "Question",
        name: "Can I audit what each agent did in a swarm run?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Every node and edge written to Purple8 carries the agent identity, timestamp, and operation type. The graph is the audit trail — you can query 'show me every node written by Agent A in the last 24 hours' or traverse the provenance chain from any finding back to the source document and the agent that extracted it.",
        },
      },
    ],
  },
};

const swarmPatterns = [
  {
    icon: "🔬",
    title: "Research synthesis swarm",
    agents: ["Ingestion agent → DocIntel → graph", "Extraction agent → entities + relationships", "Analysis agent → cross-document patterns via GraphRAG", "Writer agent → synthesis report from graph context"],
    value: "Agent 4 sees Agent 1's work the moment it lands — no handoff code.",
  },
  {
    icon: "⚖️",
    title: "M&A due diligence swarm",
    agents: ["Legal agent → contract graph", "Financial agent → revenue + risk graph", "Technical agent → architecture + codebase graph", "Coordinator → traverses all three, flags conflicts", "Partner → HITL gate before final memo"],
    value: "All agents share one graph. Coordinator queries across all domains in one traversal.",
  },
  {
    icon: "🛡️",
    title: "Threat hunting swarm",
    agents: ["N scanner agents (parallel) → each scans a segment", "Correlation agent → detects cross-segment patterns", "SOC agent → elevates threats, triggers containment", "Analyst → HITL gate on containment decisions"],
    value: "Scanner agents write findings concurrently. Correlation agent reacts via CDC — no polling.",
  },
  {
    icon: "🏗️",
    title: "AEC project review swarm",
    agents: ["BIM ingestion agent → building graph", "Structural agent → rigidity + load analysis", "MEP agent → max-flow + energy balance", "Compliance agent → code violation detection", "PM agent → rolls up findings, triggers approval workflow"],
    value: "Each specialist agent writes findings as typed edges. PM queries all in one traversal.",
  },
  {
    icon: "📊",
    title: "Competitive intelligence swarm",
    agents: ["Web agents → scrape + push to DocIntel", "Extraction agent → pricing, features, positioning graph", "Trends agent → temporal PageRank on feature mentions", "Strategy agent → RAG over the graph, produces briefing"],
    value: "Temporal PageRank shows which competitor moves are gaining momentum over time.",
  },
  {
    icon: "📋",
    title: "Compliance audit swarm",
    agents: ["Document ingestion agent → policies, contracts, logs", "Extraction agent → obligations + deadlines graph", "Monitoring agent → checks compliance state continuously", "Escalation agent → triggers HITL on breaches", "Auditor → immutable trail of every finding"],
    value: "The audit trail IS the graph — regulators can query it directly.",
  },
];

const primitives = [
  {
    icon: "🗄️",
    title: "Shared persistent memory",
    desc: "All agents read and write the same graph engine. Agent B's discovery is visible to Agent C the moment it's written — no message passing, no explicit handoff code.",
  },
  {
    icon: "📡",
    title: "CDC event coordination",
    desc: "graph.poll_changes and graph.wait_for_changes let agents subscribe to graph mutations. Agent B reacts to Agent A's writes without either agent knowing about the other.",
  },
  {
    icon: "🔐",
    title: "Per-agent RBAC",
    desc: "Each agent has its own API key and role. Researcher: editor. Reviewer: viewer. Coordinator: admin. Enforced at the engine level — not in application code.",
  },
  {
    icon: "🔍",
    title: "Shared vector + graph search",
    desc: "Any agent can run GraphRAG over the entire swarm's accumulated knowledge. Agent 4 can semantically search everything Agents 1–3 have written.",
  },
  {
    icon: "🔄",
    title: "Workflow coordination",
    desc: "Journey Engine gives the coordinator agent a state machine: advance stages, enforce SLAs, require human approval before the swarm's output is finalised.",
  },
  {
    icon: "📜",
    title: "Full provenance audit trail",
    desc: "Every node and edge carries agent identity and timestamp. You can trace any finding back to the source document and the agent that extracted it.",
  },
];

export default function MultiAgentSystemsPage() {
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
            <span className="text-zinc-400">Multi-Agent Systems</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden py-20">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-48 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-purple-900/12 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-700/40 bg-purple-950/40 px-4 py-1.5 text-sm font-medium text-purple-200">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-400" />
              </span>
              Part of Purple8 Hyper Graph · Shared memory · No message passing
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Agent swarms that{" "}
              <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                share one brain.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
              Most swarm frameworks treat memory as a side effect. Agents pass messages,
              state lives in RAM, and context is gone the moment a run ends. Purple8
              makes the knowledge graph the shared memory: every agent reads and writes
              the same persistent store, so Agent B sees what Agent A found the moment it
              lands. No handoff code. No message routing. The graph is the coordination layer.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a href="/register/" className="rounded-full bg-purple-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-purple-900/40 transition-colors hover:bg-purple-500">
                Start free
              </a>
              <a href="/quickstart/" className="text-base font-semibold text-zinc-300 transition-colors hover:text-white">
                Quickstart →
              </a>
            </div>
          </div>
        </section>

        {/* Core primitives */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">What Purple8 gives every agent in the swarm</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Six primitives. Zero glue code.</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {primitives.map((p) => (
                <div key={p.title} className="rounded-2xl border border-white/8 bg-white/[0.02] p-6">
                  <div className="text-3xl mb-4">{p.icon}</div>
                  <h3 className="text-base font-semibold text-white mb-2">{p.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Swarm patterns */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">Swarm patterns</p>
              <h2 className="mt-3 text-3xl font-bold text-white">What teams are building</h2>
            </div>
            <div className="space-y-6">
              {swarmPatterns.map((sp) => (
                <div key={sp.title} className="rounded-2xl border border-white/8 bg-white/[0.02] p-7">
                  <div className="flex items-start gap-4 mb-5">
                    <span className="text-3xl shrink-0">{sp.icon}</span>
                    <h3 className="text-lg font-bold text-white">{sp.title}</h3>
                  </div>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-600 mb-3">Agent pipeline</p>
                      <ul className="space-y-2">
                        {sp.agents.map((a) => (
                          <li key={a} className="flex items-start gap-2 text-sm text-zinc-400">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-purple-500" />{a}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-xl border border-purple-900/30 bg-purple-950/10 p-4 flex items-center">
                      <p className="text-sm text-purple-300 italic">&ldquo;{sp.value}&rdquo;</p>
                    </div>
                  </div>
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
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Link href="/products/purple8/rag-pipeline/" className="group rounded-xl border border-white/8 bg-white/[0.02] px-6 py-5 transition-colors hover:border-purple-700/50">
                <p className="text-sm font-semibold text-purple-300 group-hover:text-purple-200">🔍 RAG Pipeline →</p>
                <p className="mt-1 text-xs text-zinc-500">GraphRAG lets every agent query the swarm's accumulated knowledge</p>
              </Link>
              <Link href="/products/purple8/agentic-process-automation/" className="group rounded-xl border border-white/8 bg-white/[0.02] px-6 py-5 transition-colors hover:border-purple-700/50">
                <p className="text-sm font-semibold text-purple-300 group-hover:text-purple-200">🤖 Agentic Automation →</p>
                <p className="mt-1 text-xs text-zinc-500">Coordinate swarm output through structured workflow stages</p>
              </Link>
              <Link href="/products/purple8/opinion-engine/" className="group rounded-xl border border-white/8 bg-white/[0.02] px-6 py-5 transition-colors hover:border-purple-700/50">
                <p className="text-sm font-semibold text-purple-300 group-hover:text-purple-200">💡 Opinion Engine →</p>
                <p className="mt-1 text-xs text-zinc-500">Model what the swarm believes — consensus, conflict, confidence</p>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-white/5 py-20 text-center">
          <div className="mx-auto max-w-2xl px-4">
            <h2 className="text-3xl font-bold text-white">Build your first swarm in 60 seconds</h2>
            <p className="mt-4 text-zinc-400">Free to start. Shared graph memory, CDC coordination, and per-agent RBAC work from day one.</p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a href="/register/" className="rounded-full bg-purple-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-purple-900/40 transition-colors hover:bg-purple-500">Start free</a>
              <a href="/products/purple8/" className="text-base font-semibold text-zinc-300 transition-colors hover:text-white">Explore Purple8 Hyper Graph →</a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
