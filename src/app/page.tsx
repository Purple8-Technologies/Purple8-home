import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import FadeIn from "@/components/FadeIn";

// Heavy below-the-fold components — split into their own chunks so the
// initial page JS stays under the 150 KB gzipped budget.
const FeaturesManifesto = dynamic(() => import("@/components/FeaturesManifesto"));
const ReplacementStack = dynamic(() => import("@/components/ReplacementStack"));
const SystemFlow = dynamic(() => import("@/components/SystemFlow"));
const Products = dynamic(() => import("@/components/Products"));
const Pricing = dynamic(() => import("@/components/Pricing"));
const TierCalculator = dynamic(() => import("@/components/TierCalculator"));
const BuiltOnPurple8 = dynamic(() => import("@/components/BuiltOnPurple8"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Stats />
        <FadeIn direction="up" delay={0}>
          <SystemFlow />
        </FadeIn>
        <FadeIn direction="up" delay={0}>
          <FeaturesManifesto variant="highlight" />
        </FadeIn>
        <FadeIn direction="up" delay={0}>
          <ReplacementStack />
        </FadeIn>
        <FadeIn direction="up" delay={0}>
          <Products variant="highlight" />
        </FadeIn>
        <FadeIn direction="up" delay={0}>
          <BuiltOnPurple8 />
        </FadeIn>
        <FadeIn direction="up" delay={0}>
          <TierCalculator />
        </FadeIn>
        <FadeIn direction="up" delay={0}>
          <Pricing />
        </FadeIn>
      </main>
      <Footer />
    </>
  );
}
