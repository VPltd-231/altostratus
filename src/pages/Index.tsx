import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { ProviderCard } from '@/components/ProviderCard';
import { ProviderDetails } from '@/components/ProviderDetails';
import { ComparisonTable } from '@/components/ComparisonTable';
import { PricingCalculator } from '@/components/PricingCalculator';
import { CreditsHardSell } from '@/components/CreditsHardSell';
import { Footer } from '@/components/Footer';
import { cloudProviders, CloudProvider } from '@/data/cloudProviders';

const Index = () => {
  const [selectedProvider, setSelectedProvider] = useState<CloudProvider | null>(null);

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
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <Hero />

      {/* Providers Grid */}
      <section className="py-20 px-4" id="providers">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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

      {/* Comparison Table */}
      <ComparisonTable />

      {/* Pricing Calculator */}
      <PricingCalculator />

      {/* Cloud Credits Hard Sell */}
      <CreditsHardSell />

      {/* Quick Summary Section */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-8">
              <span className="gradient-text">Quick</span> Recommendations
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {[
                { 
                  title: 'Best Free Tier Overall',
                  provider: 'Oracle Cloud',
                  reason: '10TB bandwidth, 24GB ARM compute, always free',
                  color: 'border-oracle'
                },
                {
                  title: 'Best for Beginners',
                  provider: 'Google Cloud',
                  reason: 'Clean UI, guardrails by default, $300 credits',
                  color: 'border-gcp'
                },
                {
                  title: 'Best for Enterprise',
                  provider: 'Microsoft Azure',
                  reason: 'Active Directory, hybrid cloud, .NET support',
                  color: 'border-azure'
                },
                {
                  title: 'Best for Scale',
                  provider: 'AWS',
                  reason: 'Deepest ecosystem, most services, global reach',
                  color: 'border-aws'
                },
              ].map((rec, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`glass-card rounded-xl p-5 border-l-4 ${rec.color}`}
                >
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    {rec.title}
                  </p>
                  <p className="font-bold text-lg mb-1">{rec.provider}</p>
                  <p className="text-sm text-muted-foreground">{rec.reason}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Provider Details Modal */}
      {selectedProvider && (
        <ProviderDetails
          provider={selectedProvider}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
};

export default Index;
