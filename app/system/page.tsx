import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import PhotoSlot from "@/components/PhotoSlot";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { applications } from "@/lib/site";

export const metadata: Metadata = {
  title: "The TITAN Hoarding System",
  description:
    "Capital Hoardings utilises the TITAN Hoarding System — an Australian-made, modular, freestanding hoarding system engineer-certified and designed to comply with AS 4687.",
  alternates: { canonical: "/system" },
};

const keyFeatures = [
  {
    title: "Freestanding design",
    body: "TITAN is designed to be installed without ground penetration or ceiling fixings, making it suitable for a wide range of internal and external applications. Optional bracing can be incorporated for demanding external environments and higher wind conditions.",
  },
  {
    title: "Modular & flexible",
    body: "Individual panels and structural components allow the system to be configured around different site boundaries, access points, angles, levels and project requirements. TITAN can be adapted as your project progresses.",
  },
  {
    title: "Counterweighted system",
    body: "Counterweighted panels provide a practical solution for temporary and long-term installations, allowing hoarding to be efficiently installed, relocated, modified and removed as site requirements change.",
  },
  {
    title: "Versatile heights",
    body: "The system accommodates a broad range of applications, with internal hoarding configurations typically available from approximately 1.2m to 3.6m, while specialised external applications can achieve significantly greater heights with appropriate engineering, dust suppression and bracing requirements.",
  },
  {
    title: "Fire-resistant panel options",
    body: "TITAN panels are available with EPS-FR and FM-approved XFLAM core options, providing fire-retardant properties and thermal insulation for applications where additional performance requirements apply.",
  },
  {
    title: "Designed for branding",
    body: "Hoarding doesn't have to be an eyesore. TITAN panels provide an ideal surface for project branding, graphics, signage, lighting and architectural finishes, transforming temporary site boundaries into professional and visually engaging spaces.",
  },
];

export default function SystemPage() {
  return (
    <>
      <PageHero
        eyebrow="Our system"
        title="Advanced hoarding. Engineered for Australian conditions."
        intro="Capital Hoardings utilises the TITAN Hoarding System to provide a secure, flexible and professional temporary hoarding solution for construction sites, commercial developments, retail environments and public areas."
      />

      {/* Overview */}
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:py-24 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5 text-base leading-relaxed text-muted">
          <p>
            Australian-made and engineered for demanding site conditions, TITAN is a
            modular, freestanding hoarding system designed to provide effective site
            separation and protection without the need for traditional ground penetration
            or ceiling fixings.
          </p>
          <p>
            Its versatile design allows hoarding to be configured to suit virtually any
            site layout, while its robust construction provides the strength, flexibility
            and professional finish required for modern construction projects.
          </p>
        </div>
        <PhotoSlot
          label="TITAN panel system in place (to be provided)"
          className="min-h-[280px]"
        />
      </section>

      {/* Key features */}
      <section className="bg-panel">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
          <SectionHeading eyebrow="Key features" title="What the TITAN system delivers" />
          <div className="mt-12 grid gap-px overflow-hidden rounded border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {keyFeatures.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 60} className="bg-white">
                <div className="h-full p-8">
                  <span className="font-display text-sm font-bold text-sky">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-xl">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{feature.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <SectionHeading
          eyebrow="Applications"
          title="Built for a wide range of applications"
          intro="The TITAN Hoarding System is suitable for a variety of environments, including:"
        />
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_0.8fr]">
          <ul className="divide-y divide-line border-y border-line">
            {applications.map((app) => (
              <li key={app.title} className="flex flex-col gap-2 py-6 sm:flex-row sm:gap-8">
                <h3 className="text-lg sm:w-64 sm:shrink-0">{app.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{app.body}</p>
              </li>
            ))}
          </ul>
          <PhotoSlot
            label="Application photos (to be provided)"
            className="min-h-[300px]"
          />
        </div>
      </section>

      {/* Safety */}
      <section className="bg-navy-ink">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:py-24 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Compliance"
              title="Engineered for safety"
              tone="dark"
            />
            <div className="mt-6 space-y-5 text-base leading-relaxed text-white/75">
              <p>
                Safety is at the core of the TITAN system. The system is engineer-certified
                and designed to comply with AS 4687 requirements, providing a robust
                solution for temporary hoarding applications.
              </p>
              <p>
                External installations can be engineered to accommodate site-specific wind
                loads, with additional bracing available where required. Panel options
                incorporating fire-retardant cores can also provide enhanced fire
                performance for appropriate applications.
              </p>
            </div>
          </div>
          <div className="rounded border border-white/15 bg-white/5 p-9">
            <h3 className="text-2xl text-white">We&apos;ll spec it for your site</h3>
            <p className="mt-4 text-sm leading-relaxed text-white/75">
              Capital Hoardings can assess your project requirements and determine the
              most suitable TITAN configuration, taking into consideration:
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Site conditions",
                "Hoarding height",
                "Wind loads",
                "Access requirements",
                "Pedestrian protection",
                "Bracing",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm text-white/85">
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-sky" />
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
