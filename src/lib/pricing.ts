/**
 * pricing.ts — Single source of truth for Purple8 pricing + the tier calculator.
 *
 * Mirrors the real entitlement model in
 *   purple8-graph/src/purple8_graph/licensing.py  (LicenseTier + _TIER_FEATURES)
 *   Purple8-DocIntel/src/purple8_docintel/licensing/models.py (LicenseTier)
 *
 * KEY MESSAGE this file encodes:
 *   The full production engine starts at $119 (Micro). Everything from Micro
 *   through Starter shares the SAME feature set — you are choosing *capacity*,
 *   not capability. Pro adds governance/compliance; Enterprise adds HA/scale.
 *
 * Annual price = floor(monthly * 10 / 12)  ("pay for 10 months, get 12").
 */

// ─────────────────────────────────────────────────────────────────────────────
// Purple8 (flagship) tiers
// ─────────────────────────────────────────────────────────────────────────────

export type GraphTierId =
  | "developer"
  | "micro"
  | "mini"
  | "growth"
  | "starter"
  | "pro"
  | "enterprise";

export type BillingCycle = "monthly" | "annual";

/** Which capability bundle a tier belongs to. Micro→Starter share "production". */
export type FeatureFamily = "free" | "production" | "pro" | "enterprise";

export interface GraphTier {
  id: GraphTierId;
  name: string;
  /** Monthly price in USD. null = custom / contact sales. */
  priceMonthly: number | null;
  /** Annual monthly-equivalent in USD (floor(monthly*10/12)). null = custom. */
  priceAnnual: number | null;
  /** Node capacity ceiling — used by the calculator to map an estimate → tier. */
  nodes: number;
  /** Human label for the capacity, e.g. "500K". */
  nodesLabel: string;
  /** Included MCP agents. null = unlimited. */
  agents: number | null;
  family: FeatureFamily;
  /** One-line "who it's for". */
  tagline: string;
  cta: string;
  highlight?: boolean;
  badge?: string;
}

const floorAnnual = (m: number): number => Math.floor((m * 10) / 12);

export const GRAPH_TIERS: GraphTier[] = [
  {
    id: "developer",
    name: "Developer",
    priceMonthly: 0,
    priceAnnual: 0,
    nodes: 50_000,
    nodesLabel: "50K",
    agents: 1,
    family: "free",
    tagline:
      "The full engine on your machine — every RAG pipeline, every MCP tool, every algorithm, and the full Journey Engine (workflows, HITL, SLA). No credit card, no expiry.",
    cta: "Download free",
  },
  {
    id: "micro",
    name: "Micro",
    priceMonthly: 119,
    priceAnnual: floorAnnual(119), // 99
    nodes: 500_000,
    nodesLabel: "500K",
    agents: 3,
    family: "production",
    tagline:
      "Production scale starts here — 10× the capacity, 3 agents & seats, plus agentic/late-chunking RAG, local KMS encryption, data lineage and local backup.",
    cta: "Start Micro",
    badge: "Production starts here",
  },
  {
    id: "mini",
    name: "Mini",
    priceMonthly: 239,
    priceAnnual: floorAnnual(239), // 199
    nodes: 1_000_000,
    nodesLabel: "1M",
    agents: 3,
    family: "production",
    tagline:
      "Same full production feature set as Micro — twice the capacity for growing workloads.",
    cta: "Start Mini",
  },
  {
    id: "growth",
    name: "Growth",
    priceMonthly: 699,
    priceAnnual: floorAnnual(699), // 582
    nodes: 3_000_000,
    nodesLabel: "3M",
    agents: 3,
    family: "production",
    tagline:
      "The comfortable middle. Full production feature set at 3M capacity — before you need multi-project or compliance.",
    cta: "Start Growth",
    highlight: true,
    badge: "Most popular",
  },
  {
    id: "starter",
    name: "Starter",
    priceMonthly: 1199,
    priceAnnual: floorAnnual(1199), // 999
    nodes: 5_000_000,
    nodesLabel: "5M",
    agents: 3,
    family: "production",
    tagline:
      "Top of the production family — maximum single-project capacity with the same full feature set.",
    cta: "Start Starter",
  },
  {
    id: "pro",
    name: "Pro",
    priceMonthly: 6999,
    priceAnnual: floorAnnual(6999), // 5832
    nodes: 50_000_000,
    nodesLabel: "50M",
    agents: 10,
    family: "pro",
    tagline:
      "Multi-project & compliance-ready: SSO, RBAC, immutable audit, PII, CDC, WAL, Applied Graphs, AEC Core, cloud backup.",
    cta: "Start Pro",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    priceMonthly: null,
    priceAnnual: null,
    nodes: Number.POSITIVE_INFINITY,
    nodesLabel: "Unlimited",
    agents: null,
    family: "enterprise",
    tagline:
      "Mission-critical scale: Raft HA, sharding, federation, SOC vertical, managed KMS, Supergraph, AEC Advanced.",
    cta: "Contact sales",
  },
];

/** Format a USD price for display. */
export function priceLabel(
  tier: GraphTier,
  cycle: BillingCycle,
): { amount: string; suffix: string; note?: string } {
  const value = cycle === "annual" ? tier.priceAnnual : tier.priceMonthly;
  if (value === null) return { amount: "Custom", suffix: "" };
  if (value === 0) return { amount: "$0", suffix: "" };
  return {
    amount: `$${value.toLocaleString()}`,
    suffix: "/mo",
    note: cycle === "annual" ? "billed annually · 10 months for 12" : undefined,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// DocIntel tiers (mirrors purple8_docintel/licensing/models.py)
// ─────────────────────────────────────────────────────────────────────────────

export interface DocIntelTier {
  id: "beta" | "solo" | "self-hosted" | "enterprise";
  name: string;
  price: string;
  quota: string;
  seats: string;
  tagline: string;
  cta: string;
  ctaHref: string;
  highlight?: boolean;
  badge?: string;
}

export const DOCINTEL_TIERS: DocIntelTier[] = [
  {
    id: "beta",
    name: "Community",
    price: "$0",
    quota: "500 docs/mo",
    seats: "1 worker",
    tagline:
      "Free forever. Full extraction pipeline — GLiNER NER, LLM relationship extraction, webhook connector, Tesseract + P8OCR. No credit card, no expiry.",
    cta: "Start for free",
    ctaHref: "/register",
  },
  {
    id: "solo",
    name: "Solo",
    price: "$79",
    quota: "10,000 docs/mo",
    seats: "2 workers",
    tagline:
      "The affordable on-ramp. Every Self-Hosted capability — all connectors, all 5 OCR engines, all LLM providers — metered to 10K documents/month. Every new version included.",
    cta: "Start Solo",
    ctaHref: "https://purple8.ai/checkout/create-session?plan=docintel-solo",
    badge: "New",
  },
  {
    id: "self-hosted",
    name: "Self-Hosted",
    price: "$299",
    quota: "Unlimited docs",
    seats: "Unlimited workers",
    tagline:
      "Unlimited processing at a flat $299/mo — no per-page fees. All connectors (SharePoint, Confluence, S3), all 5 OCR engines, all LLM providers. Nothing leaves your infra. Every new version included.",
    cta: "Get license",
    ctaHref: "https://purple8.ai/checkout/create-session?plan=docintel",
    highlight: true,
    badge: "Most popular",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$799",
    quota: "Unlimited",
    seats: "Unlimited",
    tagline:
      "Everything in Self-Hosted plus SSO/SAML, air-gapped deployment, one custom fine-tuned domain adapter, one custom connector, LTS security-patch backports, guided upgrades, and a dedicated response SLA.",
    cta: "Start Enterprise",
    ctaHref: "https://purple8.ai/checkout/create-session?plan=docintel-enterprise",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Tier calculator — "what are you building?" → recommended tier
//
// Users think in apps and customers, NOT nodes. We translate:
//   estimatedNodes = baseNodes + totalUsers * nodesPerUser
// then map to the smallest tier whose capacity covers it. Two overrides:
//   - governance (SSO/audit/regulated data)  → at least Pro
//   - highAvailability (mission-critical)     → Enterprise
//
// These are deliberately conservative order-of-magnitude estimates, not exact
// counts. The point is to land users on the right tier, not to bill by node.
// ─────────────────────────────────────────────────────────────────────────────

export interface UseCase {
  id: string;
  label: string;
  /** What the "user" is called for this app (customers, students, cases…). */
  userNoun: string;
  /** Content/catalog baseline that exists before any users. */
  baseNodes: number;
  /** Graph objects generated per user/customer over the app's life. */
  nodesPerUser: number;
  /** One-line description shown under the choice. */
  blurb: string;
  /** Whether this domain is typically regulated (pre-checks governance). */
  typicallyRegulated?: boolean;
}

export const USE_CASES: UseCase[] = [
  {
    id: "ai_chatbot",
    label: "AI chatbot / assistant",
    userNoun: "users",
    baseNodes: 50_000,
    nodesPerUser: 3,
    blurb: "Knowledge base + conversation history over a RAG pipeline.",
  },
  {
    id: "knowledge_mgmt",
    label: "Knowledge management / search",
    userNoun: "users",
    baseNodes: 200_000,
    nodesPerUser: 5,
    blurb: "Documents, entities, and relationships you search and traverse.",
  },
  {
    id: "customer_support",
    label: "AI customer support",
    userNoun: "customers",
    baseNodes: 30_000,
    nodesPerUser: 8,
    blurb: "Help-centre knowledge + tickets and conversations per customer.",
  },
  {
    id: "ecommerce",
    label: "E-commerce + AI",
    userNoun: "customers",
    baseNodes: 20_000,
    nodesPerUser: 40,
    blurb: "Product catalog + orders, items, and reviews per customer.",
  },
  {
    id: "lms",
    label: "Learning platform (LMS)",
    userNoun: "students",
    baseNodes: 15_000,
    nodesPerUser: 30,
    blurb: "Courses + enrollments, progress, and assessments per student.",
  },
  {
    id: "loan_case",
    label: "Loan / case management",
    userNoun: "cases",
    baseNodes: 5_000,
    nodesPerUser: 120,
    blurb: "Application + documents, workflow stages, and audit trail per case.",
    typicallyRegulated: true,
  },
  {
    id: "crm",
    label: "CRM / sales intelligence",
    userNoun: "contacts",
    baseNodes: 20_000,
    nodesPerUser: 25,
    blurb: "Accounts, contacts, activities, and deals in a live graph.",
  },
  {
    id: "custom",
    label: "Something else",
    userNoun: "users",
    baseNodes: 50_000,
    nodesPerUser: 20,
    blurb: "A general estimate for a mixed data + workflow application.",
  },
];

export interface CalculatorInput {
  useCaseId: string;
  totalUsers: number;
  /** SSO, audit logs, RBAC, PII, or otherwise regulated data. */
  needsGovernance: boolean;
  /** High availability / mission-critical uptime. */
  needsHighAvailability: boolean;
}

export interface CalculatorResult {
  tier: GraphTier;
  estimatedNodes: number;
  useCase: UseCase;
  /** Human-friendly reason, e.g. "SSO + audit means Pro". */
  reason: string;
}

export function estimateNodes(useCase: UseCase, totalUsers: number): number {
  const users = Number.isFinite(totalUsers) && totalUsers > 0 ? totalUsers : 0;
  return Math.round(useCase.baseNodes + users * useCase.nodesPerUser);
}

/** Smallest tier whose node ceiling covers the estimate. */
function tierForNodes(nodes: number): GraphTier {
  for (const tier of GRAPH_TIERS) {
    if (nodes <= tier.nodes) return tier;
  }
  return GRAPH_TIERS[GRAPH_TIERS.length - 1]; // enterprise
}

const tierById = (id: GraphTierId): GraphTier =>
  GRAPH_TIERS.find((t) => t.id === id) ?? GRAPH_TIERS[0];

export function recommendTier(input: CalculatorInput): CalculatorResult {
  const useCase =
    USE_CASES.find((u) => u.id === input.useCaseId) ?? USE_CASES[USE_CASES.length - 1];
  const estimatedNodes = estimateNodes(useCase, input.totalUsers);

  let tier = tierForNodes(estimatedNodes);
  let reason = `~${formatCount(estimatedNodes)} graph objects at your scale fits ${tier.name}.`;

  // Mission-critical uptime → Enterprise (Raft HA, failover, sharding).
  if (input.needsHighAvailability) {
    tier = tierById("enterprise");
    reason = "High-availability / mission-critical uptime needs Enterprise (Raft HA, failover).";
    return { tier, estimatedNodes, useCase, reason };
  }

  // Governance (SSO/RBAC/audit/PII) starts at Pro.
  const proRank = GRAPH_TIERS.findIndex((t) => t.id === "pro");
  const currentRank = GRAPH_TIERS.findIndex((t) => t.id === tier.id);
  if (input.needsGovernance && currentRank < proRank) {
    tier = tierById("pro");
    reason = "SSO, audit logs, and regulated-data controls start at Pro.";
  }

  return { tier, estimatedNodes, useCase, reason };
}

/** Compact count formatter: 1_250_000 → "1.3M". */
export function formatCount(n: number): string {
  if (!Number.isFinite(n)) return "∞";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(n % 1_000 === 0 ? 0 : 1)}K`;
  return `${Math.round(n)}`;
}
