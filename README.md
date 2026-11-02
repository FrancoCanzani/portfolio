# Franco Canzani — Portfolio

Bilingual (Spanish / English) one-page portfolio for Franco Canzani, Account & Logistics Manager in international road freight. Built with Next.js 16, React 19 and Tailwind CSS 4.

## Run locally

```bash
pnpm install
pnpm dev --port 4317
```

Open http://localhost:4317. The root redirects to `/es` or `/en` based on the browser language (Spanish by default). Both locales are prerendered as static pages at build time (`pnpm build`).

## Editing content

All copy lives in `src/content/`:

- `es.ts` / `en.ts` — every string on the page, per language. Both share the shape in `types.ts`, so a field missing in either language is a type error.
- `clients.ts` — the logo strip under the intro. Logo files live in `public/logos/`.

In the intro, wrap words in `**double asterisks**` to render them in bold.

## Structure

- `src/app/[lang]/page.tsx` — the page: intro, client logos, experience timeline, education, certifications, languages and contact.
- `src/components/header/` — sticky header with the scroll-progress truck and the flag language switch.
- `src/components/figures/` — the three animated isometric scenes on the experience timeline (`route` for RLC, `port` for Sklum, `loading` for Wheels). Each scene has `geometry` (shapes), `model` (animation timeline), `art` (static SVG) and `live` (the client component that animates it).
- `src/components/iso/` — the small isometric drawing kit the scenes are built on.
- `src/components/contact/email-link.tsx` — assembles the email address in the browser so it never appears in the HTML that scrapers read.
