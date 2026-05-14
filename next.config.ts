import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",      // static HTML export for GitHub Pages
  images: {
    unoptimized: true,   // next/image doesn't work with static export without a loader
  },
  trailingSlash: true,   // GitHub Pages serves index.html from directories
};

export default nextConfig;
