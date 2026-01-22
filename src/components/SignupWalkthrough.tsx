import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, ChevronLeft, Check, ExternalLink, 
  Mail, CreditCard, Phone, Shield, User, AlertTriangle,
  ChevronDown, ChevronUp
} from 'lucide-react';
import { CloudProvider } from '@/data/cloudProviders';
import { Button } from './ui/button';

interface SignupWalkthroughProps {
  provider: CloudProvider;
}

interface Step {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tips: string[];
  warning?: string;
}

const getSignupSteps = (provider: CloudProvider): Step[] => {
  const commonSteps: Step[] = [
    {
      title: 'Create Account',
      description: 'Start by visiting the signup page and entering your email address.',
      icon: Mail,
      tips: [
        'Use a business email for better approval rates',
        'Some providers prefer Gmail/Outlook over custom domains',
        'Make sure you have access to verify the email'
      ]
    },
    {
      title: 'Phone Verification',
      description: 'Verify your identity with a phone number for SMS verification.',
      icon: Phone,
      tips: [
        'Use a mobile number that can receive SMS',
        'VoIP numbers may be rejected',
        'Some regions may have restrictions'
      ]
    },
    {
      title: 'Payment Method',
      description: 'Add a credit or debit card for identity verification.',
      icon: CreditCard,
      tips: [
        'Virtual cards may be rejected',
        'Prepaid cards often don\'t work',
        'No charges occur on free tier unless you upgrade'
      ],
      warning: provider.id === 'aws' ? 'AWS may place a $1 authorization hold' : undefined
    },
    {
      title: 'Identity Verification',
      description: 'Complete any additional verification requirements.',
      icon: User,
      tips: provider.requirements.governmentId 
        ? ['Government ID may be required', 'Process can take 24-48 hours']
        : ['Usually instant verification', 'Business accounts may require more info']
    },
    {
      title: 'Setup Complete',
      description: 'Your account is ready! Configure billing alerts immediately.',
      icon: Shield,
      tips: [
        'Set up billing alerts right away',
        'Enable MFA for security',
        'Review default spending limits',
        'Bookmark the billing dashboard'
      ]
    }
  ];

  // Provider-specific customizations
  const providerTips: Record<string, Partial<Step>[]> = {
    aws: [
      {},
      {},
      { warning: 'AWS does NOT auto-protect you from overspending. Set budget alerts immediately!' },
      {},
      { tips: ['Create a non-root IAM user', 'Set up AWS Budgets', 'Enable CloudTrail for auditing'] }
    ],
    gcp: [
      { tips: ['Google account works seamlessly', 'Can use existing Gmail'] },
      {},
      { tips: ['No charges until manual upgrade', 'Clear separation of trial vs paid'] },
      {},
      { tips: ['Enable budget alerts in Billing', 'Review quotas for free tier regions'] }
    ],
    azure: [
      { tips: ['Microsoft account required', 'Can create new or use existing'] },
      {},
      { tips: ['$200 credits expire in 30 days', 'Clear upgrade prompts'] },
      {},
      { tips: ['Integrate with Azure AD if using enterprise', 'Set up Cost Management alerts'] }
    ],
    oracle: [
      { tips: ['Use a business email if possible', 'Some signups are rejected without explanation'] },
      {},
      { tips: ['Strict verification process', 'May take longer than other providers'] },
      { warning: 'Oracle may require government ID. Process can take 24-48 hours.' },
      { tips: ['Resources are in your home region only', 'ARM instances require specific region selection'] }
    ],
    ibm: [
      { tips: ['IBM ID or federated login', 'Business email recommended'] },
      {},
      { tips: ['Lite tier never auto-upgrades', 'Safe for experimentation'] },
      {},
      { tips: ['Explore the catalog for Lite services', 'Set up API keys for CLI access'] }
    ]
  };

  return commonSteps.map((step, index) => ({
    ...step,
    ...providerTips[provider.id]?.[index]
  }));
};

export const SignupWalkthrough: FC<SignupWalkthroughProps> = ({ provider }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isExpanded, setIsExpanded] = useState(true);
  
  const steps = getSignupSteps(provider);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCompletedSteps(prev => [...prev, currentStep]);
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
  };

  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      {/* Header */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 flex items-center justify-between hover:bg-secondary/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl ${provider.gradientClass}`}>
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-bold">Signup Walkthrough</h3>
            <p className="text-sm text-muted-foreground">Step-by-step guide to create your {provider.shortName} account</p>
          </div>
        </div>
        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-6">
              {/* Progress Steps */}
              <div className="flex items-center justify-between mb-8 relative">
                {/* Progress Line */}
                <div className="absolute top-5 left-0 right-0 h-0.5 bg-border" />
                <motion.div 
                  className={`absolute top-5 left-0 h-0.5 ${provider.gradientClass}`}
                  initial={{ width: '0%' }}
                  animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />

                {steps.map((step, index) => {
                  const StepIcon = step.icon;
                  const isCompleted = completedSteps.includes(index);
                  const isCurrent = currentStep === index;

                  return (
                    <button
                      key={index}
                      onClick={() => handleStepClick(index)}
                      className="relative z-10 flex flex-col items-center group"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                          isCompleted
                            ? `${provider.gradientClass} border-transparent text-white`
                            : isCurrent
                              ? `border-primary bg-primary/20 ${provider.colorClass}`
                              : 'border-border bg-secondary/50 text-muted-foreground'
                        }`}
                      >
                        {isCompleted ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <StepIcon className="w-4 h-4" />
                        )}
                      </motion.div>
                      <span className={`text-[10px] mt-2 font-medium transition-colors ${
                        isCurrent ? provider.colorClass : 'text-muted-foreground'
                      }`}>
                        Step {index + 1}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Current Step Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3">
                    {(() => {
                      const StepIcon = steps[currentStep].icon;
                      return (
                        <div className={`p-3 rounded-xl ${provider.gradientClass}`}>
                          <StepIcon className="w-6 h-6 text-white" />
                        </div>
                      );
                    })()}
                    <div>
                      <h4 className="text-xl font-bold">{steps[currentStep].title}</h4>
                      <p className="text-sm text-muted-foreground">{steps[currentStep].description}</p>
                    </div>
                  </div>

                  {/* Warning */}
                  {steps[currentStep].warning && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-3 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30"
                    >
                      <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                      <p className="text-sm text-yellow-200">{steps[currentStep].warning}</p>
                    </motion.div>
                  )}

                  {/* Tips */}
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Pro Tips</p>
                    <div className="grid gap-2">
                      {steps[currentStep].tips.map((tip, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-2 p-3 rounded-lg bg-secondary/40"
                        >
                          <Check className={`w-4 h-4 ${provider.colorClass} shrink-0`} />
                          <span className="text-sm">{tip}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/30">
                <Button
                  variant="outline"
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className="gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>

                {currentStep === steps.length - 1 ? (
                  <Button
                    asChild
                    className={`${provider.gradientClass} text-white border-0 gap-2`}
                  >
                    <a href={provider.signupUrl} target="_blank" rel="noopener noreferrer">
                      Start Signup
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    className={`${provider.gradientClass} text-white border-0 gap-2`}
                  >
                    Next Step
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
