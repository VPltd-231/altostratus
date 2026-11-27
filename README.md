# RunRateHost

Static React front-end that compares AWS, Google Cloud, Azure, Oracle and IBM Cloud free tiers and estimates monthly hosting cost, so startups can plan their runway.

Stack: Vite · React 18 · TypeScript · Tailwind + shadcn/ui · framer-motion (LazyMotion) · react-router · react-helmet-async.

## Develop

```sh
npm install
npm run dev        # http://localhost:8080
npm run lint
npm test
npm run build      # vite build + prerender → ./dist (one HTML file per URL)
npm run preview
```

`predev` / `prebuild` regenerate `public/sitemap.xml` and `public/robots.txt`.

## Configuration (build-time environment variables)

| Variable | Purpose |
| --- | --- |
| `VITE_SITE_URL` | Public origin for canonical/hreflang tags, sitemap and robots (e.g. `https://runratehost.com`). |
| `VITE_OG_IMAGE` | Absolute URL of the 1200×630 social preview. Defaults to `/og-image.png`. |
| `BUILD_DATE` | `YYYY-MM-DD` used for sitemap `lastmod` and schema `dateModified`. Defaults to today. |
| `VITE_GUIDE_SIGNUP_URL` | Endpoint the credits-guide email form POSTs `{ email, source }` to. If unset the form is disabled. |

Example: `VITE_SITE_URL=https://runratehost.com npm run build`

## Performance notes

- One static page background (`.app-bg`); no `backdrop-filter` on cards (only the fixed nav blurs).
- Below-the-fold sections are separate chunks, mounted shortly before they scroll into view (`LazyMount`).
- `LazyMotion` + `m.*` components; `prefers-reduced-motion` is honoured globally.
- Inter is self-hosted (`@fontsource-variable/inter`); Google Translate loads only on translated URLs (`/de`, `/fr`, ...), after idle.

## SEO: prerendering and structured data

`npm run build` runs `scripts/prerender.ts` after Vite. It writes a static HTML file for every URL (13 languages × home + 5 provider pages = 78 files, plus `404.html`), each with:

- its own `<title>`, meta description, canonical, `hreflang` alternates, Open Graph and Twitter tags (from `src/lib/seo.ts`, the same module `SeoHead` uses, so Helmet adopts the tags instead of duplicating them);
- a full HTML snapshot of the page, rendered from the same data modules as the React components (`src/data/*`), so crawlers that don't run JavaScript see the real content. React replaces it in one commit once ready (`startTransition` in `main.tsx`);
- one connected JSON-LD `@graph` (`scripts/prerender/schema.ts`):

| Page | Schema types |
| --- | --- |
| All | `Organization` (with logo), `WebSite` |
| Home | `CollectionPage`, `ItemList` of providers, `WebApplication` (pricing calculator), provider `Organization`s |
| Provider | `WebPage`/`ItemPage`, `BreadcrumbList`, provider `Organization` (with `sameAs`), `Service` + `Offer` + `OfferCatalog` (free tier), `HowTo` (sign-up steps), `Review` (engineer's take, with `positiveNotes`/`negativeNotes`) |

Not used on purpose: `FAQPage` (no visible Q&A), ratings (none published) and `SearchAction` (no site search). Structured data must match visible content.

Text assets are pre-compressed to `.br` and `.gz`. Nginx serves them via `gzip_static`/`brotli_static` (see `deploy/nginx.conf`).

## Deploy

See [DEPLOY.md](./DEPLOY.md) for the Ubuntu / Nginx / AWS steps.
