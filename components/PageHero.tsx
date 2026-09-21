import Image from "next/image";
import Reveal from "./Reveal";
import WordReveal from "./WordReveal";

export default function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-ink">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-85"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-navy-black via-navy-ink/76 to-navy-ink/22"
      />
      <div className="panel-seams absolute inset-0" aria-hidden />
      <div
        className="hazard-wash hazard-wash-drift absolute inset-0 opacity-30"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-20 sm:pb-20 sm:pt-28">
        <Reveal direction="right" distance={26}>
          <p className="eyebrow flex items-center gap-3 text-sky">
            <span className="diamond h-1.5 w-1.5 bg-sky" aria-hidden />
            {eyebrow}
          </p>
        </Reveal>
        <WordReveal
          text={title}
          className="text-display-sm mt-5 max-w-4xl text-white"
          delay={140}
          step={55}
        />
        {intro && (
          <Reveal delay={520}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
              {intro}
            </p>
          </Reveal>
        )}
      </div>
      <div className="stripe-rule" aria-hidden />
    </section>
  );
}
