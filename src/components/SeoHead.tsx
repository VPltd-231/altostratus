import { createElement } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/hooks/use-language';
import { getHeadTags, getPageSeo, resolveRoute } from '@/lib/seo';

interface SeoHeadProps {
  /** Language-agnostic route, e.g. "/" or "/provider/aws" */
  route: string;
}

/**
 * Keeps <head> in sync during client-side navigation. The tags come from
 * src/lib/seo.ts, the same module the prerender uses, so on first load Helmet
 * simply adopts the prerendered tags (they carry data-rh) instead of
 * duplicating them. JSON-LD is only written by the prerender: crawlers fetch
 * each URL fresh, so it never needs updating client-side.
 */
export const SeoHead = ({ route }: SeoHeadProps) => {
  const { language } = useLanguage();
  const page = resolveRoute(route);
  if (!page) return null;

  const seo = getPageSeo(page, language.code);

  return (
    <Helmet>
      <html lang={language.code} />
      <title>{seo.title}</title>
      {getHeadTags(seo).map(({ tag, attrs }, i) => createElement(tag, { key: i, ...attrs }))}
    </Helmet>
  );
};
