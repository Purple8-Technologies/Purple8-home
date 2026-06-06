"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type PlanId = "developer" | "starter" | "pro" | "enterprise";
type BillingCycle = "monthly" | "annual";

interface Plan {
  id: PlanId;
  name: string;
  price: { monthly: string; annual: string };
  annualNote?: string;
  quota: string;
  seats: string;
  tagline: string;
  cta: string;
  ctaHref: string;
  highlight: boolean;
  badge?: string;
}

const PLANS: Plan[] = [
  {
    id: "developer",
    name: "Developer",
    price: { monthly: "$0", annual: "$0" },
    quota: "50K nodes",
    seats: "1 MCP agent",
    tagline:
      "Full engine locally. All RAG pipelines, all MCP tools, all graph algorithms. No credit card, no expiry.",
    cta: "Download free",
    ctaHref: "https://github.com/Purple8-Technologies/purple8-graph#readme",
    highlight: false,
  },
  {
    id: "starter",
    name: "Starter",
    price: { monthly: "$1,199", annual: "$999" },
    annualNote: "10 months for 12",
    quota: "5M nodes",
    seats: "3 MCP agents",
    tagline:
      "Production-grade single-app deployment. Journey Engine, HITL gates, SLA monitor, advanced RAG chunking, local KMS.",
    cta: "Start Starter trial",
    ctaHref:
      "https://purple8.ai/checkout/create-session?plan=starter",
    highlight: true,
    badge: "Most popular",
  },
  {
    id: "pro",
    name: "Pro",
    price: { monthly: "$6,999", annual: "$5,832" },
    annualNote: "10 months for 12",
    quota: "50M nodes",
    seats: "10 MCP agents",
    tagline:
      "Multi-project, compliance-ready. CDC, WAL, SSO, RBAC, immutable audit log, AEC Core, Applied Graphs, cloud backup.",
    cta: "Start Pro trial",
    ctaHref:
      "https://purple8.ai/checkout/create-session?plan=pro",
    highlight: false,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: { monthly: "Custom", annual: "Custom" },
    quota: "Unlimited",
    seats: "Unlimited",
    tagline:
      "Raft HA, sharding, federation, managed KMS (Vault/AWS/GCP/Azure), SOC vertical, Node2Vec, dedicated support SLA.",
    cta: "Contact sales",
    ctaHref:
      "mailto:sales@purple8.ai?subject=Enterprise%20license%20inquiry",
    highlight: false,
  },
];

// ─── Feature comparison table ─────────────────────────────────────────────────

interface FeatureRow {
  category?: string;
  label: string;
  developer: boolean | string;
  starter: boolean | string;
  pro: boolean | string;
  enterprise: boolean | string;
}

const FEATURE_ROWS: FeatureRow[] = [
  // Core graph
  { category: "Core graph", label: "Nodes, edges & graph traversal", developer: true, starter: true, pro: true, enterprise: true },
  { label: "Full-text + vector / semantic search", developer: true, starter: true, pro: true, enterprise: true },
  { label: "ACID transactions", developer: true, starter: true, pro: true, enterprise: true },
  { label: "REST API + Python & TypeScript SDKs", developer: true, starter: true, pro: true, enterprise: true },
  { label: "ALL 22 MCP tools (graph, rag, data, journey)", developer: true, starter: true, pro: true, enterprise: true },
  { label: "All RAG pipelines (basic, hybrid, graph-guided)", developer: true, starter: true, pro: true, enterprise: true },
  // Starter & above
  { category: "Starter & above", label: "Journey Engine + SLA monitoring", developer: false, starter: true, pro: true, enterprise: true },
  { label: "Human-in-the-Loop (HITL) gates", developer: false, starter: true, pro: true, enterprise: true },
  { label: "Advanced RAG (late & agentic chunking)", developer: false, starter: true, pro: true, enterprise: true },
  { label: "Local KMS (encryption at rest)", developer: false, starter: true, pro: true, enterprise: true },
  { label: "Data lineage + local backup", developer: false, starter: true, pro: true, enterprise: true },
  // Pro & above
  { category: "Pro & above", label: "Change Data Capture (CDC)", developer: false, starter: false, pro: true, enterprise: true },
  { label: "WAL durability (fdatasync)", developer: false, starter: false, pro: true, enterprise: true },
  { label: "SSO / OIDC · RBAC · immutable audit log", developer: false, starter: false, pro: true, enterprise: true },
  { label: "AEC Core (BIM/IFC, MEP, structural, VGA)", developer: false, starter: false, pro: true, enterprise: true },
  { label: "Applied Graphs (fraud, supply-chain)", developer: false, starter: false, pro: true, enterprise: true },
  { label: "Cloud backup (S3 / GCS / Azure Blob)", developer: false, starter: false, pro: true, enterprise: true },
  // Enterprise only
  { category: "Enterprise only", label: "Raft HA + automatic failover", developer: false, starter: false, pro: false, enterprise: true },
  { label: "Sharding + federated multi-graph queries", developer: false, starter: false, pro: false, enterprise: true },
  { label: "Managed KMS (Vault · AWS · GCP · Azure)", developer: false, starter: false, pro: false, enterprise: true },
  { label: "SOC vertical (threat detection + containment)", developer: false, starter: false, pro: false, enterprise: true },
  // Support
  { category: "Support", label: "Community (GitHub + Discord)", developer: true, starter: true, pro: true, enterprise: true },
  { label: "Email support", developer: false, starter: true, pro: true, enterprise: true },
  { label: "SLA-backed support", developer: false, starter: false, pro: true, enterprise: true },
  { label: "Dedicated success engineer", developer: false, starter: false, pro: false, enterprise: true },
];

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function MinusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
    </svg>
  );
}

// ─── Cell helpers ─────────────────────────────────────────────────────────────

function Cell({
  value,
  highlight,
}: {
  value: boolean | string;
  highlight: boolean;
}) {
  if (typeof value === "string") {
    return (
      <td
        className={`px-3 py-3 text-center text-xs ${
          highlight ? "text-white font-medium" : "text-zinc-400"
        }`}
      >
        {value}
      </td>
    );
  }
  return (
    <td className="px-3 py-3 text-center">
      {value ? (
        <CheckIcon
          className={`mx-auto h-4 w-4 ${
            highlight ? "text-purple-400" : "text-purple-600"
          }`}
        />
      ) : (
        <MinusIcon className="mx-auto h-4 w-4 text-zinc-800" />
      )}
    </td>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Pricing() {
  const [billing, setBilling] = useState<BillingCycle>("monthly");
  const [tableOpen, setTableOpen] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<PlanId | null>(null);

  async function handleCheckout(planId: PlanId) {
    if (loadingPlan) return;
    setLoadingPlan(planId);
    try {
      const res = await fetch("/checkout/create-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId, billing }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      window.location.href = data.checkout_url ?? data.redirect_url;
    } catch {
      window.location.href = "mailto:sales@purple8.ai?subject=Checkout%20issue";
    } finally {
      setLoadingPlan(null);
    }
  }

  return (
    <section id="pricing" className="bg-[#0a0a0f] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
            Pricing
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Start free. Scale when you need to.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-zinc-500">
            Self-hosted — runs in your own infrastructure. No usage metering,
            no data leaving your environment. License key activates the tier;
            everything else is yours.
          </p>

          {/* Billing toggle */}
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-zinc-800 bg-zinc-900/60 p-1">
            {(["monthly", "annual"] as BillingCycle[]).map((c) => (
              <button
                key={c}
                onClick={() => setBilling(c)}
                className={`rounded-full px-5 py-1.5 text-sm font-medium transition-colors ${
                  billing === c
                    ? "bg-purple-600 text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {c === "monthly" ? "Monthly" : "Annual"}
                {c === "annual" && (
                  <span className="ml-1.5 rounded-full bg-purple-900/60 px-2 py-0.5 text-xs text-purple-300">
                    10 months for 12
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Plan cards ── */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-2xl border p-7 ${
                plan.highlight
                  ? "border-purple-600/60 bg-gradient-to-b from-purple-900/30 to-[#11111b] shadow-lg shadow-purple-900/30"
                  : "border-zinc-800 bg-[#11111b]"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-purple-600 px-3 py-0.5 text-xs font-semibold text-white">
                  {plan.badge}
                </span>
              )}

              <h3 className="text-base font-semibold text-white">{plan.name}</h3>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-white">
                  {billing === "annual" ? plan.price.annual : plan.price.monthly}
                </span>
                {plan.price.monthly !== "Custom" && plan.price.monthly !== "$0" && (
                  <span className="text-sm text-zinc-500">/mo</span>
                )}
              </div>
              {billing === "annual" && plan.annualNote && (
                <p className="mt-0.5 text-xs text-zinc-600">{plan.annualNote}</p>
              )}

              <p className="mt-2 text-xs font-medium text-purple-400">
                {plan.quota} · {plan.seats}
              </p>

              <p className="mt-3 flex-1 text-xs leading-relaxed text-zinc-500">
                {plan.tagline}
              </p>

              {plan.id === "developer" ? (
                /* Developer — direct GitHub download link */
                <a
                  href={plan.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 block rounded-full px-4 py-2 text-center text-sm font-semibold transition-colors border border-purple-800/60 text-purple-300 hover:border-purple-600 hover:text-white"
                >
                  {plan.cta}
                </a>
              ) : plan.id === "enterprise" ? (
                /* Enterprise — direct mailto */
                <a
                  href={plan.ctaHref}
                  className="mt-6 block rounded-full px-4 py-2 text-center text-sm font-semibold transition-colors border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white"
                >
                  {plan.cta}
                </a>
              ) : (
                /* Starter / Pro — Stripe checkout via POST */
                <button
                  onClick={() => handleCheckout(plan.id)}
                  disabled={loadingPlan !== null}
                  className={`mt-6 w-full rounded-full px-4 py-2 text-center text-sm font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${
                    plan.highlight
                      ? "bg-purple-600 text-white hover:bg-purple-500"
                      : "border border-purple-800/60 text-purple-300 hover:border-purple-600 hover:text-white"
                  }`}
                >
                  {loadingPlan === plan.id ? "Redirecting…" : plan.cta}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* ── Marketplace note ── */}
        <p className="mt-6 text-center text-xs text-zinc-600">
          All paid tiers available on{" "}
          <span className="text-zinc-500">AWS Marketplace</span>,{" "}
          <span className="text-zinc-500">GCP Marketplace</span>, and{" "}
          <span className="text-zinc-500">Azure Marketplace</span>.
          Annual billing: pay for 10 months, get 12.
        </p>

        {/* ── Feature table (collapsible) ── */}
        <div className="mt-14">
          <button
            onClick={() => setTableOpen((v) => !v)}
            className="mx-auto flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
          >
            <span>{tableOpen ? "Hide" : "Show"} full feature comparison</span>
            <span className="text-xs">{tableOpen ? "▲" : "▼"}</span>
          </button>

          {tableOpen && (
            <div className="mt-6 overflow-x-auto rounded-2xl border border-zinc-800">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-900/60">
                    <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 w-2/5">
                      Feature
                    </th>
                    {PLANS.map((p) => (
                      <th
                        key={p.id}
                        className={`px-3 py-3 text-center text-xs font-semibold w-[15%] ${
                          p.highlight ? "text-purple-300" : "text-zinc-400"
                        }`}
                      >
                        {p.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {FEATURE_ROWS.map((row, idx) => {
                    if (row.category) {
                      return (
                        <tr key={`cat-${row.category}`} className="bg-purple-950/20 border-t border-zinc-800">
                          <td
                            colSpan={5}
                            className="px-4 py-2 text-xs font-semibold uppercase tracking-widest text-purple-500"
                          >
                            {row.category}
                          </td>
                        </tr>
                      );
                    }
                    return (
                      <tr
                        key={row.label}
                        className={`border-t border-zinc-800/60 ${
                          idx % 2 === 0 ? "bg-zinc-900/20" : "bg-transparent"
                        }`}
                      >
                        <td className="px-4 py-3 text-xs text-zinc-400">{row.label}</td>
                        <Cell value={row.developer} highlight={false} />
                        <Cell value={row.starter} highlight={true} />
                        <Cell value={row.pro} highlight={false} />
                        <Cell value={row.enterprise} highlight={false} />
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ── CTA ── */}
        <div className="mt-14 text-center">
          <p className="text-sm text-zinc-600">
            Questions about which plan fits your team?
          </p>
          <a
            href="mailto:sales@purple8.ai"
            className="mt-2 inline-block text-sm font-medium text-purple-400 transition-colors hover:text-purple-300"
          >
            Talk to us →
          </a>
        </div>
      </div>
    </section>
  );
}
