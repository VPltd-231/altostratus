import { Suspense } from 'react';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { ProvidersGrid } from '@/components/ProvidersGrid';
import { SeoHead } from '@/components/SeoHead';
import { LazyMount } from '@/components/LazyMount';
import { TechStackToggle } from '@/components/TechStackToggle';
import { lazyNamed } from '@/lib/lazy';

// Below-the-fold sections are separate chunks, fetched shortly before they
// scroll into view (see LazyMount). The first paint only ships Hero + providers.
const ComparisonTable = lazyNamed(() => import('@/components/ComparisonTable'), 'ComparisonTable');
const PricingCalculator = lazyNamed(() => import('@/components/PricingCalculator'), 'PricingCalculator');
const CreditsHardSell = lazyNamed(() => import('@/components/CreditsHardSell'), 'CreditsHardSell');
const SmartChoices = lazyNamed(() => import('@/components/SmartChoices'), 'SmartChoices');
const CustomerBenefits = lazyNamed(() => import('@/components/CustomerBenefits'), 'CustomerBenefits');
const Footer = lazyNamed(() => import('@/components/Footer'), 'Footer');

const Index = () => (
  <div className="relative min-h-screen">
    <SeoHead route="/" />
    <div aria-hidden className="app-bg" />
    <Navigation />
    <main>
      <Hero />
      <ProvidersGrid />

      <LazyMount id="comparison" minHeight={700}>
        <Suspense fallback={null}>
          <ComparisonTable />
        </Suspense>
      </LazyMount>

      <LazyMount id="pricing" minHeight={900}>
        <Suspense fallback={null}>
          <PricingCalculator />
        </Suspense>
      </LazyMount>

      <LazyMount id="credits" minHeight={700}>
        <Suspense fallback={null}>
          <CreditsHardSell />
        </Suspense>
      </LazyMount>

      <TechStackToggle />

      <LazyMount id="recommendations" minHeight={500}>
        <Suspense fallback={null}>
          <SmartChoices />
        </Suspense>
      </LazyMount>

      <LazyMount minHeight={800}>
        <Suspense fallback={null}>
          <CustomerBenefits />
        </Suspense>
      </LazyMount>
    </main>

    <LazyMount minHeight={600}>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </LazyMount>
  </div>
);

export default Index;
