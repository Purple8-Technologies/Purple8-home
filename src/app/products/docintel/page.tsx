import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Purple8 DocIntel — 70-Format Document Intelligence",
  description:
    "Stateless document intelligence microservice. Parse PDFs, DOCX, IFC, CAD, sketches and 65+ more formats into structured knowledge. Self-hosted. Zero data egress.",
  path: "/products/docintel",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Purple8 DocIntel",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Linux, macOS, Windows, Docker",
  description: "Stateless document intelligence microservice that parses 70+ formats — PDF, DOCX, IFC, DXF, CAD, images, audio — into structured knowledge graphs using proprietary NER and LLM-assisted relationship extraction.",
  offers: { "@type": "Offer", priceCurrency: "USD", description: "Self-hosted. Contact sales@purple8.ai." },
  url: "https://www.purple8.ai/products/docintel/",
  publisher: { "@type": "Organization", name: "Purple8 Inc.", url: "https://www.purple8.ai" },
  featureList: ["70+ document formats", "IFC and CAD native", "Proprietary NER extraction", "LLM relationship mapping", "Self-hosted OCR", "SharePoint and Confluence connectors", "Zero data egress", "Purple8 Graph integration"],
};

const formats = [
  "PDF", "DOCX", "XLSX", "PPTX", "HTML", "Markdown",
  "IFC / BIM", "DXF / CAD", "Images (OCR)", "Audio (transcription)",
  "SAP IDocs", "Confluence", "SharePoint", "S3", "Email (EML/MSG)",
];

const features = [
  { icon: "⚡", label: "Two-pass extraction", desc: "GLiNER NER for entities, LLM pass for relationships. Domain-tuned profiles for AEC, legal, finance, scientific." },
  { icon: "🔌", label: "Connector suite", desc: "Pull from SharePoint, Confluence, S3, or receive webhooks. Syncs continuously." },
  { icon: "🧠", label: "P8G-aware chunking", desc: "Derives optimal chunking strategy, embedding model suggestion, and doc type confidence — forwarded to Purple8 for indexing." },
  { icon: "🔒", label: "Zero data egress", desc: "Self-hosted OCR engine available. Nothing leaves your network unless you configure an external LLM provider." },
  { icon: "📊", label: "Parallel extraction", desc: "Up to 8 concurrent LLM windows per document. Process large corpora fast." },
  { icon: "🎛️", label: "Custom profiles", desc: "Define your own extraction ontology — entity types, relationship types, chunking rules — per document domain." },
];

export default function DocIntelPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main id="main-content" className="bg-[#0a0a0f] pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden py-24">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-48 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-violet-900/15 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-700/40 bg-violet-950/40 px-4 py-1.5 text-sm font-medium text-violet-200">
              70+ file formats · Self-hosted · Zero data egress
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Any document.{" "}
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                Structured knowledge.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
              Purple8 DocIntel is a stateless microservice that turns 70+ enterprise
              document formats — PDFs, CAD files, BIM models, spreadsheets, and
              images — into structured entities and relationships committed directly
              into your Purple8 knowledge graph.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="/quickstart#add-docintel"
                className="rounded-full bg-purple-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-purple-900/40 transition-colors hover:bg-purple-500"
              >
                Get started
              </a>
              <a href="mailto:hello@purple8.ai" className="text-base font-semibold text-zinc-300 transition-colors hover:text-white">
                Talk to us →
              </a>
            </div>
          </div>
        </section>

        {/* Formats */}
        <section className="py-20 border-t border-white/5">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">Format coverage</p>
            <h2 className="mt-3 text-3xl font-bold text-white">70+ formats. One API.</h2>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {formats.map((f) => (
                <span key={f} className="rounded-full border border-violet-800/50 bg-violet-600/10 px-4 py-1.5 text-sm text-violet-200">
                  {f}
                </span>
              ))}
              <span className="rounded-full border border-zinc-700 bg-zinc-800/50 px-4 py-1.5 text-sm text-zinc-400">+ 55 more</span>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 border-t border-white/5">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">How it works</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Parse → Extract → Commit</h2>
              <p className="mt-4 text-zinc-400">Seven-stage pipeline, fully async. Drop a file in — get knowledge graph nodes out.</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => (
                <div key={f.label} className="rounded-xl border border-zinc-800 bg-[#11111b] p-5">
                  <div className="text-2xl mb-3">{f.icon}</div>
                  <h3 className="font-semibold text-white">{f.label}</h3>
                  <p className="mt-1 text-sm text-zinc-400">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 border-t border-white/5">
          <div className="mx-auto max-w-2xl px-4 text-center">
            <h2 className="text-3xl font-bold text-white">Add document intelligence to your stack.</h2>
            <p className="mt-4 text-zinc-400">Works standalone or alongside Purple8 Hyper Graph. Self-hosted, air-gap ready.</p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a href="/quickstart#add-docintel" className="rounded-full bg-purple-600 px-8 py-3.5 text-base font-semibold text-white hover:bg-purple-500">
                Get started
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
