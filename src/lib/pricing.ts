/**
 * pricing.ts - Single source of truth for Purple8 pricing + the tier calculator.
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
// Purple8 (flagship) tiers - Self-Hosted: Developer (Free) + Enterprise / Custom
// ─────────────────────────────────────────────────────────────────────────────

export type GraphTierId =
  | "developer"
  | "builder"
  | "production"
  | "growth"
  | "enterprise";

export type BillingCycle = "monthly" | "annual";

export type FeatureFamily = "free" | "cloud" | "enterprise";

export interface GraphTier {
  id: GraphTierId;
  name: string;
  /** Monthly price in USD. null = custom / contact sales. */
  priceMonthly: number | null;
  /** Annual monthly-equivalent in USD. null = custom. */
  priceAnnual: number | null;
  /** Node capacity ceiling - used by the calculator to map an estimate → tier. */
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
    name: "Free Playground",
    priceMonthly: 0,
    priceAnnual: 0,
    nodes: 50_000,
    nodesLabel: "10K Cloud / 50K Local",
    agents: null,
    family: "free",
    tagline:
      "Evaluate Purple8 Hyper Graph immediately in the Cloud Sandbox (or locally via Docker up to 50K nodes) - all 176 MCP tools, unlimited MCP agent connections, LPG + RDF + Vector + Tables + Journey workflows.",
    cta: "Try Cloud Sandbox",
  },
  {
    id: "builder",
    name: "Builder",
    priceMonthly: 39,
    priceAnnual: 32,
    nodes: 250_000,
    nodesLabel: "250K nodes",
    agents: null,
    family: "cloud",
    tagline:
      "For indie developers, AI startups, and small internal tools: Shared Purple8 Cloud (or Self-Hosted license), up to 250,000 nodes, unlimited MCP connections, BYO LLM key, and standard email support.",
    cta: "Start Builder →",
    badge: "Indie & Startups",
  },
  {
    id: "production",
    name: "Production",
    priceMonthly: 149,
    priceAnnual: 124,
    nodes: 1_000_000,
    nodesLabel: "1M nodes",
    agents: null,
    family: "cloud",
    tagline:
      "For customer-facing production applications: up to 1,000,000 nodes, automated daily cloud backups & restore, High Availability (SYNC replication), health/SLA monitoring, and production support.",
    cta: "Start Production →",
    highlight: true,
    badge: "Most Popular · HA & Backups",
  },
  {
    id: "growth",
    name: "Growth",
    priceMonthly: 499,
    priceAnnual: 415,
    nodes: 5_000_000,
    nodesLabel: "5M nodes",
    agents: null,
    family: "cloud",
    tagline:
      "For scaling SaaS products, multi-tenant apps, and agencies: up to 5,000,000 nodes, multi-tenant RBAC & team controls, OIDC / SSO, Cloud KMS integration, and priority support.",
    cta: "Start Growth →",
    badge: "Multi-Tenant & SSO",
  },
  {
    id: "enterprise",
    name: "Enterprise / BYOC",
    priceMonthly: null,
    priceAnnual: null,
    nodes: Number.POSITIVE_INFINITY,
    nodesLabel: "Custom / Unlimited",
    agents: null,
    family: "enterprise",
    tagline:
      "Annual software licensing for sovereign VPC, on-premise, Red Hat OpenShift (UBI9), air-gapped, and OEM deployments - unlimited nodes (20M+/shard), OIDC/SAML SSO, Vault/AWS/GCP/Azure KMS, Raft HA, Supergraph, Autonomous SOC, Legal Holds, and 24×7 Severity-1 SLA.",
    cta: "Contact Us",
    badge: "VPC · On-Prem · Air-Gapped",
  },
];

/** Format a USD price for display. */
export function priceLabel(
  tier: GraphTier,
  cycle: BillingCycle,
): { amount: string; suffix: string; note?: string } {
  if (tier.id === "developer") {
    return { amount: "$0", suffix: "", note: "Cloud Sandbox (10K) & Local Docker (50K)" };
  }
  if (typeof tier.priceMonthly === "number" && tier.priceMonthly > 0) {
    const amt = cycle === "annual" ? tier.priceAnnual : tier.priceMonthly;
    return {
      amount: `$${amt}`,
      suffix: "/mo",
      note: cycle === "annual" ? `Billed annually ($${(tier.priceAnnual ?? 0) * 12}/yr)` : "Billed monthly",
    };
  }
  return { amount: "Contact Us", suffix: "", note: "Tailored to your VPC, capacity & SLA" };
}

// ─────────────────────────────────────────────────────────────────────────────
// DocIntel tiers (mirrors purple8_docintel/licensing/models.py)
// ─────────────────────────────────────────────────────────────────────────────

export interface DocIntelTier {
  id: "beta" | "enterprise" | "cloud" | "prepaid";
  name: string;
  price: string;
  priceAnnual?: string;
  priceUnit?: string;
  quota: string;
  seats: string;
  tagline: string;
  cta: string;
  ctaHref: string;
  highlight?: boolean;
  badge?: string;
  unavailable?: boolean;
}

/** Checkout plan id for monthly access plus graduated metered usage. */
export const DOCINTEL_CLOUD_PLAN = "docintel-graduated";

/**
 * DocIntel Cloud monthly bands - mirrors the Stripe price with lookup key
 * `docintel_graduated_access_monthly_v1` (access fee) and
 * `docintel_graduated_pages_monthly_v2` (included pages plus metered overage).
 * Stripe is the source of truth; update this table when the price changes.
 */
export interface DocIntelCloudBand {
  upTo: number | null; // inclusive upper bound; null = no limit
  flatUsd: number;
  perPageUsd: number;
}

export const DOCINTEL_CLOUD_BANDS: DocIntelCloudBand[] = [
  { upTo: 10_000, flatUsd: 100, perPageUsd: 0 },
  { upTo: null, flatUsd: 0, perPageUsd: 0.01 },
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
    name: "Cloud Sandbox",
    price: "$0",
    quota: "Evaluation",
    seats: "Browser + MCP (/mcp)",
    tagline:
      "Test Purple8 DocIntel in your browser or connect your AI agent over MCP. Parse 70+ formats across 75+ languages with two-pass entity & relationship extraction.",
    cta: "Try DocIntel Sandbox",
    ctaHref: "/try/docintel/",
  },
  {
    id: "cloud",
    name: "Monthly subscription",
    price: "$100",
    priceUnit: "/mo",
    quota: "10,000 pages/month included",
    seats: "Account subscription · Project API keys",
    tagline:
      "$100/month includes 10,000 pages, then $0.01 per additional page. Included pages reset each billing month without rollover. One subscription covers all projects in your account.",
    cta: "Open DocIntel workspace",
    ctaHref: "https://docintel.purple8.ai/try?view=billing",
    highlight: true,
    badge: "Managed Cloud",
  },
  {
    id: "prepaid",
    name: "Pay as you go",
    price: "$0.015",
    priceUnit: "/page",
    quota: "Prepaid balance required",
    seats: "No monthly access fee",
    tagline:
      "Processing requires sufficient prepaid credit. Prepaid billing is not yet available.",
    cta: "Not yet available",
    ctaHref: "",
    unavailable: true,
    badge: "Prepaid",
  },
  {
    id: "enterprise",
    name: "Enterprise / BYOC (VPC & Air-Gapped)",
    price: "Contact Us",
    quota: "Custom / Unlimited",
    seats: "Unlimited workers",
    tagline:
      "Deploy DocIntel in your own VPC, Red Hat OpenShift (UBI9), on-premise, or air-gapped network. Auto-commits entities, relationships, and chunks into Purple8 Hyper Graph with 24×7 Severity-1 SLA support.",
    cta: "Contact Us",
    ctaHref: "mailto:sales@purple8.ai?subject=DocIntel%20Self-Hosted%20Enterprise%20Inquiry",
    badge: "VPC · On-Prem · Air-Gapped",
  },
];

export const DOCINTEL_PURCHASABLE_PLANS: ReadonlySet<string> = new Set<string>();

/**
 * Every plan ID that the pricing UI can POST to /checkout/create-session.
 * Derived from the shared tier definitions so the checkout bootstrap route
 * can never drift from the offered tiers (see issue #3):
 *   - Graph tiers with a real positive price (excludes free Developer and
 *     contact-sales Enterprise).
 *   - DocIntel Cloud (monthly only); legacy licenses are sales-assisted.
 */
export const PURCHASABLE_PLAN_IDS: ReadonlySet<string> = new Set<string>([
  ...GRAPH_TIERS.filter(
    (t) => typeof t.priceMonthly === "number" && t.priceMonthly > 0,
  ).map((t) => t.id),
  ...DOCINTEL_PURCHASABLE_PLANS,
  "cloud-saas",
  DOCINTEL_CLOUD_PLAN,
]);

export function checkoutPlan(value: string): string | null {
  const plan = value.trim().toLowerCase();
  if (plan === "docintel-payg") return DOCINTEL_CLOUD_PLAN;
  return PURCHASABLE_PLAN_IDS.has(plan) ? plan : null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Tier calculator - "what are you building?" → recommended tier
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

  // Governance (SSO/RBAC/audit/PII) → Growth ($499/mo) up to 5M nodes, or Enterprise beyond 5M.
  if (input.needsGovernance) {
    if (estimatedNodes <= 5_000_000) {
      tier = tierById("growth");
      reason = "OIDC/SSO, multi-tenant RBAC, and Cloud KMS are included starting in Growth ($499/mo).";
    } else {
      tier = tierById("enterprise");
      reason = "Beyond 5M nodes with SSO, audit logs, and regulated-data controls, use Enterprise / BYOC.";
    }
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
