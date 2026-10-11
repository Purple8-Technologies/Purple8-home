// CANONICAL PUBLIC FACTS — the only place a public number is written.
//
// Every page and component imports from here. Never type a figure into a page.
// Update a value here and it changes everywhere on the site.
//
// Rules:
//  - Counts that grow fast (tools, formats, languages) are published rounded
//    down with "+", so shipping new features never makes the site wrong.
//  - Measured figures carry their source file (purple8-graph/benchmarks/results).

export const FACTS = {
  // ── Product surface ────────────────────────────────────────────────
  mcpTools: "110+", //           source: purple8-graph mcp_server.py (119 exact)
  docFormats: "70+", //          source: Purple8-DocIntel DocumentFormat enum
  languages: "75+", //           source: DocIntel lingua detector

  // ── Measured performance ──────────────────────────────────────────
  queryP99: "0.33 ms", //        BENCHMARK_SUMMARY_20260707.md · 100K nodes, in-process
  batchIngest: "40K/s", //       BENCHMARK_SUMMARY_20260707.md · 40,551 docs/s, batch 1,000
  batchIngestExact: "40,551",
  httpP95: "23 ms", //           BENCHMARK_SUMMARY_20260707.md · 1024d, full HTTP + security
  vectorQps: "916", //           BASELINE.md · VectorDBBench 1M × 768d
  vectorRecall: "0.946",
  corpusDocs: "8.8M", //         MS MARCO, Apple M-series 24 GB, May 2026
  corpusRam: "24 GB",
  corpusPeak: "~9 GB",
  soakRequests: "1.18M", //      soak_20260705T144612/soak_summary.md
  soakUsers: "500",
  soakErrors: "0%",
} as const;
