import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Register",
  description:
    "Create your free Purple8 Developer account. Accept the EULA and receive a single-use magic link — no waitlist, no human approval.",
  path: "/register",
  noindex: true,
});

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
