/**
 * Official NVIDIA Inception Program Member Badge.
 *
 * Follows the NVIDIA Inception Program Brand Guidelines:
 * - Official NVIDIA Eye + Wordmark SVG paths
 * - Official colors: NVIDIA Green (#76B900), Black (#000000), White (#FFFFFF)
 * - Adapts cleanly to both light ("day") and dark ("night") backgrounds via currentColor / CSS variables
 * - Preserves clear space, proportions, and "Inception Program" lockup
 */

export const NVIDIA_LEGAL_ATTRIBUTION =
  "© 2025 NVIDIA, the NVIDIA logo, and NVIDIA Inception are trademarks and/or registered trademarks of NVIDIA Corporation in the U.S. and other countries.";

export default function NvidiaInceptionBadge({
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
      aria-label="NVIDIA Inception Program Member"
      className={`inline-flex items-center border-2 px-4 py-2 select-none ${containerClasses} ${className}`}
    >
      {/* Left: NVIDIA Eye + Stacked NVIDIA Wordmark */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 220 155"
        className="h-full w-auto shrink-0"
        fill="none"
        aria-hidden="true"
      >
        {/* NVIDIA Green Eye Mark (#76B900) */}
        <g transform="translate(19, 4) scale(0.88)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M67.556 35.9405V25.1205C68.604 25.0405 69.668 24.9885 70.748 24.9525C100.348 24.0245 119.768 50.3885 119.768 50.3885C119.768 50.3885 98.792 79.5165 76.304 79.5165C73.332 79.5285 70.376 79.0565 67.556 78.1165V45.3005C79.076 46.6925 81.396 51.7805 88.324 63.3325L103.732 50.3405C103.732 50.3405 92.484 35.5885 73.524 35.5885C71.464 35.5885 69.492 35.7325 67.556 35.9405ZM67.556 0.188477V16.3605C68.616 16.2765 69.68 16.2085 70.748 16.1685C111.908 14.7845 138.728 49.9285 138.728 49.9285C138.728 49.9285 107.928 87.3845 75.836 87.3845C72.896 87.3845 70.14 87.1125 67.556 86.6525V96.6445C69.768 96.9245 72.06 97.0925 74.452 97.0925C104.312 97.0925 125.908 81.8445 146.82 63.7925C150.288 66.5685 164.484 73.3245 167.4 76.2845C147.516 92.9245 101.18 106.344 74.908 106.344C72.452 106.336 70 106.208 67.556 105.96V120H181.056V0.188477H67.556ZM67.556 78.1165V86.6525C39.936 81.7325 32.268 53.0165 32.268 53.0165C32.268 53.0165 45.532 38.3205 67.556 35.9405V45.3005L67.512 45.2965C55.952 43.9085 46.924 54.7085 46.924 54.7085C46.924 54.7085 51.984 72.8845 67.556 78.1165ZM18.5 51.7725C18.5 51.7725 34.868 27.6125 67.556 25.1205V16.3525C31.352 19.2605 0 49.9205 0 49.9205C0 49.9205 17.756 101.252 67.556 105.952V96.6445C31.012 92.0485 18.5 51.7725 18.5 51.7725Z"
            fill="#76B900"
          />
        </g>
        {/* NVIDIA Wordmark stacked below the eye */}
        <g transform="translate(-96, 108) scale(0.48)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M385.496 22.8287L385.504 101.469H407.712V22.8287H385.496ZM210.788 22.7247V101.469H233.2V40.3447L250.68 40.4007C256.428 40.4007 260.4 41.7807 263.172 44.7367C266.688 48.4807 268.12 54.5127 268.12 65.5567V101.469H289.828V57.9607C289.828 26.9087 270.036 22.7207 250.672 22.7207H210.792L210.788 22.7247ZM421.256 22.8327V101.469H457.28C476.472 101.469 482.736 98.2767 489.508 91.1207C494.3 86.0967 497.392 75.0647 497.392 63.0127C497.392 51.9607 494.772 42.1007 490.204 35.9607C481.976 24.9807 470.124 22.8327 452.424 22.8327H421.256ZM443.288 39.9527H452.836C466.688 39.9527 475.648 46.1767 475.648 62.3167C475.648 78.4647 466.688 84.6847 452.836 84.6847H443.288V39.9527ZM353.476 22.8327L334.94 85.1527L317.18 22.8367L293.208 22.8327L318.568 101.469H350.58L376.144 22.8327H353.476ZM507.728 101.469H529.94V22.8367L507.72 22.8327L507.728 101.469ZM569.984 22.8607L538.972 101.441H560.872L565.78 87.5527H602.48L607.124 101.441H630.9L599.652 22.8567L569.984 22.8607ZM584.4 37.2007L597.856 74.0167H570.524L584.4 37.2007Z"
            fill="currentColor"
          />
        </g>
      </svg>

      {/* Vertical Divider */}
      <span
        className="mx-3.5 h-4/5 w-px bg-current opacity-80"
        aria-hidden="true"
      />

      {/* Right: "Inception Program" */}
      <span className="text-left font-sans text-xs font-semibold leading-tight tracking-tight sm:text-sm">
        Inception
        <br />
        Program
      </span>
    </div>
  );
}
