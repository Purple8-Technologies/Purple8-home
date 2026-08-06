import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Autonomous M&A Due Diligence — Purple8 Hyper Graph",
  description:
    "Purple8 Hyper Graph runs M&A due diligence as a multi-agent workflow: ingest the data room, build a relational knowledge graph of the target, run legal, financial, technical, and regulatory review in parallel, stress-test scenarios, and produce a board-ready output with a regulator-auditable trail.",
  path: "/products/purple8/ma-due-diligence",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Autonomous M&A Due Diligence — Purple8 Hyper Graph",
  description:
    "Purple8 runs the entire M&A due diligence process as a coordinated agent workflow: document ingestion, knowledge graph construction, parallel specialist review, scenario stress-testing, deal structure optimisation, and staged human approval — in a single platform with a tamper-evident audit trail.",
  url: "https://www.purple8.ai/products/purple8/ma-due-diligence/",
  publisher: { "@type": "Organization", name: "Purple8 Inc.", url: "https://www.purple8.ai" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.purple8.ai/" },
      { "@type": "ListItem", position: 2, name: "Purple8 Hyper Graph", item: "https://www.purple8.ai/products/purple8/" },
      { "@type": "ListItem", position: 3, name: "M&A Due Diligence", item: "https://www.purple8.ai/products/purple8/ma-due-diligence/" },
    ],
  },
  mainEntity: {
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does Purple8 actually do in M&A due diligence?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Purple8 ingests the entire data room via DocIntel (contracts, financials, cap tables, IP filings, employment agreements, regulatory correspondence, technical documentation) and builds a relational knowledge graph of the target company. A multi-agent swarm then runs legal, financial, technical, HR, and regulatory review simultaneously — each agent writing findings as typed graph edges. The result is a cross-linked knowledge structure that reveals relationships and risks that siloed document review misses entirely.",
        },
      },
      {
        "@type": "Question",
        name: "How does this replace the current advisory process?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It doesn't replace the advisory firm — it changes what their team spends time on. The agents handle document ingestion, entity extraction, clause identification, cross-reference detection, and first-pass risk flagging. The advisors spend their time on the findings that matter: the edge cases, the negotiation strategy, the client relationship. A team that currently runs 5 deals a year can run 20 with the same headcount.",
        },
      },
      {
        "@type": "Question",
        name: "How does the audit trail work for regulatory purposes?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Every finding, every agent action, every human approval decision is written as an immutable graph edge with agent identity, timestamp, and provenance back to the source document. When a regulator asks to see the decision trail — who reviewed what, when, based on which document — the entire chain is in the graph, traversable and exportable. Nothing is reconstructed from memory or emails after the fact.",
        },
      },
      {
        "@type": "Question",
        name: "Can change-of-control clauses be detected automatically?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. DocIntel extracts contract obligations and the legal agent traverses the graph to find all agreements with change-of-control triggers, consent requirements, or acceleration clauses. Because they are stored as typed edges in the knowledge graph — not buried in document text — they can be queried across the entire contract portfolio simultaneously. The agent surfaces every affected agreement in one pass.",
        },
      },
      {
        "@type": "Question",
        name: "What does scenario simulation add to due diligence?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "After the knowledge graph is built, you can clone it into isolated simulation namespaces and apply shocks: remove the two engineers with the most graph centrality (key-person risk), remove the top customer (revenue concentration), apply the pending regulatory change in the target's primary market. Graph algorithms measure the impact on each scenario. The quantum optimisation layer then finds the optimal deal structure — earnout schedule, escrow, retention packages — under the constraints revealed by the analysis.",
        },
      },
    ],
  },
};

const phases = [
  {
    step: "01",
    title: "Data room ingestion",
    agent: "DocIntel",
    detail:
      "Every document in the virtual data room — contracts, financials, filings, technical specs, correspondence — is ingested via DocIntel. Entities, obligations, counterparties, dates, and relationships are extracted automatically and written into the knowledge graph. A data room that would take a paralegal team two weeks to index is processed in hours.",
  },
  {
    step: "02",
    title: "Knowledge graph construction",
    agent: "graph.*",
    detail:
      "The target company becomes a living graph. Every contract obligation is an edge. Every counterparty relationship is a node. Every IP dependency, every regulatory filing, every related-party transaction has a place in the structure. Cross-references that require reading 40 contracts simultaneously to find emerge from a single graph query.",
  },
  {
    step: "03",
    title: "Parallel specialist review",
    agent: "Multi-agent swarm",
    detail:
      "Five agents run simultaneously, each writing findings to the shared graph as they work. The legal agent flags change-of-control triggers, non-standard indemnities, and IP ownership gaps. The financial agent identifies customer concentration, recurring vs one-off revenue, and covenant exposure. The technical agent maps single-engineer dependencies and licence conflicts. The HR agent flags key-person risk and compensation anomalies. The regulatory agent maps pending matters and jurisdiction exposure. None of them wait for the others.",
  },
  {
    step: "04",
    title: "Stakeholder & sentiment mapping",
    agent: "Opinion Engine",
    detail:
      "The opinion engine traverses the graph to model which executives are likely to stay, which customers are at risk, and which investors may push back on the deal. Document signals — board minutes, investor communications, employment agreements, customer correspondence — are weighted by recency and source credibility. The output is a stakeholder position map before the first management presentation.",
  },
  {
    step: "05",
    title: "Scenario stress-testing",
    agent: "Scenario Simulation",
    detail:
      "The live deal graph is cloned into isolated simulation namespaces. Each scenario applies a specific shock: the two most graph-central engineers leave, the anchor customer churns, the regulatory change pending in Brussels passes. Graph algorithms score the impact on each scenario. The advisory team reviews the stress-test results before deciding which risks require price adjustment, escrow, or earnout protection.",
  },
  {
    step: "06",
    title: "Deal structure optimisation",
    agent: "quantum.optimize",
    detail:
      "Earnout schedule, escrow amount, retention package allocation across key employees — all of these are binary allocation problems under competing constraints. The quantum optimisation layer formulates them as QUBO problems and finds the Pareto-optimal deal structure: one that protects the acquirer's downside while remaining acceptable to the target's board.",
  },
  {
    step: "07",
    title: "Staged approval and audit trail",
    agent: "Journey Engine",
    detail:
      "The deal moves through defined approval gates: IC memo, legal sign-off, board approval, regulatory filing. Each gate is a mandatory human decision recorded as an immutable graph edge. When the regulator or a court asks to see the decision trail, the full chain is in the graph — who reviewed what, based on which findings, at what time — traversable and exportable in minutes.",
  },
];

const currentCost = [
  { item: "Virtual data room licence", cost: "$30–80K" },
  { item: "Legal document review (associates)", cost: "$300–800K" },
  { item: "Financial due diligence (Big 4)", cost: "$400–900K" },
  { item: "Technical due diligence", cost: "$100–250K" },
  { item: "Investment bank advisory fee", cost: "$1–5M" },
  { item: "Time to completion", cost: "3–6 months" },
];

const withPurple8 = [
  { item: "Document ingestion and graph construction", cost: "Hours, not weeks" },
  { item: "Parallel specialist review (5 agents simultaneously)", cost: "Days, not months" },
  { item: "Scenario stress-testing", cost: "Included" },
  { item: "Regulator-ready audit trail", cost: "Produced automatically" },
  { item: "Advisory team focus", cost: "Judgement, not indexing" },
];

const targetCustomers = [
  {
    icon: "🏦",
    title: "Boutique M&A advisory firms",
    desc: "Run more mandates with the same team. A four-person firm that currently handles 8 deals a year can handle 25. The differentiation in pitch: faster, more thorough, and you can show the client the knowledge graph of their own target.",
  },
  {
    icon: "🏢",
    title: "Big 4 Transaction Services",
    desc: "Replace the associate-hours spent on document indexing and first-pass review. Senior staff spend time on findings that require judgement. The audit trail satisfies the same documentation standards as the current process.",
  },
  {
    icon: "⚖️",
    title: "M&A law firms",
    desc: "Contract review that surfaces every change-of-control clause, every indemnity anomaly, every IP gap across a 2,000-document data room in hours. Partners review the graph, not the stack of paper.",
  },
  {
    icon: "🏗️",
    title: "Corporate development teams",
    desc: "Run your own preliminary due diligence before engaging external advisors. Arrive at the first advisor meeting having already mapped the target's risk landscape. Negotiate the advisory mandate from a position of knowledge.",
  },
  {
    icon: "💼",
    title: "Private equity firms",
    desc: "Build a consistent due diligence knowledge graph across every portfolio company. When a second acquisition in the same sector comes along, you start from an existing graph — not from zero.",
  },
];

export default function MaDueDiligencePage() {
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
            <span className="text-zinc-400">M&amp;A Due Diligence</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden py-20">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-48 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-purple-900/12 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-700/40 bg-purple-950/40 px-4 py-1.5 text-sm font-medium text-purple-200">
              <span className="text-base">🏦</span>
              Purple8 Hyper Graph · M&amp;A · Transaction Advisory
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Due diligence that reads{" "}
              <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                the whole picture.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
              A $200M deal generates 2,000 documents across legal, financial, technical,
              and regulatory workstreams. Today those workstreams run sequentially, each
              team blind to what the others are finding. Purple8 ingests the entire data
              room, builds a relational knowledge graph of the target, and runs all five
              workstreams simultaneously — so the findings talk to each other from the
              start.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="/register/"
                className="rounded-full bg-purple-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-purple-900/40 transition-colors hover:bg-purple-500"
              >
                Request a demo
              </a>
              <a href="/quickstart/" className="text-base font-semibold text-zinc-300 transition-colors hover:text-white">
                See the technical architecture →
              </a>
            </div>
          </div>
        </section>

        {/* Cost comparison */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">The current state</p>
              <h2 className="mt-3 text-3xl font-bold text-white">A $200M deal costs $2–7M to review. Most of that is information processing.</h2>
            </div>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-4">Current advisory spend per deal</p>
                <div className="space-y-2">
                  {currentCost.map((row) => (
                    <div key={row.item} className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/40 px-4 py-3">
                      <span className="text-sm text-zinc-400">{row.item}</span>
                      <span className="text-sm font-semibold text-zinc-300">{row.cost}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-4">With Purple8</p>
                <div className="space-y-2">
                  {withPurple8.map((row) => (
                    <div key={row.item} className="flex items-center justify-between rounded-lg border border-purple-900/40 bg-purple-950/10 px-4 py-3">
                      <span className="text-sm text-zinc-400">{row.item}</span>
                      <span className="text-sm font-semibold text-purple-300">{row.cost}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-zinc-600 leading-relaxed">
                  Advisory fees don&apos;t disappear — experienced judgement has real value.
                  What changes is what that time is spent on.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">How it works</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Seven phases. One platform. Every finding connected.</h2>
            </div>
            <div className="space-y-10">
              {phases.map((p) => (
                <div key={p.step} className="flex items-start gap-6">
                  <div className="shrink-0 text-3xl font-bold text-purple-800/50 w-12 text-right">{p.step}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                      <code className="rounded bg-purple-950/60 px-2 py-0.5 text-xs font-mono text-purple-400">{p.agent}</code>
                    </div>
                    <p className="text-zinc-400 leading-relaxed">{p.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why the graph matters */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">Why graph matters here</p>
                <h2 className="mt-3 text-3xl font-bold text-white">The risks that matter are between documents, not inside them.</h2>
                <p className="mt-5 text-zinc-400 leading-relaxed">
                  A change-of-control clause in a supplier agreement only becomes critical
                  when you know that supplier accounts for 40% of gross margin — a fact
                  in a different document in a different workstream.
                </p>
                <p className="mt-3 text-zinc-400 leading-relaxed">
                  An IP ownership gap in a patent assignment only becomes a deal-breaker
                  when you know the product depends on that specific patent — a fact in
                  the technical architecture documentation that legal never sees.
                </p>
                <p className="mt-3 text-zinc-400 leading-relaxed">
                  Purple8 stores every entity from every document in the same graph.
                  Cross-workstream risks surface automatically because the graph
                  traversal doesn&apos;t respect the boundaries between teams.
                </p>
              </div>
              <div className="space-y-3">
                {[
                  { edge: "CONTRACT → SUPPLIER", detail: "Change-of-control consent required" },
                  { edge: "SUPPLIER → REVENUE", detail: "43% of gross margin dependency" },
                  { edge: "PATENT → PRODUCT", detail: "Core feature relies on this IP" },
                  { edge: "PATENT → ASSIGNEE", detail: "Assignment incomplete — founder, not company" },
                  { edge: "ENGINEER → CODEBASE", detail: "Sole author of payment module" },
                  { edge: "ENGINEER → VESTING", detail: "Cliff in 3 months — flight risk" },
                ].map((row) => (
                  <div key={row.edge} className="flex items-start gap-4 rounded-xl border border-white/8 bg-white/[0.02] px-5 py-3">
                    <code className="shrink-0 text-xs font-mono text-purple-400 mt-0.5">{row.edge}</code>
                    <p className="text-sm text-zinc-400">{row.detail}</p>
                  </div>
                ))}
                <p className="text-xs text-zinc-600 pt-1">Each row is a graph edge. In a traditional review, these six facts live in six different documents reviewed by three different teams.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">Who uses this</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Built for the firms that run the deals</h2>
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
              <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">FAQ</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Questions we get from advisory teams</h2>
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
                { href: "/products/purple8/rag-pipeline/", label: "GraphRAG", desc: "Query across the entire deal graph" },
                { href: "/products/purple8/multi-agent-systems/", label: "Multi-Agent Systems", desc: "Five workstreams running simultaneously" },
                { href: "/products/purple8/opinion-engine/", label: "Opinion Engine", desc: "Stakeholder position mapping" },
                { href: "/products/purple8/scenario-simulation/", label: "Scenario Simulation", desc: "Key-person, customer, and regulatory stress tests" },
                { href: "/products/purple8/quantum-optimisation/", label: "Quantum Optimisation", desc: "Earnout and escrow structure optimisation" },
                { href: "/products/purple8/workflow-orchestration/", label: "Workflow Orchestration", desc: "IC, board, and regulatory approval gates" },
              ].map((cap) => (
                <Link key={cap.href} href={cap.href} className="group rounded-xl border border-white/8 bg-white/[0.02] px-5 py-4 transition-colors hover:border-purple-700/50">
                  <p className="text-sm font-semibold text-purple-300 group-hover:text-purple-200">{cap.label} →</p>
                  <p className="mt-1 text-xs text-zinc-500">{cap.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-white/5 py-20 text-center">
          <div className="mx-auto max-w-2xl px-4">
            <h2 className="text-3xl font-bold text-white">Run your next deal on a knowledge graph</h2>
            <p className="mt-4 text-zinc-400">
              We work with advisory teams to map their current process onto Purple8.
              The first conversation is about your deal flow, not a product demo.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="/register/"
                className="rounded-full bg-purple-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-purple-900/40 transition-colors hover:bg-purple-500"
              >
                Request a demo
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
