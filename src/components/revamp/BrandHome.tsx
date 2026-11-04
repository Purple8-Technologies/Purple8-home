"use client";

import Link from "next/link";
import Purple8Logo from "@/components/Purple8Logo";
import NvidiaInceptionBadge from "@/components/NvidiaInceptionBadge";
import SiteHeader, { useRootTheme } from "@/components/revamp/SiteHeader";
import Footer from "@/components/Footer";

type Theme = "day" | "night";

/* ── Large multi-layered purple waves through the centre ────────────── */
// Each layer is a filled ribbon between two sine curves. Width 2400 = two
// copies of a 1200 viewport; period divides 1200 so translateX(-1200) loops.
function band(amp: number, period: number, thick: number, phase: number, y0 = 300) {
  const top: string[] = [];
  const bot: string[] = [];
  // Fine sampling (4px) so the curve has no visible facets. Bottom edge
  // follows the same phase as the top, so the ribbon never pinches.
  for (let x = 0; x <= 2400; x += 4) {
    const t = (x / period) * Math.PI * 2;
    top.push(`${x},${(y0 + amp * Math.sin(t + phase)).toFixed(1)}`);
    bot.push(`${x},${(y0 + thick + amp * 0.85 * Math.sin(t + phase + 0.25)).toFixed(1)}`);
  }
  return `M${top.join(" L")} L${bot.reverse().join(" L")} Z`;
}

// Few, long, gentle layers - slow drift, all softly blurred.
const WAVES = [
  { amp: 70, period: 1200, thick: 140, phase: 0.0, o: 0.10, dur: 48, rev: false },
  { amp: 55, period: 1200, thick: 110, phase: 1.6, o: 0.12, dur: 60, rev: true },
  { amp: 45, period: 600, thick: 80, phase: 3.0, o: 0.14, dur: 42, rev: false },
  { amp: 35, period: 600, thick: 50, phase: 4.4, o: 0.16, dur: 54, rev: true },
];

function PurpleWave() {
  return (
    <svg
      viewBox="0 0 1200 600"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="p8-wave-fill" x1="0" x2="1">
          <stop offset="0%" stopColor="#e879f9" />
          <stop offset="50%" stopColor="var(--p8-wave)" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      {WAVES.map((w, i) => (
        <g
          key={i}
          className="p8-wave"
          style={{ animationDuration: `${w.dur}s`, animationDirection: w.rev ? "reverse" : "normal" }}
        >
          <path
            d={band(w.amp, w.period, w.thick, w.phase)}
            fill="url(#p8-wave-fill)"
            fillOpacity={w.o}

          />
        </g>
      ))}
    </svg>
  );
}

/* ── Page shell ─────────────────────────────────────────────────────── */
export default function BrandHome() {
  const [theme] = useRootTheme();

  return (
    <div data-p8-theme={theme} className="p8-shell relative min-h-screen text-[var(--p8-fg)] transition-colors duration-500">
      <style>{CSS}</style>
      <SiteHeader />

      <main id="main-content" className="relative flex min-h-[calc(100vh-6rem)] flex-col items-center justify-center overflow-hidden px-4 pb-24 text-center">
        <PurpleWave />

        <div className="relative z-10 flex w-full flex-col items-center">
          <Purple8Logo className="h-36 w-72 sm:h-56 sm:w-[28rem]" animated />
          <h1 className="mt-2 text-5xl font-bold tracking-tight sm:text-7xl">
            Purple<span className="text-[var(--p8-accent)]">8</span>
          </h1>

          <p className="mt-8 flex flex-col gap-1 text-xl font-medium sm:flex-row sm:gap-4 sm:text-2xl">
            <span className="p8-beat" style={{ animationDelay: "0.3s" }}>Less Complexity.</span>
            <span className="p8-beat" style={{ animationDelay: "1.1s" }}>Infinite Possibility.</span>
            <span className="p8-beat text-[var(--p8-accent)]" style={{ animationDelay: "1.9s" }}>Real Impact.</span>
          </p>

          <p className="mt-4 text-sm font-semibold tracking-wide text-[var(--p8-accent)] sm:text-base">
            Built for AI, Operated by AI and Supervised by Humans.
          </p>
          <p className="mt-1.5 max-w-2xl text-xs tracking-wider text-[var(--p8-muted)] sm:text-sm">
            Read · Remember · Reason · Answer · Run · Protect · Prove · One Engine built to solve complex problems.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/try/docintel/" className="rounded-full bg-[var(--p8-accent)] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 hover:opacity-90">
              Try DocIntel
            </Link>
            <Link href="/try/graph/" className="rounded-full border border-[var(--p8-accent)] px-7 py-3 text-sm font-semibold text-[var(--p8-accent)] hover:bg-[var(--p8-hover)]">
              Try Hyper Graph
            </Link>
            <a href="mailto:sales@purple8.ai?subject=Purple8%20Inquiry" className="rounded-full border border-[var(--p8-border)] px-7 py-3 text-sm font-semibold text-[var(--p8-fg)] hover:border-[var(--p8-accent)] hover:text-[var(--p8-accent)]">
              Contact Us
            </a>
          </div>

          <div className="mt-12 flex flex-col items-center gap-3">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <NvidiaInceptionBadge className="h-12" variant="auto" />
            </div>
            <span className="text-xs text-[var(--p8-muted)]">
              Purple8 is a member of the NVIDIA Inception program
            </span>
          </div>
        </div>
      </main>


      <Footer />
    </div>
  );
}

const CSS = `
.p8-shell[data-p8-theme="day"] {
  --p8-bg:#ffffff; --p8-fg:#18181b; --p8-muted:#52525b; --p8-accent:#7c3aed;
  --p8-surface:#ffffff; --p8-border:#e4e4e7; --p8-hover:#f5f3ff;
  --p8-comet:#7c3aed; --p8-wave:#a855f7;
}
.p8-shell[data-p8-theme="night"] {
  --p8-bg:#0a0a0f; --p8-fg:#f4f4f5; --p8-muted:#a1a1aa; --p8-accent:#a855f7;
  --p8-surface:#11111a; --p8-border:#2e1065; --p8-hover:#1e1036;
  --p8-comet:#e9d5ff; --p8-wave:#7c3aed;
}
.p8-wave { animation: p8-drift linear infinite; }
@keyframes p8-drift { from { transform: translateX(0); } to { transform: translateX(-1200px); } }
.p8-beat { opacity: 0; animation: p8-fade 0.9s ease-out forwards; }
@keyframes p8-fade { from { opacity:0; transform: translateY(6px); } to { opacity:1; transform:none; } }
@media (prefers-reduced-motion: reduce) {
  .p8-wave, .p8-beat { animation: none !important; opacity: 1; }
}
`;
