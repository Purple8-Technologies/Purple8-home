const industries = [
  {
    name: "AEC & Construction",
    description:
      "Connect project data across BIM models, subcontractors, specifications, and schedules. Purple8's Journey Engine orchestrates multi-party approval workflows with SLA tracking; DocIntel parses IFC, RFI packets, and change orders across the full project lifecycle. 12 AEC-specific modules cover estimating, safety, commissioning, and handover.",
    useCases: ["BIM/IFC graph extraction", "Approval workflow orchestration", "Change-order intelligence", "Subcontractor risk mapping", "Estimating & cost graphs", "Safety & commissioning"],
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
      />
    ),
  },
  {
    name: "Engineering & Manufacturing",
    description:
      "Reason over complex BOM hierarchies, part revisions, and supplier dependencies as a traversable graph. DocIntel extracts CAD metadata and technical specifications; Purple8 links components, materials, and compliance requirements so change impact and traceability are one query away.",
    useCases: ["BOM & part-revision graphs", "Change-impact analysis", "Supplier dependency mapping", "Spec & datasheet extraction", "Compliance traceability"],
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
      "Power entity resolution, counterparty-risk graphs, and regulatory document analysis at scale. Per-tenant envelope encryption and strict data isolation help meet SOC 2, ISO 27001, and data-residency requirements without bolting on separate infrastructure.",
    useCases: ["Entity resolution", "Counterparty-risk graphs", "Regulatory document parsing", "AML / KYC enrichment"],
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
      "Extract parties, obligations, dates, and clauses from contracts and filings. Map legal-entity hierarchies and precedent relationships as a traversable graph. DocIntel handles deposition transcripts, discovery sets, and structured court filings end-to-end.",
    useCases: ["Contract intelligence", "Legal-entity graphs", "Discovery document parsing", "Clause extraction"],
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.97z"
      />
    ),
  },
  {
    name: "Healthcare & Life Sciences",
    description:
      "Build patient, protocol, and research knowledge graphs that reason over clinical documents, trial data, and literature. Self-hosted, air-gap-ready deployment with envelope encryption and per-tenant isolation keeps PHI on your infrastructure — DocIntel extracts entities from records, labs, and papers without data ever leaving your network.",
    useCases: ["Clinical knowledge graphs", "Trial & protocol mapping", "Literature & evidence synthesis", "PHI-safe on-prem extraction", "Pharmacovigilance signals"],
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    ),
  },
  {
    name: "Public Sector & Government",
    description:
      "Consolidate case files, policy documents, and citizen services into a single auditable backend. Immutable graph-native audit trails, HITL approval gates, and fully self-hosted deployment satisfy sovereignty and records-retention mandates — no cloud dependency, no data egress.",
    useCases: ["Case & records management", "Policy & regulation graphs", "Citizen-service workflows", "Immutable audit trail", "Data-sovereign deployment"],
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
      />
    ),
  },
  {
    name: "Security Operations",
    description:
      "Purple8's built-in SOC vertical runs autonomous threat detection, containment, and audit trails entirely on-prem — no SIEM data egress. Threat classes, containment levels, and an immutable graph-native audit trail come built in, not bolted on.",
    useCases: ["Insider-threat detection", "Tenant boundary enforcement", "Graph-native audit log", "Automated containment"],
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
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
            Purple8 is purpose-built for domains where AI applications must reason
            over complex, real-world data — connected entities, documents, and
            workflows — not just retrieve text chunks.
          </p>
        </div>

        {/* Industry cards */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind) => (
            <div
              key={ind.name}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800/60 bg-[#11111b] p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-700/50 hover:bg-[#13131f]"
            >
              {/* Glow */}
              <div className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-purple-900/10 blur-3xl transition-all group-hover:bg-purple-700/20" />

              <div className="relative flex flex-1 flex-col">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-600/20 text-purple-400 transition-colors group-hover:bg-purple-600/30">
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
                  <h3 className="text-base font-bold leading-tight text-white">
                    {ind.name}
                  </h3>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                  {ind.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2 pt-1">
                  {ind.useCases.map((uc) => (
                    <span
                      key={uc}
                      className="rounded-full border border-zinc-800 bg-zinc-900/60 px-2.5 py-0.5 text-xs text-zinc-400 transition-colors group-hover:border-purple-900/50"
                    >
                      {uc}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Teaser — fills the grid + invites other verticals */}
          <a
            href="#products"
            className="group relative flex flex-col justify-center overflow-hidden rounded-2xl border border-dashed border-zinc-800 bg-transparent p-7 transition-all duration-300 hover:border-purple-700/50 hover:bg-[#11111b]"
          >
            <h3 className="text-base font-bold text-white">
              Don&rsquo;t see your sector?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              Purple8 is domain-agnostic infrastructure. If your work means
              reasoning over connected data and documents, it fits.
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-purple-400 transition-colors group-hover:text-purple-300">
              Explore the platform
              <span className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
