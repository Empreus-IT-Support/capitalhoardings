import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import PhotoSlot from "@/components/PhotoSlot";
import Reveal from "@/components/Reveal";
import { services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Internal, external and branded hoarding for construction sites, commercial developments and fit-outs across the ACT and Southern NSW.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Internal, external and branded hoarding"
        intro="Hoarding designed around the needs of your site — supplied, installed, modified and removed by an experienced local team."
      />

      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <div className="space-y-20 sm:space-y-24">
          {services.map((service, i) => (
            <section key={service.slug} id={service.slug} className="scroll-mt-32">
              <Reveal>
                <div
                  className={`grid items-center gap-12 lg:grid-cols-2 ${
                    i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <PhotoSlot
                    label={`${service.title} — project photo (to be provided)`}
                    className="min-h-[320px]"
                  />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-navy/60">
                      {String(i + 1).padStart(2, "0")} — {service.title}
                    </p>
                    <h2 className="mt-3 text-4xl">{service.title}</h2>
                    <p className="mt-5 text-base leading-relaxed text-muted">
                      {service.summary}
                    </p>
                    <ul className="mt-7 space-y-3 border-t border-line pt-7">
                      {service.points.map((point) => (
                        <li key={point} className="flex gap-3 text-sm text-muted">
                          <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-sky" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </section>
          ))}
        </div>
      </div>

      <CtaBand />
    </>
  );
}
