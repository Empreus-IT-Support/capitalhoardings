import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import Marquee from "@/components/Marquee";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import { IconArrow } from "@/components/Icons";
import { JsonLd, breadcrumbs, pageMeta, servicesLd } from "@/lib/seo";
import { services } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Services",
  description:
    "Internal, external and branded hoarding for construction sites, commercial developments and fit-outs across the ACT and Southern NSW.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[servicesLd, breadcrumbs([{ name: "Services", path: "/services" }])]}
      />

      <PageHero
        eyebrow="Services"
        title="Internal, external and branded hoarding"
        intro="Hoarding designed around the needs of your site — supplied, installed, modified and removed by an experienced local team."
        image="/images/service-external.jpg"
        imageAlt=""
      />

      {/* Jump strip */}
      <nav aria-label="Services" className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-px bg-line px-6">
          {services.map((service, i) => (
            <Link
              key={service.slug}
              href={`#${service.slug}`}
              className="group relative flex flex-1 items-center gap-4 overflow-hidden bg-white px-6 py-6 transition-colors duration-500 hover:bg-panel"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-sky transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
              />
              <span className="font-display text-2xl font-bold text-sky transition-transform duration-500 group-hover:-translate-y-0.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm font-semibold uppercase tracking-wider text-navy">
                {service.title}
              </span>
              <IconArrow className="ml-auto h-4 w-4 text-navy/40 transition-all duration-500 group-hover:translate-x-1.5 group-hover:text-sky" />
            </Link>
          ))}
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
        <div className="space-y-24 sm:space-y-32">
          {services.map((service, i) => {
            const flipped = i % 2 === 1;
            return (
              <section
                key={service.slug}
                id={service.slug}
                className="scroll-mt-28"
              >
                <div className="grid items-center gap-14 lg:grid-cols-2">
                  <Reveal direction={flipped ? "left" : "right"} distance={44}>
                    <Photo
                      src={service.image}
                      alt={service.title}
                      note={`Replace with a Capital Hoardings ${service.title.toLowerCase()} project photo`}
                      className="panel-card h-[24rem] lg:h-[32rem]"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </Reveal>
                  <div className={flipped ? "lg:order-1" : ""}>
                    <p className="eyebrow flex items-center gap-3 text-navy/55">
                      <span
                        className="h-1.5 w-1.5 rotate-45 bg-navy/40"
                        aria-hidden
                      />
                      {String(i + 1).padStart(2, "0")} — Service
                    </p>
                    <h2 className="text-display-sm mt-4">{service.title}</h2>
                    <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
                      {service.summary}
                    </p>
                    <ul className="mt-9 grid gap-px bg-line">
                      {service.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-4 bg-white py-4 text-sm text-muted"
                        >
                          <span
                            className="mt-[9px] h-1.5 w-1.5 shrink-0 rotate-45 bg-sky"
                            aria-hidden
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/contact"
                      className="group mt-10 inline-flex items-center gap-3 bg-navy px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-navy-deep"
                    >
                      Enquire about {service.title.toLowerCase()}
                      <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>

      <Marquee reverse />
      <CtaBand />
    </>
  );
}
