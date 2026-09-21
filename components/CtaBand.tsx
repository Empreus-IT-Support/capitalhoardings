import Link from "next/link";
import { site } from "@/lib/site";

export default function CtaBand() {
  return (
    <section className="bg-navy">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-16 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-3xl text-white sm:text-4xl">Get your project secured</h2>
          <p className="mt-4 text-white/80">
            Whether you&apos;re starting a new development or need hoarding for an
            existing construction site, Capital Hoardings can provide a solution to
            suit your project. Talk to our team today to discuss your hoarding
            requirements.
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
          <Link
            href="/contact"
            className="rounded bg-sky px-7 py-3.5 text-center text-sm font-semibold uppercase tracking-wider text-navy-ink transition-colors hover:bg-white"
          >
            Request a quote
          </Link>
          <a
            href={`mailto:${site.email}`}
            className="rounded border border-white/30 px-7 py-3.5 text-center text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:border-white hover:bg-white/10"
          >
            Email us
          </a>
        </div>
      </div>
    </section>
  );
}
