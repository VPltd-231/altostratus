import { FC } from 'react';
import { Link } from 'react-router-dom';
import { m } from 'framer-motion';
import { ChevronRight, Clock, CreditCard, Quote, Server, Database, HardDrive, Wifi, ExternalLink } from 'lucide-react';
import { CloudProvider } from '@/data/cloudProviders';
import { CloudIcon } from './CloudIcon';
import { Button } from './ui/button';
import { useLanguage } from '@/hooks/use-language';
import { localizedPath } from '@/lib/languages';

interface ProviderCardProps {
  provider: CloudProvider;
  index: number;
}

const specItems = [
  { key: 'compute', icon: Server, label: 'Compute' },
  { key: 'storage', icon: HardDrive, label: 'Storage' },
  { key: 'database', icon: Database, label: 'Database' },
  { key: 'networking', icon: Wifi, label: 'Network' },
];

type TierValue = Record<string, unknown> | undefined;

/** Picks the most informative one-line summary of a free-tier entry. */
const summarise = (tier: TierValue): string => {
  if (!tier) return 'N/A';
  for (const key of ['specs', 'object', 'egress']) {
    const value = tier[key];
    if (typeof value === 'string') return value;
  }
  return 'Available';
};

export const ProviderCard: FC<ProviderCardProps> = ({ provider, index }) => {
  const { language } = useLanguage();
  // Cap the cascade so later cards don't feel sluggish
  const enterDelay = Math.min(index, 5) * 0.06;

  return (
    <m.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35, delay: enterDelay, ease: [0.22, 1, 0.36, 1] }}
      className="group h-full"
    >
      <div
        className="relative h-full rounded-3xl transition-[transform,box-shadow] duration-300 ease-out group-hover:-translate-y-1.5 group-hover:shadow-2xl"
      >
        {/* Color-coded glow: only exists while hovered, so idle cards carry no blur layer */}
        <div
          aria-hidden
          className={`absolute -inset-[2px] hidden rounded-3xl opacity-0 blur-xl transition-opacity duration-500 md:group-hover:block md:group-hover:opacity-60 ${provider.gradientClass}`}
        />

        {/* Main card */}
        <div className="relative glass-card rounded-3xl p-7 h-full overflow-hidden border border-border/50 group-hover:border-transparent transition-colors duration-300">
          {/* Top color bar */}
          <div className={`absolute top-0 left-0 right-0 h-1 ${provider.gradientClass}`} />

          {/* Brand tint - static */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.04] group-hover:opacity-[0.10] transition-opacity duration-500"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 15%, ${provider.brandColor} 0%, transparent 55%)`,
            }}
          />

          {/* Header */}
          <div className="relative flex items-center gap-4 mb-6 pb-5 border-b border-border/30">
            <div
              className={`p-4 rounded-2xl ${provider.gradientClass} shadow-md transition-transform duration-300 group-hover:scale-105 group-hover:rotate-[-3deg]`}
            >
              <CloudIcon provider={provider.id} size={36} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className={`text-xl font-bold ${provider.colorClass} truncate`}>
                  {provider.name}
                </h3>
                <span
                  className={`text-[10px] font-mono px-2 py-1 rounded-md ${provider.gradientClass} text-white uppercase tracking-widest shrink-0`}
                >
                  {provider.shortName}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1 truncate">{provider.tagline}</p>
            </div>
          </div>

          {/* Description */}
          <div className="relative mb-6">
            <Quote className={`absolute -top-1 -left-1 w-6 h-6 ${provider.colorClass} opacity-30`} />
            <div className="pl-6 pr-2">
              <p className="text-sm leading-relaxed italic text-muted-foreground">
                <span className={`font-medium ${provider.colorClass}`}>"</span>
                {provider.description}
                <span className={`font-medium ${provider.colorClass}`}>"</span>
              </p>
            </div>
          </div>

          {/* Credits strip */}
          <div
            className={`flex items-center gap-4 mb-6 p-3 rounded-xl bg-secondary/40 border border-border/30 transition-colors duration-300 group-hover:bg-secondary/60`}
          >
            <div className="flex items-center gap-2 text-xs">
              <CreditCard className={`w-4 h-4 ${provider.colorClass}`} />
              <span className="text-muted-foreground">Credits:</span>
              <span className="font-bold">{provider.freeCredits}</span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-2 text-xs">
              <Clock className={`w-4 h-4 ${provider.colorClass}`} />
              <span className="font-bold">{provider.creditDuration}</span>
            </div>
          </div>

          {/* Specs grid - CSS transitions only */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            {specItems.map((spec) => {
              const displayValue = summarise(
                provider.freeTier[spec.key as keyof typeof provider.freeTier] as TierValue,
              );

              return (
                <div
                  key={spec.key}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-secondary/30 border border-border/40 hover:border-border transition-colors duration-200"
                >
                  <spec.icon className={`w-3.5 h-3.5 ${provider.colorClass} shrink-0`} />
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                      {spec.label}
                    </p>
                    <p className="text-xs font-medium truncate">{displayValue}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="relative z-10 flex gap-2">
            <Button
              asChild
              className={`flex-1 group/btn ${provider.gradientClass} border-0 text-white hover:opacity-90 shadow-md cursor-pointer`}
            >
              <Link to={localizedPath(`/provider/${provider.id}`, language.code)}>
                <span>Explore</span>
                <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="group/signup border-2 hover:bg-secondary transition-colors cursor-pointer"
            >
              <a href={provider.signupUrl} target="_blank" rel="noopener noreferrer">
                <span className="hidden sm:inline">Sign Up</span>
                <ExternalLink className="w-4 h-4 sm:ml-1 transition-transform group-hover/signup:rotate-12" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </m.div>
  );
};
