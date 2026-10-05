import type { ProviderId } from './cloudProviders';

export type UsageId = 'compute' | 'storage' | 'bandwidth' | 'database' | 'functions' | 'api';
export type Usage = Record<UsageId, number>;

export interface UsageField {
  id: UsageId;
  label: string;
  /** Unit shown next to the live value, e.g. "GB". */
  unit: string;
  /** Label for the slider's upper bound. */
  maxLabel: string;
  min: number;
  max: number;
  step: number;
  initial: number;
  /** Full class strings so Tailwind can see them. */
  iconBg: string;
  iconColor: string;
}

export const USAGE_FIELDS: UsageField[] = [
  { id: 'compute', label: 'Compute Hours', unit: '/mo', maxLabel: '2,000 hrs', min: 0, max: 2000, step: 10, initial: 200, iconBg: 'bg-primary/20', iconColor: 'text-primary' },
  { id: 'storage', label: 'Storage', unit: ' GB', maxLabel: '500 GB', min: 0, max: 500, step: 5, initial: 50, iconBg: 'bg-gcp/20', iconColor: 'text-gcp' },
  { id: 'bandwidth', label: 'Bandwidth', unit: ' GB', maxLabel: '1,000 GB', min: 0, max: 1000, step: 10, initial: 100, iconBg: 'bg-azure/20', iconColor: 'text-azure' },
  { id: 'database', label: 'Database', unit: ' GB', maxLabel: '200 GB', min: 0, max: 200, step: 5, initial: 20, iconBg: 'bg-oracle/20', iconColor: 'text-oracle' },
  { id: 'functions', label: 'Functions', unit: 'M inv', maxLabel: '10M invocations', min: 0, max: 10, step: 0.5, initial: 1, iconBg: 'bg-purple-500/20', iconColor: 'text-purple-500' },
  { id: 'api', label: 'API Requests', unit: 'K/mo', maxLabel: '1M requests', min: 0, max: 1000, step: 10, initial: 100, iconBg: 'bg-emerald-500/20', iconColor: 'text-emerald-500' },
];

export const INITIAL_USAGE = Object.fromEntries(USAGE_FIELDS.map((f) => [f.id, f.initial])) as Usage;

interface ProviderPricing {
  name: string;
  /** Illustrative unit prices (USD) per usage unit. */
  rate: Usage;
  /** Free allowance per usage type, subtracted before pricing. */
  free: Partial<Usage>;
  note: (usage: Usage) => string;
}

/** Simplified, illustrative pricing. Verify against each provider's price list. */
export const PRICING: Record<ProviderId, ProviderPricing> = {
  aws: {
    name: 'AWS',
    rate: { compute: 0.0116, storage: 0.023, bandwidth: 0.09, database: 0.115, functions: 0.2, api: 0.0035 },
    free: {},
    note: (u) => (u.compute <= 750 ? 'Free tier covers compute!' : ''),
  },
  gcp: {
    name: 'GCP',
    rate: { compute: 0.0104, storage: 0.02, bandwidth: 0.12, database: 0.1, functions: 0.16, api: 0.003 },
    free: {},
    note: () => '$300 credits available',
  },
  azure: {
    name: 'Azure',
    rate: { compute: 0.0114, storage: 0.0184, bandwidth: 0.087, database: 0.12, functions: 0.18, api: 0.0036 },
    free: {},
    note: () => '$200 credits available',
  },
  oracle: {
    name: 'Oracle',
    rate: { compute: 0.015, storage: 0.0255, bandwidth: 0.0085, database: 0.095, functions: 0.2, api: 0.003 },
    // 10 TB/month of outbound transfer is free, more than the slider can reach.
    free: { bandwidth: 10000 },
    note: () => '10TB bandwidth FREE!',
  },
  ibm: {
    name: 'IBM',
    rate: { compute: 0.02, storage: 0.03, bandwidth: 0.09, database: 0.13, functions: 0.25, api: 0.004 },
    free: {},
    note: () => 'Lite tier available',
  },
};

export interface PricingEstimate {
  id: ProviderId;
  provider: string;
  monthly: number;
  savings: string;
}

export const estimate = (id: ProviderId, usage: Usage): number => {
  const { rate, free } = PRICING[id];
  return (Object.keys(rate) as UsageId[]).reduce(
    (sum, key) => sum + Math.max(0, usage[key] - (free[key] ?? 0)) * rate[key],
    0,
  );
};

/** All providers, cheapest first. */
export const estimateAll = (usage: Usage): PricingEstimate[] =>
  (Object.keys(PRICING) as ProviderId[])
    .map((id) => ({
      id,
      provider: PRICING[id].name,
      monthly: estimate(id, usage),
      savings: PRICING[id].note(usage),
    }))
    .sort((a, b) => a.monthly - b.monthly);
