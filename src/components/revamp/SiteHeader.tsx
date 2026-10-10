"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Purple8Logo from "@/components/Purple8Logo";

/**
 * SiteHeader: the one header for the revamp site.
 *
 * Lifted unchanged from the homepage (BrandHome) so every page looks the
 * same. Colours come only from var(--p8-*), which are defined both by the
 * homepage shell (.p8-shell) and by brand pages (.p8-brand, globals.css).
 *
 * Theme:
 *  - Controlled: pass `theme` + `toggle` (the homepage does this).
 *  - Uncontrolled: omit them; the header reads/writes <html data-p8-theme>
 *    and the shared `p8-theme` localStorage key (set before paint in layout).
 */
export type Theme = "day" | "night";

const PRODUCTS = [
  { href: "/products/docintel/", name: "DocIntel", desc: "Any document → entities & relationships" },
  { href: "/products/hyper-graph/", name: "Hyper Graph", desc: "Graph + vector + RAG + workflows, one process" },
];

// Same order as the desktop links.
const NAV = [
  { href: "/architecture/", name: "Architecture" },
  { href: "/quickstart/", name: "Developers" },
  { href: "/pricing/", name: "Pricing" },
  { href: "/benchmarks/", name: "Benchmarks" },
];

function useRootTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>("day");
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(document.documentElement.dataset.p8Theme === "night" ? "night" : "day");
  }, []);
  const toggle = () => {
    const next: Theme = theme === "night" ? "day" : "night";
    document.documentElement.dataset.p8Theme = next;
    try { localStorage.setItem("p8-theme", next); } catch { /* ignore */ }
    setTheme(next);
  };
  return [theme, toggle];
}

export default function SiteHeader(props: { theme?: Theme; toggle?: () => void }) {
  const [rootTheme, rootToggle] = useRootTheme();
  const theme = props.theme ?? rootTheme;
  const toggle = props.toggle ?? rootToggle;

  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  const link = "text-sm text-[var(--p8-muted)] hover:text-[var(--p8-accent)] transition-colors";

  return (
    <header className="relative z-20">
      <div className="bg-[var(--p8-button,var(--p8-accent))] py-1.5 text-center text-xs font-medium text-white">
        Purple8 Cloud: <span className="font-semibold">coming soon</span>
      </div>
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <Link href="/" className="flex items-center gap-2.5">
          <Purple8Logo className="h-8 w-16" />
          <span className="text-sm font-semibold tracking-tight text-[var(--p8-fg)]">
            Purple<span className="text-[var(--p8-accent)]">8</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <div className="relative" ref={ref}>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-haspopup="true"
              aria-expanded={open}
              className={`${link} flex items-center gap-1`}
            >
              Products
              <svg className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {open && (
              <div className="absolute left-0 top-full mt-3 w-72 rounded-xl border border-[var(--p8-border)] bg-[var(--p8-surface)] p-2 shadow-xl">
                {PRODUCTS.map((p) => (
                  <Link
                    key={p.href}
                    href={p.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 hover:bg-[var(--p8-hover)]"
                  >
                    <span className="block text-sm font-semibold text-[var(--p8-fg)]">{p.name}</span>
                    <span className="block text-xs text-[var(--p8-muted)]">{p.desc}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/architecture/" className={link}>Architecture</Link>
          <Link href="/quickstart/" className={link}>Developers</Link>
          <Link href="/pricing/" className={link}>Pricing</Link>
          <Link href="/benchmarks/" className={link}>Benchmarks</Link>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobile((v) => !v)}
            aria-label={mobile ? "Close menu" : "Open menu"}
            aria-expanded={mobile}
            aria-controls="p8-mobile-menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--p8-border)] text-[var(--p8-fg)] hover:bg-[var(--p8-hover)] md:hidden"
          >
            {mobile ? (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" /></svg>
            ) : (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" /></svg>
            )}
          </button>
          <button
            onClick={toggle}
            aria-label={theme === "day" ? "Switch to night theme" : "Switch to day theme"}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--p8-border)] text-[var(--p8-fg)] hover:bg-[var(--p8-hover)]"
          >
            {theme === "day" ? (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" /></svg>
            ) : (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="4" /><path strokeLinecap="round" d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4l1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
            )}
          </button>
        </div>
      </nav>

      {mobile && (
        <div id="p8-mobile-menu" className="border-t border-[var(--p8-border)] bg-[var(--p8-surface)] px-4 pb-6 pt-2 md:hidden">
          <p className="px-2 pt-3 text-xs font-semibold uppercase tracking-widest text-[var(--p8-muted)]">Products</p>
          {PRODUCTS.map((p) => (
            <Link key={p.href} href={p.href} onClick={() => setMobile(false)} className="block rounded-lg px-2 py-2.5 hover:bg-[var(--p8-hover)]">
              <span className="block font-semibold text-[var(--p8-fg)]">{p.name}</span>
              <span className="block text-xs text-[var(--p8-muted)]">{p.desc}</span>
            </Link>
          ))}
          <div className="mt-3 border-t border-[var(--p8-border)] pt-3">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setMobile(false)} className="block rounded-lg px-2 py-2.5 text-[var(--p8-fg)] hover:bg-[var(--p8-hover)]">
                {n.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
