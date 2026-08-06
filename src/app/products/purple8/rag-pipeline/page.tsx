import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "GraphRAG & Hybrid RAG Pipeline — Purple8 Hyper Graph",
  description:
    "Purple8 Hyper Graph ships three RAG modes out of the box — flat vector, graph-augmented (GraphRAG), and hybrid retrieval — with self-tuning parameter optimisation. No Pinecone, no LangChain, no separate vector database.",
  path: "/products/purple8/rag-pipeline",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "GraphRAG & Hybrid RAG Pipeline — Purple8 Hyper Graph",
  description:
    "Three RAG modes built in: flat vector search, graph-augmented retrieval (GraphRAG), and hybrid BM25+vector+graph. Self-tuning via rag.tune_collection. No external vector database, no LangChain, no separate retrieval service.",
  url: "https://www.purple8.ai/products/purple8/rag-pipeline/",
  publisher: { "@type": "Organization", name: "Purple8 Inc.", url: "https://www.purple8.ai" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.purple8.ai/" },
      { "@type": "ListItem", position: 2, name: "Purple8 Hyper Graph", item: "https://www.purple8.ai/products/purple8/" },
      { "@type": "ListItem", position: 3, name: "RAG Pipeline", item: "https://www.purple8.ai/products/purple8/rag-pipeline/" },
    ],
  },
  mainEntity: {
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is GraphRAG and how is it different from standard RAG?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Standard RAG (flat vector) retrieves the top-k most similar chunks by embedding distance alone. GraphRAG augments this with graph traversal — after finding seed nodes via vector search, it expands outward through typed relationships (AUTHORED_BY, CITES, PART_OF, RELATED_TO) to pull in contextually connected content that wouldn't appear in a pure similarity search. This dramatically improves recall on multi-hop questions and relational queries.",
        },
      },
      {
        "@type": "Question",
        name: "What RAG modes does Purple8 support?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Three modes: (1) rag.query — flat vector search, fastest, best for direct factual retrieval; (2) rag.graph_query — graph-augmented, expands via typed edges, best for relational and multi-hop questions; (3) rag.hybrid_query — BM25 keyword + HNSW vector + graph traversal fused with a configurable alpha weight, best for mixed corpora. The system profiles your corpus topology and recommends the right mode automatically.",
        },
      },
      {
        "@type": "Question",
        name: "What does rag.tune_collection do?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "rag.tune_collection runs an autonomous grid-search over fusion_alpha, expand_hops, seed_k, and vector_weight parameters. It uses token-F1 scoring against your expected answers to find the configuration that maximises retrieval quality on your specific corpus — then saves it as a named CollectionProfile so every subsequent query uses it automatically. No manual tuning required.",
        },
      },
      {
        "@type": "Question",
        name: "Does Purple8 require a separate vector database?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Purple8 Hyper Graph includes an HNSW vector index built directly into the engine. Embeddings are stored alongside graph nodes — the same store that holds your knowledge graph holds your vectors. There is no Pinecone, no Weaviate, no pgvector, no Qdrant. Vector search and graph traversal run in the same process, with no network hop between them.",
        },
      },
      {
        "@type": "Question",
        name: "How does graph-guided search improve performance at scale?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "At large corpus sizes, a naive vector search fans out across all index segments. Purple8's graph_guided_search pre-selects candidate segments via BFS over the graph structure, then passes only those segments to the HNSW search. On clustered corpora, this can eliminate the majority of segment fan-out entirely — the benefit grows with corpus size and graph connectivity.",
        },
      },
    ],
  },
};

const ragModes = [
  {
    mode: "rag.query",
    label: "Flat Vector",
    icon: "🔍",
    accent: "border-zinc-700",
    when: "Direct factual retrieval, semantic similarity, single-hop questions",
    how: "HNSW ANN search over all node embeddings, top-k by cosine similarity",
    best: "FAQ systems, document search, direct Q&A",
  },
  {
    mode: "rag.graph_query",
    label: "GraphRAG",
    icon: "🕸️",
    accent: "border-purple-700/50",
    when: "Multi-hop questions, relational queries, 'what connects X to Y?'",
    how: "Vector seeds → BFS expansion over typed edges → context assembly from neighbourhood",
    best: "Research synthesis, due diligence, knowledge discovery",
  },
  {
    mode: "rag.hybrid_query",
    label: "Hybrid",
    icon: "⚡",
    accent: "border-purple-600/60",
    when: "Mixed corpora, when you don't know which mode to use — let the system decide",
    how: "BM25 keyword + HNSW vector + graph traversal, fused with configurable alpha weight",
    best: "Enterprise knowledge bases, large mixed document corpora, production RAG",
  },
];

const ragTools = [
  { name: "rag.query", desc: "Flat vector retrieval — HNSW ANN, top-k by cosine similarity" },
  { name: "rag.graph_query", desc: "Graph-augmented retrieval — vector seeds + BFS edge expansion" },
  { name: "rag.hybrid_query", desc: "BM25 + vector + graph fusion with configurable alpha weight" },
  { name: "rag.profile_collection", desc: "Analyse corpus topology and return recommended retrieval settings" },
  { name: "rag.tune_collection", desc: "Autonomous grid-search optimiser — finds best params, saves as profile" },
  { name: "rag.rerank", desc: "Cross-encoder reranking pass over retrieved results" },
];

const vsStandard = [
  {
    label: "Standard RAG (flat vector)",
    col: "border-zinc-800",
    pill: "bg-zinc-800 text-zinc-400",
    points: [
      "Retrieves by similarity only — misses relational context",
      "Multi-hop questions fail — no graph traversal",
      "Manual prompt engineering to compensate for retrieval gaps",
      "Separate vector DB to provision, scale, and pay for",
      "No self-tuning — parameters set once and forgotten",
    ],
  },
  {
    label: "Purple8 GraphRAG",
    col: "border-purple-700/60",
    pill: "bg-purple-900/40 text-purple-300",
    points: [
      "Vector similarity AND graph traversal in one query",
      "Multi-hop questions answered via edge expansion",
      "rag.profile_collection recommends mode automatically",
      "HNSW index built in — no separate vector service",
      "rag.tune_collection optimises parameters autonomously",
    ],
  },
];

const useCases = [
  { icon: "⚖️", title: "Legal document Q&A", desc: "Query contracts, case law, and regulations across thousands of documents. Graph edges (CITES, AMENDS, SUPERSEDES) let agents answer 'which clause in contract A conflicts with precedent B?' — impossible with flat vector." },
  { icon: "🔬", title: "Scientific literature synthesis", desc: "Ingest papers, extract entities and citations into the graph. GraphRAG traverses citation networks to find supporting, contradicting, and related findings — not just similar text." },
  { icon: "🏦", title: "Financial research", desc: "Analyst agents query earnings reports, news, and filings simultaneously. Graph edges between companies, products, and markets surface relationships that keyword or vector search misses." },
  { icon: "🏥", title: "Clinical knowledge retrieval", desc: "Drug interactions, contraindications, and treatment protocols connected as a knowledge graph. Multi-hop queries: 'what drugs interact with X in patients with condition Y?' answered in one pass." },
  { icon: "🛠️", title: "Enterprise support systems", desc: "Product documentation, support tickets, and resolved cases linked by product version, issue type, and resolution. Agents find solutions to novel issues by traversing similar-case graphs." },
  { icon: "🏗️", title: "BIM & technical documentation", desc: "Building components, specifications, and standards connected in the AEC graph. Engineers query: 'what structural members are affected by this load change?' — graph traversal, not text search." },
];

export default function RagPipelinePage() {
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
            <span className="text-zinc-400">RAG Pipeline</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden py-20">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-48 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-purple-900/15 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-700/40 bg-purple-950/40 px-4 py-1.5 text-sm font-medium text-purple-200">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-400" />
              </span>
              Part of Purple8 Hyper Graph · No Pinecone · No LangChain
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              GraphRAG that actually{" "}
              <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                knows the graph.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
              Three retrieval modes built directly into the same engine as your knowledge
              graph. The vector index, the graph traversal, and the BM25 scorer all share
              the same store. No Pinecone to provision, no LangChain retrieval chain to
              maintain. And a self-tuning parameter optimiser that learns your corpus and
              persists the best configuration automatically.
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

        {/* Three modes */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">Three retrieval modes</p>
              <h2 className="mt-3 text-3xl font-bold text-white">The right mode for every corpus.</h2>
              <p className="mt-4 text-zinc-400 max-w-xl mx-auto text-sm">
                <code className="text-purple-300">rag.profile_collection</code> analyses your graph topology and tells you which mode to use. <code className="text-purple-300">rag.tune_collection</code> then optimises the parameters autonomously.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {ragModes.map((m) => (
                <div key={m.mode} className={`rounded-2xl border ${m.accent} bg-white/[0.02] p-7`}>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-2xl">{m.icon}</span>
                    <div>
                      <p className="text-base font-bold text-white">{m.label}</p>
                      <code className="text-xs text-purple-400">{m.mode}</code>
                    </div>
                  </div>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-600 mb-1">When to use</p>
                      <p className="text-zinc-400">{m.when}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-600 mb-1">How it works</p>
                      <p className="text-zinc-400">{m.how}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-600 mb-1">Best for</p>
                      <p className="text-zinc-400">{m.best}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Self-tuning */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">Self-tuning</p>
                <h2 className="mt-3 text-3xl font-bold text-white">RAG parameters that optimise themselves.</h2>
                <p className="mt-4 text-zinc-400 leading-relaxed">
                  Most teams set RAG parameters once at launch and never revisit them.
                  Corpus drift silently degrades retrieval quality over months.
                </p>
                <p className="mt-3 text-zinc-400 leading-relaxed">
                  <code className="text-purple-300">rag.tune_collection</code> runs a
                  grid-search over <code className="text-purple-300">fusion_alpha</code>,{" "}
                  <code className="text-purple-300">expand_hops</code>, and{" "}
                  <code className="text-purple-300">seed_k</code> using token-F1 scoring
                  against your expected answers. The best configuration is saved as a
                  named <code className="text-purple-300">CollectionProfile</code> and
                  applied to every subsequent query automatically.
                </p>
                <p className="mt-3 text-zinc-400 leading-relaxed">
                  Call it when you deploy. Call it again when your corpus grows. No
                  retrieval engineer required.
                </p>
              </div>
              <div className="rounded-2xl border border-purple-900/40 bg-purple-950/10 p-6 font-mono text-sm space-y-2">
                <p className="text-zinc-600"># 1. Profile your corpus topology</p>
                <p className="text-purple-300">rag.profile_collection()</p>
                <p className="text-zinc-500 text-xs mt-1 mb-3">→ topology_class: "dense" · recommended: fusion_alpha=0.7</p>
                <p className="text-zinc-600"># 2. Autonomous parameter search</p>
                <p className="text-purple-300">rag.tune_collection(</p>
                <p className="text-zinc-400 pl-4">corpus="my-kb",</p>
                <p className="text-zinc-400 pl-4">save_as="my-kb-v2"</p>
                <p className="text-purple-300">)</p>
                <p className="text-zinc-500 text-xs mt-1 mb-3">→ best_score: 0.87 · improvement: +23% · saved</p>
                <p className="text-zinc-600"># 3. Every query uses it automatically</p>
                <p className="text-purple-300">rag.hybrid_query(</p>
                <p className="text-zinc-400 pl-4">q="...",</p>
                <p className="text-zinc-400 pl-4">collection_profile="my-kb-v2"</p>
                <p className="text-purple-300">)</p>
              </div>
            </div>
          </div>
        </section>

        {/* MCP tools */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">rag.* namespace</p>
              <h2 className="mt-3 text-3xl font-bold text-white">6 MCP tools. Agents query, tune, and rerank.</h2>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {ragTools.map((t) => (
                <div key={t.name} className="flex items-start gap-4 rounded-xl border border-white/8 bg-white/[0.015] px-5 py-4">
                  <code className="shrink-0 rounded bg-purple-950/60 px-2 py-0.5 text-xs font-mono text-purple-300">{t.name}</code>
                  <p className="text-sm text-zinc-400">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GraphRAG vs standard */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">GraphRAG vs flat vector</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Why the graph changes everything.</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {vsStandard.map((col) => (
                <div key={col.label} className={`rounded-2xl border ${col.col} bg-white/[0.02] p-7`}>
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
              <h2 className="mt-3 text-3xl font-bold text-white">Where GraphRAG outperforms flat vector</h2>
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
              <Link href="/products/purple8/knowledge-graph/" className="group rounded-xl border border-white/8 bg-white/[0.02] px-6 py-5 transition-colors hover:border-purple-700/50">
                <p className="text-sm font-semibold text-purple-300 group-hover:text-purple-200">🕸️ Knowledge Graph →</p>
                <p className="mt-1 text-xs text-zinc-500">The graph layer that makes GraphRAG possible</p>
              </Link>
              <Link href="/products/purple8/multi-agent-systems/" className="group rounded-xl border border-white/8 bg-white/[0.02] px-6 py-5 transition-colors hover:border-purple-700/50">
                <p className="text-sm font-semibold text-purple-300 group-hover:text-purple-200">🤖 Multi-Agent Systems →</p>
                <p className="mt-1 text-xs text-zinc-500">Agent swarms that share one RAG-enabled graph</p>
              </Link>
              <Link href="/products/purple8/agentic-process-automation/" className="group rounded-xl border border-white/8 bg-white/[0.02] px-6 py-5 transition-colors hover:border-purple-700/50">
                <p className="text-sm font-semibold text-purple-300 group-hover:text-purple-200">🤖 Agentic Automation →</p>
                <p className="mt-1 text-xs text-zinc-500">Combine RAG retrieval with end-to-end process automation</p>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-white/5 py-20 text-center">
          <div className="mx-auto max-w-2xl px-4">
            <h2 className="text-3xl font-bold text-white">Start with GraphRAG in 60 seconds</h2>
              <p className="mt-4 text-zinc-400">Free to start. All three retrieval modes work out of the box. Bring your own documents.</p>
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
