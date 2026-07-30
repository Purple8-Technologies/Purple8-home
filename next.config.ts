import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "export",      // static HTML export for GitHub Pages
  images: {
    unoptimized: true,   // next/image doesn't work with static export without a loader
  },
  trailingSlash: true,   // GitHub Pages serves index.html from directories
  turbopack: {
    root: path.resolve(__dirname), // explicit root — avoids preview-build inference bug
  },
};

export default nextConfig;
