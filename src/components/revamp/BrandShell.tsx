"use client";

import Link from "next/link";
import SiteHeader from "@/components/revamp/SiteHeader";

// Brand-page shell: shared SiteHeader (same as homepage) + footer.

function Footer() {
  return (
    <footer className="border-t border-[var(--p8-border)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-10 text-sm text-[var(--p8-muted)] sm:flex-row sm:px-6 lg:px-8">
        <span>© 2026 Purple8 Inc.</span>
        <div className="flex gap-6">
          <Link href="/about/" className="hover:text-[var(--p8-accent)]">About</Link>
          <Link href="/support/" className="hover:text-[var(--p8-accent)]">Support</Link>
          <Link href="/legal/" className="hover:text-[var(--p8-accent)]">Legal</Link>
          <a href="mailto:hello@purple8.ai" className="hover:text-[var(--p8-accent)]">hello@purple8.ai</a>
        </div>
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
