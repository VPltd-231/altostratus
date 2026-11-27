/**
 * Static HTML snapshots of each page, written into #root at build time.
 *
 * Crawlers that don't run JavaScript (Bing's first pass, social scrapers, AI
 * crawlers) read this; real visitors see it as the first paint until React
 * takes over. It is built from the same data modules as the React components
 * and mirrors their visible content — nothing here is hidden or crawler-only.
 *
 * Above-the-fold markup (nav + hero) reuses the components' exact Tailwind
 * classes so the swap to React is visually seamless. Icons are left as
 * same-sized placeholders; they appear when React mounts.
 */
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { CloudIcon } from '../../src/components/CloudIcon';
import { cloudProviders, type CloudProvider, type ProviderId } from '../../src/data/cloudProviders';
import {
  BENEFITS,
  COMPARISON_CATEGORIES,
  COMPARISON_DATA,
  COMPARISON_PROVIDER_IDS,
  RECOMMENDATIONS,
  type ComparisonValue,
} from '../../src/data/content';
import { INITIAL_USAGE, USAGE_FIELDS, estimateAll } from '../../src/data/pricing';
import { getSignupSteps } from '../../src/data/signupSteps';
import { languages, localizedPath, type LanguageMeta } from '../../src/lib/languages';

// ---- helpers -----------------------------------------------------------------

const esc = (s: string | number) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Joins a list of HTML fragments. */
const each = <T,>(items: readonly T[], fn: (item: T, i: number) => string) => items.map(fn).join('');

/** Same-size stand-in for a lucide icon (React swaps in the real one). */
const icon = (cls: string) => `<span aria-hidden="true" class="inline-block shrink-0 ${cls}"></span>`;

const cloudIcon = (provider: ProviderId, size: number, className = '') =>
  renderToStaticMarkup(createElement(CloudIcon, { provider, size, className }));

const providerById = (id: ProviderId) => cloudProviders.find((p) => p.id === id)!;

const ext = (href: string, label: string, cls = '') =>
  `<a href="${esc(href)}" target="_blank" rel="noopener noreferrer" class="${cls}">${label}</a>`;

// ---- shared chrome -----------------------------------------------------------

const logo = (lang: LanguageMeta) => `
<a href="${localizedPath('/', lang.code)}" class="notranslate flex items-center gap-2.5" translate="no" aria-label="RunRateHost home">
  <span class="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-primary to-gcp">${icon('h-5 w-5')}</span>
  <span class="text-xl font-bold"><span class="gradient-text">RunRate</span><span class="text-foreground">Host</span></span>
</a>`;

/** Mirrors LanguageSwitcher's trigger so the nav doesn't shift on hydrate. */
const languageTrigger = (lang: LanguageMeta) => `
<div class="notranslate" translate="no">
  <span class="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-muted-foreground">
    ${icon('h-4 w-4')}
    <span class="hidden sm:inline">${lang.flag} ${esc(lang.label)}</span>
    <span class="sm:hidden">${lang.flag}</span>
    ${icon('h-3.5 w-3.5')}
  </span>
</div>`;

const NAV_LINKS = [
  { href: '#providers', label: 'Providers' },
  { href: '#comparison', label: 'Compare' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#credits', label: 'Credits' },
  { href: '#recommendations', label: 'Tips' },
];

const homeNav = (lang: LanguageMeta) => `
<nav class="fixed left-0 right-0 top-0 z-40 transition-[padding,background-color] duration-300 py-5" aria-label="Primary">
  <div class="mx-auto flex max-w-7xl items-center justify-between px-4">
    ${logo(lang)}
    <div class="hidden items-center gap-1 md:flex">
      ${each(NAV_LINKS, (l) => `<a href="${l.href}" class="rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 text-muted-foreground hover:bg-secondary hover:text-foreground">${l.label}</a>`)}
      ${languageTrigger(lang)}
    </div>
    <div class="flex items-center gap-1 md:hidden">
      ${languageTrigger(lang)}
      <span class="inline-flex h-10 w-10" aria-hidden="true"></span>
    </div>
  </div>
</nav>`;

// ---- home sections -----------------------------------------------------------

const hero = () => `
<section class="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4 py-20">
  <div aria-hidden="true" class="absolute inset-0 opacity-20 [background-image:linear-gradient(hsl(var(--primary)/0.1)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--primary)/0.1)_1px,transparent_1px)] [background-size:50px_50px]"></div>
  <div class="relative z-10 mx-auto max-w-5xl text-center">
    <div class="mb-6 flex items-center justify-center gap-3">
      ${icon('h-10 w-10')}
      <span class="font-mono text-sm uppercase tracking-widest text-muted-foreground">RunRateHost · Cloud Cost Intelligence</span>
    </div>
    <h1 class="mb-6 text-4xl font-extrabold leading-tight sm:text-5xl md:text-7xl">
      <span class="gradient-text">Save On Your</span><br>
      <span class="inline-block rounded-b-md border-b border-l border-r border-primary/20 bg-gradient-to-r from-sky-500 via-blue-400 to-indigo-500 bg-clip-text px-2 pb-1 pl-1 text-transparent">Cloud Hosting<br>Infrastructure</span>
    </h1>
    <p class="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
      RunRateHost benchmarks AWS, Google Cloud, Azure, Oracle, and IBM side-by-side — uncover
      free tiers, hidden fees, and the fastest path to a lower monthly run-rate.
    </p>
    <a href="#pricing" class="group mb-10 inline-flex h-11 items-center justify-center whitespace-nowrap rounded-md bg-gradient-to-r from-primary to-primary/80 px-8 py-6 text-lg font-semibold text-primary-foreground shadow-lg">
      Get Started ${icon('ml-2 h-5 w-5')}
    </a>
    <ul class="mb-10 flex flex-wrap justify-center gap-3">
      ${each(['Compute', 'Databases', 'Security', 'Serverless'], (label) => `
      <li class="glass-card flex items-center gap-2 rounded-full px-4 py-2">${icon('h-4 w-4')}<span class="text-sm font-medium">${label}</span></li>`)}
    </ul>
    <ul class="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
      ${each(cloudProviders, (p) => `
      <li class="${p.colorClass} opacity-60" title="${esc(p.name)}">${cloudIcon(p.id, 36)}<span class="sr-only">${esc(p.name)}</span></li>`)}
    </ul>
  </div>
</section>`;

const summarise = (tier?: Record<string, unknown>) => {
  if (!tier) return 'N/A';
  for (const key of ['specs', 'object', 'egress']) if (typeof tier[key] === 'string') return tier[key] as string;
  return 'Available';
};

const providerCard = (p: CloudProvider, lang: LanguageMeta) => `
<article class="relative glass-card rounded-3xl p-7 h-full overflow-hidden border border-border/50">
  <div class="absolute top-0 left-0 right-0 h-1 ${p.gradientClass}"></div>
  <header class="relative flex items-center gap-4 mb-6 pb-5 border-b border-border/30">
    <div class="p-4 rounded-2xl ${p.gradientClass} shadow-md">${cloudIcon(p.id, 36, 'text-white')}</div>
    <div class="flex-1 min-w-0">
      <h3 class="text-xl font-bold ${p.colorClass} truncate">${esc(p.name)}</h3>
      <p class="text-xs text-muted-foreground mt-1 truncate">${esc(p.tagline)}</p>
    </div>
  </header>
  <p class="mb-6 pl-6 pr-2 text-sm leading-relaxed italic text-muted-foreground">${esc(p.description)}</p>
  <p class="mb-6 p-3 rounded-xl bg-secondary/40 border border-border/30 text-xs">
    <span class="text-muted-foreground">Credits:</span> <strong>${esc(p.freeCredits)}</strong> · <strong>${esc(p.creditDuration)}</strong>
  </p>
  <dl class="grid grid-cols-2 gap-2 mb-6">
    ${each(
      [
        ['Compute', p.freeTier.compute],
        ['Storage', p.freeTier.storage],
        ['Database', p.freeTier.database],
        ['Network', p.freeTier.networking],
      ] as const,
      ([label, tier]) => `
    <div class="p-2.5 rounded-lg bg-secondary/30 border border-border/40">
      <dt class="text-[10px] text-muted-foreground uppercase tracking-wider">${label}</dt>
      <dd class="text-xs font-medium truncate">${esc(summarise(tier as Record<string, unknown>))}</dd>
    </div>`,
    )}
  </dl>
  <div class="relative z-10 flex gap-2">
    <a href="${localizedPath(`/provider/${p.id}`, lang.code)}" class="flex-1 inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium ${p.gradientClass} text-white">Explore ${esc(p.shortName)}</a>
    ${ext(p.signupUrl, 'Sign Up', 'inline-flex h-10 items-center justify-center rounded-md border-2 px-4 text-sm font-medium')}
  </div>
</article>`;

const providersSection = (lang: LanguageMeta) => `
<section class="px-4 py-20" id="providers">
  <div class="mx-auto max-w-7xl">
    <div class="mb-12 text-center">
      <h2 class="mb-4 text-3xl font-bold sm:text-4xl"><span class="gradient-text">Leading Cloud</span> Platforms</h2>
      <p class="mx-auto max-w-2xl text-muted-foreground">Open any provider to explore their free tier, requirements, strengths, and limitations in detail.</p>
    </div>
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      ${each(cloudProviders, (p) => providerCard(p, lang))}
    </div>
  </div>
</section>`;

const cell = (v: ComparisonValue) => (typeof v === 'boolean' ? (v ? 'Yes' : 'No') : esc(v));

const comparisonSection = () => `
<section class="py-20 px-4" id="comparison">
  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-12">
      <h2 class="text-3xl sm:text-4xl font-bold mb-4"><span class="gradient-text">Platform</span> Comparison</h2>
      <p class="text-muted-foreground max-w-2xl mx-auto">Compare free tier offerings across all major cloud providers at a glance.</p>
    </div>
    ${each(COMPARISON_CATEGORIES, (cat) => `
    <div class="glass-card rounded-2xl overflow-x-auto mb-6">
      <table class="w-full">
        <caption class="p-4 text-left font-semibold">${cat.label}</caption>
        <thead><tr class="border-b border-border">
          <th scope="col" class="text-left p-4 font-semibold">Feature</th>
          ${each(COMPARISON_PROVIDER_IDS, (id) => `<th scope="col" class="p-4 text-center text-xs font-medium">${esc(providerById(id).shortName)}</th>`)}
        </tr></thead>
        <tbody>
          ${each(COMPARISON_DATA[cat.id], (row) => `
          <tr class="border-b border-border/50">
            <th scope="row" class="p-4 text-left font-medium">${esc(row.feature)}</th>
            ${each(COMPARISON_PROVIDER_IDS, (id) => `<td class="p-4 text-center text-sm${row.highlight === id ? ' bg-primary/10 font-semibold' : ''}">${cell(row[id])}</td>`)}
          </tr>`)}
        </tbody>
      </table>
    </div>`)}
  </div>
</section>`;

const pricingSection = () => {
  const estimates = estimateAll(INITIAL_USAGE);
  return `
<section class="px-4 py-20" id="pricing">
  <div class="mx-auto max-w-6xl">
    <div class="mb-12 text-center">
      <p class="glass-card mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">Interactive Tool</p>
      <h2 class="mb-4 text-3xl font-bold sm:text-4xl"><span class="gradient-text">Pricing</span> Calculator</h2>
      <p class="mx-auto max-w-2xl text-muted-foreground">Estimate your monthly cloud costs across all providers. Adjust the sliders to match your expected usage.</p>
    </div>
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div class="glass-card rounded-2xl p-6 sm:p-8">
        <h3 class="mb-6 text-xl font-bold">Example usage</h3>
        <dl class="space-y-4">
          ${each(USAGE_FIELDS, (f) => `
          <div class="flex items-center justify-between"><dt class="font-semibold">${esc(f.label)}</dt><dd class="text-2xl font-bold ${f.iconColor}">${INITIAL_USAGE[f.id]}<span class="text-sm text-muted-foreground">${esc(f.unit)}</span></dd></div>`)}
        </dl>
      </div>
      <div class="glass-card rounded-2xl p-6 sm:p-8">
        <h3 class="mb-6 text-xl font-bold">Estimated Monthly Costs</h3>
        <ol class="space-y-4">
          ${each(estimates, (e, i) => `
          <li class="flex items-center justify-between rounded-xl border p-4 ${i === 0 ? 'border-primary/50 bg-primary/10' : 'border-border/50 bg-secondary/50'}">
            <span><span class="font-semibold">${esc(e.provider)}</span>${e.savings ? `<span class="block text-xs text-muted-foreground">${esc(e.savings)}</span>` : ''}</span>
            <span class="text-xl font-bold${i === 0 ? ' text-primary' : ''}">$${e.monthly.toFixed(2)}${i === 0 ? ' <span class="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">Lowest estimate</span>' : ''}</span>
          </li>`)}
        </ol>
        <p class="mt-6 text-center text-xs text-muted-foreground">* Estimates are illustrative, based on simplified list prices. Actual costs vary by region, instance type and usage patterns. Always check the provider's own calculator.</p>
      </div>
    </div>
  </div>
</section>`;
};

/** Copy mirrors src/components/CreditsHardSell.tsx. */
const creditsSection = () => `
<section class="py-24 px-4 relative" id="credits">
  <div class="max-w-5xl mx-auto relative z-10 text-center">
    <p class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card border border-primary/30 mb-8 text-sm font-semibold">EXCLUSIVE INSIDER GUIDE</p>
    <h2 class="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight">Unlock $100,000+<br>in Cloud Credits</h2>
    <p class="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
      The complete playbook for startups, developers, and enterprises to secure <strong class="text-foreground">5 to 6 figures</strong> in free cloud credits from AWS, Google Cloud, Azure, and more.
    </p>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14">
      ${each(
        [
          ['Funding Options', 'Receive approval for up to 6 figures in free balance'],
          ['Optimized for Efficiency', 'Scalable, growth-optimized infrastructure & networking quick deployment'],
          ['Market Mover Advantage', 'Shorten speed to market & reduce launch costs'],
        ],
        ([title, desc]) => `
      <div class="glass-card rounded-2xl p-6 border border-border/40"><h3 class="font-semibold text-base mb-2 text-foreground">${title}</h3><p class="text-sm text-muted-foreground leading-relaxed">${esc(desc)}</p></div>`,
      )}
    </div>
    <div class="glass-card rounded-3xl p-8 sm:p-12">
      <p class="text-xl font-bold mb-2">The startup playbook for free cloud credits</p>
      <p class="text-muted-foreground mb-8">In-depth guide written from experience applying. Learn about eligibility and application steps, tips about how to maximize your chances for success &amp; obtain $100'000 in free credits.</p>
      ${ext('https://txprocessing.sell.app/product/product-1792183274', 'Get Insider Access', 'inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-primary via-gcp to-azure px-10 py-4 text-lg font-bold text-white')}
    </div>
  </div>
</section>`;

const techStackSection = () => `
<section class="px-4 py-12">
  <div class="mx-auto max-w-5xl">
    <div class="glass-card rounded-2xl px-6 py-5">
      <h2 class="text-lg font-bold sm:text-xl">Cloud Hosting Tech Stack</h2>
      <p class="text-xs text-muted-foreground sm:text-sm">Interactive architecture overview</p>
    </div>
  </div>
</section>`;

const recommendationsSection = () => `
<section class="relative bg-secondary/30 px-4 py-24" id="recommendations">
  <div class="relative z-10 mx-auto max-w-5xl">
    <div class="mb-12 text-center">
      <h2 class="mb-4 text-3xl font-bold sm:text-5xl"><span class="gradient-text">Quick</span> Peek</h2>
      <p class="mx-auto max-w-xl text-muted-foreground">Detailed insights for each use case</p>
    </div>
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
      ${each(RECOMMENDATIONS, (r) => `
      <article class="glass-card rounded-2xl bg-card p-6">
        <p class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">${esc(r.title)}</p>
        <h3 class="mb-2 text-2xl font-bold">${esc(r.provider)}</h3>
        <p class="mb-2 text-sm text-muted-foreground">${esc(r.reason)}</p>
        <p class="text-sm">${esc(r.backText)}</p>
      </article>`)}
    </div>
  </div>
</section>`;

const benefitsSection = () => `
<section class="py-24 px-4" id="benefits">
  <div class="max-w-7xl mx-auto relative z-10">
    <div class="text-center mb-16">
      <p class="mb-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Security &amp; Data Hygiene</p>
      <h2 class="text-3xl sm:text-5xl font-bold mb-4"><span class="gradient-text">Trusted</span> Infrastructure</h2>
      <p class="text-muted-foreground max-w-2xl mx-auto text-lg">Your data is your most valuable business asset. Here's how multi-cloud architecture enforces proper data hygiene across every touchpoint.</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      ${each(BENEFITS, (b) => `
      <div class="glass-card rounded-2xl p-6 border border-border/50"><h3 class="text-lg font-bold mb-2 text-foreground">${esc(b.title)}</h3><p class="text-sm text-muted-foreground leading-relaxed">${esc(b.description)}</p></div>`)}
    </div>
  </div>
</section>`;

/** Copy mirrors src/components/Footer.tsx. */
const footer = () => `
<footer class="relative border-t border-border">
  <div class="bg-secondary/20 px-4 py-16">
    <div class="mx-auto max-w-6xl">
      <h2 class="mb-3 text-center text-2xl font-bold sm:text-3xl">Make Informed Choices</h2>
      <p class="mx-auto mb-12 max-w-lg text-center text-sm text-muted-foreground">Data-driven insights to help you pick the right cloud infrastructure</p>
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        ${each(
          [
            ['Side-by-Side Comparison', 'Free tiers, sign-up requirements and trade-offs for each provider in one place'],
            ['Cost Estimator', 'Rough monthly spend across providers from your own usage numbers'],
            ['Plain-English Guidance', 'Strengths, limitations and an engineer’s take on every platform'],
            ['Your Language', `Browse in ${languages.length} languages, translated on demand`],
          ],
          ([t, d]) => `<div class="glass-card rounded-xl border border-border/40 p-5"><h3 class="mb-1.5 text-sm font-semibold text-foreground">${t}</h3><p class="text-xs leading-relaxed text-muted-foreground">${esc(d)}</p></div>`,
        )}
      </div>
    </div>
  </div>
  <div class="border-t border-border/30 px-4 py-14">
    <div class="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-3">
      <div>
        <p class="mb-4 text-lg font-bold">RunRateHost</p>
        <p class="text-sm leading-relaxed text-muted-foreground">A cloud provider comparison tool for developers and startups who want to stretch their runway. Compare free tiers and estimate costs before you commit.</p>
      </div>
      <nav aria-label="Quick links">
        <h3 class="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Quick Links</h3>
        <ul class="space-y-2.5 text-sm">
          ${each(
            [
              ['Provider Comparison', '#providers'],
              ['Pricing Calculator', '#pricing'],
              ['Cloud Credits Guide', '#credits'],
              ['Pro Tips', '#recommendations'],
            ],
            ([l, h]) => `<li><a href="${h}" class="text-muted-foreground hover:text-foreground">${l}</a></li>`,
          )}
        </ul>
      </nav>
      <nav aria-label="Official resources">
        <h3 class="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Official Resources</h3>
        <ul class="space-y-2.5 text-sm">
          ${each(
            [
              ['AWS Documentation', 'https://docs.aws.amazon.com'],
              ['Google Cloud Docs', 'https://cloud.google.com/docs'],
              ['Azure Learn', 'https://learn.microsoft.com/azure'],
              ['Oracle Cloud Docs', 'https://docs.oracle.com/en-us/iaas'],
            ],
            ([l, h]) => `<li>${ext(h, l, 'text-muted-foreground hover:text-foreground')}</li>`,
          )}
        </ul>
      </nav>
    </div>
  </div>
  <div class="border-t border-border/30 bg-secondary/10 px-4 py-6 text-center text-xs text-muted-foreground">
    <p>Information is based on publicly available data and may change. Always verify with official provider documentation.</p>
    <p class="mt-3">AWS, Google Cloud, Microsoft Azure, Oracle Cloud, and IBM Cloud are trademarks of their respective owners.</p>
  </div>
</footer>`;

export const homeMarkup = (lang: LanguageMeta) => `
<div class="relative min-h-screen">
  <div aria-hidden="true" class="app-bg"></div>
  ${homeNav(lang)}
  <main>
    ${hero()}
    ${providersSection(lang)}
    ${comparisonSection()}
    ${pricingSection()}
    ${creditsSection()}
    ${techStackSection()}
    ${recommendationsSection()}
    ${benefitsSection()}
  </main>
  ${footer()}
</div>`;

// ---- provider page -----------------------------------------------------------

const check = (ok: boolean | undefined) => (ok ? 'Required' : 'Not required');

export const providerMarkup = (p: CloudProvider, lang: LanguageMeta) => {
  const home = localizedPath('/', lang.code);
  const t = p.freeTier;
  const tierRows: [string, [string, string | undefined][]][] = [
    ['Compute', [['Name', t.compute.name], ['Specs', t.compute.specs], ['Duration', t.compute.duration], ['Notes', t.compute.notes]]],
    ...(t.serverless
      ? ([['Serverless', [['Name', t.serverless.name], ['Specs', t.serverless.specs], ['Notes', t.serverless.notes]]]] as [string, [string, string][]][])
      : []),
    ['Storage', [['Object', t.storage.object], ['Disk', t.storage.disk], ['Notes', t.storage.notes]]],
    ['Database', [['Offerings', t.database.offerings.join(' · ')], ['Notes', t.database.notes]]],
    ['Networking', [['Egress', t.networking.egress], ['Notes', t.networking.notes]]],
  ];

  return `
<div class="min-h-screen relative">
  <div aria-hidden="true" class="app-bg"></div>
  <nav class="sticky top-0 z-50 glass-nav" aria-label="Breadcrumb">
    <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-3">
      <ol class="flex items-center gap-2 text-muted-foreground">
        <li><a href="${home}" class="hover:text-foreground">RunRateHost</a></li>
        <li aria-hidden="true">›</li>
        <li><a href="${home}#providers" class="hover:text-foreground">Providers</a></li>
        <li aria-hidden="true">›</li>
        <li aria-current="page" class="text-foreground">${esc(p.shortName)}</li>
      </ol>
      ${ext(p.signupUrl, `Sign Up for ${esc(p.shortName)}`, `inline-flex h-10 items-center rounded-md px-4 text-sm font-medium ${p.gradientClass} text-white`)}
    </div>
  </nav>
  <main class="max-w-7xl mx-auto px-4 py-8 space-y-8">
    <section class="relative glass-card rounded-3xl p-8 md:p-12">
      <div class="flex flex-col md:flex-row items-start gap-6">
        <div class="p-6 rounded-3xl ${p.gradientClass} shadow-2xl">${cloudIcon(p.id, 64, 'text-white')}</div>
        <div class="flex-1">
          <h1 class="mb-2 text-3xl md:text-4xl font-bold ${p.colorClass}">${esc(p.name)}</h1>
          <p class="text-lg text-muted-foreground mb-4">${esc(p.tagline)}</p>
          <blockquote class="pl-4 border-l-2 border-primary/50 text-sm italic text-muted-foreground">“${esc(p.metaphor)}”</blockquote>
        </div>
        <dl class="flex flex-col gap-3 min-w-[200px]">
          <div class="p-4 rounded-xl ${p.gradientClass} text-white"><dt class="text-xs uppercase tracking-wider opacity-80">Free Credits</dt><dd class="text-2xl font-bold">${esc(p.freeCredits)}</dd></div>
          <div class="p-4 rounded-xl bg-secondary/50 border border-border/30"><dt class="text-xs uppercase tracking-wider text-muted-foreground">Duration</dt><dd class="font-bold">${esc(p.creditDuration)}</dd></div>
        </dl>
      </div>
      <p class="mt-8 text-base leading-relaxed text-muted-foreground">${esc(p.description)}</p>
    </section>

    <section class="glass-card rounded-2xl p-6">
      <h2 class="text-xl font-bold mb-2">${esc(p.shortName)} Signup Walkthrough</h2>
      <p class="text-sm text-muted-foreground mb-6">Step-by-step guide to create your ${esc(p.shortName)} account</p>
      <ol class="space-y-4">
        ${each(getSignupSteps(p), (s, i) => `
        <li class="rounded-xl bg-secondary/30 p-4">
          <h3 class="font-bold">Step ${i + 1}: ${esc(s.title)}</h3>
          <p class="text-sm text-muted-foreground">${esc(s.description)}</p>
          ${s.warning ? `<p class="mt-2 text-sm text-yellow-800">${esc(s.warning)}</p>` : ''}
          <ul class="mt-2 list-disc pl-5 text-sm">${each(s.tips, (tip) => `<li>${esc(tip)}</li>`)}</ul>
        </li>`)}
      </ol>
    </section>

    <div class="grid md:grid-cols-2 gap-6">
      <section class="glass-card rounded-2xl p-6">
        <h2 class="text-xl font-bold mb-6">Account Requirements</h2>
        <dl class="space-y-3 mb-4">
          ${each(
            [
              ['Email', p.requirements.email],
              ['Phone Verification', p.requirements.phone],
              ['Credit Card', p.requirements.creditCard],
              ['Government ID', p.requirements.governmentId],
            ] as const,
            ([label, v]) => `<div class="flex items-center justify-between p-3 rounded-lg bg-secondary/30"><dt class="text-sm">${label}</dt><dd class="text-sm">${check(v)}</dd></div>`,
          )}
        </dl>
        <p class="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-xs text-yellow-700">${esc(p.requirements.notes)}</p>
      </section>
      <section class="glass-card rounded-2xl p-6">
        <h2 class="text-xl font-bold mb-6">Fit Analysis</h2>
        <h3 class="text-xs font-semibold uppercase tracking-wider text-green-500 mb-2">Best For</h3>
        <ul class="space-y-2 mb-4 text-sm">${each(p.bestFor, (x) => `<li>✓ ${esc(x)}</li>`)}</ul>
        <h3 class="text-xs font-semibold uppercase tracking-wider text-red-500 mb-2">Not Ideal For</h3>
        <ul class="space-y-2 text-sm text-muted-foreground">${each(p.notIdealFor, (x) => `<li>✗ ${esc(x)}</li>`)}</ul>
      </section>
    </div>

    <section class="glass-card rounded-2xl p-6">
      <h2 class="text-xl font-bold mb-6">Free Tier Details</h2>
      <div class="space-y-4">
        ${each(tierRows, ([label, rows]) => `
        <div class="border rounded-xl px-4 py-4 border-border/50 bg-secondary/20">
          <h3 class="font-semibold mb-2">${label}</h3>
          <dl class="space-y-1 text-sm">${each(rows.filter(([, v]) => v), ([k, v]) => `<div class="flex gap-2"><dt class="min-w-[80px] text-xs uppercase tracking-wider text-muted-foreground">${k}:</dt><dd>${esc(v!)}</dd></div>`)}</dl>
        </div>`)}
      </div>
    </section>

    <div class="grid md:grid-cols-2 gap-6">
      <section class="glass-card rounded-2xl p-6">
        <h2 class="text-xl font-bold mb-4 text-green-500">Strengths</h2>
        <ul class="space-y-3 text-sm">${each(p.strengths, (x) => `<li class="p-3 rounded-lg bg-green-500/10 border border-green-500/20">${esc(x)}</li>`)}</ul>
      </section>
      <section class="glass-card rounded-2xl p-6">
        <h2 class="text-xl font-bold mb-4 text-red-500">Limitations</h2>
        <ul class="space-y-3 text-sm">${each(p.limitations, (x) => `<li class="p-3 rounded-lg bg-red-500/10 border border-red-500/20">${esc(x)}</li>`)}</ul>
      </section>
    </div>

    <section class="relative rounded-2xl p-8 ${p.gradientClass}">
      <h2 class="text-xl font-bold text-white mb-4">Engineer's Take</h2>
      <blockquote class="text-lg leading-relaxed text-white/90 italic">“${esc(p.engineerTake)}”</blockquote>
    </section>

    <section class="text-center py-12">
      <h2 class="text-2xl md:text-3xl font-bold mb-4">Ready to get started with <span class="${p.colorClass}">${esc(p.name)}</span>?</h2>
      <p class="text-muted-foreground mb-8 max-w-2xl mx-auto">Use our signup walkthrough above, then come back to compare with other providers.</p>
      <div class="flex flex-wrap items-center justify-center gap-4">
        ${ext(p.signupUrl, `Create ${esc(p.shortName)} Account`, `inline-flex h-11 items-center rounded-md px-8 ${p.gradientClass} text-white`)}
        <a href="${home}#providers" class="inline-flex h-11 items-center rounded-md border px-8">Compare All Providers</a>
      </div>
    </section>
  </main>
</div>`;
};

export const notFoundMarkup = () => `
<div class="flex min-h-screen items-center justify-center bg-muted">
  <div class="text-center">
    <h1 class="mb-4 text-4xl font-bold">404</h1>
    <p class="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
    <a href="/" class="text-primary underline hover:text-primary/90">Return to Home</a>
  </div>
</div>`;
