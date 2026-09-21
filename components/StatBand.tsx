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
      <div className="relative mx-auto grid max-w-7xl gap-px bg-white/15 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 80} className="bg-navy">
            <div className="px-2 py-11 sm:px-7">
              <p className="font-display text-4xl font-extrabold leading-none text-white sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-3 text-sm text-sky">{stat.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
