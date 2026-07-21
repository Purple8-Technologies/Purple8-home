import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Products from "@/components/Products";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Products",
  description:
    "Purple8 Hyper Graph and Purple8 DocIntel — one embedded backend for data, retrieval, workflow orchestration, and agent execution, plus 70+ format document intelligence.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-[#0a0a0f] pt-16">
        <Products />
      </main>
      <Footer />
    </>
  );
}
