import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Try DocIntel in your browser",
  description:
    "Upload a document and see the entities and relationships Purple8 DocIntel extracts — free, no install. Documents are processed in memory and never stored.",
  path: "/try/docintel",
});

export default function TryDocIntelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
