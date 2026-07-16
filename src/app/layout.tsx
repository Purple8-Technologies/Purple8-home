import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ParticleNetwork from "@/components/ParticleNetwork";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.purple8.ai"),
  title: {
    default: "Purple8 — AI-Native Infrastructure",
    template: "%s | Purple8",
  },
  description:
    "Purple8 Technologies builds AI-native infrastructure: Purple8 (unified graph, vector, document & full-text engine — an entire backend in one process) and DocIntel (70-format document intelligence). One process. Zero external dependencies.",
  keywords: [
    "AI infrastructure",
    "graph database",
    "vector database",
    "document intelligence",
    "MCP server",
    "GraphRAG",
    "hybrid RAG",
    "embedded database",
    "enterprise AI",
    "AI-native",
    "Purple8",
  ],
  authors: [{ name: "Purple8 Inc.", url: "https://www.purple8.ai" }],
  creator: "Purple8 Inc.",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: "Purple8 — AI-Native Infrastructure",
    description:
      "Unified graph + vector + document engine with Journey Engine, native MCP tools, and 70-format document intelligence. Built AI-native from the ground up.",
    url: "https://www.purple8.ai",
    siteName: "Purple8",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://www.purple8.ai/og.png",
        width: 1200,
        height: 630,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Purple8 — AI-Native Infrastructure",
    description:
      "Unified graph + vector + document engine with Journey Engine, native MCP tools, and 70-format document intelligence.",
    creator: "@purple8ai",
    images: ["https://www.purple8.ai/og.png"],
  },
  alternates: {
    canonical: "https://www.purple8.ai",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/*
          Plausible Analytics — privacy-first, cookieless, GDPR-compliant.
          No consent banner required (no cookies, no personal data, no
          cross-site tracking). Chosen over Google Analytics to stay
          consistent with Purple8's privacy + sustainability identity.
          Data domain is the production apex; self-host later by swapping
          the src to your Plausible instance.
        */}
        <Script
          defer
          data-domain="purple8.ai"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ParticleNetwork />
        <div className="relative z-10 flex min-h-full flex-col">{children}</div>
      </body>
    </html>
  );
}
