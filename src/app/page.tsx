import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Products from "@/components/Products";
import Features from "@/components/Features";
import Industries from "@/components/Industries";
import Pricing from "@/components/Pricing";
import WaitlistCTA from "@/components/WaitlistCTA";
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
          <Products />
        </FadeIn>
        <FadeIn direction="up" delay={100}>
          <Features />
        </FadeIn>
        <FadeIn direction="up" delay={0}>
          <Industries />
        </FadeIn>
        <FadeIn direction="up" delay={0}>
          <Pricing />
        </FadeIn>
        <FadeIn direction="up" delay={0}>
          <WaitlistCTA />
        </FadeIn>
      </main>
      <Footer />
    </>
  );
}
