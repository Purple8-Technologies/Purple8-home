import Link from "next/link";

/**
 * The public beta / waitlist program is retired. The Developer edition is now
 * generally available and fully self-serve, so every legacy `/beta` link
 * resolves to the canonical free Developer registration flow at /register.
 *
 * This is a static export (GitHub Pages), which cannot perform host-level or
 * framework redirects. We use a `<meta http-equiv="refresh">` (hoisted to
 * <head> by React) plus a visible fallback link so the redirect works with
 * JavaScript disabled. The route is noindex (see beta/layout.tsx).
 */
export default function BetaPage() {
  return (
    <main id="main-content" className="flex min-h-screen items-center justify-center bg-[#0a0a0f] px-4 text-center">
      <meta httpEquiv="refresh" content="0; url=/register" />
      <div className="max-w-md">
        <h1 className="text-xl font-bold text-white">Redirecting to registration…</h1>
        <p className="mt-3 text-sm text-zinc-500">
          The public beta is retired — the Purple8 Developer edition is now free
          and fully self-serve.
        </p>
        <Link
          href="/register/"
          className="mt-6 inline-block rounded-full bg-purple-600 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-500"
        >
          Continue to registration →
        </Link>
      </div>
    </main>
  );
}
