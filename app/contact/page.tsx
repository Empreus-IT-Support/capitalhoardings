import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import { IconLocation, IconPanel, IconShield } from "@/components/Icons";
import { JsonLd, breadcrumbs, pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Contact",
  description:
    "Talk to Capital Hoardings about your hoarding requirements across the ACT and Southern NSW. Send an enquiry and our team will be in touch.",
  path: "/contact",
});

const reassurance = [
  {
    icon: IconLocation,
    text: "A local team, servicing the ACT and Southern NSW",
  },
  {
    icon: IconPanel,
    text: "Hoarding specified around your site, not off a shelf",
  },
  { icon: IconShield, text: "Engineer-certified, safety-first installation" },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbs([{ name: "Contact", path: "/contact" }])} />

      <PageHero
        eyebrow="Contact"
        title="Talk to our team about your site"
        intro="Tell us about your project and we'll come back to you with a hoarding solution to suit it."
        image="/images/contact-site.jpg"
        imageAlt=""
      />

      <section className="mx-auto grid max-w-7xl gap-14 px-6 py-20 sm:py-28 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <h2 className="text-3xl">Get in touch</h2>

          <dl className="mt-9 grid gap-px bg-line">
            <div className="bg-white py-5">
              <dt className="eyebrow text-navy/55">Phone</dt>
              <dd className="mt-2 text-lg text-foreground">
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
            <div className="bg-white py-5">
              <dt className="eyebrow text-navy/55">General enquiries</dt>
              <dd className="mt-2">
                <a
                  href={`mailto:${site.email}`}
                  className="break-all text-lg text-navy hover:text-sky"
                >
                  {site.email}
                </a>
              </dd>
            </div>
            <div className="bg-white py-5">
              <dt className="eyebrow text-navy/55">Accounts</dt>
              <dd className="mt-2">
                <a
                  href={`mailto:${site.accountsEmail}`}
                  className="break-all text-lg text-navy hover:text-sky"
                >
                  {site.accountsEmail}
                </a>
              </dd>
            </div>
            <div className="bg-white py-5">
              <dt className="eyebrow text-navy/55">Servicing</dt>
              <dd className="mt-2 text-lg text-foreground">{site.region}</dd>
            </div>
          </dl>

          <ul className="mt-10 space-y-4">
            {reassurance.map((item) => (
              <li
                key={item.text}
                className="group flex items-start gap-4 text-sm text-muted"
              >
                <item.icon className="mt-0.5 h-6 w-6 shrink-0 text-sky transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:rotate-6" />
                {item.text}
              </li>
            ))}
          </ul>

          <Photo
            src="/images/project-01.jpg"
            alt="Hoarded construction site frontage"
            note="Replace with a Capital Hoardings project photo"
            className="panel-card mt-10 h-56"
            sizes="(max-width: 1024px) 100vw, 35vw"
          />
        </div>

        <div className="border border-line bg-panel p-8 sm:p-12">
          <p className="eyebrow text-navy/55">Enquiry</p>
          <h2 className="mt-3 text-3xl">Send us the details</h2>
          <p className="mt-3 text-sm text-muted">
            Fill in the form below and a member of our team will get back to
            you.
          </p>
          <div className="mt-9">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
