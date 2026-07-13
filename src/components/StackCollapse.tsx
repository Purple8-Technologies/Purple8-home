"use client";

/**
 * StackCollapse — the "before" shot: ~26 scattered services implode into one
 * Purple8 core. Paired with SystemFlow (the "after" / how-it-works) directly
 * below it, the narrative reads:
 *   here's the sprawl you run now  →  collapse  →  one thing replaces it.
 *
 * Pure React + CSS transforms (no deps). An IntersectionObserver triggers the
 * collapse on scroll-into-view; a replay button re-runs it. Respects
 * prefers-reduced-motion (renders the collapsed end-state immediately).
 */

import { useEffect, useRef, useState } from "react";

// The 26 services Purple8 replaces (individual products, not slashed pairs).
const SERVICES = [
  "PostgreSQL",
  "MongoDB",
  "Neo4j",
  "Pinecone",
  "Weaviate",
  "Elasticsearch",
  "Redis",
  "LangChain",
  "LangGraph",
  "LangSmith",
  "RAGAS",
  "spaCy",
  "Unstructured.io",
  "Azure Doc AI",
  "AWS Textract",
  "ABBYY",
  "Airflow",
  "Temporal",
  "Debezium",
  "Kafka Connect",
  "Auth0",
  "HashiCorp Vault",
  "Splunk",
  "Datadog",
  "Apollo Federation",
  "Retool",
];

/** Position each chip evenly on an ellipse around the centre (percentages). */
function ringPositions(n: number): { x: number; y: number }[] {
  const out: { x: number; y: number }[] = [];
  // Two concentric rings so 26 chips don't crowd one circle.
  const inner = Math.floor(n / 2);
  const outer = n - inner;
  const place = (count: number, rx: number, ry: number, phase: number) => {
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2 + phase;
      out.push({ x: 50 + Math.cos(a) * rx, y: 50 + Math.sin(a) * ry });
    }
  };
  place(outer, 44, 40, 0);
  place(inner, 26, 23, Math.PI / inner);
  return out;
}

const POSITIONS = ringPositions(SERVICES.length);

export default function StackCollapse() {
  const ref = useRef<HTMLDivElement>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setReduced(true);
      setCollapsed(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            // small delay so the user sees the "before" sprawl first
            setTimeout(() => setCollapsed(true), 650);
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const replay = () => {
    if (reduced) return;
    setCollapsed(false);
    setTimeout(() => setCollapsed(true), 700);
  };

  return (
    <section className="bg-[#0a0a0f] pt-24 pb-4 sm:pt-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
            The collapse
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            26 services become one.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-400">
            The modern AI stack is a sprawl of databases, vector stores,
            orchestration, auth, and observability — each its own service, its
            own bill, its own failure mode. Watch it collapse.
          </p>
        </div>

        {/* Collapse stage */}
        <div
          ref={ref}
          className="relative mx-auto mt-12 aspect-[16/10] w-full max-w-3xl sm:aspect-[16/9]"
        >
          {/* Chips */}
          {SERVICES.map((name, i) => {
            const p = POSITIONS[i];
            const left = collapsed ? 50 : p.x;
            const top = collapsed ? 50 : p.y;
            return (
              <span
                key={name}
                className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-medium transition-all duration-[900ms] ease-in-out"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  transitionDelay: `${(i % 8) * 40}ms`,
                  opacity: collapsed ? 0 : 1,
                  transform: `translate(-50%, -50%) scale(${collapsed ? 0.3 : 1})`,
                  borderColor: "rgba(63,63,70,0.9)",
                  background: "#11111b",
                  color: "#a1a1aa",
                }}
              >
                {name}
              </span>
            );
          })}

          {/* Central Purple8 core — fades/scales in as chips implode */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out"
            style={{
              opacity: collapsed ? 1 : 0,
              transform: `translate(-50%, -50%) scale(${collapsed ? 1 : 0.4})`,
              transitionDelay: collapsed ? "550ms" : "0ms",
            }}
          >
            <div className="relative flex flex-col items-center">
              <div className="absolute inset-0 -z-10 animate-pulse rounded-full bg-purple-600/30 blur-2xl" />
              <div className="flex h-28 w-28 flex-col items-center justify-center rounded-2xl border border-purple-500/60 bg-gradient-to-b from-purple-600/30 to-[#11111b] sm:h-32 sm:w-32">
                <span className="text-2xl font-extrabold text-white sm:text-3xl">
                  Purple8
                </span>
                <span className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-purple-300">
                  one process
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Replay + tally */}
        <div className="mt-2 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={replay}
            disabled={reduced}
            className="rounded-full border border-zinc-700 px-4 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:border-purple-600 hover:text-purple-300 disabled:opacity-40"
          >
            ↻ Replay
          </button>
          <span className="text-xs text-zinc-600">
            26 services · 1 binary · 0 network hops
          </span>
        </div>
      </div>
    </section>
  );
}
