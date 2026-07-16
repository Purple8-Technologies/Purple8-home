import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Activate",
  description:
    "Activate your Purple8 Developer license from the single-use magic link in your email.",
  path: "/activate",
  noindex: true,
});

export default function ActivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
