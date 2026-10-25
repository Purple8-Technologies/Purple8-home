/**
 * pricing.ts — Single source of truth for Purple8 pricing + the tier calculator.
 *
 * Mirrors the simplified self-hosted model:
 *   - Developer (Free): full local engine up to 50K nodes for dev, testing & evaluation.
 *   - Enterprise / Custom (Self-Hosted): one commercial self-hosted tier tailored to your
 *     infrastructure, capacity, compliance, and HA requirements.
 *
 * DocIntel offers:
 *   - Community (Self-Hosted Free): up to 500 docs/mo.
 *   - Enterprise / Custom (Self-Hosted): unlimited commercial self-hosted deployment.
 *   - Cloud Graduated: hosted by Purple8 ($100/mo access + per-page usage).
 */

// ─────────────────────────────────────────────────────────────────────────────
// Purple8 (flagship) tiers — Self-Hosted: Developer (Free) + Enterprise / Custom
// ─────────────────────────────────────────────────────────────────────────────

export type GraphTierId =
  | "developer"
  | "enterprise";

export type BillingCycle = "monthly" | "annual";

export type FeatureFamily = "free" | "enterprise";

export interface GraphTier {
  id: GraphTierId;
  name: string;
  /** Monthly price in USD. null = custom / contact sales. */
  priceMonthly: number | null;
  /** Annual monthly-equivalent in USD. null = custom. */
  priceAnnual: number | null;
  /** Node capacity ceiling — used by the calculator to map an estimate → tier. */
  nodes: number;
  /** Human label for the capacity, e.g. "50K" or "Custom / Unlimited". */
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

export const GRAPH_TIERS: GraphTier[] = [
  {
    id: "developer",
    name: "Developer (Self-Hosted Free)",
    priceMonthly: 0,
    priceAnnual: 0,
    nodes: 50_000,
    nodesLabel: "50K",
    agents: 1,
    family: "free",
    tagline:
      "The full engine on your machine — every RAG pipeline, every MCP tool, every algorithm, and the full Journey Engine (workflows, HITL, SLA). Free for development, prototyping, and evaluation. No credit card, no expiry.",
    cta: "Download free",
  },
  {
    id: "enterprise",
    name: "Enterprise / Custom (Self-Hosted)",
    priceMonthly: null,
    priceAnnual: null,
    nodes: Number.POSITIVE_INFINITY,
    nodesLabel: "Custom / Unlimited",
    agents: null,
    family: "enterprise",
    tagline:
      "One commercial self-hosted tier tailored to your deployment — unlimited nodes & MCP agents, SSO/OIDC, RBAC, immutable audit, managed KMS (Vault · AWS · GCP · Azure), Raft HA & failover, sharding, Supergraph federation, SOC vertical, and SLA-backed support.",
    cta: "Talk to sales",
    highlight: true,
    badge: "Commercial Self-Hosted",
  },
];

/** Format a USD price for display. */
export function priceLabel(
  tier: GraphTier,
  cycle: BillingCycle,
): { amount: string; suffix: string; note?: string } {
  const value = cycle === "annual" ? tier.priceAnnual : tier.priceMonthly;
  if (value === null) return { amount: "Custom", suffix: "", note: "Tailored to your infrastructure & SLA" };
  if (value === 0) return { amount: "$0", suffix: "", note: "Free for dev & prototyping" };
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
  id: "beta" | "enterprise" | "cloud";
  name: string;
  price: string;
  priceUnit?: string;
  quota: string;
  seats: string;
  tagline: string;
  cta: string;
  ctaHref: string;
  highlight?: boolean;
  badge?: string;
}

/** Checkout plan id for monthly access plus graduated metered usage. */
export const DOCINTEL_CLOUD_PLAN = "docintel-graduated";

/**
 * DocIntel Cloud monthly bands — mirrors the Stripe price with lookup key
 * `docintel_graduated_access_monthly_v1` (access fee) and
 * `docintel_graduated_pages_monthly_v1` (graduated metered pages).
 * Stripe is the source of truth; update this table when the price changes.
 */
export interface DocIntelCloudBand {
  upTo: number | null; // inclusive upper bound; null = no limit
  flatUsd: number;
  perPageUsd: number;
}

export const DOCINTEL_CLOUD_BANDS: DocIntelCloudBand[] = [
  { upTo: 10_000, flatUsd: 100, perPageUsd: 0.02 },
  { upTo: null, flatUsd: 0, perPageUsd: 0.018 },
];

/** Monthly access plus graduated usage, excluding tax. */
export function docIntelCloudBill(pages: number): number {
  if (!Number.isSafeInteger(pages) || pages < 0) {
    throw new RangeError("Pages must be a non-negative safe integer.");
  }
  let total = DOCINTEL_CLOUD_BANDS[0].flatUsd;
  let previousLimit = 0;
  for (const band of DOCINTEL_CLOUD_BANDS) {
    const limit = band.upTo ?? pages;
    total += Math.max(0, Math.min(pages, limit) - previousLimit) * band.perPageUsd;
    if (pages <= limit) break;
    previousLimit = limit;
  }
  return Math.round(total * 100) / 100;
}

export const DOCINTEL_TIERS: DocIntelTier[] = [
  {
    id: "beta",
    name: "Community (self-hosted)",
    price: "$0",
    quota: "500 docs/mo",
    seats: "1 worker",
    tagline:
      "Free forever. Full extraction pipeline — GLiNER NER, LLM relationship extraction, webhook connector, Tesseract + P8OCR. No credit card, no expiry.",
    cta: "Self-host for free",
    ctaHref: "/quickstart/#add-docintel",
  },
  {
    id: "enterprise",
    name: "Enterprise / Custom (self-hosted)",
    price: "Custom",
    quota: "Unlimited docs",
    seats: "Unlimited workers",
    tagline:
      "One commercial self-hosted tier in your VPC or air-gapped network. SharePoint, Confluence, and S3 connectors, custom ontologies, BYO LLM, and SLA-backed support.",
    cta: "Talk to sales",
    ctaHref: "mailto:sales@purple8.ai?subject=DocIntel%20Self-Hosted%20Enterprise%20inquiry",
    badge: "Commercial Self-Hosted",
  },
  {
    id: "cloud",
    name: "Cloud Graduated",
    price: `$${DOCINTEL_CLOUD_BANDS[0].flatUsd}`,
    priceUnit: "/mo + per page",
    quota: "No page limit",
    seats: "Hosted by Purple8",
    tagline:
      "Hosted DocIntel. Pay the monthly access fee upfront, then pay for pages processed. The lower rate applies only to pages above the first band. No installation or Graph database required.",
    cta: "View Cloud billing",
    ctaHref: `/checkout/create-session?plan=${DOCINTEL_CLOUD_PLAN}`,
    highlight: true,
  },
];

/**
 * Every plan ID that the pricing UI can POST to /checkout/create-session.
 * Derived from the shared tier definitions so the checkout bootstrap route
 * can never drift from the offered tiers (see issue #3):
 *   - Graph tiers with a real positive price (excludes free Developer and
 *     contact-sales Enterprise).
 *   - DocIntel Cloud (metered, monthly only).
 */
export const PURCHASABLE_PLAN_IDS: ReadonlySet<string> = new Set<string>([
  ...GRAPH_TIERS.filter(
    (t) => typeof t.priceMonthly === "number" && t.priceMonthly > 0,
  ).map((t) => t.id),
  DOCINTEL_CLOUD_PLAN,
]);

export function checkoutPlan(value: string): string | null {
  const plan = value.trim().toLowerCase();
  if (plan === "docintel-payg") return DOCINTEL_CLOUD_PLAN;
  return PURCHASABLE_PLAN_IDS.has(plan) ? plan : null;
}

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
  let reason = `~${formatCount(estimatedNodes)} graph objects fits ${tier.name}.`;

  // Mission-critical uptime → Enterprise / Custom (Raft HA, failover, sharding).
  if (input.needsHighAvailability) {
    tier = tierById("enterprise");
    reason = "High-availability / mission-critical uptime is included in Enterprise / Custom (Raft HA, failover, sharding).";
    return { tier, estimatedNodes, useCase, reason };
  }

  // Governance (SSO/RBAC/audit/PII) or commercial production → Enterprise / Custom.
  if (input.needsGovernance) {
    tier = tierById("enterprise");
    reason = "SSO, audit logs, regulated-data controls, and commercial self-hosted deployments use Enterprise / Custom.";
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
