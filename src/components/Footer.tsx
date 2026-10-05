import { FC } from 'react';
import {
  Cloud, Shield, Globe, BookOpen, Calculator, Scale, ArrowUpRight, Heart,
} from 'lucide-react';
import { cloudProviders } from '@/data/cloudProviders';
import { languages } from '@/lib/languages';

const footerFeatures = [
  {
    icon: Scale,
    title: 'Side-by-Side Comparison',
    desc: 'Free tiers, sign-up requirements and trade-offs for each provider in one place',
  },
  {
    icon: Calculator,
    title: 'Cost Estimator',
    desc: 'Rough monthly spend across providers from your own usage numbers',
  },
  {
    icon: Shield,
    title: 'Plain-English Guidance',
    desc: 'Strengths, limitations and an engineer’s take on every platform',
  },
  {
    icon: Globe,
    title: 'Your Language',
    desc: `Browse in ${languages.length} languages, translated on demand`,
  },
];

const quickLinks = [
  { label: 'Provider Comparison', href: '#providers' },
  { label: 'Pricing Calculator', href: '#pricing' },
  { label: 'Cloud Credits Guide', href: '#credits' },
  { label: 'Pro Tips', href: '#recommendations' },
];

const resourceLinks = [
  { label: 'AWS Documentation', href: 'https://docs.aws.amazon.com' },
  { label: 'Google Cloud Docs', href: 'https://cloud.google.com/docs' },
  { label: 'Azure Learn', href: 'https://learn.microsoft.com/azure' },
  { label: 'Oracle Cloud Docs', href: 'https://docs.oracle.com/en-us/iaas' },
];

const stats = [
  { value: String(cloudProviders.length), label: 'Cloud Providers' },
  { value: String(languages.length), label: 'Languages' },
];

export const Footer: FC = () => (
  <footer className="relative border-t border-border">
    <div className="bg-secondary/20 px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-2xl font-bold sm:text-3xl">
            Make Informed{' '}
            <span className="bg-gradient-to-r from-primary via-gcp to-azure bg-clip-text text-transparent">Choices</span>
          </h2>
          <p className="mx-auto max-w-lg text-sm text-muted-foreground">
            Data-driven insights to help you pick the right cloud infrastructure
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {footerFeatures.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="glass-card group rounded-xl border border-border/40 p-5 transition-colors duration-300 hover:border-primary/30"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                <Icon className="h-5 w-5 text-primary" aria-hidden />
              </div>
              <h3 className="mb-1.5 text-sm font-semibold text-foreground">{title}</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="border-t border-border/30 px-4 py-10">
      <dl className="mx-auto grid max-w-md grid-cols-2 gap-6 text-center">
        {stats.map((stat) => (
          <div key={stat.label}>
            <dd className="bg-gradient-to-r from-primary to-gcp bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl">
              {stat.value}
            </dd>
            <dt className="mt-1 text-xs font-medium text-muted-foreground">{stat.label}</dt>
          </div>
        ))}
      </dl>
    </div>

    <div className="border-t border-border/30 px-4 py-14">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-3">
        <div>
          <div className="mb-4 flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-gcp">
              <Cloud className="h-5 w-5 text-white" aria-hidden />
            </div>
            <span className="text-lg font-bold">RunRateHost</span>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            A cloud provider comparison tool for developers and startups who want to stretch their runway.
            Compare free tiers and estimate costs before you commit.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Quick Links</h3>
          <ul className="space-y-2.5">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group flex items-center gap-1.5 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                >
                  <span className="h-1 w-1 rounded-full bg-primary/50 transition-colors group-hover:bg-primary" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Official Resources</h3>
          <ul className="space-y-2.5">
            {resourceLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1.5 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                >
                  <BookOpen className="h-3.5 w-3.5 text-primary/50 transition-colors group-hover:text-primary" aria-hidden />
                  {link.label}
                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>

    <div className="border-t border-border/30 bg-secondary/10 px-4 py-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-center text-xs text-muted-foreground sm:text-left">
            Information is based on publicly available data and may change. Always verify with official provider documentation.
          </p>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            Built with <Heart className="inline h-3 w-3 fill-red-500 text-red-500" aria-hidden /> for the cloud community
          </p>
        </div>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          AWS, Google Cloud, Microsoft Azure, Oracle Cloud, and IBM Cloud are trademarks of their respective owners.
        </p>
      </div>
    </div>
  </footer>
);
