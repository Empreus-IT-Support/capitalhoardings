import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { JsonLd, breadcrumbs, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Privacy Policy",
  description:
    "How Capital Hoardings collects, uses and protects personal information submitted through this website.",
  path: "/privacy-policy",
});

const LAST_UPDATED = "30 September 2026";

const sections: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "Who we are",
    body: (
      <p>
        Capital Hoardings is a specialist hoarding construction company
        servicing the ACT and Southern NSW. This policy explains how we handle
        personal information collected through this website, in line with the
        Australian Privacy Principles in the Privacy Act 1988 (Cth).
      </p>
    ),
  },
  {
    heading: "What we collect",
    body: (
      <p>
        The only personal information this website collects is what you choose
        to send us through the contact form: your name, contact details and
        message. Our hosting provider also keeps short-lived technical logs
        (such as IP addresses) for security and to keep the site running
        reliably.
      </p>
    ),
  },
  {
    heading: "How we use it",
    body: (
      <p>
        We use your enquiry details for one purpose: to respond to you about
        your project. Form submissions are delivered to our office email and
        are not stored in a database on this website. We do not use your
        details for marketing lists, and we never sell personal information.
      </p>
    ),
  },
  {
    heading: "Cookies and analytics",
    body: (
      <p>
        This website does not set advertising cookies or run third-party
        trackers. We use our hosting platform&rsquo;s privacy-friendly
        analytics, which counts page visits in aggregate without cookies and
        without identifying or tracking individual visitors across sites.
      </p>
    ),
  },
  {
    heading: "Who else sees it",
    body: (
      <p>
        Your enquiry passes through the service providers that run this
        website: our hosting platform and our transactional email provider,
        which delivers the message to us over an encrypted connection. These
        providers process the data only to provide those services. Beyond
        that, we disclose personal information only where the law requires it.
      </p>
    ),
  },
  {
    heading: "Access, correction and complaints",
    body: (
      <p>
        You can ask us at any time what personal information we hold about
        you, ask us to correct it, or ask us to delete it by emailing{" "}
        <a
          href="mailto:office@capitalhoardings.com.au"
          className="font-semibold text-sky underline underline-offset-2"
        >
          office@capitalhoardings.com.au
        </a>
        . If you are not satisfied with our response, you can complain to the
        Office of the Australian Information Commissioner (oaic.gov.au).
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbs([{ name: "Privacy Policy", path: "/privacy-policy" }])}
      />
      <PageHero
        eyebrow="Your information"
        title="Privacy Policy"
        intro={`How we handle the details you send us through this website. Last updated ${LAST_UPDATED}.`}
        image="/images/service-external.jpg"
        imageAlt=""
      />
      <section className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        {sections.map((s, i) => (
          <div key={s.heading} className={i === 0 ? "" : "mt-12"}>
            <h2 className="text-xl font-bold">{s.heading}</h2>
            <div className="mt-3 leading-relaxed text-ink/70">{s.body}</div>
          </div>
        ))}
      </section>
    </>
  );
}
