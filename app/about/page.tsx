import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import PhotoSlot from "@/components/PhotoSlot";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Capital Hoardings is a specialist hoarding construction company servicing the ACT and Southern NSW, delivering practical and professional hoarding solutions for projects of all sizes.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={site.tagline}
        intro="A specialist hoarding construction company servicing the ACT and Southern NSW — practical, professional and reliable hoarding solutions for construction sites, commercial developments and projects of all sizes."
      />

      {/* Intro */}
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:py-24 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-5 text-base leading-relaxed text-muted">
          <p>
            Capital Hoardings is a specialist hoarding construction company servicing the
            ACT and Southern NSW. We provide practical, professional and reliable hoarding
            solutions for construction sites, commercial developments and projects of all
            sizes.
          </p>
          <p>
            We understand that effective site hoarding is an essential part of any
            construction project. It helps protect workers and the public, improves site
            security, manages pedestrian and site access, and keeps your project looking
            professional from day one.
          </p>
          <p>
            Our experienced team works closely with builders, developers, contractors and
            project managers to deliver hoarding solutions that are tailored to the
            requirements of each site.
          </p>
        </div>
        <PhotoSlot label="Team or site photo (to be provided)" className="min-h-[300px]" />
      </section>

      {/* Built for your site */}
      <section className="bg-panel">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <PhotoSlot
              label="Installation in progress (to be provided)"
              className="order-2 min-h-[300px] lg:order-1"
            />
            <div className="order-1 lg:order-2">
              <SectionHeading eyebrow="Our approach" title="Built for your site" />
              <div className="mt-6 space-y-5 text-base leading-relaxed text-muted">
                <p>
                  No two construction sites are the same. That&apos;s why we take a
                  practical, project-focused approach to every job.
                </p>
                <p>
                  From site setup and installation through to removal, we deliver
                  solutions designed around your site conditions, access requirements,
                  project timelines and safety considerations. We pride ourselves on
                  quality workmanship, attention to detail and getting the job done
                  efficiently and professionally.
                </p>
                <p>
                  Whether you need standard construction hoarding, pedestrian protection,
                  site screening, branded hoarding or a complete hoarding installation,
                  Capital Hoardings has the experience and capability to deliver.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality + local */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <div className="grid gap-10 md:grid-cols-2">
          <Reveal>
            <article className="h-full rounded border border-line p-9">
              <h2 className="text-3xl">Quality you can rely on</h2>
              <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted">
                <p>
                  At Capital Hoardings, we believe in doing the job properly.
                </p>
                <p>
                  We use quality materials, proven installation methods and a safety-first
                  approach to ensure every project is delivered to a high standard. We
                  communicate clearly, work efficiently and aim to make the hoarding
                  process as straightforward as possible for our clients.
                </p>
                <p>
                  From smaller construction sites to major developments, our focus remains
                  the same: safe sites, quality installations and reliable service.
                </p>
              </div>
            </article>
          </Reveal>

          <Reveal delay={100}>
            <article className="h-full rounded bg-navy p-9 text-white/80">
              <h2 className="text-3xl text-white">
                Proudly servicing the ACT &amp; Southern NSW
              </h2>
              <div className="mt-5 space-y-4 text-sm leading-relaxed">
                <p>
                  Based in the region and focused on local projects, Capital Hoardings
                  understands the requirements of construction sites across the ACT and
                  Southern NSW.
                </p>
                <p>
                  When you choose Capital Hoardings, you can expect a responsive local
                  team committed to delivering a quality result — on time and with minimal
                  disruption to your project.
                </p>
              </div>
            </article>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {["Completed project", "Site hoarding detail", "Branded hoarding"].map((l) => (
            <PhotoSlot key={l} label={`${l} (to be provided)`} className="min-h-[200px]" />
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
