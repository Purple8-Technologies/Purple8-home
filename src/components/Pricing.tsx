"use client";

import { useState } from "react";
import Link from "next/link";
import { CC_BASE_URL } from "@/lib/cc";
import {
  GRAPH_TIERS,
  DOCINTEL_TIERS,
  DOCINTEL_CLOUD_BANDS,
  docIntelCloudBill,
  priceLabel,
  type GraphTierId,
  type BillingCycle,
} from "@/lib/pricing";
import { FACTS as F } from "@/lib/facts";

type ProductTab = "graph" | "docintel";

// ─── Feature comparison — 2 Self-Hosted CAPABILITY columns ────────────────────
// Self-hosted is simple: Developer (Free) for local building/prototyping, and
// one commercial tier — Enterprise / Custom — for production deployments.

interface FeatureRow {
  category?: string;
  label: string;
  developer: boolean | string;
  enterprise: boolean | string;
}

const FEATURE_ROWS: FeatureRow[] = [
  // Core — every tier, including free Developer
  { category: "Core engine — every tier", label: "Nodes, edges & graph traversal", developer: true, enterprise: true },
  { label: "Full-text + vector / semantic search", developer: true, enterprise: true },
  { label: "ACID transactions", developer: true, enterprise: true },
  { label: "REST API + Python & TypeScript SDKs", developer: true, enterprise: true },
  { label: `All ${F.mcpTools} MCP tools (graph · rag · data · journey · memory · registry · scheduler · egress · feedback · schema · admin)`, developer: true, enterprise: true },
  { label: "All RAG pipelines (basic, hybrid, graph-guided)", developer: true, enterprise: true },
  { label: "All 67 graph & AEC algorithms", developer: true, enterprise: true },
  { label: "Journey Engine + SLA monitoring", developer: true, enterprise: true },
  { label: "Human-in-the-Loop (HITL) gates", developer: true, enterprise: true },
  // Enterprise / Custom (Self-Hosted Commercial)
  { category: "Enterprise / Custom — Commercial Self-Hosted", label: "Node & edge capacity", developer: "Up to 50K nodes", enterprise: "Custom / Unlimited" },
  { label: "Advanced RAG (late & agentic chunking)", developer: false, enterprise: true },
  { label: "Managed KMS (Local · Vault · AWS · GCP · Azure)", developer: false, enterprise: true },
  { label: "Data lineage + local & cloud backup (S3 / GCS / Azure Blob)", developer: false, enterprise: true },
  { label: "Change Data Capture (CDC) & durable writes", developer: false, enterprise: true },
  { label: "SSO / OIDC · RBAC · immutable audit log", developer: false, enterprise: true },
  { label: "Field / row-level security + PII tagging", developer: false, enterprise: true },
  { label: "AEC Core & Advanced (BIM/IFC, MEP, structural, VGA)", developer: false, enterprise: true },
  { label: "Applied Graphs (fraud, supply-chain, attack-paths)", developer: false, enterprise: true },
  { label: "Raft HA + automatic failover", developer: false, enterprise: true },
  { label: "Sharding + Supergraph federated multi-graph queries", developer: false, enterprise: true },
  { label: "SOC vertical (threat detection + containment)", developer: false, enterprise: true },
  // Support
  { category: "Support", label: "Community (GitHub + Discord)", developer: true, enterprise: true },
  { label: "SLA-backed enterprise support & dedicated success engineer", developer: false, enterprise: true },
];

const CAP_COLUMNS: { key: keyof Omit<FeatureRow, "category" | "label">; label: string; sub: string; highlight: boolean }[] = [
  { key: "developer", label: "Developer", sub: "Self-Hosted Free", highlight: false },
  { key: "enterprise", label: "Enterprise / Custom", sub: "Commercial Self-Hosted", highlight: true },
];

// ─── DocIntel feature rows ────────────────────────────────────────────────────

interface DocIntelFeatureRow {
  category?: string;
  label: string;
  beta: boolean | string;
  enterprise: boolean | string;
  cloud: boolean | string;
}

const DOCINTEL_FEATURE_ROWS: DocIntelFeatureRow[] = [
  { category: "Capacity", label: "Volume", beta: "500 docs / month", enterprise: "Custom / Unlimited", cloud: "No limit — billed per page" },
  { category: "Parsing", label: "70+ document formats (PDF, DOCX, XLSX, PPTX, HTML…)", beta: true, enterprise: true, cloud: true },
  { label: "CAD / BIM (IFC, DXF, STEP)", beta: true, enterprise: true, cloud: true },
  { label: "SAP IDocs", beta: true, enterprise: true, cloud: true },
  { label: "Image + scanned PDF (OCR)", beta: "Tesseract + P8OCR", enterprise: "Tesseract + P8OCR", cloud: "Tesseract + P8OCR" },
  { category: "Extraction", label: "GLiNER NER — Pass 1", beta: true, enterprise: true, cloud: true },
  { label: "LLM relationship extraction — Pass 2", beta: "OpenAI only", enterprise: "Any local or cloud LLM", cloud: "Our default model or your own LLM" },
  { label: "Domain profiles (AEC, contract, financial, scientific)", beta: true, enterprise: true, cloud: true },
  { label: "Custom extraction ontology", beta: true, enterprise: true, cloud: true },
  { category: "Connectors", label: "Webhook (inbound push)", beta: true, enterprise: true, cloud: true },
  { label: "SharePoint + Confluence sync", beta: false, enterprise: true, cloud: true },
  { label: "AWS S3 sync", beta: false, enterprise: true, cloud: true },
  { category: "Updates & support", label: "Every new version — included", beta: true, enterprise: true, cloud: true },
  { label: "SLA-backed enterprise support", beta: false, enterprise: true, cloud: true },
];

// ─── Cell helpers ─────────────────────────────────────────────────────────────

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

function Cell({ value, highlight }: { value: boolean | string; highlight: boolean }) {
  if (typeof value === "string") {
    return (
      <td className={`px-3 py-3 text-center text-xs ${highlight ? "text-white font-medium" : "text-zinc-400"}`}>
        {value}
      </td>
    );
  }
  return (
    <td className="px-3 py-3 text-center">
      {value ? (
        <CheckIcon className={`mx-auto h-4 w-4 ${highlight ? "text-purple-400" : "text-purple-600"}`} />
      ) : (
        <MinusIcon className="mx-auto h-4 w-4 text-zinc-800" />
      )}
    </td>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Pricing() {
  const [billing, setBilling] = useState<BillingCycle>("monthly");
  const [product, setProduct] = useState<ProductTab>("graph");
  const [tableOpen, setTableOpen] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<GraphTierId | null>(null);

  async function handleCheckout(planId: GraphTierId) {
    if (loadingPlan) return;
    setLoadingPlan(planId);
    try {
      const res = await fetch(`${CC_BASE_URL}/billing/checkout/create-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId, billing }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      const checkoutUrl = data?.checkout_url ?? data?.redirect_url;
      if (!checkoutUrl || typeof checkoutUrl !== "string") {
        throw new Error("Checkout URL missing from billing service response.");
      }
      window.location.href = checkoutUrl;
    } catch {
      window.location.href = `mailto:sales@purple8.ai?subject=Checkout%20issue%20(${planId})`;
    } finally {
      setLoadingPlan(null);
    }
  }

  return (
    <section id="pricing" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
            Pricing
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Start free. One commercial self-hosted tier: Enterprise / Custom.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-400">
            {product === "docintel" ? (
              "Choose Community (free) or Enterprise / Custom for self-hosting, or Cloud Graduated for managed document processing."
            ) : (
              <>Self-hosted — runs in your own infrastructure, nothing leaves your
            environment. Build and prototype for free with the{" "}
            <span className="text-zinc-300">Developer edition</span>, and move to{" "}
            <span className="text-zinc-300">Enterprise / Custom</span> when you
            deploy in production.</>
            )}
          </p>

          {/* Product tabs */}
          <div className="mt-8 inline-flex items-center gap-1 rounded-full border border-zinc-800 bg-zinc-900/60 p-1">
            {([
              { id: "graph", label: "Purple8" },
              { id: "docintel", label: "DocIntel" },
            ] as { id: ProductTab; label: string }[]).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setProduct(tab.id)}
                className={`rounded-full px-5 py-1.5 text-sm font-medium transition-colors ${
                  product === tab.id ? "bg-purple-600 text-white" : "text-zinc-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Purple8 plan cards ── */}
        {product === "graph" ? (
          <>
            <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
              {GRAPH_TIERS.map((tier) => {
                const p = priceLabel(tier, billing);
                return (
                  <div
                    key={tier.id}
                    className={`relative flex flex-col rounded-2xl border p-7 ${
                      tier.highlight
                        ? "border-purple-600/60 bg-gradient-to-b from-purple-900/30 to-[#11111b] shadow-lg shadow-purple-900/30"
                        : "border-zinc-800 bg-[#11111b]"
                    }`}
                  >
                    {tier.badge && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-purple-600 px-3 py-0.5 text-xs font-semibold text-white">
                        {tier.badge}
                      </span>
                    )}

                    <h3 className="text-base font-semibold text-white">{tier.name}</h3>

                    <div className="mt-3 flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold text-white">{p.amount}</span>
                      {p.suffix && <span className="text-sm text-zinc-400">{p.suffix}</span>}
                    </div>
                    {p.note && <p className="mt-0.5 text-xs text-zinc-400">{p.note}</p>}

                    <p className="mt-2 text-xs font-medium text-purple-400">
                      {tier.nodesLabel} nodes ·{" "}
                      {tier.agents === null ? "Unlimited agents" : `${tier.agents} MCP agent${tier.agents > 1 ? "s" : ""}`}
                    </p>

                    <p className="mt-3 flex-1 text-xs leading-relaxed text-zinc-400">
                      {tier.tagline}
                    </p>

                    {tier.id === "developer" ? (
                      <Link
                        href="/register/"
                        className="mt-6 block rounded-full border border-purple-800/60 px-4 py-2.5 text-center text-sm font-semibold text-purple-300 transition-colors hover:border-purple-600 hover:text-white"
                      >
                        {tier.cta}
                      </Link>
                    ) : tier.id === "enterprise" ? (
                      <a
                        href="mailto:sales@purple8.ai?subject=Enterprise%20license%20inquiry"
                        className="mt-6 block rounded-full bg-purple-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-purple-500"
                      >
                        {tier.cta}
                      </a>
                    ) : (
                      <button
                        onClick={() => handleCheckout(tier.id)}
                        disabled={loadingPlan !== null}
                        className={`mt-6 w-full rounded-full px-4 py-2 text-center text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                          tier.highlight
                            ? "bg-purple-600 text-white hover:bg-purple-500"
                            : "border border-purple-800/60 text-purple-300 hover:border-purple-600 hover:text-white"
                        }`}
                      >
                        {loadingPlan === tier.id ? "Redirecting…" : tier.cta}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Reinforce the core message */}
            <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-purple-900/40 bg-purple-950/20 px-6 py-4 text-center">
              <p className="text-sm text-zinc-300">
                <span className="font-semibold text-purple-300">No artificial middle tiers for self-hosted.</span>{" "}
                Prototype locally for free with Developer, or deploy in production with Enterprise / Custom tailored to your hardware, cluster topology, and SLA.
              </p>
            </div>

            <p className="mt-6 text-center text-xs text-zinc-400">
              Not sure which one?{" "}
              <a href="#calculator" className="text-purple-400 hover:text-purple-300">
                Use the tier finder ↑
              </a>{" "}
              · Enterprise / Custom is available directly and via Red Hat, AWS, GCP &amp; Azure Marketplace.
            </p>
          </>
        ) : (
          <>
            <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
              {DOCINTEL_TIERS.map((tier) => (
                <div
                  key={tier.id}
                  className={`relative flex flex-col rounded-2xl border p-7 ${
                    tier.highlight
                      ? "border-purple-600/60 bg-gradient-to-b from-purple-900/30 to-[#11111b] shadow-lg shadow-purple-900/30"
                      : "border-zinc-800 bg-[#11111b]"
                  }`}
                >
                  {tier.badge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-purple-600 px-3 py-0.5 text-xs font-semibold text-white">
                      {tier.badge}
                    </span>
                  )}

                  <h3 className="text-base font-semibold text-white">{tier.name}</h3>

                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-white">{tier.price}</span>
                    {tier.price !== "Custom" && tier.price !== "$0" && (
                      <span className="text-sm text-zinc-400">{tier.priceUnit ?? "/mo"}</span>
                    )}
                  </div>

                  <p className="mt-2 text-xs font-medium text-purple-400">
                    {tier.quota} · {tier.seats}
                  </p>

                  <p className="mt-3 flex-1 text-xs leading-relaxed text-zinc-400">
                    {tier.tagline}
                  </p>

                  {tier.id === "beta" ? (
                    <Link
                      href={tier.ctaHref}
                      className="mt-6 block rounded-full border border-purple-800/60 px-4 py-2 text-center text-sm font-semibold text-purple-300 transition-colors hover:border-purple-600 hover:text-white"
                    >
                      {tier.cta}
                    </Link>
                  ) : (
                    <a
                      href={tier.ctaHref}
                      className={`mt-6 block rounded-full px-4 py-2 text-center text-sm font-semibold transition-colors ${
                        tier.highlight
                          ? "bg-purple-600 text-white hover:bg-purple-500"
                          : "border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white"
                      }`}
                    >
                      {tier.cta}
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* DocIntel Cloud bands — mirrors the Stripe price (lib/pricing.ts) */}
            <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-purple-900/40 bg-purple-950/20 px-6 py-5">
              <p className="text-center text-sm font-semibold text-purple-300">
                Cloud pricing — monthly access plus graduated page usage
              </p>
              <table className="mx-auto mt-4 w-full max-w-xl text-xs">
                <thead>
                  <tr className="text-zinc-400">
                    <th className="py-1 text-left font-medium">Pages / month</th>
                    <th className="py-1 text-right font-medium">Access fee</th>
                    <th className="py-1 text-right font-medium">Per page</th>
                  </tr>
                </thead>
                <tbody>
                  {DOCINTEL_CLOUD_BANDS.map((b, i) => {
                    const from = i === 0 ? 1 : (DOCINTEL_CLOUD_BANDS[i - 1].upTo ?? 0) + 1;
                    return (
                      <tr key={from} className="border-t border-zinc-800/60 text-zinc-300">
                        <td className="py-1.5">
                          {b.upTo === null
                            ? `${from.toLocaleString("en-US")}+`
                            : `${from.toLocaleString("en-US")} – ${b.upTo.toLocaleString("en-US")}`}
                        </td>
                        <td className="py-1.5 text-right">${b.flatUsd}</td>
                        <td className="py-1.5 text-right">${b.perPageUsd}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <p className="mt-3 text-center text-xs text-zinc-400">
                Example: 10,000 pages = ${docIntelCloudBill(10_000).toLocaleString("en-US")} ·
                50,000 pages = ${docIntelCloudBill(50_000).toLocaleString("en-US")}. Billed monthly
                usage in arrears; the access fee is paid upfront. Prices exclude tax.
              </p>
              <p className="mt-3 text-center text-xs text-zinc-400">
                The separate $0.03/page prepaid option is not available for activation yet.
              </p>
            </div>
          </>
        )}

        {/* ── Feature table (collapsible) ── */}
        <div className="mt-14">
          <button
            onClick={() => setTableOpen((v) => !v)}
            className="mx-auto flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-zinc-300"
          >
            <span>{tableOpen ? "Hide" : "Show"} full feature comparison</span>
            <span className="text-xs">{tableOpen ? "▲" : "▼"}</span>
          </button>

          {tableOpen && (
            <div className="mt-6 overflow-x-auto rounded-2xl border border-zinc-800">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-900/60">
                    <th className="w-2/5 px-4 py-3 text-left text-xs font-medium text-zinc-400">
                      Feature
                    </th>
                    {product === "graph"
                      ? CAP_COLUMNS.map((col) => (
                          <th
                            key={col.key}
                            className={`px-3 py-3 text-center text-xs font-semibold ${
                              col.highlight ? "text-purple-300" : "text-zinc-400"
                            }`}
                          >
                            {col.label}
                            <span className="mt-0.5 block text-[10px] font-normal text-zinc-400">
                              {col.sub}
                            </span>
                          </th>
                        ))
                      : ["Community (Self-Hosted)", "Enterprise (Self-Hosted)", "Cloud"].map((name, i) => (
                          <th
                            key={name}
                            className={`px-3 py-3 text-center text-xs font-semibold ${
                              i >= 1 ? "text-purple-300" : "text-zinc-400"
                            }`}
                          >
                            {name}
                          </th>
                        ))}
                  </tr>
                </thead>
                <tbody>
                  {product === "graph"
                    ? FEATURE_ROWS.map((row, idx) => {
                        if (row.category) {
                          return (
                            <tr key={`cat-${row.category}`} className="border-t border-zinc-800 bg-purple-950/20">
                              <td colSpan={3} className="px-4 py-2 text-xs font-semibold uppercase tracking-widest text-purple-500">
                                {row.category}
                              </td>
                            </tr>
                          );
                        }
                        return (
                          <tr key={row.label} className={`border-t border-zinc-800/60 ${idx % 2 === 0 ? "bg-zinc-900/20" : ""}`}>
                            <td className="px-4 py-3 text-xs text-zinc-400">{row.label}</td>
                            <Cell value={row.developer} highlight={false} />
                            <Cell value={row.enterprise} highlight={true} />
                          </tr>
                        );
                      })
                    : DOCINTEL_FEATURE_ROWS.map((row, idx) => {
                        if (row.category) {
                          return (
                            <tr key={`cat-${row.category}`} className="border-t border-zinc-800 bg-purple-950/20">
                              <td colSpan={4} className="px-4 py-2 text-xs font-semibold uppercase tracking-widest text-purple-500">
                                {row.category}
                              </td>
                            </tr>
                          );
                        }
                        return (
                          <tr key={row.label} className={`border-t border-zinc-800/60 ${idx % 2 === 0 ? "bg-zinc-900/20" : ""}`}>
                            <td className="px-4 py-3 text-xs text-zinc-400">{row.label}</td>
                            <Cell value={row.beta} highlight={false} />
                            <Cell value={row.enterprise} highlight={true} />
                            <Cell value={row.cloud} highlight={true} />
                          </tr>
                        );
                      })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ── CTA ── */}
        <div className="mt-16 text-center">
          <p className="text-2xl font-bold text-white sm:text-3xl">
            Questions about which plan fits your team?
          </p>
          <a
            href="mailto:sales@purple8.ai"
            className="mt-5 inline-block rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-purple-500"
          >
            Talk to us →
          </a>
        </div>
      </div>
    </section>
  );
}
