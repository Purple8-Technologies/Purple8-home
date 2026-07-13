import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Industries from "@/components/Industries";

export const metadata: Metadata = {
  title: "Industries — Purple8",
  description:
    "How teams across architecture, finance, science, and the public sector build production AI on Purple8 — one embedded backend replacing the fragmented stack.",
};

export default function IndustriesPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#0a0a0f] pt-16">
        <Industries />
      </main>
      <Footer />
    </>
  );
}
