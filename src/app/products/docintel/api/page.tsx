import type { Metadata } from "next";
import BrandShell from "@/components/revamp/BrandShell";
import DocIntelWorkspaceLink from "@/components/DocIntelWorkspaceLink";
import { pageMetadata } from "@/lib/seo";
import { FACTS as F } from "@/lib/facts";
import { DOCINTEL_CLOUD_BANDS } from "@/lib/pricing";

const INCLUDED_PAGES = DOCINTEL_CLOUD_BANDS[0].upTo ?? 10_000;
const ACCESS_USD = DOCINTEL_CLOUD_BANDS[0].flatUsd;
const OVERAGE_USD = DOCINTEL_CLOUD_BANDS[1].perPageUsd;

export const metadata: Metadata = pageMetadata({
  title: "DocIntel API: document processing & entity extraction API",
  description:
    `REST API for document intelligence: POST a document in ${F.docFormats} formats, get entities, relationships, tables and markdown back. Free sandbox keys, pay-per-page production.`,
  path: "/products/docintel/api",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebAPI",
  name: "Purple8 DocIntel API",
  description: `Asynchronous document-processing API: ${F.docFormats} formats, ${F.languages} languages, two-pass entity and relationship extraction.`,
  documentation: "https://docintel.purple8.ai/docs",
  url: "https://www.purple8.ai/products/docintel/api/",
  provider: { "@type": "Organization", name: "Purple8 Inc.", url: "https://www.purple8.ai" },
};

const steps = [
  {
    n: "1",
    title: "Get an API key",
    body: "Sign in to the DocIntel workspace and open \u201CAPI keys & access\u201D. Sandbox access is free and set up automatically \u2014 no subscription needed to start. The same endpoint serves sandbox and paid keys.",
    code: `# Keys are managed at
# https://docintel.purple8.ai/try?view=api
export DOCINTEL_API_KEY="<your key>"`,
  },
  {
    n: "2",
    title: "Upload a document",
    body: "POST any supported file. The API answers immediately (202) with a job_id while extraction runs asynchronously. Add auto_commit=false to preview results without writing to a graph.",
    code: `curl -X POST "https://docintel.purple8.ai/process" \\
  -H "Authorization: Bearer $DOCINTEL_API_KEY" \\
  -F "file=@contract.pdf"

# => { "job_id": "…", "status": "queued" }`,
  },
  {
    n: "3",
    title: "Collect the results",
    body: "Poll the job (or subscribe to its live stream). Finished jobs return the people, organisations, money, dates and relationships found \u2014 with stable IDs \u2014 plus structure-aware chunks.",
    code: `curl "https://docintel.purple8.ai/jobs/$JOB_ID" \\
  -H "Authorization: Bearer $DOCINTEL_API_KEY"

# Markdown rendition of the whole document:
curl "https://docintel.purple8.ai/jobs/$JOB_ID/markdown" \\
  -H "Authorization: Bearer $DOCINTEL_API_KEY"`,
  },
];

const endpoints = [
  { method: "POST", path: "/process", what: "Upload a file for async processing; returns a job_id (202)" },
  { method: "POST", path: "/process/url", what: "Process a document fetched from a URL" },
  { method: "GET", path: "/jobs/{id}", what: "Job status, entities, relationships, chunks" },
  { method: "GET", path: "/jobs/{id}/stream", what: "Live progress over Server-Sent Events" },
  { method: "GET", path: "/jobs/{id}/markdown", what: "Structure-aware markdown rendition" },
  { method: "GET", path: "/jobs/{id}/entities", what: "Extracted entities for the job" },
  { method: "POST", path: "/jobs/{id}/send-to-graph", what: "Commit results into a Purple8 Hyper Graph" },
  { method: "MCP", path: "/mcp", what: "Same capabilities as MCP tools for AI agents" },
];

const plans = [
  {
    name: "Sandbox",
    price: "$0",
    detail: "Free evaluation keys from the workspace. Same API, same formats \u2014 sized for trying it out, not production volume.",
  },
  {
    name: "DocIntel Cloud",
    price: `$${ACCESS_USD}/mo`,
    detail: `${INCLUDED_PAGES.toLocaleString("en-US")} pages/month included, then $${OVERAGE_USD.toFixed(2)} per additional page. Project API keys for team integrations. Only finished jobs are billed.`,
  },
  {
    name: "Pay as you go",
    price: "$0.015/page",
    detail: "Prepaid page credits, no monthly access fee. Buy credits in the workspace; processing draws down the balance.",
  },
];

export default function DocIntelApiPage() {
  return (
    <BrandShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-4 pt-28 pb-20 text-center sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--p8-accent)]">Purple8 DocIntel API</p>
        <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl">One POST. Structured knowledge back.</h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[var(--p8-muted)]">
          A REST API for document intelligence: upload any of {F.docFormats} formats in {F.languages} languages,
          get entities, relationships, tables and markdown back. Async jobs, live streams, stable IDs.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <DocIntelWorkspaceLink view="api" className="rounded-full bg-[var(--p8-button)] px-7 py-3 text-sm font-semibold text-white hover:opacity-90">
            Get an API key
          </DocIntelWorkspaceLink>
          <a href="https://docintel.purple8.ai/docs" target="_blank" rel="noopener noreferrer" className="rounded-full border border-[var(--p8-accent)] px-7 py-3 text-sm font-semibold text-[var(--p8-accent)] hover:bg-[var(--p8-hover)]">
            Interactive API reference ↗
          </a>
        </div>
      </section>

      {/* Quickstart */}
      <section className="border-t border-[var(--p8-border)]">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold tracking-tight">Quickstart</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--p8-muted)]">
            Authenticate with <code className="text-sm">Authorization: Bearer</code> or <code className="text-sm">X-API-Key</code>.
            Sandbox and paid keys use the same endpoints.
          </p>
          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="flex flex-col rounded-2xl border border-[var(--p8-border)] bg-[var(--p8-surface)] p-7">
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--p8-accent)]">Step {s.n}</p>
                <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--p8-muted)]">{s.body}</p>
                <pre className="mt-5 flex-1 overflow-x-auto rounded-xl border border-[var(--p8-border)] bg-[var(--p8-bg)] p-4 text-left text-xs leading-relaxed"><code>{s.code}</code></pre>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Endpoints */}
      <section className="border-t border-[var(--p8-border)]">
        <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight">Core endpoints</h2>
          <div className="mt-12 overflow-x-auto rounded-2xl border border-[var(--p8-border)]">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--p8-border)] text-xs uppercase tracking-widest text-[var(--p8-muted)]">
                  <th className="px-5 py-3">Method</th>
                  <th className="px-5 py-3">Path</th>
                  <th className="px-5 py-3">What it does</th>
                </tr>
              </thead>
              <tbody>
                {endpoints.map((e) => (
                  <tr key={e.path + e.method} className="border-b border-[var(--p8-border)] last:border-0">
                    <td className="px-5 py-3 font-mono text-xs text-[var(--p8-accent)]">{e.method}</td>
                    <td className="px-5 py-3 font-mono text-xs">{e.path}</td>
                    <td className="px-5 py-3 text-[var(--p8-muted)]">{e.what}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-center text-sm text-[var(--p8-muted)]">
            Full schema: <a className="text-[var(--p8-accent)] hover:underline" href="https://docintel.purple8.ai/openapi.json" target="_blank" rel="noopener noreferrer">openapi.json</a> ·
            Guides: <a className="text-[var(--p8-accent)] hover:underline" href="https://docs.docintel.purple8.ai" target="_blank" rel="noopener noreferrer">docs.docintel.purple8.ai</a>
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t border-[var(--p8-border)]">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold tracking-tight">API pricing</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--p8-muted)]">
            Billed per page of processed output. Failed, cancelled and timed-out jobs cost nothing.
          </p>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {plans.map((p) => (
              <div key={p.name} className="flex flex-col rounded-2xl border border-[var(--p8-border)] bg-[var(--p8-surface)] p-7">
                <h3 className="text-xl font-semibold">{p.name}</h3>
                <p className="mt-2 text-3xl font-bold text-[var(--p8-accent)]">{p.price}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--p8-muted)]">{p.detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="/pricing/#docintel" className="rounded-full border border-[var(--p8-border)] px-7 py-3 text-center text-sm font-semibold hover:border-[var(--p8-accent)] hover:text-[var(--p8-accent)]">
              Full pricing details →
            </a>
            <a href="mailto:sales@purple8.ai?subject=DocIntel%20API%20Enterprise%20Inquiry" className="rounded-full border border-[var(--p8-border)] px-7 py-3 text-center text-sm font-semibold hover:border-[var(--p8-accent)] hover:text-[var(--p8-accent)]">
              Enterprise / self-hosted
            </a>
          </div>
        </div>
      </section>
    </BrandShell>
  );
}
