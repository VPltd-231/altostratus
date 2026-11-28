// Runs before `vite dev` and `vite build` (predev/prebuild hooks); writes public/sitemap.xml and public/robots.txt.
// Set VITE_SITE_URL in the environment to generate URLs for your own domain.
//
// URLs come from src/lib/seo.ts, the same module that writes canonical and
// hreflang tags, so the sitemap, the <head> tags and the prerendered files
// always agree (no trailing-slash or host mismatches).

import { writeFileSync } from "fs"
import { resolve } from "path"
import { languages, SITE_URL } from "../src/lib/languages"
import { ALL_ROUTES, absoluteUrl } from "../src/lib/seo"

const LASTMOD = process.env.BUILD_DATE || new Date().toISOString().slice(0, 10)

const urls = languages.flatMap((lang) =>
  ALL_ROUTES.map((route) => {
    const alternates = [
      ...languages.map((l) => `    <xhtml:link rel="alternate" hreflang="${l.code}" href="${absoluteUrl(route, l.code)}" />`),
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${absoluteUrl(route, "en")}" />`,
    ]
    return [
      `  <url>`,
      `    <loc>${absoluteUrl(route, lang.code)}</loc>`,
      `    <lastmod>${LASTMOD}</lastmod>`,
      ...alternates,
      `  </url>`,
    ].join("\n")
  }),
)

writeFileSync(
  resolve("public/sitemap.xml"),
  [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`,
    ...urls,
    `</urlset>`,
    ``,
  ].join("\n"),
)
console.log(`sitemap.xml written (${urls.length} entries)`)

writeFileSync(
  resolve("public/robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
)
console.log("robots.txt written")
