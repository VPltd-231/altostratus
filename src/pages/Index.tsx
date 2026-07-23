import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Layers } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { ProviderCard } from '@/components/ProviderCard';
import { ProviderDetails } from '@/components/ProviderDetails';
import { ComparisonTable } from '@/components/ComparisonTable';
import { Footer } from '@/components/Footer';
import { CloudArchitecture } from '@/components/CloudArchitecture';
import { PricingCalculator } from '@/components/PricingCalculator';
import { CreditsHardSell } from '@/components/CreditsHardSell';
import { CustomerBenefits } from '@/components/CustomerBenefits';
import { cloudProviders, CloudProvider } from '@/data/cloudProviders';

const Index = () => {
  const [selectedProvider, setSelectedProvider] = useState<CloudProvider | null>(null);
  const [stackOpen, setStackOpen] = useState(false);

  const handleSelectProvider = (id: string) => {
    const provider = cloudProviders.find(p => p.id === id);
    if (provider) {
      setSelectedProvider(provider);
      document.body.style.overflow = 'hidden';
    }
  };

  const handleCloseDetails = () => {
    setSelectedProvider(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <Navigation />
      <Hero />

      {/* Smart Choices - moved below the fold */}
      <SmartChoices />

      {/* Platform Comparison */}
      <ComparisonTable />

      {/* Cloud Architecture - collapsible */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => setStackOpen((v) => !v)}
            aria-expanded={stackOpen}
            aria-controls="tech-stack-panel"
            className="w-full glass-card rounded-2xl px-6 py-5 flex items-center justify-between gap-4 hover:border-primary/40 transition-colors group"
          >
            <div className="flex items-center gap-3 text-left">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold">Cloud Hosting Tech Stack</h2>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Interactive architecture overview — {stackOpen ? 'click to hide' : 'click to explore'}
                </p>
              </div>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                stackOpen ? 'rotate-180 text-primary' : ''
              }`}
            />
          </button>

          <AnimatePresence initial={false}>
            {stackOpen && (
              <motion.div
                id="tech-stack-panel"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <CloudArchitecture />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Providers Grid */}
      <section className="py-20 px-4" id="providers">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="gradient-text">Major Cloud</span> Providers
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Click on any provider to explore their free tier, requirements, strengths, and limitations in detail.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cloudProviders.map((provider, index) => (
              <ProviderCard
                key={provider.id}
                provider={provider}
                index={index}
                onSelect={handleSelectProvider}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="pricing">
        <PricingCalculator />
      </section>

      <section id="credits">
        <CreditsHardSell />
      </section>

      <CustomerBenefits />

      <Footer />

      {selectedProvider && (
        <ProviderDetails
          provider={selectedProvider}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
};

const SmartChoices = () => (
  <section id="recommendations" className="py-24 px-4 bg-secondary/30 relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none">
      <motion.div
        className="absolute top-10 right-[20%] w-64 h-64 bg-primary/10 rounded-full blur-[100px]"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 left-[15%] w-48 h-48 bg-oracle/10 rounded-full blur-[80px]"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
    </div>

    <div className="max-w-5xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        className="text-center mb-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/20 mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Pro Tips</span>
        </motion.div>

        <h2 className="text-3xl sm:text-5xl font-bold mb-4">
          <span className="gradient-text">Smart</span> Choices
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Hover to reveal detailed insights for each use case
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[
          {
            title: 'Top Free Tier', provider: 'Oracle Cloud',
            reason: '10TB bandwidth • 24GB ARM compute • Always free',
            backText: 'Oracle offers the most generous always-free tier with ARM Ampere instances, massive bandwidth, and no forced upgrades. Perfect for long-term projects.',
            gradient: 'from-oracle via-red-600 to-orange-500', icon: '🏆'
          },
          {
            title: 'Easiest Start', provider: 'Google Cloud',
            reason: 'Clean UI • Built-in guardrails • $300 credits',
            backText: 'GCP provides the smoothest onboarding with intuitive interfaces, automatic cost controls, and excellent documentation for newcomers.',
            gradient: 'from-gcp via-blue-500 to-green-500', icon: '🎯'
          },
          {
            title: 'Enterprise Ready', provider: 'Microsoft Azure',
            reason: 'Active Directory • Hybrid cloud • .NET native',
            backText: 'Azure excels in enterprise environments with seamless Microsoft integration, hybrid cloud capabilities, and compliance certifications.',
            gradient: 'from-azure via-blue-600 to-cyan-500', icon: '🏢'
          },
          {
            title: 'Maximum Scale', provider: 'AWS',
            reason: '200+ services • Global reach • Mature ecosystem',
            backText: 'AWS offers unmatched service breadth with 200+ services, global infrastructure, and the most mature ecosystem for scaling applications.',
            gradient: 'from-aws via-orange-500 to-yellow-500', icon: '🚀'
          },
        ].map((rec, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20, rotateX: -15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ delay: i * 0.05, type: 'spring', stiffness: 100 }}
            className="group h-48 perspective-1000"
          >
            <div className="relative w-full h-full transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
              <div className="absolute inset-0 backface-hidden">
                <div className={`h-full rounded-2xl p-[2px] bg-gradient-to-br ${rec.gradient}`}>
                  <div className="h-full glass-card rounded-2xl p-6 flex flex-col justify-between bg-card/95">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{rec.title}</span>
                        <span className="text-2xl">{rec.icon}</span>
                      </div>
                      <p className="font-bold text-2xl mb-2">{rec.provider}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{rec.reason}</p>
                    <motion.div
                      className="absolute bottom-3 right-3 text-xs text-muted-foreground/50"
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Hover for more →
                    </motion.div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 backface-hidden rotate-y-180">
                <div className={`h-full rounded-2xl bg-gradient-to-br ${rec.gradient} p-6 flex flex-col justify-center text-white`}>
                  <div className="text-4xl mb-4">{rec.icon}</div>
                  <p className="text-sm leading-relaxed font-medium">{rec.backText}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Index;
