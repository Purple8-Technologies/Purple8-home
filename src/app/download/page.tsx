import Link from "next/link";

/**
 * Legacy /download entry point. Purple8 is distributed via the self-serve
 * registration + quickstart flow, so this route redirects to /register.
 *
 * Static export (GitHub Pages) cannot do host-level redirects, so we use a
 * `<meta http-equiv="refresh">` (hoisted to <head> by React) plus a visible
 * fallback link that works with JavaScript disabled. Route is noindex
 * (see download/layout.tsx).
 */
export default function DownloadPage() {
  return (
    <main id="main-content" className="flex min-h-screen items-center justify-center bg-[#0a0a0f] px-4 text-center">
      <meta httpEquiv="refresh" content="0; url=/register" />
      <div className="max-w-md">
        <h1 className="text-xl font-bold text-white">Redirecting to registration…</h1>
        <p className="mt-3 text-sm text-zinc-500">
          Purple8 is free and self-serve — register to get your Developer
          license, then follow the quickstart.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href="/register/"
            className="inline-block rounded-full bg-purple-600 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-500"
          >
            Continue to registration →
          </Link>
          <Link
            href="/quickstart/"
            className="inline-block rounded-full border border-zinc-700 px-6 py-2 text-sm font-semibold text-zinc-300 transition-colors hover:border-zinc-500"
          >
            Quickstart
          </Link>
        </div>
      </div>
    </main>
  );
}
