import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Pricing from "@/components/Pricing";
import TierCalculator from "@/components/TierCalculator";
import FadeIn from "@/components/FadeIn";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Pricing",
  description:
    "Start free with the Developer edition. For commercial self-hosted deployments, we offer one simple tier: Enterprise / Custom — tailored to your infrastructure, capacity, and SLA.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-16">
        <h1 className="sr-only">Pricing — Purple8</h1>
        <FadeIn direction="up" delay={0}>
          <Pricing />
        </FadeIn>
        <FadeIn direction="up" delay={0}>
          <TierCalculator />
        </FadeIn>
      </main>
      <Footer />
    </>
  );
}
