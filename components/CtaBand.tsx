import Image from "next/image";
import Link from "next/link";
import { IconArrow } from "./Icons";
import { site } from "@/lib/site";

export default function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-navy-ink">
      <Image
        src="/images/cta-site.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-80"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-navy-black via-navy-ink/80 to-navy/45"
      />
      <div
        className="hazard-wash hazard-wash-drift absolute inset-0"
        aria-hidden
      />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-6 py-20 sm:py-24 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="eyebrow flex items-center gap-3 text-sky">
            <span className="diamond h-1.5 w-1.5 bg-sky" aria-hidden />
            Next step
          </p>
          <h2 className="text-display-sm mt-5 text-white">
            Get your project secured
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/75">
            Whether you&apos;re starting a new development or need hoarding for
            an existing construction site, Capital Hoardings can provide a
            solution to suit your project. Talk to our team today to discuss
            your hoarding requirements.
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
          <Link
            href="/contact"
            className="btn-shine group inline-flex items-center justify-center gap-3 bg-sky px-8 py-4 text-sm font-semibold uppercase tracking-wider text-navy-ink transition-colors hover:bg-white"
          >
            Request a quote
            <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href={`mailto:${site.email}`}
            className="btn-shine inline-flex items-center justify-center border border-white/30 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:border-sky hover:bg-white/10"
          >
            Email us
          </a>
        </div>
      </div>
    </section>
  );
}
