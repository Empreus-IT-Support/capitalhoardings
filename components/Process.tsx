import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const steps = [
  {
    title: "Assess",
    body: "We review site conditions, boundaries, access points, hoarding height and wind loads.",
  },
  {
    title: "Configure",
    body: "The TITAN system is specified to your layout — panels, bracing, gates and finishes.",
  },
  {
    title: "Install",
    body: "Our team installs to program, cleanly and safely, with minimal disruption to the site.",
  },
  {
    title: "Adapt",
    body: "As the project moves, hoarding is relocated, modified or extended to suit.",
  },
  {
    title: "Remove",
    body: "At completion we strike the hoarding and leave the site tidy.",
  },
];

/**
 * "From site setup and installation through to removal" — the brief describes
 * a process but never lays it out, so it gets its own section.
 */
export default function Process() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
      <SectionHeading
        eyebrow="How we work"
        title="From site setup through to removal"
        intro="A practical, project-focused approach to every job — designed around your site conditions, access requirements, timelines and safety considerations."
      />
      <ol className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((step, i) => (
          <Reveal key={step.title} delay={i * 70} className="bg-white">
            <li className="relative h-full p-7 pt-9">
              <span
                className="absolute left-0 top-0 h-1 w-full bg-sky"
                style={{ opacity: 1 - i * 0.16 }}
                aria-hidden
              />
              <span className="font-display text-sm font-bold tracking-widest text-sky">
                STEP {i + 1}
              </span>
              <h3 className="mt-2 text-2xl">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step.body}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
