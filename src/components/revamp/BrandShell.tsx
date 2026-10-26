"use client";

import Link from "next/link";
import SiteHeader from "@/components/revamp/SiteHeader";
import NvidiaInceptionBadge, { NVIDIA_LEGAL_ATTRIBUTION } from "@/components/NvidiaInceptionBadge";

// Brand-page shell: shared SiteHeader (same as homepage) + footer.

function Footer() {
  return (
    <footer className="border-t border-[var(--p8-border)]">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-[var(--p8-muted)] sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-5">
            <span>© 2026 Purple8 Inc.</span>
            <NvidiaInceptionBadge className="h-11" variant="auto" />
          </div>
          <div className="flex gap-6">
            <Link href="/about/" className="hover:text-[var(--p8-accent)]">About</Link>
            <Link href="/support/" className="hover:text-[var(--p8-accent)]">Support</Link>
            <Link href="/legal/" className="hover:text-[var(--p8-accent)]">Legal</Link>
            <a href="mailto:hello@purple8.ai" className="hover:text-[var(--p8-accent)]">hello@purple8.ai</a>
          </div>
        </div>
        <p className="mt-6 text-center text-[11px] text-[var(--p8-muted)] opacity-80 sm:text-left">
          {NVIDIA_LEGAL_ATTRIBUTION}
        </p>
      </div>
    </footer>
  );
}

export default function BrandShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="p8-brand min-h-screen">
      <SiteHeader />
      <main id="main-content">{children}</main>
      <Footer />
    </div>
  );
}

/**
 * For existing pages (Architecture, Benchmarks, About, Support) whose content
 * was designed dark. Same header and footer as every other page; the content
 * is wrapped in `.p8-themed` so the day overrides in globals.css apply to it.
 * The header/footer sit outside that wrapper so the overrides never touch them.
 * The page supplies its own <main>.
 */
export function ClassicShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="p8-brand min-h-screen">
      <SiteHeader />
      <div className="p8-themed">{children}</div>
      <Footer />
    </div>
  );
}
