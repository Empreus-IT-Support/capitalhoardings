/**
 * Single source of truth for contact details, nav and service copy.
 *
 * TBC values come straight from the client brief ("P: TBC", "E: TBC") — swap
 * them here once confirmed and every page picks them up.
 */

export const site = {
  name: "Capital Hoardings",
  tagline: "Building Protection. Delivering Confidence",
  url: "https://www.capitalhoardings.com.au",
  region: "ACT & Southern NSW",
  /** Not yet supplied by the client. Leave null to hide phone links site-wide. */
  phone: null as string | null,
  phoneDisplay: "TBC",
  email: "office@capitalhoardings.com.au",
  accountsEmail: "accounts@capitalhoardings.com.au",
} as const;

export const nav = [
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/system", label: "System" },
  { href: "/contact", label: "Contact" },
] as const;

export const services = [
  {
    slug: "internal",
    title: "Internal Hoarding",
    summary:
      "Clean, freestanding hoarding for works inside occupied buildings — retail fit-outs, refurbishments, tenancy works and commercial upgrades.",
    points: [
      "Installed without ground penetration or ceiling fixings",
      "Configured around shopfronts, lifts, travel paths and access points",
      "Typical heights from approximately 1.2m to 3.6m",
      "Fire-retardant panel options available where required",
      "Tidy, professional finish in customer-facing areas",
    ],
  },
  {
    slug: "external",
    title: "External Hoarding",
    summary:
      "Robust site hoarding for construction sites and developments, engineered for local wind loads and public protection.",
    points: [
      "Secure site boundaries and controlled access",
      "Pedestrian protection and public separation",
      "Bracing engineered to site-specific wind loads",
      "Dust, debris and noise containment",
      "Installed, modified and removed to suit your program",
    ],
  },
  {
    slug: "branded",
    title: "Branded Hoarding",
    summary:
      "Turn temporary site boundaries into a professional presentation of your project with printed graphics, signage and lighting.",
    points: [
      "Full-panel printed graphics and project branding",
      "Developer, builder and pre-sales signage",
      "Architectural finishes and integrated lighting",
      "Consistent presentation across the whole site frontage",
      "Keeps hoarding looking sharp for the life of the project",
    ],
  },
] as const;

export const whyUs = [
  {
    title: "Local knowledge",
    body: "Proudly servicing the ACT and Southern NSW.",
  },
  {
    title: "Quality workmanship",
    body: "Professional installation with attention to detail.",
  },
  {
    title: "Reliable service",
    body: "We understand the importance of keeping construction projects on schedule.",
  },
  {
    title: "Practical solutions",
    body: "Hoarding designed around the needs of your site.",
  },
  {
    title: "Safety focused",
    body: "We take site safety, security and public protection seriously.",
  },
  {
    title: "Professional presentation",
    body: "Clean, well-installed hoarding that reflects positively on your project.",
  },
] as const;

export const applications = [
  {
    title: "Construction Sites",
    body: "Establish secure site boundaries while helping protect pedestrians and the public from construction hazards, dust and debris.",
  },
  {
    title: "Retail & Commercial Fit-Outs",
    body: "Create clean, professional temporary barriers around shopfronts, refurbishments and high-traffic areas.",
  },
  {
    title: "Airports & Commercial Buildings",
    body: "Provide adaptable temporary barriers and protected passageways while maintaining safe movement through operational environments.",
  },
  {
    title: "Public Protection",
    body: "Establish controlled separation between active works and surrounding public areas.",
  },
  {
    title: "Events & Temporary Installations",
    body: "Create adaptable temporary enclosures and controlled-access areas.",
  },
] as const;
