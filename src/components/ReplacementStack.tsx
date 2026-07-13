"use client";

/**
 * ReplacementStack — "What You Cancel", now with a live collapse.
 *
 * The real grid of replacement boxes IS the animation: click "Watch it
 * collapse" and they implode toward the centre, replaced by a single Purple8
 * "one process" core. Click again to bring the stack back.
 *
 * Pure React + CSS transforms, no deps (static-export safe).
 */

import { useState } from "react";

const replacements = [
  // Data & storage
  { old: "PostgreSQL", new: "BrickCore storage", icon: "database" },
  { old: "MongoDB", new: "Document store", icon: "doc" },
  { old: "Neo4j", new: "Native graph engine", icon: "graph" },
  { old: "Pinecone", new: "HNSW vector index", icon: "vector" },
  { old: "Weaviate", new: "Hybrid vector search", icon: "vector" },
  { old: "Elasticsearch", new: "Full-text search", icon: "search" },
  { old: "Redis", new: "In-process memory layer", icon: "memory" },
  // Retrieval & AI
  { old: "LangChain", new: "Built-in RAG pipelines", icon: "chain" },
  { old: "LangGraph", new: "Journey Engine (stateful)", icon: "workflow" },
  { old: "LangSmith", new: "Immutable graph audit trail", icon: "audit" },
  { old: "RAGAS", new: "Built-in RAG evaluation", icon: "eval" },
  { old: "Cohere Rerank", new: "Built-in reranker", icon: "eval" },
  { old: "spaCy NER", new: "GLiNER extraction", icon: "ner" },
  // Document intelligence (IDP)
  { old: "Unstructured.io", new: "DocIntel parsing", icon: "doc" },
  { old: "Azure Document Intelligence", new: "DocIntel IDP", icon: "doc" },
  { old: "AWS Textract", new: "Self-hosted OCR", icon: "ocr" },
  { old: "ABBYY", new: "OCR engine", icon: "ocr" },
  // Workflow & data movement
  { old: "Airflow", new: "Workflow orchestration", icon: "workflow" },
  { old: "Temporal", new: "Stateful workflows + SLA", icon: "workflow" },
  { old: "Debezium", new: "Change Data Capture", icon: "cdc" },
  { old: "Kafka Connect", new: "Event egress bus", icon: "cdc" },
  // Security & identity
  { old: "Auth0", new: "JWT authentication", icon: "auth" },
  { old: "Okta", new: "SSO + RBAC", icon: "auth" },
  { old: "HashiCorp Vault", new: "AES-256 envelope KMS", icon: "kms" },
  { old: "Splunk / SIEM", new: "SOC vertical", icon: "soc" },
  // Ops & tooling
  { old: "Datadog", new: "SLA monitoring + metrics", icon: "metrics" },
  { old: "Apollo Federation", new: "Supergraph federation", icon: "federation" },
  { old: "Retool", new: "LCNC admin console", icon: "admin" },
  { old: "S3 + Lambda glue", new: "DocIntel connectors", icon: "connectors" },
];

/** Inline, dependency-free icon set (24×24, stroke-based, themed purple). */
const ICON_PATHS: Record<string, React.ReactNode> = {
  database: (
    <>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
      <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
    </>
  ),
  graph: (
    <>
      <circle cx="6" cy="6" r="2.4" />
      <circle cx="18" cy="7" r="2.4" />
      <circle cx="12" cy="18" r="2.4" />
      <path d="M7.7 7.7 10.5 16M16.4 8.7 13 16.3M8.3 6.3l7.4.6" />
    </>
  ),
  vector: (
    <>
      <path d="M12 3v18M12 12l7-4M12 12l-7-4M12 12l7 4M12 12l-7 4" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="M20 20l-4.5-4.5" />
    </>
  ),
  memory: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="1.5" />
      <path d="M9 3v3M12 3v3M15 3v3M9 18v3M12 18v3M15 18v3M3 9h3M3 12h3M3 15h3M18 9h3M18 12h3M18 15h3" />
    </>
  ),
  chain: (
    <>
      <path d="M9 12a3 3 0 0 1 3-3h3a3 3 0 0 1 0 6h-1.5" />
      <path d="M15 12a3 3 0 0 1-3 3H9a3 3 0 0 1 0-6h1.5" />
    </>
  ),
  workflow: (
    <>
      <rect x="3" y="4" width="6" height="4" rx="1" />
      <rect x="15" y="10" width="6" height="4" rx="1" />
      <rect x="3" y="16" width="6" height="4" rx="1" />
      <path d="M9 6h4a2 2 0 0 1 2 2v2M9 18h4a2 2 0 0 0 2-2v-2" />
    </>
  ),
  audit: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M8.5 13l2 2 4-4" />
    </>
  ),
  eval: (
    <>
      <path d="M4 19V5M4 19h16" />
      <path d="M8 15l3-4 3 2 4-6" />
    </>
  ),
  ner: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M7 10h4M7 14h2M14 10h3M14 14h3" />
    </>
  ),
  doc: (
    <>
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <path d="M14 3v6h6M8 13h8M8 17h5" />
    </>
  ),
  ocr: (
    <>
      <path d="M4 8V6a2 2 0 0 1 2-2h2M20 8V6a2 2 0 0 0-2-2h-2M4 16v2a2 2 0 0 0 2 2h2M20 16v2a2 2 0 0 1-2 2h-2" />
      <path d="M8 12h8" />
    </>
  ),
  cdc: (
    <>
      <path d="M4 8a8 8 0 0 1 13-2.5L20 8M20 16a8 8 0 0 1-13 2.5L4 16" />
      <path d="M20 4v4h-4M4 20v-4h4" />
    </>
  ),
  auth: (
    <>
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      <circle cx="12" cy="15" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),
  kms: (
    <>
      <circle cx="8" cy="12" r="3.5" />
      <path d="M11.5 12H21M18 12v3M15 12v2" />
    </>
  ),
  soc: (
    <>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  metrics: (
    <>
      <path d="M4 20V4M4 20h16" />
      <rect x="7" y="12" width="3" height="5" />
      <rect x="12" y="8" width="3" height="9" />
      <rect x="17" y="14" width="3" height="3" />
    </>
  ),
  federation: (
    <>
      <circle cx="12" cy="12" r="2.4" />
      <circle cx="5" cy="6" r="1.8" />
      <circle cx="19" cy="6" r="1.8" />
      <circle cx="5" cy="18" r="1.8" />
      <circle cx="19" cy="18" r="1.8" />
      <path d="M6.5 7 10 10.5M17.5 7 14 10.5M6.5 17 10 13.5M17.5 17 14 13.5" />
    </>
  ),
  admin: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M7 6.5h.01M10 6.5h.01M7 13h5M7 16h8" />
    </>
  ),
  connectors: (
    <>
      <circle cx="6" cy="6" r="2.2" />
      <circle cx="18" cy="18" r="2.2" />
      <path d="M6 8.2V14a4 4 0 0 0 4 4h5.8" />
    </>
  ),
};

function StackIcon({ name }: { name: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden
    >
      {ICON_PATHS[name] ?? ICON_PATHS.database}
    </svg>
  );
}

export default function ReplacementStack() {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => setCollapsed((c) => !c);

  // One box per service — the tally is simply how many we list.
  const serviceCount = replacements.length;

  return (
    <section className="relative py-24 px-4 md:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            {serviceCount} services become one.
          </h2>
          <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">
            The modern AI stack is a sprawl of databases, vector stores,
            orchestration, auth, and observability — each its own service, its
            own bill, its own failure mode. Two products, Purple8 and DocIntel,
            replace all of it.
          </p>
          <button
            type="button"
            onClick={toggle}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-purple-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-purple-500"
          >
            {collapsed ? "↺ Show the stack" : "Watch it collapse →"}
          </button>
        </div>

        {/* Collapse stage */}
        <div className="relative">
          {/* Real replacement grid — this IS the animation */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-[1100ms] ease-in-out"
            style={{
              opacity: collapsed ? 0 : 1,
              transform: collapsed ? "scale(0.45)" : "scale(1)",
              filter: collapsed ? "blur(3px)" : "blur(0px)",
              pointerEvents: collapsed ? "none" : "auto",
            }}
            aria-hidden={collapsed}
          >
            {replacements.map(({ old, new: newService, icon }, idx) => (
              <div
                key={idx}
                className="group relative bg-zinc-900/50 border border-zinc-800 rounded-lg p-5 hover:border-purple-500/50 transition-all duration-300"
                style={{
                  transitionDelay: collapsed ? `${(idx % 6) * 45}ms` : "0ms",
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-purple-800/50 bg-purple-600/10 text-purple-300 transition-colors group-hover:border-purple-600/70 group-hover:bg-purple-600/20 group-hover:text-purple-200">
                    <StackIcon name={icon} />
                  </span>
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="text-zinc-500 line-through text-sm font-medium truncate">
                      {old}
                    </div>
                    <div className="text-zinc-600 shrink-0">→</div>
                  </div>
                </div>
                <div className="text-purple-300 font-semibold text-base">
                  {newService}
                </div>
                <div className="absolute inset-0 rounded-lg bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            ))}
          </div>

          {/* Purple8 core — fades/scales in as the grid implodes */}
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out"
            style={{
              opacity: collapsed ? 1 : 0,
              transform: `scale(${collapsed ? 1 : 0.4})`,
              transitionDelay: collapsed ? "650ms" : "0ms",
            }}
          >
            <div className="relative flex flex-col items-center">
              <div className="absolute inset-0 -z-10 animate-pulse rounded-full bg-purple-600/30 blur-3xl" />
              <div className="flex h-36 w-36 flex-col items-center justify-center rounded-3xl border border-purple-500/60 bg-gradient-to-b from-purple-600/30 to-[#11111b] sm:h-44 sm:w-44">
                <span className="text-3xl font-extrabold text-white sm:text-4xl">
                  Purple8
                </span>
                <span className="mt-1.5 text-[10px] font-semibold uppercase tracking-widest text-purple-300">
                  one process
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tally */}
        <div className="mt-12 text-center">
          <p className="text-sm text-zinc-500">
            No API gateway. No sidecar. No Kubernetes operators.{" "}
            <span className="text-purple-400 font-medium">
              Just one process, one port, one binary.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
