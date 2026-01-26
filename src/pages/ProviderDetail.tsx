import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, ExternalLink, Clock, CreditCard, Server, Database, 
  HardDrive, Wifi, Check, X, Quote, Zap, Shield, AlertTriangle,
  ChevronRight, Star
} from 'lucide-react';
import { cloudProviders, CloudProvider } from '@/data/cloudProviders';
import { CloudIcon } from '@/components/CloudIcon';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { UseCaseValidator } from '@/components/UseCaseValidator';
import { SignupWalkthrough } from '@/components/SignupWalkthrough';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const ProviderDetail = () => {
  const { providerId } = useParams<{ providerId: string }>();
  const provider = cloudProviders.find(p => p.id === providerId);

  if (!provider) {
    return <Navigate to="/" replace />;
  }

  const requirementItems = [
    { key: 'email', label: 'Email', value: provider.requirements.email },
    { key: 'phone', label: 'Phone Verification', value: provider.requirements.phone },
    { key: 'creditCard', label: 'Credit Card', value: provider.requirements.creditCard },
    { key: 'governmentId', label: 'Government ID', value: provider.requirements.governmentId },
  ];

  const freeTierSections = [
    {
      key: 'compute',
      label: 'Compute',
      icon: Server,
      data: provider.freeTier.compute,
      fields: ['name', 'specs', 'duration', 'notes']
    },
    {
      key: 'serverless',
      label: 'Serverless',
      icon: Zap,
      data: provider.freeTier.serverless,
      fields: ['name', 'specs', 'notes']
    },
    {
      key: 'storage',
      label: 'Storage',
      icon: HardDrive,
      data: provider.freeTier.storage,
      fields: ['object', 'disk', 'notes']
    },
    {
      key: 'database',
      label: 'Database',
      icon: Database,
      data: provider.freeTier.database,
      fields: ['offerings', 'notes']
    },
    {
      key: 'networking',
      label: 'Networking',
      icon: Wifi,
      data: provider.freeTier.networking,
      fields: ['egress', 'notes']
    }
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 glass-card border-b border-border/30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back to All Providers</span>
          </Link>
          <Button
            asChild
            className={`${provider.gradientClass} text-white border-0 gap-2`}
          >
            <a href={provider.signupUrl} target="_blank" rel="noopener noreferrer">
              Sign Up for {provider.shortName}
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <div className={`absolute -inset-4 rounded-3xl opacity-20 blur-3xl ${provider.gradientClass}`} />
          
          <div className="relative glass-card rounded-3xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-start gap-6">
              {/* Provider Icon */}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className={`p-6 rounded-3xl ${provider.gradientClass} shadow-2xl`}
              >
                <CloudIcon provider={provider.id as any} size={64} className="text-white" />
              </motion.div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className={`text-3xl md:text-4xl font-bold ${provider.colorClass}`}>
                    {provider.name}
                  </h1>
                  <span className={`text-xs font-mono px-3 py-1 rounded-lg ${provider.gradientClass} text-white uppercase tracking-widest`}>
                    {provider.shortName}
                  </span>
                </div>
                <p className="text-lg text-muted-foreground mb-4">{provider.tagline}</p>
                
                {/* Metaphor Quote */}
                <div className="relative pl-4 border-l-2 border-primary/50">
                  <Quote className={`absolute -left-3 -top-1 w-6 h-6 ${provider.colorClass} opacity-50`} />
                  <p className="text-sm italic text-muted-foreground">"{provider.metaphor}"</p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-col gap-3 min-w-[200px]">
                <div className={`p-4 rounded-xl ${provider.gradientClass} text-white`}>
                  <div className="flex items-center gap-2 mb-1">
                    <CreditCard className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-wider opacity-80">Free Credits</span>
                  </div>
                  <p className="text-2xl font-bold">{provider.freeCredits}</p>
                </div>
                <div className="p-4 rounded-xl bg-secondary/50 border border-border/30">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">Duration</span>
                  </div>
                  <p className="font-bold">{provider.creditDuration}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-base leading-relaxed text-muted-foreground"
            >
              {provider.description}
            </motion.p>
          </div>
        </motion.section>

        {/* Use Case Validator */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <UseCaseValidator provider={provider} />
        </motion.section>

        {/* Signup Walkthrough */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <SignupWalkthrough provider={provider} />
        </motion.section>

        {/* Requirements & Free Tier Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Account Requirements */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-2 rounded-xl ${provider.gradientClass}`}>
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold">Account Requirements</h2>
            </div>

            <div className="space-y-3 mb-4">
              {requirementItems.map((item) => (
                <div key={item.key} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                  <span className="text-sm">{item.label}</span>
                  {item.value ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <X className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>

            {provider.requirements.notes && (
              <div className="flex items-start gap-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                <AlertTriangle className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
                <p className="text-xs text-yellow-700">{provider.requirements.notes}</p>
              </div>
            )}
          </motion.section>

          {/* Best For / Not Ideal For */}
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-2 rounded-xl ${provider.gradientClass}`}>
                <Star className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold">Fit Analysis</h2>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-green-500 mb-2">✓ Best For</p>
                <div className="space-y-2">
                  {provider.bestFor.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full h-px bg-border" />

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-red-500 mb-2">✗ Not Ideal For</p>
                <div className="space-y-2">
                  {provider.notIdealFor.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <X className="w-4 h-4 text-red-500 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        </div>

        {/* Free Tier Details */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-2 rounded-xl ${provider.gradientClass}`}>
              <Server className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold">Free Tier Details</h2>
          </div>

          <Accordion type="multiple" className="space-y-2">
            {freeTierSections.map((section) => {
              if (!section.data) return null;
              const SectionIcon = section.icon;

              return (
                <AccordionItem key={section.key} value={section.key} className="border rounded-xl px-4 border-border/50 bg-secondary/20">
                  <AccordionTrigger className="hover:no-underline py-4">
                    <div className="flex items-center gap-3">
                      <SectionIcon className={`w-5 h-5 ${provider.colorClass}`} />
                      <span className="font-semibold">{section.label}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <div className="space-y-3 pl-8">
                      {section.fields.map((field) => {
                        const value = (section.data as any)[field];
                        if (!value) return null;

                        if (field === 'offerings' && Array.isArray(value)) {
                          return (
                            <div key={field}>
                              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Offerings</p>
                              <ul className="space-y-1">
                                {value.map((item: string, i: number) => (
                                  <li key={i} className="flex items-center gap-2 text-sm">
                                    <ChevronRight className={`w-3 h-3 ${provider.colorClass}`} />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        }

                        return (
                          <div key={field} className="flex items-start gap-2">
                            <span className="text-xs uppercase tracking-wider text-muted-foreground min-w-[80px] capitalize">
                              {field}:
                            </span>
                            <span className="text-sm">{value}</span>
                          </div>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </motion.section>

        {/* Strengths & Limitations */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-card rounded-2xl p-6"
          >
            <h2 className="text-xl font-bold mb-4 text-green-500">Strengths</h2>
            <ul className="space-y-3">
              {provider.strengths.map((strength, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.05 }}
                  className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20"
                >
                  <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-sm">{strength}</span>
                </motion.li>
              ))}
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-card rounded-2xl p-6"
          >
            <h2 className="text-xl font-bold mb-4 text-red-500">Limitations</h2>
            <ul className="space-y-3">
              {provider.limitations.map((limitation, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.05 }}
                  className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20"
                >
                  <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <span className="text-sm">{limitation}</span>
                </motion.li>
              ))}
            </ul>
          </motion.section>
        </div>

        {/* Engineer's Take */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className={`relative rounded-2xl p-8 ${provider.gradientClass}`}
        >
          <div className="absolute inset-0 bg-black/30 rounded-2xl" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <Quote className="w-8 h-8 text-white/50" />
              <h2 className="text-xl font-bold text-white">Engineer's Take</h2>
            </div>
            <p className="text-lg leading-relaxed text-white/90 italic">
              "{provider.engineerTake}"
            </p>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center py-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to get started with <span className={provider.colorClass}>{provider.name}</span>?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Use our signup walkthrough above, then come back to compare with other providers.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className={`${provider.gradientClass} text-white border-0 gap-2`}
            >
              <a href={provider.signupUrl} target="_blank" rel="noopener noreferrer">
                Create {provider.shortName} Account
                <ExternalLink className="w-5 h-5" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
            >
              <Link to="/#providers">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Compare All Providers
              </Link>
            </Button>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default ProviderDetail;
