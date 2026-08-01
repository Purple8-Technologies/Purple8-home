import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Purple8 Architect — AI-Native Technical Design Assistant",
  description:
    "AI Architect automates technical design, architecture documentation, and system analysis for AEC and engineering teams. Built on Purple8 Hyper Graph and AEC vertical.",
  path: "/products/architect",
});

const capabilities = [
  { icon: "🏗️", label: "BIM & IFC Intelligence", desc: "Parse IFC models into a live knowledge graph. Clash detection, change propagation, and delta sync — automatically." },
  { icon: "🔬", label: "Structural Analysis", desc: "Rigidity checking, load path tracing, critical member detection, and Cuthill-McKee FEM ordering." },
  { icon: "🌊", label: "MEP Flow Analysis", desc: "Max-flow/min-cut for MEP networks. Thermal zone simulation, energy balance, and fault isolation." },
  { icon: "👁️", label: "Space Syntax & VGA", desc: "Visibility graph analysis, integration scoring, axial maps — for spatial design optimisation." },
  { icon: "⚡", label: "Spectral Optimisation", desc: "Graph Laplacian, Fiedler value, spectral bisection, and natural frequency estimation for large structures." },
  { icon: "🧬", label: "Topology Optimisation", desc: "SIMP-on-graph density loop, sensitivity filter, multi-material support, and IFC/OBJ export." },
  { icon: "🤖", label: "Multi-Objective RL", desc: "Gym-compatible environment with Pareto front tracking — optimise VGA, egress, spectral gap, and MEP flow simultaneously." },
  { icon: "📐", label: "Generative Design", desc: "Graph-colouring + constraint propagation for spatial allocation. Egress optimisation via Dijkstra/min-cut." },
];

export default function ArchitectPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-[#0a0a0f] pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden py-24">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-48 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-teal-900/12 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-700/40 bg-teal-950/40 px-4 py-1.5 text-sm font-medium text-teal-200">
              AEC · Engineering · Enterprise · Built on Purple8
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              AI-native design intelligence{" "}
              <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                for AEC and engineering.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
              Purple8 Architect brings graph-native structural analysis, BIM intelligence,
              MEP flow simulation, and multi-objective generative design to architecture,
              engineering, and construction teams — powered by the Purple8 AEC vertical.
            </p>

            {/* Contact sales CTA */}
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="mailto:sales@purple8.ai?subject=Purple8 Architect inquiry"
                className="rounded-full bg-teal-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-teal-900/40 transition-colors hover:bg-teal-500"
              >
                Contact sales
              </a>
              <a
                href="mailto:sales@purple8.ai?subject=Purple8 Architect demo request"
                className="text-base font-semibold text-zinc-300 transition-colors hover:text-white"
              >
                Request a demo →
              </a>
            </div>
            <p className="mt-4 text-sm text-zinc-500">
              For pricing and availability, contact{" "}
              <a href="mailto:sales@purple8.ai" className="text-teal-400 hover:text-teal-300">sales@purple8.ai</a>
            </p>
          </div>
        </section>

        {/* Capabilities */}
        <section className="py-20 border-t border-white/5">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-teal-400">AEC Intelligence</p>
              <h2 className="mt-3 text-3xl font-bold text-white">12 specialised algorithms. One platform.</h2>
              <p className="mt-4 text-zinc-400">
                Every capability runs directly on the graph — no external simulation solvers, no data export required.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {capabilities.map((c) => (
                <div key={c.label} className="rounded-xl border border-zinc-800 bg-[#11111b] p-5">
                  <div className="text-2xl mb-3">{c.icon}</div>
                  <h3 className="font-semibold text-white">{c.label}</h3>
                  <p className="mt-1 text-sm text-zinc-400">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* For whom */}
        <section className="py-20 border-t border-white/5">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-sm font-semibold uppercase tracking-widest text-teal-400">Who it&apos;s for</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Built for the teams that design the built world.</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                { role: "Architecture firms", desc: "Space analysis, VGA, generative layout, and BIM coordination — all from one AI-accessible knowledge graph." },
                { role: "Structural engineers", desc: "Load path analysis, rigidity checking, critical member detection, and spectral robustness index." },
                { role: "MEP & sustainability teams", desc: "Energy balance modelling, MEP max-flow, fault isolation, and thermal zone simulation." },
              ].map((w) => (
                <div key={w.role} className="rounded-xl border border-teal-900/40 bg-[#11111b] p-6">
                  <h3 className="font-semibold text-teal-300">{w.role}</h3>
                  <p className="mt-2 text-sm text-zinc-400">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 border-t border-white/5">
          <div className="mx-auto max-w-xl px-4 text-center">
            <h2 className="text-3xl font-bold text-white">Bring AI-native design intelligence to your firm.</h2>
            <p className="mt-4 text-zinc-400">
              Contact our sales team to discuss your requirements, deployment options, and a tailored demonstration.
            </p>
            <div className="mt-8">
              <a
                href="mailto:sales@purple8.ai?subject=Purple8 Architect"
                className="rounded-full bg-teal-600 px-8 py-3.5 text-base font-semibold text-white hover:bg-teal-500"
              >
                Contact sales@purple8.ai
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
