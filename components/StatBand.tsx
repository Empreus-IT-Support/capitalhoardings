import CharReveal from "./CharReveal";
import Reveal from "./Reveal";

const stats = [
  { value: "1.2–3.6m", label: "Internal hoarding heights" },
  { value: "AS 4687", label: "Engineer-certified design" },
  { value: "Zero", label: "Ground or ceiling fixings" },
  { value: "ACT + NSW", label: "Local team, local projects" },
];

/** Hard numbers pulled from the TITAN specification in the brief. */
export default function StatBand() {
  return (
    <section className="relative overflow-hidden bg-navy">
      <div className="panel-seams absolute inset-0" aria-hidden />
      <div
        className="hazard-wash hazard-wash-drift absolute inset-0 opacity-40"
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-7xl gap-px bg-white/15 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 90} direction="up" distance={18}>
            <div className="group h-full bg-navy px-2 py-11 transition-colors duration-500 hover:bg-navy-deep sm:px-7">
              <CharReveal
                text={stat.value}
                delay={i * 90 + 120}
                className="block font-display text-4xl font-extrabold leading-none text-white sm:text-5xl"
              />
              <span
                aria-hidden
                className="mt-4 block h-[3px] w-8 bg-sky transition-all duration-500 group-hover:w-16"
              />
              <p className="mt-3 text-sm text-sky">{stat.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
