# RunRateHost

Static React front-end that compares AWS, Google Cloud, Azure, Oracle and IBM Cloud free tiers and estimates monthly hosting cost, so startups can plan their runway.

Stack: Vite · React 18 · TypeScript · Tailwind + shadcn/ui · framer-motion (LazyMotion) · react-router · react-helmet-async.

## Develop

```sh
npm install
npm run dev        # http://localhost:8080
npm run lint
npm test
npm run build      # outputs ./dist (static files)
npm run preview
```

`predev` / `prebuild` regenerate `public/sitemap.xml` and `public/robots.txt`.

## Configuration (build-time environment variables)

| Variable | Purpose |
| --- | --- |
| `VITE_SITE_URL` | Public origin for canonical/hreflang tags, sitemap and robots (e.g. `https://runratehost.com`). |
| `VITE_GUIDE_SIGNUP_URL` | Endpoint the credits-guide email form POSTs `{ email, source }` to. If unset the form is disabled. |

Example: `VITE_SITE_URL=https://runratehost.com npm run build`

## Performance notes

- One static page background (`.app-bg`); no `backdrop-filter` on cards (only the fixed nav blurs).
- Below-the-fold sections are separate chunks, mounted shortly before they scroll into view (`LazyMount`).
- `LazyMotion` + `m.*` components; `prefers-reduced-motion` is honoured globally.
- Inter is self-hosted (`@fontsource-variable/inter`); Google Translate loads only on translated URLs (`/de`, `/fr`, ...), after idle.

## Deploy

See [DEPLOY.md](./DEPLOY.md) for the Ubuntu / Nginx / AWS steps.
