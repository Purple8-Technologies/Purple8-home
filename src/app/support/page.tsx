import type { Metadata } from "next";
import { ClassicShell } from "@/components/revamp/BrandShell";
import SupportTicket from "@/components/SupportTicket";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Support",
  description: "Report a bug, ask a question, or suggest a feature. Our ops agent responds within minutes.",
  path: "/support",
});

export default function SupportPage() {
  return (
    <ClassicShell>
      <main id="main-content" className="min-h-screen text-slate-100">
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
                <h3 className="font-semibold text-slate-300 mb-2">Get started</h3>
                <ul className="space-y-2 text-slate-500">
                  <li>
                    <a href="/try/docintel/"
                       className="hover:text-purple-400 transition-colors">
                      → Try DocIntel in the sandbox
                    </a>
                  </li>
                  <li>
                    <a href="/try/graph/"
                       className="hover:text-purple-400 transition-colors">
                      → Try Hyper Graph in the sandbox
                    </a>
                  </li>
                  <li>
                    <a href="mailto:hello@purple8.ai?subject=Purple8%20self-hosted%20(Enterprise%20%2F%20Custom)"
                       className="hover:text-purple-400 transition-colors">
                      → Self-hosted (Enterprise / Custom): talk to us
                    </a>
                  </li>
                </ul>
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
    </ClassicShell>
  );
}
