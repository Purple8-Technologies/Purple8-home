import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Scenario Simulation & What-If Analysis — Purple8 Hyper Graph",
  description:
    "Run what-if simulations on any system modelled as a graph — supply chains, clinical pathways, financial portfolios, infrastructure networks. Clone, shock, optimise, compare. No separate simulation engine required.",
  path: "/products/purple8/scenario-simulation",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Scenario Simulation & What-If Analysis — Purple8 Hyper Graph",
  description:
    "Purple8 Hyper Graph enables scenario simulation by combining graph cloning (multi-tenant isolation), graph algorithms (flow, centrality, shortest path), and quantum-inspired optimisation (VRP, scheduling, portfolio). Model a system, apply shocks, run solvers, compare outcomes.",
  url: "https://www.purple8.ai/products/purple8/scenario-simulation/",
  publisher: { "@type": "Organization", name: "Purple8 Inc.", url: "https://www.purple8.ai" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.purple8.ai/" },
      { "@type": "ListItem", position: 2, name: "Purple8 Hyper Graph", item: "https://www.purple8.ai/products/purple8/" },
      { "@type": "ListItem", position: 3, name: "Scenario Simulation", item: "https://www.purple8.ai/products/purple8/scenario-simulation/" },
    ],
  },
  mainEntity: {
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does Purple8 enable scenario simulation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Purple8 combines three capabilities: (1) multi-tenant graph isolation — clone your live graph into a simulation namespace with zero data copying; (2) graph algorithms — run max-flow, betweenness centrality, bridge detection, shortest path, and PageRank on the modified graph to measure the impact of changes; (3) quantum-inspired optimisation — re-solve VRP, scheduling, or portfolio allocation on the shocked graph to find new optima. Compare results across scenarios side by side.",
        },
      },
      {
        "@type": "Question",
        name: "What kinds of systems can be simulated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Any system that can be modelled as a graph: supply chains (suppliers, factories, distribution centres as nodes; flows and capacities as edges), clinical pathways (patients, stages, resources, bottlenecks), financial portfolios (assets, correlations, risk factors), infrastructure networks (nodes as facilities, edges as connections with capacity and failure probability), and belief or influence networks (opinion propagation modelling).",
        },
      },
      {
        "@type": "Question",
        name: "How does scenario cloning work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Purple8's multi-tenant architecture (tenancy.py) isolates data by tenant prefix or dedicated DB path. To create a simulation scenario, you clone the live graph into a new tenant namespace, apply your hypothetical changes (remove nodes, modify edge weights, add new entities), then run your analysis. The live graph is untouched. Multiple scenarios can run in parallel — each in its own isolated namespace.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between simulation and what-if analysis in Purple8?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "What-if analysis applies a single change and measures the outcome — remove supplier X, what does flow analysis show? Simulation runs multiple scenarios in parallel, compares outcomes across them, and uses quantum-inspired optimisation to find the best response to each shock. The combination answers not just 'what happens if?' but 'what should we do if?'",
        },
      },
    ],
  },
};

const howItWorks = [
  {
    step: "01",
    title: "Model your system as a graph",
    detail: "Nodes are entities (suppliers, facilities, assets, patients). Edges are relationships with capacity, weight, and constraint properties. DocIntel can extract these from existing documentation automatically.",
  },
  {
    step: "02",
    title: "Clone into a simulation namespace",
    detail: "Multi-tenant isolation creates a snapshot of your live graph in a new namespace. Zero data copying — the clone is ready instantly. Run multiple scenarios in parallel, each isolated.",
  },
  {
    step: "03",
    title: "Apply the shock",
    detail: "Remove nodes (supplier failure), modify edge weights (cost increase), add new entities (new route), or change constraints. The live graph is untouched.",
  },
  {
    step: "04",
    title: "Run analysis and optimisation",
    detail: "Graph algorithms measure impact: max-flow shows capacity change, bridge detection finds new single points of failure, betweenness centrality shows who bears extra load. Quantum solvers re-optimise routing, scheduling, or allocation under the new constraints.",
  },
  {
    step: "05",
    title: "Compare scenarios",
    detail: "AI agents query all simulation namespaces, compare metrics (total flow, makespan, cost, risk), and surface the best response strategy. Results feed directly into Journey Engine workflows for action.",
  },
];

const useCases = [
  {
    icon: "🚢",
    title: "Supply chain resilience",
    desc: "Model your supplier network as a graph. Clone and remove your top 3 suppliers simultaneously. Max-flow analysis shows how throughput degrades; quantum VRP re-routes around the failure. Know your resilience before the crisis.",
  },
  {
    icon: "🏥",
    title: "Clinical pathway stress testing",
    desc: "Simulate patient surge scenarios on your clinical pathway graph. Which stages bottleneck under 2× demand? Where does SLA breach first? Re-allocate resources via scheduling optimisation and measure the improvement.",
  },
  {
    icon: "📊",
    title: "Portfolio stress testing",
    desc: "Apply interest rate or sector shocks to your portfolio graph. Binary portfolio optimisation (quantum.portfolio) finds the optimal reallocation under the new constraints — not just sensitivity analysis, but actionable rebalancing.",
  },
  {
    icon: "⚡",
    title: "Infrastructure failure impact",
    desc: "Bridge detection finds every single point of failure in your infrastructure graph. Remove it, run betweenness centrality, see which nodes are now overloaded. Quantify impact before decommissioning anything.",
  },
  {
    icon: "🏙️",
    title: "Urban planning & traffic modelling",
    desc: "Model road networks as a graph. Close a road (remove an edge), run shortest-path and max-flow. MEP flow analysis from the AEC vertical shows how congestion redistributes — without simulation software.",
  },
  {
    icon: "💡",
    title: "Opinion & influence simulation",
    desc: "On a belief graph, ask: if this influential voice changes position, how does opinion propagate? Temporal PageRank on the modified graph shows which clusters shift and at what speed.",
  },
];

const capabilities = [
  { label: "Graph cloning", detail: "Multi-tenant namespace isolation — instant snapshot, zero copy" },
  { label: "Max-flow / min-cut", detail: "Edmonds-Karp — measures capacity and bottlenecks under any topology" },
  { label: "Bridge detection", detail: "Tarjan DFS — finds every single point of failure before it fails" },
  { label: "Betweenness centrality", detail: "Which nodes bear the most load? Who becomes critical after a shock?" },
  { label: "Shortest path", detail: "Dijkstra weighted — re-route analysis after node/edge removal" },
  { label: "quantum.vrp", detail: "Re-optimise routing under new capacity and constraint landscape" },
  { label: "quantum.scheduling", detail: "Re-solve job/resource allocation under surge or shortage" },
  { label: "quantum.portfolio", detail: "Rebalance binary allocations under rate or sector shocks" },
  { label: "GraphRAG", detail: "AI agents query all scenarios and surface the best response strategy" },
];

export default function ScenarioSimulationPage() {
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
            <span className="text-zinc-400">Scenario Simulation</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden py-20">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-48 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-violet-900/10 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-700/40 bg-violet-950/30 px-4 py-1.5 text-sm font-medium text-violet-200">
              <span className="text-base">🔮</span>
              Part of Purple8 Hyper Graph · What-if analysis · No simulation software
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Ask what happens{" "}
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                before it does.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
              Model any system as a graph. Clone it into an isolated namespace. Apply
              the shock: supplier failure, rate hike, patient surge, infrastructure
              outage. Run graph algorithms and quantum-inspired solvers. Compare outcomes
              across scenarios. The answer to &ldquo;what should we do if this happens?&rdquo;
              shouldn&apos;t wait for the crisis.
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

        {/* How it works */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-violet-400">How it works</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Five steps. No simulation software.</h2>
            </div>
            <div className="space-y-8">
              {howItWorks.map((s) => (
                <div key={s.step} className="flex items-start gap-6">
                  <div className="shrink-0 text-3xl font-bold text-violet-800/60 w-12 text-right">{s.step}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{s.title}</h3>
                    <p className="mt-1 text-zinc-400">{s.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities used */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-violet-400">What runs under the hood</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Everything you need. Already built in.</h2>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((c) => (
                <div key={c.label} className="rounded-xl border border-white/8 bg-white/[0.015] px-5 py-4">
                  <code className="text-xs font-mono text-violet-300">{c.label}</code>
                  <p className="mt-1.5 text-sm text-zinc-500">{c.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use cases */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-violet-400">Use cases</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Systems you can stress-test today</h2>
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
              <p className="text-sm font-semibold uppercase tracking-widest text-violet-400">FAQ</p>
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
              <Link href="/products/purple8/quantum-optimisation/" className="group rounded-xl border border-white/8 bg-white/[0.02] px-6 py-5 transition-colors hover:border-violet-700/50">
                <p className="text-sm font-semibold text-violet-300 group-hover:text-violet-200">⚛️ Quantum Optimisation →</p>
                <p className="mt-1 text-xs text-zinc-500">Re-solve routing, scheduling, and portfolios after each simulated shock</p>
              </Link>
              <Link href="/products/purple8/opinion-engine/" className="group rounded-xl border border-white/8 bg-white/[0.02] px-6 py-5 transition-colors hover:border-purple-700/50">
                <p className="text-sm font-semibold text-purple-300 group-hover:text-purple-200">💡 Opinion Engine →</p>
                <p className="mt-1 text-xs text-zinc-500">Simulate opinion propagation — what if this influencer changes position?</p>
              </Link>
              <Link href="/products/purple8/multi-agent-systems/" className="group rounded-xl border border-white/8 bg-white/[0.02] px-6 py-5 transition-colors hover:border-purple-700/50">
                <p className="text-sm font-semibold text-purple-300 group-hover:text-purple-200">🤖 Multi-Agent Systems →</p>
                <p className="mt-1 text-xs text-zinc-500">Deploy analyst swarms to run and compare multiple scenarios in parallel</p>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-white/5 py-20 text-center">
          <div className="mx-auto max-w-2xl px-4">
            <h2 className="text-3xl font-bold text-white">Model your first scenario today</h2>
            <p className="mt-4 text-zinc-400">Free to start. Graph cloning, algorithms, and quantum solvers are part of the base product. Nothing extra to buy.</p>
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
