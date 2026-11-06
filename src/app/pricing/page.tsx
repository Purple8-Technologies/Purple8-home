import type { Metadata } from "next";
import BrandShell from "@/components/revamp/BrandShell";
import { DOCINTEL_TIERS, GRAPH_TIERS } from "@/lib/pricing";
import { FACTS as F } from "@/lib/facts";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Pricing - Purple8 Hyper Graph & Purple8 DocIntel",
  description:
    "Transparent pricing for Purple8 Hyper Graph (Free Playground $0, Builder $39/mo, Production $149/mo, Growth $499/mo, Enterprise BYOC) and Purple8 DocIntel (Free Sandbox $0, Builder $79/mo, Production $299/mo, Growth $599/mo, Enterprise).",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <BrandShell>
      <section className="mx-auto max-w-7xl px-4 pt-28 pb-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--p8-accent)]">
            Pricing &amp; Editions
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Start in the Free Playground. Scale by Capacity &amp; Operational Guarantees.
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-[var(--p8-muted)]">
            Two independent products, each available on <strong className="text-[var(--p8-fg)]">Purple8 Cloud</strong>{" "}
            (zero infrastructure to manage) or <strong className="text-[var(--p8-fg)]">Self-Hosted / BYOC</strong>{" "}
            (in your own VPC, Red Hat OpenShift, or air-gapped network). We never meter or restrict by MCP agent connections - every tier includes all {F.mcpTools} Hyper Graph MCP tools (or 13 DocIntel MCP tools).
          </p>
        </div>

        {/* ── Product 1: Purple8 Hyper Graph ── */}
        <div id="hyper-graph" className="mt-16 scroll-mt-24">
          <div className="mb-8 flex flex-col justify-between gap-2 border-b border-[var(--p8-border)] pb-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--p8-accent)]">
                Product 1 · AI-Native Application Backend
              </p>
              <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
                Purple8 Hyper Graph
              </h2>
            </div>
            <p className="text-xs text-[var(--p8-muted)]">
              Unified LPG + RDF + Vector + Relational Tables + Journey Workflows + {F.mcpTools} MCP Tools
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-5">
            {GRAPH_TIERS.map((t) => {
              const isFree = t.id === "developer";
              const isPaid = typeof t.priceMonthly === "number" && t.priceMonthly > 0;
              const href = isFree
                ? "/try/graph/"
                : isPaid
                ? `/checkout/create-session/?plan=${t.id}&billing=monthly`
                : "mailto:sales@purple8.ai?subject=Purple8%20Hyper%20Graph%20Enterprise%20Inquiry";
              return (
                <div
                  key={t.id}
                  className={
                    "flex flex-col rounded-2xl border bg-[var(--p8-surface)] p-6 " +
                    (t.highlight ? "border-[var(--p8-accent)] ring-1 ring-[var(--p8-accent)]" : "border-[var(--p8-border)]")
                  }
                >
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--p8-accent)]">
                    {t.badge || "Evaluation & Local Dev"}
                  </p>
                  <h3 className="mt-2 text-lg font-bold">{t.name}</h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold">
                      {isFree ? "$0" : isPaid ? `$${t.priceMonthly}` : "Custom"}
                    </span>
                    {isPaid && <span className="text-xs text-[var(--p8-muted)]">/mo</span>}
                  </div>
                  <p className="mt-1 text-xs text-[var(--p8-muted)]">
                    {isFree
                      ? "10K Cloud Sandbox / 50K Local Docker"
                      : isPaid
                      ? `$${t.priceAnnual}/mo billed annually · ${t.nodesLabel}`
                      : "Unlimited scale · Sovereign VPC & Air-Gap"}
                  </p>
                  <p className="mt-4 flex-1 text-xs leading-relaxed text-[var(--p8-muted)]">
                    {t.tagline}
                  </p>
                  <div className="mt-6 flex flex-col gap-2">
                    <a
                      href={href}
                      className={
                        "rounded-full px-4 py-2.5 text-center text-xs font-semibold transition " +
                        (t.highlight
                          ? "bg-[var(--p8-button)] text-white hover:opacity-90"
                          : "border border-[var(--p8-border)] hover:border-[var(--p8-accent)] hover:text-[var(--p8-accent)]")
                      }
                    >
                      {t.cta}
                    </a>
                    {isPaid && (
                      <a
                        href={`/checkout/create-session/?plan=${t.id}&billing=annual`}
                        className="text-center text-[11px] text-[var(--p8-accent)] hover:underline"
                      >
                        Or pay annually (${t.priceAnnual}/mo) →
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Product 2: Purple8 DocIntel ── */}
        <div id="docintel" className="mt-20 scroll-mt-24">
          <div className="mb-8 flex flex-col justify-between gap-2 border-b border-[var(--p8-border)] pb-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--p8-accent)]">
                Product 2 · Universal Document Intelligence (Standalone or Paired)
              </p>
              <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
                Purple8 DocIntel
              </h2>
            </div>
            <p className="text-xs text-[var(--p8-muted)]">
              {F.docFormats} Document Formats · {F.languages} Languages · OCR, Tables &amp; LPG/RDF Extraction · 13 MCP Tools
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-5">
            {DOCINTEL_TIERS.map((d) => {
              const isPaid = d.id.startsWith("docintel-");
              return (
                <div
                  key={d.id}
                  className={
                    "flex flex-col rounded-2xl border bg-[var(--p8-surface)] p-6 " +
                    (d.highlight ? "border-[var(--p8-accent)] ring-1 ring-[var(--p8-accent)]" : "border-[var(--p8-border)]")
                  }
                >
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--p8-accent)]">
                    {d.badge || "Evaluation Sandbox"}
                  </p>
                  <h3 className="mt-2 text-lg font-bold">{d.name}</h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold">{d.price}</span>
                    {d.priceUnit && <span className="text-xs text-[var(--p8-muted)]">{d.priceUnit}</span>}
                  </div>
                  <p className="mt-1 text-xs text-[var(--p8-muted)]">
                    {d.priceAnnual ? `${d.priceAnnual}/mo billed annually · ${d.quota}` : `${d.quota} · ${d.seats}`}
                  </p>
                  <p className="mt-4 flex-1 text-xs leading-relaxed text-[var(--p8-muted)]">
                    {d.tagline}
                  </p>
                  <div className="mt-6 flex flex-col gap-2">
                    <a
                      href={d.ctaHref}
                      className={
                        "rounded-full px-4 py-2.5 text-center text-xs font-semibold transition " +
                        (d.highlight
                          ? "bg-[var(--p8-button)] text-white hover:opacity-90"
                          : "border border-[var(--p8-border)] hover:border-[var(--p8-accent)] hover:text-[var(--p8-accent)]")
                      }
                    >
                      {d.cta}
                    </a>
                    {isPaid && d.priceAnnual && (
                      <a
                        href={`/checkout/create-session/?plan=${d.id}&billing=annual`}
                        className="text-center text-[11px] text-[var(--p8-accent)] hover:underline"
                      >
                        Or pay annually ({d.priceAnnual}/mo) →
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </BrandShell>
  );
}
