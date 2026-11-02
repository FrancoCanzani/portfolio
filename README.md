# Franco Canzani — Portfolio

A bilingual (Spanish / English) personal site for Franco Canzani, Transport Manager. Next.js and Tailwind, styled as one quiet column of text.

## Run locally

```bash
pnpm install
pnpm dev --port 4317
```

Open http://localhost:4317. The root redirects to `/es` or `/en` based on the browser language (Spanish by default).

## Editing content

All copy lives in `src/content/`:

- `es.ts` — Spanish
- `en.ts` — English

Both files share the shape defined in `src/content/types.ts`, so a missing field in either language is a type error.
