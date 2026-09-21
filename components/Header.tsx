"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { nav, site } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Utility bar — contact details, as sketched in the client's layout */}
      <div className="hidden bg-navy-ink text-white md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-end gap-8 px-6 py-2 text-[0.8rem]">
          <span className="flex items-center gap-2">
            <span className="text-sky">Phone</span>
            {site.phone ? (
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="hover:text-sky"
              >
                {site.phoneDisplay}
              </a>
            ) : (
              <span className="text-white/70">{site.phoneDisplay}</span>
            )}
          </span>
          <span className="flex items-center gap-2">
            <span className="text-sky">Email</span>
            <a href={`mailto:${site.email}`} className="hover:text-sky">
              {site.email}
            </a>
          </span>
        </div>
      </div>

      <div
        className={`border-b border-line bg-white/95 backdrop-blur transition-shadow ${
          scrolled ? "shadow-[0_2px_16px_rgba(7,31,58,0.08)]" : ""
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 transition-[padding] duration-500 ${
            scrolled ? "py-1.5" : "py-3"
          }`}
        >
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {nav.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`nav-underline rounded px-4 py-2 text-sm font-semibold uppercase tracking-wider transition-colors ${
                    active ? "text-navy" : "text-muted hover:text-navy"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="btn-shine ml-3 bg-navy px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-navy-deep"
            >
              Get a quote
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="flex h-11 w-11 items-center justify-center rounded border border-line text-navy lg:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              {open ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>

        {open && (
          <nav
            id="mobile-nav"
            aria-label="Main"
            className="border-t border-line bg-white px-6 pb-6 pt-2 lg:hidden"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className="block border-b border-line py-3 text-sm font-semibold uppercase tracking-wider text-navy"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`mailto:${site.email}`}
              onClick={close}
              className="mt-4 block text-sm text-muted"
            >
              {site.email}
            </a>
            <Link
              href="/contact"
              onClick={close}
              className="mt-4 block rounded bg-navy px-5 py-3 text-center text-sm font-semibold uppercase tracking-wider text-white"
            >
              Get a quote
            </Link>
          </nav>
        )}
      </div>
      <div className="stripe-rule" aria-hidden />
    </header>
  );
}
