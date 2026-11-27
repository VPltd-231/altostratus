import { FC, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, ChevronLeft, Check, ExternalLink, 
  Mail, CreditCard, Phone, Shield, User, AlertTriangle,
  ChevronDown, ChevronUp, type LucideIcon
} from 'lucide-react';
import { CloudProvider } from '@/data/cloudProviders';
import { getSignupSteps, type SignupStepIcon } from '@/data/signupSteps';
import { Button } from './ui/button';

interface SignupWalkthroughProps {
  provider: CloudProvider;
}

const STEP_ICONS: Record<SignupStepIcon, LucideIcon> = {
  mail: Mail,
  phone: Phone,
  card: CreditCard,
  user: User,
  shield: Shield,
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
          <m.div
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
                <m.div 
                  className={`absolute top-5 left-0 h-0.5 ${provider.gradientClass}`}
                  initial={{ width: '0%' }}
                  animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />

                {steps.map((step, index) => {
                  const StepIcon = STEP_ICONS[step.icon];
                  const isCompleted = completedSteps.includes(index);
                  const isCurrent = currentStep === index;

                  return (
                    <button
                      key={index}
                      onClick={() => handleStepClick(index)}
                      className="relative z-10 flex flex-col items-center group"
                    >
                      <m.div
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
                      </m.div>
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
                <m.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3">
                    {(() => {
                      const StepIcon = STEP_ICONS[steps[currentStep].icon];
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
                    <m.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-3 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30"
                    >
                      <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                      <p className="text-sm text-yellow-800">{steps[currentStep].warning}</p>
                    </m.div>
                  )}

                  {/* Tips */}
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Pro Tips</p>
                    <div className="grid gap-2">
                      {steps[currentStep].tips.map((tip, index) => (
                        <m.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-2 p-3 rounded-lg bg-secondary/40"
                        >
                          <Check className={`w-4 h-4 ${provider.colorClass} shrink-0`} />
                          <span className="text-sm">{tip}</span>
                        </m.div>
                      ))}
                    </div>
                  </div>
                </m.div>
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
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};
