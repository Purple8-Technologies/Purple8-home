import type { Metadata } from "next";
import BrandShell from "@/components/revamp/BrandShell";
import DocIntelWorkspaceLink from "@/components/DocIntelWorkspaceLink";
import StartPaths from "@/components/revamp/StartPaths";
import Proofs, { type Proof } from "@/components/revamp/Proofs";
import Differentiators from "@/components/revamp/Differentiators";
import DocIntelFlow from "@/components/revamp/DocIntelFlow";
import { pageMetadata } from "@/lib/seo";
import { FACTS as F } from "@/lib/facts";
import { DOCINTEL_CLOUD_BANDS, docIntelCloudBill } from "@/lib/pricing";

export const metadata: Metadata = pageMetadata({
  title: "Purple8 DocIntel: any document, structured knowledge",
  description:
    `Turns ${F.docFormats} document formats into entities and relationships ready for your knowledge graph. Self-hostable, with local OCR.`,
  path: "/products/docintel",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Purple8 DocIntel",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Linux, macOS, Windows, Docker",
  description: `Turns ${F.docFormats} document formats into structured entities and relationships for a knowledge graph.`,
  url: "https://www.purple8.ai/products/docintel/",
  publisher: { "@type": "Organization", name: "Purple8 Inc.", url: "https://www.purple8.ai" },
};

const proofs: [Proof, Proof, Proof] = [
  { figure: F.docFormats, unit: "formats", detail: "PDF, Office, email, images, CAD and BIM models", href: "/architecture/" },
  { figure: F.languages, unit: "languages", detail: "entities kept in their native script", href: "/architecture/" },
  { figure: "2-pass", unit: "extraction", detail: "entity recognition first, then an LLM for relationships, tuned per domain", href: "/architecture/" },
];

const lead = [
  {
    tag: "Graph-ready",
    title: "Built to feed a graph, not a chatbot",
    body: "Most document tools stop at text chunks for a vector store. DocIntel returns the people, organisations, money, dates and relationships between them, with stable IDs. Download structured results or send them to your chosen graph or application. Hyper Graph is an optional destination, not a requirement.",
  },
  {
    tag: "Two-pass",
    title: "Entities first, then relationships",
    body: "A fast entity model finds what is in the document. A language model then links those entities, given the full list as context. Each pass does what it is best at, and every domain profile (contracts, finance, science, AEC) brings its own ontology.",
  },
];

const more = [
  { title: "Stable IDs for integration", body: "Normalized names and types produce deterministic IDs for de-duplication. Review ambiguous names before merging records across documents." },
  { title: "Session-based processing", body: "Hosted document content and results stay in RAM for the processing session. Account, job and billing metadata are retained separately. Download results before the session ends." },
  { title: "Native script, every language", body: `Language is detected per document across ${F.languages} languages, and entity names stay in their original script.` },
  { title: "Structure-aware chunking", body: "Contracts split on clauses, papers on sections, spreadsheets keep their tables. The split follows the document, not a character count." },
  { title: "Your providers, your choice", body: "Self-host with local OCR and a local language model for in-network processing, or choose cloud providers. Data handling depends on your selected providers." },
  { title: "Ready for your destination", body: "Document type and chunking hints travel with structured output. Use the REST API, export results, or connect an optional graph destination." },
];

const features = [
  { group: "Formats", items: ["PDF, Word, Excel, PowerPoint, HTML", "Scanned images with OCR", "Email, CAD, BIM, SAP IDocs"] },
  { group: "Extraction", items: ["People, money, dates, relationships", "Contract, financial, scientific, AEC profiles", "Custom ontologies"] },
  { group: "Quality", items: ["Stable entity IDs", "De-duplication", "Confidence thresholds per profile"] },
  { group: "Connectors", items: ["SharePoint", "Confluence", "Amazon S3 and webhooks"] },
  { group: "Operations", items: ["Async jobs with live progress", "RAM-only hosted document sessions", "Metrics, health and readiness"] },
  { group: "Output", items: ["Structured exports and REST API", "Preview before sending", "Optional Hyper Graph integration"] },
];

export default function DocIntelPage() {
  return (
    <BrandShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* What is it? */}
      <section className="mx-auto max-w-3xl px-4 pt-28 pb-24 text-center sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--p8-accent)]">Purple8 DocIntel</p>
        <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl">Any document. Structured knowledge.</h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[var(--p8-muted)]">
          Turns every document into the people, money, dates and relationships inside it, ready for your graph.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <DocIntelWorkspaceLink view="playground" className="rounded-full bg-[var(--p8-button)] px-7 py-3 text-sm font-semibold text-white hover:opacity-90">
            Try DocIntel
          </DocIntelWorkspaceLink>
          <a href="#start" className="rounded-full border border-[var(--p8-border)] px-7 py-3 text-sm font-semibold hover:border-[var(--p8-accent)] hover:text-[var(--p8-accent)]">
            All ways to start
          </a>
        </div>
      </section>

      {/* How it works */}
      <div className="border-t border-[var(--p8-border)]">
        <DocIntelFlow />
      </div>

      {/* Why is it different? */}
      <Differentiators heading="Documents become knowledge, not just text" lead={lead} more={more} />
      <Proofs proofs={proofs} />

      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight">Start free. Activate Cloud or Enterprise Self-Hosted when ready.</h2>
        <p className="mt-5 text-lg text-[var(--p8-muted)]">
          <strong className="text-[var(--p8-fg)]">Cloud Graduated:</strong> ${DOCINTEL_CLOUD_BANDS[0].flatUsd}/month for access, plus ${DOCINTEL_CLOUD_BANDS[0].perPageUsd}/page
          {" "}for the first {DOCINTEL_CLOUD_BANDS[0].upTo?.toLocaleString("en-US")} pages each month;
          {" "}${DOCINTEL_CLOUD_BANDS[1].perPageUsd}/page above that.
        </p>
        <p className="mt-3 text-sm text-[var(--p8-muted)]">
          Access is paid upfront; page usage is billed in arrears. The access fee is not usage credit.
          {" "}For example, 10,000 pages costs ${docIntelCloudBill(10_000).toLocaleString("en-US")} before tax.
          One subscription covers all your projects. No prepaid purchase is required or offered.
        </p>
        <p className="mt-4 text-sm text-[var(--p8-muted)]">
          <strong className="text-[var(--p8-fg)]">Self-Hosted:</strong> Free Community edition (500 docs/month) for evaluation, or one commercial self-hosted tier — <strong className="text-[var(--p8-fg)]">Enterprise / Custom</strong> — for unlimited in-network processing.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <DocIntelWorkspaceLink view="billing" className="inline-block rounded-full bg-[var(--p8-button)] px-7 py-3 text-sm font-semibold text-white hover:opacity-90">
            View Cloud billing
          </DocIntelWorkspaceLink>
          <a href="mailto:sales@purple8.ai?subject=DocIntel%20Self-Hosted%20Enterprise%20%2F%20Custom" className="inline-block rounded-full border border-[var(--p8-border)] px-7 py-3 text-sm font-semibold hover:border-[var(--p8-accent)] hover:text-[var(--p8-accent)]">
            Self-Hosted Enterprise / Custom
          </a>
        </div>
      </section>

      {/* How do I start? */}
      <section id="start" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold tracking-tight">How do I start?</h2>
        <div className="mt-12">
          <StartPaths product="DocIntel" sandboxHref="/try/docintel/" />
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-[var(--p8-border)]">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold tracking-tight">What is inside</h2>
          <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.group} className="border-t border-[var(--p8-border)] pt-5">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-[var(--p8-accent)]">{f.group}</h3>
                <ul className="mt-4 space-y-2 text-[var(--p8-muted)]">
                  {f.items.map((i) => <li key={i}>{i}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </BrandShell>
  );
}
