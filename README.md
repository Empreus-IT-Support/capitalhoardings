# Capital Hoardings

Website for Capital Hoardings — specialist hoarding construction for the ACT and
Southern NSW. Target domain: **www.capitalhoardings.com.au**.

Next.js 16 (App Router) · TypeScript · Tailwind v4 · Resend for the contact form.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Where the content came from

Every word of copy is taken from the client's brief deck
(`Capital Hoardings - Website .pptx`). The deck's five sections map to five routes:

| Deck slide | Route |
| --- | --- |
| 1 — Why Capital Hoardings / Get Your Project Secured | `/` |
| 2–3 — About | `/about` |
| 4 — Services (Internal / External / Branded) | `/services` |
| 5–7 — TITAN Hoarding System | `/system` |
| 8 — Contact + form | `/contact` |

Copy lives in `lib/site.ts` where it is reused across pages; longer prose sits in
the page files.

## Brand

Colours are sampled from the supplied logo artwork and defined once in
`app/globals.css`:

| Token | Hex | Use |
| --- | --- | --- |
| `navy` | `#11427A` | primary — buttons, headings, nav |
| `navy-ink` | `#071F3A` | dark sections, footer, hero |
| `sky` | `#62B6E4` | accent — eyebrows, links, CTA |
| `sky-soft` | `#E8F3FB` | tints |

Logo files in `public/images/` are derived from the client's JPEG with the white
ground knocked out, so they sit cleanly on both white and navy. If the client can
supply vector artwork (`.ai`, `.eps` or `.svg`), swap it in — it will render
sharper at large sizes.

## Outstanding — needs the client

These are the gaps in the brief, all marked in the deck as "to be provided":

1. **Photography.** Every image position renders a `<PhotoSlot>` placeholder
   describing the shot required. Replace each with `next/image` once photos land.
2. **Phone number.** The deck says "P: TBC". `lib/site.ts` has `phone: null`,
   which hides phone links site-wide and shows "TBC". Set `phone` and
   `phoneDisplay` when confirmed.
3. **Physical address / ABN** — not supplied; add to the footer and the JSON-LD
   in `app/layout.tsx` when available (helps local SEO).
4. **TITAN brand approval.** The system pages name the TITAN Hoarding System and
   quote its specifications from the brief. Worth confirming the supplier is
   happy with the wording and can provide product imagery.

## Contact form

`POST /api/contact` → Resend. Fields match the brief exactly: name, number,
email address, company, job location (postcode), message.

Protection: required-field and email validation, a hidden honeypot (`website` —
note `company` is a real field here), and a per-IP rate limit of 5 requests per
10 minutes.

Without `RESEND_API_KEY` the form still succeeds and logs the submission to the
server console, so it is testable before mail is configured. Copy `.env.example`
to `.env.local` and fill in:

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key |
| `CONTACT_FROM` | verified sender on capitalhoardings.com.au |
| `CONTACT_TO` | where enquiries go (defaults to `office@capitalhoardings.com.au`) |

## Email addresses

The client asked for `accounts@capitalhoardings.com.au` and
`office@capitalhoardings.com.au`. Those are mailbox/DNS jobs, not site code —
both are already referenced in the footer and on `/contact`.

## Deployment

Vercel, same as the other builds. Add the env vars above, attach
`capitalhoardings.com.au` plus the `www` variant, and verify the domain in Resend
so the form sends from the client's own domain.
