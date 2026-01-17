import { FC } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Clock, CreditCard, ExternalLink } from 'lucide-react';
import { CloudProvider } from '@/data/cloudProviders';
import { CloudIcon } from './CloudIcon';
import { Button } from './ui/button';

interface ProviderCardProps {
  provider: CloudProvider;
  index: number;
  onSelect: (id: string) => void;
}

export const ProviderCard: FC<ProviderCardProps> = ({ provider, index, onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <div className={`glass-card rounded-2xl p-6 h-full transition-all duration-300 hover:${provider.glowClass} hover:border-${provider.id}/30`}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl ${provider.gradientClass}`}>
            <CloudIcon provider={provider.id as any} size={32} className="text-white" />
          </div>
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
            {provider.shortName}
          </span>
        </div>

        {/* Title */}
        <h3 className={`text-2xl font-bold mb-2 ${provider.colorClass}`}>
          {provider.name}
        </h3>
        <p className="text-sm text-muted-foreground italic mb-4">
          "{provider.tagline}"
        </p>

        {/* Quick stats */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-sm">
            <CreditCard className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Free Credits:</span>
            <span className="font-semibold">{provider.freeCredits}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Duration:</span>
            <span className="font-semibold">{provider.creditDuration}</span>
          </div>
        </div>

        {/* Key strength highlight */}
        <div className="p-3 rounded-lg bg-secondary/50 mb-6">
          <p className="text-xs text-muted-foreground mb-1">Top Strength</p>
          <p className="text-sm font-medium">{provider.strengths[0]}</p>
        </div>

        {/* Action button */}
        <Button
          onClick={() => onSelect(provider.id)}
          className={`w-full group/btn ${provider.gradientClass} border-0 text-white hover:opacity-90`}
        >
          <span>View Details</span>
          <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </div>
    </motion.div>
  );
};
