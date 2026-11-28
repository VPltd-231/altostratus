/**
 * Account sign-up steps per provider. Shared by the SignupWalkthrough UI and
 * the build-time prerender (visible steps + HowTo structured data).
 */
import type { CloudProvider, ProviderId } from './cloudProviders';

export type SignupStepIcon = 'mail' | 'phone' | 'card' | 'user' | 'shield';

export interface SignupStep {
  title: string;
  description: string;
  icon: SignupStepIcon;
  tips: string[];
  warning?: string;
}

const PROVIDER_OVERRIDES: Record<ProviderId, Partial<SignupStep>[]> = {
  aws: [
    {},
    {},
    { warning: 'AWS does NOT auto-protect you from overspending. Set budget alerts immediately!' },
    {},
    { tips: ['Create a non-root IAM user', 'Set up AWS Budgets', 'Enable CloudTrail for auditing'] },
  ],
  gcp: [
    { tips: ['Google account works seamlessly', 'Can use existing Gmail'] },
    {},
    { tips: ['No charges until manual upgrade', 'Clear separation of trial vs paid'] },
    {},
    { tips: ['Enable budget alerts in Billing', 'Review quotas for free tier regions'] },
  ],
  azure: [
    { tips: ['Microsoft account required', 'Can create new or use existing'] },
    {},
    { tips: ['$200 credits expire in 30 days', 'Clear upgrade prompts'] },
    {},
    { tips: ['Integrate with Azure AD if using enterprise', 'Set up Cost Management alerts'] },
  ],
  oracle: [
    { tips: ['Use a business email if possible', 'Some signups are rejected without explanation'] },
    {},
    { tips: ['Strict verification process', 'May take longer than other providers'] },
    { warning: 'Oracle may require government ID. Process can take 24-48 hours.' },
    { tips: ['Resources are in your home region only', 'ARM instances require specific region selection'] },
  ],
  ibm: [
    { tips: ['IBM ID or federated login', 'Business email recommended'] },
    {},
    { tips: ['Lite tier never auto-upgrades', 'Safe for experimentation'] },
    {},
    { tips: ['Explore the catalog for Lite services', 'Set up API keys for CLI access'] },
  ],
};

export const getSignupSteps = (provider: CloudProvider): SignupStep[] => {
  const common: SignupStep[] = [
    {
      title: 'Create Account',
      description: 'Start by visiting the signup page and entering your email address.',
      icon: 'mail',
      tips: [
        'Use a business email for better approval rates',
        'Some providers prefer Gmail/Outlook over custom domains',
        'Make sure you have access to verify the email',
      ],
    },
    {
      title: 'Phone Verification',
      description: 'Verify your identity with a phone number for SMS verification.',
      icon: 'phone',
      tips: ['Use a mobile number that can receive SMS', 'VoIP numbers may be rejected', 'Some regions may have restrictions'],
    },
    {
      title: 'Payment Method',
      description: 'Add a credit or debit card for identity verification.',
      icon: 'card',
      tips: ['Virtual cards may be rejected', "Prepaid cards often don't work", 'No charges occur on free tier unless you upgrade'],
      warning: provider.id === 'aws' ? 'AWS may place a $1 authorization hold' : undefined,
    },
    {
      title: 'Identity Verification',
      description: 'Complete any additional verification requirements.',
      icon: 'user',
      tips: provider.requirements.governmentId
        ? ['Government ID may be required', 'Process can take 24-48 hours']
        : ['Usually instant verification', 'Business accounts may require more info'],
    },
    {
      title: 'Setup Complete',
      description: 'Your account is ready! Configure billing alerts immediately.',
      icon: 'shield',
      tips: ['Set up billing alerts right away', 'Enable MFA for security', 'Review default spending limits', 'Bookmark the billing dashboard'],
    },
  ];

  return common.map((step, i) => ({ ...step, ...PROVIDER_OVERRIDES[provider.id]?.[i] }));
};
