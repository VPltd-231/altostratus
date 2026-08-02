// Runs before `vite dev` and `vite build` (predev/prebuild hooks); writes public/sitemap.xml.

import { writeFileSync } from "fs"
import { resolve } from "path"

const BASE_URL = "https://comparecloud.lovable.app"

const LANGS = ["", "de", "fr", "es", "it", "nl", "pl", "pt", "sv", "da", "fi", "cs", "ro"]
const PROVIDERS = ["aws", "gcp", "azure", "oracle", "ibm"]

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

  return LANGS.map((lang) => {
    const href = `${BASE_URL}${lang ? `/${lang}` : ""}${route}` || `${BASE_URL}/`
    return `    <xhtml:link rel="alternate" hreflang="${lang || "en"}" href="${href}" />`
  }).join("\n")
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
