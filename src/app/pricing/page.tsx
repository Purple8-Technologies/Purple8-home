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
    "Start free with the Developer edition. Pay for capacity, never for features — every production tier ships the exact same feature set. Self-hosted, runs in your own infrastructure.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#0a0a0f] pt-16">
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
