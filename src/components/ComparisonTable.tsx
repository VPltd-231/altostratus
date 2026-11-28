import { FC, useState } from 'react';
import { m } from 'framer-motion';
import { Check, X, Minus } from 'lucide-react';
import { cloudProviders } from '@/data/cloudProviders';
import {
  COMPARISON_CATEGORIES as categories,
  COMPARISON_DATA as comparisonData,
  COMPARISON_PROVIDER_IDS as providerIds,
  type ComparisonCategory,
} from '@/data/content';
import { CloudIcon } from './CloudIcon';


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
