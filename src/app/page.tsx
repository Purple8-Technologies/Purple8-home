import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import ReplacementStack from "@/components/ReplacementStack";
import SystemFlow from "@/components/SystemFlow";
import Products from "@/components/Products";
import FeaturesManifesto from "@/components/FeaturesManifesto";
import Industries from "@/components/Industries";
import Pricing from "@/components/Pricing";
import TierCalculator from "@/components/TierCalculator";
import BuiltOnPurple8 from "@/components/BuiltOnPurple8";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <FadeIn direction="up" delay={0}>
          <ReplacementStack />
        </FadeIn>
        <FadeIn direction="up" delay={0}>
          <SystemFlow />
        </FadeIn>
        <FadeIn direction="up" delay={0}>
          <Products />
        </FadeIn>
        <FadeIn direction="up" delay={100}>
          <FeaturesManifesto />
        </FadeIn>
        <FadeIn direction="up" delay={0}>
          <Industries />
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
