// Benchmark data — sourced from real, reproducible test runs.
//
// Every number here traces to a run in the purple8-graph benchmarks/ suite.
// Each metric carries its own test conditions so the figure is defensible and
// never presented without context. See methodology notes on the /benchmarks page.
//
// Primary source: benchmarks/results/BENCHMARK_SUMMARY_20260707.md
//   Instance: AWS c6i.metal — 128 vCPU, 251 GB RAM, x86_64, Ubuntu 24.04
//   Engine:   v0.61.0 · Cortex storage
// Bounded-RSS source: 8.84M MS MARCO validation run, Apple M-series 24 GB (May 2026)

export type Benchmark = {
  value: string;
  label: string;
  conditions: string;
};

export type BenchmarkGroup = {
  title: string;
  blurb: string;
  items: Benchmark[];
};

export const benchmarkGroups: BenchmarkGroup[] = [
  {
    title: "Latency — single user, full HTTP stack",
    blurb:
      "Apples-to-apples against a dedicated vector database: one user, one worker, 1024-dimensional embeddings, over the full HTTP stack — with the graph engine, write-ahead log, AES-256-GCM encryption, and RBAC all running in the same process at the same time.",
    items: [
      {
        value: "23 ms",
        label: "P95 vector search (k=10)",
        conditions:
          "1 user · 1 worker · 1024d · full HTTP + auth + WAL + encryption + RBAC. Single-user, not under concurrent load.",
      },
      {
        value: "1.1 ms",
        label: "P95 vector search — direct engine",
        conditions:
          "100K corpus · 1024d · in-process, no HTTP or serialisation overhead.",
      },
    ],
  },
  {
    title: "Throughput — ingest & concurrent load",
    blurb:
      "Sustained write and query throughput, from batch ingestion to hundreds of concurrent users.",
    items: [
      {
        value: "40,551 docs/s",
        label: "Batch ingest throughput",
        conditions:
          "batch-1000 · 128d · direct engine. Single-node ingest P95 is 4 ms.",
      },
      {
        value: "752 req/s",
        label: "Sustained under 500 users",
        conditions:
          "500 users · 32 workers · 384d · 5 min · full HTTP stack. 0 gate failures.",
      },
      {
        value: "1,283,494",
        label: "Requests in 30 min · 0 engine errors",
        conditions:
          "500 users · 32 workers · 30-min soak. 3 × HTTP 500 in 1.28M requests = 0.0002%.",
      },
    ],
  },
  {
    title: "Memory — bounded by hardware, not corpus",
    blurb:
      "Purple8 fits its ingest footprint to the RAM available. A hardware-aware auto-config sizes the batch geometry so peak memory tracks the machine, not the amount of data. Peak RSS oscillates within a fixed envelope as batches are sealed and evicted — it does not grow with total corpus size.",
    items: [
      {
        value: "~9 GB peak",
        label: "8.84M passages on a 24 GB machine",
        conditions:
          "8.84M MS MARCO corpus · Apple M-series 24 GB. Peak memory held around 9 GB in a sawtooth across all seal cycles — never grew with N. No swap required.",
      },
      {
        value: "same footprint",
        label: "2M or 20M records",
        conditions:
          "Peak memory is set by available RAM, not corpus size. A smaller machine ingests the same corpus in more time — the memory envelope stays hardware-bounded.",
      },
    ],
  },
];

// Reproducibility footer.
export const benchmarkMeta = {
  instance: "AWS c6i.metal — 128 vCPU, 251 GB RAM, x86_64, Ubuntu 24.04",
  engine: "Purple8 v0.61.0 · Cortex storage",
  suite: "purple8-graph benchmarks/ suite",
  date: "July 2026",
};
