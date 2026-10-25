import type { Metadata } from "next";
import BrandShell from "@/components/revamp/BrandShell";
import StartPaths from "@/components/revamp/StartPaths";
import Numbers from "@/components/revamp/Numbers";
import Differentiators from "@/components/revamp/Differentiators";
import SystemFlow from "@/components/SystemFlow";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Purple8 Hyper Graph: the AI backend in one process",
  description:
    "Graph, vector, documents, workflows and security in one embedded engine that AI agents build on directly through MCP.",
  path: "/products/hyper-graph",
});


const features = [
  { group: "Store and search", items: ["Graph, document and vector store", "Vector, full-text and hybrid search", "Graph RAG with self-tuning retrieval"] },
  { group: "Intelligence", items: ["Ranking, communities, centrality", "Paths and link prediction", "Optimisation engines"] },
  { group: "Workflow", items: ["Journeys with deadlines and SLAs", "Human approval gates", "Immutable audit trail"] },
  { group: "Security", items: ["Encryption at rest (AES-256-GCM)", "Roles, API keys, record-level access", "Multi-tenancy and PII masking"] },
  { group: "Operations", items: ["One process, one port", "Write-ahead log and crash recovery", "Cloud, on-premise or air-gapped"] },
  { group: "Interfaces", items: ["MCP server for AI agents", "REST and GraphQL APIs", "Python SDK"] },
];

export default function HyperGraphPage() {
  return (
    <BrandShell>
      {/* What is it? */}
      <section className="mx-auto max-w-3xl px-4 pt-28 pb-24 text-center sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--p8-accent)]">Purple8 Hyper Graph</p>
        <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl">The AI backend, in one process.</h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[var(--p8-muted)]">
          Graph, vector, documents, workflows and security in one engine your AI agents build on directly.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <a href="/try/graph/" className="rounded-full bg-[var(--p8-button)] px-7 py-3 text-sm font-semibold text-white hover:opacity-90">
            Try Hyper Graph
          </a>
          <a href="#start" className="rounded-full border border-[var(--p8-border)] px-7 py-3 text-sm font-semibold hover:border-[var(--p8-accent)] hover:text-[var(--p8-accent)]">
            All ways to start
          </a>
        </div>
      </section>

      {/* How it works */}
      <div className="p8-themed border-t border-[var(--p8-border)]">
        <SystemFlow />
      </div>

      {/* Why is it different? */}
      <Differentiators />
      <Numbers />

      {/* Self-hosted pricing philosophy */}
      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--p8-accent)]">Self-Hosted Licensing</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight">Start free. One commercial self-hosted tier: Enterprise / Custom.</h2>
        <p className="mt-5 text-lg text-[var(--p8-muted)]">
          Build and prototype locally for free with the Developer edition (up to 50K nodes, all {features.length > 0 ? "120+ MCP tools" : "MCP tools"}, RAG pipelines, and Journey workflows).
          When you deploy to production in your own VPC, on-premise, or air-gapped infrastructure, there is only one commercial self-hosted tier: <strong className="text-[var(--p8-fg)]">Enterprise / Custom</strong> — tailored to your capacity, HA, and compliance needs.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <a href="/register/" className="rounded-full bg-[var(--p8-button)] px-7 py-3 text-sm font-semibold text-white hover:opacity-90">
            Download Developer Free
          </a>
          <a href="mailto:sales@purple8.ai?subject=Purple8%20Hyper%20Graph%20Enterprise%20%2F%20Custom%20inquiry" className="rounded-full border border-[var(--p8-border)] px-7 py-3 text-sm font-semibold hover:border-[var(--p8-accent)] hover:text-[var(--p8-accent)]">
            Talk to sales — Enterprise / Custom
          </a>
        </div>
      </section>

      {/* How do I start? */}
      <section id="start" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold tracking-tight">How do I start?</h2>
        <div className="mt-12">
          <StartPaths product="Hyper Graph" sandboxHref="/try/graph/" />
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
