import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Products from "@/components/Products";

export const metadata: Metadata = {
  title: "Products — Purple8",
  description:
    "Purple8 Hyper Graph and Purple8 DocIntel — one embedded backend for data, retrieval, workflow orchestration, and agent execution, plus 70+ format document intelligence.",
};

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#0a0a0f] pt-16">
        <Products />
      </main>
      <Footer />
    </>
  );
}
