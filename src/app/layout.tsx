import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Purple8 Technologies — AI-Native Infrastructure",
  description:
    "Purple8 Technologies builds AI-native infrastructure: Hyper Graph (graph + vector + document + BM25 in one process) and DocIntel (70-format document intelligence with GLiNER-Purple8). Sub-millisecond latency. Zero external dependencies.",
  keywords: [
    "embedded AI",
    "graph database",
    "vector search",
    "document intelligence",
    "MCP server",
    "enterprise AI",
  ],
  openGraph: {
    title: "Purple8 Technologies — Embedded AI Infrastructure",
    description:
      "Multi-model graph + vector database with Journey Engine, MCP support, and document intelligence for 70 file formats.",
    url: "https://purple8.ai",
    siteName: "Purple8 Technologies",
    type: "website",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
