import type { Metadata } from "next";
import BrandShell from "@/components/revamp/BrandShell";
import PricingCards from "@/components/revamp/PricingCards";
import { FACTS as F } from "@/lib/facts";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Pricing - Purple8 Hyper Graph & Purple8 DocIntel",
  description:
    "Explore Purple8 Hyper Graph Cloud preview and DocIntel Cloud. Start in the free playground. Self-hosted and Enterprise: talk to us.",
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
            Start in the Free Playground. Choose Cloud or Talk to Us.
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-[var(--p8-muted)]">
            Two independent products. Graph Cloud paid plans are in preview;
            DocIntel Cloud subscriptions are managed in your signed-in workspace.
            For <strong className="text-[var(--p8-fg)]">Self-Hosted / Enterprise</strong>,
            talk to us about deployment, licensing, and support. Explore all {F.mcpTools} Hyper Graph MCP tools in the free playground.
          </p>
        </div>

        <PricingCards />
      </section>
    </BrandShell>
  );
}
