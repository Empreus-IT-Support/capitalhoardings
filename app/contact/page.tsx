import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";
import PhotoSlot from "@/components/PhotoSlot";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to Capital Hoardings about your hoarding requirements across the ACT and Southern NSW. Send an enquiry and our team will be in touch.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to our team about your site"
        intro="Tell us about your project and we'll come back to you with a hoarding solution to suit it."
      />

      <section className="mx-auto grid max-w-7xl gap-14 px-6 py-20 sm:py-24 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <h2 className="text-2xl">Get in touch</h2>
          <dl className="mt-8 space-y-7 text-sm">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-navy">
                Phone
              </dt>
              <dd className="mt-1 text-muted">
                {site.phone ? (
                  <a
                    href={`tel:${site.phone.replace(/\s/g, "")}`}
                    className="hover:text-navy"
                  >
                    {site.phoneDisplay}
                  </a>
                ) : (
                  site.phoneDisplay
                )}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-navy">
                General enquiries
              </dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${site.email}`}
                  className="break-all text-muted hover:text-navy"
                >
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-navy">
                Accounts
              </dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${site.accountsEmail}`}
                  className="break-all text-muted hover:text-navy"
                >
                  {site.accountsEmail}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-navy">
                Servicing
              </dt>
              <dd className="mt-1 text-muted">{site.region}</dd>
            </div>
          </dl>

          <PhotoSlot
            label="Contact page photo (to be provided)"
            className="mt-10 min-h-[220px]"
          />
        </div>

        <div className="rounded border border-line bg-panel p-8 sm:p-10">
          <h2 className="text-2xl">Send an enquiry</h2>
          <p className="mt-3 text-sm text-muted">
            Fill in the form below and a member of our team will get back to you.
          </p>
          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
