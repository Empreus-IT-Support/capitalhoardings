import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-28 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-navy/60">
        404
      </p>
      <h1 className="mt-4 text-4xl">We couldn&apos;t find that page</h1>
      <p className="mt-5 text-muted">
        The page you&apos;re after may have moved. Head back to the homepage or get in
        touch and we&apos;ll point you in the right direction.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="rounded bg-navy px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-navy-deep"
        >
          Back to home
        </Link>
        <Link
          href="/contact"
          className="rounded border border-line px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-navy transition-colors hover:border-navy"
        >
          Contact us
        </Link>
      </div>
    </section>
  );
}
