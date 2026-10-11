import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Try Hyper Graph in your browser",
  description:
    "Get a free Purple8 Hyper Graph sandbox key and connect your AI agent over MCP: graph, vector search, RAG and workflows in one place. No install.",
  path: "/try/graph",
});

export default function TryGraphLayout({ children }: { children: React.ReactNode }) {
  return children;
}
