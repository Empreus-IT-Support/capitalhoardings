"use client";

import { useRef, useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";
type Field = "name" | "phone" | "email" | "company" | "postcode" | "message";
type Errors = Partial<Record<Field, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[0-9+()\-.\s]{6,40}$/;
const POSTCODE_RE = /^[0-9]{4}$/;

/** Mirrors the server's rules so people get told before a round trip. */
function validate(values: Record<Field, string>): Errors {
  const e: Errors = {};
  if (!values.name) e.name = "Please tell us your name.";
  if (!values.phone) e.phone = "Please give us a contact number.";
  else if (!PHONE_RE.test(values.phone))
    e.phone = "That doesn't look like a phone number.";
  if (!values.email) e.email = "Please give us an email address.";
  else if (!EMAIL_RE.test(values.email))
    e.email = "That doesn't look like an email address.";
  if (values.postcode && !POSTCODE_RE.test(values.postcode))
    e.postcode = "Australian postcodes are 4 digits.";
  if (!values.message) e.message = "Please tell us about your project.";
  return e;
}

const fieldBase =
  "mt-2 w-full rounded border bg-white px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted/60 focus:outline-none";
const labelBase =
  "block text-xs font-semibold uppercase tracking-[0.16em] text-navy";

/**
 * Named FieldError rather than Error: a local `Error` would shadow the global
 * constructor used in the submit handler. Defined at module scope so it is not
 * recreated on every render.
 */
function FieldError({ id, message }: { id: Field; message?: string }) {
  if (!message) return null;
  return (
    <p id={`${id}-error`} className="mt-2 text-xs text-red-700">
      {message}
    </p>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  function fieldProps(name: Field) {
    const invalid = Boolean(errors[name]);
    return {
      id: name,
      name,
      "aria-invalid": invalid || undefined,
      "aria-describedby": invalid ? `${name}-error` : undefined,
      className: `${fieldBase} ${
        invalid ? "border-red-600 focus:border-red-700" : "border-line focus:border-navy"
      }`,
    };
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(
      new FormData(form).entries()
    ) as unknown as Record<Field, string> & { website?: string };

    const values: Record<Field, string> = {
      name: (data.name ?? "").trim(),
      phone: (data.phone ?? "").trim(),
      email: (data.email ?? "").trim(),
      company: (data.company ?? "").trim(),
      postcode: (data.postcode ?? "").trim(),
      message: (data.message ?? "").trim(),
    };

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setFormError("");
      setStatus("idle");
      // Send focus to the first problem so keyboard and screen-reader users
      // land on it rather than hunting down the form.
      const first = Object.keys(found)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("sending");
    setFormError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: data.website ?? "" }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong.");
      form.reset();
      setStatus("sent");
      // Move focus to the confirmation so it's announced.
      window.setTimeout(() => successRef.current?.focus(), 50);
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Something went wrong."
      );
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="rounded border border-line bg-sky-soft p-8 focus:outline-none"
      >
        <h3 className="text-xl">Thanks — we&apos;ve got your enquiry.</h3>
        <p className="mt-3 text-sm text-muted">
          A member of the Capital Hoardings team will be in touch shortly to
          discuss your hoarding requirements.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setErrors({});
          }}
          className="mt-6 text-sm font-semibold uppercase tracking-wider text-navy underline underline-offset-4"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      aria-busy={status === "sending"}
      className="grid gap-5 sm:grid-cols-2"
    >
      {/* Honeypot — hidden from people, filled by bots. Not the "company" field,
          which is a genuine question on this form. */}
      <div className="hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label className={labelBase} htmlFor="name">
          Name <span className="text-sky">*</span>
        </label>
        <input
          {...fieldProps("name")}
          maxLength={120}
          autoComplete="name"
          placeholder="Your name"
        />
        <FieldError id="name" message={errors.name} />
      </div>

      <div>
        <label className={labelBase} htmlFor="phone">
          Number <span className="text-sky">*</span>
        </label>
        <input
          {...fieldProps("phone")}
          type="tel"
          maxLength={40}
          autoComplete="tel"
          placeholder="Best contact number"
        />
        <FieldError id="phone" message={errors.phone} />
      </div>

      <div>
        <label className={labelBase} htmlFor="email">
          Email address <span className="text-sky">*</span>
        </label>
        <input
          {...fieldProps("email")}
          type="email"
          maxLength={160}
          autoComplete="email"
          placeholder="you@company.com.au"
        />
        <FieldError id="email" message={errors.email} />
      </div>

      <div>
        <label className={labelBase} htmlFor="company">
          Company
        </label>
        <input
          {...fieldProps("company")}
          maxLength={160}
          autoComplete="organization"
          placeholder="Company name"
        />
        <FieldError id="company" message={errors.company} />
      </div>

      <div className="sm:col-span-2">
        <label className={labelBase} htmlFor="postcode">
          Job location (postcode)
        </label>
        <input
          {...fieldProps("postcode")}
          maxLength={4}
          inputMode="numeric"
          autoComplete="postal-code"
          placeholder="e.g. 2600"
        />
        <FieldError id="postcode" message={errors.postcode} />
      </div>

      <div className="sm:col-span-2">
        <label className={labelBase} htmlFor="message">
          Message <span className="text-sky">*</span>
        </label>
        <textarea
          {...fieldProps("message")}
          rows={6}
          maxLength={5000}
          placeholder="Tell us about your site, the hoarding you need and your timeframes."
        />
        <FieldError id="message" message={errors.message} />
      </div>

      {formError && (
        <p
          role="alert"
          className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 sm:col-span-2"
        >
          {formError} You can also email us at{" "}
          <a
            href="mailto:office@capitalhoardings.com.au"
            className="underline underline-offset-2"
          >
            office@capitalhoardings.com.au
          </a>
          .
        </p>
      )}

      <div className="flex flex-wrap items-center gap-5 sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-shine rounded bg-navy px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-navy-deep disabled:cursor-not-allowed disabled:opacity-60"
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
