// Runs after `vite build` (see package.json "build"). Turns the single SPA shell
// in dist/index.html into one static HTML file per indexable URL:
//
//   dist/index.html                     → /
//   dist/provider/aws/index.html        → /provider/aws
//   dist/de/index.html                  → /de
//   dist/de/provider/aws/index.html     → /de/provider/aws      … every language × route
//   dist/404.html                       → served with a real 404 status
//
// Each file carries its own <title>, meta description, canonical, hreflang,
// Open Graph/Twitter tags, JSON-LD and a full HTML snapshot of the page, then
// boots the normal React bundle. Text assets are pre-compressed (.br/.gz) so
// nginx can serve them without compressing on every request.
//
// Set VITE_SITE_URL (same variable as the app/sitemap) for your own domain.

import { mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "fs"
import { dirname, join, resolve } from "path"
import { brotliCompressSync, constants, gzipSync } from "zlib"
import { languages, localizedPath } from "../src/lib/languages"
import { ALL_ROUTES, getHeadTags, getPageSeo, resolveRoute, type HeadTag, type PageSeo } from "../src/lib/seo"
import { homeMarkup, notFoundMarkup, providerMarkup } from "./prerender/markup"
import { getJsonLd, serializeJsonLd } from "./prerender/schema"

const DIST = resolve("dist")
const SEO_HEAD = "<!--seo-head-->"
const APP_HTML = "<!--app-html-->"

const template = readFileSync(join(DIST, "index.html"), "utf8")
for (const marker of [SEO_HEAD, APP_HTML]) {
  if (!template.includes(marker)) throw new Error(`dist/index.html is missing the ${marker} marker (see index.html)`)
}

const attr = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;")
const text = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;")

/** data-rh lets react-helmet-async adopt these tags instead of duplicating them. */
const renderTag = ({ tag, attrs }: HeadTag) =>
  `<${tag} ${Object.entries(attrs).map(([k, v]) => `${k}="${attr(v)}"`).join(" ")} data-rh="true">`

/** Self-hosted Inter (latin subset) is on the critical path for the hero text. */
const fontPreload = (() => {
  const font = readdirSync(join(DIST, "assets")).find((f) => /^inter-latin-wght-normal-.*\.woff2$/.test(f))
  return font ? `<link rel="preload" href="/assets/${font}" as="font" type="font/woff2" crossorigin>` : ""
})()

const fill = (opts: { lang: string; head: string; body: string }) =>
  template
    .replace(/<html lang="[^"]*">/, `<html lang="${opts.lang}">`)
    .replace(/<title>[\s\S]*?<\/title>\s*/, "")
    .replace(SEO_HEAD, opts.head)
    .replace(APP_HTML, opts.body)

const pageHtml = (seo: PageSeo) => {
  const { page, language } = seo
  const head = [
    `<title>${text(seo.title)}</title>`,
    ...getHeadTags(seo).map(renderTag),
    fontPreload,
    `<script type="application/ld+json">${serializeJsonLd(getJsonLd(seo))}</script>`,
  ]
    .filter(Boolean)
    .join("\n    ")

  const body = page.kind === "home" ? homeMarkup(language) : providerMarkup(page.provider, language)
  return fill({ lang: language.code, head, body })
}

const write = (relPath: string, html: string) => {
  const file = join(DIST, relPath)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, html)
}

// ---- pages -------------------------------------------------------------------

let count = 0
for (const lang of languages) {
  for (const route of ALL_ROUTES) {
    const page = resolveRoute(route)!
    const urlPath = localizedPath(route, lang.code) // "/", "/de", "/provider/aws", "/de/provider/aws"
    write(join(urlPath, "index.html"), pageHtml(getPageSeo(page, lang.code)))
    count++
  }
}

write(
  "404.html",
  fill({
    lang: "en",
    head: [`<title>Page not found | RunRateHost</title>`, `<meta name="robots" content="noindex" data-rh="true">`, fontPreload]
      .filter(Boolean)
      .join("\n    "),
    body: notFoundMarkup(),
  }),
)

console.log(`prerender: ${count} pages + 404.html written`)

// ---- pre-compression ---------------------------------------------------------

const COMPRESSIBLE = /\.(html|js|css|svg|xml|txt|json|webmanifest)$/
const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name)
    return statSync(p).isDirectory() ? walk(p) : [p]
  })

let compressed = 0
for (const file of walk(DIST)) {
  if (!COMPRESSIBLE.test(file)) continue
  const buf = readFileSync(file)
  if (buf.length < 1024) continue
  writeFileSync(`${file}.gz`, gzipSync(buf, { level: 9 }))
  writeFileSync(
    `${file}.br`,
    brotliCompressSync(buf, {
      params: { [constants.BROTLI_PARAM_QUALITY]: 11, [constants.BROTLI_PARAM_SIZE_HINT]: buf.length },
    }),
  )
  compressed++
}
console.log(`prerender: ${compressed} files pre-compressed (.br + .gz)`)
