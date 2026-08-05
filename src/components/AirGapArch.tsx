"use client";

import { useState } from "react";

/* ─── Accordion primitive ─────────────────────────────────────────────── */
function Accordion({
  title,
  badge,
  teaser,
  defaultOpen = false,
  children,
}: {
  title: string;
  badge?: string;
  teaser?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border border-zinc-800 bg-[#0f0f1a] overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left group"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
              open
                ? "border-purple-500 bg-purple-950 text-purple-300"
                : "border-zinc-700 bg-zinc-900 text-zinc-400 group-hover:border-purple-700"
            }`}
          >
            <svg
              viewBox="0 0 12 12"
              className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 4l4 4 4-4" />
            </svg>
          </span>
          <div className="min-w-0">
            <span className="block font-semibold text-white">{title}</span>
            {!open && teaser && (
              <span className="block mt-0.5 text-sm text-zinc-500 truncate">{teaser}</span>
            )}
          </div>
        </div>
        {badge && (
          <span className="shrink-0 rounded-full border border-purple-800/50 bg-purple-950/50 px-2.5 py-0.5 text-xs font-medium text-purple-300">
            {badge}
          </span>
        )}
      </button>
      {open && <div className="px-6 pb-6 border-t border-zinc-800/60">{children}</div>}
    </div>
  );
}

/* ─── LLM model rows ──────────────────────────────────────────────────── */
const llmModels = [
  {
    tier: "Nano",
    colour: "text-zinc-400 border-zinc-700",
    dot: "bg-zinc-500",
    model: "qwen3:4b",
    params: "4B dense",
    ramQ4: "~2.6 GB",
    vram: "4 GB",
    cmd: "ollama pull qwen3:4b",
    link: "https://ollama.com/library/qwen3",
    role: "DocIntel document classification, chunking hints, quick intent routing",
    flags: ["tools", "thinking"],
  },
  {
    tier: "Default",
    colour: "text-blue-300 border-blue-800",
    dot: "bg-blue-500",
    model: "qwen3:8b",
    params: "8B dense",
    ramQ4: "~5.2 GB",
    vram: "8 GB",
    cmd: "ollama pull qwen3:8b",
    link: "https://ollama.com/library/qwen3",
    role: "Entity extraction, relationship mapping, RAG synthesis, general Q&A",
    flags: ["tools", "thinking"],
  },
  {
    tier: "Capable",
    colour: "text-cyan-300 border-cyan-800",
    dot: "bg-cyan-500",
    model: "qwen3:14b",
    params: "14B dense",
    ramQ4: "~9.0 GB",
    vram: "12 GB",
    cmd: "ollama pull qwen3:14b",
    link: "https://ollama.com/library/qwen3",
    role: "Complex structured extraction, multi-hop RAG, code understanding",
    flags: ["tools", "thinking"],
  },
  {
    tier: "Reasoning",
    colour: "text-violet-300 border-violet-700",
    dot: "bg-violet-500",
    model: "deepseek-r1:32b",
    params: "32B dense",
    ramQ4: "~20 GB",
    vram: "24 GB",
    cmd: "ollama pull deepseek-r1:32b",
    link: "https://ollama.com/library/deepseek-r1",
    role: "Legal/financial document analysis, multi-step planning, compliance reasoning",
    flags: ["thinking"],
  },
  {
    tier: "Flagship (efficient)",
    colour: "text-purple-300 border-purple-700",
    dot: "bg-purple-500",
    model: "qwen3:30b",
    params: "30B MoE · 3B active/tok",
    ramQ4: "~19 GB",
    vram: "24 GB",
    cmd: "ollama pull qwen3:30b",
    link: "https://ollama.com/library/qwen3",
    role: "High-quality RAG, agentic workflows — near-70B quality at 32B memory cost",
    flags: ["tools", "thinking"],
    note: "MoE: only 3B parameters activated per token — substantially faster inference than a 30B dense model",
  },
  {
    tier: "Flagship (max)",
    colour: "text-fuchsia-300 border-fuchsia-800",
    dot: "bg-fuchsia-500",
    model: "llama3.3:70b",
    params: "70B dense",
    ramQ4: "~40 GB",
    vram: "48 GB",
    cmd: "ollama pull llama3.3:70b",
    link: "https://ollama.com/library/llama3.3",
    role: "Highest-stakes reasoning, audit-grade legal analysis, agentic SOC decisions",
    flags: ["tools"],
    note: "Performance comparable to Llama 3.1 405B per Meta benchmarks",
  },
  {
    tier: "Vision / OCR",
    colour: "text-emerald-300 border-emerald-800",
    dot: "bg-emerald-500",
    model: "gemma4:12b",
    params: "12B vision+thinking",
    ramQ4: "~8 GB",
    vram: "12 GB",
    cmd: "ollama pull gemma4:12b",
    link: "https://ollama.com/library/gemma4",
    role: "DocIntel image OCR, whiteboard parsing, diagram understanding, scanned PDFs",
    flags: ["vision", "tools", "thinking"],
    note: "Gemma 4: frontier-level vision at 12B; also suitable for audio document intelligence",
  },
  {
    tier: "Embeddings",
    colour: "text-amber-300 border-amber-800",
    dot: "bg-amber-500",
    model: "nomic-embed-text",
    params: "137M",
    ramQ4: "~0.3 GB",
    vram: "CPU only",
    cmd: "ollama pull nomic-embed-text",
    link: "https://ollama.com/library/nomic-embed-text",
    role: "All vector embeddings for Purple8 Graph HNSW index — 8192 token context",
    flags: ["embedding"],
    note: "For multilingual corpora swap to qwen3-embedding:4b (~2.6 GB)",
  },
];

const flagColour: Record<string, string> = {
  tools: "bg-blue-950 text-blue-300 border-blue-800",
  thinking: "bg-violet-950 text-violet-300 border-violet-800",
  vision: "bg-emerald-950 text-emerald-300 border-emerald-800",
  embedding: "bg-amber-950 text-amber-300 border-amber-800",
};

/* ─── Infrastructure tiers ────────────────────────────────────────────── */
const infraTiers = [
  {
    name: "Developer / evaluation",
    icon: "💻",
    colour: "border-zinc-700",
    accent: "text-zinc-300",
    minRam: "16 GB system RAM",
    minCpu: "8+ cores (any architecture)",
    minGpu: "None required — CPU-only or Apple MPS",
    minStorage: "256 GB NVMe",
    llm: "qwen3:8b (CPU / MPS)",
    rss: "~5–9 GB peak",
    corpus: "≤ 500K documents",
    nodes: "1 process",
    notes: "Full Purple8 + DocIntel + Ollama on a developer laptop. No GPU required. Validated on Apple Silicon 24 GB with 8.84M MS MARCO nodes — see BENCHMARK.md.",
    tip: "If you have ≥ 24 GB RAM you can run qwen3:14b comfortably on CPU and get significantly better extraction quality.",
  },
  {
    name: "Single-server production",
    icon: "🖥️",
    colour: "border-purple-800",
    accent: "text-purple-300",
    minRam: "64 GB system RAM",
    minCpu: "16+ cores (x86 or ARM server)",
    minGpu: "≥ 24 GB VRAM — any current-gen GPU meeting this threshold",
    minStorage: "2 TB NVMe (RAID-1 recommended)",
    llm: "qwen3:30b (MoE) or deepseek-r1:32b on GPU",
    rss: "~12–18 GB",
    corpus: "≤ 5M documents",
    nodes: "1 node + optional read replica",
    notes: "Purple8, DocIntel, and Ollama on a single server. GPU is dedicated to Ollama inference; Purple8 + DocIntel run CPU-only alongside it on the remaining RAM.",
    tip: "For GPU selection: any card meeting the ≥ 24 GB VRAM threshold will work. Check the model card on ollama.com/library for the specific LLM you choose.",
  },
  {
    name: "HA cluster",
    icon: "🏭",
    colour: "border-blue-800",
    accent: "text-blue-300",
    minRam: "≥ 128 GB per app node",
    minCpu: "32+ cores per app node",
    minGpu: "Dedicated inference node with ≥ 80 GB VRAM (for 70B-class models)",
    minStorage: "≥ 4 TB NVMe per app node (WAL replicated across all 3)",
    llm: "llama3.3:70b or equivalent 70B-class model on dedicated GPU node",
    rss: "~20 GB/node",
    corpus: "20M+ documents",
    nodes: "3 Purple8 app nodes · 1 Ollama inference node · 1 DocIntel node",
    notes: "WAL replication across 3 Purple8 nodes. Ollama inference runs on an isolated GPU node reachable over internal LAN — still fully air-gapped, no public egress.",
    tip: "80 GB VRAM is the minimum for llama3.3:70b at Q4. If your GPU node has less VRAM, drop to qwen3:30b (MoE, ~19 GB) which fits in 24 GB and performs comparably on most tasks.",
  },
];

/* ─── What you eliminate ──────────────────────────────────────────────── */
const eliminated = [
  { item: "OpenAI / Anthropic / Google API keys", why: "Ollama serves all LLM inference locally" },
  { item: "Azure Document Intelligence", why: "DocIntel handles 70 formats in-process" },
  { item: "AWS Bedrock / SageMaker", why: "All model inference runs on your hardware" },
  { item: "Pinecone / Weaviate / Qdrant cloud", why: "Purple8 Graph has HNSW vector search built in" },
  { item: "LangSmith / Arize / W&B", why: "Every RAG call, agent action, and AI decision is a queryable graph edge — forever" },
  { item: "Auth0 / Keycloak / Okta", why: "JWT + API-key + 4-tier RBAC built into Purple8" },
  { item: "HashiCorp Vault cloud / AWS KMS", why: "AES-256-GCM envelope encryption + key management built in" },
  { item: "Splunk / Microsoft Sentinel / Datadog Security", why: "Purple8 SOC vertical: threat detection and containment in-process" },
  { item: "Airflow / Temporal / LangGraph", why: "Journey Engine is embedded: multi-stage workflows, SLA, HITL gates" },
  { item: "Elasticsearch / OpenSearch", why: "Native full-text + semantic search from one query interface" },
  { item: "Unstructured.io / Textract", why: "DocIntel: 70 formats, GLiNER NER, entity graph emission" },
  { item: "Telemetry phone-home / licence checks", why: "Zero egress. No licence network calls. Runs indefinitely offline" },
];

/* ─── Compliance standards ────────────────────────────────────────────── */
const compliance = [
  "IL2 / IL4 / IL5 (DoD Impact Levels)",
  "FedRAMP High",
  "HIPAA / HITECH",
  "ITAR / EAR controlled environments",
  "Air-gapped SCIFs",
  "MAS TRM (Singapore financial)",
  "DPDP (India personal data protection)",
  "UK Cyber Essentials Plus",
  "ISO 27001 deployments",
  "NIS2 (EU critical infrastructure)",
];

/* ─── Main component ──────────────────────────────────────────────────── */
export default function AirGapArch() {
  return (
    <section className="border-t border-purple-900/20 bg-[#0a0a0f]">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">

        {/* Section header */}
        <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
          Reference Architecture
        </p>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
          Fully air-gapped deployment
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">
          A complete, highly capable AI backend that never touches the public internet.
          Document ingestion, entity extraction, RAG, graph reasoning, workflow orchestration,
          and threat detection — all running on hardware you control, with no egress required.
        </p>

        {/* Stack badge */}
        <div className="mt-5 flex flex-wrap gap-2">
          {["Purple8 Hyper Graph", "Purple8 DocIntel", "Ollama"].map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-1.5 rounded-full border border-purple-800/50 bg-purple-950/40 px-3 py-1 text-xs font-medium text-purple-300"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
              {s}
            </span>
          ))}
          <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-900/40 px-3 py-1 text-xs font-medium text-zinc-400">
            ✗ Zero cloud egress
          </span>
        </div>

        {/* Accordion sections */}
        <div className="mt-10 space-y-3">

          {/* ── 1. Topology diagram ── */}
          <Accordion
            title="System topology"
            badge="Architecture diagram"
            teaser="Request flow end-to-end — nothing leaves the air-gap boundary"
            defaultOpen={true}
          >
            <div className="mt-5 overflow-x-auto">
              {/* SVG topology */}
              <svg
                viewBox="0 0 820 420"
                className="w-full max-w-4xl mx-auto"
                style={{ minWidth: 560 }}
                aria-label="Air-gap system topology diagram"
              >
                {/* Outer air-gap boundary */}
                <rect x="10" y="10" width="800" height="400" rx="14" ry="14"
                  fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="6 3" />
                <text x="24" y="30" fill="#a78bfa" fontSize="11" fontFamily="monospace" fontWeight="600">
                  Air-Gap Boundary — Zero Egress
                </text>
                <text x="24" y="43" fill="#6d28d9" fontSize="9" fontFamily="monospace">
                  No outbound connections · No cloud APIs · No telemetry
                </text>

                {/* ── Clients row ── */}
                {/* React UI */}
                <rect x="40" y="65" width="130" height="46" rx="8" fill="#1a1a2e" stroke="#52525b" strokeWidth="1" />
                <text x="105" y="84" fill="#d4d4d8" fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="600">React / Web UI</text>
                <text x="105" y="98" fill="#71717a" fontSize="9" fontFamily="monospace" textAnchor="middle">:3000</text>

                {/* REST API */}
                <rect x="200" y="65" width="130" height="46" rx="8" fill="#1a1a2e" stroke="#52525b" strokeWidth="1" />
                <text x="265" y="84" fill="#d4d4d8" fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="600">REST API clients</text>
                <text x="265" y="98" fill="#71717a" fontSize="9" fontFamily="monospace" textAnchor="middle">HTTP · Bearer</text>

                {/* AI Agents */}
                <rect x="360" y="65" width="140" height="46" rx="8" fill="#1a1a2e" stroke="#7c3aed" strokeWidth="1" />
                <text x="430" y="84" fill="#c4b5fd" fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="600">AI Agents (MCP)</text>
                <text x="430" y="98" fill="#7c3aed" fontSize="9" fontFamily="monospace" textAnchor="middle">74 tools · namespaced</text>

                {/* Arrows down from clients */}
                <line x1="105" y1="111" x2="105" y2="148" stroke="#52525b" strokeWidth="1.2" markerEnd="url(#arr)" />
                <line x1="265" y1="111" x2="265" y2="148" stroke="#52525b" strokeWidth="1.2" markerEnd="url(#arr)" />
                <line x1="430" y1="111" x2="430" y2="148" stroke="#7c3aed" strokeWidth="1.2" markerEnd="url(#arr)" />

                {/* ── Purple8 Hyper Graph ── */}
                <rect x="40" y="150" width="380" height="80" rx="10" fill="#1a0a2e" stroke="#7c3aed" strokeWidth="1.5" />
                <text x="230" y="172" fill="#c4b5fd" fontSize="12" fontFamily="sans-serif" textAnchor="middle" fontWeight="700">Purple8 Hyper Graph</text>
                <text x="230" y="188" fill="#71717a" fontSize="9" fontFamily="monospace" textAnchor="middle">:8100</text>
                <text x="110" y="206" fill="#a78bfa" fontSize="9" fontFamily="sans-serif" textAnchor="middle">graph · vector · RAG</text>
                <text x="240" y="206" fill="#a78bfa" fontSize="9" fontFamily="sans-serif" textAnchor="middle">journey · SOC · RBAC</text>
                <text x="370" y="206" fill="#a78bfa" fontSize="9" fontFamily="sans-serif" textAnchor="middle">encryption · MCP</text>

                {/* DocIntel → Graph arrow */}
                <line x1="560" y1="195" x2="425" y2="195" stroke="#4ade80" strokeWidth="1.2" markerEnd="url(#arrG)" />
                <text x="490" y="190" fill="#4ade80" fontSize="9" fontFamily="sans-serif" textAnchor="middle">emit payload</text>

                {/* ── Purple8 DocIntel ── */}
                <rect x="440" y="150" width="340" height="80" rx="10" fill="#0a1a0a" stroke="#22c55e" strokeWidth="1.5" />
                <text x="610" y="172" fill="#86efac" fontSize="12" fontFamily="sans-serif" textAnchor="middle" fontWeight="700">Purple8 DocIntel</text>
                <text x="610" y="188" fill="#71717a" fontSize="9" fontFamily="monospace" textAnchor="middle">:8200</text>
                <text x="530" y="206" fill="#4ade80" fontSize="9" fontFamily="sans-serif" textAnchor="middle">parse · chunk · extract</text>
                <text x="680" y="206" fill="#4ade80" fontSize="9" fontFamily="sans-serif" textAnchor="middle">70 formats · GLiNER NER</text>

                {/* Arrows from P8G and DocIntel down to Ollama */}
                <line x1="230" y1="230" x2="420" y2="285" stroke="#52525b" strokeWidth="1.2" markerEnd="url(#arr)" />
                <line x1="610" y1="230" x2="440" y2="285" stroke="#52525b" strokeWidth="1.2" markerEnd="url(#arr)" />

                {/* ── Ollama ── */}
                <rect x="280" y="287" width="260" height="72" rx="10" fill="#0f0a1a" stroke="#f97316" strokeWidth="1.5" />
                <text x="410" y="308" fill="#fdba74" fontSize="12" fontFamily="sans-serif" textAnchor="middle" fontWeight="700">Ollama</text>
                <text x="410" y="323" fill="#71717a" fontSize="9" fontFamily="monospace" textAnchor="middle">:11434 · local inference only</text>
                <text x="330" y="341" fill="#fdba74" fontSize="9" fontFamily="sans-serif" textAnchor="middle">qwen3 · deepseek-r1</text>
                <text x="490" y="341" fill="#fdba74" fontSize="9" fontFamily="sans-serif" textAnchor="middle">gemma4 · nomic-embed</text>

                {/* Storage row */}
                <line x1="230" y1="230" x2="150" y2="285" stroke="#3b82f6" strokeWidth="1.2" markerEnd="url(#arrB)" />

                {/* BrickCoreStorage */}
                <rect x="40" y="287" width="220" height="72" rx="10" fill="#0a0f1a" stroke="#3b82f6" strokeWidth="1.5" />
                <text x="150" y="308" fill="#93c5fd" fontSize="12" fontFamily="sans-serif" textAnchor="middle" fontWeight="700">BrickCoreStorage</text>
                <text x="150" y="323" fill="#71717a" fontSize="9" fontFamily="monospace" textAnchor="middle">WAL · HNSW index · NVMe</text>
                <text x="98" y="341" fill="#60a5fa" fontSize="9" fontFamily="sans-serif" textAnchor="middle">seal-and-evict</text>
                <text x="210" y="341" fill="#60a5fa" fontSize="9" fontFamily="sans-serif" textAnchor="middle">bounded RSS</text>

                {/* HNSW / full-text */}
                <rect x="560" y="287" width="220" height="72" rx="10" fill="#0a0f1a" stroke="#3b82f6" strokeWidth="1.2" />
                <text x="670" y="308" fill="#93c5fd" fontSize="12" fontFamily="sans-serif" textAnchor="middle" fontWeight="700">HNSW + Full-text</text>
                <text x="670" y="323" fill="#71717a" fontSize="9" fontFamily="monospace" textAnchor="middle">in-process · no sidecar</text>
                <text x="620" y="341" fill="#60a5fa" fontSize="9" fontFamily="sans-serif" textAnchor="middle">vector search</text>
                <text x="720" y="341" fill="#60a5fa" fontSize="9" fontFamily="sans-serif" textAnchor="middle">BM25 + semantic</text>
                <line x1="550" y1="323" x2="465" y2="323" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3 2" />

                {/* Bottom no-egress banner */}
                <rect x="40" y="376" width="740" height="22" rx="6" fill="#1a0a0a" />
                <text x="410" y="391" fill="#ef4444" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="600">
                  ✗ No egress  ·  ✗ No cloud API keys  ·  ✗ No telemetry  ·  ✗ No licence network checks  ·  ✗ No CDN dependencies
                </text>

                {/* Arrow markers */}
                <defs>
                  <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                    <path d="M0,0 L0,6 L8,3 z" fill="#52525b" />
                  </marker>
                  <marker id="arrG" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                    <path d="M0,0 L0,6 L8,3 z" fill="#4ade80" />
                  </marker>
                  <marker id="arrB" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                    <path d="M0,0 L0,6 L8,3 z" fill="#3b82f6" />
                  </marker>
                </defs>
              </svg>
            </div>

            {/* Legend */}
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-zinc-500">
              {[
                { col: "border-purple-600", label: "Purple8 Hyper Graph — primary engine" },
                { col: "border-green-700", label: "Purple8 DocIntel — document pipeline" },
                { col: "border-orange-600", label: "Ollama — local LLM inference" },
                { col: "border-blue-700", label: "Storage + search layer" },
              ].map((l) => (
                <span key={l.label} className="flex items-center gap-1.5">
                  <span className={`h-3 w-3 rounded border ${l.col}`} />
                  {l.label}
                </span>
              ))}
            </div>
          </Accordion>

          {/* ── 2. LLM model table ── */}
          <Accordion
            title="LLM model selection"
            badge="8 models"
            teaser="Current Ollama models — qwen3, deepseek-r1, gemma4, nomic-embed-text"
            defaultOpen={true}
          >
            <p className="mt-4 text-sm text-zinc-500">
              All models pulled once and cached locally. No internet connection required after initial setup.
              RAM figures are for Q4_K_M quantisation (default Ollama quantisation). VRAM figures assume dedicated GPU inference via Ollama.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[780px] text-sm border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800">
                    {["Tier", "Model", "Params", "CPU RAM (Q4_K_M)", "GPU VRAM", "Ollama pull command", "Role in stack"].map((h) => (
                      <th key={h} className="pb-2 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 first:pt-3">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {llmModels.map((m) => (
                    <tr key={m.model} className="border-b border-zinc-800/50 hover:bg-zinc-900/30 transition-colors">
                      <td className={`py-3 pr-4 font-semibold text-xs ${m.colour.split(" ")[0]}`}>
                        <span className="flex items-center gap-1.5">
                          <span className={`h-2 w-2 rounded-full ${m.dot}`} />
                          {m.tier}
                        </span>
                      </td>
                      <td className="py-3 pr-4">
                        <a
                          href={m.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-purple-300 hover:text-purple-100 transition-colors text-xs"
                        >
                          {m.model}
                        </a>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {m.flags.map((f) => (
                            <span key={f} className={`rounded px-1.5 py-0.5 text-[10px] border ${flagColour[f] ?? "bg-zinc-900 text-zinc-400 border-zinc-700"}`}>
                              {f}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 pr-4 text-zinc-300 text-xs font-mono">{m.params}</td>
                      <td className="py-3 pr-4 text-zinc-300 text-xs font-mono">{m.ramQ4}</td>
                      <td className="py-3 pr-4 text-zinc-300 text-xs font-mono">{m.vram}</td>
                      <td className="py-3 pr-4">
                        <code className="rounded bg-zinc-900 border border-zinc-700 px-2 py-0.5 text-[11px] text-purple-300 font-mono select-all">
                          {m.cmd}
                        </code>
                      </td>
                      <td className="py-3 pr-4 text-zinc-400 text-xs">
                        {m.role}
                        {m.note && (
                          <p className="mt-1 text-zinc-600 italic">{m.note}</p>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-zinc-600">
              Source:{" "}
              <a href="https://ollama.com/library" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-400 underline">
                ollama.com/library
              </a>{" "}
              · August 2026. qwen3 series by Alibaba Cloud; deepseek-r1 by DeepSeek; gemma4 by Google; llama3.3 by Meta.
            </p>
          </Accordion>

          {/* ── 3. Infrastructure tiers ── */}
          <Accordion
            title="Infrastructure tiers"
            badge="3 deployment sizes"
            teaser="Laptop → single-server production → 3-node HA cluster"
          >
            <div className="mt-5 grid gap-5 lg:grid-cols-3">
              {infraTiers.map((t) => (
                <div key={t.name} className={`rounded-xl border ${t.colour} bg-[#0d0d16] p-5`}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{t.icon}</span>
                    <span className={`font-bold text-base ${t.accent}`}>{t.name}</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    {[
                      { label: "Min. system RAM", val: t.minRam },
                      { label: "Min. CPU", val: t.minCpu },
                      { label: "Min. GPU / VRAM", val: t.minGpu },
                      { label: "Min. storage", val: t.minStorage },
                      { label: "Recommended LLM", val: t.llm },
                      { label: "Purple8 peak RSS", val: t.rss },
                      { label: "Corpus capacity", val: t.corpus },
                      { label: "Node topology", val: t.nodes },
                    ].map((r) => (
                      <div key={r.label} className="flex gap-2">
                        <span className="shrink-0 w-36 text-zinc-600">{r.label}</span>
                        <span className="text-zinc-300 font-mono">{r.val}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-xs text-zinc-500 italic border-t border-zinc-800 pt-3">{t.notes}</p>
                  <p className="mt-2 text-xs text-amber-500/80">💡 {t.tip}</p>
                </div>
              ))}
            </div>
          </Accordion>

          {/* ── 4. Env config ── */}
          <Accordion
            title="Wiring it together — environment configuration"
            badge="6 env vars"
            teaser="The minimal config to connect Purple8 Graph ↔ DocIntel ↔ Ollama"
          >
            <p className="mt-4 text-sm text-zinc-500 mb-4">
              Six environment variables wire the entire stack. Set these before starting each service.
              All values are local — no external hostnames, no cloud endpoints.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs font-semibold text-purple-400 mb-2 uppercase tracking-wider">Purple8 Hyper Graph — <code className="normal-case font-mono">.env</code></p>
                <pre className="rounded-xl border border-zinc-800 bg-zinc-900/60 px-5 py-4 text-xs text-purple-300 font-mono overflow-x-auto leading-relaxed">
{`# Point LLM calls at local Ollama
LLM_PROVIDER=ollama
LLM_BASE_URL=http://localhost:11434
LLM_MODEL=qwen3:8b

# Embeddings (CPU-only, no GPU needed)
EMBEDDING_MODEL=nomic-embed-text
EMBEDDING_BASE_URL=http://localhost:11434

# Encryption (AES-256-GCM, key stays in RAM)
KMS_PROVIDER=local
ENCRYPTION_AT_REST=true

# Auth
JWT_SECRET=<your-secret>`}
                </pre>
              </div>
              <div>
                <p className="text-xs font-semibold text-green-400 mb-2 uppercase tracking-wider">Purple8 DocIntel — <code className="normal-case font-mono">.env</code></p>
                <pre className="rounded-xl border border-zinc-800 bg-zinc-900/60 px-5 py-4 text-xs text-green-300 font-mono overflow-x-auto leading-relaxed">
{`# Same local Ollama for extraction + vision
LLM__PROVIDER=ollama
LLM__BASE_URL=http://localhost:11434
LLM__MODEL=qwen3:8b

# Flagship model for complex documents
# LLM__MODEL=deepseek-r1:32b

# Vision/OCR model
SKETCH__ENGINE=local
SKETCH__MODEL=gemma4:12b

# Push extracted entities to local Graph
GRAPH__BASE_URL=http://localhost:8100
GRAPH__API_KEY=<your-p8g-api-key>
GRAPH__AUTO_COMMIT=true

# No internet — set explicitly
SERVER__API_KEY=<your-docintel-key>
LICENSE__ENFORCE=false`}
                </pre>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs font-semibold text-orange-400 mb-2 uppercase tracking-wider">Ollama startup</p>
              <pre className="rounded-xl border border-zinc-800 bg-zinc-900/60 px-5 py-4 text-xs text-orange-300 font-mono overflow-x-auto leading-relaxed">
{`# Install Ollama (one-time, offline installer available at ollama.com/download)
# Then pull models (requires internet once; cached locally after):
ollama pull qwen3:8b
ollama pull qwen3:14b
ollama pull deepseek-r1:32b
ollama pull gemma4:12b
ollama pull nomic-embed-text

# Start Ollama server (stays running, no egress after model pull)
OLLAMA_HOST=0.0.0.0:11434 ollama serve`}
              </pre>
            </div>
          </Accordion>

          {/* ── 5. Docker Compose ── */}
          <Accordion
            title="Docker Compose — full air-gapped stack"
            badge="Single file"
            teaser="One docker compose up and the entire stack is running"
          >
            <p className="mt-4 text-sm text-zinc-500 mb-4">
              For production deployments, all three services run as containers on the same host network.
              No internet access is required after images are pulled and models are cached.
            </p>
            <pre className="rounded-xl border border-zinc-800 bg-zinc-900/60 px-5 py-4 text-xs text-zinc-300 font-mono overflow-x-auto leading-relaxed">
{`version: "3.9"

# ─── All containers stay on host-internal network ───────────────────────
networks:
  p8-airgap:
    driver: bridge
    internal: true   # ← no outbound NAT; change to false only for initial model pull

services:

  # ── Ollama — local LLM inference ──────────────────────────────────────
  ollama:
    image: ollama/ollama:latest
    container_name: p8-ollama
    networks: [p8-airgap]
    ports:
      - "11434:11434"
    volumes:
      - ollama_models:/root/.ollama   # ← models persist across restarts
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]   # remove if CPU-only deployment
    environment:
      - OLLAMA_HOST=0.0.0.0:11434
    restart: unless-stopped

  # ── Purple8 Hyper Graph ───────────────────────────────────────────────
  purple8-graph:
    image: purple8/purple8-graph:latest
    container_name: p8-graph
    networks: [p8-airgap]
    ports:
      - "8100:8100"
    volumes:
      - p8g_data:/data/p8g
    environment:
      - LLM_PROVIDER=ollama
      - LLM_BASE_URL=http://ollama:11434
      - LLM_MODEL=qwen3:8b
      - EMBEDDING_MODEL=nomic-embed-text
      - EMBEDDING_BASE_URL=http://ollama:11434
      - KMS_PROVIDER=local
      - ENCRYPTION_AT_REST=true
      - JWT_SECRET=\${JWT_SECRET}
      - P8G_API_KEY=\${P8G_API_KEY}
    depends_on: [ollama]
    restart: unless-stopped

  # ── Purple8 DocIntel ──────────────────────────────────────────────────
  purple8-docintel:
    image: purple8/purple8-docintel:latest
    container_name: p8-docintel
    networks: [p8-airgap]
    ports:
      - "8200:8200"
    volumes:
      - docintel_jobs:/tmp/docintel
    environment:
      - LLM__PROVIDER=ollama
      - LLM__BASE_URL=http://ollama:11434
      - LLM__MODEL=qwen3:8b
      - SKETCH__ENGINE=local
      - SKETCH__MODEL=gemma4:12b
      - GRAPH__BASE_URL=http://purple8-graph:8100
      - GRAPH__API_KEY=\${P8G_API_KEY}
      - GRAPH__AUTO_COMMIT=true
      - SERVER__API_KEY=\${DOCINTEL_API_KEY}
      - STORAGE__JOB_STORE=sqlite
    depends_on: [ollama, purple8-graph]
    restart: unless-stopped

volumes:
  ollama_models:
  p8g_data:
  docintel_jobs:`}
            </pre>
            <p className="mt-3 text-xs text-zinc-600">
              Set <code className="font-mono text-zinc-400">internal: false</code> temporarily during initial model pull, then switch back to <code className="font-mono text-zinc-400">true</code> to cut egress permanently.
              For the HA cluster, replace the <code className="font-mono text-zinc-400">bridge</code> network with a dedicated VLAN and run three Purple8 Graph replicas with WAL replication.
            </p>
          </Accordion>

          {/* ── 6. Deployment patterns — Fly.io & DigitalOcean ── */}
          <Accordion
            title="Deployment patterns — Fly.io &amp; DigitalOcean"
            badge="Smaller deployments"
            teaser="Single-machine and managed-VM patterns for teams without infra teams"
          >
            <p className="mt-4 text-sm text-zinc-500 mb-5">
              Because Purple8 is a single binary with no sidecar services, it maps cleanly onto
              Fly.io machines and DigitalOcean Droplets. These patterns cover the
              Developer and Single-server tiers — one process, one volume, full stack.
            </p>

            {/* Two-column layout */}
            <div className="grid gap-6 lg:grid-cols-2">

              {/* ── Fly.io ── */}
              <div className="rounded-xl border border-violet-800/50 bg-[#0d0a1a] p-5">
                <div className="flex items-center gap-2 mb-3">
                  {/* Fly.io logo */}
                  <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="#7B3FF2">
                    <path d="M2.283 6.482C2.1 6.85 2 7.262 2 7.7v8.6c0 .97.522 1.814 1.3 2.276l7 4.04c.389.225.833.344 1.284.344H14.4c.452 0 .896-.12 1.285-.343l7-4.04A2.604 2.604 0 0 0 24 16.3V7.7a2.6 2.6 0 0 0-2.6-2.6H2.6c-.12 0-.237.01-.351.027zM12 4.4l4.143 2.392-4.143 2.39L7.858 6.79zm0 5.974 3.9-2.25v4.503L12 14.876l-3.9-2.25V8.124zm-5.2 3 3.9 2.251v4.501L6.8 17.876v-4.503zM18.4 12.4l-3.9 2.25v4.501l3.9-2.25V12.4z"/>
                  </svg>
                  <span className="font-bold text-violet-300">Fly.io</span>
                  <span className="ml-auto rounded-full border border-violet-800/50 bg-violet-950/50 px-2 py-0.5 text-[10px] font-medium text-violet-400">Developer · Single-server</span>
                </div>

                <div className="space-y-2 text-xs mb-4">
                  {[
                    { k: "Machine type", v: "performance-2x (4 vCPU, 8 GB RAM) or performance-4x (8 vCPU, 16 GB RAM)" },
                    { k: "GPU (optional)", v: "a100-40gb or l40s via fly.toml gpu_kind" },
                    { k: "Volume", v: "Fly persistent volume — 50–500 GB for data + WAL" },
                    { k: "Ollama", v: "Second Fly Machine on same private network (fly.internal)" },
                    { k: "Network", v: "Private 6PN mesh — Purple8 ↔ Ollama never leave Fly infra" },
                    { k: "Deploy cmd", v: "fly deploy" },
                  ].map((r) => (
                    <div key={r.k} className="flex gap-2">
                      <span className="shrink-0 w-28 text-zinc-600">{r.k}</span>
                      <span className="text-zinc-300 font-mono">{r.v}</span>
                    </div>
                  ))}
                </div>

                <p className="text-[10px] font-semibold text-violet-400 mb-1.5 uppercase tracking-wider">fly.toml — Purple8 Graph</p>
                <pre className="rounded-lg border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-[11px] text-violet-200 font-mono overflow-x-auto leading-relaxed">
{`app = "purple8-graph"
primary_region = "lhr"   # or iad, sin, syd

[build]
  image = "purple8/purple8-graph:latest"

[env]
  LLM_PROVIDER       = "ollama"
  LLM_BASE_URL       = "http://p8-ollama.internal:11434"
  LLM_MODEL          = "qwen3:8b"
  EMBEDDING_MODEL    = "nomic-embed-text"
  KMS_PROVIDER       = "local"
  ENCRYPTION_AT_REST = "true"

[http_service]
  internal_port = 8100
  force_https   = true

[[vm]]
  size   = "performance-2x"   # 4 vCPU · 8 GB RAM
  # size = "performance-4x"  # upgrade for deepseek-r1:32b

[[mounts]]
  source      = "p8g_data"
  destination = "/data/p8g"`}
                </pre>

                <p className="text-[10px] font-semibold text-violet-400 mb-1.5 mt-4 uppercase tracking-wider">fly.toml — Ollama (GPU machine)</p>
                <pre className="rounded-lg border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-[11px] text-violet-200 font-mono overflow-x-auto leading-relaxed">
{`app = "p8-ollama"
primary_region = "lhr"

[build]
  image = "ollama/ollama:latest"

[env]
  OLLAMA_HOST = "0.0.0.0:11434"

# No public http_service — only reachable via 6PN mesh
[[services]]
  internal_port = 11434
  protocol      = "tcp"

[[vm]]
  size     = "performance-2x"
  # GPU tier (add when running 32B+ models):
  # gpu_kind = "a100-40gb"
  # gpus     = 1

[[mounts]]
  source      = "ollama_models"
  destination = "/root/.ollama"`}
                </pre>

                <p className="mt-3 text-xs text-zinc-600">
                  Pull models once with <code className="font-mono text-zinc-400">fly ssh console -a p8-ollama -C &quot;ollama pull qwen3:8b&quot;</code>.
                  The Fly 6PN private network keeps all traffic internal — no egress charges between machines.
                </p>
              </div>

              {/* ── DigitalOcean ── */}
              <div className="rounded-xl border border-blue-800/50 bg-[#0a0f1a] p-5">
                <div className="flex items-center gap-2 mb-3">
                  {/* DigitalOcean logo */}
                  <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="#0080FF">
                    <path d="M12.04 0C5.408-.02.005 5.38 0 12.01c-.005 6.626 5.375 12.01 12 12.01 6.51 0 12-5.375 12-12C24 5.38 18.63.02 12.04 0zm-.04 19.861v-3.872h-3.86v-3.87h3.86V8.248l3.87 3.87-3.87 3.872v3.872h-3.87z"/>
                  </svg>
                  <span className="font-bold text-blue-300">DigitalOcean</span>
                  <span className="ml-auto rounded-full border border-blue-800/50 bg-blue-950/50 px-2 py-0.5 text-[10px] font-medium text-blue-400">Developer · Single-server</span>
                </div>

                <div className="space-y-2 text-xs mb-4">
                  {[
                    { k: "Droplet size", v: "m-4vcpu-32gb ($192/mo) or m-8vcpu-64gb ($384/mo)" },
                    { k: "GPU Droplet", v: "H100x1 via GPU Droplets (lga1 region) for 32B+ models" },
                    { k: "Storage", v: "DO Block Storage volume — 100–500 GB, attached to Droplet" },
                    { k: "Network", v: "VPC private network — all services on 10.x.x.x, no public exposure" },
                    { k: "Deploy", v: "docker compose up -d via cloud-init or doctl compute ssh" },
                    { k: "Backups", v: "DO automated Droplet snapshots + Block Storage backups" },
                  ].map((r) => (
                    <div key={r.k} className="flex gap-2">
                      <span className="shrink-0 w-28 text-zinc-600">{r.k}</span>
                      <span className="text-zinc-300 font-mono">{r.v}</span>
                    </div>
                  ))}
                </div>

                <p className="text-[10px] font-semibold text-blue-400 mb-1.5 uppercase tracking-wider">cloud-init user-data (one-command bootstrap)</p>
                <pre className="rounded-lg border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-[11px] text-blue-200 font-mono overflow-x-auto leading-relaxed">
{`#!/bin/bash
# Paste as DO Droplet user-data — bootstraps full stack on first boot

# 1. Install Docker + compose
curl -fsSL https://get.docker.com | sh
apt-get install -y docker-compose-plugin

# 2. Pull Purple8 + DocIntel images
docker pull purple8/purple8-graph:latest
docker pull purple8/purple8-docintel:latest
docker pull ollama/ollama:latest

# 3. Pre-pull Ollama models (runs in background)
docker run --rm -v ollama_models:/root/.ollama \\
  ollama/ollama pull qwen3:8b &
docker run --rm -v ollama_models:/root/.ollama \\
  ollama/ollama pull nomic-embed-text &

# 4. Mount Block Storage volume (attach first via DO console)
mkdir -p /mnt/p8data
mount -o discard,defaults /dev/sda /mnt/p8data

# 5. Write .env and start the stack
cat > /opt/purple8/.env <<'EOF'
JWT_SECRET=\${JWT_SECRET}
P8G_API_KEY=\${P8G_API_KEY}
DOCINTEL_API_KEY=\${DOCINTEL_API_KEY}
EOF

cd /opt/purple8 && docker compose up -d`}
                </pre>

                <p className="text-[10px] font-semibold text-blue-400 mb-1.5 mt-4 uppercase tracking-wider">docker-compose.yml — single Droplet</p>
                <pre className="rounded-lg border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-[11px] text-blue-200 font-mono overflow-x-auto leading-relaxed">
{`# All services on DO private VPC — nothing exposed publicly
# except Purple8 Graph :8100 behind DO Load Balancer (optional)
networks:
  p8net:
    driver: bridge

services:
  ollama:
    image: ollama/ollama:latest
    networks: [p8net]
    volumes:
      - ollama_models:/root/.ollama
    # Uncomment for GPU Droplet:
    # deploy:
    #   resources:
    #     reservations:
    #       devices:
    #         - capabilities: [gpu]
    environment:
      - OLLAMA_HOST=0.0.0.0:11434
    restart: unless-stopped

  purple8-graph:
    image: purple8/purple8-graph:latest
    networks: [p8net]
    ports: ["8100:8100"]
    volumes:
      - /mnt/p8data/graph:/data/p8g  # DO Block Storage
    env_file: .env
    environment:
      - LLM_PROVIDER=ollama
      - LLM_BASE_URL=http://ollama:11434
      - LLM_MODEL=qwen3:8b
      - EMBEDDING_MODEL=nomic-embed-text
      - KMS_PROVIDER=local
    depends_on: [ollama]
    restart: unless-stopped

  purple8-docintel:
    image: purple8/purple8-docintel:latest
    networks: [p8net]
    ports: ["8200:8200"]
    volumes:
      - /mnt/p8data/docintel:/tmp/docintel
    env_file: .env
    environment:
      - LLM__PROVIDER=ollama
      - LLM__BASE_URL=http://ollama:11434
      - LLM__MODEL=qwen3:8b
      - GRAPH__BASE_URL=http://purple8-graph:8100
    depends_on: [ollama, purple8-graph]
    restart: unless-stopped

volumes:
  ollama_models:`}
                </pre>

                <p className="mt-3 text-xs text-zinc-600">
                  Point a DO Load Balancer at port 8100 for TLS termination.
                  Enable DO Droplet backups ($4–8/mo) for automated snapshots of the full machine.
                  Block Storage snapshots independently protect the WAL and HNSW index on <code className="font-mono text-zinc-400">/mnt/p8data</code>.
                </p>
              </div>

            </div>

            {/* Comparison callout */}
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                { label: "Fly.io strength", val: "Auto-stop/start machines — pay only when traffic flows. 6PN mesh = free internal bandwidth. Ideal for bursty workloads.", colour: "border-violet-800/40 text-violet-300" },
                { label: "DigitalOcean strength", val: "Predictable flat-rate pricing. Block Storage gives NVMe-backed persistence. Managed Kubernetes available if you grow to HA later.", colour: "border-blue-800/40 text-blue-300" },
                { label: "Both vs. hyperscalers", val: "No egress surprise bills. No 200-service IAM maze. Simple SSH access. Purple8 fits in one VM — that's the whole point.", colour: "border-zinc-700 text-zinc-400" },
              ].map((c) => (
                <div key={c.label} className={`rounded-lg border ${c.colour.split(" ")[0]} bg-zinc-900/30 p-3`}>
                  <p className={`text-xs font-semibold mb-1 ${c.colour.split(" ")[1]}`}>{c.label}</p>
                  <p className="text-xs text-zinc-500">{c.val}</p>
                </div>
              ))}
            </div>
          </Accordion>

          {/* ── 7. What you eliminate ── */}
          <Accordion
            title="Cloud services eliminated"
            badge={`${eliminated.length} services`}
            teaser="No API keys. No cloud billing. No data leaving your perimeter."
          >
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {eliminated.map((e) => (
                <div key={e.item} className="flex gap-3 rounded-lg border border-zinc-800 bg-zinc-900/30 p-3">
                  <span className="mt-0.5 shrink-0 text-red-500 font-bold text-sm">✗</span>
                  <div>
                    <p className="text-xs font-medium text-zinc-300">{e.item}</p>
                    <p className="text-xs text-zinc-600 mt-0.5">{e.why}</p>
                  </div>
                </div>
              ))}
            </div>
          </Accordion>

          {/* ── 7. Compliance ── */}
          <Accordion
            title="Compliance suitability"
            badge={`${compliance.length} standards`}
            teaser="IL2 · IL4 · IL5 · FedRAMP High · HIPAA · ITAR · SCIF · MAS TRM"
          >
            <p className="mt-4 text-sm text-zinc-500 mb-5">
              Because Purple8 runs fully in-process with zero egress, it is structurally compatible
              with the most demanding air-gap and data-sovereignty requirements. The system never dials
              home. No telemetry. No licence checks over the network. No model weights fetched at runtime.
            </p>
            <div className="flex flex-wrap gap-2">
              {compliance.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-zinc-700 bg-zinc-900/50 px-3 py-1.5 text-xs font-medium text-zinc-300"
                >
                  {c}
                </span>
              ))}
            </div>
            <div className="mt-6 rounded-xl border border-amber-900/50 bg-amber-950/20 p-4">
              <p className="text-xs font-semibold text-amber-400 mb-1">Important note</p>
              <p className="text-xs text-zinc-500">
                Structural air-gap compatibility does not constitute a formal compliance certification.
                Achieving FedRAMP, IL5, or HIPAA certification requires a full audit process, a System Security Plan,
                and controls documentation that goes beyond software architecture. Purple8&apos;s design eliminates
                the most common blockers (egress, cloud data processing, external key management) but does not replace
                the audit process.
              </p>
            </div>
          </Accordion>

        </div>
      </div>
    </section>
  );
}
