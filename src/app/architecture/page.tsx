import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { pageMetadata } from "@/lib/seo";
import RefArchDiagrams from "@/components/RefArchDiagrams";
import AirGapArch from "@/components/AirGapArch";
import CollapsibleObjections from "@/components/CollapsibleObjections";
import BlueGreenSection from "@/components/BlueGreenSection";
import HonestRisks from "@/components/HonestRisks";

const DemoRequestForm = dynamic(() => import("@/components/DemoRequestForm"));

export const metadata: Metadata = pageMetadata({
  title: "Consolidith Architecture",
  description:
    "Monolith, Microservices, Modulith: and now Consolidith. Purple8 introduces a new class of AI backend architecture that eliminates the distributed stack entirely, without the trade-offs of what came before.",
  path: "/architecture",
});

/* ─── Data ─────────────────────────────────────────────────────────────── */

const eras = [
  {
    era: "1990s – 2000s",
    name: "Monolith",
    tagline: "One codebase, one database, one process.",
    colour: "border-zinc-700 text-zinc-300",
    dot: "bg-zinc-500",
    pros: ["Simple to deploy", "Easy to debug locally", "No network latency"],
    cons: [
      "One change risks the whole system",
      "Single DB becomes a bottleneck",
      "Hard to scale individual parts",
      "Tech-debt compounds fast",
    ],
  },
  {
    era: "2010s",
    name: "Microservices",
    tagline: "Split everything. Scale anything. Pay for all of it.",
    colour: "border-blue-800 text-blue-300",
    dot: "bg-blue-500",
    pros: [
      "Independent deploy per service",
      "Scale each service separately",
      "Technology diversity possible",
    ],
    cons: [
      "8–12+ services to run for one app",
      "Distributed tracing is a project in itself",
      "Network latency on every call",
      "Eventual consistency nightmares",
      "Operational surface multiplied by N services",
    ],
  },
  {
    era: "2020s",
    name: "Modulith",
    tagline: "One deployable unit with modular internals, better structured than a traditional monolith.",
    colour: "border-violet-800 text-violet-300",
    dot: "bg-violet-500",
    pros: [
      "Single deployment unit",
      "Clean internal boundaries",
      "No distributed transactions",
      "Easier to reason about",
    ],
    cons: [
      "Still a general-purpose database; vector, graph, and workflow capabilities bolt on separately",
      "No AI/agent-native interface",
      "Memory grows with corpus size",
      "Security and encryption still add-ons",
    ],
  },
  {
    era: "2026 →",
    name: "Consolidith",
    tagline: "One process. Complete stack. Designed for AI from the ground up.",
    colour: "border-purple-600 text-purple-300",
    dot: "bg-purple-500",
    highlight: true,
    pros: [
      "Single binary, zero external service deps",
      "Multi-model: graph, vector, document and full-text search in one engine",
      "MCP-native: AI agents are first-class clients",
      "Journey Engine replaces Airflow, Temporal and LangGraph",
      "Hardware-bounded memory; the same binary runs on a laptop or a production server",
      "AI evaluation built in: every model decision is observable and queryable",
      "Autonomous SOC agent: threat detection and containment run in-process",
      "Encryption, RBAC, and security monitoring on by default from day one",
      "Replaces more than 20 services that would otherwise be separate infrastructure",
    ],
    cons: [
      "Horizontal sharding requires replication (3 nodes for HA, not 36)",
      "All capability updates ship in one release cadence",
    ],
  },
];

const comparisonRows = [
  {
    trait: "Deployment unit",
    monolith: "Single process",
    micro: "Dozens of services",
    modulith: "Single process",
    consolidith: "Single process",
  },
  {
    trait: "Internal structure",
    monolith: "Often tangled",
    micro: "Isolated per service",
    modulith: "Modular",
    consolidith: "Modular + vertical domains",
  },
  {
    trait: "Operational complexity",
    monolith: "Low",
    micro: "Very high",
    modulith: "Low",
    consolidith: "Low",
  },
  {
    trait: "Data model",
    monolith: "Single DB",
    micro: "Polyglot (each service owns its DB)",
    modulith: "Single DB",
    consolidith: "Multi-model unified engine",
  },
  {
    trait: "Vector / graph search",
    monolith: "External add-on",
    micro: "Separate vector + graph services",
    modulith: "External add-on",
    consolidith: "Native, in-process",
  },
  {
    trait: "Workflow orchestration",
    monolith: "None / hand-rolled",
    micro: "Separate (Airflow, Temporal)",
    modulith: "None / hand-rolled",
    consolidith: "Embedded Journey Engine",
  },
  {
    trait: "AI / agent interface",
    monolith: "Bolted on",
    micro: "Bolted on per service",
    modulith: "Bolted on",
    consolidith: "MCP-native (82 tools, day one)",
  },
  {
    trait: "Security (auth, encryption)",
    monolith: "Add later",
    micro: "Add per service",
    modulith: "Add later",
    consolidith: "In-process, on by default",
  },
  {
    trait: "Memory model",
    monolith: "Grows with data",
    micro: "Unbounded per service",
    modulith: "Grows with data",
    consolidith: "Hardware-bounded memory management",
  },
  {
    trait: "AI output evaluation",
    monolith: "External tool or none",
    micro: "Separate eval service (LangSmith, Arize)",
    modulith: "External tool or none",
    consolidith: "Built in: every AI decision stored as queryable graph edges",
  },
  {
    trait: "Security operations (SOC)",
    monolith: "External SIEM or none",
    micro: "Separate SIEM / threat detection",
    modulith: "External SIEM or none",
    consolidith: "Autonomous SOC agent that detects and contains threats in-process",
  },
  {
    trait: "Services replaced",
    monolith: "None",
    micro: "None; it is the services",
    modulith: "None",
    consolidith: "20+ external services",
  },
  {
    trait: "Runs on a laptop",
    monolith: "✓",
    micro: "✗ (12 Docker containers)",
    modulith: "✓",
    consolidith: "✓",
  },
];

const replacements = [
  {
    external: "AI evaluation platform (LangSmith / Arize / Weights & Biases)",
    purple8: "Evaluation built in: every AI call, RAG retrieval, and agent decision is a queryable graph edge, stored forever",
  },
  {
    external: "Security operations / SIEM (Splunk / Microsoft Sentinel / Datadog Security)",
    purple8: "Autonomous SOC agent: anomaly detection, behavioural rules, and automated containment all run inside the same process as your data",
  },
  {
    external: "Relational database (PostgreSQL / MongoDB)",
    purple8: "Unified storage engine for structured data, documents, and relationships in one place",
  },
  {
    external: "Graph database (Neo4j / Amazon Neptune)",
    purple8: "Native graph engine: traverse relationships at query time with no separate service required",
  },
  {
    external: "Vector database (Pinecone / Weaviate / pgvector)",
    purple8: "Built-in vector search with semantic similarity and hybrid retrieval out of the box",
  },
  {
    external: "RAG pipeline (LangChain / LlamaIndex)",
    purple8: "Hybrid RAG built in with graph-guided retrieval and no orchestration framework required",
  },
  {
    external: "Document intelligence (Unstructured.io / Azure Document Intelligence)",
    purple8: "DocIntel: 70 formats parsed, entities extracted, and pushed directly to the graph",
  },
  {
    external: "Workflow engine (Airflow / Temporal / LangGraph)",
    purple8: "Journey Engine: multi-stage workflows with SLA enforcement and human approval gates",
  },
  {
    external: "Audit trail & tracing (LangSmith / Datadog)",
    purple8: "Immutable audit log: every action, agent call, and decision stored as graph edges",
  },
  {
    external: "Identity & access management (Auth0 / Keycloak)",
    purple8: "Built-in authentication with JWT, API keys, and four-tier role-based access control",
  },
  {
    external: "Secrets & encryption (HashiCorp Vault / AWS KMS)",
    purple8: "Envelope encryption with AES-256 at rest, key management built in and on by default",
  },
  {
    external: "Full-text search (Elasticsearch / OpenSearch)",
    purple8: "Native full-text search with keyword and semantic search from the same query interface",
  },
  {
    external: "Threat detection (Splunk / Microsoft Sentinel)",
    purple8: "Security monitoring built in with anomaly detection and automated containment in-process",
  },
  {
    external: "Observability (Prometheus / Grafana dashboards)",
    purple8: "Single /metrics endpoint: one dashboard, one alert surface, no agents to install",
  },
];

/* ─── Page ──────────────────────────────────────────────────────────────── */

export default function ArchitecturePage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-[#0a0a0f] pt-16">

        {/* ── Hero ── */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-32 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-purple-900/12 blur-3xl" />
          </div>
          <div className="relative z-10 mx-auto max-w-5xl px-4 py-28 sm:px-6 sm:py-36 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
              Architecture
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Monolith. Microservices. Modulith.
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                Now: Consolidith.
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-zinc-400">
              Every architecture pattern before Consolidith made a trade-off. We studied all of them
              and asked a different question: what if you didn&apos;t have to choose? What if the
              right answer was a single process that was deliberately complete?
            </p>
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-purple-700/40 bg-purple-950/40 px-4 py-1.5 text-sm font-medium text-purple-200">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-400" />
              </span>
              Consolidith · coined by Purple8, August 2026
            </div>
          </div>
        </section>

        {/* ── The problem: category cards with logos ── */}
        <section className="border-t border-purple-900/20 bg-[#0d0d16]">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
              The problem
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              A typical AI backend today
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">
              Building one AI application currently means running, operating, and paying for all of
              this before you write a single line of product code. Each box below is a separate
              service with its own infrastructure, team, and on-call rotation.
            </p>

            {/* Category cards — each shows the category + all mainstream logos */}
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

              {/* Relational / Document databases */}
              <div className="rounded-xl border border-blue-900/40 bg-[#0f0f1a] p-5">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-blue-400">Relational &amp; Document Storage</p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  {/* PostgreSQL */}
                  <div className="flex items-center gap-1.5" title="PostgreSQL">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#4169E1"><path d="M17.128 0a10.134 10.134 0 0 0-2.755.403l-.063.02A10.922 10.922 0 0 0 12.6.258C11.422.238 10.41.524 9.594 1 8.79.721 7.122.24 5.364.336 4.14.403 2.804.775 1.814 1.82.827 2.865.305 4.482.415 6.682c.04.795.203 1.602.49 2.329l.095.233c.264.633.693 1.109 1.122 1.423.215.157.424.271.612.337.183.065.32.082.38.078.114-.009.228-.05.312-.148.087-.1.136-.243.135-.45l-.013-1.064.828.437.107.274c.181.472.411.794.645 1.008.115.106.226.18.324.222a.64.64 0 0 0 .16.05c-.013.11-.021.223-.021.339v.738c-.2.089-.393.171-.592.176-.33.009-.762-.115-1.048-.608l-.002-.003c-.313-.54-.634-.926-1.054-1.141-.107-.056-.7-.38-.663.237.021.34.306.627.508.827l.028.028c.243.25.496.605.702 1.215l.043.199c.211.797.868 1.364 1.614 1.396l.067.001c.422 0 .82-.163 1.11-.44v.302l-.001.27c-.001.157-.001.29 0 .408-.78.14-1.459.692-1.764 1.605-.158.471-.195.949-.19 1.457.014.87.146 1.905.324 3.02.163 1.043.38 1.906.689 2.595.138.308.295.577.487.802.195.23.444.427.762.518.145.042.298.063.457.063.323 0 .669-.086.998-.242.67-.318 1.31-.932 1.706-1.757.397-.826.516-1.777.29-2.677-.072-.29-.181-.575-.29-.847l-.143-.356c-.125-.329-.206-.581-.243-.807-.034-.208-.026-.375.023-.538.096-.322.344-.601.728-.826.384-.226.906-.395 1.546-.55l.185-.045.165-.04c.612-.15 1.144-.28 1.546-.374.401-.094.686-.165.833-.177a.81.81 0 0 0 .06-.007c.138-.017.265-.035.385-.054.27-.042.518-.088.76-.146.484-.117.925-.271 1.337-.51.24-.138.497-.178.73-.13.24.05.453.193.607.417l.08.112.12.157c.463.586.92 1.025 1.57 1.027h.008c.55 0 1.004-.3 1.278-.678.235-.332.366-.756.39-1.182.013-.206.002-.414-.026-.606l-.055-.323c-.09-.494-.18-.988-.176-1.513.003-.344.046-.695.18-1.08.132-.378.362-.794.744-1.24.205-.241.439-.492.666-.756.226-.263.446-.54.621-.838.173-.296.3-.619.316-.972.017-.363-.093-.762-.39-1.165A2.97 2.97 0 0 0 20.791 7c-.35-.14-.75-.21-1.16-.223-.703-.02-1.424.15-1.978.38l-.049.021c-.46.199-.84.46-1.133.701-.079-.518-.194-1.036-.354-1.517l-.013-.04C15.134 3.78 13.53 1.72 10.65.617L10.58.59l-.13-.041A10.134 10.134 0 0 0 8.87.403 10.134 10.134 0 0 0 17.128 0z"/></svg>
                    <span className="text-xs text-zinc-400">PostgreSQL</span>
                  </div>
                  {/* MongoDB */}
                  <div className="flex items-center gap-1.5" title="MongoDB">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#47A248"><path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0 1 11.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 0 0 3.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"/></svg>
                    <span className="text-xs text-zinc-400">MongoDB</span>
                  </div>
                  {/* MySQL */}
                  <div className="flex items-center gap-1.5" title="MySQL">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#4479A1"><path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.062-.14-.015-.04-.047-.08-.2-.151zm-8.366 1.11c-.015.017-.022.03-.022.042 0 .007.003.013.007.019.005.007.01.014.016.02l.002.002c.006.005.01.009.015.013.005.004.01.008.018.013.006.004.012.006.017.008l.005.002c.038.017.08.024.127.024.057 0 .102-.01.133-.028l.008-.006c.007-.005.013-.01.02-.016.013-.01.025-.023.037-.037l.011-.013c.008-.01.015-.021.022-.033l.008-.013c.008-.013.016-.027.023-.043l.002-.005.014-.032.002-.005.001-.002c.007-.022.013-.044.017-.067l.001-.005c.005-.028.008-.059.008-.091 0-.032-.003-.063-.008-.09l-.001-.005c-.004-.023-.01-.045-.017-.067l-.001-.002-.002-.005c-.007-.016-.015-.03-.023-.043l-.008-.013a.534.534 0 0 0-.022-.033l-.011-.013a.483.483 0 0 0-.037-.037c-.007-.006-.013-.011-.02-.016l-.008-.006c-.03-.018-.076-.028-.133-.028-.047 0-.089.007-.127.024l-.005.002a.247.247 0 0 0-.017.008c-.008.005-.013.009-.018.013-.005.004-.009.008-.015.013l-.002.002c-.006.006-.011.013-.016.02-.004.006-.007.012-.007.019 0 .012.007.025.022.042zM5.003 8.65l-.068.002c-.095.003-.19.01-.285.02 0 0-.28.03-.562.114C3.526 8.947 3.05 9.17 2.666 9.5c-.383.328-.694.78-.895 1.394-.2.614-.3 1.387-.3 2.337 0 1.254.177 2.223.53 2.907.353.684.86 1.026 1.523 1.026.41 0 .756-.093 1.04-.28.285-.185.517-.446.7-.783.18-.337.316-.723.407-1.158.09-.435.136-.898.136-1.388v-4.3c0-.126-.009-.234-.027-.322a1.03 1.03 0 0 0-.073-.247c-.036-.081-.08-.153-.136-.213A.585.585 0 0 0 5.45 8.8c-.15-.1-.293-.15-.448-.15zm13.69.14c-.232 0-.456.046-.674.14a2.61 2.61 0 0 0-.597.398 3.2 3.2 0 0 0-.473.606 4.44 4.44 0 0 0-.34.77l-.01.034c-.1.307-.154.648-.16 1.022v.064c0 .035.002.07.005.103v.012c.027.512.133.958.317 1.338.185.38.43.668.738.864.308.196.658.294 1.05.294a2.12 2.12 0 0 0 1.05-.268c.318-.179.585-.437.802-.775.218-.338.385-.745.502-1.22.117-.476.175-1.014.175-1.613 0-.547-.054-1.02-.162-1.418a3.217 3.217 0 0 0-.46-1.023 2.091 2.091 0 0 0-.736-.638 2.082 2.082 0 0 0-.985-.26l-.048.003zM0 .1v23.8h24V.1H0zm21.77 18.9c-.198 0-.386-.033-.564-.1a1.64 1.64 0 0 1-.45-.27l.2-.3c.095.09.203.162.324.216.12.054.246.081.38.081.148 0 .263-.031.344-.093a.295.295 0 0 0 .122-.249c0-.07-.02-.128-.062-.173a.578.578 0 0 0-.16-.119 2.2 2.2 0 0 0-.22-.1 6.128 6.128 0 0 1-.257-.116 2.01 2.01 0 0 1-.236-.147.725.725 0 0 1-.176-.21.61.61 0 0 1-.07-.302c0-.127.03-.24.088-.34a.756.756 0 0 1 .237-.245.979.979 0 0 1 .327-.147 1.38 1.38 0 0 1 .363-.05c.18 0 .347.028.503.085.156.057.29.135.402.234l-.186.288a1.37 1.37 0 0 0-.297-.183 1.024 1.024 0 0 0-.398-.078.637.637 0 0 0-.325.08.254.254 0 0 0-.136.233c0 .063.018.117.055.163.036.046.083.086.14.12.056.034.118.066.185.094.066.028.133.057.2.086.072.032.143.067.212.104.07.037.132.08.187.13.056.051.1.112.133.182.033.07.05.152.05.246 0 .127-.028.242-.084.344a.788.788 0 0 1-.226.257.994.994 0 0 1-.33.162 1.342 1.342 0 0 1-.393.057zm-2.6-.03a.926.926 0 0 1-.367-.073.758.758 0 0 1-.278-.207.963.963 0 0 1-.175-.32 1.333 1.333 0 0 1-.062-.416v-.009c0-.148.02-.287.062-.416.04-.129.099-.241.175-.337a.78.78 0 0 1 .278-.223.926.926 0 0 1 .367-.073c.133 0 .25.022.35.066.1.044.186.102.258.174l-.205.237a.713.713 0 0 0-.188-.127.506.506 0 0 0-.215-.046.524.524 0 0 0-.227.05.533.533 0 0 0-.18.143.677.677 0 0 0-.12.22.89.89 0 0 0-.043.283v.012c0 .105.014.2.043.283.029.083.07.155.12.215.05.06.11.107.18.14.07.033.146.05.227.05.077 0 .149-.013.215-.04.066-.027.13-.07.19-.13l.205.224a.927.927 0 0 1-.285.19 1.005 1.005 0 0 1-.35.072zm-1.63 0h-.37V17.2h.37v1.77zm-1.22-1.77h.37v1.77h-.315l-.9-1.155v1.155h-.37V17.2h.34l.876 1.123V17.2zm-2.3 1.77h-1.09V17.2h1.09v.323h-.72v.42h.64v.315h-.64v.395h.72v.318zm-2.01.03c-.177 0-.344-.036-.5-.107-.155-.072-.29-.17-.404-.298a1.38 1.38 0 0 1-.265-.456 1.71 1.71 0 0 1-.095-.578v-.012c0-.207.032-.397.095-.57.063-.173.15-.323.262-.45.112-.128.245-.228.4-.3.153-.072.32-.108.5-.108.157 0 .296.02.417.06.12.04.233.098.338.175l-.205.297a1.074 1.074 0 0 0-.263-.14.825.825 0 0 0-.293-.055c-.118 0-.225.025-.32.075a.735.735 0 0 0-.247.21.998.998 0 0 0-.16.314 1.296 1.296 0 0 0-.056.382v.012c0 .14.018.27.056.39.037.12.09.225.16.316.068.09.15.163.245.216.095.054.2.08.314.08.102 0 .198-.02.286-.06.089-.04.17-.094.245-.163V18.3H13.7v-.31h.902v.768a1.78 1.78 0 0 1-.49.28 1.544 1.544 0 0 1-.573.11zm-2.618-.03h-.37V17.2h.37v.72l.73-.72h.468l-.786.758.815 1.013h-.474l-.605-.78-.148.143v.637zM6.8 19h-.37V17.2h.37v.72l.73-.72h.468l-.786.758.814 1.013h-.474l-.605-.78-.148.143V19zm-1.435.03c-.178 0-.344-.037-.5-.108a1.258 1.258 0 0 1-.404-.298 1.38 1.38 0 0 1-.265-.456 1.71 1.71 0 0 1-.095-.578v-.012c0-.207.032-.397.095-.57.063-.173.15-.323.262-.45.11-.128.244-.228.4-.3.154-.072.32-.108.5-.108.157 0 .296.02.417.06.12.04.233.098.338.175l-.205.296a1.074 1.074 0 0 0-.263-.14.825.825 0 0 0-.293-.055c-.118 0-.224.025-.32.075a.735.735 0 0 0-.246.21.998.998 0 0 0-.16.314 1.296 1.296 0 0 0-.057.382v.012c0 .14.02.27.057.39.037.12.09.225.16.316.068.09.15.163.245.216.095.054.2.08.314.08.102 0 .198-.02.287-.06a.93.93 0 0 0 .244-.163V18.3H5.3v-.31h.902v.768a1.78 1.78 0 0 1-.49.28 1.544 1.544 0 0 1-.573.11zm12.8-9.65c-.053-.158-.118-.302-.193-.432a1.938 1.938 0 0 0-.28-.35 1.195 1.195 0 0 0-.37-.24 1.126 1.126 0 0 0-.46-.09c-.194 0-.366.048-.515.143a1.13 1.13 0 0 0-.365.408c-.096.175-.168.383-.215.624a3.966 3.966 0 0 0-.07.752c0 .3.026.57.077.808.05.238.126.44.225.607.1.167.222.295.366.385.145.09.31.135.494.135.187 0 .354-.047.5-.14.148-.093.272-.225.374-.394.101-.17.177-.374.227-.61.05-.238.075-.503.075-.793 0-.262-.02-.496-.06-.703a2.98 2.98 0 0 0-.01-.11zM5.445 9.83c-.054-.16-.117-.306-.19-.44a1.96 1.96 0 0 0-.27-.36 1.125 1.125 0 0 0-.36-.238 1.105 1.105 0 0 0-.453-.086c-.18 0-.345.046-.493.138a1.133 1.133 0 0 0-.363.4c-.097.173-.17.38-.22.62-.05.24-.075.505-.075.795v.01c0 .297.026.564.078.8.052.237.128.44.228.607.1.167.22.296.364.386.143.09.307.136.49.136.186 0 .353-.046.5-.138.148-.093.272-.224.373-.394.1-.17.177-.374.228-.61.05-.24.076-.503.076-.796 0-.26-.02-.493-.06-.697a2.795 2.795 0 0 0-.01-.113z"/></svg>
                    <span className="text-xs text-zinc-400">MySQL</span>
                  </div>
                  {/* Redis */}
                  <div className="flex items-center gap-1.5" title="Redis">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#FF4438"><path d="M10.5 7.5L12 6l1.5 1.5L12 9zm-4 4L8 10l1.5 1.5L8 13zM18.5 11.5L20 10l1.5 1.5L20 13zM0 13.5L1.5 12 3 13.5 1.5 15zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21.6c-5.302 0-9.6-4.298-9.6-9.6S6.698 2.4 12 2.4 21.6 6.698 21.6 12s-4.298 9.6-9.6 9.6zM8.4 12l3.6 3.6 3.6-3.6-3.6-3.6z"/></svg>
                    <span className="text-xs text-zinc-400">Redis</span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-zinc-600">Separate server, separate ops, separate on-call</p>
              </div>

              {/* Graph databases */}
              <div className="rounded-xl border border-green-900/40 bg-[#0f0f1a] p-5">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-green-400">Graph Database</p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1.5" title="Neo4j">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#4581C3"><path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm1.198 16.63c-.493.205-1.01.289-1.584.289-1.489 0-2.678-.534-3.575-1.603-.896-1.069-1.344-2.462-1.344-4.178 0-1.8.47-3.244 1.41-4.335.939-1.091 2.19-1.636 3.75-1.636.513 0 1.008.074 1.485.222v1.755c-.424-.228-.867-.342-1.33-.342-1.009 0-1.817.369-2.424 1.108s-.91 1.735-.91 2.988c0 1.257.285 2.236.856 2.937.57.701 1.364 1.052 2.38 1.052.502 0 1.003-.123 1.503-.37l-.217 2.113z"/></svg>
                    <span className="text-xs text-zinc-400">Neo4j</span>
                  </div>
                  <div className="flex items-center gap-1.5" title="Amazon Neptune">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#8C4FFF"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                    <span className="text-xs text-zinc-400">Neptune</span>
                  </div>
                  <div className="flex items-center gap-1.5" title="ArangoDB">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 opacity-80" fill="#DDE072"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 2c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm0 2a6 6 0 1 0 0 12A6 6 0 0 0 12 6z"/></svg>
                    <span className="text-xs text-zinc-400">ArangoDB</span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-zinc-600">Separate server, separate ops, separate on-call</p>
              </div>

              {/* Vector databases */}
              <div className="rounded-xl border border-pink-900/40 bg-[#0f0f1a] p-5">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-pink-400">Vector / Embedding Store</p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1.5" title="Pinecone">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#000000" style={{filter:"invert(1) brightness(0.8)"}}><path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm5.207 16.574l-1.035-.598-.34.196-.34-.196-1.035.598-.34-.196v-.796l.34-.196.34.196 1.035-.598.34.196.34-.196 1.035.598V16.378l-.34.196zm0-3.196l-1.035-.597-.34.196-.34-.196-1.035.597-.34-.196v-.796l.34-.196.34.196 1.035-.597.34.196.34-.196 1.035.597v.796l-.34.196zm-6.414 3.196l-1.035-.598-.34.196-.34-.196-1.035.598-.34-.196v-.796l.34-.196.34.196 1.035-.598.34.196.34-.196 1.035.598V16.378l-.34.196zm0-3.196l-1.035-.597-.34.196-.34-.196-1.035.597-.34-.196v-.796l.34-.196.34.196 1.035-.597.34.196.34-.196 1.035.597v.796l-.34.196z"/></svg>
                    <span className="text-xs text-zinc-400">Pinecone</span>
                  </div>
                  <div className="flex items-center gap-1.5" title="Qdrant">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#DC244C"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.236L20 8.5v7L12 19.764 4 15.5v-7L12 4.236z"/></svg>
                    <span className="text-xs text-zinc-400">Qdrant</span>
                  </div>
                  <div className="flex items-center gap-1.5" title="Weaviate">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#3DDC84"><path d="M12 3L2 8.5v7L12 21l10-5.5v-7L12 3zm0 2.236L20 9.5v5L12 19 4 14.5v-5L12 5.236z"/></svg>
                    <span className="text-xs text-zinc-400">Weaviate</span>
                  </div>
                  <div className="flex items-center gap-1.5" title="Milvus">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#00A1EA"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
                    <span className="text-xs text-zinc-400">Milvus</span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-zinc-600">Separate server, separate ops, separate on-call</p>
              </div>

              {/* RAG / AI orchestration */}
              <div className="rounded-xl border border-yellow-900/40 bg-[#0f0f1a] p-5">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-yellow-400">RAG &amp; AI Orchestration</p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1.5" title="LangChain">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#7FC8FF"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm-1 13V9l6 3-6 3z"/></svg>
                    <span className="text-xs text-zinc-400">LangChain</span>
                  </div>
                  <div className="flex items-center gap-1.5" title="LlamaIndex">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#8B5CF6"><path d="M12 2C8 2 5 5 5 9c0 3 1.5 5.5 4 7v4h6v-4c2.5-1.5 4-4 4-7 0-4-3-7-7-7zm0 2c2.8 0 5 2.2 5 5s-2.2 5-5 5-5-2.2-5-5 2.2-5 5-5z"/></svg>
                    <span className="text-xs text-zinc-400">LlamaIndex</span>
                  </div>
                  <div className="flex items-center gap-1.5" title="HuggingFace">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#FFD21E"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-2 13c-.552 0-1-.672-1-1.5S9.448 12 10 12s1 .672 1 1.5S10.552 15 10 15zm4 0c-.552 0-1-.672-1-1.5S13.448 12 14 12s1 .672 1 1.5S14.552 15 14 15zm2-4H8l1-4h6l1 4z"/></svg>
                    <span className="text-xs text-zinc-400">HuggingFace</span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-zinc-600">Separate server, separate ops, separate on-call</p>
              </div>

              {/* Workflow engines */}
              <div className="rounded-xl border border-orange-900/40 bg-[#0f0f1a] p-5">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-orange-400">Workflow Orchestration</p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1.5" title="Apache Airflow">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#017CEE"><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 2a8 8 0 1 1 0 16A8 8 0 0 1 12 4zm0 2a6 6 0 1 0 0 12A6 6 0 0 0 12 6zm0 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/></svg>
                    <span className="text-xs text-zinc-400">Airflow</span>
                  </div>
                  <div className="flex items-center gap-1.5" title="Temporal">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#D13F38"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                    <span className="text-xs text-zinc-400">Temporal</span>
                  </div>
                  <div className="flex items-center gap-1.5" title="Apache Kafka">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 opacity-90" fill="#ffffff"><path d="M12 2.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm0 16a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM5 10.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-7-2v3m0 3v3m-5.5-2.5l2.5-2m6 0l2.5 2m-11-2l-2.5-2m11-0l2.5-2" stroke="#ffffff" strokeWidth="1.5" fill="none"/></svg>
                    <span className="text-xs text-zinc-400">Kafka</span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-zinc-600">Separate server, separate ops, separate on-call</p>
              </div>

              {/* Auth / Identity */}
              <div className="rounded-xl border border-red-900/40 bg-[#0f0f1a] p-5">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-red-400">Identity &amp; Access Management</p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1.5" title="Auth0">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#EB5424"><path d="M21.98 7.448L19.62 0H4.347L2 7.448c-1.352 4.312.03 9.206 3.815 12.015L12.007 24l6.165-4.537c3.755-2.81 5.182-7.688 3.808-12.015zm-9.973 9.005l-3.037-2.21-1.854-5.71H12v7.92z"/></svg>
                    <span className="text-xs text-zinc-400">Auth0</span>
                  </div>
                  <div className="flex items-center gap-1.5" title="Okta">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#007DC1"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12z"/></svg>
                    <span className="text-xs text-zinc-400">Okta</span>
                  </div>
                  <div className="flex items-center gap-1.5" title="Keycloak">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#a0a0a0"><path d="M12 1L3 6v12l9 5 9-5V6l-9-5zm0 2.236L19 7.5v9L12 20.764 5 16.5v-9L12 3.236z"/></svg>
                    <span className="text-xs text-zinc-400">Keycloak</span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-zinc-600">Separate server, separate ops, separate on-call</p>
              </div>

              {/* Secrets / Encryption */}
              <div className="rounded-xl border border-teal-900/40 bg-[#0f0f1a] p-5">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-teal-400">Secrets &amp; Encryption</p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1.5" title="HashiCorp Vault">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#a0a0a0"><path d="M12 1.5L1.5 7.5v9L12 22.5l10.5-6v-9L12 1.5zm0 2.121L20.742 8.5v7L12 20.379 3.258 15.5v-7L12 3.621z"/></svg>
                    <span className="text-xs text-zinc-400">Vault</span>
                  </div>
                  <div className="flex items-center gap-1.5" title="AWS KMS">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#FF9900"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2l8 4-8 4-8-4 8-4zM4 8.5l8 4v7l-8-4v-7zm16 0v7l-8 4v-7l8-4z"/></svg>
                    <span className="text-xs text-zinc-400">AWS KMS</span>
                  </div>
                  <div className="flex items-center gap-1.5" title="Azure Key Vault">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#0089D6"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93V18h-2v1.93C7.06 19.44 4.56 16.94 4.07 14H6v-2H4.07C4.56 9.06 7.06 6.56 10 6.07V8h2V6.07C15.94 6.56 18.44 9.06 18.93 12H17v2h1.93c-.49 2.94-2.99 5.44-5.93 5.93z"/></svg>
                    <span className="text-xs text-zinc-400">Azure KV</span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-zinc-600">Separate server, separate ops, separate on-call</p>
              </div>

              {/* Full-text search */}
              <div className="rounded-xl border border-cyan-900/40 bg-[#0f0f1a] p-5">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-cyan-400">Full-Text Search</p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1.5" title="Elasticsearch">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#4fc3f7"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
                    <span className="text-xs text-zinc-400">Elasticsearch</span>
                  </div>
                  <div className="flex items-center gap-1.5" title="OpenSearch">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#0779A1"><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM7 12a5 5 0 1 1 10 0A5 5 0 0 1 7 12z"/></svg>
                    <span className="text-xs text-zinc-400">OpenSearch</span>
                  </div>
                  <div className="flex items-center gap-1.5" title="Apache Solr">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#D9411E"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                    <span className="text-xs text-zinc-400">Solr</span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-zinc-600">Separate server, separate ops, separate on-call</p>
              </div>

              {/* Observability / AI Eval */}
              <div className="rounded-xl border border-violet-900/40 bg-[#0f0f1a] p-5">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-violet-400">Observability &amp; AI Evaluation</p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1.5" title="Datadog">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#632CA6"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                    <span className="text-xs text-zinc-400">Datadog</span>
                  </div>
                  <div className="flex items-center gap-1.5" title="Grafana">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#F46800"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 2a8 8 0 1 1 0 16A8 8 0 0 1 12 4z"/></svg>
                    <span className="text-xs text-zinc-400">Grafana</span>
                  </div>
                  <div className="flex items-center gap-1.5" title="Prometheus">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#E6522C"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3a7 7 0 1 1 0 14A7 7 0 0 1 12 5zm0 2a5 5 0 1 0 0 10A5 5 0 0 0 12 7zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/></svg>
                    <span className="text-xs text-zinc-400">Prometheus</span>
                  </div>
                  <div className="flex items-center gap-1.5" title="LangSmith">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#7FC8FF"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm-1 13V9l6 3-6 3z"/></svg>
                    <span className="text-xs text-zinc-400">LangSmith</span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-zinc-600">Separate server, separate ops, separate on-call</p>
              </div>

              {/* SIEM / Threat detection */}
              <div className="rounded-xl border border-rose-900/40 bg-[#0f0f1a] p-5">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-rose-400">Security Operations (SIEM)</p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1.5" title="Splunk">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#a0a0a0"><path d="M5 3l14 9-14 9V3z"/></svg>
                    <span className="text-xs text-zinc-400">Splunk</span>
                  </div>
                  <div className="flex items-center gap-1.5" title="Microsoft Sentinel">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#0078D4"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
                    <span className="text-xs text-zinc-400">Sentinel</span>
                  </div>
                  <div className="flex items-center gap-1.5" title="Dynatrace">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#1496FF"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 2c4.42 0 8 3.58 8 8s-3.58 8-8 8-8-3.58-8-8 3.58-8 8-8z"/></svg>
                    <span className="text-xs text-zinc-400">Dynatrace</span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-zinc-600">Separate server, separate ops, separate on-call</p>
              </div>

              {/* Hyperscaler cloud providers */}
              <div className="rounded-xl border border-sky-900/40 bg-[#0f0f1a] p-5">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-sky-400">Hyperscaler Cloud</p>
                <div className="mt-3 flex flex-wrap items-center gap-3">

                  {/* AWS */}
                  <div className="flex items-center gap-1.5" title="Amazon Web Services">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#FF9900">
                      <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36A4.84 4.84 0 0 1 3.55 5.32c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.918 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.063-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.224-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167zM21.698 16.207c-2.626 1.94-6.442 2.969-9.722 2.969-4.598 0-8.74-1.7-11.87-4.526-.247-.223-.025-.527.27-.352 3.384 1.963 7.559 3.153 11.877 3.153 2.914 0 6.114-.607 9.06-1.852.439-.2.814.287.385.608zM22.792 14.961c-.336-.43-2.22-.207-3.074-.103-.255.032-.295-.192-.063-.36 1.5-1.053 3.967-.75 4.254-.399.287.36-.08 2.826-1.485 4.007-.215.184-.423.088-.327-.151.32-.79 1.03-2.565.695-2.994z"/>
                    </svg>
                    <span className="text-xs text-zinc-400">AWS</span>
                  </div>

                  {/* Microsoft Azure */}
                  <div className="flex items-center gap-1.5" title="Microsoft Azure">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#0078D4">
                      <path d="M13.05 4.24L6.56 18.05l-4.43.75 10.62-14.56zm.7 1.09l3.7 10.45-9.4 1.59 7.1-2.78-2.84-8.05 1.44-1.21z"/>
                    </svg>
                    <span className="text-xs text-zinc-400">Azure</span>
                  </div>

                  {/* Google Cloud */}
                  <div className="flex items-center gap-1.5" title="Google Cloud Platform">
                    <svg viewBox="0 0 24 24" className="h-5 w-5">
                      <path d="M12.19 2.38a9.344 9.344 0 0 0-9.234 6.893c.053-.02-.055.013 0 0C.297 10.469-.842 13.758.697 16.4a6.617 6.617 0 0 0 5.747 3.322h12.256a5.847 5.847 0 0 0 5.552-7.682 4.843 4.843 0 0 0-3.932-3.258 9.344 9.344 0 0 0-8.12-6.404z" fill="#4285F4"/>
                      <path d="M12.19 2.38a9.344 9.344 0 0 1 8.12 6.403 4.843 4.843 0 0 1 3.032 2.11 9.317 9.317 0 0 0-3.948-7.331A9.344 9.344 0 0 0 6.956 9.273c.053-.02 1.695-3.915 5.234-6.893z" fill="#EA4335"/>
                      <path d="M5.564 13.14A3.62 3.62 0 0 0 4.5 15.618 3.619 3.619 0 0 0 8.12 19.24h10.578a3.873 3.873 0 0 0 3.872-3.872 3.873 3.873 0 0 0-3.872-3.872H7.69a2.571 2.571 0 0 1-2.126-2.357z" fill="#34A853"/>
                      <path d="M6.713 6.956a9.344 9.344 0 0 0-3.757 8.317 5.846 5.846 0 0 1-.947-3.26 6.617 6.617 0 0 1 3.267-5.666 9.344 9.344 0 0 1 1.437.609z" fill="#FBBC05"/>
                    </svg>
                    <span className="text-xs text-zinc-400">Google Cloud</span>
                  </div>

                </div>
                <p className="mt-3 text-xs text-zinc-600">Vendor lock-in · egress fees · data residency risk · API rate limits</p>
              </div>

              {/* Developer / smaller cloud providers */}
              <div className="rounded-xl border border-violet-900/40 bg-[#0f0f1a] p-5">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-violet-400">Developer Cloud</p>
                <div className="mt-3 flex flex-wrap items-center gap-3">

                  {/* Fly.io */}
                  <div className="flex items-center gap-1.5" title="Fly.io">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#7B3FF2">
                      <path d="M2.283 6.482C2.1 6.85 2 7.262 2 7.7v8.6c0 .97.522 1.814 1.3 2.276l7 4.04c.389.225.833.344 1.284.344H14.4c.452 0 .896-.12 1.285-.343l7-4.04A2.604 2.604 0 0 0 24 16.3V7.7a2.6 2.6 0 0 0-2.6-2.6H2.6c-.12 0-.237.01-.351.027zM12 4.4l4.143 2.392-4.143 2.39L7.858 6.79zm0 5.974 3.9-2.25v4.503L12 14.876l-3.9-2.25V8.124zm-5.2 3l3.9 2.251v4.501L6.8 17.876v-4.503zM18.4 12.4l-3.9 2.25v4.501l3.9-2.25V12.4z"/>
                    </svg>
                    <span className="text-xs text-zinc-400">Fly.io</span>
                  </div>

                  {/* DigitalOcean */}
                  <div className="flex items-center gap-1.5" title="DigitalOcean">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#0080FF">
                      <path d="M12.04 0C5.408-.02.005 5.38 0 12.01c-.005 6.626 5.375 12.01 12 12.01 6.51 0 12-5.375 12-12C24 5.38 18.63.02 12.04 0zm-.04 19.861v-3.872h-3.86v-3.87h3.86V8.248l3.87 3.87-3.87 3.872v3.872h-3.87z"/>
                    </svg>
                    <span className="text-xs text-zinc-400">DigitalOcean</span>
                  </div>

                  {/* Hetzner */}
                  <div className="flex items-center gap-1.5" title="Hetzner">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#D50C2D">
                      <path d="M4 3h7v8H4zm9 0h7v8h-7zM4 13h7v8H4zm9 0h7v8h-7z"/>
                    </svg>
                    <span className="text-xs text-zinc-400">Hetzner</span>
                  </div>

                  {/* Render */}
                  <div className="flex items-center gap-1.5" title="Render">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#46E3B7">
                      <path d="M0 0h6.5l11 24H11zm7 0h6.5l11 24H18z"/>
                    </svg>
                    <span className="text-xs text-zinc-400">Render</span>
                  </div>

                </div>
                <p className="mt-3 text-xs text-zinc-600">Simpler than hyperscalers · still requires multiple services · still cloud-dependent</p>
              </div>

            </div>

            {/* Cost callout */}
            <div className="mt-8 flex items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-900/30 px-5 py-4">
              <svg className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <p className="text-sm leading-relaxed text-zinc-500">
                Every card above is a separate service running 24/7, with its own servers, redundancy,
                network hops, monitoring dashboards, and on-call rotation. This is not a software
                architecture problem. It is an energy, cost, and operational complexity problem.
                Purple8 replaces every card with one process.
              </p>
            </div>
          </div>
        </section>

        {/* ── Four eras ── */}
        <section className="border-t border-purple-900/20">
          <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
              The evolution
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Four generations of backend architecture
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">
              Each generation fixed the biggest problem of the one before it, but introduced a new one in its place.
              Consolidith is the first that doesn&apos;t require a trade-off.
            </p>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {eras.map((era) => (
                <div
                  key={era.name}
                  className={`relative rounded-2xl border bg-[#11111b] p-6 ${
                    era.highlight
                      ? "border-purple-600/60 ring-1 ring-purple-600/20 shadow-lg shadow-purple-950/40"
                      : "border-purple-900/30"
                  }`}
                >
                  {era.highlight && (
                    <span className="absolute -top-3 left-4 rounded-full bg-purple-600 px-3 py-0.5 text-xs font-semibold text-white shadow">
                      Purple8 way
                    </span>
                  )}
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-600">
                    {era.era}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${era.dot}`} />
                    <h3 className={`text-lg font-bold ${era.colour.split(" ")[1]}`}>{era.name}</h3>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-500">{era.tagline}</p>

                  <div className="mt-5 space-y-1">
                    {era.pros.map((p) => (
                      <div key={p} className="flex items-start gap-2 text-xs text-zinc-300">
                        <span className="mt-0.5 shrink-0 text-green-500">✓</span>
                        {p}
                      </div>
                    ))}
                  </div>
                  {era.cons.length > 0 && (
                    <div className="mt-4 space-y-1 border-t border-purple-900/20 pt-4">
                      {era.cons.map((c) => (
                        <div key={c} className="flex items-start gap-2 text-xs text-zinc-500">
                          <span className="mt-0.5 shrink-0 text-red-500/70">✗</span>
                          {c}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Comparison table ── */}
        <section className="border-t border-purple-900/20 bg-[#0d0d16]">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
              Side by side
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              The full comparison
            </h2>

            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[680px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-purple-900/30">
                    <th className="py-3 pr-6 text-left text-xs font-semibold uppercase tracking-widest text-zinc-500 w-[22%]" />
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-zinc-500">Monolith</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-blue-500">Microservices</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-violet-400">Modulith</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-purple-400 bg-purple-950/20 rounded-t-lg">
                      Consolidith ✦
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr
                      key={row.trait}
                      className={`border-b border-purple-900/20 ${i % 2 === 0 ? "" : "bg-[#11111b]/40"}`}
                    >
                      <td className="py-3 pr-6 text-xs font-semibold text-zinc-400">{row.trait}</td>
                      <td className="px-4 py-3 text-xs text-zinc-500">{row.monolith}</td>
                      <td className="px-4 py-3 text-xs text-zinc-500">{row.micro}</td>
                      <td className="px-4 py-3 text-xs text-zinc-500">{row.modulith}</td>
                      <td className="px-4 py-3 text-xs font-medium text-purple-300 bg-purple-950/10">
                        {row.consolidith}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Two genuinely different things ── */}
        <section className="border-t border-purple-900/20">
          <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
              Two things no prior architecture has
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Built different at the architectural level
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">
              Every architecture before Consolidith treats AI evaluation and security as downstream
              concerns to bolt on after your backend is built. Purple8 changes that
              at the structural level.
            </p>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">

              {/* AI Evaluation */}
              <div className="rounded-2xl border border-purple-700/40 bg-[#11111b] p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-950/60 text-purple-400">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15M14.25 3.104c.251.023.501.05.75.082M19.8 15l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.607L5 14.5m14.8.5-1.57.393M5 14.5l-1.57.393" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">AI Evaluation — built into the fabric</h3>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-zinc-400">
                  In every other architecture, AI evaluation is a separate service you connect to
                  after the fact (LangSmith, Arize, Weights &amp; Biases). You export data, wait for
                  ingestion, and query a system that&apos;s always one step behind your live application.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                  In Purple8, every AI action — every RAG retrieval, every agent tool call, every
                  model decision, every workflow transition — is written as an immutable edge in the
                  same graph your application queries. Evaluation isn&apos;t downstream. It&apos;s
                  co-resident with your data.
                </p>
                <ul className="mt-6 space-y-2.5">
                  {[
                    "Query AI performance history the same way you query application data",
                    "Compare retrieval quality across model versions without exporting anything",
                    "Trace every agent decision back to the exact context it was given",
                    "Spot regressions in real time, not in the next morning's dashboard",
                  ].map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-sm text-zinc-300">
                      <span className="mt-0.5 shrink-0 text-purple-400">✦</span>
                      {pt}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 rounded-xl border border-purple-900/30 bg-[#0d0d16] px-4 py-3 text-xs text-zinc-500">
                  <span className="text-purple-400 font-medium">Replaces:</span> LangSmith · Arize · Weights & Biases · custom eval pipelines
                </div>
              </div>

              {/* SOC Agent */}
              <div className="rounded-2xl border border-purple-700/40 bg-[#11111b] p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-950/60 text-purple-400">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">Autonomous SOC Agent — not a log forwarder</h3>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-zinc-400">
                  Traditional SIEMs (Splunk, Microsoft Sentinel, Datadog Security) work by collecting
                  logs from your systems and analysing them, always at a remove from the data itself.
                  Detection latency is measured in minutes. Containment requires a human or a
                  separately configured playbook.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                  Purple8&apos;s SOC agent runs inside the same process as your data. It can correlate
                  access patterns, query anomalies, and relationship graphs in real time, because it
                  doesn&apos;t need to ship logs anywhere. When a threat is detected, containment
                  actions (block, isolate, alert) execute in the same process, in milliseconds, with
                  no round-trip to an external system.
                </p>
                <ul className="mt-6 space-y-2.5">
                  {[
                    "Behavioural rules evaluated against live data, not log exports",
                    "Graph-aware threat detection: spot anomalous access across entity relationships",
                    "Detection to containment in milliseconds, not minutes",
                    "Every security event is an auditable graph edge, queryable forever",
                  ].map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-sm text-zinc-300">
                      <span className="mt-0.5 shrink-0 text-purple-400">✦</span>
                      {pt}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 rounded-xl border border-purple-900/30 bg-[#0d0d16] px-4 py-3 text-xs text-zinc-500">
                  <span className="text-purple-400 font-medium">Replaces:</span> Splunk · Microsoft Sentinel · Datadog Security · PagerDuty playbooks
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Replacement stack ── */}
        <section className="border-t border-purple-900/20 bg-[#0d0d16]">
          <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
              What Consolidith eliminates
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              One binary. Twenty services retired.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">
              Every item below is a separate service your team would otherwise provision, monitor,
              and pay for, running 24/7, even when idle.
            </p>

            <div className="mt-10 grid gap-2 sm:grid-cols-2">
              {replacements.map((r) => (
                <div
                  key={r.external}
                  className="flex items-center gap-4 rounded-xl border border-purple-900/25 bg-[#11111b] px-5 py-3.5"
                >
                  <div className="min-w-0 flex-1">
                    <span className="text-sm text-zinc-500 line-through">{r.external}</span>
                  </div>
                  <svg className="h-4 w-4 shrink-0 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <div className="min-w-0 flex-1 text-right">
                    <span className="text-sm font-medium text-purple-300">{r.purple8}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Reference architecture diagrams ── */}
        <RefArchDiagrams />

        {/* ── Air-gapped reference architecture ── */}
        <AirGapArch />

        {/* ── Zero-downtime / Blue-Green reference architecture ── */}
        <section className="border-t border-purple-900/20">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
              Service resiliency
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Zero-downtime deployments — Blue/Green for Consolidith
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">
              Blue/green on a microservices stack means coordinating rolling updates across a dozen
              services, managing inter-service version compatibility, and hoping your orchestrator
              drains traffic correctly across all of them simultaneously. On a Consolidith, it is
              four steps and one binary.
            </p>

            <BlueGreenSection />
          </div>
        </section>

        {/* ── Three objections ── */}
        <section className="border-t border-purple-900/20 bg-[#0d0d16]">
          <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
              The hard questions
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              The objections — answered directly
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">
              Technical buyers arrive with reasonable scepticism. Here&apos;s how Consolidith holds
              up against the four objections we hear most.
            </p>

            <CollapsibleObjections />
          </div>
        </section>

        {/* ── Where scepticism is warranted ── */}
        <section className="border-t border-zinc-800">
          <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-500">
              Honest assessment
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Where scepticism is warranted
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">
              Consolidith is not the right answer for every team in every situation. These are
              genuine architectural trade-offs that technical buyers should evaluate carefully
              before committing. We would rather you understand them upfront than discover them
              six months into a deployment.
            </p>

            <HonestRisks />
          </div>
        </section>

        {/* ── CTA: try it + request a demo ── */}
        <section className="border-t border-purple-900/20">
          <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">

            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">

              {/* Left: self-serve */}
              <div className="flex flex-col justify-center">
                <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
                  Start today
                </p>
                <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                  Try it yourself, free
                </h2>
                <p className="mt-5 text-base leading-relaxed text-zinc-400">
                  The Developer edition is free, runs on your own machine, and requires no
                  external services. One command and you have a complete AI backend.
                </p>
                <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/50 px-5 py-3 font-mono text-sm text-purple-300">
                  pip install purple8-graph
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="/quickstart/"
                    className="rounded-full bg-purple-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-900/40 transition-colors hover:bg-purple-500 text-center"
                  >
                    Quick start guide
                  </a>
                  <a
                    href="/products/purple8/"
                    className="group inline-flex items-center justify-center gap-1.5 rounded-full border border-zinc-800 px-8 py-3 text-sm font-semibold text-zinc-300 transition-colors hover:border-purple-700 hover:text-white"
                  >
                    Product overview
                    <span className="transition-transform group-hover:translate-x-0.5">→</span>
                  </a>
                </div>
                <p className="mt-4 text-xs text-zinc-600">
                  Free forever · No credit card · Runs on your own hardware
                </p>
              </div>

              {/* Right: demo request form */}
              <div className="rounded-2xl border border-purple-900/30 bg-[#0f0f1a] p-7 lg:p-8">
                <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
                  Talk to us
                </p>
                <h3 className="mt-2 text-xl font-bold text-white">
                  Request a guided demo
                </h3>
                <p className="mt-2 mb-6 text-sm leading-relaxed text-zinc-500">
                  A Purple8 engineer will walk you through a deployment tailored to your
                  stack, data scale, and use case. No slides — live code, your questions.
                </p>
                <DemoRequestForm />
              </div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
