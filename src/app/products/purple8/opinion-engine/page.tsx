import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Opinion Engine — Belief Graphs & Stance Detection — Purple8 Hyper Graph",
  description:
    "Purple8 Hyper Graph models who believes what, why, and how strongly — across documents, organisations, and people. Track opinion propagation, detect consensus vs controversy, and surface influence networks using graph algorithms and temporal analysis.",
  path: "/products/purple8/opinion-engine",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Opinion Engine — Belief Graphs & Stance Detection — Purple8 Hyper Graph",
  description:
    "Model beliefs, stances, and influence as a typed graph. Nodes are entities — people, organisations, documents, claims. Edges are SUPPORTS, CONTRADICTS, INFLUENCES, CITES. Temporal PageRank shows which opinions are gaining influence. Community detection finds belief clusters.",
  url: "https://www.purple8.ai/products/purple8/opinion-engine/",
  publisher: { "@type": "Organization", name: "Purple8 Inc.", url: "https://www.purple8.ai" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.purple8.ai/" },
      { "@type": "ListItem", position: 2, name: "Purple8 Hyper Graph", item: "https://www.purple8.ai/products/purple8/" },
      { "@type": "ListItem", position: 3, name: "Opinion Engine", item: "https://www.purple8.ai/products/purple8/opinion-engine/" },
    ],
  },
  mainEntity: {
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is an opinion engine?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An opinion engine models who believes what, how strongly, and why — across a population of entities (people, organisations, documents, claims). Rather than counting keyword mentions, it builds a typed graph of beliefs and their relationships, then applies graph algorithms (PageRank, community detection, betweenness centrality) to understand how opinions form, spread, and conflict.",
        },
      },
      {
        "@type": "Question",
        name: "How does Purple8 model opinions as a graph?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Entities (Person, Organisation, Document, Claim) become nodes. Relationships (SUPPORTS, CONTRADICTS, INFLUENCES, CITES, AUTHORED_BY) become typed edges with confidence weights and timestamps. DocIntel extracts these automatically from documents. The graph engine then runs temporal PageRank to show which claims are gaining influence, community detection to find belief clusters, and betweenness centrality to identify opinion brokers.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between sentiment analysis and an opinion engine?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sentiment analysis classifies tone (positive/negative/neutral) at the text level. An opinion engine models the structure of belief — who holds which position, which claims support or contradict each other, which entities are influencing others, and how opinion networks evolve over time. It answers 'what does this stakeholder group believe about X and who convinced them?' — not just 'is this tweet positive?'",
        },
      },
      {
        "@type": "Question",
        name: "Can the opinion engine track how views change over time?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. All edges carry timestamps, and Purple8's temporal PageRank applies time-decay to edge weights — recent influences count more than old ones. You can snapshot the graph at any point and compare belief networks across time periods to see which claims gained traction, which influence paths emerged, and which positions were abandoned.",
        },
      },
    ],
  },
};

const graphModel = [
  { shape: "Node", label: "Claim", color: "text-purple-300", desc: "A specific assertion — 'Drug X is effective for condition Y'" },
  { shape: "Node", label: "Person / Organisation", color: "text-purple-300", desc: "An entity that holds, expresses, or influences beliefs" },
  { shape: "Node", label: "Document", color: "text-purple-300", desc: "Source of the claim — paper, article, filing, transcript" },
  { shape: "Edge", label: "SUPPORTS", color: "text-zinc-300", desc: "Entity or document endorses a claim, with confidence weight" },
  { shape: "Edge", label: "CONTRADICTS", color: "text-zinc-300", desc: "Entity or document disputes a claim, with confidence weight" },
  { shape: "Edge", label: "INFLUENCES", color: "text-zinc-300", desc: "One entity shapes another's position — timestamped" },
  { shape: "Edge", label: "CITES", color: "text-zinc-300", desc: "Document references another document as evidence" },
  { shape: "Edge", label: "AUTHORED_BY", color: "text-zinc-300", desc: "Claim provenance — who said it, in which document, when" },
];

const algorithms = [
  { algo: "Temporal PageRank", icon: "📈", desc: "Which claims are gaining influence right now? Time-decayed edge weights surface rising vs fading opinions." },
  { algo: "Community Detection", icon: "🔵", desc: "Which belief clusters exist? Who agrees with whom? Reveals faction structure across stakeholders." },
  { algo: "Betweenness Centrality", icon: "🌉", desc: "Who are the opinion brokers — entities that bridge different belief clusters and drive consensus or division?" },
  { algo: "Link Prediction", icon: "🔗", desc: "Which entities are likely to align or diverge in future? Predict coalition formation before it happens." },
  { algo: "GraphRAG", icon: "🔍", desc: "Ask natural language questions over the entire belief graph: 'What does the scientific consensus say about X?'" },
  { algo: "Shortest Path", icon: "🛤️", desc: "How did opinion A reach entity B? Trace the influence chain step by step through the graph." },
];

const useCases = [
  {
    icon: "🏛️",
    title: "Policy & stakeholder mapping",
    desc: "Before publishing a regulation, map every stakeholder's documented position, who influences whom, and which coalitions exist. Know where opposition will come from before the consultation starts.",
  },
  {
    icon: "💼",
    title: "M&A sentiment intelligence",
    desc: "Map the target company's board, investor base, and key customer positions. Identify who supports the deal, who will resist, and which advisors are most influential — before the first approach.",
  },
  {
    icon: "📰",
    title: "Media & narrative tracking",
    desc: "Track how a claim propagates through media outlets, think tanks, and social networks over time. Identify the original source, the amplifiers, and the points where the narrative diverged.",
  },
  {
    icon: "⚖️",
    title: "Legal discovery & position analysis",
    desc: "Map which documents support, contradict, or are silent on each contested claim. Betweenness centrality identifies the pivotal documents — the ones that connect opposing positions.",
  },
  {
    icon: "🔬",
    title: "Scientific consensus detection",
    desc: "For any research claim, traverse the citation + SUPPORTS/CONTRADICTS graph to quantify true consensus vs manufactured controversy. Surface which papers are load-bearing for each position.",
  },
  {
    icon: "🏢",
    title: "Brand & reputation intelligence",
    desc: "Model customer, analyst, and press beliefs about your brand as a graph. Track which criticisms are gaining traction, which advocates are most influential, and where reputational risk is concentrated.",
  },
];

export default function OpinionEnginePage() {
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
            <span className="text-zinc-400">Opinion Engine</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden py-20">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-48 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-purple-900/12 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-700/40 bg-purple-950/40 px-4 py-1.5 text-sm font-medium text-purple-200">
              <span className="text-base">💡</span>
              Part of Purple8 Hyper Graph · Belief graphs · Stance detection
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Model what the world{" "}
              <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                actually believes.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
              Sentiment analysis tells you the tone of a sentence. That&apos;s the easy part.
              An opinion engine tells you who believes what, who convinced them, which
              positions are gaining traction, and where consensus ends and controversy
              begins. Modelled as a living, queryable belief graph that you can traverse,
              analyse, and ask questions of in plain language.
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

        {/* Graph model */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">The belief graph</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Opinions as data, not text.</h2>
              <p className="mt-4 text-zinc-400 max-w-xl mx-auto text-sm">
                DocIntel extracts entities and relationships from documents automatically.
                The graph engine stores them as typed nodes and edges — queryable, traversable, analysable.
              </p>
            </div>
            <div className="space-y-3">
              {graphModel.map((row) => (
                <div key={row.label} className="flex items-start gap-5 rounded-xl border border-white/8 bg-white/[0.02] px-6 py-4">
                  <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider mt-0.5 ${row.shape === "Node" ? "bg-purple-950/60 text-purple-400 border border-purple-800/50" : "bg-zinc-900 text-zinc-400 border border-zinc-700"}`}>
                    {row.shape}
                  </span>
                  <div>
                    <code className={`text-sm font-mono font-semibold ${row.color}`}>{row.label}</code>
                    <p className="mt-0.5 text-sm text-zinc-500">{row.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Algorithms */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">Built-in algorithms</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Six ways to understand a belief graph.</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {algorithms.map((a) => (
                <div key={a.algo} className="rounded-2xl border border-white/8 bg-white/[0.02] p-6">
                  <div className="text-3xl mb-4">{a.icon}</div>
                  <h3 className="text-base font-semibold text-white mb-2">{a.algo}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{a.desc}</p>
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
              <h2 className="mt-3 text-3xl font-bold text-white">Where belief graphs change decisions</h2>
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
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Link href="/products/purple8/scenario-simulation/" className="group rounded-xl border border-white/8 bg-white/[0.02] px-6 py-5 transition-colors hover:border-purple-700/50">
                <p className="text-sm font-semibold text-purple-300 group-hover:text-purple-200">🔮 Scenario Simulation →</p>
                <p className="mt-1 text-xs text-zinc-500">Run what-if simulations on the belief graph — what if this influential voice changes position?</p>
              </Link>
              <Link href="/products/purple8/rag-pipeline/" className="group rounded-xl border border-white/8 bg-white/[0.02] px-6 py-5 transition-colors hover:border-purple-700/50">
                <p className="text-sm font-semibold text-purple-300 group-hover:text-purple-200">🔍 RAG Pipeline →</p>
                <p className="mt-1 text-xs text-zinc-500">Natural language queries over the entire belief graph</p>
              </Link>
              <Link href="/products/purple8/multi-agent-systems/" className="group rounded-xl border border-white/8 bg-white/[0.02] px-6 py-5 transition-colors hover:border-purple-700/50">
                <p className="text-sm font-semibold text-purple-300 group-hover:text-purple-200">🤝 Multi-Agent Systems →</p>
                <p className="mt-1 text-xs text-zinc-500">Deploy analyst swarms that continuously update the belief graph from new sources</p>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-white/5 py-20 text-center">
          <div className="mx-auto max-w-2xl px-4">
            <h2 className="text-3xl font-bold text-white">Start modelling beliefs, not just sentiment</h2>
            <p className="mt-4 text-zinc-400">Free to start. Graph algorithms, temporal PageRank, and GraphRAG work on day one.</p>
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
