import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Fashion Trend Intelligence — Purple8 Hyper Graph",
  description:
    "Purple8 Hyper Graph solves the $500B dead stock problem. Map how trends travel through influencer and community graphs, connect signals to SKUs before the production window closes, and stop guessing which styles will sell.",
  path: "/products/purple8/fashion-intelligence",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Fashion Trend Intelligence — Purple8 Hyper Graph",
  description:
    "The fashion industry produces 100 billion garments a year. 30 to 40 percent are never sold. Not because brands lack data, but because the signals are disconnected. Purple8 maps how trends travel through influencer and community graphs, connects them to SKUs and supplier lead times, and closes the gap between signal and production decision.",
  url: "https://www.purple8.ai/products/purple8/fashion-intelligence/",
  publisher: { "@type": "Organization", name: "Purple8 Inc.", url: "https://www.purple8.ai" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.purple8.ai/" },
      { "@type": "ListItem", position: 2, name: "Purple8 Hyper Graph", item: "https://www.purple8.ai/products/purple8/" },
      { "@type": "ListItem", position: 3, name: "Fashion Intelligence", item: "https://www.purple8.ai/products/purple8/fashion-intelligence/" },
    ],
  },
  mainEntity: {
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How is this different from WGSN or Trendalytics?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "WGSN and Trendalytics give you lists: top trending colours, top styles, aggregate social volume. They cannot tell you how a trend travels, which micro-community originated it, which influencer graph is carrying it, how fast it is moving, which SKU categories it will hit first, or how long it typically takes to reach mass market from that origin point. That requires a graph, not a dashboard of aggregated metrics.",
        },
      },
      {
        "@type": "Question",
        name: "How does Purple8 connect trend signals to production decisions?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Trend nodes are connected directly to SKU nodes via typed relationship edges: TREND_SIGNALS_CATEGORY, SKU_MAPS_TO_TREND, SUPPLIER_PRODUCES_SKU. When Purple8 detects a trend accelerating in a micro-community that historically precedes mass market adoption by 11 weeks, it traverses the graph to find which SKUs in the current range are aligned, which suppliers produce them, and whether those suppliers have capacity within the production window.",
        },
      },
      {
        "@type": "Question",
        name: "What data sources does Purple8 ingest for fashion intelligence?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "DocIntel ingests unstructured trend data including social posts, editorial coverage, search trend exports, resale price feeds, runway coverage, and micro-community content, and emits structured graph entities: Trend nodes, Influencer nodes, and Community nodes with typed relationship edges carrying velocity, recency, and source credibility weights. Structured data such as the SKU catalogue, supplier lead times, and inventory positions is written directly to the graph via the standard API.",
        },
      },
      {
        "@type": "Question",
        name: "Can Purple8 identify which trends are real and which are noise?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Ask Claude on any Trend node and the response cites the actual propagation path, velocity curve, origin community, and comparable historical trends that followed the same graph pattern. A trend originating in a resale micro-community that moved to editorial and then to mass search is a validated signal. A trend spiking only in paid influencer content with no organic community uptake is identifiable as manufactured. The graph evidence distinguishes them.",
        },
      },
      {
        "@type": "Question",
        name: "How does this reduce dead stock?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Dead stock is produced when a brand bets on the last trend instead of the next one, because by the time aggregated data shows a pattern, the production window has closed. Purple8 detects trend origin in micro-communities 8 to 14 weeks before mass market adoption. Connected to supplier lead times, it answers the question that matters: can we make this in time? If yes, the brand buys signal-validated inventory rather than speculative inventory.",
        },
      },
    ],
  },
};

const patterns = [
  {
    number: "01",
    icon: "\u{1F331}",
    title: "Trend Origin Detection",
    subtitle: "Signal · Micro-Community",
    desc: "Every trend starts somewhere: a resale subculture, a niche TikTok community, a single influential stylist. PageRank identifies the origin node in the influencer graph, the account whose posts consistently precede mass adoption for the trends that mattered last season. Community detection clusters the micro-communities carrying a nascent trend before any aggregated platform data shows it.",
    tags: ["PageRank", "Community detection", "Origin node", "Temporal analysis"],
  },
  {
    number: "02",
    icon: "\u{1F4E1}",
    title: "Trend Propagation Mapping",
    subtitle: "Network Traversal · Velocity",
    desc: "A trend does not appear. It travels. Resale price spike, TikTok micro-community, editorial pickup, mainstream search. Purple8 maps the full propagation path as a graph traversal, records velocity at each hop, and compares it to historical trends that followed the same path. When a trend matches the signature of a category-defining moment, the graph makes that explicit.",
    tags: ["Graph traversal", "Velocity scoring", "Historical pattern matching"],
  },
  {
    number: "03",
    icon: "\u{1F517}",
    title: "Influencer to SKU Mapping",
    subtitle: "Attribution · Demand Signal",
    desc: "Which influencer is driving demand for which specific product attribute: silhouette, fabric, colourway, category? Purple8 connects Influencer nodes to Trend nodes to SKU attribute nodes. When a specific silhouette gains traction in a community with verified purchase intent, it becomes a typed edge to the relevant SKUs in the current range, not a manual analyst exercise.",
    tags: ["Influence attribution", "SKU-level signal", "Purchase intent", "Attribute graph"],
  },
  {
    number: "04",
    icon: "\u23F1\uFE0F",
    title: "Production Window Intelligence",
    subtitle: "Supplier · Lead Time",
    desc: "Trend signal is worthless if the production window has closed. Purple8 connects Trend velocity nodes to Supplier lead time nodes. For every accelerating trend, the graph answers the question that matters: which suppliers produce the relevant SKU category, what is their current lead time, and does it fit inside the trend's predicted mass-market window.",
    tags: ["Supplier graph", "Lead time", "Window calculation"],
  },
  {
    number: "05",
    icon: "\u{1F4E6}",
    title: "Dead Stock Prediction",
    subtitle: "Inventory Risk · Markdown Prevention",
    desc: "Dead stock is not a markdown problem. It is a buying decision made six months earlier. Purple8 scores every open buy position against the current trend graph: is this SKU aligned with an accelerating trend, a decelerating trend, or one that has already peaked? Inventory risk is a traversal from SKU nodes to Trend velocity nodes, run at the moment the buy decision is made.",
    tags: ["Buy risk scoring", "Trend lifecycle", "Inventory graph", "Markdown prevention"],
  },
  {
    number: "06",
    icon: "\u{1F310}",
    title: "Cross-Market Intelligence",
    subtitle: "Geographic · Cultural Timing",
    desc: "Trends do not propagate uniformly across geographies. A silhouette that peaked in Tokyo six months ago is typically 10 to 14 weeks from peak in London. Purple8 models geographic propagation as a graph: Market nodes connected to Trend nodes with temporal lag edges derived from historical data. A brand with global distribution can use Tokyo as a leading indicator for European buying decisions.",
    tags: ["Geographic graph", "Temporal lag", "Cross-market signal", "Regional timing"],
  },
  {
    number: "07",
    icon: "\u{1F504}",
    title: "Resale Price Signal",
    subtitle: "Pre-Trend · Early Indicator",
    desc: "Resale price velocity is the earliest trend signal in fashion. It reflects actual purchase behaviour by the most trend-sensitive consumers, before editorial or social data shows it. Purple8 ingests resale price feeds from StockX, Depop, and Vestiaire Collective, models price nodes as graph entities with velocity edges, and connects them to the influencer and community graph to validate whether price momentum is community-backed or isolated.",
    tags: ["Resale velocity", "Price graph", "StockX", "Early signal"],
  },
  {
    number: "08",
    icon: "\u{1F4AC}",
    title: "AI Trend Explanation",
    subtitle: "GraphRAG · Decision Support",
    desc: "Ask Claude on any Trend node. The response cites the actual propagation path, origin community, velocity at each hop, comparable historical trends that followed the same signature, and the specific SKUs in the current range that are aligned. A merchant gets a narrative explanation built from graph evidence, not a percentage score with no context.",
    tags: ["GraphRAG", "Ask Claude", "Evidence-based buying"],
  },
  {
    number: "09",
    icon: "\u{1F3F7}\uFE0F",
    title: "Assortment Optimisation",
    subtitle: "Quantum Optimisation · Buying",
    desc: "Allocating the open-to-buy across 200 SKUs under budget constraints, minimum order quantities, supplier capacity limits, and trend risk scores is a combinatorial optimisation problem. Purple8's quantum-inspired layer formulates it as a QUBO problem and finds the Pareto-optimal assortment: maximum expected sell-through under the constraints the trend and supplier graph reveals.",
    tags: ["QUBO", "Open-to-buy", "Assortment", "Quantum optimisation"],
  },
  {
    number: "10",
    icon: "\u{1F3EA}",
    title: "Channel & Retail Intelligence",
    subtitle: "Wholesale · DTC · Department Store",
    desc: "A trend travelling through resale and DTC communities behaves differently from one arriving via editorial and department store buyers. Purple8 models the channel graph: which trends are being picked up by which buyers, at which wholesale price points, in which retail environments. A brand can see whether a trend is consumer-led or buyer-led and price and distribute accordingly.",
    tags: ["Channel graph", "Wholesale signal", "Buyer intelligence", "DTC vs wholesale"],
  },
];

const currentState = [
  { item: "Trend reports (WGSN, Trendalytics)", cost: "Lists, no propagation path" },
  { item: "Social listening platforms", cost: "Aggregate volume, no origin graph" },
  { item: "Analyst trend forecasting", cost: "3 to 6 months lag, high subjectivity" },
  { item: "Buyer gut + last season\'s data", cost: "30 to 40% dead stock, $500B/year" },
];

const withPurple8 = [
  { item: "Trend origin and propagation graph", cost: "8 to 14 weeks ahead of mass market" },
  { item: "Signal-to-SKU connection", cost: "Automated graph traversal" },
  { item: "Supplier window validation", cost: "Trend and lead time in one query" },
  { item: "AI-explained buying decisions", cost: "Evidence-backed, auditable" },
];

const targetCustomers = [
  {
    icon: "\u26A1",
    title: "Fast Fashion & Value Retailers",
    desc: "Zara, H&M, ASOS, Shein. Dead stock is a P&L and ESG problem simultaneously. Purple8 detects trend origin in micro-communities weeks before aggregated data shows it and connects directly to your supplier network to validate the production window.",
  },
  {
    icon: "\u{1F48E}",
    title: "Luxury Conglomerates",
    desc: "LVMH, Kering, Richemont. Twelve to eighteen month production cycles mean one wrong call is hundreds of millions written off. Purple8 validates trends against historical propagation signatures and connects them to the SKU categories in your long-lead collections.",
  },
  {
    icon: "\u{1F3EC}",
    title: "Department Store Buyers",
    desc: "Nordstrom, Selfridges, Net-a-Porter. You buy wholesale from hundreds of brands and need to know which ones to back before the order window closes. Purple8 shows which brands are aligned with accelerating trends and which are sitting on decelerating inventory.",
  },
  {
    icon: "\u{1F45F}",
    title: "Sportswear & Footwear",
    desc: "Nike, Adidas, New Balance. Collab-driven trend cycles and sneaker drops are graph problems: which community, which influencer network, which resale velocity signals a winning release. Purple8 maps the hype graph in real time.",
  },
  {
    icon: "\u{1F4CA}",
    title: "Resale Platforms",
    desc: "StockX, Depop, Vestiaire Collective. You sit on the earliest trend signal in fashion, resale price velocity. Purple8 turns that signal into a structured product you can sell back to brands, backed by graph evidence.",
  },
  {
    icon: "\u{1F52C}",
    title: "Trend Forecasting Agencies",
    desc: "WGSN, Trendalytics, Edited. You have the clients. Purple8 is the graph intelligence engine you cannot build in-house. OEM or white-label partnership: your clients get relationship-aware trend intelligence and you get a technical capability that takes years to replicate.",
  },
];

export default function FashionIntelligencePage() {
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
            <span className="text-zinc-400">Fashion Intelligence</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden py-20">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-48 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-purple-900/12 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-700/40 bg-purple-950/40 px-4 py-1.5 text-sm font-medium text-purple-200">
              <span className="text-base">👗</span>
              Purple8 Hyper Graph · Fashion · Retail Intelligence
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Stop betting on the last trend.{" "}
              <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                See the next one.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
              The fashion industry produces 100 billion garments a year and discards 30 to 40 percent of them unsold.
              Not because brands lack data. They have too much of it. What they lack is the graph that connects
              trend origin to influencer reach to SKU to supplier lead time. Purple8 builds that graph and
              answers the question no other tool can: can we make this in time?
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-lg mx-auto">
              {[
                { stat: "$500B", label: "Dead stock written off annually" },
                { stat: "8\u201314wk", label: "Ahead of mass market adoption" },
                { stat: "40%\u219210%", label: "Dead stock reduction potential" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-purple-900/40 bg-purple-950/20 px-4 py-4 text-center">
                  <p className="text-2xl font-bold text-purple-300">{s.stat}</p>
                  <p className="mt-1 text-xs text-zinc-500 leading-tight">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="/register/"
                className="rounded-full bg-purple-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-purple-900/40 transition-colors hover:bg-purple-500"
              >
                Request a demo
              </a>
              <a href="/quickstart/" className="text-base font-semibold text-zinc-300 transition-colors hover:text-white">
                See the technical architecture \u2192
              </a>
            </div>
          </div>
        </section>

        {/* The core problem */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">The problem</p>
                <h2 className="mt-3 text-3xl font-bold text-white">Trend forecasting is not a data problem. It is a relationship problem.</h2>
                <p className="mt-5 text-zinc-400 leading-relaxed">
                  Trend signals exist everywhere: social posts, search velocity, influencer graphs,
                  resale prices, runway coverage, micro-communities. Every brand subscribes to
                  the same reports. Yet 30 to 40 percent of inventory is never sold.
                </p>
                <p className="mt-4 text-zinc-400 leading-relaxed">
                  The problem is not a lack of signal. The signals live in completely disconnected
                  silos. By the time aggregated data shows a trend, the production window has
                  closed. Brands are always making bets on the last trend, not the next one.
                </p>
                <p className="mt-4 text-zinc-400 leading-relaxed">
                  Existing tools give you lists. Purple8 gives you the graph: how a trend travels,
                  who is carrying it, how fast it is moving, which SKUs it maps to, and whether
                  your supplier can make it in time.
                </p>
              </div>
              <div className="space-y-3">
                {[
                  { label: "MICRO_COMMUNITY", detail: "Tokyo resale subculture — price spike +340%" },
                  { label: "\u2193 3 weeks", detail: "TikTok creators in the community post" },
                  { label: "INFLUENCER_GRAPH", detail: "3 tier-2 accounts — 2.4M combined reach" },
                  { label: "\u2193 5 weeks", detail: "Editorial pickup — Dazed, i-D, Highsnobiety" },
                  { label: "MASS_SEARCH", detail: "Google Trends: +890% — trend peaks" },
                  { label: "PRODUCTION_WINDOW", detail: "Lead time: 9 weeks — brand can still act" },
                ].map((row) => (
                  <div key={row.label} className="flex items-start gap-4 rounded-xl border border-white/8 bg-white/[0.02] px-5 py-3">
                    <code className="shrink-0 text-xs font-mono text-purple-400 mt-0.5 w-40">{row.label}</code>
                    <p className="text-sm text-zinc-400">{row.detail}</p>
                  </div>
                ))}
                <p className="text-xs text-zinc-600 pt-1">Purple8 detects the signal at hop 1, eight weeks before mass search peaks, and connects it to the production window in the same query.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Current vs Purple8 */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">The current state</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Every brand has the same data. None of it is connected.</h2>
            </div>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-4">Current trend intelligence</p>
                <div className="space-y-2">
                  {currentState.map((row) => (
                    <div key={row.item} className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/40 px-4 py-3">
                      <span className="text-sm text-zinc-400">{row.item}</span>
                      <span className="text-sm font-semibold text-zinc-500">{row.cost}</span>
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
              </div>
            </div>
          </div>
        </section>

        {/* Solution Patterns */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">Solution patterns</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Ten intelligence patterns on one graph engine.</h2>
              <p className="mt-4 max-w-2xl mx-auto text-zinc-400">
                Each pattern below is a graph query, not a separate product or a new integration.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {patterns.map((p) => (
                <div key={p.number} className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 hover:border-purple-700/40 transition-colors">
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-2xl">{p.icon}</span>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-mono text-purple-700">{p.number}</span>
                        <h3 className="text-base font-semibold text-white">{p.title}</h3>
                      </div>
                      <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest">{p.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-4">{p.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-purple-950/50 border border-purple-900/40 px-2.5 py-0.5 text-xs text-purple-300">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">Who uses this</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Every part of the industry has a dead stock problem</h2>
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
              <h2 className="mt-3 text-3xl font-bold text-white">Questions from merchandising and technology teams</h2>
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
                { href: "/products/purple8/rag-pipeline/", label: "GraphRAG", desc: "AI trend explanations citing graph evidence" },
                { href: "/products/purple8/opinion-engine/", label: "Opinion Engine", desc: "Stance and influence tracking across communities" },
                { href: "/products/purple8/quantum-optimisation/", label: "Quantum Optimisation", desc: "Assortment optimisation under buy constraints" },
                { href: "/products/purple8/scenario-simulation/", label: "Scenario Simulation", desc: "What-if buying scenarios before commitment" },
                { href: "/products/purple8/agentic-process-automation/", label: "Agentic Automation", desc: "Automated buy alerts when trend and window align" },
                { href: "/products/purple8/workflow-orchestration/", label: "Workflow Orchestration", desc: "Buying approval workflow with audit trail" },
              ].map((cap) => (
                <Link key={cap.href} href={cap.href} className="group rounded-xl border border-white/8 bg-white/[0.02] px-5 py-4 transition-colors hover:border-purple-700/50">
                  <p className="text-sm font-semibold text-purple-300 group-hover:text-purple-200">{cap.label} \u2192</p>
                  <p className="mt-1 text-xs text-zinc-500">{cap.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-white/5 py-20 text-center">
          <div className="mx-auto max-w-2xl px-4">
            <h2 className="text-3xl font-bold text-white">Map your first trend propagation graph</h2>
            <p className="mt-4 text-zinc-400">
              We work with merchandising and data teams to connect your existing trend data
              to your SKU catalogue and supplier network. The first conversation is about
              your buying calendar, not a product demo.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="/register/"
                className="rounded-full bg-purple-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-purple-900/40 transition-colors hover:bg-purple-500"
              >
                Request a demo
              </a>
              <a href="/products/purple8/" className="text-base font-semibold text-zinc-300 transition-colors hover:text-white">
                Explore Purple8 Hyper Graph \u2192
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
