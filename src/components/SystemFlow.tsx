"use client";

/**
 * SystemFlow — "How Purple8 Works" animated flow map.
 *
 * A live diagram of the AI-native architecture: two entry points (Applications
 * via REST, and AI agents via MCP) flow into ONE in-process engine, whose
 * subsystems (GraphEngine, BrickCore storage, HNSW vectors, RAG, Journey) emit
 * answers, an immutable audit trail, and metrics.
 *
 * The whole point mirrors Purple8's identity: the traditional stack is 8–12
 * separate services with network hops between them; here every hop is
 * in-process. The animated pulses never leave the central box.
 *
 * Pure SVG + CSS + a tiny React ticker — no external deps, safe for the static
 * export. SMIL <animateMotion> drives the pulses (supported in all evergreen
 * browsers).
 */

import { useEffect, useState } from "react";

// ── Node geometry (SVG viewBox 0 0 1000 560) ────────────────────────────────
interface Node {
  id: string;
  label: string;
  sub: string;
  x: number;
  y: number;
  w: number;
  h: number;
  tone: "entry" | "core" | "out";
  health?: "ok" | "warn";
}

const NW = 190;
const NH = 58;

const NODES: Node[] = [
  // Entry points
  { id: "apps", label: "Applications", sub: "REST · /ingest", x: 40, y: 118, w: NW, h: NH, tone: "entry" },
  { id: "agents", label: "AI Agents", sub: "MCP · 49 tools", x: 40, y: 384, w: NW, h: NH, tone: "entry" },
  // Core subsystems (inside the process box)
  { id: "engine", label: "GraphEngine", sub: "query planner · 6 strategies", x: 410, y: 92, w: 240, h: 50, tone: "core", health: "ok" },
  { id: "storage", label: "BrickCore Storage", sub: "bounded RSS · WAL", x: 410, y: 168, w: 240, h: 50, tone: "core", health: "ok" },
  { id: "vector", label: "HNSW Vectors", sub: "graph-guided ANN", x: 410, y: 244, w: 240, h: 50, tone: "core", health: "ok" },
  { id: "rag", label: "RAG Pipeline", sub: "hybrid · rerank", x: 410, y: 320, w: 240, h: 50, tone: "core", health: "ok" },
  { id: "journey", label: "Journey Engine", sub: "SLA · HITL · audit", x: 410, y: 396, w: 240, h: 50, tone: "core", health: "warn" },
  // Outputs
  { id: "answers", label: "Grounded Answers", sub: "cited · low-latency", x: 810, y: 118, w: NW, h: NH, tone: "out" },
  { id: "audit", label: "Immutable Audit", sub: "every edge, forever", x: 810, y: 251, w: NW, h: NH, tone: "out" },
  { id: "metrics", label: "Observability", sub: "/metrics · Prometheus", x: 810, y: 384, w: NW, h: NH, tone: "out" },
];

const byId = (id: string) => NODES.find((n) => n.id === id)!;

// ── Connectors (from → to). Pulses animate along these. ─────────────────────
interface Edge {
  from: string;
  to: string;
  dur: number; // seconds per pulse
  delay: number;
}

const EDGES: Edge[] = [
  { from: "apps", to: "engine", dur: 2.6, delay: 0 },
  { from: "apps", to: "storage", dur: 3.0, delay: 0.6 },
  { from: "agents", to: "rag", dur: 2.4, delay: 0.3 },
  { from: "agents", to: "journey", dur: 2.8, delay: 0.9 },
  { from: "agents", to: "engine", dur: 3.2, delay: 1.2 },
  { from: "engine", to: "answers", dur: 2.5, delay: 0.2 },
  { from: "vector", to: "answers", dur: 2.7, delay: 1.0 },
  { from: "rag", to: "answers", dur: 2.3, delay: 0.5 },
  { from: "journey", to: "audit", dur: 2.6, delay: 0.4 },
  { from: "storage", to: "metrics", dur: 3.1, delay: 1.1 },
  { from: "journey", to: "metrics", dur: 2.9, delay: 0.7 },
];

/** Cubic-bezier path between the right edge of `from` and left edge of `to`. */
function edgePath(from: Node, to: Node): string {
  const x1 = from.x + from.w;
  const y1 = from.y + from.h / 2;
  const x2 = to.x;
  const y2 = to.y + to.h / 2;
  const mx = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
}

function toneClasses(tone: Node["tone"]) {
  switch (tone) {
    case "entry":
      return { fill: "#11111b", stroke: "#3f3f46", text: "#e4e4e7" };
    case "core":
      return { fill: "rgba(124,58,237,0.12)", stroke: "rgba(168,85,247,0.55)", text: "#f4f4f5" };
    case "out":
      return { fill: "#11111b", stroke: "#3f3f46", text: "#e4e4e7" };
  }
}

// ── Live-ticking metric ─────────────────────────────────────────────────────
function useTicker(base: number, jitter: number, decimals = 0) {
  const [v, setV] = useState(base);
  useEffect(() => {
    const t = setInterval(() => {
      const next = base + (Math.random() - 0.5) * 2 * jitter;
      setV(Number(next.toFixed(decimals)));
    }, 1600);
    return () => clearInterval(t);
  }, [base, jitter, decimals]);
  return v;
}

function Stat({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
        {label}
      </span>
      <span className="mt-0.5 text-lg font-bold tabular-nums text-white">
        {value}
        {unit && <span className="ml-0.5 text-xs font-medium text-zinc-500">{unit}</span>}
      </span>
    </div>
  );
}

export default function SystemFlow() {
  const load = useTicker(1480, 90);
  const latency = useTicker(7, 2, 1);
  const hops = 0; // in-process — always zero network hops

  return (
    <section id="how-it-works" className="bg-[#0a0a0f] py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
            How Purple8 works
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            One process. Zero network hops.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-400">
            Applications and AI agents both talk to the same engine. Storage,
            vectors, RAG, and workflow orchestration all run{" "}
            <span className="text-purple-300">in-process</span> — every hop the
            traditional stack makes over the network, Purple8 makes in memory.
          </p>
        </div>

        {/* Live stat bar */}
        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-10 gap-y-4 rounded-2xl border border-purple-900/40 bg-[#11111b] px-6 py-4">
          <Stat label="Throughput" value={load.toLocaleString()} unit="/s" />
          <Stat label="Write latency" value={String(latency)} unit="µs" />
          <Stat label="Network hops" value={String(hops)} />
          <Stat label="Services to run" value="1" />
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-xs font-medium text-emerald-400">Healthy</span>
          </div>
        </div>

        {/* Flow map */}
        <div className="mt-12 overflow-x-auto">
          <svg
            viewBox="0 0 1000 560"
            role="img"
            aria-label="Purple8 architecture flow map: applications and AI agents feed a single in-process engine that emits answers, audit, and metrics."
            className="mx-auto h-auto w-full min-w-[720px] max-w-5xl"
          >
            <defs>
              <linearGradient id="pulseGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="1" />
              </linearGradient>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.5" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Column labels */}
            <text x="135" y="70" textAnchor="middle" className="fill-zinc-600" fontSize="12" fontWeight="600" letterSpacing="1.5">
              ENTRY POINTS
            </text>
            <text x="530" y="60" textAnchor="middle" className="fill-purple-400" fontSize="12" fontWeight="700" letterSpacing="1.5">
              ONE PROCESS
            </text>
            <text x="905" y="90" textAnchor="middle" className="fill-zinc-600" fontSize="12" fontWeight="600" letterSpacing="1.5">
              OUTPUTS
            </text>

            {/* Core process container */}
            <rect
              x="388"
              y="76"
              width="284"
              height="390"
              rx="20"
              fill="rgba(124,58,237,0.05)"
              stroke="rgba(168,85,247,0.35)"
              strokeWidth="1.5"
              strokeDasharray="6 5"
            />

            {/* Edges + pulses */}
            {EDGES.map((e, i) => {
              const d = edgePath(byId(e.from), byId(e.to));
              const pid = `edge-${i}`;
              return (
                <g key={pid}>
                  <path id={pid} d={d} fill="none" stroke="#27272a" strokeWidth="1.5" />
                  <circle r="3.5" fill="#a855f7" filter="url(#glow)">
                    <animateMotion
                      dur={`${e.dur}s`}
                      begin={`${e.delay}s`}
                      repeatCount="indefinite"
                      keyPoints="0;1"
                      keyTimes="0;1"
                      calcMode="linear"
                    >
                      <mpath href={`#${pid}`} />
                    </animateMotion>
                  </circle>
                </g>
              );
            })}

            {/* Nodes */}
            {NODES.map((n) => {
              const c = toneClasses(n.tone);
              return (
                <g key={n.id}>
                  <rect
                    x={n.x}
                    y={n.y}
                    width={n.w}
                    height={n.h}
                    rx="12"
                    fill={c.fill}
                    stroke={c.stroke}
                    strokeWidth="1.5"
                  />
                  <text
                    x={n.x + 16}
                    y={n.y + n.h / 2 - 3}
                    fill={c.text}
                    fontSize="14"
                    fontWeight="700"
                  >
                    {n.label}
                  </text>
                  <text
                    x={n.x + 16}
                    y={n.y + n.h / 2 + 15}
                    className="fill-zinc-500"
                    fontSize="11"
                  >
                    {n.sub}
                  </text>
                  {n.health && (
                    <circle
                      cx={n.x + n.w - 14}
                      cy={n.y + 14}
                      r="4"
                      fill={n.health === "ok" ? "#10b981" : "#f59e0b"}
                    />
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Footnote */}
        <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-zinc-600">
          Structural comparison: a minimal production AI stack runs 8–12
          separate services with 4–8 network hops per query. Purple8 runs one.
          Live figures illustrate steady-state behaviour on commodity hardware.
        </p>
      </div>
    </section>
  );
}
