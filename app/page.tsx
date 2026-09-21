import Image from "next/image";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import Marquee from "@/components/Marquee";
import Photo from "@/components/Photo";
import Process from "@/components/Process";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import StatBand from "@/components/StatBand";
import WordReveal from "@/components/WordReveal";
import * as Icons from "@/components/Icons";
import { IconArrow } from "@/components/Icons";
import { services, site, whyUs } from "@/lib/site";

const heroCredentials = [
  "Freestanding — no ground penetration",
  "Engineer-certified to AS 4687",
  "Modular panels, any site layout",
];

const titanPoints = [
  { icon: "IconStand", label: "Freestanding" },
  { icon: "IconModular", label: "Modular panels" },
  { icon: "IconShield", label: "AS 4687 certified" },
  { icon: "IconFlame", label: "Fire-retardant options" },
];

export default function Home() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative isolate flex min-h-[88vh] items-end overflow-hidden bg-navy-ink">
        <Image
          src="/images/hero.jpg"
          alt="Site hoarding panels enclosing a commercial construction site"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-navy-black via-navy-ink/78 to-navy-ink/18"
        />
        <div className="panel-seams absolute inset-0" aria-hidden />

        <div className="relative mx-auto w-full max-w-7xl px-6 pb-14 pt-32 sm:pb-20">
          <Reveal direction="right" distance={30}>
            <p className="eyebrow flex items-center gap-3 text-sky">
              <span className="diamond h-1.5 w-1.5 bg-sky" aria-hidden />
              Specialist hoarding — {site.region}
            </p>
          </Reveal>

          <WordReveal
            text={"Building protection.\n Delivering confidence."}
            className="text-display mt-6 max-w-5xl text-white"
            highlightFrom={2}
            delay={180}
          />

          <Reveal delay={900}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/75">
              Practical, professional and reliable hoarding for construction
              sites, commercial developments and projects of all sizes across
              the ACT and Southern NSW.
            </p>
          </Reveal>

          <Reveal delay={1040}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="btn-shine group inline-flex items-center gap-3 bg-sky px-8 py-4 text-sm font-semibold uppercase tracking-wider text-navy-ink transition-colors hover:bg-white"
              >
                Request a quote
                <IconArrow className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1.5" />
              </Link>
              <Link
                href="/system"
                className="btn-shine inline-flex items-center border border-white/30 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:border-sky hover:bg-white/10"
              >
                The TITAN system
              </Link>
            </div>
          </Reveal>

          {/* Credential strip — sits on the hero's bottom edge like a panel rail */}
          <ul className="mt-14 grid gap-px border-t border-white/15 bg-white/10 sm:grid-cols-3">
            {heroCredentials.map((item, i) => (
              <Reveal
                key={item}
                delay={1180 + i * 110}
                direction="up"
                distance={14}
              >
                <li className="flex h-full items-center gap-3 bg-navy-ink/80 px-5 py-4 text-sm text-white/80 backdrop-blur-sm">
                  <span
                    className="h-1.5 w-1.5 shrink-0 rotate-45 bg-sky"
                    aria-hidden
                  />
                  {item}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <Marquee />

      {/* ---------------- Services ---------------- */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="What we do"
            title="Hoarding solutions built around your site"
            intro="From standard construction hoarding through to branded installations — installed properly, on time and to a high standard."
          />
          <Reveal direction="left" delay={150}>
            <Link
              href="/services"
              className="group hidden items-center gap-2 pb-2 text-sm font-semibold uppercase tracking-wider text-navy hover:text-sky lg:inline-flex"
            >
              All services
              <IconArrow className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1.5" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {services.map((service, i) => (
            <Reveal
              key={service.slug}
              delay={i * 130}
              direction="up"
              distance={34}
            >
              <ServiceCard
                index={i}
                slug={service.slug}
                title={service.title}
                summary={service.summary}
                image={service.image}
              />
            </Reveal>
          ))}
        </div>
      </section>

      <StatBand />

      {/* ---------------- Why us ---------------- */}
      <section className="bg-panel">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
          <SectionHeading
            eyebrow="Why Capital Hoardings?"
            title="A responsive local team you can rely on"
            intro="We work closely with builders, developers, contractors and project managers to deliver hoarding that suits each site — and keeps the project moving."
          />
          <div className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
            {whyUs.map((item, i) => {
              const Icon = Icons[item.icon as keyof typeof Icons];
              return (
                <Reveal
                  key={item.title}
                  delay={i * 80}
                  direction="scale"
                  className="bg-white"
                >
                  <div className="group h-full p-9 transition-colors duration-500 hover:bg-sky-soft">
                    <span className="icon-tile flex h-12 w-12 items-center justify-center bg-navy text-sky">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-6 text-xl">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <Process />

      {/* ---------------- TITAN teaser ---------------- */}
      <section className="relative overflow-hidden bg-navy-ink">
        <div
          className="hazard-wash hazard-wash-drift absolute inset-0 opacity-60"
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 sm:py-28 lg:grid-cols-2">
          <Reveal direction="right" distance={40}>
            <Photo
              src="/images/system-apps.jpg"
              alt="Modular hoarding panels installed around an active construction site"
              note="Replace with a TITAN installation photo"
              className="panel-card h-[26rem] lg:h-[32rem]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="Our system"
              title="Advanced hoarding. Engineered for Australian conditions."
              intro="We utilise the TITAN Hoarding System — Australian-made, modular and freestanding, providing effective site separation without traditional ground penetration or ceiling fixings."
              tone="dark"
            />
            <ul className="mt-9 grid gap-px bg-white/15 sm:grid-cols-2">
              {titanPoints.map((item, i) => {
                const Icon = Icons[item.icon as keyof typeof Icons];
                return (
                  <Reveal
                    key={item.label}
                    delay={i * 90}
                    direction="up"
                    distance={16}
                  >
                    <li className="group flex h-full items-center gap-4 bg-navy-ink px-5 py-5 text-sm text-white/85 transition-colors duration-500 hover:bg-navy">
                      <Icon className="h-6 w-6 shrink-0 text-sky transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-6" />
                      {item.label}
                    </li>
                  </Reveal>
                );
              })}
            </ul>
            <Reveal delay={420}>
              <Link
                href="/system"
                className="btn-shine group mt-10 inline-flex items-center gap-3 bg-sky px-8 py-4 text-sm font-semibold uppercase tracking-wider text-navy-ink transition-colors hover:bg-white"
              >
                Explore the TITAN system
                <IconArrow className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1.5" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
