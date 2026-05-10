const industries = [
  {
    name: "Engineering",
    description:
      "Accelerate design review, RFI resolution, and specification management. Hyper Graph links components, materials, and compliance requirements across complex engineering BOM hierarchies. DocIntel parses CAD metadata, IFC/BIM models, and technical spec sheets automatically.",
    useCases: ["CAD/BIM data extraction", "Compliance graph traversal", "RFI management", "Design review automation"],
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
      />
    ),
  },
  {
    name: "Financial Services",
    description:
      "Power entity resolution, counterparty risk graphs, and regulatory document analysis at scale. Per-tenant envelope encryption and strict data isolation satisfy SOC 2, ISO 27001, and financial data residency requirements without custom infrastructure.",
    useCases: ["Entity resolution", "Counterparty risk graphs", "Regulatory document parsing", "AML/KYC enrichment"],
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
      />
    ),
  },
  {
    name: "Legal",
    description:
      "Extract parties, obligations, dates, and clauses from contracts and filings. Map legal entity hierarchies and precedent relationships as a traversable graph. DocIntel handles deposition transcripts, discovery documents, and structured court filings end-to-end.",
    useCases: ["Contract intelligence", "Legal entity graphs", "Discovery document parsing", "Clause extraction"],
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.97z"
      />
    ),
  },
  {
    name: "AEC",
    description:
      "Connect project data across BIM models, subcontractors, specifications, and schedules. Hyper Graph's Journey Engine orchestrates multi-party approval workflows with SLA tracking. DocIntel parses IFC, RFI packets, and change-order documents across the full project lifecycle.",
    useCases: ["BIM graph extraction", "Approval workflow orchestration", "Change order intelligence", "Subcontractor risk mapping"],
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
      />
    ),
  },
];

export default function Industries() {
  return (
    <section id="industries" className="bg-[#0a0a0f] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
            Industries
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Built for knowledge-intensive sectors
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-zinc-500">
            Purple8 is deployed globally in sectors where AI applications need
            to reason over complex, real-world data — not just retrieve
            text chunks.
          </p>
        </div>

        {/* Industry cards */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {industries.map((ind) => (
            <div
              key={ind.name}
              className="group relative overflow-hidden rounded-2xl border border-zinc-800/60 bg-[#11111b] p-7 transition-all hover:border-purple-900/50"
            >
              {/* Glow */}
              <div className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-purple-900/10 blur-3xl transition-all group-hover:bg-purple-800/20" />

              <div className="relative">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-600/20 text-purple-400">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      {ind.icon}
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white">{ind.name}</h3>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-zinc-500">
                  {ind.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {ind.useCases.map((uc) => (
                    <span
                      key={uc}
                      className="rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-0.5 text-xs text-zinc-500"
                    >
                      {uc}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
