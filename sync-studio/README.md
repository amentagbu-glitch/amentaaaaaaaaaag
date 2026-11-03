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

## Deploy (Netlify)

Netlify's free plan allows business sites. Settings come from `netlify.toml` at the repo root, so nothing needs typing in the build settings.

1. Sign up at netlify.com with GitHub.
2. **Add new project → Import an existing project → GitHub**, pick `amentagbu-glitch/amentaaaaaaaaaag`.
3. **Branch to deploy:** `main`. Build settings fill in from `netlify.toml`.
4. Add the environment variables below (at least `NEXT_PUBLIC_WHATSAPP_NUMBER`), then **Deploy**.
5. Optional: **Project configuration → Change project name** to get `syncstudio.netlify.app`.
6. Once you own `syncstudio.ma`: **Domain management → Add a domain**, follow the DNS steps, then set `NEXT_PUBLIC_SITE_URL=https://syncstudio.ma` and redeploy. HTTPS is automatic.

Changing an environment variable needs a new deploy (**Deploys → Trigger deploy**) to take effect.

## Environment variables

| Name | Needed | What it does |
|---|---|---|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | yes | Digits only, e.g. `2126XXXXXXXX` (floating button, CTAs). Without it, WhatsApp links go to a dummy number |
| `RESEND_API_KEY` | yes for email | From resend.com. Without it, form requests are only written to the function logs |
| `CONTACT_TO_EMAIL` | yes for email | Where requests go. Before the domain is verified in Resend, use the email you signed up to Resend with |
| `CONTACT_FROM_EMAIL` | yes for email | Sender. Before the domain is verified: `Sync Studio <onboarding@resend.dev>`. After: `Sync Studio <hello@syncstudio.ma>` |
| `NEXT_PUBLIC_SITE_URL` | after domain | Final domain, e.g. `https://syncstudio.ma`. Empty = Netlify address |
| `NEXT_PUBLIC_ANALYTICS_SRC` / `_DOMAIN` | optional | Privacy-friendly analytics script (e.g. Plausible). Off when empty |

Note: until your domain is verified in Resend, the customer auto-reply can't be delivered (Resend's test sender only reaches your own address). You still receive every request.

## Where things live

- `messages/fr.json`, `en.json`, `ar.json`: all copy
- `lib/site.ts`: contact details, socials, feature flags (logo files, testimonials)
- `app/[locale]/…`: pages (home, services, work, about, contact)
- `app/actions/audit.ts`: audit form (validation, honeypot + timing spam check, email + auto-reply)
- `components/`: header, footer, hero mockups, bento visuals, chat mock, form, etc.
- `public/globe.js`: the dotted globe on the home page (map data from Natural Earth via world-atlas)
- Light / dark mode: colours in `app/globals.css` (`html[data-theme="light"]`), switch button in `components/ThemeToggle.tsx`. The site follows the visitor's phone/computer setting; the switch overrides it and that choice is remembered
- `public/fx.js`: small effects (also handles the light/dark switch) (Agadir clock, card spotlight, 3D tilt, scroll progress, timeline fill). All respect reduced-motion settings

## Placeholders to replace

- [x] **Logo files** → done (`public/brand/`, originals in `brand/originals/`)
- [ ] **WhatsApp number** → `NEXT_PUBLIC_WHATSAPP_NUMBER` (links currently go to a dummy number)
- [ ] **Social links** → `site.socials` in `lib/site.ts` (all `#`)
- [ ] **Case studies** → `work.cases` in the 3 message files (marked "Example", results are `[real result]`), plus visuals
- [ ] **Founder** → `aboutPage.founderName` (`[name]`) and photo (`[photo]` box on About page)
- [ ] **Testimonials** → section is built but hidden; add real video quotes and set `showTestimonials: true`
- [x] **Favicon** → done
- [ ] **Domain** → `NEXT_PUBLIC_SITE_URL`
- [ ] **Resend** account + verified sending domain → `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`
- [ ] **Arabic copy** → have a native speaker review `messages/ar.json`; the Darija chat example is in `components/ChatMock.tsx`
- [ ] **Offer details** → features listed in each plan are a first draft; adjust to what you sell
