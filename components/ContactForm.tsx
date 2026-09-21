"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "mt-2 w-full rounded border border-line bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted/60 focus:border-navy focus:outline-none";
const label =
  "block text-xs font-semibold uppercase tracking-[0.16em] text-navy";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok)
        throw new Error(json.error || "Something went wrong.");
      form.reset();
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded border border-line bg-sky-soft p-8">
        <h3 className="text-xl">Thanks — we&apos;ve got your enquiry.</h3>
        <p className="mt-3 text-sm text-muted">
          A member of the Capital Hoardings team will be in touch shortly to
          discuss your hoarding requirements.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold uppercase tracking-wider text-navy underline underline-offset-4"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      {/* Honeypot — hidden from people, filled by bots. Not the "company" field,
          which is a genuine question on this form. */}
      <div className="hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label className={label} htmlFor="name">
          Name <span className="text-sky">*</span>
        </label>
        <input
          id="name"
          name="name"
          required
          maxLength={120}
          autoComplete="name"
          className={field}
          placeholder="Your name"
        />
      </div>

      <div>
        <label className={label} htmlFor="phone">
          Number <span className="text-sky">*</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          maxLength={40}
          autoComplete="tel"
          className={field}
          placeholder="Best contact number"
        />
      </div>

      <div>
        <label className={label} htmlFor="email">
          Email address <span className="text-sky">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={160}
          autoComplete="email"
          className={field}
          placeholder="you@company.com.au"
        />
      </div>

      <div>
        <label className={label} htmlFor="company">
          Company
        </label>
        <input
          id="company"
          name="company"
          maxLength={160}
          autoComplete="organization"
          className={field}
          placeholder="Company name"
        />
      </div>

      <div className="sm:col-span-2">
        <label className={label} htmlFor="postcode">
          Job location (postcode)
        </label>
        <input
          id="postcode"
          name="postcode"
          maxLength={20}
          inputMode="numeric"
          className={field}
          placeholder="e.g. 2600"
        />
      </div>

      <div className="sm:col-span-2">
        <label className={label} htmlFor="message">
          Message <span className="text-sky">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={5000}
          className={field}
          placeholder="Tell us about your site, the hoarding you need and your timeframes."
        />
      </div>

      {status === "error" && (
        <p role="alert" className="sm:col-span-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="sm:col-span-2 flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded bg-navy px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-navy-deep disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send enquiry"}
        </button>
        <p className="text-xs text-muted">
          Fields marked <span className="text-sky">*</span> are required.
        </p>
      </div>
    </form>
  );
}
