"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Purple8Logo from "@/components/Purple8Logo";

/**
 * SiteHeader: the unified header across the entire Purple8 website.
 *
 * Supports 3-mode theme switching:
 *  - "day" (Light)
 *  - "night" (Dark)
 *  - "auto" (Follows OS `prefers-color-scheme`)
 */
export type Theme = "day" | "night";
export type ThemeMode = "day" | "night" | "auto";

const PRODUCTS = [
  { href: "/products/docintel/", name: "DocIntel", desc: "Any document → entities & relationships" },
  { href: "/products/hyper-graph/", name: "Hyper Graph", desc: "Graph + vector + RAG + workflows, one process" },
];

const NAV = [
  { href: "/architecture/", name: "Architecture" },
  { href: "/quickstart/", name: "Developers" },
  { href: "/benchmarks/", name: "Benchmarks" },
  { href: "mailto:sales@purple8.ai?subject=Purple8%20Inquiry", name: "Contact Us" },
];

function resolveEffectiveTheme(mode: ThemeMode): Theme {
  if (mode === "day" || mode === "night") return mode;
  if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "night";
  }
  return "day";
}

export function useRootTheme(): [Theme, () => void, ThemeMode, (m: ThemeMode) => void] {
  const [mode, setModeState] = useState<ThemeMode>("auto");
  const [theme, setTheme] = useState<Theme>("day");

  useEffect(() => {
    let saved: ThemeMode = "auto";
    try {
      const raw = localStorage.getItem("p8-theme");
      if (raw === "day" || raw === "night" || raw === "auto") saved = raw;
    } catch { /* ignore */ }
    const eff = resolveEffectiveTheme(saved);
    document.documentElement.dataset.p8Theme = eff;
    document.documentElement.dataset.p8ThemeMode = saved;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setModeState(saved);
    setTheme(eff);

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onMq = () => {
      let cur: ThemeMode = "auto";
      try {
        const raw = localStorage.getItem("p8-theme");
        if (raw === "day" || raw === "night" || raw === "auto") cur = raw;
      } catch { /* ignore */ }
      if (cur === "auto") {
        const nextEff: Theme = mq.matches ? "night" : "day";
        document.documentElement.dataset.p8Theme = nextEff;
        setTheme(nextEff);
      }
    };
    mq.addEventListener("change", onMq);
    return () => mq.removeEventListener("change", onMq);
  }, []);

  const setMode = (nextMode: ThemeMode) => {
    const eff = resolveEffectiveTheme(nextMode);
    document.documentElement.dataset.p8Theme = eff;
    document.documentElement.dataset.p8ThemeMode = nextMode;
    try {
      if (nextMode === "auto") {
        localStorage.removeItem("p8-theme");
      } else {
        localStorage.setItem("p8-theme", nextMode);
      }
    } catch { /* ignore */ }
    setModeState(nextMode);
    setTheme(eff);
  };

  // Cycle: day -> night -> auto -> day
  const toggle = () => {
    const nextMode: ThemeMode = mode === "day" ? "night" : mode === "night" ? "auto" : "day";
    setMode(nextMode);
  };

  return [theme, toggle, mode, setMode];
}

export default function SiteHeader(props: { theme?: Theme; toggle?: () => void }) {
  const [rootTheme, rootToggle, mode, setMode] = useRootTheme();
  const theme = props.theme ?? rootTheme;
  const _toggle = props.toggle ?? rootToggle;

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
        Hyper Graph Cloud: <span className="font-semibold">coming soon</span>
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
          <Link href="/benchmarks/" className={link}>Benchmarks</Link>
          <a href="mailto:sales@purple8.ai?subject=Purple8%20Inquiry" className={link}>Contact Us</a>
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

          {/* 3-Mode Theme Switcher Icons: Sun (Light) | Moon (Dark) | Monitor (Auto) */}
          <div
            role="group"
            aria-label="Theme mode"
            className="inline-flex items-center rounded-full border border-[var(--p8-border)] bg-[var(--p8-surface)] p-0.5"
          >
            <button
              type="button"
              onClick={() => setMode("day")}
              aria-label="Light theme"
              title="Light theme"
              className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                mode === "day"
                  ? "bg-[var(--p8-accent)] text-white"
                  : "text-[var(--p8-muted)] hover:text-[var(--p8-fg)]"
              }`}
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="4" />
                <path strokeLinecap="round" d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4l1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setMode("night")}
              aria-label="Dark theme"
              title="Dark theme"
              className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                mode === "night"
                  ? "bg-[var(--p8-accent)] text-white"
                  : "text-[var(--p8-muted)] hover:text-[var(--p8-fg)]"
              }`}
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setMode("auto")}
              aria-label="Auto system theme"
              title="Auto (system preference)"
              className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                mode === "auto"
                  ? "bg-[var(--p8-accent)] text-white"
                  : "text-[var(--p8-muted)] hover:text-[var(--p8-fg)]"
              }`}
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <rect x="3" y="4" width="18" height="12" rx="2" />
                <path strokeLinecap="round" d="M8 20h8M12 16v4" />
              </svg>
            </button>
          </div>
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
