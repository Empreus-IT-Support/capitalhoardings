"use client";

import { useEffect, useRef, useState } from "react";
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
 * a process but never lays it out, so it gets its own section. The connector
 * rule draws itself across the row, then the steps arrive in sequence.
 */
export default function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Safety net: if the observer never fires — some embedded browsers and
    // headless renderers never report intersection — the content would stay
    // invisible for good. Reveal it on a timer regardless.
    const fallback = window.setTimeout(() => setShown(true), 1200);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          window.clearTimeout(fallback);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => {
      window.clearTimeout(fallback);
      io.disconnect();
    };
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
      <SectionHeading
        eyebrow="How we work"
        title="From site setup through to removal"
        intro="A practical, project-focused approach to every job — designed around your site conditions, access requirements, timelines and safety considerations."
      />

      <div className="relative mt-14">
        {/* Connector rule that draws across as the section arrives */}
        <span
          aria-hidden
          className={`connector absolute left-0 right-0 top-0 hidden h-[3px] bg-sky lg:block ${
            shown ? "is-visible" : ""
          }`}
        />

        <ol
          ref={ref}
          className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-5"
        >
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="step-reveal group relative h-full bg-white p-7 pt-9 transition-colors duration-500 hover:bg-panel"
              style={{
                opacity: shown ? 1 : 0,
                transform: shown ? "none" : "translateY(24px)",
                transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${
                  400 + i * 130
                }ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${400 + i * 130}ms`,
              }}
            >
              <span
                aria-hidden
                className="absolute left-0 top-0 h-1 bg-sky transition-all duration-700 lg:hidden"
                style={{ width: shown ? "100%" : 0, opacity: 1 - i * 0.14 }}
              />
              <span className="font-display text-sm font-bold tracking-widest text-sky">
                STEP {i + 1}
              </span>
              <h3 className="mt-2 text-2xl transition-transform duration-500 group-hover:translate-x-1">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
