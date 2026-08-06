import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Quantum AI for Medical Research — Purple8 Hyper Graph",
  description:
    "Purple8 Hyper Graph brings quantum-inspired AI to medical research: drug discovery via VQE, clinical trial optimisation, genomic variant prioritisation, patient cohort assignment, and medical imaging similarity search — all callable by AI agents via MCP tools.",
  path: "/products/purple8/medical-research",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Quantum AI for Medical Research — Purple8 Hyper Graph",
  description:
    "Apply Purple8's quantum-inspired compute layer to medical research: molecular ground-state estimation (VQE), clinical trial scheduling, genomic optimisation, patient cohort assignment, and fidelity-based imaging similarity — no quantum hardware required.",
  url: "https://www.purple8.ai/products/purple8/medical-research/",
  publisher: { "@type": "Organization", name: "Purple8 Inc.", url: "https://www.purple8.ai" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.purple8.ai/" },
      { "@type": "ListItem", position: 2, name: "Purple8 Hyper Graph", item: "https://www.purple8.ai/products/purple8/" },
      { "@type": "ListItem", position: 3, name: "Medical Research", item: "https://www.purple8.ai/products/purple8/medical-research/" },
    ],
  },
  mainEntity: {
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does VQE help in drug discovery?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Variational Quantum Eigensolver (VQE) iteratively minimises the energy of a Hamiltonian representing a molecular system. By finding the ground-state configuration, it estimates binding affinity and conformational stability — key properties in lead compound selection. Purple8's quantum.vqe_step MCP tool runs this in pure numpy on CPU, iterating toward convergence without quantum hardware.",
        },
      },
      {
        "@type": "Question",
        name: "Can Purple8 optimise clinical trial patient assignment?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Patient-to-trial assignment is a combinatorial optimisation problem with binary decision variables (enrolled or not), eligibility constraints, dosage group balancing, site capacity, and stratification requirements. This maps directly to QUBO, solved via quantum.scheduling or quantum.anneal. An AI agent can retrieve the patient graph, formulate the QUBO, and call the solver — all through MCP.",
        },
      },
      {
        "@type": "Question",
        name: "How is quantum fidelity useful for medical imaging?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Radiomics feature vectors extracted from CT or MRI scans can be encoded as quantum amplitude states via quantum.encode_state and stored in Purple8's HNSW index. Similarity search then uses quantum fidelity rather than cosine distance — capturing correlations between feature components that standard vector similarity misses. quantum.compare returns fidelity, trace distance, and entanglement entropy between any two stored states.",
        },
      },
      {
        "@type": "Question",
        name: "Does this require quantum hardware or a cloud quantum service?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. All quantum-inspired tools in Purple8 run on ordinary CPUs using pure numpy — no QPU, no IBM Quantum, no AWS Braket, no external subscription. For production-scale quantum chemistry beyond what VQE covers, the right pattern is to use Purple8 as the knowledge graph, RAG, and workflow backbone, and invoke an external chemistry solver from within a JourneyEngine stage hook.",
        },
      },
    ],
  },
};

const quantumTools = [
  { name: "quantum.vqe_step", desc: "Variational Quantum Eigensolver — iterates toward molecular ground-state energy; use for binding affinity estimation" },
  { name: "quantum.simulate", desc: "MPS tensor network simulation — models correlated electron systems and spin chains" },
  { name: "quantum.encode_state", desc: "Store radiomics or molecular feature vectors as quantum amplitude states, HNSW-indexed by fidelity" },
  { name: "quantum.compare", desc: "Fidelity, trace distance, and entanglement entropy between two stored quantum states" },
  { name: "quantum.measure", desc: "Simulate Born-rule measurement of a stored quantum state" },
  { name: "quantum.anneal", desc: "Generic QUBO solver — encode cohort assignment, variant prioritisation, or resource allocation" },
  { name: "quantum.scheduling", desc: "Clinical trial scheduling with eligibility constraints, site capacity, and dosage group balance" },
  { name: "quantum.optimize", desc: "Auto-selects the best solver based on problem size and constraint density" },
];

const graphTools = [
  { name: "rag.hybrid_query", desc: "Purple8 RAG — retrieve relevant literature, clinical notes, and prior trial results before running optimisation" },
  { name: "data.ingest_file", desc: "Purple8 DocIntel — ingest FHIR records, genomic VCF files, lab reports, or research PDFs into the knowledge graph" },
  { name: "journey.define", desc: "Purple8 Journey Engine — model drug approval pipelines or IRB review processes with SLA enforcement and approval gates" },
  { name: "journey.resolve_hitl", desc: "Purple8 Journey Engine — gate molecular screening results behind a principal investigator approval step" },
];

const useCases = [
  {
    icon: "🧬",
    title: "Drug discovery — binding affinity",
    desc: "Encode a candidate molecule's interaction sites as a Hamiltonian. Loop quantum.vqe_step until the variational energy converges. Compare ground-state energies across candidate compounds stored as graph nodes.",
  },
  {
    icon: "🏥",
    title: "Clinical trial cohort assignment",
    desc: "Assign patients to treatment arms under eligibility criteria, stratification requirements, site capacity, and dosage group balance. QUBO + quantum.scheduling solves this in seconds — on the same CPU as the rest of Purple8.",
  },
  {
    icon: "🧠",
    title: "Medical imaging similarity",
    desc: "Extract radiomics features from CT/MRI scans. Encode them as quantum amplitude states via quantum.encode_state. Retrieve the k most similar prior cases by quantum fidelity — not just cosine distance.",
  },
  {
    icon: "🔬",
    title: "Genomic variant prioritisation",
    desc: "Score variant-gene-disease associations under a sequencing budget as a binary optimisation problem. Structurally equivalent to portfolio optimisation: maximise total information value, respect total cost constraints.",
  },
  {
    icon: "📋",
    title: "IRB & regulatory workflow",
    desc: "Model the IRB review → Phase I → Phase II → NDA submission pipeline as a Purple8 Journey Engine workflow. SLA monitoring flags overdue submissions; approval gates require PI sign-off before advancing to the next phase.",
  },
  {
    icon: "📚",
    title: "Research knowledge graph + RAG",
    desc: "Ingest published papers, clinical trial registries, and EHR data. Build a graph of compounds, targets, diseases, and trials. Purple8 RAG retrieves relevant evidence before every optimisation run — grounding agent decisions in the literature.",
  },
];

export default function MedicalResearchPage() {
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
            <span className="text-zinc-400">Medical Research</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden py-20">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-48 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-violet-900/12 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-700/40 bg-violet-950/30 px-4 py-1.5 text-sm font-medium text-violet-200">
              <span className="text-base">🧬</span>
              Built on Purple8 Hyper Graph · Quantum-inspired · CPU-only
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Quantum AI for{" "}
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                Medical Research.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
              Drug discovery, clinical trial optimisation, genomic variant prioritisation,
              and imaging similarity search — powered by quantum-inspired algorithms and a
              unified AI-native backend. No quantum hardware. No external services.
              Callable by AI agents via MCP.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="/register/"
                className="rounded-full bg-purple-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-purple-900/40 transition-colors hover:bg-purple-500"
              >
                Start free
              </a>
              <a
                href="/products/purple8/quantum-optimisation/"
                className="text-base font-semibold text-zinc-300 transition-colors hover:text-white"
              >
                Explore the quantum layer →
              </a>
            </div>
          </div>
        </section>

        {/* What Purple8 replaces in a medical research stack */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-violet-400">One backend</p>
              <h2 className="mt-3 text-3xl font-bold text-white">The entire research stack. In one process.</h2>
              <p className="mt-3 text-zinc-500 max-w-xl mx-auto text-sm">
                A typical translational research platform stitches together a vector DB, a graph DB, a workflow engine,
                a quantum cloud, and a RAG framework. Purple8 replaces all of them.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/8">
                    <th className="pb-4 text-left font-semibold text-zinc-400">Capability needed</th>
                    <th className="pb-4 text-left font-semibold text-zinc-400">Traditional stack</th>
                    <th className="pb-4 text-left font-semibold text-violet-300">Purple8</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    ["Compound & trial knowledge graph", "Neo4j / Amazon Neptune", "Purple8 Hyper Graph"],
                    ["Literature & EHR retrieval (RAG)", "Pinecone + LangChain", "Purple8 RAG — hybrid graph + vector retrieval"],
                    ["Molecular ground-state estimation", "IBM Quantum / PySCF + cloud", "Purple8 Quantum — VQE, CPU-only, in-process"],
                    ["Cohort & trial scheduling", "Custom ILP solver + Gurobi", "Purple8 Quantum — scheduling & annealing"],
                    ["Imaging similarity search", "Cosine vector search only", "Purple8 Quantum — fidelity-based state similarity"],
                    ["IRB / regulatory workflow", "Jira + manual email chains", "Purple8 Journey Engine — SLA + approval gates"],
                    ["Audit trail", "Separate logging service", "Purple8 Hyper Graph — immutable audit trail"],
                    ["AI agent interface", "Custom API + LangGraph", "Purple8 MCP Server — 82 tools, agent-native"],
                  ].map(([cap, old, p8]) => (
                    <tr key={cap}>
                      <td className="py-3 pr-6 text-zinc-300">{cap}</td>
                      <td className="py-3 pr-6 text-zinc-500">{old}</td>
                      <td className="py-3 text-violet-300">{p8}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Use cases */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-violet-400">Use cases</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Six research workflows, one backend</h2>
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

        {/* MCP Tools — Quantum */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-violet-400">quantum.* namespace</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Quantum MCP tools for medical research</h2>
              <p className="mt-3 text-zinc-500 max-w-xl mx-auto text-sm">
                AI agents call these tools directly in natural language. No code written by a researcher.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {quantumTools.map((t) => (
                <div key={t.name} className="flex items-start gap-4 rounded-xl border border-white/8 bg-white/[0.015] px-5 py-4">
                  <code className="shrink-0 rounded bg-violet-950/60 px-2 py-0.5 text-xs font-mono text-violet-300">{t.name}</code>
                  <p className="text-sm text-zinc-400">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MCP Tools — Graph + RAG + Journey */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-violet-400">The full stack</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Graph, RAG, and workflow — same backend</h2>
              <p className="mt-3 text-zinc-500 max-w-xl mx-auto text-sm">
                Quantum tools don&apos;t run in isolation. Every optimisation is grounded in a knowledge graph,
                retrieved from literature, and tracked through a regulatory workflow.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {graphTools.map((t) => (
                <div key={t.name} className="flex items-start gap-4 rounded-xl border border-white/8 bg-white/[0.015] px-5 py-4">
                  <code className="shrink-0 rounded bg-violet-950/60 px-2 py-0.5 text-xs font-mono text-violet-300">{t.name}</code>
                  <p className="text-sm text-zinc-400">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works — agent flow */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-violet-400">Agent-native workflow</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Drug screening in 6 agent steps</h2>
              <p className="mt-3 text-zinc-500 text-sm">No human writes application code. The AI agent is the developer.</p>
            </div>
            <ol className="space-y-6">
              {[
                { step: "01", title: "Ingest the knowledge base", body: "Purple8 DocIntel loads compound libraries, PubMed abstracts, FHIR records, and prior trial results into the knowledge graph." },
                { step: "02", title: "Retrieve relevant context", body: "Purple8 RAG retrieves known binding partners, contraindications, and mechanism-of-action papers for the target protein." },
                { step: "03", title: "Encode molecular state", body: "Purple8 Quantum stores the candidate molecule's amplitude vector as a graph node, indexed by quantum fidelity for similarity search." },
                { step: "04", title: "Estimate binding affinity via VQE", body: "Loop the Variational Quantum Eigensolver until the variational energy converges — estimating the ground-state energy of the molecular Hamiltonian." },
                { step: "05", title: "Compare against candidate library", body: "Purple8 Quantum computes fidelity and trace distance between the new compound and all previously screened candidates in the graph." },
                { step: "06", title: "Advance to PI review", body: "Purple8 Journey Engine moves the compound to the Principal Investigator approval gate. Sign-off unblocks the next phase — fully audited, immutable trail." },
              ].map((s) => (
                <li key={s.step} className="flex gap-6">
                  <div className="shrink-0 w-10 h-10 rounded-full border border-violet-700/50 bg-violet-950/30 flex items-center justify-center text-xs font-bold text-violet-300">
                    {s.step}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">{s.title}</h3>
                    <p className="mt-1 text-sm text-zinc-400 leading-relaxed">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
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
            <h2 className="text-3xl font-bold text-white">Ready to accelerate your research?</h2>
            <p className="mt-4 text-zinc-400">
              Developer edition is free. All quantum.*, rag.*, journey.*, and graph.* tools are included.
              No hardware, no cloud subscription, no special setup.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="/register/"
                className="rounded-full bg-purple-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-purple-900/40 transition-colors hover:bg-purple-500"
              >
                Start free
              </a>
              <a href="/products/purple8/" className="text-base font-semibold text-zinc-300 transition-colors hover:text-white">
                Explore Purple8 Hyper Graph →
              </a>
            </div>
            <div className="mt-6 flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
              <a href="/products/purple8/quantum-optimisation/" className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
                Quantum-Inspired Optimisation →
              </a>
              <span className="hidden sm:inline text-zinc-700">·</span>
              <a href="/blog/quantum-ai-classical-computing/" className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
                What is quantum AI on classical hardware? →
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
