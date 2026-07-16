import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Download",
  description: "Download and install Purple8.",
  path: "/download",
  noindex: true,
});

export default function DownloadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
