import type { Metadata } from "next";
import SupportTicket from "@/components/SupportTicket";

export const metadata: Metadata = {
  title: "Support — Purple8",
  description: "Report a bug, ask a question, or suggest a feature. Our ops agent responds within minutes.",
};

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-slate-100">
      {/* Header */}
      <div className="border-b border-slate-800/60 bg-[#0d0d17]">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
          <a href="/" className="inline-flex items-center gap-2 mb-6 text-sm text-slate-500 hover:text-slate-300 transition-colors">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to purple8.ai
          </a>
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-purple-900/50 ring-1 ring-purple-700/50">
              <span className="text-lg">🛠</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Support</h1>
              <p className="mt-1 text-slate-400 text-sm">
                Submit a ticket and we'll get back to you.
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
                    <a href="/quickstart"
                       className="hover:text-purple-400 transition-colors">
                      → Docker install &amp; quickstart
                    </a>
                  </li>
                  <li>
                    <a href="/register"
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
                    <a href="https://github.com/Purple8-Technologies/purple8-graph/discussions"
                       target="_blank" rel="noopener noreferrer"
                       className="hover:text-purple-400 transition-colors">
                      → GitHub Discussions
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
  );
}
