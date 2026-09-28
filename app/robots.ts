import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Indexing is OFF unless SITE_INDEXABLE is explicitly set to "true".
 *
 * The site is still pre-launch (awaiting client photos and a confirmed
 * phone number), so nothing here should be discoverable yet — a crawl
 * result outlives whatever placeholder content it captured.
 *
 * Flip SITE_INDEXABLE to "true" in the Vercel project at launch, not before.
 */
export const indexable = process.env.SITE_INDEXABLE === "true";

export default function robots(): MetadataRoute.Robots {
  if (!indexable) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
