import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Quantum-Inspired Optimisation — Purple8 Hyper Graph",
  description:
    "Purple8 Hyper Graph ships quantum-inspired optimisation out of the box — QUBO, simulated annealing, VRP, portfolio selection, job scheduling, and tensor networks — callable by AI agents via 13 MCP tools. No quantum hardware required.",
  path: "/products/purple8/quantum-optimisation",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Quantum-Inspired Optimisation — Purple8 Hyper Graph",
  description:
    "Quantum-inspired optimisation for AI agents: QUBO formulation, simulated annealing, VRP, portfolio selection, job scheduling, tensor networks — 13 MCP tools, CPU-only, built into Purple8 Hyper Graph.",
  url: "https://www.purple8.ai/products/purple8/quantum-optimisation/",
  publisher: { "@type": "Organization", name: "Purple8 Inc.", url: "https://www.purple8.ai" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.purple8.ai/" },
      { "@type": "ListItem", position: 2, name: "Purple8 Hyper Graph", item: "https://www.purple8.ai/products/purple8/" },
      { "@type": "ListItem", position: 3, name: "Quantum-Inspired Optimisation", item: "https://www.purple8.ai/products/purple8/quantum-optimisation/" },
    ],
  },
  mainEntity: {
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is quantum-inspired optimisation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Quantum-inspired optimisation borrows mathematical structures from quantum physics — QUBO formulation, simulated annealing, tensor networks — and runs them on classical CPUs. It solves combinatorial optimisation problems (VRP, job scheduling, portfolio selection) that are NP-hard and where neural networks and gradient-based methods perform poorly. No quantum computer is required.",
        },
      },
      {
        "@type": "Question",
        name: "How is this different from real quantum computing?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Real quantum computing uses physical qubits — particles manipulated via quantum mechanics. Quantum-inspired optimisation uses the mathematical structure (QUBO, annealing, tensor networks) without quantum hardware. It runs today, on ordinary CPUs, and produces good-quality solutions to NP-hard problems in seconds.",
        },
      },
      {
        "@type": "Question",
        name: "What kinds of problems can quantum-inspired optimisation solve?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "NP-hard combinatorial problems: vehicle routing with capacity and time window constraints, job shop scheduling with precedence rules, binary portfolio optimisation under sector limits, staff scheduling with qualification constraints, and space allocation problems in AEC. These are problems where brute force is computationally infeasible and neural networks do not generalise well.",
        },
      },
      {
        "@type": "Question",
        name: "How do AI agents use the quantum tools in Purple8?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Via 13 MCP tools in the quantum.* namespace — quantum.vrp, quantum.portfolio, quantum.scheduling, quantum.optimize, quantum.anneal, and more. An agent describes the problem in natural language, retrieves structured data from the graph, formulates the QUBO, calls the solver, and interprets the result. The solver runs in-process, in the same Python runtime as the rest of Purple8.",
        },
      },
    ],
  },
};

const tools = [
  { name: "quantum.optimize", desc: "Auto-selects the best solver based on problem size and density" },
  { name: "quantum.anneal", desc: "Generic QUBO via simulated annealing with greedy descent refinement" },
  { name: "quantum.tabu", desc: "QUBO via tabu search — memory-based local search" },
  { name: "quantum.vrp", desc: "Vehicle Routing Problem with capacity and time window constraints" },
  { name: "quantum.portfolio", desc: "Binary portfolio optimisation under return, risk, and sector limits" },
  { name: "quantum.scheduling", desc: "Job scheduling across machines with precedence and resource constraints" },
  { name: "quantum.simulate", desc: "Tensor network (MPS) simulation and expectation value computation" },
  { name: "quantum.vqe_step", desc: "One variational quantum eigensolver iteration for Hamiltonian minimisation" },
  { name: "quantum.encode_state", desc: "Store a quantum state vector in the graph, indexed by fidelity" },
  { name: "quantum.measure", desc: "Simulate measurement of a stored quantum state" },
  { name: "quantum.compare", desc: "Fidelity, trace distance, and entanglement entropy between states" },
  { name: "quantum.profile", desc: "Profile solver performance on a given problem instance" },
  { name: "quantum.job_status", desc: "Check status of a background optimisation job" },
];

const useCases = [
  { icon: "🚚", title: "Last-mile delivery routing", desc: "Route 200+ vehicles across a city with capacity limits and customer time windows. QUBO + simulated annealing finds solutions within 2–5% of optimal in seconds — on a CPU." },
  { icon: "📊", title: "Portfolio construction", desc: "Select a binary portfolio of assets under expected return targets, risk tolerance, and sector concentration limits. Exact solvers can't scale; quantum-inspired can." },
  { icon: "🏭", title: "Manufacturing job scheduling", desc: "Assign 500 jobs to 40 machines with setup times, precedence constraints, and shift boundaries. Minimise makespan and tardiness simultaneously." },
  { icon: "👷", title: "Staff rostering", desc: "Assign shifts to workers respecting qualifications, preferences, union rules, and legal constraints. QUBO encodes every constraint as a penalty term." },
  { icon: "🏗️", title: "Space allocation (AEC)", desc: "Allocate rooms, floors, and zones to departments under adjacency, separation, and area constraints. Graph-colouring + constraint propagation via the AEC vertical." },
  { icon: "⚡", title: "Energy dispatch optimisation", desc: "Decide which generators to switch on/off at each interval to meet demand at minimum cost, with binary on/off decisions per asset — a natural QUBO formulation." },
];

export default function QuantumOptimisationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main id="main-content" className="bg-[#0a0a0f] pt-16">

        {/* Breadcrumb */}
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-8 pb-0">
          <nav className="flex items-center gap-2 text-xs text-zinc-600">
            <Link href="/" className="hover:text-zinc-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products/purple8/" className="hover:text-zinc-400 transition-colors">Purple8 Hyper Graph</Link>
            <span>/</span>
            <span className="text-zinc-400">Quantum-Inspired Optimisation</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden py-20">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-48 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-violet-900/12 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-700/40 bg-violet-950/30 px-4 py-1.5 text-sm font-medium text-violet-200">
              <span className="text-base">⚛️</span>
              Part of Purple8 Hyper Graph · CPU-only · No quantum hardware
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Quantum-Inspired Optimisation.{" "}
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                For AI agents.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
              Solve NP-hard combinatorial problems — vehicle routing, job scheduling,
              portfolio selection — that classical AI cannot handle. Runs on ordinary CPUs
              via 13 MCP tools. No quantum computer. No special hardware. Built into Purple8
              Hyper Graph.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="/register/"
                className="rounded-full bg-purple-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-purple-900/40 transition-colors hover:bg-purple-500"
              >
                Start free
              </a>
              <a href="/blog/quantum-ai-classical-computing/" className="text-base font-semibold text-zinc-300 transition-colors hover:text-white">
                Read the explainer →
              </a>
            </div>
          </div>
        </section>

        {/* What vs quantum computing */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-violet-400">Clarity first</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Quantum-inspired vs quantum computing</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {[
                {
                  label: "Quantum Computing",
                  accent: "border-zinc-800",
                  pill: "bg-zinc-800 text-zinc-400",
                  points: [
                    "Requires physical qubits — fragile, expensive hardware",
                    "Best machines: thousands of noisy qubits in 2026",
                    "Limited practical business applications today",
                    "Cloud queue time; not real-time",
                    "Promising long-term, not production-ready for most use cases",
                  ],
                },
                {
                  label: "Quantum-Inspired (Purple8)",
                  accent: "border-violet-700/60",
                  pill: "bg-violet-900/40 text-violet-300",
                  points: [
                    "Runs on CPU — same machine as the rest of Purple8",
                    "Borrows mathematical structure: QUBO, annealing, tensor networks",
                    "Solves VRP, scheduling, portfolio in seconds, today",
                    "13 MCP tools — callable by any AI agent",
                    "No quantum hardware, no subscriptions, no queue",
                  ],
                },
              ].map((col) => (
                <div key={col.label} className={`rounded-2xl border ${col.accent} bg-white/[0.02] p-8`}>
                  <div className={`inline-block rounded-full px-3 py-1 text-sm font-semibold mb-6 ${col.pill}`}>{col.label}</div>
                  <ul className="space-y-3">
                    {col.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2 text-sm text-zinc-400">
                        <span className="mt-1 shrink-0 text-zinc-600">•</span>{pt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MCP Tools */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-violet-400">quantum.* namespace</p>
              <h2 className="mt-3 text-3xl font-bold text-white">13 MCP tools. All callable by agents.</h2>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {tools.map((t) => (
                <div key={t.name} className="flex items-start gap-4 rounded-xl border border-white/8 bg-white/[0.015] px-5 py-4">
                  <code className="shrink-0 rounded bg-violet-950/60 px-2 py-0.5 text-xs font-mono text-violet-300">{t.name}</code>
                  <p className="text-sm text-zinc-400">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use cases */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-violet-400">Use cases</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Problems AI agents can now solve</h2>
              <p className="mt-3 text-zinc-500 max-w-xl mx-auto text-sm">These are NP-hard problems. Neural networks don&apos;t generalise well on them. Quantum-inspired solvers do.</p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {useCases.map((uc) => (
                <div key={uc.title} className="rounded-2xl border border-white/8 bg-white/[0.02] p-6">
                  <div className="text-3xl mb-4">{uc.icon}</div>
                  <h3 className="text-base font-semibold text-white mb-2">{uc.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{uc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-violet-400">FAQ</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Common questions</h2>
            </div>
            <div className="space-y-8">
              {(jsonLd.mainEntity as { mainEntity: { name: string; acceptedAnswer: { text: string } }[] }).mainEntity.map((faq) => (
                <div key={faq.name} className="border-b border-white/8 pb-8">
                  <h3 className="text-lg font-semibold text-white mb-2">{faq.name}</h3>
                  <p className="text-zinc-400 leading-relaxed">{faq.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-white/5 py-20 text-center">
          <div className="mx-auto max-w-2xl px-4">
            <h2 className="text-3xl font-bold text-white">Try it in 60 seconds</h2>
            <p className="mt-4 text-zinc-400">
              Developer edition is free. All quantum.* tools are included.
              No hardware, no cloud subscription, no special setup.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a href="/register/" className="rounded-full bg-purple-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-purple-900/40 transition-colors hover:bg-purple-500">
                Start free
              </a>
              <a href="/products/purple8/" className="text-base font-semibold text-zinc-300 transition-colors hover:text-white">
                Explore Purple8 Hyper Graph →
              </a>
            </div>
            <div className="mt-6">
              <a href="/blog/quantum-ai-classical-computing/" className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
                Read: What is quantum AI on classical hardware? →
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
