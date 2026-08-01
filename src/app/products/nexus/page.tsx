import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Purple8 Nexus — Enterprise Knowledge Management System",
  description:
    "AI-powered enterprise KMS powered by Purple8. Semantic search, entity extraction, expert discovery, document lineage, and governance — all in one system.",
  path: "/products/nexus",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Purple8 Nexus",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Linux, Docker, Cloud",
  description: "Enterprise AI knowledge management system. Semantic search, knowledge graph, expert discovery, document lineage, governance, and Q&A — built on Purple8.",
  offers: { "@type": "Offer", priceCurrency: "USD", description: "Enterprise pricing. Contact sales@purple8.ai." },
  url: "https://www.purple8.ai/products/nexus/",
  publisher: { "@type": "Organization", name: "Purple8 Inc.", url: "https://www.purple8.ai" },
  featureList: ["Semantic search", "Knowledge graph", "Expert discovery", "Document lineage", "Governance and compliance", "Impact analysis", "Auto-tagging", "Natural language Q&A"],
};

const capabilities = [
  { icon: "🔍", label: "Semantic Search", desc: "Ask questions across your entire knowledge base in natural language. Vector + graph hybrid retrieval." },
  { icon: "🕸️", label: "Knowledge Graph", desc: "Every document, person, topic, regulation, and project is a node. Relationships surface automatically." },
  { icon: "👤", label: "Expert Discovery", desc: "Find who knows what — via graph traversal across authorship, topic co-occurrence, and department relationships." },
  { icon: "📜", label: "Document Lineage", desc: "Track versions, sources, derived documents, and supersession chains. Full audit trail." },
  { icon: "⚖️", label: "Governance", desc: "Quality scoring, compliance tracking, access control, and retention policies." },
  { icon: "📊", label: "Impact Analysis", desc: "Understand what would break if a document is changed or removed. Graph-powered dependency mapping." },
  { icon: "🏷️", label: "Auto-Tagging", desc: "Automatic categorisation using NER and LLM classification. Zero manual taxonomy work." },
  { icon: "💬", label: "Q&A Engine", desc: "Ask questions scoped to a collection, department, or project. Grounded answers with citations." },
];

export default function NexusPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main id="main-content" className="bg-[#0a0a0f] pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden py-24">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-48 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-900/12 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-700/40 bg-blue-950/40 px-4 py-1.5 text-sm font-medium text-blue-200">
              Enterprise · Self-Hosted · Powered by Purple8
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Your organisation&apos;s knowledge,{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                connected and queryable.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
              Purple8 Nexus is an enterprise Knowledge Management System that turns
              documents, expertise, processes, and relationships into a live knowledge
              graph — searchable, governable, and AI-ready out of the box.
            </p>

            {/* Contact sales CTA */}
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="mailto:sales@purple8.ai?subject=Purple8 Nexus inquiry"
                className="rounded-full bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-900/40 transition-colors hover:bg-blue-500"
              >
                Contact sales
              </a>
              <a href="mailto:sales@purple8.ai?subject=Purple8 Nexus demo request" className="text-base font-semibold text-zinc-300 transition-colors hover:text-white">
                Request a demo →
              </a>
            </div>
            <p className="mt-4 text-sm text-zinc-500">
              For pricing and availability, contact{" "}
              <a href="mailto:sales@purple8.ai" className="text-blue-400 hover:text-blue-300">sales@purple8.ai</a>
            </p>
          </div>
        </section>

        {/* Capabilities */}
        <section className="py-20 border-t border-white/5">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">Capabilities</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Everything your knowledge needs to be useful.</h2>
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

        {/* Built on Purple8 */}
        <section className="py-20 border-t border-white/5">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">Architecture</p>
            <h2 className="mt-3 text-3xl font-bold text-white">Powered by Purple8.</h2>
            <p className="mt-4 text-zinc-400">
              Nexus is a production demonstration of what you can build with Purple8 — 
              the same graph engine, RAG pipeline, Journey Engine, and MCP tools that
              you can use to build your own applications. No third-party vector databases,
              no separate search cluster, no separate workflow engine.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 border-t border-white/5">
          <div className="mx-auto max-w-xl px-4 text-center">
            <h2 className="text-3xl font-bold text-white">Ready to connect your organisation&apos;s knowledge?</h2>
            <p className="mt-4 text-zinc-400">Contact our sales team for pricing, deployment options, and a tailored demo.</p>
            <div className="mt-8">
              <a
                href="mailto:sales@purple8.ai?subject=Purple8 Nexus"
                className="rounded-full bg-blue-600 px-8 py-3.5 text-base font-semibold text-white hover:bg-blue-500"
              >
                Contact sales@purple8.ai
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
