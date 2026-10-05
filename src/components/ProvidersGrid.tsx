import { cloudProviders } from '@/data/cloudProviders';
import { ProviderCard } from '@/components/ProviderCard';
import { Reveal } from '@/components/motion/Reveal';

export const ProvidersGrid = () => (
  <section className="px-4 py-20" id="providers">
    <div className="mx-auto max-w-7xl">
      <Reveal className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
          <span className="gradient-text">Leading Cloud</span> Platforms
        </h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Open any provider to explore their free tier, requirements, strengths, and limitations in detail.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cloudProviders.map((provider, index) => (
          <ProviderCard key={provider.id} provider={provider} index={index} />
        ))}
      </div>
    </div>
  </section>
);
