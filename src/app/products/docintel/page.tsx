import type { Metadata } from "next";
import BrandShell from "@/components/revamp/BrandShell";
import StartPaths from "@/components/revamp/StartPaths";
import Proofs, { type Proof } from "@/components/revamp/Proofs";
import { pageMetadata } from "@/lib/seo";
import { FACTS as F } from "@/lib/facts";

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

const features = [
  { group: "Formats", items: ["PDF, Word, Excel, PowerPoint, HTML", "Scanned images with OCR", "Email, CAD, BIM, SAP IDocs"] },
  { group: "Extraction", items: ["People, money, dates, relationships", "Contract, financial, scientific, AEC profiles", "Custom ontologies"] },
  { group: "Quality", items: ["Stable entity IDs", "De-duplication", "Confidence thresholds per profile"] },
  { group: "Connectors", items: ["SharePoint", "Confluence", "Amazon S3 and webhooks"] },
  { group: "Operations", items: ["Async jobs with live progress", "Crash-safe job store", "Metrics, health and readiness"] },
  { group: "Output", items: ["Commits straight into Hyper Graph", "Preview before commit", "Processing history"] },
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
          <a href="/try/docintel/" className="rounded-full bg-[var(--p8-button)] px-7 py-3 text-sm font-semibold text-white hover:opacity-90">
            Try DocIntel
          </a>
          <a href="#start" className="rounded-full border border-[var(--p8-border)] px-7 py-3 text-sm font-semibold hover:border-[var(--p8-accent)] hover:text-[var(--p8-accent)]">
            All ways to start
          </a>
        </div>
      </section>

      {/* Why is it different? */}
      <Proofs proofs={proofs} />

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
