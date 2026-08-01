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

export default function FocusPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-[#0a0a0f] pt-16">
        <FocusAgent />
      </main>
      <Footer />
    </>
  );
}
