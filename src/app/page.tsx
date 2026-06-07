import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Products from "@/components/Products";
import Features from "@/components/Features";
import FeaturesManifesto from "@/components/FeaturesManifesto";
import FeaturesEditorial from "@/components/FeaturesEditorial";
import Industries from "@/components/Industries";
import Pricing from "@/components/Pricing";
import BuiltOnPurple8 from "@/components/BuiltOnPurple8";
import WaitlistCTA from "@/components/WaitlistCTA";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";

// ─── FEATURE LAYOUT SWITCH ──────────────────────────────────────────────────
// "original"   → existing three-section layout (live)
// "manifesto"  → Option D: typographic 8, editorial rows, no cards
// "editorial"  → Option B+A: scrolling claims + strikethrough replacement stack
const FEATURES_VARIANT = "manifesto" as "original" | "manifesto" | "editorial";
// ────────────────────────────────────────────────────────────────────────────

const FeaturesComponent =
  FEATURES_VARIANT === "manifesto"
    ? FeaturesManifesto
    : FEATURES_VARIANT === "editorial"
    ? FeaturesEditorial
    : Features;

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <FadeIn direction="up" delay={0}>
          <Products />
        </FadeIn>
        <FadeIn direction="up" delay={100}>
          <FeaturesComponent />
        </FadeIn>
        <FadeIn direction="up" delay={0}>
          <Industries />
        </FadeIn>
        <FadeIn direction="up" delay={0}>
          <Pricing />
        </FadeIn>
        <FadeIn direction="up" delay={0}>
          <BuiltOnPurple8 />
        </FadeIn>
        <FadeIn direction="up" delay={0}>
          <WaitlistCTA />
        </FadeIn>
      </main>
      <Footer />
    </>
  );
}
