export default function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-ink">
      {/* Isometric band motif lifted from the logo mark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-[0.16]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, #62B6E4 0 2px, transparent 2px 22px)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl text-white sm:text-5xl">{title}</h1>
        {intro && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">{intro}</p>
        )}
      </div>
    </section>
  );
}
