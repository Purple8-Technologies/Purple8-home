import type { Metadata } from "next";
import { ClassicShell } from "@/components/revamp/BrandShell";
import Pricing from "@/components/Pricing";
import FadeIn from "@/components/FadeIn";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Licensing & Deployment",
  description:
    "Evaluate Purple8 Hyper Graph and Purple8 DocIntel in the Cloud Sandbox, or contact us for Commercial, Enterprise, VPC, Air-Gapped, and Cloud Marketplace licensing (Red Hat, AWS, Azure, GCP).",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <ClassicShell>
      <main id="main-content" className="pt-8">
        <h1 className="sr-only">Licensing &amp; Deployment — Purple8</h1>
        <FadeIn direction="up" delay={0}>
          <Pricing />
        </FadeIn>
      </main>
    </ClassicShell>
  );
}
