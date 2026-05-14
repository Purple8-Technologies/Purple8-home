"use client";
import { useState } from "react";

type Tier = {
  name: string;
  badge?: string;
  price: string;
  priceNote: string;
  cta: string;
  ctaHref: string;
  highlight: boolean;
  features: string[];
};

const hyperGraphTiers: Tier[] = [
  {
    name: "Developer",
    price: "Free",
    priceNote: "Forever",
    cta: "Download",
    ctaHref: "#waitlist",
    highlight: false,
    features: [
      "Full embedded engine — local use",
      "Graph + vector + full-text in one process",
      "Journey Engine (single instance)",
      "Native MCP server",
      "Community support",
      "No time limit",
    ],
  },
  {
    name: "Starter",
    badge: "Coming soon",
    price: "—",
    priceNote: "Pricing finalising",
    cta: "Join waitlist",
    ctaHref: "#waitlist",
    highlight: false,
    features: [
      "Everything in Developer",
      "Multi-tenancy",
      "AES-256-GCM envelope encryption",
      "SuperGraph Federation (2 peers)",
      "Email support",
      "Commercial licence",
    ],
  },
  {
    name: "Pro",
    badge: "Most popular",
    price: "—",
    priceNote: "Pricing finalising",
    cta: "Join waitlist",
    ctaHref: "#waitlist",
    highlight: true,
    features: [
      "Everything in Starter",
      "Unlimited SuperGraph peers",
      "All KMS backends (Vault, AWS, GCP, Azure)",
      "Priority support + SLA",
      "AWS & GCP Marketplace billing",
      "Docker image + native installer",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    priceNote: "Volume · OEM · air-gap",
    cta: "Talk to us",
    ctaHref: "mailto:hello@purple8.ai",
    highlight: false,
    features: [
      "Everything in Pro",
      "Air-gapped deployment",
      "OEM / redistribution licence",
      "Dedicated support channel",
      "Custom SLA & MSA",
      "On-site onboarding",
    ],
  },
];

const docIntelNote = {
  headline: "DocIntel Pricing",
  sub: "Usage-based — tailored to document volume, OCR engine selection, and connector count. Available standalone or bundled with Hyper Graph.",
  points: [
    "Developer edition included in Hyper Graph Developer tier",
    "Standalone licences for teams using DocIntel independently",
    "AWS, GCP & Azure Marketplace listings coming",
    "Volume and OEM pricing available",
  ],
};

export default function Pricing() {
  const [tab, setTab] = useState<"graph" | "docintel">("graph");

  return (
    <section id="pricing" className="bg-[#0a0a0f] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
            Pricing
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Start free. Scale when you need to.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-zinc-500">
            Purple8 products are self-hosted — you run them in your own
            infrastructure. No usage metering, no data leaving your environment.
          </p>
        </div>

        {/* Product tab toggle */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex rounded-full border border-zinc-800 bg-zinc-900/60 p-1">
            <button
              onClick={() => setTab("graph")}
              className={`rounded-full px-5 py-1.5 text-sm font-medium transition-colors ${
                tab === "graph"
                  ? "bg-purple-600 text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Hyper Graph
            </button>
            <button
              onClick={() => setTab("docintel")}
              className={`rounded-full px-5 py-1.5 text-sm font-medium transition-colors ${
                tab === "docintel"
                  ? "bg-purple-600 text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              DocIntel
            </button>
          </div>
        </div>

        {/* Hyper Graph tiers */}
        {tab === "graph" && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {hyperGraphTiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-2xl border p-7 transition-all ${
                  tier.highlight
                    ? "border-purple-500/60 bg-[#13102a] shadow-[0_0_40px_rgba(139,92,246,0.12)]"
                    : "border-zinc-800/60 bg-[#11111b]"
                }`}
              >
                {tier.badge && (
                  <span
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5 text-xs font-semibold ${
                      tier.highlight
                        ? "bg-purple-600 text-white"
                        : "bg-zinc-800 text-zinc-400"
                    }`}
                  >
                    {tier.badge}
                  </span>
                )}

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-400">
                    {tier.name}
                  </h3>
                  <div className="mt-3 flex items-end gap-1.5">
                    <span className="text-3xl font-bold text-white">
                      {tier.price}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-zinc-600">{tier.priceNote}</p>
                </div>

                <ul className="mt-6 flex-1 space-y-2.5">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-zinc-400">
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-purple-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={tier.ctaHref}
                  className={`mt-8 block rounded-full py-2.5 text-center text-sm font-semibold transition-colors ${
                    tier.highlight
                      ? "bg-purple-600 text-white hover:bg-purple-500"
                      : "border border-zinc-700 text-zinc-300 hover:border-purple-500/60 hover:text-white"
                  }`}
                >
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>
        )}

        {/* DocIntel tab */}
        {tab === "docintel" && (
          <div className="mt-12 mx-auto max-w-2xl rounded-2xl border border-zinc-800/60 bg-[#11111b] p-10 text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600/20">
              <svg className="h-6 w-6 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <h3 className="mt-4 text-xl font-bold text-white">{docIntelNote.headline}</h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-500">
              {docIntelNote.sub}
            </p>
            <ul className="mt-8 space-y-3 text-left">
              {docIntelNote.points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-zinc-400">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {p}
                </li>
              ))}
            </ul>
            <a
              href="mailto:hello@purple8.ai"
              className="mt-8 inline-block rounded-full bg-purple-600 px-8 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-purple-500"
            >
              Discuss pricing →
            </a>
          </div>
        )}

        {/* Marketplace note */}
        <p className="mt-12 text-center text-xs text-zinc-600">
          All paid tiers are also available through{" "}
          <span className="text-zinc-500">AWS Marketplace</span>,{" "}
          <span className="text-zinc-500">GCP Marketplace</span>, and{" "}
          <span className="text-zinc-500">Azure Marketplace</span> — billed through your existing cloud spend.
        </p>
      </div>
    </section>
  );
}
