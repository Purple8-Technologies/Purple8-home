"use client";

/**
 * DocIntelFlow — "How DocIntel works" animated pipeline.
 *
 * Mirrors SystemFlow on the Hyper Graph page: sources on the left, one
 * stateless pipeline in the middle, graph outputs on the right. Pulses travel
 * along each connector. Colours come only from --p8-* tokens, so it follows
 * day/night with no overrides.
 */

import { FACTS as F } from "@/lib/facts";

type Node = { id: string; label: string; sub: string; x: number; y: number; w: number; h: number; tone: "edge" | "core" };

const NW = 190;
const NH = 58;

const NODES: Node[] = [
  { id: "upload", label: "Upload or URL", sub: `${F.docFormats} formats`, x: 40, y: 110, w: NW, h: NH, tone: "edge" },
  { id: "connectors", label: "Connectors", sub: "SharePoint · Confluence · S3", x: 40, y: 230, w: NW, h: NH, tone: "edge" },
  { id: "webhooks", label: "Webhooks", sub: "push on change", x: 40, y: 350, w: NW, h: NH, tone: "edge" },

  { id: "detect", label: "Detect & parse", sub: "format sniffing · OCR", x: 410, y: 86, w: 240, h: 44, tone: "core" },
  { id: "classify", label: "Classify & language", sub: `domain profile · ${F.languages} languages`, x: 410, y: 150, w: 240, h: 44, tone: "core" },
  { id: "chunk", label: "Structure-aware chunking", sub: "clauses · sections · tables", x: 410, y: 214, w: 240, h: 44, tone: "core" },
  { id: "entities", label: "Pass 1: entities", sub: "fast NER · ontology labels", x: 410, y: 278, w: 240, h: 44, tone: "core" },
  { id: "relations", label: "Pass 2: relationships", sub: "LLM, given the entities", x: 410, y: 342, w: 240, h: 44, tone: "core" },
  { id: "dedupe", label: "Resolve & score", sub: "stable IDs · dedupe · confidence", x: 410, y: 406, w: 240, h: 44, tone: "core" },

  { id: "graph", label: "Your graph or app", sub: "structured export · REST API", x: 810, y: 110, w: NW, h: NH, tone: "edge" },
  { id: "preview", label: "Preview", sub: "review before commit", x: 810, y: 230, w: NW, h: NH, tone: "edge" },
  { id: "history", label: "History & jobs", sub: "live progress · audit", x: 810, y: 350, w: NW, h: NH, tone: "edge" },
];

const byId = (id: string) => NODES.find((n) => n.id === id)!;

const EDGES: { from: string; to: string; dur: number; delay: number }[] = [
  { from: "upload", to: "detect", dur: 2.4, delay: 0 },
  { from: "connectors", to: "detect", dur: 2.8, delay: 0.7 },
  { from: "webhooks", to: "detect", dur: 3.1, delay: 1.3 },
  { from: "dedupe", to: "graph", dur: 2.6, delay: 0.4 },
  { from: "dedupe", to: "preview", dur: 2.9, delay: 1.1 },
  { from: "dedupe", to: "history", dur: 3.2, delay: 1.8 },
];

function path(a: Node, b: Node) {
  const leftToRight = a.x < b.x;
  const x1 = leftToRight ? a.x + a.w : a.x;
  const y1 = a.y + a.h / 2;
  const x2 = leftToRight ? b.x : b.x + b.w;
  const y2 = b.y + b.h / 2;
  const mx = (x1 + x2) / 2;
  return `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
}

const STATS = [
  { label: "Formats", value: F.docFormats },
  { label: "Languages", value: F.languages },
  { label: "Extraction", value: "2-pass" },
  { label: "Hosted content", value: "RAM-only session" },
];

export default function DocIntelFlow() {
  const core = NODES.filter((n) => n.tone === "core");
  return (
    <section id="how-it-works" className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--p8-accent)]">How DocIntel works</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Any document in. A graph out.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[var(--p8-muted)]">
            Turn documents into entities and relationships with stable IDs. Review the results,
            then export them to <span className="text-[var(--p8-accent)]">your graph or application</span>.
            No Hyper Graph installation required.
          </p>
        </div>

        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-10 gap-y-4 rounded-2xl border border-[var(--p8-border)] bg-[var(--p8-surface)] px-6 py-4">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--p8-muted)]">{s.label}</span>
              <span className="mt-0.5 text-lg font-bold tabular-nums">{s.value}</span>
            </div>
          ))}
        </div>

        <div className="mt-12 overflow-x-auto">
          <svg viewBox="0 0 1040 480" className="mx-auto h-auto w-full min-w-[720px] max-w-5xl" role="img" aria-label="DocIntel pipeline: sources, extraction stages, graph outputs">
            <defs>
              <filter id="di-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.5" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            <text x="135" y="80" textAnchor="middle" fontSize="12" fontWeight="600" letterSpacing="1.5" className="fill-[var(--p8-muted)]">SOURCES</text>
            <text x="530" y="60" textAnchor="middle" fontSize="12" fontWeight="700" letterSpacing="1.5" className="fill-[var(--p8-accent)]">ONE PIPELINE</text>
            <text x="905" y="80" textAnchor="middle" fontSize="12" fontWeight="600" letterSpacing="1.5" className="fill-[var(--p8-muted)]">OUTPUT</text>

            <rect x="390" y="72" width="280" height="392" rx="18" strokeDasharray="5 5" className="fill-[var(--p8-hover)] stroke-[var(--p8-accent)]" strokeOpacity="0.5" />

            {/* Stage spine inside the pipeline */}
            {core.slice(0, -1).map((n, i) => {
              const next = core[i + 1];
              const id = `di-spine-${i}`;
              return (
                <g key={id}>
                  <path id={id} d={`M530,${n.y + n.h} L530,${next.y}`} fill="none" strokeWidth="1.5" className="stroke-[var(--p8-border)]" />
                  <circle r="3" filter="url(#di-glow)" className="fill-[var(--p8-accent)]">
                    <animateMotion dur="1.2s" begin={`${i * 0.25}s`} repeatCount="indefinite"><mpath href={`#${id}`} /></animateMotion>
                  </circle>
                </g>
              );
            })}

            {EDGES.map((e, i) => {
              const id = `di-edge-${i}`;
              return (
                <g key={id}>
                  <path id={id} d={path(byId(e.from), byId(e.to))} fill="none" strokeWidth="1.5" className="stroke-[var(--p8-border)]" />
                  <circle r="3.5" filter="url(#di-glow)" className="fill-[var(--p8-accent)]">
                    <animateMotion dur={`${e.dur}s`} begin={`${e.delay}s`} repeatCount="indefinite"><mpath href={`#${id}`} /></animateMotion>
                  </circle>
                </g>
              );
            })}

            {NODES.map((n) => (
              <g key={n.id}>
                <rect
                  x={n.x} y={n.y} width={n.w} height={n.h} rx="10" strokeWidth="1.5"
                  className={n.tone === "core" ? "fill-[var(--p8-surface)] stroke-[var(--p8-accent)]" : "fill-[var(--p8-surface)] stroke-[var(--p8-border)]"}
                />
                <text x={n.x + n.w / 2} y={n.y + (n.tone === "core" ? 19 : 25)} textAnchor="middle" fontSize="13" fontWeight="600" className="fill-[var(--p8-fg)]">{n.label}</text>
                <text x={n.x + n.w / 2} y={n.y + (n.tone === "core" ? 34 : 42)} textAnchor="middle" fontSize="10.5" className="fill-[var(--p8-muted)]">{n.sub}</text>
              </g>
            ))}
          </svg>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-[var(--p8-muted)]">
          Hosted content and results stay in memory for the processing session; account, job and billing metadata
          are retained separately. Choose where your exported knowledge lives. Hyper Graph is optional.
        </p>
      </div>
    </section>
  );
}
