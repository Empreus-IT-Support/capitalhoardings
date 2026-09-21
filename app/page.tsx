import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import PhotoSlot from "@/components/PhotoSlot";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { services, site, whyUs } from "@/lib/site";

export default function Home() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden bg-navy-ink">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, #62B6E4 0 3px, transparent 3px 26px)",
          }}
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky">
              Specialist hoarding — {site.region}
            </p>
            <h1 className="mt-5 text-5xl text-white sm:text-6xl lg:text-7xl">
              Building protection.
              <br />
              <span className="text-sky">Delivering confidence.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/75">
              Capital Hoardings provides practical, professional and reliable hoarding
              solutions for construction sites, commercial developments and projects of
              all sizes across the ACT and Southern NSW.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded bg-sky px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-navy-ink transition-colors hover:bg-white"
              >
                Request a quote
              </Link>
              <Link
                href="/system"
                className="rounded border border-white/30 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:border-white hover:bg-white/10"
              >
                The TITAN system
              </Link>
            </div>
          </div>

          <PhotoSlot
            label="Hero image — installed hoarding on site (to be provided)"
            className="min-h-[320px] border-white/15 bg-white/5 lg:min-h-[420px]"
          />
        </div>
      </section>

      {/* ---------------- Services ---------------- */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <SectionHeading
          eyebrow="What we do"
          title="Hoarding solutions built around your site"
          intro="From standard construction hoarding through to branded installations, we deliver the right solution for the job — installed properly, on time and to a high standard."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 90}>
              <Link
                href={`/services#${service.slug}`}
                className="group flex h-full flex-col rounded border border-line bg-white transition-shadow hover:shadow-[0_12px_32px_rgba(7,31,58,0.1)]"
              >
                <PhotoSlot
                  label={`${service.title} photo`}
                  className="min-h-[180px] rounded-none rounded-t border-0 border-b"
                />
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-2xl">{service.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {service.summary}
                  </p>
                  <span className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-navy group-hover:text-sky">
                    Learn more →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- Why us ---------------- */}
      <section className="bg-panel">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
          <SectionHeading
            eyebrow="Why Capital Hoardings?"
            title="A responsive local team you can rely on"
            intro="We work closely with builders, developers, contractors and project managers to deliver hoarding that suits each site — and keeps the project moving."
          />
          <div className="mt-12 grid gap-px overflow-hidden rounded border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {whyUs.map((item, i) => (
              <Reveal key={item.title} delay={i * 60} className="bg-white">
                <div className="h-full p-8">
                  <span className="font-display text-sm font-bold text-sky">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-xl">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- TITAN teaser ---------------- */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 sm:py-24 lg:grid-cols-2">
        <PhotoSlot
          label="TITAN hoarding installation photo (to be provided)"
          className="min-h-[340px]"
        />
        <div>
          <SectionHeading
            eyebrow="Our system"
            title="Advanced hoarding. Engineered for Australian conditions."
            intro="We utilise the TITAN Hoarding System — an Australian-made, modular, freestanding hoarding system designed to provide effective site separation and protection without the need for traditional ground penetration or ceiling fixings."
          />
          <ul className="mt-8 space-y-3">
            {[
              "Freestanding — no ground penetration or ceiling fixings",
              "Modular panels configured to any site layout",
              "Engineer-certified, designed to comply with AS 4687",
              "Fire-retardant panel options available",
              "An ideal surface for project branding and graphics",
            ].map((point) => (
              <li key={point} className="flex gap-3 text-sm text-muted">
                <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-sky" />
                {point}
              </li>
            ))}
          </ul>
          <Link
            href="/system"
            className="mt-9 inline-block rounded bg-navy px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-navy-deep"
          >
            Explore the TITAN system
          </Link>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
