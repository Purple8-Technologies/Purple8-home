"use client";

import SiteHeader from "@/components/revamp/SiteHeader";
import Footer from "@/components/Footer";

// Brand-page shell: shared SiteHeader (same as homepage) + full multi-column Footer.

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
