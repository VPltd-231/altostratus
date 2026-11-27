/**
 * Copy and tabular data for the home page sections.
 *
 * Kept out of the components so the React UI and the build-time prerender
 * (scripts/prerender.ts) render from the same source and can never drift.
 * Nothing in here may import React, icons or browser APIs.
 */
import type { ProviderId } from './cloudProviders';

// ---- Platform comparison ----------------------------------------------------

export type ComparisonCategory = 'compute' | 'storage' | 'database' | 'networking' | 'pricing';
export type ComparisonValue = string | boolean;

export interface ComparisonRow extends Record<ProviderId, ComparisonValue> {
  feature: string;
  highlight?: ProviderId;
}

export const COMPARISON_PROVIDER_IDS: readonly ProviderId[] = ['aws', 'gcp', 'azure', 'oracle', 'ibm'];

export const COMPARISON_CATEGORIES: { id: ComparisonCategory; label: string }[] = [
  { id: 'compute', label: 'Compute' },
  { id: 'storage', label: 'Storage' },
  { id: 'database', label: 'Database' },
  { id: 'networking', label: 'Networking' },
  { id: 'pricing', label: 'Pricing' },
];

export const COMPARISON_DATA: Record<ComparisonCategory, ComparisonRow[]> = {
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

// ---- Quick Peek recommendations ----------------------------------------------

export interface Recommendation {
  title: string;
  provider: string;
  reason: string;
  backText: string;
  gradient: string;
  icon: string;
}

export const RECOMMENDATIONS: Recommendation[] = [
  {
    title: 'Top Free Tier',
    provider: 'Oracle Cloud',
    reason: '10TB bandwidth • 24GB ARM compute • Always free',
    backText:
      'Oracle offers the most generous always-free tier with ARM Ampere instances, massive bandwidth, and no forced upgrades. Perfect for long-term projects.',
    gradient: 'from-oracle via-red-600 to-orange-500',
    icon: '🏆',
  },
  {
    title: 'Easiest Start',
    provider: 'Google Cloud',
    reason: 'Clean UI • Built-in guardrails • $300 credits',
    backText:
      'GCP provides the smoothest onboarding with intuitive interfaces, automatic cost controls, and excellent documentation for newcomers.',
    gradient: 'from-gcp via-blue-500 to-green-500',
    icon: '🎯',
  },
  {
    title: 'Enterprise Ready',
    provider: 'Microsoft Azure',
    reason: 'Active Directory • Hybrid cloud • .NET native',
    backText:
      'Azure excels in enterprise environments with seamless Microsoft integration, hybrid cloud capabilities, and compliance certifications.',
    gradient: 'from-azure via-blue-600 to-cyan-500',
    icon: '🏢',
  },
  {
    title: 'Maximum Scale',
    provider: 'AWS',
    reason: '200+ services • Global reach • Mature ecosystem',
    backText:
      'AWS offers unmatched service breadth with 200+ services, global infrastructure, and the most mature ecosystem for scaling applications.',
    gradient: 'from-aws via-orange-500 to-yellow-500',
    icon: '🚀',
  },
];

// ---- Security & data hygiene -------------------------------------------------

export type BenefitIcon = 'shield' | 'lock' | 'eye' | 'database';

export const BENEFITS: { icon: BenefitIcon; title: string; description: string }[] = [
  {
    icon: 'shield',
    title: 'End-to-End Encryption',
    description: 'Every byte of your data is encrypted in transit and at rest. Industry-standard TLS 1.3 and AES-256 protect your business assets across all connected platforms.',
  },
  {
    icon: 'lock',
    title: 'Access Control & Compliance',
    description: 'Role-based access, MFA enforcement, and SOC 2 / ISO 27001 compliance frameworks ensure only authorized personnel interact with sensitive workloads.',
  },
  {
    icon: 'eye',
    title: 'Audit Trails & Transparency',
    description: 'Immutable logging across every data touchpoint. Know who accessed what, when, and from where — a non-negotiable for proper data hygiene.',
  },
  {
    icon: 'database',
    title: 'Data Residency & Sovereignty',
    description: 'Choose where your data lives. Multi-region deployment ensures regulatory compliance while maintaining low-latency access for your global teams.',
  },
];
