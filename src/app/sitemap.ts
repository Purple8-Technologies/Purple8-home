import type { MetadataRoute } from "next";
import { activeRoles } from "@/lib/careers";
import { SITE_ORIGIN } from "@/lib/seo";

// Force static generation so the sitemap is emitted as a file under
// `output: "export"` (GitHub Pages). Regenerates on every build so career
// routes stay in sync with src/lib/careers.ts.
export const dynamic = "force-static";

/**
 * Indexable marketing/content routes. Transactional & registration routes
 * (/register, /activate, /beta, /download, /checkout/*) are intentionally
 * excluded — they are marked noindex (see issue #8) and must not appear here.
 */
const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/products", priority: 0.9, changeFrequency: "weekly" },
  { path: "/features", priority: 0.9, changeFrequency: "weekly" },
  { path: "/industries", priority: 0.8, changeFrequency: "monthly" },
  { path: "/benchmarks", priority: 0.8, changeFrequency: "weekly" },
  { path: "/quickstart", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/careers", priority: 0.6, changeFrequency: "weekly" },
  { path: "/support", priority: 0.5, changeFrequency: "monthly" },
  { path: "/legal/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/legal/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/legal/eula", priority: 0.3, changeFrequency: "yearly" },
  { path: "/legal/developer-agreement", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries = STATIC_ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: path === "/" ? SITE_ORIGIN : `${SITE_ORIGIN}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));

  const careerEntries = activeRoles.map((role) => ({
    url: `${SITE_ORIGIN}/careers/${role.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  return [...staticEntries, ...careerEntries];
}
