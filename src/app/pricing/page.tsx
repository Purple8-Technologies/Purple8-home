import type { Metadata } from "next";
import BrandShell from "@/components/revamp/BrandShell";
import PricingCards from "@/components/revamp/PricingCards";
import { FACTS as F } from "@/lib/facts";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Pricing - Purple8 Hyper Graph & Purple8 DocIntel",
  description:
    "Transparent monthly and annual pricing for Purple8 Hyper Graph (Free Playground $0, Builder $39/mo, Production $149/mo, Growth $499/mo, Enterprise BYOC) and Purple8 DocIntel (Free Sandbox $0, Builder $79/mo, Production $299/mo, Growth $599/mo, Enterprise).",
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
            Two independent products, each available with flexible{" "}
            <strong className="text-[var(--p8-fg)]">Monthly or Annual (Save ~17%)</strong>{" "}
            subscriptions on <strong className="text-[var(--p8-fg)]">Purple8 Cloud</strong>{" "}
            (zero infrastructure to manage) or <strong className="text-[var(--p8-fg)]">Self-Hosted / BYOC</strong>{" "}
            (in your own VPC, Red Hat OpenShift, or air-gapped network). We never meter or restrict by MCP agent connections - every tier includes all {F.mcpTools} Hyper Graph MCP tools (or 13 DocIntel MCP tools).
          </p>
        </div>

        <PricingCards />
      </section>
    </BrandShell>
  );
}
