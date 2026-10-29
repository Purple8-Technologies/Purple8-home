import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Try DocIntel in your browser",
  description:
    "Sign in to the DocIntel workspace, upload a sample document, and review structured results. Free sandbox, no installation or Graph database required.",
  path: "/try/docintel",
});

export default function TryDocIntelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
