import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeaturesManifesto from "@/components/FeaturesManifesto";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Features",
  description:
    "One process. One port. Zero external dependencies. Explore what Purple8 replaces — vector database, graph database, orchestration, OCR, auth, and more — collapsed into a single embedded backend.",
  path: "/features",
});

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
