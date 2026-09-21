import type { Metadata } from "next";
import { applications, services, site } from "./site";

/**
 * Per-page social metadata.
 *
 * Next merges `openGraph` from the parent only when a child doesn't define it,
 * so without this every page would share the home page's OG title. The image
 * comes from app/opengraph-image.tsx and is picked up automatically.
 */
export function pageMeta({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${site.url}${path}`;
  const fullTitle = `${title} — ${site.name}`;
  // Declaring openGraph on a child replaces the parent block wholesale, so the
  // root opengraph-image.tsx has to be referenced again here or child pages
  // share with no image at all.
  const images = [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.name }];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      title: fullTitle,
      description,
      locale: "en_AU",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images,
    },
  };
}

/** Trail of crumbs for a page, so search results can show the hierarchy. */
export function breadcrumbs(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map(
      (crumb, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: crumb.name,
        item: `${site.url}${crumb.path}`,
      })
    ),
  };
}

const ORG_ID = `${site.url}/#organization`;

/** The business itself. Referenced by @id from the other blocks. */
export const organisationLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "@id": ORG_ID,
  name: site.name,
  url: site.url,
  description:
    "Specialist hoarding construction company servicing the ACT and Southern NSW — practical, professional and reliable hoarding for construction sites, commercial developments and projects of all sizes.",
  email: site.email,
  slogan: site.tagline,
  logo: `${site.url}/images/logo.png`,
  image: `${site.url}/opengraph-image`,
  knowsAbout: [
    "Site hoarding",
    "Construction hoarding",
    "Pedestrian protection",
    "Branded hoarding",
    "TITAN Hoarding System",
    "AS 4687",
  ],
  areaServed: [
    { "@type": "AdministrativeArea", name: "Australian Capital Territory" },
    { "@type": "AdministrativeArea", name: "Southern New South Wales" },
  ],
  // Phone and street address are still TBC from the client — add them here and
  // in lib/site.ts together, since both feed local search results.
} as const;

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: site.name,
  inLanguage: "en-AU",
  publisher: { "@id": ORG_ID },
} as const;

/** One Service entry per offering, tied back to the business. */
export const servicesLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Hoarding services",
  itemListElement: services.map((service, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: service.title,
      description: service.summary,
      serviceType: service.title,
      url: `${site.url}/services#${service.slug}`,
      provider: { "@id": ORG_ID },
      areaServed: site.region,
    },
  })),
} as const;

export const systemLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "TITAN Hoarding System",
  description:
    "Australian-made modular, freestanding hoarding system. Engineer-certified and designed to comply with AS 4687, installed without ground penetration or ceiling fixings.",
  category: "Temporary site hoarding",
  brand: { "@type": "Brand", name: "TITAN" },
  url: `${site.url}/system`,
  applicationCategory: applications.map((a) => a.title),
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    areaServed: site.region,
    seller: { "@id": ORG_ID },
  },
} as const;

/** Renders one or more JSON-LD blocks. */
export function JsonLd({ data }: { data: object | object[] }) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
