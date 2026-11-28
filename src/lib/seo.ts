/**
 * Per-route <head> metadata. Single source for:
 *   - the React app (SeoHead, via react-helmet-async) on client-side navigation
 *   - the build-time prerender (scripts/prerender.ts), which writes the same
 *     tags into each static HTML file
 *
 * Relative imports only: this module also runs under plain Node (tsx).
 */
import { cloudProviders, type CloudProvider } from '../data/cloudProviders';
import { getLanguage, languages, localizedPath, SITE_URL, type LanguageMeta } from './languages';

export const SITE_NAME = 'RunRateHost';

const nodeEnv = typeof process !== 'undefined' ? process.env : undefined;

/** 1200×630 social preview. Override with VITE_OG_IMAGE (absolute URL). */
export const OG_IMAGE =
  (import.meta.env?.VITE_OG_IMAGE as string | undefined) || nodeEnv?.VITE_OG_IMAGE || `${SITE_URL}/og-image.png`;
export const LOGO_URL = `${SITE_URL}/logo.png`;

/** Open Graph wants language_TERRITORY. */
const OG_LOCALES: Record<string, string> = {
  en: 'en_GB', de: 'de_DE', fr: 'fr_FR', es: 'es_ES', it: 'it_IT', nl: 'nl_NL', pl: 'pl_PL',
  pt: 'pt_PT', sv: 'sv_SE', da: 'da_DK', fi: 'fi_FI', cs: 'cs_CZ', ro: 'ro_RO',
};

export type ResolvedRoute =
  | { kind: 'home'; route: '/' }
  | { kind: 'provider'; route: string; provider: CloudProvider };

/** Language-agnostic route ("/" or "/provider/<id>") → page kind, or null for a 404. */
export const resolveRoute = (route: string): ResolvedRoute | null => {
  const clean = route.split('#')[0].replace(/\/+$/, '') || '/';
  if (clean === '/') return { kind: 'home', route: '/' };
  const match = clean.match(/^\/provider\/([a-z]+)$/);
  const provider = match && cloudProviders.find((p) => p.id === match[1]);
  return provider ? { kind: 'provider', route: clean, provider } : null;
};

/** Every indexable language-agnostic route. */
export const ALL_ROUTES = ['/', ...cloudProviders.map((p) => `/provider/${p.id}`)];

export const absoluteUrl = (route: string, langCode: string) => `${SITE_URL}${localizedPath(route, langCode)}`;

/** Trims to `max` characters on a word boundary. */
const clip = (text: string, max = 160) =>
  text.length <= max ? text : `${text.slice(0, max - 1).replace(/\s+\S*$/, '').replace(/[\s,;:—-]+$/, '')}…`;

const providerTitle = (p: CloudProvider) => `${p.name} Free Tier & Sign-Up Guide | ${SITE_NAME}`;

const providerDescription = (p: CloudProvider) =>
  clip(
    `${p.shortName} free tier — compute: ${p.freeTier.compute.name}; storage: ${p.freeTier.storage.object}; ` +
      `egress: ${p.freeTier.networking.egress}; credits: ${p.freeCredits}. Sign-up guide & limits.`,
  );

export interface PageSeo {
  page: ResolvedRoute;
  language: LanguageMeta;
  title: string;
  description: string;
  canonical: string;
  alternates: { hreflang: string; href: string }[];
  ogType: 'website' | 'article';
  ogLocale: string;
  image: string;
  imageAlt: string;
}

export const getPageSeo = (page: ResolvedRoute, langCode: string): PageSeo => {
  const language = getLanguage(langCode);
  const isHome = page.kind === 'home';

  return {
    page,
    language,
    title: isHome ? language.title : providerTitle(page.provider),
    description: isHome ? language.description : providerDescription(page.provider),
    canonical: absoluteUrl(page.route, language.code),
    alternates: [
      ...languages.map((l) => ({ hreflang: l.code, href: absoluteUrl(page.route, l.code) })),
      { hreflang: 'x-default', href: absoluteUrl(page.route, 'en') },
    ],
    ogType: isHome ? 'website' : 'article',
    ogLocale: OG_LOCALES[language.code] ?? language.code,
    image: OG_IMAGE,
    imageAlt: `${SITE_NAME} — compare AWS, Google Cloud, Azure, Oracle and IBM Cloud costs`,
  };
};

export interface HeadTag {
  tag: 'meta' | 'link';
  attrs: Record<string, string>;
}

/**
 * Everything in <head> except <title> and JSON-LD, as plain data, so React
 * (Helmet) and the prerender emit byte-identical tags. Helmet reconciles the
 * prerendered tags (marked data-rh) instead of duplicating them.
 */
export const getHeadTags = (seo: PageSeo): HeadTag[] => {
  const meta = (key: 'name' | 'property', id: string, content: string): HeadTag => ({
    tag: 'meta',
    attrs: { [key]: id, content },
  });

  return [
    meta('name', 'description', seo.description),
    meta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'),
    { tag: 'link', attrs: { rel: 'canonical', href: seo.canonical } },
    ...seo.alternates.map<HeadTag>((a) => ({ tag: 'link', attrs: { rel: 'alternate', hreflang: a.hreflang, href: a.href } })),
    meta('property', 'og:type', seo.ogType),
    meta('property', 'og:site_name', SITE_NAME),
    meta('property', 'og:title', seo.title),
    meta('property', 'og:description', seo.description),
    meta('property', 'og:url', seo.canonical),
    meta('property', 'og:image', seo.image),
    meta('property', 'og:image:width', '1200'),
    meta('property', 'og:image:height', '630'),
    meta('property', 'og:image:alt', seo.imageAlt),
    meta('property', 'og:locale', seo.ogLocale),
    ...languages
      .filter((l) => l.code !== seo.language.code)
      .map((l) => meta('property', 'og:locale:alternate', OG_LOCALES[l.code] ?? l.code)),
    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:title', seo.title),
    meta('name', 'twitter:description', seo.description),
    meta('name', 'twitter:image', seo.image),
    meta('name', 'twitter:image:alt', seo.imageAlt),
  ];
};
