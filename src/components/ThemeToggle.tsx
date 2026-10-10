"use client";

import { useEffect, useState } from "react";

/**
 * Day / night toggle for opt-in pages (wrap content in `.p8-themed`).
 *
 * Shares the `p8-theme` localStorage key with the revamp homepage
 * (BrandHome), so a choice made on one page carries to the others.
 * The initial value is applied before paint by the inline script in
 * `app/layout.tsx` (no flash of the wrong theme).
 */
type Theme = "day" | "night";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const current = document.documentElement.dataset.p8Theme as Theme | undefined;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(current === "night" ? "night" : "day");
  }, []);

  const toggle = () => {
    const next: Theme = theme === "night" ? "day" : "night";
    document.documentElement.dataset.p8Theme = next;
    try {
      localStorage.setItem("p8-theme", next);
    } catch {
      /* storage unavailable: theme still applies for this page view */
    }
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "night" ? "Switch to day theme" : "Switch to night theme"}
      title={theme === "night" ? "Day theme" : "Night theme"}
      className="p8-theme-toggle fixed right-4 top-20 z-40 flex h-9 w-9 items-center justify-center rounded-full border shadow-sm transition-colors"
    >
      {theme === "night" ? (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
