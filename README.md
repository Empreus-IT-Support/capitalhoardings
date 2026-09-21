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

## Design

The site leans on one content-informed motif: **the hoarding panel**. Hoarding is
modular panels bolted edge to edge, so the design repeats seams, hazard
diagonals and hard panel edges rather than generic rounded cards.

- `.stripe-rule` — hazard diagonal, used as a section divider under the header
  and above the footer.
- `.panel-seams` — faint vertical seams over dark sections, echoing panel joins.
- `.hazard-wash` — diagonal texture on navy panels.
- Grids are built from `gap-px` over a `bg-line` parent, so cards butt together
  with a hairline seam instead of floating apart.
- Corners are square throughout. No rounded cards, no drop-shadow "floating" UI.

Type is Barlow Condensed (display) over Inter (body) — condensed headlines carry
the industrial tone and let the fluid `.text-display` scale run to 96px without
wrapping awkwardly.

Beyond the deck, the site adds a capability marquee, a spec/stat band drawn from
the TITAN figures, and a five-step **Assess → Configure → Install → Adapt →
Remove** process section. The brief describes that sequence in prose ("from site
setup and installation through to removal") but never lays it out.

## Motion

Scroll and hover motion is deliberate but cheap — no animation library, just
IntersectionObserver plus CSS transitions.

| Piece | What it does |
| --- | --- |
| `Reveal` | fades content in on scroll, from any of five directions, with a stagger delay |
| `WordReveal` | headlines fade in word by word |
| `CharReveal` | stat and spec values assemble character by character |
| `ScrollProgress` | sky rule across the top tracking page progress |
| `Marquee` | capability strip, forwards or `reverse`, pauses on hover |
| `Process` | connector rule draws across the row, then the steps arrive in sequence |
| `ServiceCard` | image zoom, gradient deepen, sky rule extend, summary opens (grid-rows 0fr→1fr) |
| CSS | `.btn-shine` sweep, `.nav-underline`, `.icon-tile` tilt, `.hazard-wash-drift`, `.diamond` pulse |

Two rules worth keeping if you extend this:

1. **Every reveal has a 1200ms fallback timer.** If IntersectionObserver never
   fires the content would stay invisible for good — some embedded browsers and
   headless renderers never report intersection. The timer guarantees it
   appears. `<noscript>` styles cover the no-JS case as well.
2. **Don't put `transform` or `will-change: transform` on layers stacked over the
   heroes.** Promoting them to their own compositing layer makes them paint over
   the copy on top. That is why `WordReveal` animates opacity only, and why
   there is no hero parallax.

Everything is disabled under `prefers-reduced-motion: reduce`.

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

## Photography — placeholders, must be replaced

The brief marks every image "to be provided", so the site currently runs on
**stock placeholders** from [Unsplash](https://unsplash.com/license) (free for
commercial use, no attribution required). They are real construction and
hoarding photos chosen to sit on the navy palette, so the client can judge the
layout — but they are **not Capital Hoardings jobs** and must not go live as if
they were.

They live in `public/images/` and every one is rendered through
`components/Photo.tsx`, which carries a `note` prop recording the shot the
client should supply:

| File | Used on | Replace with |
| --- | --- | --- |
| `hero.jpg` | home hero | Capital Hoardings hoarding on a live site |
| `service-internal.jpg` | home, /services | an internal fit-out installation |
| `service-external.jpg` | home, /services, /services hero | external site hoarding |
| `service-branded.jpg` | home, /services, /system | branded/printed hoarding |
| `about-team.jpg` | /about | the Capital Hoardings crew |
| `about-install.jpg` | /about, /about hero | installation in progress |
| `system-panels.jpg` | /system | TITAN panel detail |
| `system-apps.jpg` | home, /system hero | a TITAN installation |
| `cta-site.jpg` | CTA band (all pages) | a signature completed project |
| `contact-site.jpg` | /contact hero | any strong site shot |
| `project-01…03.jpg` | /about gallery, /contact | three completed projects |

Swapping one is a single-line change — drop the new file in at the same name, or
point the `src` at a new one.

## Outstanding — needs the client

1. **Photography.** See above — placeholders are in place, real photos needed.
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
