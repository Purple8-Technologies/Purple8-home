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
      "Evaluate Purple8 AI Engine immediately in the Cloud Sandbox (or locally via Docker up to 50K nodes) - all 176 MCP tools, unlimited MCP agent connections, LPG + RDF + Vector + Tables + Journey workflows.",
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
    badge: "Most Popular",
  },
  {
    id: "growth",
    name: "Growth",
    priceMonthly: 599,
    priceAnnual: 499,
    nodes: 5_000_000,
    nodesLabel: "5M nodes",
    agents: null,
    family: "cloud",
    tagline:
      "For scaling SaaS products, multi-tenant apps, and agencies: up to 5,000,000 nodes at full in-memory performance - same complete feature set as every tier, with priority support.",
    cta: "Start Growth →",
    badge: "5M Nodes · Priority Support",
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
      "Annual software licensing for sovereign VPC, on-premise, Red Hat OpenShift (UBI9), air-gapped, and OEM deployments - same full feature set as every tier (SSO, KMS, Raft HA, Supergraph, Autonomous SOC, Legal Holds), at custom capacity (20M+ nodes/shard) with a 24×7 Severity-1 SLA.",
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

// ─────────────────────────────────────────────────────────────────────────────
// DocIntel extraction quality ladder.
// Quality is a per-job choice available to every customer — never a customer
// gate. Credits are the single billing unit: 1 credit = 1 Balanced page.
// Stripe lookup keys: `docintel_graduated_access_monthly_v1` (access fee) and
// `docintel_graduated_pages_monthly_v2` (metered usage). Stripe is the source
// of truth; update these constants when the price changes.
// ─────────────────────────────────────────────────────────────────────────────

export type DocIntelQuality = "fast" | "balanced" | "precise";

export interface DocIntelQualityTier {
  id: DocIntelQuality;
  name: string;
  /** Credits consumed per page (1 credit = 1 Balanced page). */
  credits: number;
  /** Effective price per page beyond the included quota ($0.01/credit). */
  overagePerPageUsd: number;
  /** Effective price per page on prepaid balance ($0.015/credit). */
  prepaidPerPageUsd: number;
  /** What the pipeline runs at this level. */
  pipeline: string;
}

/** Monthly access fee for the Cloud subscription. */
export const DOCINTEL_ACCESS_USD = 100;
/** Credits included with the subscription each month (no rollover). */
export const DOCINTEL_INCLUDED_CREDITS = 10_000;
/** Overage price per credit beyond the included quota. */
export const DOCINTEL_CREDIT_OVERAGE_USD = 0.01;
/** Prepaid (pay-as-you-go) price per credit — no access fee. */
export const DOCINTEL_CREDIT_PREPAID_USD = 0.015;

export const DOCINTEL_QUALITY_TIERS: DocIntelQualityTier[] = [
  {
    id: "fast",
    name: "Fast",
    credits: 0.1,
    overagePerPageUsd: 0.001,
    prepaidPerPageUsd: 0.0015,
    pipeline:
      "GLiNER entity extraction plus a compact-model relationship pass. Ideal for high-volume structured documents.",
  },
  {
    id: "balanced",
    name: "Balanced",
    credits: 1,
    overagePerPageUsd: 0.01,
    prepaidPerPageUsd: 0.015,
    pipeline:
      "GLiNER extraction plus an LLM refinement pass (the default). Best quality-per-dollar for most documents.",
  },
  {
    id: "precise",
    name: "Precise",
    credits: 6,
    overagePerPageUsd: 0.06,
    prepaidPerPageUsd: 0.09,
    pipeline:
      "Highest-quality two-pass LLM extraction: complex tables, long-document reasoning, precision-critical domains.",
  },
];

/**
 * Monthly bill: access fee plus credit overage, excluding tax.
 * Accepts a plain page count (treated as Balanced) or a per-quality breakdown.
 */
export function docIntelCloudBill(
  pages: number | Partial<Record<DocIntelQuality, number>>,
): number {
  const byQuality = typeof pages === "number" ? { balanced: pages } : pages;
  let credits = 0;
  for (const tier of DOCINTEL_QUALITY_TIERS) {
    const count = byQuality[tier.id] ?? 0;
    if (!Number.isSafeInteger(count) || count < 0) {
      throw new RangeError("Pages must be non-negative safe integers.");
    }
    credits += count * tier.credits;
  }
  const overage =
    Math.max(0, credits - DOCINTEL_INCLUDED_CREDITS) * DOCINTEL_CREDIT_OVERAGE_USD;
  return Math.round((DOCINTEL_ACCESS_USD + overage) * 100) / 100;
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
    quota: "10,000 credits/month included",
    seats: "Account subscription · Project API keys",
    tagline:
      "$100/month includes 10,000 credits, then $0.01 per additional credit. Pick extraction quality per job: Fast 0.1 credit/page, Balanced 1 credit/page (default), Precise 6 credits/page. Credits reset each billing month without rollover. One subscription covers all projects in your account.",
    cta: "Open DocIntel workspace",
    ctaHref: "https://docintel.purple8.ai/try?view=billing",
    highlight: true,
    badge: "Managed Cloud",
  },
  {
    id: "prepaid",
    name: "Pay as you go",
    price: "$0.015",
    priceUnit: "/credit",
    quota: "Prepaid balance required",
    seats: "No monthly access fee",
    tagline:
      "Sign in to buy credits: choose any amount from $5. Quality is your per-job choice — Fast $0.0015/page, Balanced $0.015/page, Precise $0.09/page. Processing requires sufficient prepaid credit.",
    cta: "Sign in to add credits",
    ctaHref: "https://docintel.purple8.ai/try?view=billing",
    badge: "Prepaid",
  },
  {
    id: "enterprise",
    name: "Enterprise / BYOC (VPC & Air-Gapped)",
    price: "Contact Us",
    quota: "Custom / Unlimited",
    seats: "Unlimited workers",
    tagline:
      "Deploy DocIntel in your own VPC, Red Hat OpenShift (UBI9), on-premise, or air-gapped network. Auto-commits entities, relationships, and chunks into Purple8 AI Engine with 24×7 Severity-1 SLA support.",
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

export function recommendTier(input: CalculatorInput): CalculatorResult {
  const useCase =
    USE_CASES.find((u) => u.id === input.useCaseId) ?? USE_CASES[USE_CASES.length - 1];
  const estimatedNodes = estimateNodes(useCase, input.totalUsers);

  // Every tier gets every feature (HA, SSO/RBAC, KMS, audit, SOC). The
  // recommendation is purely a capacity fit — customers pay only to scale.
  const tier = tierForNodes(estimatedNodes);
  let reason = `~${formatCount(estimatedNodes)} graph objects fits ${tier.name}.`;

  const reassurance: string[] = [];
  if (input.needsHighAvailability) {
    reassurance.push("HA (replication, failover, Raft)");
  }
  if (input.needsGovernance) {
    reassurance.push("SSO/OIDC, RBAC, audit logs, and KMS encryption");
  }
  if (reassurance.length > 0) {
    reason += ` ${reassurance.join(" and ")} ${
      reassurance.length > 1 ? "are" : "is"
    } included in every tier — you only pay for capacity.`;
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
