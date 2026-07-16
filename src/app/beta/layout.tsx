import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Beta",
  description: "Purple8 beta access.",
  path: "/beta",
  noindex: true,
});

export default function BetaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
