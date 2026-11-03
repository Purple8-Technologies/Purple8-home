/**
 * Official Red Hat Partner Badge.
 *
 * Follows Red Hat Partner Brand Guidelines:
 * - Official Red Hat Fedora emblem (#EE0000 Red, #000000 Crown Band)
 * - "Red Hat" wordmark + vertical divider + "Partner" lockup
 * - Adapts cleanly to both light ("day") and dark ("night") backgrounds
 */

export const REDHAT_LEGAL_ATTRIBUTION =
  "Red Hat, the Red Hat logo, and OpenShift are trademarks or registered trademarks of Red Hat, Inc. or its subsidiaries in the United States and other countries.";

export default function RedHatPartnerBadge({
  className = "h-12",
  variant = "auto",
}: {
  className?: string;
  /** "light" = white bg / black text, "dark" = black bg / white text, "auto" = follows theme */
  variant?: "light" | "dark" | "auto";
}) {
  const containerClasses =
    variant === "dark"
      ? "border-white/80 bg-black text-white"
      : variant === "light"
      ? "border-black bg-white text-black"
      : "border-[var(--p8-fg,#18181b)] bg-[var(--p8-surface,#ffffff)] text-[var(--p8-fg,#18181b)]";

  return (
    <div
      role="img"
      aria-label="Red Hat Partner"
      className={`inline-flex items-center border-2 px-4 py-2 select-none ${containerClasses} ${className}`}
    >
      {/* Left: Official Red Hat Fedora Emblem + Wordmark */}
      <div className="flex items-center gap-2.5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 192 145"
          className="h-7 w-auto shrink-0"
          fill="none"
          aria-hidden="true"
        >
          {/* Red Fedora Brim & Crown (#EE0000) */}
          <path
            d="M127.47 83.49c12.51 0 30.61-2.58 30.61-17.46a14.4 14.4 0 0 0-.31-3.42l-7.45-32.36c-1.72-7.12-3.23-10.35-15.73-16.6C124.89 8.69 103.76.5 97.51.5 91.69.5 90 8.04 83.06 8.04c-6.68 0-11.64-5.6-17.89-5.6-6.03 0-9.91 4.09-12.93 12.5 0 0-8.41 23.72-9.49 27.16a6.43 6.43 0 0 0-.22 1.94c0 9.22 36.3 39.45 84.94 39.45M160 72.07c1.73 8.19 1.73 9.05 1.73 10.13 0 14.01-15.74 21.77-36.43 21.77-46.76 0-87.72-27.37-87.72-45.48a18.45 18.45 0 0 1 1.51-7.33C22.27 52 .5 55.02.5 74.22.5 105.7 75.09 144.5 134.15 144.5c45.28 0 56.7-20.48 56.7-36.65 0-12.72-11-27.16-30.85-35.78"
            fill="#EE0000"
          />
          {/* Hat Band & Shadow */}
          <path
            d="M160 72.07c1.73 8.19 1.73 9.05 1.73 10.13 0 14.01-15.74 21.77-36.43 21.77-46.76 0-87.72-27.37-87.72-45.48a18.45 18.45 0 0 1 1.51-7.33l3.66-9.06a6.43 6.43 0 0 0-.22 1.94c0 9.22 36.3 39.45 84.94 39.45 12.51 0 30.61-2.58 30.61-17.46a14.4 14.4 0 0 0-.31-3.42Z"
            fill="#000000"
          />
        </svg>
        <span className="font-sans text-sm font-bold tracking-tight sm:text-base">
          Red Hat
        </span>
      </div>

      {/* Vertical Divider */}
      <span
        className="mx-3.5 h-4/5 w-px bg-current opacity-80"
        aria-hidden="true"
      />

      {/* Right: "Partner" */}
      <span className="text-left font-sans text-xs font-semibold leading-tight tracking-tight sm:text-sm">
        Technology
        <br />
        Partner
      </span>
    </div>
  );
}
