import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SupportTicket from "@/components/SupportTicket";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Support",
  description: "Report a bug, ask a question, or suggest a feature. Our ops agent responds within minutes.",
  path: "/support",
});

export default function SupportPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen bg-[#0a0a0f] pt-16 text-slate-100">
        {/* Header */}
        <div className="border-b border-slate-800/60 bg-[#0d0d17]">
          <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-purple-900/50 ring-1 ring-purple-700/50">
                <span className="text-lg">🛠</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Support</h1>
                <p className="mt-1 text-slate-400 text-sm">
                  Submit a ticket and we&apos;ll get back to you.
                </p>
              </div>
            </div>
          </div>
        </div>

      {/* Form */}
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-3">

          {/* Sidebar — quick links */}
          <aside className="lg:col-span-1 order-2 lg:order-1">
            <div className="space-y-6 text-sm">
              <div>
                <h3 className="font-semibold text-slate-300 mb-2">Install &amp; get started</h3>
                <ul className="space-y-2 text-slate-500">
                  <li>
                    <a href="/quickstart/"
                       className="hover:text-purple-400 transition-colors">
                      → Docker install &amp; quickstart
                    </a>
                  </li>
                  <li>
                    <a href="/register/"
                       className="hover:text-purple-400 transition-colors">
                      → Get a free Developer license
                    </a>
                  </li>
                </ul>
                <div className="mt-3 rounded-lg border border-slate-800 bg-[#0c0c14] p-3">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
                    One-click install
                  </p>
                  <p className="mt-1.5 text-[11px] text-slate-600">macOS &amp; Linux</p>
                  <code className="mt-1 block break-all font-mono text-[11px] text-purple-300">
                    curl -fsSL https://www.purple8.ai/install.sh | bash
                  </code>
                  <p className="mt-2 text-[11px] text-slate-600">Windows (PowerShell)</p>
                  <code className="mt-1 block break-all font-mono text-[11px] text-purple-300">
                    irm https://www.purple8.ai/install.ps1 | iex
                  </code>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-slate-300 mb-2">Before you submit</h3>
                <ul className="space-y-2 text-slate-500">
                  <li>
                    <a href="/quickstart/"
                       className="hover:text-purple-400 transition-colors">
                      → Quickstart &amp; install guide
                    </a>
                  </li>
                  <li>
                    <a href="mailto:support@purple8.ai"
                       className="hover:text-purple-400 transition-colors">
                      → Email support@purple8.ai
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </aside>

          {/* Form panel */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="rounded-2xl border border-slate-800 bg-[#0d0d17] p-6 sm:p-8">
              <SupportTicket />
            </div>
          </div>

        </div>
      </div>
      </main>
      <Footer />
    </>
  );
}
