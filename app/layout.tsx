import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import { JsonLd, organisationLd, websiteLd } from "@/lib/seo";
import { site } from "@/lib/site";

const display = Barlow_Condensed({
  weight: ["600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const DESCRIPTION =
  "Capital Hoardings is a specialist hoarding construction company servicing the ACT and Southern NSW — practical, professional and reliable hoarding for construction sites, commercial developments and projects of all sizes.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Capital Hoardings — Site Hoarding, ACT & Southern NSW",
    template: "%s — Capital Hoardings",
  },
  description: DESCRIPTION,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: "Empreus IT Support",
  keywords: [
    "site hoarding",
    "construction hoarding",
    "hoarding Canberra",
    "hoarding ACT",
    "temporary hoarding",
    "TITAN hoarding system",
    "branded hoarding",
    "pedestrian protection",
    "site screening",
    "Southern NSW",
  ],
  alternates: { canonical: "/" },
  category: "Construction",
  formatDetection: { telephone: true, address: false, email: true },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: "Capital Hoardings — Site Hoarding, ACT & Southern NSW",
    description: DESCRIPTION,
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    title: "Capital Hoardings — Site Hoarding, ACT & Southern NSW",
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-AU"
      className={`${display.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        {/* Reveal components render hidden and animate in on scroll, so without
            JS the page would come up blank. Force everything visible instead. */}
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html:
                ".reveal,.word-rise,.char-rise,.step-reveal{opacity:1!important;transform:none!important}.connector{transform:scaleX(1)!important}",
            }}
          />
        </noscript>
      </head>
      <body className="flex min-h-full flex-col">
        <JsonLd data={[organisationLd, websiteLd]} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
