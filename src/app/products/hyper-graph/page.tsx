import type { Metadata } from "next";
import BrandShell from "@/components/revamp/BrandShell";
import StartPaths from "@/components/revamp/StartPaths";
import Numbers from "@/components/revamp/Numbers";
import Differentiators from "@/components/revamp/Differentiators";
import SystemFlow from "@/components/SystemFlow";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Purple8 Hyper Graph: AI-Native Execution Infrastructure",
  description:
    "Infrastructure that enables AI systems to autonomously build, execute and operate applications, with native intelligence, adaptive computing and human-supervised governance.",
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
      <section className="mx-auto max-w-4xl px-4 pt-28 pb-24 text-center sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--p8-accent)]">Purple8 Hyper Graph</p>
        <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl">AI-Native Execution Infrastructure</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--p8-muted)]">
          Infrastructure that enables AI systems to autonomously build, execute and operate applications, with native intelligence, adaptive computing and human-supervised governance.
        </p>
        <p className="mx-auto mt-4 text-base font-semibold tracking-wide text-[var(--p8-accent)]">
          Built for AI, Operated by AI and Supervised by Humans.
        </p>
        <p className="mx-auto mt-2 text-xs font-medium tracking-wider text-[var(--p8-muted)] sm:text-sm">
          Read · Remember · Reason · Answer · Run · Protect · Prove · One Engine built to solve complex problems.
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-[var(--p8-muted)]">
          One in-process engine replacing your database, vector store, knowledge graph, workflow orchestrator, and security layer. Pair with <a href="/products/docintel/" className="font-semibold text-[var(--p8-accent)] hover:underline">Purple8 DocIntel</a> to turn unstructured documents and text into semantic vectors, graph nodes, and relationships.
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

      {/* Licensing philosophy */}
      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--p8-accent)]">Licensing &amp; Deployment</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight">Evaluate in the Cloud Sandbox. License for VPC, On-Premise &amp; Air-Gapped Production.</h2>
        <p className="mt-5 text-lg text-[var(--p8-muted)]">
          Start immediately in the free Cloud Sandbox with all {features.length > 0 ? "125+ MCP tools" : "MCP tools"}, hybrid GraphRAG pipelines, and Journey workflows.
          For commercial, enterprise, multi-cluster HA, or OEM deployments across your own VPC, on-premise, or air-gapped infrastructure—available directly and expanding across <strong className="text-[var(--p8-fg)]">Red Hat, AWS, Azure &amp; GCP Marketplaces</strong>—contact our team.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <a href="/try/graph/" className="rounded-full bg-[var(--p8-button)] px-7 py-3 text-sm font-semibold text-white hover:opacity-90">
            Try Cloud Sandbox
          </a>
          <a href="mailto:sales@purple8.ai?subject=Purple8%20Hyper%20Graph%20Licensing%20Inquiry" className="rounded-full border border-[var(--p8-border)] px-7 py-3 text-sm font-semibold hover:border-[var(--p8-accent)] hover:text-[var(--p8-accent)]">
            Contact Us →
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
