import Image from "next/image";
import Link from "next/link";
import { IconArrow } from "./Icons";

/**
 * Service card. The photo fills the card and the copy sits on a gradient over
 * it; on pointer devices the summary is collapsed (grid-rows 0fr → 1fr animates
 * height cleanly) and opens on hover. Touch devices get it open by default.
 */
export default function ServiceCard({
  index,
  slug,
  title,
  summary,
  image,
}: {
  index: number;
  slug: string;
  title: string;
  summary: string;
  image: string;
}) {
  return (
    <Link
      href={`/services#${slug}`}
      className="group relative block h-[28rem] overflow-hidden bg-navy-ink"
    >
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.09]"
      />

      {/* Legibility gradient — deepens on hover as the copy opens */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-navy-black via-navy-ink/60 to-navy-ink/5 transition-opacity duration-500 group-hover:opacity-95"
      />

      {/* Oversized ghost numeral, like a panel stencil. It sits low in the card
          so it always lands on the dark end of the gradient — up top it
          disappears against pale skies and roof sheeting. */}
      <span
        aria-hidden
        className="absolute bottom-3 right-4 font-display text-8xl font-extrabold leading-none text-white/15 transition-all duration-500 group-hover:-translate-y-1 group-hover:text-sky/35"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="absolute inset-x-0 bottom-0 p-7">
        <span
          aria-hidden
          className="block h-[3px] w-10 bg-sky transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-24"
        />
        <h3 className="mt-5 text-3xl text-white">{title}</h3>

        <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr]">
          <p className="overflow-hidden text-sm leading-relaxed text-white/75 lg:opacity-0 lg:transition-opacity lg:duration-500 lg:group-hover:opacity-100">
            <span className="block pt-3">{summary}</span>
          </p>
        </div>

        <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-sky">
          Learn more
          <IconArrow className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1.5" />
        </span>
      </div>
    </Link>
  );
}
