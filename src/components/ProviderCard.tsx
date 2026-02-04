import { FC } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Clock, CreditCard, Quote, Server, Database, HardDrive, Wifi, ExternalLink } from 'lucide-react';
import { CloudProvider } from '@/data/cloudProviders';
import { CloudIcon } from './CloudIcon';
import { Button } from './ui/button';

interface ProviderCardProps {
  provider: CloudProvider;
  index: number;
  onSelect: (id: string) => void;
}

const specItems = [
  { key: 'compute', icon: Server, label: 'Compute' },
  { key: 'storage', icon: HardDrive, label: 'Storage' },
  { key: 'database', icon: Database, label: 'Database' },
  { key: 'networking', icon: Wifi, label: 'Network' },
];

export const ProviderCard: FC<ProviderCardProps> = ({ provider, index, onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
      className="group"
    >
      {/* Card Container */}
      <motion.div
        whileHover={{ 
          scale: 1.02,
          y: -4
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative h-full"
      >
        {/* Backdrop glow effect */}
        <div 
          className={`absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl ${provider.gradientClass}`}
        />
        
        {/* Main card */}
        <div 
          className={`relative glass-card rounded-3xl p-7 h-full border-2 border-transparent transition-all duration-500 group-hover:border-${provider.id}/40 overflow-hidden shadow-lg hover:shadow-xl`}
        >
          {/* Background pattern */}
          <div 
            className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500"
            style={{
              backgroundImage: `radial-gradient(circle at 30% 20%, ${provider.brandColor}40 0%, transparent 50%)`,
            }}
          />

          {/* Header - Reframed */}
          <div className="relative flex items-center gap-4 mb-6 pb-5 border-b border-border/30">
            <motion.div 
              className={`p-4 rounded-2xl ${provider.gradientClass} shadow-lg`}
              whileHover={{ rotate: [0, -10, 10, -5, 0] }}
              transition={{ duration: 0.5 }}
            >
              <CloudIcon provider={provider.id as any} size={36} className="text-white" />
            </motion.div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className={`text-xl font-bold ${provider.colorClass}`}>
                  {provider.name}
                </h3>
                <span className={`text-[10px] font-mono px-2 py-1 rounded-md ${provider.gradientClass} text-white uppercase tracking-widest`}>
                  {provider.shortName}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {provider.tagline}
              </p>
            </div>
          </div>

          {/* Quote Description - 2-4 sentences with highlighted italic */}
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

          {/* Quick credits info */}
          <div className="flex items-center gap-4 mb-6 p-3 rounded-xl bg-secondary/40 border border-border/30">
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

          {/* Animated Specs List */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            {specItems.map((spec, i) => {
              const freeTierKey = spec.key as keyof typeof provider.freeTier;
              const tierData = provider.freeTier[freeTierKey];
              const displayValue = tierData 
                ? (typeof tierData === 'object' && 'specs' in tierData 
                    ? tierData.specs 
                    : typeof tierData === 'object' && 'object' in tierData 
                      ? tierData.object 
                      : typeof tierData === 'object' && 'egress' in tierData
                        ? tierData.egress
                        : 'Available')
                : 'N/A';

              return (
                <motion.div
                  key={spec.key}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + i * 0.08, duration: 0.4 }}
                  whileHover={{ scale: 1.03, x: 3 }}
                  className={`flex items-center gap-2 p-2.5 rounded-lg bg-secondary/30 border border-transparent hover:border-${provider.id}/30 transition-all duration-300 cursor-default`}
                >
                  <spec.icon className={`w-3.5 h-3.5 ${provider.colorClass} shrink-0`} />
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{spec.label}</p>
                    <p className="text-xs font-medium truncate">{displayValue}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <Button
              asChild
              className={`flex-1 group/btn ${provider.gradientClass} border-0 text-white hover:opacity-90 shadow-lg`}
            >
              <a href={provider.exploreUrl} target="_blank" rel="noopener noreferrer">
                <span>Explore</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className={`group/signup border-2 hover:${provider.gradientClass} hover:text-white hover:border-transparent transition-all duration-300`}
            >
              <a href={provider.signupUrl} target="_blank" rel="noopener noreferrer">
                <span className="hidden sm:inline">Sign Up</span>
                <ExternalLink className="w-4 h-4 sm:ml-1 group-hover/signup:rotate-12 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
