import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import Process from "@/components/Process";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import StatBand from "@/components/StatBand";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Capital Hoardings is a specialist hoarding construction company servicing the ACT and Southern NSW, delivering practical and professional hoarding solutions for projects of all sizes.",
  alternates: { canonical: "/about" },
};

const gallery = [
  { src: "/images/project-01.jpg", alt: "Secured construction site boundary" },
  { src: "/images/project-02.jpg", alt: "Hoarding and scaffolding on a commercial build" },
  { src: "/images/project-03.jpg", alt: "Site crew walking a hoarded street frontage" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={site.tagline}
        intro="A specialist hoarding construction company servicing the ACT and Southern NSW — practical, professional and reliable hoarding solutions for construction sites, commercial developments and projects of all sizes."
        image="/images/about-install.jpg"
        imageAlt=""
      />

      {/* Intro — text beside a tall portrait image */}
      <section className="mx-auto grid max-w-7xl gap-14 px-6 py-20 sm:py-28 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <SectionHeading
            eyebrow="Who we are"
            title="Hoarding is all we do"
          />
          <div className="mt-8 space-y-5 text-base leading-relaxed text-muted sm:text-lg">
            <p>
              Capital Hoardings is a specialist hoarding construction company servicing
              the ACT and Southern NSW. We provide practical, professional and reliable
              hoarding solutions for construction sites, commercial developments and
              projects of all sizes.
            </p>
            <p>
              We understand that effective site hoarding is an essential part of any
              construction project. It helps protect workers and the public, improves
              site security, manages pedestrian and site access, and keeps your project
              looking professional from day one.
            </p>
            <p>
              Our experienced team works closely with builders, developers, contractors
              and project managers to deliver hoarding solutions that are tailored to the
              requirements of each site.
            </p>
          </div>
        </div>
        <Photo
          src="/images/about-team.jpg"
          alt="Capital Hoardings crew on site in high-visibility gear"
          note="Replace with a photo of the Capital Hoardings team"
          className="h-[24rem] lg:h-full lg:min-h-[30rem]"
          sizes="(max-width: 1024px) 100vw, 40vw"
        />
      </section>

      <StatBand />

      {/* Built for your site */}
      <section className="bg-panel">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 sm:py-28 lg:grid-cols-[0.9fr_1.1fr]">
          <Photo
            src="/images/about-install.jpg"
            alt="Hoarding being installed on an active construction site"
            note="Replace with an installation-in-progress photo"
            className="order-2 h-[24rem] lg:order-1 lg:h-[30rem]"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
          <div className="order-1 lg:order-2">
            <SectionHeading eyebrow="Our approach" title="Built for your site" />
            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted sm:text-lg">
              <p>
                No two construction sites are the same. That&apos;s why we take a
                practical, project-focused approach to every job.
              </p>
              <p>
                From site setup and installation through to removal, we deliver solutions
                designed around your site conditions, access requirements, project
                timelines and safety considerations. We pride ourselves on quality
                workmanship, attention to detail and getting the job done efficiently and
                professionally.
              </p>
              <p>
                Whether you need standard construction hoarding, pedestrian protection,
                site screening, branded hoarding or a complete hoarding installation,
                Capital Hoardings has the experience and capability to deliver.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Process />

      {/* Quality + local, as contrasting panels */}
      <section className="mx-auto max-w-7xl px-6 pb-20 sm:pb-28">
        <div className="grid gap-px bg-line md:grid-cols-2">
          <Reveal className="bg-white">
            <article className="h-full p-10 sm:p-12">
              <p className="eyebrow text-navy/55">Standards</p>
              <h2 className="mt-4 text-3xl sm:text-4xl">Quality you can rely on</h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted sm:text-base">
                <p>At Capital Hoardings, we believe in doing the job properly.</p>
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

          <Reveal delay={120} className="relative overflow-hidden bg-navy">
            <div className="hazard-wash absolute inset-0" aria-hidden />
            <article className="relative h-full p-10 text-white/80 sm:p-12">
              <p className="eyebrow text-sky">Local</p>
              <h2 className="mt-4 text-3xl text-white sm:text-4xl">
                Proudly servicing the ACT &amp; Southern NSW
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed sm:text-base">
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

        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {gallery.map((shot, i) => (
            <Reveal key={shot.src} delay={i * 90}>
              <Photo
                src={shot.src}
                alt={shot.alt}
                note="Replace with a completed Capital Hoardings project"
                className="panel-card h-64"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
