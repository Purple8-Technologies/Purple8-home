import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Financial Crime Intelligence — Purple8 Hyper Graph",
  description:
    "Purple8 Hyper Graph covers AML, transaction screening, fraud detection, KYC, beneficial ownership, elder financial abuse, and market surveillance in a single graph-native platform. No rules engine. No siloed tools. One graph.",
  path: "/products/purple8/financial-crime-intelligence",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Financial Crime Intelligence — Purple8 Hyper Graph",
  description:
    "Purple8 is not an AML product. It is a graph intelligence backend. AML, fraud, transaction screening, KYC, elder financial abuse, and market surveillance are things it does natively, without external dependencies, and without data leaving your infrastructure.",
  url: "https://www.purple8.ai/products/purple8/financial-crime-intelligence/",
  publisher: { "@type": "Organization", name: "Purple8 Inc.", url: "https://www.purple8.ai" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.purple8.ai/" },
      { "@type": "ListItem", position: 2, name: "Purple8 Hyper Graph", item: "https://www.purple8.ai/products/purple8/" },
      { "@type": "ListItem", position: 3, name: "Financial Crime Intelligence", item: "https://www.purple8.ai/products/purple8/financial-crime-intelligence/" },
    ],
  },
  mainEntity: {
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How is this different from a rules-based AML system?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Rules engines fire alerts on individual transactions. Purple8 models the entire entity network as a graph: accounts, customers, transactions, beneficial owners, devices, and watchlist entries are all nodes and edges. A 4-hop OFAC sanctions chain is invisible to any rule that looks at one transaction at a time. Graph traversal finds it in milliseconds.",
        },
      },
      {
        "@type": "Question",
        name: "Does Purple8 replace existing AML transaction monitoring systems?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It can replace the entire stack, including transaction monitoring, case management, sanctions screening, SAR filing workflow, and audit trail, or sit alongside existing systems as the investigation layer. Most institutions start with investigation because that is where the most investigator time is lost.",
        },
      },
      {
        "@type": "Question",
        name: "How does transaction screening work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Purple8 has native OFAC and sanctions screening built into the core. It runs two-tier SDN screening: an offline local pattern match that is instant and requires no API, followed by an optional real-time call to ofac.io or a commercial provider such as Dow Jones, Refinitiv, or ComplyAdvantage. Every screened entity is a node in the graph with full relationship context, not an isolated alert.",
        },
      },
      {
        "@type": "Question",
        name: "How does Purple8 detect elder financial abuse?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Elder financial abuse follows a consistent graph pattern. A new person appears, takes Power of Attorney, and starts moving money. Purple8's Change Data Capture fires the moment a new CONTROLS or POA_FOR edge is written to the graph. Link prediction scores the new beneficiary as anomalous if they have no prior relationship with the account holder. Community detection surfaces one person controlling multiple elderly customers across the book, something no per-account rule can see.",
        },
      },
      {
        "@type": "Question",
        name: "Can Purple8 handle multiple business lines in one graph?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Purple8's multi-tenant architecture partitions data by tenant, so Retail Banking, Asset Management, and Prime Brokerage each have isolated namespaces, while Group Financial Crime can query across all of them. The same individual appearing in Retail Banking and Prime Brokerage is surfaced automatically. This is the cross-divisional intelligence that financial institutions have been trying to achieve for a decade.",
        },
      },
    ],
  },
};

const patterns = [
  {
    number: "01",
    icon: "🔗",
    title: "Multi-Hop Money Laundering",
    subtitle: "AML · Transaction Monitoring",
    desc: "The placement, layering, and integration chain is invisible to any rule that examines one transaction at a time. Purple8 traverses the full entity network at 4, 6, or 8 hops and traces the path from source funds to OFAC SDN in milliseconds. A chain that would take an investigator two weeks to reconstruct manually is a single graph query.",
    tags: ["Graph traversal", "Temporal analysis", "PageRank", "OFAC screening"],
  },
  {
    number: "02",
    icon: "🏦",
    title: "Transaction Screening",
    subtitle: "Sanctions · Watchlist",
    desc: "Two-tier SDN screening runs an offline local pattern match first, then an optional real-time API call to ofac.io, Dow Jones Watchlist, Refinitiv World-Check, or ComplyAdvantage. Every screened entity is a graph node with full relationship context. A name that clears direct screening but sits two hops from a sanctioned entity is still flagged, because the relationship graph catches what name-matching misses.",
    tags: ["OFAC SDN", "EU/UN/HMT", "PEP screening", "Adverse media", "World-Check"],
  },
  {
    number: "03",
    icon: "💳",
    title: "Fraud Ring Detection",
    subtitle: "Fraud · Identity",
    desc: "Fraud rings share devices, addresses, phone numbers, and IP addresses across seemingly unrelated accounts. Community detection clusters accounts that share any attribute node. PageRank identifies the most influential accounts in the network. Betweenness centrality finds the key intermediaries. A synthetic identity ring of 40 accounts spanning 3 years surfaces as a single connected component.",
    tags: ["Community detection", "Betweenness centrality", "Device graph", "Link prediction"],
  },
  {
    number: "04",
    icon: "🏗️",
    title: "Beneficial Ownership & KYC",
    subtitle: "KYC · EDD · Corporate Structures",
    desc: "Multi-hop traversal maps the full ownership chain through nominee directors, Cayman LPs, BVI shells, and Singapore SPVs to the ultimate beneficial owner. DocIntel ingests company registry documents, KYC forms, and adverse media references and emits entities directly to the graph. A 5-entity offshore structure resolves to its UBO in a single traversal call.",
    tags: ["Ownership chain", "DocIntel", "UBO resolution", "EDD"],
  },
  {
    number: "05",
    icon: "👴",
    title: "Elder Financial Abuse",
    subtitle: "Vulnerable Customer Protection",
    desc: "A new person appears, takes Power of Attorney, and starts moving money. Purple8's Change Data Capture fires the moment a new CONTROLS or POA_FOR edge is written. Link prediction scores new beneficiaries with no prior relationship as anomalous. Community detection surfaces one person controlling multiple elderly customers across the book, a pattern that no per-account rule can see.",
    tags: ["CDC event triggers", "Link prediction", "Community detection", "Anomaly scoring"],
  },
  {
    number: "06",
    icon: "📊",
    title: "Structuring & Smurfing",
    subtitle: "BSA · CTR Avoidance",
    desc: "Multiple sub-$10,000 cash deposits by the same individual, related accounts, or shared devices constitute structuring, a federal crime. Purple8 aggregates across accounts linked by shared device, address, or relationship edge. The aggregated pattern that evades the CTR threshold surfaces as a typology match against the structuring pattern graph.",
    tags: ["Temporal aggregation", "Device graph", "Typology matching", "CTR"],
  },
  {
    number: "07",
    icon: "🌍",
    title: "Trade-Based Money Laundering",
    subtitle: "TBML · Cross-Border",
    desc: "Over- and under-invoicing between related trading entities is the largest money laundering typology by volume and the hardest to detect. Purple8 connects the trade finance graph, covering invoices, letters of credit, counterparties, and jurisdictions, to the corporate ownership graph. When buyer and seller share a beneficial owner, the relationship edge makes the manipulation visible.",
    tags: ["Trade finance graph", "Corporate ownership", "Jurisdiction risk", "FATF typologies"],
  },
  {
    number: "08",
    icon: "📈",
    title: "Market Surveillance",
    subtitle: "Prime Brokerage · Securities",
    desc: "Spoofing, layering, bear raids, wash trading, and dividend arbitrage leave traces in the order graph. Purple8 models positions, orders, cancellations, and beneficial ownership as a unified graph. Two hedge funds shorting the same illiquid mid-cap on the same days via a shared prime account is a community detection result, not a manually configured alert rule.",
    tags: ["Order graph", "Community detection", "Coordinated trading", "VEBA"],
  },
  {
    number: "09",
    icon: "🔄",
    title: "SAR Filing & Case Management",
    subtitle: "Workflow · Regulatory Reporting",
    desc: "The SAR filing workflow runs as a Journey Engine state machine: alert, triage, investigation, supervisor review, FIU escalation, narrative generation, filing. Each stage transition is a mandatory human decision recorded as an immutable graph edge. The SAR narrative is generated from the actual graph evidence, including the relationship chain, transaction timeline, and typology match, not reconstructed from memory after the fact.",
    tags: ["Journey Engine", "SAR narrative", "Immutable audit trail", "FIU escalation"],
  },
  {
    number: "10",
    icon: "🌐",
    title: "Cross-Business-Line Intelligence",
    subtitle: "Group Financial Crime · Enterprise",
    desc: "The same individual appearing in Retail Banking, Asset Management, and Prime Brokerage with different risk profiles is the most dangerous customer in the book. Purple8's multi-tenant architecture keeps business line data isolated for regulatory purposes while letting Group Financial Crime query across all tenants. Cross-divisional alerts are graph edges, not email threads.",
    tags: ["Multi-tenant", "Cross-BL traversal", "Group Financial Crime", "Entity resolution"],
  },
];

const comparison = [
  { item: "Relationship depth", legacy: "1-hop (direct transaction parties)", purple8: "Unlimited hops across the full network" },
  { item: "New pattern detection", legacy: "Requires a new rule to be written", purple8: "Graph algorithms surface emergent patterns" },
  { item: "False positive rate", legacy: "95–98% (industry average)", purple8: "Relationship context filters out noise" },
  { item: "Investigation time", legacy: "Days to weeks per case", purple8: "Full chain traversal on demand" },
  { item: "Cross-business-line", legacy: "Manual coordination and email threads", purple8: "Single cross-tenant graph query" },
  { item: "SAR narrative", legacy: "Manual investigator write-up", purple8: "Generated from graph evidence" },
  { item: "Audit trail", legacy: "Reconstructed from logs", purple8: "Immutable, every edge timestamped at write time" },
];

const targetCustomers = [
  {
    icon: "🏦",
    title: "Tier 1 & Tier 2 Banks",
    desc: "Replace the financial crime stack, including transaction monitoring, case management, sanctions screening, and SAR workflow, or deploy Purple8 as the investigation and intelligence layer on top of existing systems. The entry point is wherever investigator time is most wasted.",
  },
  {
    icon: "💼",
    title: "Asset Managers & Prime Brokers",
    desc: "Market surveillance, beneficial ownership resolution, and cross-business-line intelligence in a single platform. The same graph that traces a sanctions chain in retail banking surfaces coordinated short-selling in the prime brokerage book.",
  },
  {
    icon: "💳",
    title: "Payments & Fintech",
    desc: "Fraud ring detection and real-time transaction screening at API speed. The graph engine runs in-process with no external database and no network hop, giving sub-millisecond entity resolution at transaction throughput.",
  },
  {
    icon: "🏛️",
    title: "Regulators & FIUs",
    desc: "Financial Intelligence Units receive SARs from hundreds of institutions. Purple8 can model the national transaction network as a graph for systemic financial crime intelligence that no single institution's data can provide.",
  },
  {
    icon: "⚖️",
    title: "Compliance Technology Vendors",
    desc: "Embed Purple8 as the graph intelligence engine inside your existing compliance platform. Replace the relationship layer of your rules engine with a graph traversal API. Your clients get relationship-aware alerts and you get a technical moat that takes years to replicate.",
  },
];

export default function FinancialCrimeIntelligencePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main id="main-content" className="bg-[#0a0a0f] pt-16">

        {/* Breadcrumb */}
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-8">
          <nav className="flex items-center gap-2 text-xs text-zinc-600">
            <Link href="/" className="hover:text-zinc-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products/purple8/" className="hover:text-zinc-400 transition-colors">Purple8 Hyper Graph</Link>
            <span>/</span>
            <span className="text-zinc-400">Financial Crime Intelligence</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden py-20">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-48 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-purple-900/12 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-700/40 bg-purple-950/40 px-4 py-1.5 text-sm font-medium text-purple-200">
              <span className="text-base">🛡️</span>
              Purple8 Hyper Graph · Financial Crime · Compliance Intelligence
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Financial crime that hides{" "}
              <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                in the relationships.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
              Rules engines fire on transactions. Money launderers move through relationships:
              4-hop sanctions chains, synthetic identity rings, coordinated trading across
              business lines, beneficial ownership buried in offshore structures. Purple8
              models the entire entity network as a graph. The pattern a rule can never
              see is a single traversal query.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-lg mx-auto">
              {[
                { stat: "4-hop", label: "Sanctions chain traced instantly" },
                { stat: "95%", label: "False positives eliminated" },
                { stat: "14→1", label: "Enterprise services replaced" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-purple-900/40 bg-purple-950/20 px-4 py-4 text-center">
                  <p className="text-2xl font-bold text-purple-300">{s.stat}</p>
                  <p className="mt-1 text-xs text-zinc-500 leading-tight">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="/register/"
                className="rounded-full bg-purple-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-purple-900/40 transition-colors hover:bg-purple-500"
              >
                Request a demo
              </a>
              <a href="/quickstart/" className="text-base font-semibold text-zinc-300 transition-colors hover:text-white">
                See the technical architecture →
              </a>
            </div>
          </div>
        </section>

        {/* The core problem */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">The problem</p>
                <h2 className="mt-3 text-3xl font-bold text-white">Rules look at transactions. Crime moves through relationships.</h2>
                <p className="mt-5 text-zinc-400 leading-relaxed">
                  Every financial institution runs a rules engine. Rules fire on individual
                  transactions: amount thresholds, velocity, jurisdiction flags. Financial
                  criminals have understood this for thirty years. They structure below thresholds,
                  route through multiple hops, use nominee entities, and operate across
                  business lines precisely because rules cannot follow them there.
                </p>
                <p className="mt-4 text-zinc-400 leading-relaxed">
                  The 95% false positive rate that plagues every AML programme is not a tuning
                  problem. It is a structural one. Rules were never designed to see relationships,
                  and relationships are where the crime is.
                </p>
                <p className="mt-4 text-zinc-400 leading-relaxed">
                  Purple8 is not a better rules engine. Every account, customer, transaction,
                  beneficial owner, device, and watchlist entry is a node in the graph.
                  Financial crime detection is a traversal query.
                </p>
              </div>
              <div className="space-y-3">
                {[
                  { label: "CUSTOMER → ACCOUNT", detail: "High-risk retail client" },
                  { label: "ACCOUNT → SHELL_CO", detail: "Transfer to BVI entity" },
                  { label: "SHELL_CO → OFFSHORE_ACCT", detail: "Wire to Cayman LP" },
                  { label: "OFFSHORE_ACCT → SDN_ENTITY", detail: "2-hop from OFAC sanctioned person" },
                  { label: "SDN_ENTITY → VOLKOV_N", detail: "Nikolai Volkov — OFAC SDN list" },
                ].map((row, i) => (
                  <div key={row.label} className="flex items-start gap-4 rounded-xl border border-white/8 bg-white/[0.02] px-5 py-3">
                    <span className="shrink-0 text-xs font-mono text-zinc-600 mt-0.5 w-5">{i + 1}</span>
                    <code className="shrink-0 text-xs font-mono text-purple-400 mt-0.5">{row.label}</code>
                    <p className="text-sm text-zinc-400">{row.detail}</p>
                  </div>
                ))}
                <p className="text-xs text-zinc-600 pt-1">A rules engine sees transaction 1. Purple8 traverses all 5 hops and traces the full sanctions chain in a single query.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Patterns */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">Solution patterns</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Ten financial crime typologies on one graph engine.</h2>
              <p className="mt-4 max-w-2xl mx-auto text-zinc-400">
                Each pattern below is a graph query, not a separately configured rule or a new product integration.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {patterns.map((p) => (
                <div key={p.number} className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 hover:border-purple-700/40 transition-colors">
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-2xl">{p.icon}</span>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-mono text-purple-700">{p.number}</span>
                        <h3 className="text-base font-semibold text-white">{p.title}</h3>
                      </div>
                      <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest">{p.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-4">{p.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-purple-950/50 border border-purple-900/40 px-2.5 py-0.5 text-xs text-purple-300">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">Side by side</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Rules engine vs. graph intelligence</h2>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-white/8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/8">
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest text-zinc-500">Capability</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest text-zinc-500">Rules Engine / Legacy AML</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest text-purple-400">Purple8 ✦</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, i) => (
                    <tr key={row.item} className={i % 2 === 0 ? "bg-white/[0.01]" : ""}>
                      <td className="px-6 py-4 font-medium text-zinc-300">{row.item}</td>
                      <td className="px-6 py-4 text-zinc-500">{row.legacy}</td>
                      <td className="px-6 py-4 text-purple-300 font-medium">{row.purple8}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">Who uses this</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Built for every institution that has a financial crime problem</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {targetCustomers.map((tc) => (
                <div key={tc.title} className="rounded-2xl border border-white/8 bg-white/[0.02] p-6">
                  <div className="text-3xl mb-4">{tc.icon}</div>
                  <h3 className="text-base font-semibold text-white mb-2">{tc.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{tc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-white/5 py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">FAQ</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Questions from compliance and technology teams</h2>
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

        {/* Related capabilities */}
        <section className="border-t border-white/5 py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 mb-6">Capabilities used in this workflow</p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {[
                { href: "/products/purple8/rag-pipeline/", label: "GraphRAG", desc: "AI explanations citing real graph evidence" },
                { href: "/products/purple8/workflow-orchestration/", label: "Workflow Orchestration", desc: "SAR filing state machine with HITL gates" },
                { href: "/products/purple8/agentic-process-automation/", label: "Agentic Process Automation", desc: "Alert triage to FIU escalation, automated" },
                { href: "/products/purple8/scenario-simulation/", label: "Scenario Simulation", desc: "Network stress-testing and freeze simulation" },
                { href: "/products/purple8/quantum-optimisation/", label: "Quantum Optimisation", desc: "Optimal asset freeze under investigation constraints" },
                { href: "/products/purple8/multi-agent-systems/", label: "Multi-Agent Systems", desc: "Parallel investigation across business lines" },
              ].map((cap) => (
                <Link key={cap.href} href={cap.href} className="group rounded-xl border border-white/8 bg-white/[0.02] px-5 py-4 transition-colors hover:border-purple-700/50">
                  <p className="text-sm font-semibold text-purple-300 group-hover:text-purple-200">{cap.label} →</p>
                  <p className="mt-1 text-xs text-zinc-500">{cap.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-white/5 py-20 text-center">
          <div className="mx-auto max-w-2xl px-4">
            <h2 className="text-3xl font-bold text-white">See a 4-hop sanctions chain traced live</h2>
            <p className="mt-4 text-zinc-400">
              The demo runs on real IBM AML data across three business lines.
              It takes 20 minutes and shows every pattern on this page in action.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="/register/"
                className="rounded-full bg-purple-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-purple-900/40 transition-colors hover:bg-purple-500"
              >
                Request a demo
              </a>
              <a href="/products/purple8/" className="text-base font-semibold text-zinc-300 transition-colors hover:text-white">
                Explore Purple8 Hyper Graph →
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
