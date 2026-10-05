import { FC, useState } from 'react';
import { m } from 'framer-motion';
import { Check, X, Minus } from 'lucide-react';
import { cloudProviders } from '@/data/cloudProviders';
import { CloudIcon } from './CloudIcon';

type ComparisonCategory = 'compute' | 'storage' | 'database' | 'networking' | 'pricing';

interface ComparisonRow {
  feature: string;
  aws: string | boolean;
  gcp: string | boolean;
  azure: string | boolean;
  oracle: string | boolean;
  ibm: string | boolean;
  highlight?: string;
}

const comparisonData: Record<ComparisonCategory, ComparisonRow[]> = {
  compute: [
    { feature: 'Free VM Instance', aws: '750 hrs/mo (12 mo)', gcp: 'e2-micro (Always)', azure: '750 hrs/mo (12 mo)', oracle: '2 AMD + ARM 24GB', ibm: 'PaaS only', highlight: 'oracle' },
    { feature: 'Serverless Functions', aws: '1M/month', gcp: '2M/month', azure: '1M/month', oracle: 'Limited', ibm: 'Limited', highlight: 'gcp' },
    { feature: 'ARM Support', aws: true, gcp: true, azure: true, oracle: true, ibm: false },
    { feature: 'Always-on', aws: true, gcp: true, azure: true, oracle: true, ibm: false },
  ],
  storage: [
    { feature: 'Object Storage', aws: '5 GB', gcp: '5 GB', azure: '5 GB', oracle: 'Limited', ibm: 'Limited' },
    { feature: 'Block Storage', aws: '30 GB', gcp: '30 GB', azure: '64 GB', oracle: '200 GB', ibm: false, highlight: 'oracle' },
  ],
  database: [
    { feature: 'Managed SQL', aws: '750 hrs (12 mo)', gcp: false, azure: 'Limited DTUs', oracle: 'Always Free', ibm: 'Lite tier', highlight: 'oracle' },
    { feature: 'NoSQL', aws: '25 GB DynamoDB', gcp: 'Firestore', azure: 'Cosmos DB', oracle: false, ibm: 'Cloudant' },
  ],
  networking: [
    { feature: 'Outbound Data', aws: '1 GB/mo', gcp: '1 GB/mo', azure: '15 GB/mo', oracle: '10 TB/mo', ibm: 'None', highlight: 'oracle' },
    { feature: 'VPC Included', aws: true, gcp: true, azure: true, oracle: true, ibm: true },
  ],
  pricing: [
    { feature: 'Free Credits', aws: false, gcp: '$300', azure: '$200', oracle: '$300', ibm: false, highlight: 'gcp' },
    { feature: 'Credit Duration', aws: '-', gcp: '90 days', azure: '30 days', oracle: '30 days', ibm: '-', highlight: 'gcp' },
    { feature: 'Always Free Tier', aws: 'Limited', gcp: true, azure: 'Limited', oracle: true, ibm: true, highlight: 'oracle' },
    { feature: 'No Auto-Upgrade', aws: false, gcp: true, azure: false, oracle: true, ibm: true },
  ],
};

const categories: { id: ComparisonCategory; label: string }[] = [
  { id: 'compute', label: 'Compute' },
  { id: 'storage', label: 'Storage' },
  { id: 'database', label: 'Database' },
  { id: 'networking', label: 'Networking' },
  { id: 'pricing', label: 'Pricing' },
];

const renderCell = (value: string | boolean, providerId: string, isHighlight: boolean) => {
  if (typeof value === 'boolean') {
    return value ? (
      <Check className={`w-5 h-5 mx-auto ${isHighlight ? 'text-green-400' : 'text-green-500'}`} />
    ) : (
      <X className="w-5 h-5 mx-auto text-red-500/50" />
    );
  }
  
  if (value === '-' || value === 'None' || value === 'Limited') {
    return <span className="text-muted-foreground">{value}</span>;
  }
  
  return <span className={isHighlight ? 'font-semibold text-foreground' : ''}>{value}</span>;
};

export const ComparisonTable: FC = () => {
  const [activeCategory, setActiveCategory] = useState<ComparisonCategory>('compute');
  const providerIds = ['aws', 'gcp', 'azure', 'oracle', 'ibm'] as const;

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">Platform</span> Comparison
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Compare free tier offerings across all major cloud providers at a glance.
          </p>
        </m.div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary hover:bg-secondary/80 text-muted-foreground'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Table */}
        <m.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-semibold">Feature</th>
                  {providerIds.map((id) => {
                    const provider = cloudProviders.find(p => p.id === id)!;
                    return (
                      <th key={id} className="p-4 text-center min-w-[120px]">
                        <div className="flex flex-col items-center gap-2">
                          <div className={`p-2 rounded-lg ${provider.gradientClass}`}>
                            <CloudIcon provider={id} size={24} className="text-white" />
                          </div>
                          <span className="text-xs font-medium">{provider.shortName}</span>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {comparisonData[activeCategory].map((row, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="p-4 font-medium">{row.feature}</td>
                    {providerIds.map((id) => {
                      const isHighlight = row.highlight === id;
                      return (
                        <td 
                          key={id} 
                          className={`p-4 text-center text-sm ${
                            isHighlight ? 'bg-primary/10' : ''
                          }`}
                        >
                          {renderCell(row[id], id, isHighlight)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </m.div>

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-500" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <X className="w-4 h-4 text-red-500/50" />
            <span>Not Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-primary/20" />
            <span>Best in Class</span>
          </div>
        </div>
      </div>
    </section>
  );
};
