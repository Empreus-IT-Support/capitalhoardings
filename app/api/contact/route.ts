import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site";

const TO = process.env.CONTACT_TO || site.email;
// Use a Resend-verified sender on capitalhoardings.com.au for production;
// onboarding@resend.dev works for testing before the domain is verified.
const FROM =
  process.env.CONTACT_FROM || "Capital Hoardings Website <onboarding@resend.dev>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const cap = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);

// ---- Basic in-memory rate limit (best-effort per warm instance) ----
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQ = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  }
  return recent.length > MAX_REQ;
}

export async function POST(request: Request) {
  try {
    const ip = (
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown"
    ).trim();

    if (rateLimited(ip)) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please try again shortly." },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
    }

    // Honeypot: real users never fill this hidden field. Silently accept + drop.
    if (cap(body.website, 1)) {
      return NextResponse.json({ ok: true, delivered: false });
    }

    const name = cap(body.name, 120);
    const phone = cap(body.phone, 40);
    const email = cap(body.email, 160);
    const company = cap(body.company, 160);
    const postcode = cap(body.postcode, 20);
    const message = cap(body.message, 5000);

    if (!name || !phone || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Please complete all required fields." },
        { status: 400 }
      );
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;

    // No key configured yet — log and succeed so the form works in dev.
    if (!apiKey) {
      console.log("[contact] (no RESEND_API_KEY) submission:", {
        name,
        phone,
        email,
        company,
        postcode,
      });
      return NextResponse.json({ ok: true, delivered: false });
    }

    const lines = [
      `Name: ${name}`,
      `Number: ${phone}`,
      `Email: ${email}`,
      `Company: ${company || "—"}`,
      `Job location (postcode): ${postcode || "—"}`,
      "",
      message,
    ].join("\n");

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `Website enquiry from ${name}${company ? ` — ${company}` : ""}`,
      text: lines,
    });

    if (error) {
      console.error("[contact] resend error:", error);
      return NextResponse.json(
        { ok: false, error: "We couldn't send that just now. Please email us directly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}
