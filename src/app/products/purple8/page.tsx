import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { pageMetadata } from "@/lib/seo";
import { FACTS as F } from "@/lib/facts";

export const metadata: Metadata = pageMetadata({
  title: "Purple8 Hyper Graph - AI-Native Execution Infrastructure",
  description:
    `Graph + vector + document + full-text + agentic process automation in one process. AI agents orchestrate end-to-end workflows via ${F.mcpTools} MCP tools. Built for AI, Operated by AI and Supervised by Humans.`,
  path: "/products/purple8",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Purple8 Hyper Graph",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Linux, macOS, Windows, Docker",
  description: "AI-native multi-model execution engine - graph, vector, document store, full-text search, workflow engine, RAG, auth, encryption, and autonomous SOC in a single container.",
  offers: { "@type": "Offer", priceCurrency: "USD", description: "Contact sales@purple8.ai for licensing" },
  url: "https://www.purple8.ai/products/purple8/",
  publisher: { "@type": "Organization", name: "Purple8 Inc.", url: "https://www.purple8.ai" },
  featureList: ["LPG (Property Graph) & RDF semantic triple engine", "Vector search", "Hybrid RAG", "Journey Engine workflow orchestration", "AES-256-GCM encryption", `MCP server with ${F.mcpTools} tools`, "Quantum-inspired optimisation (QUBO, VRP, scheduling)", "Multi-tenant storage", "REST API"],
};

const capabilities = [
  { icon: "🕸️", label: "LPG, RDF & Hyper Graph", desc: "Supports both Labeled Property Graph (LPG / openCypher) and RDF semantic triples / N-Quads with reification - sub-millisecond multi-hop traversal." },
  { icon: "🔍", label: "Semantic & Hybrid Search", desc: "Native vector + full-text + graph hybrid RAG out of the box." },
  { icon: "📄", label: "Document Store", desc: "Store and retrieve structured documents with full-text search. Pair with DocIntel to extract vectors, nodes & relations." },
  { icon: "🔄", label: "Journey Engine", desc: "Multi-stage workflow orchestration with HITL gates and SLA enforcement." },
  { icon: "🤖", label: `${F.mcpTools} MCP Tools`, desc: "AI agents connect directly. Claude, Cursor, Copilot, ChatGPT - all supported." },
  { icon: "⚛️", label: "Quantum-Inspired AI", desc: "QUBO optimisation, VRP, portfolio selection, tensor networks - callable by agents via MCP." },
  { icon: "🔐", label: "Auth & Encryption", desc: "JWT + API-key RBAC. AES-256-GCM envelope encryption at rest." },
  { icon: "🏢", label: "Multi-Tenancy", desc: "Shared-key or dedicated DB path per tenant - no schema per tenant." },
  { icon: "📊", label: "Analytics", desc: "PageRank, community detection, betweenness centrality, link prediction." },
];

const replaces = [
  "PostgreSQL / MongoDB", "Neo4j", "Pinecone / Weaviate",
  "LangChain + RAG pipeline", "Airflow / Temporal / LangGraph",
  "LangSmith", "Auth0 / Keycloak", "Elasticsearch",
];

export default function HyperGraphPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main id="main-content" className="pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden py-24">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-48 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-purple-900/15 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-700/40 bg-purple-950/40 px-4 py-1.5 text-sm font-medium text-purple-200">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-400" />
              </span>
              Developer edition - free, no credit card
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Your entire backend.{" "}
              <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                One process.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
              Purple8 Hyper Graph is an embedded multi-model database purpose-built for
              AI applications. Graph + vector + document + full-text + workflows +
              {F.mcpTools} MCP tools - in a single process, with zero external dependencies.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="/try/graph/"
                className="rounded-full bg-purple-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-purple-900/40 transition-colors hover:bg-purple-500"
              >
                Try Cloud Sandbox
              </a>
              <a
                href="https://docs.graph.purple8.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-purple-700/60 px-6 py-3.5 text-base font-semibold text-purple-300 transition-colors hover:border-purple-500 hover:text-white"
              >
                Hyper Graph Docs ↗
              </a>
              <a
                href="mailto:sales@purple8.ai?subject=Purple8%20Hyper%20Graph%20Inquiry"
                className="text-base font-semibold text-zinc-300 transition-colors hover:text-white"
              >
                Contact Us →
              </a>
            </div>
            <p className="mt-4 text-sm text-zinc-500">
              Built for AI, Operated by AI and Supervised by Humans · Container &amp; Cloud Sandbox
            </p>
          </div>
        </section>

        {/* Capabilities */}
        <section className="py-20 border-t border-white/5">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">What&apos;s inside</p>
              <h2 className="mt-3 text-3xl font-bold text-white">One engine. Eight capabilities.</h2>
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

        {/* Replaces */}
        <section className="py-20 border-t border-white/5">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">What it replaces</p>
            <h2 className="mt-3 text-3xl font-bold text-white">One process replaces eight services.</h2>
            <p className="mt-4 text-zinc-400">Stop paying for, operating, and debugging infrastructure you didn&apos;t need to build.</p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {replaces.map((r) => (
                <span key={r} className="rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-1.5 text-sm text-zinc-400 line-through decoration-red-500/60">
                  {r}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 border-t border-white/5">
          <div className="mx-auto max-w-2xl px-4 text-center">
            <h2 className="text-3xl font-bold text-white">Ready to simplify your stack?</h2>
            <p className="mt-4 text-zinc-400">
              Developer edition is free forever. For commercial self-hosted deployments, we offer one simple tier: <strong className="text-white">Enterprise / Custom</strong>.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a href="/register/" className="rounded-full bg-purple-600 px-8 py-3.5 text-base font-semibold text-white hover:bg-purple-500">
                Get started free
              </a>
              <a href="/pricing/" className="text-base text-zinc-300 hover:text-white">
                See pricing →
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
