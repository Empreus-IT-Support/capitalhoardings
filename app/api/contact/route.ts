import { NextResponse } from "next/server";
import { site } from "@/lib/site";

/**
 * Contact form delivery goes through Atlas (Empreus's platform), not Resend.
 * The per-client Atlas key is minted under
 * Clients > client > Documentation > API > Atlas, and is scoped to one sending
 * domain plus a fixed recipient allowlist — a leaked key can't mail anywhere
 * else. Atlas rejects anything outside that scope with a 403.
 */
const ATLAS_ENDPOINT =
  process.env.ATLAS_ENDPOINT || "https://atlascontrol.io/api/email/send";

/** Named ATLAS_API_KEY in Vercel; Atlas's own docs suggest ATLAS_EMAIL_KEY. */
const ATLAS_KEY = () => process.env.ATLAS_API_KEY || process.env.ATLAS_EMAIL_KEY;

/**
 * Must be one of the addresses Atlas authorises for this key
 * (DoNotReply@ or web@capitalhoardings.com.au) and a bare address — Atlas
 * compares it exactly, so a "Name <addr>" form is rejected with a 403.
 * The visitor's own address NEVER goes here: we aren't authorised to send as
 * their domain, so it would fail DMARC and be binned. It goes in reply_to.
 */
const FROM = process.env.CONTACT_FROM || "DoNotReply@capitalhoardings.com.au";

/** Must be on the key's allowlist in Atlas, or Atlas returns 403. */
const TO = (process.env.CONTACT_TO || site.email)
  .split(",")
  .map((a) => a.trim())
  .filter(Boolean);

const isProd = process.env.NODE_ENV === "production";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[0-9+()\-.\s]{6,40}$/;
const POSTCODE_RE = /^[0-9]{4}$/;

/** Longest body we'll even parse — the form's own caps are far below this. */
const MAX_BODY_BYTES = 32 * 1024;

const cap = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);

/** Header injection guard: a newline in a header field can forge extra headers. */
const singleLine = (v: string) => v.replace(/[\r\n]+/g, " ").trim();

// ---- Basic in-memory rate limit (best-effort per warm instance) ----
// Good enough for a marketing form. On serverless each instance keeps its own
// counter, so back it with Upstash/Vercel KV if abuse becomes a real problem.
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

// ---- Cloudflare Turnstile (only enforced once configured) ----
async function turnstileOk(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured — skip verification
  if (!token) return false;
  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret, response: token, remoteip: ip }),
      }
    );
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

const bad = (error: string, status = 400) =>
  NextResponse.json({ ok: false, error }, { status });

/**
 * Atlas's documented failures. 401/403/503 are our misconfiguration, not the
 * visitor's problem, so they all surface the same "email us instead" message
 * while the detail goes to the server log.
 */
function atlasFailure(status: number, detail: string) {
  console.error(`[contact] Atlas send failed ${status}: ${detail}`);
  if (status === 429) {
    return bad("Too many enquiries just now. Please try again shortly.", 429);
  }
  return bad("We couldn't send that just now. Please email us directly.", 502);
}

export async function POST(request: Request) {
  try {
    const ip = singleLine(
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
        request.headers.get("x-real-ip") ||
        "unknown"
    ).slice(0, 64);

    // Reject anything that isn't the JSON our own form sends. Blocks trivial
    // cross-site form posts, which can't set a custom content type.
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("application/json")) {
      return bad("Unsupported content type", 415);
    }

    const declared = Number(request.headers.get("content-length") || 0);
    if (declared > MAX_BODY_BYTES) return bad("Payload too large", 413);

    if (rateLimited(ip)) {
      return bad("Too many requests. Please try again shortly.", 429);
    }

    // content-length can lie or be absent, so cap the text we actually read.
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) return bad("Payload too large", 413);

    let body: Record<string, unknown>;
    try {
      body = JSON.parse(raw);
    } catch {
      return bad("Invalid request");
    }
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return bad("Invalid request");
    }

    // Honeypot: real users never fill this hidden field. Silently accept + drop.
    if (cap(body.website, 1)) {
      return NextResponse.json({ ok: true, delivered: false });
    }

    const name = singleLine(cap(body.name, 120));
    const phone = singleLine(cap(body.phone, 40));
    const email = singleLine(cap(body.email, 160));
    const company = singleLine(cap(body.company, 160));
    const postcode = singleLine(cap(body.postcode, 10));
    const message = cap(body.message, 5000);

    if (!name || !phone || !email || !message) {
      return bad("Please complete all required fields.");
    }
    if (!EMAIL_RE.test(email)) return bad("Please enter a valid email address.");
    if (!PHONE_RE.test(phone)) return bad("Please enter a valid contact number.");
    if (postcode && !POSTCODE_RE.test(postcode)) {
      return bad("Please enter a valid 4-digit postcode.");
    }

    if (!(await turnstileOk(String(body["cf-turnstile-response"] ?? ""), ip))) {
      return bad("Verification failed. Please try again.");
    }

    const key = ATLAS_KEY();

    // No key configured yet — succeed so the form is testable. Log only in dev:
    // enquiries carry personal details and shouldn't sit in production logs.
    if (!key) {
      if (!isProd) {
        console.log("[contact] (no Atlas key configured) submission:", {
          name,
          phone,
          email,
          company,
          postcode,
        });
      } else {
        console.warn("[contact] no ATLAS_API_KEY — enquiry not delivered");
      }
      return NextResponse.json({ ok: true, delivered: false });
    }

    const text = [
      `Name: ${name}`,
      `Number: ${phone}`,
      `Email: ${email}`,
      `Company: ${company || "—"}`,
      `Job location (postcode): ${postcode || "—"}`,
      "",
      message,
    ].join("\n");

    let res: Response;
    try {
      res = await fetch(ATLAS_ENDPOINT, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: FROM,
          to: TO,
          reply_to: email,
          subject: `Website enquiry from ${name}${company ? ` — ${company}` : ""}`,
          text,
        }),
      });
    } catch (err) {
      console.error("[contact] Atlas unreachable:", err);
      return bad(
        "We couldn't send that just now. Please email us directly.",
        502
      );
    }

    if (!res.ok) {
      return atlasFailure(res.status, await res.text().catch(() => ""));
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch {
    return bad("Invalid request");
  }
}

/** Only POST is meaningful here; anything else gets a clean 405. */
export function GET() {
  return NextResponse.json({ ok: false, error: "Method not allowed" }, {
    status: 405,
    headers: { Allow: "POST" },
  });
}
