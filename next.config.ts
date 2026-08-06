import type { NextConfig } from "next";
import path from "path";

// Security headers applied when running as a Next.js server (not static export).
// For the GitHub Pages static export (output: "export"), these are NOT injected —
// they must be configured as CDN/Fastly rules. See public/_headers for the
// authoritative header declarations to mirror at the CDN layer.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://plausible.io https://cdn.tailwindcss.com https://unpkg.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https:",
      "connect-src 'self' https://plausible.io https://cc.purple8.ai https://purple8-command-center.fly.dev",
      "frame-ancestors 'none'",
    ].join("; "),
  },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  output: "export",      // static HTML export for GitHub Pages
  images: {
    unoptimized: true,   // next/image doesn't work with static export without a loader
  },
  trailingSlash: true,   // GitHub Pages serves index.html from directories
  turbopack: {
    root: path.resolve(__dirname), // explicit root — avoids preview-build inference bug
  },
  // headers() is ignored during static export but applies when running as a server
  // (Vercel, DigitalOcean, self-hosted). Kept in sync with public/_headers and CDN rules.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
