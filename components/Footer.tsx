import Link from "next/link";
import Logo from "./Logo";
import { nav, services, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-navy-ink text-white/80">
      <div className="stripe-rule" aria-hidden />
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo variant="dark" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed">
            Specialist hoarding construction for the ACT and Southern NSW. Practical,
            professional and reliable hoarding solutions for construction sites,
            commercial developments and projects of all sizes.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-sky">
            Site
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <h3 className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-sky">
            Services
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services#${s.slug}`}
                  className="transition-colors hover:text-white"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-sky">
            Contact
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <span className="block text-white/50">Phone</span>
              {site.phone ? (
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-white"
                >
                  {site.phoneDisplay}
                </a>
              ) : (
                <span>{site.phoneDisplay}</span>
              )}
            </li>
            <li>
              <span className="block text-white/50">General enquiries</span>
              <a
                href={`mailto:${site.email}`}
                className="break-all transition-colors hover:text-white"
              >
                {site.email}
              </a>
            </li>
            <li>
              <span className="block text-white/50">Accounts</span>
              <a
                href={`mailto:${site.accountsEmail}`}
                className="break-all transition-colors hover:text-white"
              >
                {site.accountsEmail}
              </a>
            </li>
            <li>
              <span className="block text-white/50">Servicing</span>
              <span>{site.region}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Proudly servicing the ACT &amp; Southern NSW.</p>
        </div>
      </div>
    </footer>
  );
}
