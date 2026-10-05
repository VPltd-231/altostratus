export interface LanguageMeta {
  /** Google Translate language code */
  code: string;
  /** URL path prefix ("" for English) */
  path: string;
  /** Native language name */
  label: string;
  /** Representative country / flag */
  country: string;
  flag: string;
  title: string;
  description: string;
}

export const DEFAULT_LANGUAGE = 'en';

export const languages: LanguageMeta[] = [
  {
    code: 'en',
    path: '',
    label: 'English',
    country: 'United Kingdom',
    flag: '🇬🇧',
    title: 'RunRateHost | Save On Your Cloud Hosting Infrastructure',
    description:
      'Compare AWS, Google Cloud, Azure, Oracle and IBM Cloud side-by-side. Free tiers, hidden fees and real cost breakdowns.',
  },
  {
    code: 'de',
    path: 'de',
    label: 'Deutsch',
    country: 'Deutschland',
    flag: '🇩🇪',
    title: 'RunRateHost | Cloud-Hosting-Kosten senken',
    description:
      'AWS, Google Cloud, Azure, Oracle und IBM Cloud im direkten Vergleich: Gratis-Kontingente, versteckte Gebühren und echte Kostenanalysen.',
  },
  {
    code: 'fr',
    path: 'fr',
    label: 'Français',
    country: 'France',
    flag: '🇫🇷',
    title: "RunRateHost | Réduisez le coût de votre hébergement cloud",
    description:
      'Comparez AWS, Google Cloud, Azure, Oracle et IBM Cloud : offres gratuites, frais cachés et analyses de coûts réelles.',
  },
  {
    code: 'es',
    path: 'es',
    label: 'Español',
    country: 'España',
    flag: '🇪🇸',
    title: 'RunRateHost | Ahorra en tu infraestructura cloud',
    description:
      'Compara AWS, Google Cloud, Azure, Oracle e IBM Cloud: capas gratuitas, costes ocultos y desgloses de precios reales.',
  },
  {
    code: 'it',
    path: 'it',
    label: 'Italiano',
    country: 'Italia',
    flag: '🇮🇹',
    title: 'RunRateHost | Risparmia sul cloud hosting',
    description:
      'Confronta AWS, Google Cloud, Azure, Oracle e IBM Cloud: piani gratuiti, costi nascosti e analisi reali dei prezzi.',
  },
  {
    code: 'nl',
    path: 'nl',
    label: 'Nederlands',
    country: 'Nederland',
    flag: '🇳🇱',
    title: 'RunRateHost | Bespaar op cloudhosting',
    description:
      'Vergelijk AWS, Google Cloud, Azure, Oracle en IBM Cloud: gratis niveaus, verborgen kosten en echte kostenanalyses.',
  },
  {
    code: 'pl',
    path: 'pl',
    label: 'Polski',
    country: 'Polska',
    flag: '🇵🇱',
    title: 'RunRateHost | Oszczędzaj na hostingu w chmurze',
    description:
      'Porównaj AWS, Google Cloud, Azure, Oracle i IBM Cloud: darmowe pakiety, ukryte opłaty i realne koszty.',
  },
  {
    code: 'pt',
    path: 'pt',
    label: 'Português',
    country: 'Portugal',
    flag: '🇵🇹',
    title: 'RunRateHost | Poupe na sua infraestrutura cloud',
    description:
      'Compare AWS, Google Cloud, Azure, Oracle e IBM Cloud: níveis gratuitos, custos ocultos e análises de preços reais.',
  },
  {
    code: 'sv',
    path: 'sv',
    label: 'Svenska',
    country: 'Sverige',
    flag: '🇸🇪',
    title: 'RunRateHost | Spara på molnhosting',
    description:
      'Jämför AWS, Google Cloud, Azure, Oracle och IBM Cloud: gratisnivåer, dolda avgifter och verkliga kostnader.',
  },
  {
    code: 'da',
    path: 'da',
    label: 'Dansk',
    country: 'Danmark',
    flag: '🇩🇰',
    title: 'RunRateHost | Spar på cloud hosting',
    description:
      'Sammenlign AWS, Google Cloud, Azure, Oracle og IBM Cloud: gratis niveauer, skjulte gebyrer og reelle omkostninger.',
  },
  {
    code: 'fi',
    path: 'fi',
    label: 'Suomi',
    country: 'Suomi',
    flag: '🇫🇮',
    title: 'RunRateHost | Säästä pilvipalvelun kustannuksissa',
    description:
      'Vertaa AWS:ää, Google Cloudia, Azurea, Oraclea ja IBM Cloudia: ilmaistasot, piilokulut ja todelliset kustannukset.',
  },
  {
    code: 'cs',
    path: 'cs',
    label: 'Čeština',
    country: 'Česko',
    flag: '🇨🇿',
    title: 'RunRateHost | Ušetřete na cloudovém hostingu',
    description:
      'Porovnejte AWS, Google Cloud, Azure, Oracle a IBM Cloud: bezplatné úrovně, skryté poplatky a reálné náklady.',
  },
  {
    code: 'ro',
    path: 'ro',
    label: 'Română',
    country: 'România',
    flag: '🇷🇴',
    title: 'RunRateHost | Reduceți costurile de găzduire cloud',
    description:
      'Comparați AWS, Google Cloud, Azure, Oracle și IBM Cloud: niveluri gratuite, taxe ascunse și costuri reale.',
  },
];

export const languagePaths = languages.filter((l) => l.path).map((l) => l.path);

export const getLanguage = (code?: string): LanguageMeta =>
  languages.find((l) => l.code === code) ?? languages[0];

/**
 * Public origin used for canonical/hreflang tags. Override at build time with
 * VITE_SITE_URL (e.g. https://runratehost.com). `import.meta.env` is undefined
 * when this module runs under plain Node (sitemap script), hence the `?.`.
 */
export const SITE_URL = (
  (import.meta.env?.VITE_SITE_URL as string | undefined) || 'https://comparecloud.lovable.app'
).replace(/\/$/, '');

/** Build a URL for a route in a given language. `route` starts with "/" */
export const localizedPath = (route: string, code: string) => {
  const lang = getLanguage(code);
  const clean = route === '/' ? '' : route;
  return lang.path ? `/${lang.path}${clean}` : clean || '/';
};
