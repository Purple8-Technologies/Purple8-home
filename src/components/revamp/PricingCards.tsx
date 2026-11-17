"use client";

import { useState } from "react";
import { BillingCycle, DOCINTEL_TIERS, GRAPH_TIERS, graphLicenseLimits } from "@/lib/pricing";
import { FACTS as F } from "@/lib/facts";

export default function PricingCards() {
  const [billing, setBilling] = useState<BillingCycle>("monthly");
  const isAnnual = billing === "annual";

  return (
    <>
      {/* ── Interactive Monthly / Annual Toggle ── */}
      <div className="mt-8 flex flex-col items-center justify-center gap-3">
        <div
          role="group"
          aria-label="Billing cycle"
          className="inline-flex items-center rounded-full border border-[var(--p8-border)] bg-[var(--p8-surface)] p-1"
        >
          <button
            type="button"
            onClick={() => setBilling("monthly")}
            className={
              "rounded-full px-5 py-2 text-xs font-semibold transition " +
              (!isAnnual
                ? "bg-[var(--p8-button)] text-white shadow-sm"
                : "text-[var(--p8-muted)] hover:text-[var(--p8-fg)]")
            }
          >
            Monthly billing
          </button>
          <button
            type="button"
            onClick={() => setBilling("annual")}
            className={
              "flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold transition " +
              (isAnnual
                ? "bg-[var(--p8-button)] text-white shadow-sm"
                : "text-[var(--p8-muted)] hover:text-[var(--p8-fg)]")
            }
          >
            Annual billing
            <span
              className={
                "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider " +
                (isAnnual
                  ? "bg-white/20 text-white"
                  : "bg-[var(--p8-accent)]/15 text-[var(--p8-accent)]")
              }
            >
              Annual pricing
            </span>
          </button>
        </div>
      </div>

      {/* ── Product 1: Purple8 Hyper Graph ── */}
      <div id="hyper-graph" className="mt-14 scroll-mt-24">
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

        <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-4">
          {GRAPH_TIERS.map((t) => {
            const isFree = t.id === "developer";
            const isPaid = typeof t.priceMonthly === "number" && t.priceMonthly > 0;
            const displayPrice = isAnnual ? t.priceAnnual : t.priceMonthly;
            const annualTotal = (t.priceAnnual ?? 0) * 12;
            const href = isFree
              ? "/try/graph/"
              : isPaid
              ? `mailto:sales@purple8.ai?subject=Purple8%20Cloud%20${encodeURIComponent(t.name)}%20Access`
              : "mailto:sales@purple8.ai?subject=Purple8%20Hyper%20Graph%20Enterprise%20Inquiry";
            return (
              <div
                key={t.id}
                className={
                  "flex flex-col rounded-2xl border bg-[var(--p8-surface)] p-6 " +
                  (t.highlight
                    ? "border-[var(--p8-accent)] ring-1 ring-[var(--p8-accent)]"
                    : "border-[var(--p8-border)]")
                }
              >
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--p8-accent)]">
                  {t.badge || "Evaluation & Local Dev"}
                </p>
                <h3 className="mt-2 text-lg font-bold">{t.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold">
                    {isFree ? "$0" : isPaid ? `$${displayPrice}` : "Custom"}
                  </span>
                  {isPaid && <span className="text-xs text-[var(--p8-muted)]">/mo</span>}
                </div>
                <p className="mt-1 text-xs text-[var(--p8-muted)]">
                  {isFree
                    ? "10K Cloud Sandbox / 50K Local Docker"
                    : isPaid
                    ? isAnnual
                      ? `Proposed annual total: $${annualTotal}/yr · ${t.nodesLabel}`
                      : `Proposed monthly price · ${t.nodesLabel}`
                    : "Unlimited scale · Sovereign VPC & Air-Gap"}
                </p>
                <p className="mt-2 text-xs text-[var(--p8-muted)]">
                  Default RS256 license limits: {graphLicenseLimits(t)}
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
                  {isPaid && <p className="text-center text-[11px] text-[var(--p8-muted)]">
                    Proposed pricing · Paid activation pending
                  </p>}
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

        <div className="mb-6 rounded-2xl border border-[var(--p8-accent)] bg-[var(--p8-surface)] p-6">
          <h3 className="text-lg font-bold">DocIntel Cloud subscription</h3>
          <p className="mt-2">$100/month includes 10,000 pages, then $0.01 per additional page.</p>
          <p className="mt-2 text-xs text-[var(--p8-muted)]">
            Included pages reset each billing month without rollover. One subscription covers all projects in your account.
            Applies to new subscriptions; existing subscriptions retain their contracted prices. Prices exclude tax.
          </p>
          <a href="https://docintel.purple8.ai/try?view=billing" className="mt-4 inline-block text-sm font-semibold text-[var(--p8-accent)]">
            Open DocIntel workspace
          </a>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {DOCINTEL_TIERS.map((d) => {
            return (
              <div
                key={d.id}
                className={
                  "flex flex-col rounded-2xl border bg-[var(--p8-surface)] p-6 " +
                  (d.highlight
                    ? "border-[var(--p8-accent)] ring-1 ring-[var(--p8-accent)]"
                    : "border-[var(--p8-border)]")
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
                  {d.quota} · {d.seats}
                </p>
                <p className="mt-4 flex-1 text-xs leading-relaxed text-[var(--p8-muted)]">
                  {d.tagline}
                </p>
                <div className="mt-6 flex flex-col gap-2">
                  {d.unavailable ? (
                    <button disabled className="cursor-not-allowed rounded-full border border-[var(--p8-border)] px-4 py-2.5 text-center text-xs font-semibold opacity-60">
                      {d.cta}
                    </button>
                  ) : <a
                    href={d.ctaHref}
                    className={
                      "rounded-full px-4 py-2.5 text-center text-xs font-semibold transition " +
                      (d.highlight
                        ? "bg-[var(--p8-button)] text-white hover:opacity-90"
                        : "border border-[var(--p8-border)] hover:border-[var(--p8-accent)] hover:text-[var(--p8-accent)]")
                    }
                  >
                    {d.cta}
                  </a>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
