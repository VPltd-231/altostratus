/**
 * schema.org JSON-LD for each prerendered page, as one connected @graph.
 *
 * Only facts that are visible on the page are marked up (Google requires
 * structured data to match visible content). Deliberately NOT used:
 *   - FAQPage: the site has no visible Q&A content.
 *   - AggregateRating / reviewRating: the site publishes no ratings.
 *   - SearchAction (sitelinks search box): the site has no search.
 */
import { cloudProviders, type CloudProvider, type ProviderId } from '../../src/data/cloudProviders';
import { getSignupSteps } from '../../src/data/signupSteps';
import { languages, SITE_URL } from '../../src/lib/languages';
import { absoluteUrl, LOGO_URL, SITE_NAME, type PageSeo } from '../../src/lib/seo';

type Node = Record<string, unknown>;

/** Real-world entities, linked so search engines can disambiguate them. */
const PROVIDER_ENTITIES: Record<ProviderId, { url: string; sameAs: string[]; parent: string }> = {
  aws: {
    url: 'https://aws.amazon.com/',
    sameAs: ['https://en.wikipedia.org/wiki/Amazon_Web_Services'],
    parent: 'Amazon',
  },
  gcp: {
    url: 'https://cloud.google.com/',
    sameAs: ['https://en.wikipedia.org/wiki/Google_Cloud_Platform'],
    parent: 'Google',
  },
  azure: {
    url: 'https://azure.microsoft.com/',
    sameAs: ['https://en.wikipedia.org/wiki/Microsoft_Azure'],
    parent: 'Microsoft',
  },
  oracle: {
    url: 'https://www.oracle.com/cloud/',
    sameAs: ['https://en.wikipedia.org/wiki/Oracle_Cloud'],
    parent: 'Oracle Corporation',
  },
  ibm: {
    url: 'https://www.ibm.com/cloud',
    sameAs: ['https://en.wikipedia.org/wiki/IBM_Cloud'],
    parent: 'IBM',
  },
};

/** Build date (YYYY-MM-DD). Set BUILD_DATE to make builds reproducible. */
const BUILD_DATE = process.env.BUILD_DATE || new Date().toISOString().slice(0, 10);

const ids = {
  organization: `${SITE_URL}/#organization`,
  website: `${SITE_URL}/#website`,
  logo: `${SITE_URL}/#logo`,
  providerList: (lang: string) => `${absoluteUrl('/', lang)}#providers`,
  calculator: (lang: string) => `${absoluteUrl('/', lang)}#pricing`,
  providerOrg: (id: ProviderId) => `${SITE_URL}/provider/${id}#organization`,
};

const organization = (): Node => ({
  '@type': 'Organization',
  '@id': ids.organization,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: {
    '@type': 'ImageObject',
    '@id': ids.logo,
    url: LOGO_URL,
    contentUrl: LOGO_URL,
    width: 512,
    height: 512,
    caption: SITE_NAME,
  },
  image: { '@id': ids.logo },
  description:
    'A cloud provider comparison tool for developers and startups who want to stretch their runway.',
});

const website = (seo: PageSeo): Node => ({
  '@type': 'WebSite',
  '@id': ids.website,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  alternateName: 'RunRate Host',
  description: seo.language.description,
  publisher: { '@id': ids.organization },
  inLanguage: languages.map((l) => l.code),
});

const providerOrg = (p: CloudProvider): Node => {
  const entity = PROVIDER_ENTITIES[p.id];
  return {
    '@type': 'Organization',
    '@id': ids.providerOrg(p.id),
    name: p.name,
    alternateName: p.shortName,
    url: entity.url,
    sameAs: entity.sameAs,
    parentOrganization: { '@type': 'Organization', name: entity.parent },
  };
};

const webPage = (seo: PageSeo, extra: Node): Node => ({
  '@id': `${seo.canonical}#webpage`,
  url: seo.canonical,
  name: seo.title,
  description: seo.description,
  inLanguage: seo.language.code,
  isPartOf: { '@id': ids.website },
  publisher: { '@id': ids.organization },
  primaryImageOfPage: { '@type': 'ImageObject', url: seo.image, width: 1200, height: 630 },
  dateModified: BUILD_DATE,
  ...extra,
});

// ---- page graphs -------------------------------------------------------------

const homeGraph = (seo: PageSeo): Node[] => {
  const lang = seo.language.code;
  return [
    webPage(seo, {
      '@type': 'CollectionPage',
      mainEntity: { '@id': ids.providerList(lang) },
      hasPart: { '@id': ids.calculator(lang) },
      about: cloudProviders.map((p) => ({ '@id': ids.providerOrg(p.id) })),
    }),
    {
      '@type': 'ItemList',
      '@id': ids.providerList(lang),
      name: 'Leading Cloud Platforms',
      numberOfItems: cloudProviders.length,
      itemListOrder: 'https://schema.org/ItemListUnordered',
      itemListElement: cloudProviders.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: p.name,
        url: absoluteUrl(`/provider/${p.id}`, lang),
      })),
    },
    {
      '@type': 'WebApplication',
      '@id': ids.calculator(lang),
      name: 'Cloud Pricing Calculator',
      url: ids.calculator(lang),
      description:
        'Estimate your monthly cloud costs across AWS, Google Cloud, Azure, Oracle Cloud and IBM Cloud from your own usage numbers.',
      applicationCategory: 'BusinessApplication',
      applicationSubCategory: 'Cloud cost estimator',
      operatingSystem: 'Any (web browser)',
      browserRequirements: 'Requires JavaScript',
      isAccessibleForFree: true,
      inLanguage: lang,
      offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' },
      featureList: [
        'Compute, storage, bandwidth, database, serverless and API request inputs',
        'Side-by-side monthly estimates for five cloud providers',
        'Cheapest provider highlighted',
      ],
      provider: { '@id': ids.organization },
    },
    ...cloudProviders.map(providerOrg),
  ];
};

const providerGraph = (seo: PageSeo, p: CloudProvider): Node[] => {
  const lang = seo.language.code;
  const url = seo.canonical;
  const tier = p.freeTier;

  const catalogue: { name: string; description: string }[] = [
    { name: `Compute: ${tier.compute.name}`, description: `${tier.compute.specs}. ${tier.compute.duration}. ${tier.compute.notes}` },
    ...(tier.serverless
      ? [{ name: `Serverless: ${tier.serverless.name}`, description: `${tier.serverless.specs}. ${tier.serverless.notes}` }]
      : []),
    { name: 'Storage', description: `Object: ${tier.storage.object}. Disk: ${tier.storage.disk}. ${tier.storage.notes}` },
    { name: 'Database', description: `${tier.database.offerings.join('; ')}. ${tier.database.notes}` },
    { name: 'Networking', description: `Egress: ${tier.networking.egress}. ${tier.networking.notes}` },
  ];

  return [
    webPage(seo, {
      '@type': ['WebPage', 'ItemPage'],
      breadcrumb: { '@id': `${url}#breadcrumb` },
      about: { '@id': ids.providerOrg(p.id) },
      mainEntity: { '@id': `${url}#service` },
      hasPart: [{ '@id': `${url}#howto` }, { '@id': `${url}#review` }],
    }),
    {
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: SITE_NAME, item: absoluteUrl('/', lang) },
        { '@type': 'ListItem', position: 2, name: 'Providers', item: `${absoluteUrl('/', lang)}#providers` },
        { '@type': 'ListItem', position: 3, name: p.name, item: url },
      ],
    },
    providerOrg(p),
    {
      '@type': 'Service',
      '@id': `${url}#service`,
      name: `${p.name} Free Tier`,
      alternateName: `${p.shortName} free tier`,
      serviceType: 'Cloud computing',
      category: 'Cloud hosting',
      description: p.description,
      slogan: p.tagline,
      provider: { '@id': ids.providerOrg(p.id) },
      areaServed: 'Worldwide',
      audience: { '@type': 'BusinessAudience', audienceType: p.bestFor.join(', ') },
      offers: {
        '@type': 'Offer',
        name: `${p.shortName} free tier — ${p.creditDuration}`,
        description: `Free credits: ${p.freeCredits}. ${p.requirements.notes}`,
        price: 0,
        priceCurrency: 'USD',
        url: p.signupUrl,
        availability: 'https://schema.org/OnlineOnly',
        offeredBy: { '@id': ids.providerOrg(p.id) },
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `${p.shortName} free tier resources`,
        itemListElement: catalogue.map((item) => ({
          '@type': 'Offer',
          price: 0,
          priceCurrency: 'USD',
          itemOffered: { '@type': 'Service', name: item.name, description: item.description },
        })),
      },
    },
    {
      '@type': 'HowTo',
      '@id': `${url}#howto`,
      name: `How to sign up for ${p.name}`,
      description: `Step-by-step guide to create your ${p.shortName} account.`,
      inLanguage: lang,
      estimatedCost: { '@type': 'MonetaryAmount', currency: 'USD', value: 0 },
      supply: [
        p.requirements.email && 'Email address',
        p.requirements.phone && 'Phone number that can receive SMS',
        p.requirements.creditCard && 'Credit or debit card',
        p.requirements.governmentId && 'Government ID',
      ]
        .filter(Boolean)
        .map((name) => ({ '@type': 'HowToSupply', name })),
      step: getSignupSteps(p).map((s, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: s.title,
        text: s.description,
        itemListElement: [...(s.warning ? [s.warning] : []), ...s.tips].map((text) => ({
          '@type': 'HowToTip',
          text,
        })),
      })),
    },
    {
      '@type': 'Review',
      '@id': `${url}#review`,
      name: `Engineer's take on ${p.name}`,
      reviewBody: p.engineerTake,
      author: { '@id': ids.organization },
      publisher: { '@id': ids.organization },
      itemReviewed: { '@id': ids.providerOrg(p.id) },
      inLanguage: lang,
      positiveNotes: {
        '@type': 'ItemList',
        itemListElement: p.strengths.map((name, i) => ({ '@type': 'ListItem', position: i + 1, name })),
      },
      negativeNotes: {
        '@type': 'ItemList',
        itemListElement: p.limitations.map((name, i) => ({ '@type': 'ListItem', position: i + 1, name })),
      },
    },
  ];
};

export const getJsonLd = (seo: PageSeo): Node => ({
  '@context': 'https://schema.org',
  '@graph': [
    organization(),
    website(seo),
    ...(seo.page.kind === 'home' ? homeGraph(seo) : providerGraph(seo, seo.page.provider)),
  ],
});

/** Safe to inline in <script>: escapes `<` so content can never close the tag. */
export const serializeJsonLd = (data: Node) => JSON.stringify(data).replace(/</g, '\\u003c');
