import { FC, useMemo, useState } from 'react';
import { Calculator, DollarSign, Server, HardDrive, Wifi, Database, Code, Zap, type LucideIcon } from 'lucide-react';
import { Slider } from './ui/slider';
import { CloudIcon } from './CloudIcon';
import { INITIAL_USAGE, USAGE_FIELDS, estimateAll, type Usage, type UsageId } from '@/data/pricing';

const FIELD_ICONS: Record<UsageId, LucideIcon> = {
  compute: Server,
  storage: HardDrive,
  bandwidth: Wifi,
  database: Database,
  functions: Code,
  api: Zap,
};

export const PricingCalculator: FC = () => {
  const [usage, setUsage] = useState<Usage>(INITIAL_USAGE);

  const estimates = useMemo(() => estimateAll(usage), [usage]);
  const lowestPrice = estimates[0].monthly;

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <div className="glass-card mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2">
            <Calculator className="h-4 w-4 text-primary" aria-hidden />
            <span className="text-sm font-medium">Interactive Tool</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            <span className="gradient-text">Pricing</span> Calculator
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Estimate your monthly cloud costs across all providers. Adjust the sliders to match your expected usage.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="glass-card rounded-2xl p-6 sm:p-8">
            <div className="space-y-8">
              {USAGE_FIELDS.map((field) => {
                const Icon = FIELD_ICONS[field.id];
                return (
                  <div key={field.id}>
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`rounded-lg p-2 ${field.iconBg}`}>
                          <Icon className={`h-5 w-5 ${field.iconColor}`} aria-hidden />
                        </div>
                        <span className="font-semibold">{field.label}</span>
                      </div>
                      <span className={`text-2xl font-bold ${field.iconColor}`}>
                        {usage[field.id]}
                        <span className="text-sm text-muted-foreground">{field.unit}</span>
                      </span>
                    </div>
                    <Slider
                      value={[usage[field.id]]}
                      onValueChange={([value]) => setUsage((prev) => ({ ...prev, [field.id]: value }))}
                      min={field.min}
                      max={field.max}
                      step={field.step}
                      aria-label={field.label}
                      className="w-full"
                    />
                    <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                      <span>0</span>
                      <span>{field.maxLabel}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 sm:p-8">
            <h3 className="mb-6 flex items-center gap-2 text-xl font-bold">
              <DollarSign className="h-5 w-5 text-primary" aria-hidden />
              Estimated Monthly Costs
            </h3>

            <ol className="space-y-4" aria-live="polite">
              {estimates.map((est) => {
                const isLowest = est.monthly === lowestPrice;
                return (
                  <li
                    key={est.id}
                    className={`rounded-xl border p-4 transition-colors duration-300 ${
                      isLowest
                        ? 'border-primary/50 bg-primary/10'
                        : 'border-border/50 bg-secondary/50 hover:border-border'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`rounded-lg p-2 gradient-${est.id}`}>
                          <CloudIcon provider={est.id} size={20} className="text-white" />
                        </div>
                        <div>
                          <p className="font-semibold">{est.provider}</p>
                          {est.savings && <p className="text-xs text-muted-foreground">{est.savings}</p>}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-xl font-bold ${isLowest ? 'text-primary' : ''}`}>${est.monthly.toFixed(2)}</p>
                        {isLowest && (
                          <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
                            Lowest estimate
                          </span>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              * Estimates are illustrative, based on simplified list prices. Actual costs vary by region, instance type
              and usage patterns. Always check the provider's own calculator.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
