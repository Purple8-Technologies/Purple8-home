import type { Metadata } from "next";

/**
 * Canonical site origin. Kept in one place so route-specific canonical and
 * Open Graph URLs never drift from the deployed GitHub Pages domain.
 */
export const SITE_ORIGIN = "https://www.purple8.ai";

/** Absolute, stable Open Graph image URL served as image/png (see issue #13). */
export const OG_IMAGE_URL = `${SITE_ORIGIN}/og.png`;

export interface PageMetaOptions {
  /** Bare page title WITHOUT the brand suffix — the layout template adds " | Purple8". */
  title: string;
  description: string;
  /** Route path beginning with "/". Use "/" for the homepage. */
  path: string;
  /** Non-indexable transactional/registration routes set this to true. */
  noindex?: boolean;
}

/**
 * Build route-specific metadata: a single-suffix title, a page-specific
 * canonical URL, and matching Open Graph / Twitter metadata. Centralising this
 * prevents every route inheriting the homepage canonical + OG title
 * (issues #8, #13).
 */
export function pageMetadata({
  title,
  description,
  path,
  noindex = false,
}: PageMetaOptions): Metadata {
  const url = path === "/" ? SITE_ORIGIN : `${SITE_ORIGIN}${path}`;
  const fullTitle = `${title} | Purple8`;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex
      ? {
          index: false,
          follow: false,
          googleBot: { index: false, follow: false },
        }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true },
        },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: "Purple8",
      type: "website",
      locale: "en_US",
      images: [{ url: OG_IMAGE_URL, width: 1200, height: 630, type: "image/png" }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE_URL],
    },
  };
}
