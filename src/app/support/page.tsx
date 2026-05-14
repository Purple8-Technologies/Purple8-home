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
                Our ops agent picks up reports within 15 minutes, 24 / 7. No support ticket queue —
                most questions get a direct answer.
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
                <h3 className="font-semibold text-slate-300 mb-2">Before you submit</h3>
                <ul className="space-y-2 text-slate-500">
                  <li>
                    <a href="https://github.com/Purple8-Technologies/purple8-graph/discussions"
                       target="_blank" rel="noopener noreferrer"
                       className="hover:text-purple-400 transition-colors">
                      → GitHub Discussions
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/Purple8-Technologies/purple8-graph/blob/main/CHANGELOG.md"
                       target="_blank" rel="noopener noreferrer"
                       className="hover:text-purple-400 transition-colors">
                      → Changelog
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/Purple8-Technologies/purple8-graph"
                       target="_blank" rel="noopener noreferrer"
                       className="hover:text-purple-400 transition-colors">
                      → GitHub repo
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-slate-300 mb-2">Response times</h3>
                <ul className="space-y-1.5 text-slate-500">
                  <li className="flex justify-between">
                    <span>Bug / question</span>
                    <span className="text-green-500">≤ 15 min</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Feature request</span>
                    <span className="text-slate-400">logged + ack'd</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Billing / account</span>
                    <span className="text-amber-400">human reply</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                <p className="text-xs text-slate-500">
                  🔒 Security vulnerabilities? Please email{" "}
                  <a href="mailto:security@purple8.ai"
                     className="text-purple-400 hover:text-purple-300">
                    security@purple8.ai
                  </a>{" "}
                  instead of using this form.
                </p>
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
