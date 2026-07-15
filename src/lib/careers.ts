// Careers — open roles.
//
// Source of truth for the /careers list and /careers/[slug] detail pages.
// Seeded from the internal hiring plan (go-live August 2026): redundancy on
// the storage core first, then ops offload, then developer experience.
//
// To post a new role: add an entry here. To close one: remove it (or set
// `active: false`). The static export regenerates the routes at build time.

export type Role = {
  slug: string;
  title: string;
  team: "Engineering" | "Developer Experience" | "Operations";
  location: string;
  type: "Full-time" | "Contract";
  level: string;
  tagline: string;
  about: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  active: boolean;
};

export const roles: Role[] = [
  {
    slug: "storage-systems-engineer",
    title: "Storage / Systems Engineer (Rust + Python)",
    team: "Engineering",
    location: "Remote",
    type: "Full-time",
    level: "Senior",
    tagline:
      "Own the storage core of an in-process, multi-model database engine.",
    about:
      "Purple8 is an embedded multi-model database (graph + vector + document + full-text) that runs in-process — one binary, one port, zero external services. The storage engine is the heart of the product: a high-throughput write path with a write-ahead log, strong durability guarantees, and a memory model engineered for large corpora on modest hardware. It's the most important — and most concentrated — part of the system, and you'd own it.",
    responsibilities: [
      "Own the storage engine and write-ahead log end to end.",
      "Advance the engine's memory-management and resource-efficiency work.",
      "Harden crash recovery, durability, and startup replay to a very high bar.",
      "Profile and eliminate hot-path overhead across the native/Python boundary.",
    ],
    requirements: [
      "Systems programming in Rust, and comfort at the Rust/Python boundary.",
      "Database internals: write-ahead logging, durability, memory management.",
      "Comfort profiling and reasoning about memory and allocation behaviour.",
      "A correctness-first mindset — a very high quality bar for shipping.",
    ],
    niceToHave: [
      "Vector search / ANN (e.g. HNSW) familiarity.",
      "Lock-free / concurrent data-structure experience.",
      "Prior work on an embedded DB, LSM, or other storage runtime.",
    ],
    active: true,
  },
  {
    slug: "query-algorithms-engineer",
    title: "Query & Algorithms Engineer",
    team: "Engineering",
    location: "Remote",
    type: "Full-time",
    level: "Senior",
    tagline:
      "Make retrieval fast and smart — query planning and graph-aware vector search.",
    about:
      "Purple8's query layer combines a cost-based planner with graph-aware vector retrieval so that hybrid search stays both accurate and efficient at scale. You'll own the planner, the graph algorithm suite, and the vector integration that make retrieval work.",
    responsibilities: [
      "Own the cost-based query planner and its strategy selection.",
      "Maintain and extend the graph algorithm suite (PageRank, communities, paths, centrality, link prediction).",
      "Advance graph-aware vector retrieval and its efficiency.",
      "Push filters into the planner rather than post-filtering in application code.",
    ],
    requirements: [
      "Strong algorithms and data-structures fundamentals.",
      "Experience with query planning or graph processing at scale.",
      "Python performance engineering; comfort operating directly on a storage iterator, not in-memory lists.",
    ],
    niceToHave: [
      "ANN / HNSW internals.",
      "Sparse linear algebra (scipy) for spectral methods.",
    ],
    active: true,
  },
  {
    slug: "ai-ml-engineer",
    title: "AI / ML Engineer (RAG + Extraction)",
    team: "Engineering",
    location: "Remote",
    type: "Full-time",
    level: "Senior",
    tagline:
      "The RAG pipeline and document intelligence are the product — own them.",
    about:
      "Purple8 ships three built-in RAG modes (flat vector, graph-augmented, hybrid) with autonomous corpus profiling and tuning, plus DocIntel — a document-intelligence service that turns 70+ formats into queryable knowledge via a two-pass extraction pipeline. You'll own retrieval quality, extraction accuracy, and the AI hooks in the workflow engine.",
    responsibilities: [
      "Own the hybrid RAG retrieval path and its self-tuning/profiling.",
      "Improve entity + relationship extraction across domain profiles.",
      "Build evaluation harnesses that measure retrieval and extraction quality objectively.",
      "Integrate LLM providers behind a clean, optional-by-default abstraction.",
    ],
    requirements: [
      "Hands-on RAG engineering — chunking, embeddings, reranking, fusion.",
      "Practical NER / information-extraction experience.",
      "Rigor about evaluation: F1, MRR, token/recall trade-offs.",
    ],
    niceToHave: [
      "GLiNER / transformer fine-tuning (LoRA adapters).",
      "Experience with agentic / MCP tool interfaces.",
    ],
    active: true,
  },
  {
    slug: "devops-release-security-engineer",
    title: "DevOps / Release & Security Engineer",
    team: "Operations",
    location: "Remote",
    type: "Full-time",
    level: "Senior",
    tagline:
      "Own the release supply chain — multi-arch builds, signing, SBOM, and CI.",
    about:
      "Purple8 ships as a hardened Docker image and a compiled pip wheel. This role owns the entire release supply chain — reproducible multi-arch builds, artifact signing and SBOMs, CI, and deployment — so shipping stays fast and trustworthy as the team grows. (Today the founder does this; it does not scale.)",
    responsibilities: [
      "Own Docker / Nuitka multi-arch builds and the compiled-wheel pipeline.",
      "Stand up signing (cosign), SBOMs, and dependency scanning.",
      "Own CI and deployment (fly.io / containers) with fast, safe rollbacks.",
      "Partner on the SOC vertical and security-by-default posture.",
    ],
    requirements: [
      "Strong CI/CD and container build experience (multi-arch, caching, reproducibility).",
      "Supply-chain security: signing, SBOM, provenance.",
      "Comfort owning production deploys and incident response.",
    ],
    niceToHave: [
      "Nuitka / Cython compiled-artifact packaging.",
      "Kubernetes and cloud KMS integrations.",
    ],
    active: true,
  },
  {
    slug: "developer-experience-engineer",
    title: "Developer Experience / Solutions Engineer",
    team: "Developer Experience",
    location: "Remote",
    type: "Full-time",
    level: "Mid–Senior",
    tagline:
      "In an MCP-native product, the AI agent is the developer. Make that experience exceptional.",
    about:
      "Purple8's go-to-market thesis is that a capable AI agent can build and operate a complete backend through natural language — the MCP tools are the API. This role is the highest-leverage one for that thesis: own tool ergonomics, quickstarts, SDK examples, and onboarding so that a developer (or their agent) goes from zero to production fast.",
    responsibilities: [
      "Own the MCP tool ergonomics and namespaced tool surface from the user's side.",
      "Write quickstarts, SDK examples, and end-to-end sample apps.",
      "Turn real onboarding friction into product changes and docs.",
      "Be the first responder for developer questions and design-partner feedback.",
    ],
    requirements: [
      "Strong writing and code-sample craft; empathy for the developer's first hour.",
      "Comfortable across the stack and with AI-agent tooling (Claude, Cursor, Copilot).",
      "Able to turn ambiguity into crisp docs and examples.",
    ],
    niceToHave: [
      "Prior DevRel / Solutions Engineering.",
      "Experience building with the Model Context Protocol.",
    ],
    active: true,
  },
];

export const activeRoles = roles.filter((r) => r.active);

export function getRole(slug: string): Role | undefined {
  return roles.find((r) => r.slug === slug);
}
