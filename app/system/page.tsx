import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import * as Icons from "@/components/Icons";
import { applications } from "@/lib/site";

export const metadata: Metadata = {
  title: "The TITAN Hoarding System",
  description:
    "Capital Hoardings utilises the TITAN Hoarding System — an Australian-made, modular, freestanding hoarding system engineer-certified and designed to comply with AS 4687.",
  alternates: { canonical: "/system" },
};

const keyFeatures = [
  {
    icon: "IconStand",
    title: "Freestanding design",
    body: "TITAN is designed to be installed without ground penetration or ceiling fixings, making it suitable for a wide range of internal and external applications. Optional bracing can be incorporated for demanding external environments and higher wind conditions.",
  },
  {
    icon: "IconModular",
    title: "Modular & flexible",
    body: "Individual panels and structural components allow the system to be configured around different site boundaries, access points, angles, levels and project requirements. TITAN can be adapted as your project progresses.",
  },
  {
    icon: "IconWeight",
    title: "Counterweighted system",
    body: "Counterweighted panels provide a practical solution for temporary and long-term installations, allowing hoarding to be efficiently installed, relocated, modified and removed as site requirements change.",
  },
  {
    icon: "IconHeight",
    title: "Versatile heights",
    body: "The system accommodates a broad range of applications, with internal hoarding configurations typically available from approximately 1.2m to 3.6m, while specialised external applications can achieve significantly greater heights with appropriate engineering, dust suppression and bracing requirements.",
  },
  {
    icon: "IconFlame",
    title: "Fire-resistant panel options",
    body: "TITAN panels are available with EPS-FR and FM-approved XFLAM core options, providing fire-retardant properties and thermal insulation for applications where additional performance requirements apply.",
  },
  {
    icon: "IconBrand",
    title: "Designed for branding",
    body: "Hoarding doesn't have to be an eyesore. TITAN panels provide an ideal surface for project branding, graphics, signage, lighting and architectural finishes, transforming temporary site boundaries into professional and visually engaging spaces.",
  },
];

const specs = [
  { label: "Internal heights", value: "1.2m – 3.6m" },
  { label: "Compliance", value: "AS 4687" },
  { label: "Panel cores", value: "EPS-FR · XFLAM" },
  { label: "Origin", value: "Australian-made" },
];

export default function SystemPage() {
  return (
    <>
      <PageHero
        eyebrow="Our system"
        title="Advanced hoarding. Engineered for Australian conditions."
        intro="Capital Hoardings utilises the TITAN Hoarding System to provide a secure, flexible and professional temporary hoarding solution for construction sites, commercial developments, retail environments and public areas."
        image="/images/system-apps.jpg"
        imageAlt=""
      />

      {/* Spec strip */}
      <section className="border-b border-line bg-white">
        <dl className="mx-auto grid max-w-7xl gap-px bg-line px-6 sm:grid-cols-2 lg:grid-cols-4">
          {specs.map((spec) => (
            <div key={spec.label} className="bg-white px-6 py-8">
              <dt className="eyebrow text-navy/55">{spec.label}</dt>
              <dd className="mt-3 font-display text-3xl font-bold text-navy">
                {spec.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Overview */}
      <section className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 sm:py-28 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <SectionHeading eyebrow="Overview" title="A system, not a fence" />
          <div className="mt-8 space-y-5 text-base leading-relaxed text-muted sm:text-lg">
            <p>
              Australian-made and engineered for demanding site conditions, TITAN is a
              modular, freestanding hoarding system designed to provide effective site
              separation and protection without the need for traditional ground
              penetration or ceiling fixings.
            </p>
            <p>
              Its versatile design allows hoarding to be configured to suit virtually any
              site layout, while its robust construction provides the strength,
              flexibility and professional finish required for modern construction
              projects.
            </p>
          </div>
        </div>
        <Photo
          src="/images/system-panels.jpg"
          alt="Hoarding panels and site signage securing a work zone"
          note="Replace with a TITAN panel detail photo"
          className="h-[24rem] lg:h-[30rem]"
          sizes="(max-width: 1024px) 100vw, 48vw"
        />
      </section>

      {/* Key features */}
      <section className="bg-panel">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
          <SectionHeading eyebrow="Key features" title="What the TITAN system delivers" />
          <div className="mt-14 grid gap-px bg-line md:grid-cols-2 lg:grid-cols-3">
            {keyFeatures.map((feature, i) => {
              const Icon = Icons[feature.icon as keyof typeof Icons];
              return (
                <Reveal key={feature.title} delay={i * 70} className="bg-white">
                  <div className="h-full p-9">
                    <span className="flex h-12 w-12 items-center justify-center bg-navy text-sky">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-6 text-xl">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {feature.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeading
              eyebrow="Applications"
              title="Built for a wide range of environments"
              intro="The TITAN Hoarding System suits far more than a standard building site."
            />
            <Photo
              src="/images/service-branded.jpg"
              alt="Branded hoarding panels along a city street frontage"
              note="Replace with Capital Hoardings application photos"
              className="mt-10 h-72"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
          <ol className="grid gap-px self-start bg-line">
            {applications.map((app, i) => (
              <Reveal key={app.title} delay={i * 60} className="bg-white">
                <li className="flex flex-col gap-3 p-7 sm:flex-row sm:gap-8">
                  <span className="font-display text-2xl font-bold text-sky sm:w-12 sm:shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-xl">{app.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{app.body}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Safety */}
      <section className="relative overflow-hidden bg-navy-ink">
        <div className="hazard-wash absolute inset-0" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-6 py-20 sm:py-28 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Compliance"
              title="Engineered for safety"
              tone="dark"
            />
            <div className="mt-8 space-y-5 text-base leading-relaxed text-white/75 sm:text-lg">
              <p>
                Safety is at the core of the TITAN system. The system is
                engineer-certified and designed to comply with AS 4687 requirements,
                providing a robust solution for temporary hoarding applications.
              </p>
              <p>
                External installations can be engineered to accommodate site-specific
                wind loads, with additional bracing available where required. Panel
                options incorporating fire-retardant cores can also provide enhanced fire
                performance for appropriate applications.
              </p>
            </div>
          </div>

          <div className="border border-white/15 bg-white/5 p-10">
            <h3 className="text-2xl text-white">We&apos;ll spec it for your site</h3>
            <p className="mt-4 text-sm leading-relaxed text-white/75">
              Capital Hoardings can assess your project requirements and determine the
              most suitable TITAN configuration, taking into consideration:
            </p>
            <ul className="mt-7 grid gap-px bg-white/15 sm:grid-cols-2">
              {[
                "Site conditions",
                "Hoarding height",
                "Wind loads",
                "Access requirements",
                "Pedestrian protection",
                "Bracing",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 bg-navy-ink px-4 py-4 text-sm text-white/85"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-sky" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
