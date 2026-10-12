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

// ─── Feature comparison — 4 CAPABILITY columns ────────────────────────────────
// Micro → Starter share ONE column ("Production") because their feature set is
// identical; only capacity (nodes) differs. That is the whole pricing story.

interface FeatureRow {
  category?: string;
  label: string;
  developer: boolean | string;
  production: boolean | string;
  pro: boolean | string;
  enterprise: boolean | string;
}

const FEATURE_ROWS: FeatureRow[] = [
  // Core — every tier, including free Developer
  { category: "Core engine — every tier", label: "Nodes, edges & graph traversal", developer: true, production: true, pro: true, enterprise: true },
  { label: "Full-text + vector / semantic search", developer: true, production: true, pro: true, enterprise: true },
  { label: "ACID transactions", developer: true, production: true, pro: true, enterprise: true },
  { label: "REST API + Python & TypeScript SDKs", developer: true, production: true, pro: true, enterprise: true },
  { label: `All ${F.mcpTools} MCP tools (graph · rag · data · journey · memory · registry · scheduler · egress · feedback · schema · admin)`, developer: true, production: true, pro: true, enterprise: true },
  { label: "All RAG pipelines (basic, hybrid, graph-guided)", developer: true, production: true, pro: true, enterprise: true },
  { label: "All 67 graph & AEC algorithms", developer: true, production: true, pro: true, enterprise: true },
  { label: "Journey Engine + SLA monitoring", developer: true, production: true, pro: true, enterprise: true },
  { label: "Human-in-the-Loop (HITL) gates", developer: true, production: true, pro: true, enterprise: true },
  // Production family — Micro, Mini, Growth, Starter (lifts the node/edge cap for production scale)
  { category: "Production — Micro → Starter", label: "Advanced RAG (late & agentic chunking)", developer: false, production: true, pro: true, enterprise: true },
  { label: "Local KMS (encryption at rest)", developer: false, production: true, pro: true, enterprise: true },
  { label: "Data lineage + local backup", developer: false, production: true, pro: true, enterprise: true },
  // Pro & above
  { category: "Pro & above", label: "Change Data Capture (CDC)", developer: false, production: false, pro: true, enterprise: true },
  { label: "Durable writes", developer: false, production: false, pro: true, enterprise: true },
  { label: "SSO / OIDC · RBAC · immutable audit log", developer: false, production: false, pro: true, enterprise: true },
  { label: "Field / row-level security + PII tagging", developer: false, production: false, pro: true, enterprise: true },
  { label: "AEC Core (BIM/IFC, MEP, structural, VGA)", developer: false, production: false, pro: true, enterprise: true },
  { label: "Applied Graphs (fraud, supply-chain, attack-paths)", developer: false, production: false, pro: true, enterprise: true },
  { label: "Cloud backup (S3 / GCS / Azure Blob)", developer: false, production: false, pro: true, enterprise: true },
  // Enterprise only
  { category: "Enterprise only", label: "Raft HA + automatic failover", developer: false, production: false, pro: false, enterprise: true },
  { label: "Sharding + federated multi-graph queries", developer: false, production: false, pro: false, enterprise: true },
  { label: "Managed KMS (Vault · AWS · GCP · Azure)", developer: false, production: false, pro: false, enterprise: true },
  { label: "SOC vertical (threat detection + containment)", developer: false, production: false, pro: false, enterprise: true },
  { label: "Supergraph + Node2Vec + AEC Advanced", developer: false, production: false, pro: false, enterprise: true },
  // Support
  { category: "Support", label: "Community (GitHub + Discord)", developer: true, production: true, pro: true, enterprise: true },
  { label: "Email support", developer: false, production: true, pro: true, enterprise: true },
  { label: "SLA-backed support", developer: false, production: false, pro: true, enterprise: true },
  { label: "Dedicated success engineer", developer: false, production: false, pro: false, enterprise: true },
];

const CAP_COLUMNS: { key: keyof Omit<FeatureRow, "category" | "label">; label: string; sub: string; highlight: boolean }[] = [
  { key: "developer", label: "Developer", sub: "Free", highlight: false },
  { key: "production", label: "Production", sub: "Micro → Starter", highlight: true },
  { key: "pro", label: "Pro", sub: "Request pricing", highlight: false },
  { key: "enterprise", label: "Enterprise", sub: "Talk to sales", highlight: false },
];

// ─── DocIntel feature rows ────────────────────────────────────────────────────

interface DocIntelFeatureRow {
  category?: string;
  label: string;
  beta: boolean | string;
  cloud: boolean | string;
}

const DOCINTEL_FEATURE_ROWS: DocIntelFeatureRow[] = [
  { category: "Capacity", label: "Volume", beta: "500 docs / month", cloud: "No limit — billed per page" },
  { category: "Parsing", label: "70+ document formats (PDF, DOCX, XLSX, PPTX, HTML…)", beta: true, cloud: true },
  { label: "CAD / BIM (IFC, DXF, STEP)", beta: true, cloud: true },
  { label: "SAP IDocs", beta: true, cloud: true },
  { label: "Image + scanned PDF (OCR)", beta: "Tesseract + P8OCR", cloud: "Tesseract + P8OCR" },
  { category: "Extraction", label: "GLiNER NER — Pass 1", beta: true, cloud: true },
  { label: "LLM relationship extraction — Pass 2", beta: "OpenAI only", cloud: "Our default model or your own LLM" },
  { label: "Domain profiles (AEC, contract, financial, scientific)", beta: true, cloud: true },
  { label: "Custom extraction ontology", beta: true, cloud: true },
  { category: "Connectors", label: "Webhook (inbound push)", beta: true, cloud: true },
  { label: "SharePoint + Confluence sync", beta: false, cloud: true },
  { label: "AWS S3 sync", beta: false, cloud: true },
  { category: "Updates & support", label: "Every new version — included", beta: true, cloud: true },
  { label: "Community (GitHub + Discord)", beta: true, cloud: true },
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
            Start free. Pay for capacity, never for features.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-400">
            Self-hosted — runs in your own infrastructure, nothing leaves your
            environment. Every production tier from Micro to Starter ships the{" "}
            <span className="text-zinc-300">exact same feature set</span>. Moving
            up the ladder buys more capacity, not more capability.
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

          {/* Billing toggle — Purple8 only */}
          {product === "graph" && (
            <div className="mt-4 inline-flex items-center gap-3 rounded-full border border-zinc-800 bg-zinc-900/60 p-1">
              {(["monthly", "annual"] as BillingCycle[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setBilling(c)}
                  className={`rounded-full px-5 py-1.5 text-sm font-medium transition-colors ${
                    billing === c ? "bg-purple-600 text-white" : "text-zinc-400 hover:text-white"
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
          )}
        </div>

        {/* ── Purple8 plan cards ── */}
        {product === "graph" ? (
          <>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {GRAPH_TIERS.map((tier) => {
                const p = priceLabel(tier, billing);
                return (
                  <div
                    key={tier.id}
                    className={`relative flex flex-col rounded-2xl border p-6 ${
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
                        className="mt-6 block rounded-full border border-purple-800/60 px-4 py-2 text-center text-sm font-semibold text-purple-300 transition-colors hover:border-purple-600 hover:text-white"
                      >
                        {tier.cta}
                      </Link>
                    ) : tier.id === "enterprise" ? (
                      <a
                        href="mailto:sales@purple8.ai?subject=Enterprise%20license%20inquiry"
                        className="mt-6 block rounded-full border border-zinc-700 px-4 py-2 text-center text-sm font-semibold text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
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
                <span className="font-semibold text-purple-300">The full production engine is $119/mo.</span>{" "}
                Micro, Mini, Growth, and Starter are the same product — you pick
                the capacity you need and upgrade only when you outgrow it.
              </p>
            </div>

            <p className="mt-6 text-center text-xs text-zinc-400">
              Not sure which one?{" "}
              <a href="#calculator" className="text-purple-400 hover:text-purple-300">
                Use the tier finder ↑
              </a>{" "}
              · All paid tiers will be available on AWS, GCP &amp; Azure Marketplace soon.
            </p>
          </>
        ) : (
          <>
            <div className="mx-auto mt-12 grid max-w-3xl gap-6 md:grid-cols-2">
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
                Cloud pricing — your month&apos;s total pages picks one band
              </p>
              <table className="mx-auto mt-4 w-full max-w-xl text-xs">
                <thead>
                  <tr className="text-zinc-400">
                    <th className="py-1 text-left font-medium">Pages / month</th>
                    <th className="py-1 text-right font-medium">Monthly fee</th>
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
                in arrears; prices exclude tax.
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
                      : ["Community", "Cloud"].map((name, i) => (
                          <th
                            key={name}
                            className={`px-3 py-3 text-center text-xs font-semibold ${
                              i === 1 ? "text-purple-300" : "text-zinc-400"
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
                              <td colSpan={5} className="px-4 py-2 text-xs font-semibold uppercase tracking-widest text-purple-500">
                                {row.category}
                              </td>
                            </tr>
                          );
                        }
                        return (
                          <tr key={row.label} className={`border-t border-zinc-800/60 ${idx % 2 === 0 ? "bg-zinc-900/20" : ""}`}>
                            <td className="px-4 py-3 text-xs text-zinc-400">{row.label}</td>
                            <Cell value={row.developer} highlight={false} />
                            <Cell value={row.production} highlight={true} />
                            <Cell value={row.pro} highlight={false} />
                            <Cell value={row.enterprise} highlight={false} />
                          </tr>
                        );
                      })
                    : DOCINTEL_FEATURE_ROWS.map((row, idx) => {
                        if (row.category) {
                          return (
                            <tr key={`cat-${row.category}`} className="border-t border-zinc-800 bg-purple-950/20">
                              <td colSpan={5} className="px-4 py-2 text-xs font-semibold uppercase tracking-widest text-purple-500">
                                {row.category}
                              </td>
                            </tr>
                          );
                        }
                        return (
                          <tr key={row.label} className={`border-t border-zinc-800/60 ${idx % 2 === 0 ? "bg-zinc-900/20" : ""}`}>
                            <td className="px-4 py-3 text-xs text-zinc-400">{row.label}</td>
                            <Cell value={row.beta} highlight={false} />
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
