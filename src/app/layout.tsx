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
  metadataBase: new URL("https://www.purple8.ai"),
  title: {
    default: "Purple8 Technologies — AI-Native Infrastructure",
    template: "%s | Purple8 Technologies",
  },
  description:
    "Purple8 Technologies builds AI-native infrastructure: Hyper Graph (unified graph, vector, document & full-text engine) and DocIntel (70-format document intelligence). One process. Zero external dependencies.",
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
  authors: [{ name: "Purple8 Technologies", url: "https://www.purple8.ai" }],
  creator: "Purple8 Technologies",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: "Purple8 Technologies — AI-Native Infrastructure",
    description:
      "Unified graph + vector + document engine with Journey Engine, native MCP tools, and 70-format document intelligence. Built AI-native from the ground up.",
    url: "https://www.purple8.ai",
    siteName: "Purple8 Technologies",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Purple8 Technologies — AI-Native Infrastructure",
    description:
      "Unified graph + vector + document engine with Journey Engine, native MCP tools, and 70-format document intelligence.",
    creator: "@purple8ai",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
