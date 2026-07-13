import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeaturesManifesto from "@/components/FeaturesManifesto";

export const metadata: Metadata = {
  title: "Features — Purple8",
  description:
    "One process. One port. Zero external dependencies. Explore what Purple8 replaces — vector database, graph database, orchestration, OCR, auth, and more — collapsed into a single embedded backend.",
};

export default function FeaturesPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#0a0a0f] pt-16">
        <FeaturesManifesto />
      </main>
      <Footer />
    </>
  );
}
