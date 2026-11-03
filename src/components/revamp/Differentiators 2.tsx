// "How it is different": architecture, not benchmarks. Numbers live in
// <Numbers />. Each point must be true of the shipped engine today.

import { FACTS as F } from "@/lib/facts";

type Item = { tag?: string; title: string; body: string };

const LEAD: Item[] = [
  {
    tag: "Inverted",
    title: "Agents build the backend too",
    body: `Agents already write the frontend. The backend stayed human-built because its architecture was rigid and opinionated: fixed schemas, separate stores, hand-wired services. Purple8 inverts that. It is built MCP-first, so an agent can ingest data, shape the graph, define workflows, run RAG and route decisions through ${F.mcpTools} tools. The whole application, front to back, is agent-built.`,
  },
  {
    tag: "Fluid state",
    title: "One living state, not eight copies",
    body: "Documents, vectors, relationships, workflow stages and the audit trail are the same graph. A workflow step is a node, a transition is an edge, a decision is a record. Nothing to sync between stores, nothing to drift, and agents reason over the whole state at once.",
  },
];

const MORE: Item[] = [
  { title: "One process, zero hops", body: "Database, graph, vector, full-text, workflows and security share memory. No network calls between services, because there are no services." },
  { title: "Memory bounded by hardware", body: "Writes seal and evict in fixed batches, so peak memory tracks the machine, not the corpus. A bigger knowledge base does not mean a bigger server." },
  { title: "Graph-guided retrieval", body: "The graph picks candidates before the vector index runs, so search skips the parts of the index that cannot matter." },
  { title: "Audit is the data", body: "Every transition, AI action and human decision is an immutable edge. Tracing is a query, not a separate product." },
  { title: "Secure from the first line", body: "Encryption at rest, RBAC, tenant isolation and a built-in SOC agent are on by default. There is no harden-later step." },
  { title: "Humans stay in the loop", body: "Workflow stages can require human approval with SLAs. Agents propose; people decide where it matters." },
];

export default function Differentiators({
  heading = "The only inverted, fluid-state backend built for AI agents",
  lead = LEAD,
  more = MORE,
}: { heading?: string; lead?: Item[]; more?: Item[] } = {}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 text-left sm:px-6 lg:px-8">
      <p className="text-center text-sm font-semibold uppercase tracking-widest text-[var(--p8-accent)]">How it is different</p>
      <h2 className="mx-auto mt-3 max-w-3xl text-center text-3xl font-bold tracking-tight sm:text-4xl">
        {heading}
      </h2>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {lead.map((d) => (
          <div key={d.title} className="rounded-2xl border border-[var(--p8-accent)]/40 bg-[var(--p8-surface)] p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--p8-accent)]">{d.tag}</p>
            <h3 className="mt-2 text-2xl font-bold">{d.title}</h3>
            <p className="mt-3 leading-relaxed text-[var(--p8-muted)]">{d.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {more.map((d) => (
          <div key={d.title} className="rounded-2xl border border-[var(--p8-border)] bg-[var(--p8-surface)] p-6">
            <h3 className="font-semibold">{d.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--p8-muted)]">{d.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
