import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FocusAgent from "@/components/FocusAgent";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Purple8 Focus — Personal Cognitive Capacity Agent",
  description:
    "Purple8 Focus measures your real deep-work capacity — not proxy signals. Runs entirely on your device. $5/month per seat. EU AI Act compliant by architecture. macOS now, Windows coming August 2026.",
  path: "/focus",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Purple8 Focus",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "macOS, Windows",
  description: "On-device cognitive capacity agent. Measures real deep-work hours, focus score, and burnout signals privately on your machine. $5/month per seat. EU AI Act limited-risk by architecture.",
  offers: { "@type": "Offer", price: "5", priceCurrency: "USD", billingIncrement: "P1M" },
  url: "https://www.purple8.ai/focus/",
  publisher: { "@type": "Organization", name: "Purple8 Inc.", url: "https://www.purple8.ai" },
  featureList: ["Deep work measurement", "Focus score", "Burnout signal detection", "On-device processing", "Private Tribe benchmarking", "EU AI Act compliant", "No data egress without consent"],
};

export default function FocusPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main id="main-content" className="bg-[#0a0a0f] pt-16">
        <FocusAgent />
      </main>
      <Footer />
    </>
  );
}
