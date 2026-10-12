# Hindu Wedding Template — standalone development app

This is a **standalone Next.js project** for developing the Hindu wedding template independently before moving its template code into `wyvernstack-events`.

## Requirements

- Node.js 20.9 or newer
- npm

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Quality checks

```bash
npm run typecheck
npm run lint
npm run build
```

The first development/build run may need network access to download the Google Fonts used by `next/font/google`.

## Current scope

- A configurable Save the Date screen.
- An Open Invitation button that reveals the main wedding content.
- A dedicated `WeddingContent` composition component where later sections can be added.
- A typed Zod 4 configuration, sample config, theme tokens, responsive styling, and reduced-motion support.

The sample couple and event details are placeholders; update `configs/weddings/saanjh-and-arya.ts`.

## Folder layout

```text
app/
  globals.css
  layout.tsx
  page.tsx
configs/
  weddings/
    saanjh-and-arya.ts
templates/
  template4/
    components/
    styles/
    Template.tsx
    schema.ts
    defaults.ts
```

## Deploy on Cloudflare

This app is a **static** Next.js export (`output: "export"`). Do not use the Cloudflare “Next.js (OpenNext)” Workers preset with Next 16.4 — it crashes with `Unexpected loadManifest(/.next/server/preview-props.json)`.

**Workers (static assets, matches `wrangler.toml`):**

1. Build command: `npm run build`
2. Deploy command: `npx wrangler deploy`
3. Output is the `out/` folder (served via `[assets]` in `wrangler.toml`).

**Cloudflare Pages (alternative):**

1. Framework preset: None (or static)
2. Build command: `npm run build`
3. Build output directory: `out`

## Later migration to `wyvernstack-events`

Do not copy this standalone app's `app/`, `package.json`, `next.config.ts`, or global layout into the monorepo as-is.

When the design is complete, migrate only the template-specific code and config, then connect them to the monorepo's existing wedding registry and type-safe template resolver. Preserve the host app's shared routes, dependencies, `basePath: "/events"` strategy, trailing-slash behavior, and deployment configuration. The standalone `/` route is only for local development.
