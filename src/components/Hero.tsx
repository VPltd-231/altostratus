import { Cloud, Server, Database, Shield, Zap, ArrowDown } from 'lucide-react';
import { CloudIcon } from './CloudIcon';
import { Button } from './ui/button';
import type { ProviderId } from '@/data/cloudProviders';

const BADGES = [
  { icon: Server, label: 'Compute' },
  { icon: Database, label: 'Databases' },
  { icon: Shield, label: 'Security' },
  { icon: Zap, label: 'Serverless' },
] as const;

const LOGOS: { id: ProviderId; color: string; name: string }[] = [
  { id: 'aws', color: 'text-aws', name: 'AWS' },
  { id: 'gcp', color: 'text-gcp', name: 'Google Cloud' },
  { id: 'azure', color: 'text-azure', name: 'Microsoft Azure' },
  { id: 'oracle', color: 'text-oracle', name: 'Oracle Cloud' },
  { id: 'ibm', color: 'text-ibm', name: 'IBM Cloud' },
];

const scrollToPricing = () => {
  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
};

/**
 * Above-the-fold content renders immediately: no opacity-0 start state and no
 * scroll-linked transforms, so the largest paint is never held back by JS.
 */
export const Hero = () => (
  <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4 py-20">
    <div
      aria-hidden
      className="absolute inset-0 opacity-20 [background-image:linear-gradient(hsl(var(--primary)/0.1)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--primary)/0.1)_1px,transparent_1px)] [background-size:50px_50px]"
    />

    <div className="relative z-10 mx-auto max-w-5xl text-center">
      <div className="mb-6 flex items-center justify-center gap-3">
        <Cloud className="h-10 w-10 text-primary" aria-hidden />
        <span className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
          RunRateHost · Cloud Cost Intelligence
        </span>
      </div>

      <h1 className="mb-6 text-4xl font-extrabold leading-tight sm:text-5xl md:text-7xl">
        <span className="gradient-text">Save On Your</span>
        <br />
        <span className="inline-block rounded-b-md border-b border-l border-r border-primary/20 bg-gradient-to-r from-sky-500 via-blue-400 to-indigo-500 bg-clip-text px-2 pb-1 pl-1 text-transparent">
          Cloud Hosting
          <br />
          Infrastructure
        </span>
      </h1>

      <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
        RunRateHost benchmarks AWS, Google Cloud, Azure, Oracle, and IBM side-by-side — uncover
        free tiers, hidden fees, and the fastest path to a lower monthly run-rate.
      </p>

      <Button
        onClick={scrollToPricing}
        size="lg"
        className="group mb-10 bg-gradient-to-r from-primary to-primary/80 px-8 py-6 text-lg font-semibold text-primary-foreground shadow-lg transition-shadow hover:shadow-xl"
      >
        Get Started
        <ArrowDown className="ml-2 h-5 w-5 transition-transform group-hover:translate-y-1" aria-hidden />
      </Button>

      <ul className="mb-10 flex flex-wrap justify-center gap-3">
        {BADGES.map(({ icon: Icon, label }) => (
          <li key={label} className="glass-card flex items-center gap-2 rounded-full px-4 py-2">
            <Icon className="h-4 w-4 text-primary" aria-hidden />
            <span className="text-sm font-medium">{label}</span>
          </li>
        ))}
      </ul>

      <ul className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
        {LOGOS.map(({ id, color, name }) => (
          <li
            key={id}
            className={`${color} opacity-60 transition-opacity duration-300 hover:opacity-100`}
            title={name}
          >
            <CloudIcon provider={id} size={36} />
            <span className="sr-only">{name}</span>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
