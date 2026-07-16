"use client";

// Purple8 Graph Logo - Infinity symbol (∞)
import { useId } from "react";

export default function Purple8Logo({ className = "h-10 w-10" }: { className?: string }) {
  // #7: unique per-instance IDs so multiple logos on one page (Navbar + Footer)
  // don't emit duplicate DOM IDs or cross-reference each other's gradient/glow.
  const uid = useId().replace(/:/g, "");
  const gradientId = `purple8-gradient-${uid}`;
  const glowId = `purple8-glow-${uid}`;
  return (
    <svg
      viewBox="0 0 120 60"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e879f9" />
          <stop offset="25%" stopColor="#c084fc" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="75%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter={`url(#${glowId})`}>
        <path
          d="M60 30
             C60 12 45 5 30 15
             C15 25 15 35 30 45
             C45 55 60 48 60 30
             C60 12 75 5 90 15
             C105 25 105 35 90 45
             C75 55 60 48 60 30"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export function Purple8LogoFloating({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <div className="relative">
      <div style={{ animation: "float 3s ease-in-out infinite" }}>
        <svg
          viewBox="0 0 100 50"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="purple8-grad-float" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f0abfc">
                <animate attributeName="stop-color" values="#f0abfc;#e879f9;#d946ef;#f0abfc" dur="3s" repeatCount="indefinite" />
              </stop>
              <stop offset="50%" stopColor="#a855f7">
                <animate attributeName="stop-color" values="#a855f7;#9333ea;#7c3aed;#a855f7" dur="3s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="#7c3aed">
                <animate attributeName="stop-color" values="#7c3aed;#6d28d9;#5b21b6;#7c3aed" dur="3s" repeatCount="indefinite" />
              </stop>
            </linearGradient>
            <filter id="glow-float" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g filter="url(#glow-float)">
            <path
              d="M50 25
                 C50 10 38 5 26 12
                 C14 19 14 31 26 38
                 C38 45 50 40 50 25
                 C50 10 62 5 74 12
                 C86 19 86 31 74 38
                 C62 45 50 40 50 25"
              fill="none"
              stroke="url(#purple8-grad-float)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <style>{`
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-4px); }
            }
          `}</style>
        </svg>
      </div>
    </div>
  );
}

export function Purple8LogoSimple({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 50"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="purple8-simple" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e879f9" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      <path
        d="M50 25
           C50 10 38 5 26 12
           C14 19 14 31 26 38
           C38 45 50 40 50 25
           C50 10 62 5 74 12
           C86 19 86 31 74 38
           C62 45 50 40 50 25"
        fill="none"
        stroke="url(#purple8-simple)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
