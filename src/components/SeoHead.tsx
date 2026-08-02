import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/hooks/use-language';
import { languages, localizedPath, SITE_URL } from '@/lib/languages';

interface SeoHeadProps {
  /** Language-agnostic route, e.g. "/" or "/provider/aws" */
  route: string;
  titleSuffix?: string;
  description?: string;
}

export const SeoHead = ({ route, titleSuffix, description }: SeoHeadProps) => {
  const { language } = useLanguage();
  const cleanRoute = route.split('#')[0] || '/';
  const title = titleSuffix ? `${titleSuffix} | ${language.title}` : language.title;
  const desc = description ?? language.description;
  const canonical = `${SITE_URL}${localizedPath(cleanRoute, language.code)}`;

  return (
    <Helmet>
      <html lang={language.code} />
      <title>{title}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content={language.code} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
      {languages.map((l) => (
        <link
          key={l.code}
          rel="alternate"
          hrefLang={l.code}
          href={`${SITE_URL}${localizedPath(cleanRoute, l.code)}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${localizedPath(cleanRoute, 'en')}`} />
    </Helmet>
  );
};
