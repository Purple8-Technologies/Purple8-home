"use client";

import { useState } from "react";

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <span
      className={`shrink-0 flex h-6 w-6 items-center justify-center rounded-full border transition-all duration-200 ${
        open
          ? "border-purple-600 bg-purple-600/20 text-purple-300 rotate-180"
          : "border-zinc-700 text-zinc-500"
      }`}
    >
      <svg
        className="h-3.5 w-3.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </span>
  );
}

function Panel({
  title,
  badge,
  defaultOpen = false,
  children,
}: {
  title: string;
  badge?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      className={`rounded-2xl border transition-colors duration-200 ${
        open ? "border-purple-700/50 bg-[#0d0d16]" : "border-purple-900/30 bg-[#0d0d16] hover:border-purple-800/50"
      }`}
    >
      <button
        className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <span className="text-base font-semibold text-white">{title}</span>
          {badge && (
            <span className="hidden sm:inline-flex items-center rounded-full border border-purple-800/40 bg-purple-950/40 px-2.5 py-0.5 text-[10px] font-medium text-purple-300/70">
              {badge}
            </span>
          )}
        </div>
        <ChevronIcon open={open} />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-[2400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-7 pb-7">{children}</div>
      </div>
    </div>
  );
}

export default function BlueGreenSection() {
  return (
    <div className="mt-10 space-y-3">

      {/* Panel 1 — Deployment comparison */}
      <Panel title="Deployment comparison" badge="microservices vs. consolidith" defaultOpen>
        <div className="grid gap-6 lg:grid-cols-2">

          {/* Microservices */}
          <div className="rounded-2xl border border-red-900/40 bg-[#11111b] p-7">
            <div className="flex items-center gap-2 mb-5">
              <span className="inline-flex h-5 w-5 rounded-full bg-red-600/80" />
              <p className="text-sm font-semibold text-red-400 uppercase tracking-widest">Microservices blue/green</p>
            </div>
            <p className="text-xs text-zinc-500 mb-4 leading-relaxed">
              12 services × 2 deployment slots = 24 running instances minimum during any release.
              Each service must be compatible with its neighbours at both versions simultaneously.
            </p>
            <div className="space-y-2">
              {[
                { label: "Auth service", v: "v1.4 → v1.5" },
                { label: "Vector DB sidecar", v: "v2.1 → v2.2" },
                { label: "Graph DB adapter", v: "v3.0 → v3.1" },
                { label: "Workflow engine", v: "v4.7 → v4.8" },
                { label: "RAG pipeline", v: "v1.2 → v1.3" },
                { label: "Search service", v: "v5.0 → v5.1" },
                { label: "+ 6 more services…", v: "" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-3 rounded-lg border border-red-900/20 bg-[#0d0d16] px-3 py-2">
                  <span className="h-2 w-2 rounded-full bg-red-700/70 shrink-0" />
                  <span className="text-xs text-zinc-400 flex-1">{s.label}</span>
                  {s.v && <span className="text-[10px] font-mono text-red-400/70">{s.v}</span>}
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-xl border border-red-900/30 bg-[#0d0d16] px-4 py-3">
              <p className="text-xs text-red-400/80 font-medium">Coordination surface</p>
              <p className="mt-1 text-xs text-zinc-600">
                Every service needs its own cutover signal. Traffic draining must be coordinated.
                A single incompatible version skew rolls the whole fleet back.
              </p>
            </div>
          </div>

          {/* Consolidith */}
          <div className="rounded-2xl border border-purple-700/40 bg-[#11111b] p-7">
            <div className="flex items-center gap-2 mb-5">
              <span className="inline-flex h-5 w-5 rounded-full bg-purple-600" />
              <p className="text-sm font-semibold text-purple-400 uppercase tracking-widest">Consolidith blue/green</p>
            </div>
            <p className="text-xs text-zinc-500 mb-4 leading-relaxed">
              One binary. One deployment slot. The entire stack — graph, vector, workflow,
              auth, encryption — updates together with a single swap.
            </p>
            <div className="space-y-3">
              {[
                { step: "1", title: "Provision green", detail: "Spin up 3 new replicas from the new binary. No external services to update.", colour: "text-emerald-400 border-emerald-900/40" },
                { step: "2", title: "Warm the HNSW index", detail: "Green replicas replay WAL and rebuild the in-memory vector index from BrickCoreStorage. Typically 60–120 s for multi-million-node corpora.", colour: "text-blue-400 border-blue-900/40" },
                { step: "3", title: "Cut over load balancer", detail: "LB health checks confirm green is ready → shift 100% traffic in one atomic update. Zero connection drops.", colour: "text-purple-400 border-purple-900/40" },
                { step: "4", title: "Drain and terminate blue", detail: "In-flight requests complete on the old replicas. Terminate blue. Total downtime: 0 ms.", colour: "text-zinc-400 border-zinc-800" },
              ].map((s) => (
                <div key={s.step} className={`flex gap-3 rounded-lg border ${s.colour} bg-[#0d0d16] px-3 py-2.5`}>
                  <span className={`mt-0.5 shrink-0 text-sm font-bold ${s.colour.split(" ")[0]}`}>{s.step}</span>
                  <div>
                    <p className="text-xs font-semibold text-white">{s.title}</p>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-zinc-500">{s.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-xl border border-purple-900/30 bg-[#0d0d16] px-4 py-3">
              <p className="text-xs text-purple-400 font-medium">Coordination surface</p>
              <p className="mt-1 text-xs text-zinc-600">
                One deployment unit, one health check endpoint, one rollback target.
                No inter-service version matrix to reason about.
              </p>
            </div>
          </div>
        </div>
      </Panel>

      {/* Panel 2 — HA topology */}
      <Panel title="High-availability topology" badge="3 replicas · WAL-replicated">
        <p className="text-xs text-zinc-500 mb-8 max-w-2xl leading-relaxed">
          Three replicas provide full HA for a Consolidith deployment. Compare that to the
          36+ instances (3 replicas × 12 services) required for equivalent microservices
          resilience. The operational surface shrinks by an order of magnitude.
        </p>

        <div className="relative flex flex-col items-center gap-0">
          {/* Load balancer */}
          <div className="z-10 flex items-center gap-2 rounded-xl border border-purple-700/50 bg-purple-950/40 px-6 py-3 shadow-lg shadow-purple-900/20">
            <svg className="h-4 w-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
            </svg>
            <span className="text-sm font-semibold text-white">Load Balancer</span>
            <span className="ml-2 text-[10px] font-medium text-purple-300/70 bg-purple-950/60 border border-purple-800/40 rounded-full px-2 py-0.5">Active health checks</span>
          </div>

          {/* Connector lines down */}
          <div className="flex w-full max-w-3xl justify-between px-12 relative" style={{ height: "32px" }}>
            <div className="absolute left-1/2 top-0 h-full w-px border-l border-dashed border-purple-800/40" />
            <div className="absolute left-[16%] top-0 h-full w-px border-l border-dashed border-purple-800/30" />
            <div className="absolute right-[16%] top-0 h-full w-px border-l border-dashed border-purple-800/30" />
          </div>

          {/* Replica nodes */}
          <div className="flex w-full max-w-3xl gap-4 justify-between">
            {[
              { label: "Replica A", tag: "blue — current", accent: "border-blue-700/60 bg-blue-950/20", dot: "bg-blue-500", tagColour: "text-blue-300/70" },
              { label: "Replica B", tag: "primary read", accent: "border-purple-700/50 bg-purple-950/25", dot: "bg-purple-500", tagColour: "text-purple-300/70" },
              { label: "Replica C", tag: "green — new", accent: "border-emerald-700/60 bg-emerald-950/20", dot: "bg-emerald-500", tagColour: "text-emerald-300/70" },
            ].map((n) => (
              <div key={n.label} className={`flex-1 rounded-xl border ${n.accent} p-4`}>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`h-2.5 w-2.5 rounded-full ${n.dot}`} />
                  <span className="text-sm font-bold text-white">{n.label}</span>
                </div>
                <div className="space-y-1.5">
                  {["GraphEngine", "HNSW Index", "Journey Engine", "SOC Agent", "WAL"].map((c) => (
                    <div key={c} className="rounded-md bg-[#11111b] px-2.5 py-1 text-[10px] text-zinc-500">{c}</div>
                  ))}
                </div>
                <p className={`mt-3 text-[10px] font-medium ${n.tagColour}`}>{n.tag}</p>
              </div>
            ))}
          </div>

          {/* Connector lines up from storage */}
          <div className="flex w-full max-w-3xl justify-between px-12 relative mt-0" style={{ height: "28px" }}>
            <div className="absolute left-1/2 top-0 h-full w-px border-l border-dashed border-zinc-700/40" />
            <div className="absolute left-[16%] top-0 h-full w-px border-l border-dashed border-zinc-700/30" />
            <div className="absolute right-[16%] top-0 h-full w-px border-l border-dashed border-zinc-700/30" />
          </div>

          {/* Storage layer */}
          <div className="flex w-full max-w-3xl gap-4">
            {[
              { title: "BrickCoreStorage", sub: "WAL-replicated · AES-256 at rest" },
              { title: "Write-Ahead Log", sub: "fsync before mutation · crash-safe replay" },
              { title: "Prometheus /metrics", sub: "One endpoint · one alert surface" },
            ].map((s) => (
              <div key={s.title} className="flex-1 rounded-xl border border-zinc-800 bg-[#11111b] px-4 py-3 text-center">
                <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">{s.title}</p>
                <p className="text-[10px] text-zinc-600 mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </Panel>

      {/* Panel 3 — At a glance */}
      <Panel title="At a glance" badge="key metrics">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Instances for HA", micro: "36+ (3 × 12 services)", p8: "3 replicas" },
            { label: "Rolling update steps", micro: "12 independent rollouts", p8: "1 binary swap" },
            { label: "Version skew risk", micro: "Every service boundary", p8: "None — one release unit" },
          ].map((r) => (
            <div key={r.label} className="rounded-xl border border-purple-900/25 bg-[#11111b] px-5 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500 mb-2">{r.label}</p>
              <p className="text-xs text-zinc-500 line-through mb-1">{r.micro}</p>
              <p className="text-sm font-semibold text-purple-300">{r.p8}</p>
            </div>
          ))}
        </div>
      </Panel>

    </div>
  );
}
