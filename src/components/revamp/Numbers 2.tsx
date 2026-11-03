// "By the numbers": measured results only. Every figure links to the
// benchmarks page, which cites the source result file.

import { FACTS as F } from "@/lib/facts";

const NUMBERS = [
  { figure: F.queryP99, unit: "query P99", detail: "Vector query at 100K nodes, in-process." },
  { figure: F.batchIngest, unit: "batch ingest", detail: `${F.batchIngestExact} documents per second, batches of 1,000.` },
  { figure: `${F.vectorQps} q/s`, unit: "at 1M vectors", detail: `768 dimensions, recall@10 of ${F.vectorRecall} on VectorDBBench.` },
  { figure: F.corpusDocs, unit: "docs on a laptop", detail: `Full MS MARCO on a ${F.corpusRam} machine, ${F.corpusPeak} peak memory.` },
  { figure: F.httpP95, unit: "P95 over HTTP", detail: "1024-d search with auth, WAL, encryption and RBAC all on." },
  { figure: F.soakErrors, unit: "errors under soak", detail: `${F.soakRequests} requests, ${F.soakUsers} users, 30 minutes.` },
];

export default function Numbers() {
  return (
    <section className="border-y border-[var(--p8-border)] bg-[var(--p8-surface)]">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-[var(--p8-accent)]">By the numbers</p>
        <h2 className="mt-3 text-center text-3xl font-bold tracking-tight sm:text-4xl">Fast because nothing leaves the process</h2>
        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {NUMBERS.map((n) => (
            <div key={n.unit} className="text-center">
              <p className="text-5xl font-bold tracking-tight text-[var(--p8-accent)]">{n.figure}</p>
              <p className="mt-2 font-semibold">{n.unit}</p>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-[var(--p8-muted)]">{n.detail}</p>
            </div>
          ))}
        </div>
        <p className="mt-12 text-center text-sm">
          <a href="/benchmarks/" className="font-medium text-[var(--p8-accent)] hover:underline">See the benchmarks and method →</a>
        </p>
      </div>
    </section>
  );
}
