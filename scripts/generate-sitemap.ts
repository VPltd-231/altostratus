// Runs before `vite dev` and `vite build` (predev/prebuild hooks); writes public/sitemap.xml and public/robots.txt.
// Set VITE_SITE_URL in the environment to generate URLs for your own domain.

import { writeFileSync } from "fs"
import { resolve } from "path"
import { languages, SITE_URL } from "../src/lib/languages"
import { cloudProviders } from "../src/data/cloudProviders"

const BASE_URL = (process.env.VITE_SITE_URL || SITE_URL).replace(/\/$/, "")

// "" is the default (English) language, which has no URL prefix.
const LANGS = languages.map((l) => l.path)
const PROVIDERS = cloudProviders.map((p) => p.id)

interface SitemapEntry {
  path: string
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"
  priority?: string
}

const entries: SitemapEntry[] = []

for (const lang of LANGS) {
  const prefix = lang ? `/${lang}` : ""
  entries.push({ path: prefix || "/", changefreq: "weekly", priority: lang ? "0.9" : "1.0" })
  for (const provider of PROVIDERS) {
    entries.push({ path: `${prefix}/provider/${provider}`, changefreq: "monthly", priority: "0.7" })
  }
}

function alternates(path: string) {
  // Strip any language prefix to get the language-agnostic route
  const segments = path.split("/").filter(Boolean)
  const rest = LANGS.includes(segments[0]) && segments[0] ? segments.slice(1) : segments
  const route = rest.length ? `/${rest.join("/")}` : ""

  const links = languages.map((l) => {
    const href = `${BASE_URL}${l.path ? `/${l.path}` : ""}${route}` || `${BASE_URL}/`
    return `    <xhtml:link rel="alternate" hreflang="${l.code}" href="${href}" />`
  })
  links.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}${route || "/"}" />`)
  return links.join("\n")
}

function generateSitemap(entries: SitemapEntry[]) {
  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path === "/" ? "/" : e.path}</loc>`,
      alternates(e.path),
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  )

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`,
    ...urls,
    `</urlset>`,
  ].join("\n")
}

writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries))
console.log(`sitemap.xml written (${entries.length} entries)`)

writeFileSync(resolve("public/robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${BASE_URL}/sitemap.xml\n`)
console.log("robots.txt written")
