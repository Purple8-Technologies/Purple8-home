// Benchmark data - sourced from real, reproducible test runs.
//
// Every number here traces to a run in the purple8-graph benchmarks/ suite.
// Each metric carries its own test conditions so the figure is defensible and
// never presented without context. See methodology notes on the /benchmarks page.
//
// Primary source: benchmarks/results/BENCHMARK_SUMMARY_20260707.md
//   Instance: AWS c6i.metal - 128 vCPU, 251 GB RAM, x86_64, Ubuntu 24.04
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
    title: "High-Scale Graph Traversal - up to 20M Nodes / 30M Edges (50M Objects)",
    blurb:
      "Verified on a single 16-vCPU cloud instance (Fly.io performance-16x) scaling up to 20,000,000 nodes and 30,000,000 edges (50M total graph objects in 25.35 GB on NVMe), including power-law super-hub stress tests with millions of incident edges on a single node.",
    items: [
      {
        value: "52 µs / 1.26 ms",
        label: "Point node lookup (P50 / P99)",
        conditions:
          "16 vCPU · cold-slab mmap lookup across multi-million-node graph · 52.0 µs P50, 1.26 ms P99.",
      },
      {
        value: "0.38 ms / 0.87 ms",
        label: "2-hop neighbourhood walk (P50 / P99)",
        conditions:
          "16 vCPU · 2-hop graph traversal returning connected subgraph in sub-millisecond P99; guarded super-hub walk completes in 53.1 ms P50 / 58.8 ms P99 with 0 errors.",
      },
      {
        value: "4,181 QPS",
        label: "Concurrent 16-thread graph reads",
        conditions:
          "16 concurrent reader threads · 0.44 ms P50 / 13.8 ms P99 latency; 20M nodes + 30M edges stored in 25.35 GB on NVMe.",
      },
    ],
  },
  {
    title: "Multi-User, Multi-Tenant & Concurrent Workloads (v0.72.0)",
    blurb:
      "Measured on Purple8 v0.72.0 across 16 dedicated vCPUs (Fly.io performance-16x), validating concurrent multi-thread graph reads, 16-tenant cryptographic isolation, mixed read/write/traversal/vector storms, and parallel DocIntel document-to-graph commits.",
    items: [
      {
        value: "4,858 QPS",
        label: "16-thread peak concurrent graph reads",
        conditions:
          "v0.72.0 · 16 concurrent reader threads · 1.25 ms P50 / 9.73 ms P99 latency at 2.5M graph objects; sustains 4,181 QPS at 40M graph objects (0.44 ms P50).",
      },
      {
        value: "1,900 ops/s",
        label: "16-tenant concurrent isolation (0 leaks)",
        conditions:
          "v0.72.0 · 16 concurrent tenants executing 1,600 simultaneous isolated operations with 0 cross-tenant data leakage.",
      },
      {
        value: "238 QPS · 2.4 ms P50",
        label: "16-thread mixed read/write/traversal/vector storm",
        conditions:
          "v0.72.0 · 16 threads simultaneously running point lookups, 2-hop graph walks, vector search, full-text search, and live writes with 0 errors.",
      },
      {
        value: "200 QPS",
        label: "16-thread concurrent vector search (384d)",
        conditions:
          "v0.72.0 · 1,600 concurrent vector searches across 16 threads (single-query 4.52 ms P50 / 6.09 ms P95 / 7.63 ms P99).",
      },
      {
        value: "353 pages/s",
        label: "DocIntel 8-worker parallel document parsing",
        conditions:
          "v0.72.0 · 35.34 docs/s (10-page enterprise filings) + 70.7 tables/s across 8 concurrent CPU workers (13.2 ms parse P50).",
      },
      {
        value: "25,596 docs/hr",
        label: "Coupled DocIntel -> Hyper Graph atomic commits",
        conditions:
          "v0.72.0 · 7.11 full 10-page documents/s (442.4 nodes/s + 619.4 edges/s + tables + chunks) committed atomically (141.8 ms P50, 0.65 ms P50 table row lookup).",
      },
    ],
  },
  {
    title: "Latency - single user, full HTTP stack",
    blurb:
      "Apples-to-apples against a dedicated vector database: one user, one worker, 1024-dimensional embeddings, over the full HTTP stack - with the graph engine, write-ahead log, AES-256-GCM encryption, and RBAC all running in the same process at the same time.",
    items: [
      {
        value: "23 ms",
        label: "P95 vector search (k=10)",
        conditions:
          "1 user · 1 worker · 1024d · full HTTP + auth + durable write log + encryption + RBAC. Single-user, not under concurrent load.",
      },
      {
        value: "1.1 ms",
        label: "P95 vector search - direct engine",
        conditions:
          "100K corpus · 1024d · in-process, no HTTP or serialization overhead.",
      },
    ],
  },
  {
    title: "Throughput - ingest & concurrent load",
    blurb:
      "Sustained write and query throughput, from batch ingestion to hundreds of concurrent users.",
    items: [
      {
        value: "57,000 docs/s",
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
        label: "Requests in 30 min · 0 engine faults",
        conditions:
          "500 users · 32 workers · 30-min soak. 3 × HTTP 500 in 1.28M requests (0.0002%) - transport-layer timeouts, not engine errors. Zero data corruption or incorrect results.",
      },
    ],
  },
  {
    title: "Memory - bounded by hardware, not corpus",
    blurb:
      "Purple8 fits its ingest footprint to the RAM available. A hardware-aware auto-configuration sizes the batch geometry so peak memory tracks the machine, not the amount of data. Peak memory usage stays within a fixed envelope as batches complete and are evicted - it does not grow with total corpus size.",
    items: [
      {
        value: "~9 GB peak",
        label: "8.84M passages on a 24 GB machine",
        conditions:
          "8.84M-passage corpus · Apple M-series 24 GB. Peak memory held around 9 GB in a stable bounded envelope - never grew with corpus size. No swap required.",
      },
      {
        value: "same footprint",
        label: "2M or 20M records",
        conditions:
          "Peak memory is set by available RAM, not corpus size. A smaller machine ingests the same corpus in more time - the memory envelope stays hardware-bounded.",
      },
    ],
  },
  {
    title: "Footprint - you start ahead",
    blurb:
      "The consolidated stack removes the overhead a 29-service architecture pays just to stand up - before a single record is stored. Idle draw is runtime tax, inter-service network buffers, duplicated caches, and connection pools; Purple8 has one runtime, one cache, one pool.",
    items: [
      {
        value: "~350 MiB",
        label: "Purple8 runtime, idle",
        conditions:
          "One process up and ready before any data is ingested - one runtime, one thread pool, one cache. Data is streamed from disk behind a bounded window, so the footprint is set by the machine, not the corpus.",
      },
      {
        value: "9–15 GB",
        label: "29-service stack, idle",
        conditions:
          "Overhead reserved before any data is stored, even at a charitable 50 MB runtime floor per service: ~1.45 GB runtimes + inter-service network buffers + the same rows cached 3–5× + per-service connection pools. Structural estimate of a minimal production stack, not a single measured deployment.",
      },
    ],
  },
];

// Reproducibility footer.
export const benchmarkMeta = {
  instance: "AWS c6i.metal (128 vCPU, 251 GB RAM) & Fly.io performance-16x (16 vCPU, 60 GB NVMe, up to 20M nodes / 30M edges)",
  engine: "Purple8 v0.72.0 · Cortex storage · 14,500+ automated tests",
  engineNote: "v0.72.0 is the purple8-hyper-graph release version.",
  suite: "purple8-graph benchmarks/ suite",
  date: "2026",
};
