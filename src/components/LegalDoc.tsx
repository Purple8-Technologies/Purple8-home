import type { ReactNode } from "react";

/**
 * Shared chrome + prose styling for legal documents (EULA, Developer Agreement,
 * etc.). Product-neutral so a single page applies to every Purple8 product
 * (Purple8 Hyper Graph, Purple8 DocIntel, and future products).
 *
 * Content is passed as plain semantic HTML (h2/h3/p/ul/table/…) and styled via
 * Tailwind child selectors — no typography plugin required.
 */
export default function LegalDoc({
  title,
  subtitle,
  effective,
  version,
  children,
}: {
  title: string;
  subtitle?: string;
  effective?: string;
  version?: string;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-slate-100">
      {/* Header */}
      <div className="border-b border-slate-800/60 bg-[#0d0d17]">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
          <a
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-300"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to purple8.ai
          </a>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">{title}</h1>
          {subtitle && (
            <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
          )}
          {(effective || version) && (
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-xs text-slate-500">
              {effective && <span>Effective: {effective}</span>}
              {version && <span>Version: {version}</span>}
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <article
        className={[
          "mx-auto max-w-3xl px-4 py-10 sm:px-6",
          "text-sm leading-relaxed text-slate-400",
          "[&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white",
          "[&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-slate-100",
          "[&_p]:mb-4",
          "[&_ul]:mb-4 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6",
          "[&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-6",
          "[&_a]:text-purple-400 [&_a]:underline [&_a]:underline-offset-2",
          "[&_strong]:font-semibold [&_strong]:text-slate-200",
          "[&_blockquote]:my-4 [&_blockquote]:border-l-2 [&_blockquote]:border-purple-700/60 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-slate-400",
          "[&_hr]:my-8 [&_hr]:border-slate-800",
          "[&_table]:my-4 [&_table]:w-full [&_table]:border-collapse [&_table]:text-xs",
          "[&_th]:border [&_th]:border-slate-800 [&_th]:bg-[#11111b] [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_th]:text-slate-200",
          "[&_td]:border [&_td]:border-slate-800 [&_td]:px-3 [&_td]:py-2 [&_td]:align-top",
          "[&_code]:rounded [&_code]:bg-[#11111b] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[0.85em] [&_code]:text-purple-300",
        ].join(" ")}
      >
        {children}

        <hr />
        <p className="text-xs text-slate-600">
          Purple8, Inc. · 1111B South Governors Avenue, Suite 24066, Dover, DE
          19904, USA · <a href="mailto:legal@purple8.ai">legal@purple8.ai</a>
        </p>
      </article>
    </main>
  );
}
