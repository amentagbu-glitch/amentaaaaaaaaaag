# Sync Studio website (beta)

Marketing site for Sync Studio, Agadir. Next.js 15 (App Router) + TypeScript + Tailwind CSS 4 + next-intl.
Languages: French (default, at `/`), English (`/en`), Arabic (`/ar`, full right-to-left).

## Run it

```bash
cd sync-studio
npm install
cp .env.example .env.local   # fill in values
npm run dev                  # http://localhost:3000
```

Production check: `npm run build && npm start`.

## Deploy (Vercel)

1. Import the repo on vercel.com and set **Root Directory** to `sync-studio`.
2. Add the environment variables below in Project Settings → Environment Variables.
3. Deploy, then point `syncstudio.ma` to the project (Settings → Domains).

## Environment variables

| Name | Needed | What it does |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | yes | Final domain, e.g. `https://syncstudio.ma` (SEO, sitemap, OG) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | yes | Digits only, e.g. `2126XXXXXXXX` (floating button, CTAs) |
| `RESEND_API_KEY` | yes for email | From resend.com. Without it, form submissions are only logged |
| `CONTACT_TO_EMAIL` | optional | Where requests go. Default `hello@syncstudio.ma` |
| `CONTACT_FROM_EMAIL` | optional | Sender, must be a domain verified in Resend |
| `NEXT_PUBLIC_ANALYTICS_SRC` / `_DOMAIN` | optional | Privacy-friendly analytics script (e.g. Plausible). Off when empty |

## Where things live

- `messages/fr.json`, `en.json`, `ar.json`: all copy
- `lib/site.ts`: contact details, socials, feature flags (logo files, testimonials)
- `app/[locale]/…`: pages (home, services, work, about, contact)
- `app/actions/audit.ts`: audit form (validation, honeypot + timing spam check, email + auto-reply)
- `components/`: header, footer, hero mockups, bento visuals, chat mock, form, etc.
- `public/globe.js`: the dotted globe on the home page (map data from Natural Earth via world-atlas)
- `public/fx.js`: small effects (Agadir clock, card spotlight, 3D tilt, scroll progress, timeline fill). All respect reduced-motion settings

## Placeholders to replace

- [ ] **Logo files** → `public/brand/` (see `public/brand/README.md`), then `hasLogoFiles: true` in `lib/site.ts`. Until then a dashed "Sync Studio" text placeholder shows.
- [ ] **WhatsApp number** → `NEXT_PUBLIC_WHATSAPP_NUMBER` (links currently go to a dummy number)
- [ ] **Social links** → `site.socials` in `lib/site.ts` (all `#`)
- [ ] **Case studies** → `work.cases` in the 3 message files (marked "Example", results are `[real result]`), plus visuals
- [ ] **Founder** → `aboutPage.founderName` (`[name]`) and photo (`[photo]` box on About page)
- [ ] **Testimonials** → section is built but hidden; add real video quotes and set `showTestimonials: true`
- [ ] **Favicon** → comes from `public/brand/icon-circle.svg` once logo files are added
- [ ] **Domain** → `NEXT_PUBLIC_SITE_URL`
- [ ] **Resend** account + verified sending domain → `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`
- [ ] **Arabic copy** → have a native speaker review `messages/ar.json`; the Darija chat example is in `components/ChatMock.tsx`
- [ ] **Offer details** → features listed in each plan are a first draft; adjust to what you sell
