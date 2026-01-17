import { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Server, Database, HardDrive, Wifi, Zap, CheckCircle2, XCircle, Target, AlertTriangle, Quote } from 'lucide-react';
import { CloudProvider } from '@/data/cloudProviders';
import { CloudIcon } from './CloudIcon';
import { Button } from './ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

interface ProviderDetailsProps {
  provider: CloudProvider | null;
  onClose: () => void;
}

export const ProviderDetails: FC<ProviderDetailsProps> = ({ provider, onClose }) => {
  if (!provider) return null;

  const sections = [
    {
      id: 'requirements',
      title: 'Account Requirements',
      icon: Target,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Email', required: provider.requirements.email },
              { label: 'Credit Card', required: provider.requirements.creditCard },
              { label: 'Phone', required: provider.requirements.phone },
              { label: 'Government ID', required: provider.requirements.governmentId },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50">
                {item.required ? (
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-muted-foreground/50" />
                )}
                <span className="text-sm">{item.label}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground p-3 rounded-lg bg-secondary/30 border-l-2 border-primary">
            💡 {provider.requirements.notes}
          </p>
        </div>
      ),
    },
    {
      id: 'compute',
      title: 'Compute Resources',
      icon: Server,
      content: (
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-secondary/50">
            <h4 className="font-semibold mb-2">{provider.freeTier.compute.name}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">Specs:</span>
                <p className="font-medium">{provider.freeTier.compute.specs}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Duration:</span>
                <p className="font-medium">{provider.freeTier.compute.duration}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">{provider.freeTier.compute.notes}</p>
          </div>
          
          {provider.freeTier.serverless && (
            <div className="p-4 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-primary" />
                <h4 className="font-semibold">{provider.freeTier.serverless.name}</h4>
              </div>
              <p className="text-sm mb-2">{provider.freeTier.serverless.specs}</p>
              <p className="text-sm text-muted-foreground">{provider.freeTier.serverless.notes}</p>
            </div>
          )}
        </div>
      ),
    },
    {
      id: 'storage',
      title: 'Storage',
      icon: HardDrive,
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-secondary/50">
            <h4 className="font-semibold mb-2">Object Storage</h4>
            <p className="text-lg font-bold text-primary">{provider.freeTier.storage.object}</p>
          </div>
          <div className="p-4 rounded-lg bg-secondary/50">
            <h4 className="font-semibold mb-2">Block/Disk Storage</h4>
            <p className="text-lg font-bold text-primary">{provider.freeTier.storage.disk}</p>
          </div>
          <p className="col-span-full text-sm text-muted-foreground">{provider.freeTier.storage.notes}</p>
        </div>
      ),
    },
    {
      id: 'database',
      title: 'Databases',
      icon: Database,
      content: (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {provider.freeTier.database.offerings.map((db, i) => (
              <span key={i} className={`px-3 py-1.5 rounded-full text-sm font-medium ${provider.gradientClass} text-white`}>
                {db}
              </span>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">{provider.freeTier.database.notes}</p>
        </div>
      ),
    },
    {
      id: 'networking',
      title: 'Networking',
      icon: Wifi,
      content: (
        <div className="space-y-3">
          <div className="p-4 rounded-lg bg-secondary/50">
            <h4 className="text-sm text-muted-foreground mb-1">Outbound Data</h4>
            <p className="text-2xl font-bold text-primary">{provider.freeTier.networking.egress}</p>
          </div>
          <p className="text-sm text-muted-foreground">{provider.freeTier.networking.notes}</p>
        </div>
      ),
    },
    {
      id: 'strengths',
      title: 'Strengths',
      icon: CheckCircle2,
      content: (
        <ul className="space-y-2">
          {provider.strengths.map((strength, i) => (
            <li key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-secondary/30 transition-colors">
              <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span>{strength}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: 'limitations',
      title: 'Limitations',
      icon: AlertTriangle,
      content: (
        <ul className="space-y-2">
          {provider.limitations.map((limitation, i) => (
            <li key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-secondary/30 transition-colors">
              <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
              <span>{limitation}</span>
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 overflow-y-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="min-h-screen py-8 px-4"
        >
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-2xl ${provider.gradientClass} ${provider.glowClass}`}>
                  <CloudIcon provider={provider.id as any} size={48} className="text-white" />
                </div>
                <div>
                  <h2 className={`text-3xl sm:text-4xl font-bold ${provider.colorClass}`}>
                    {provider.name}
                  </h2>
                  <p className="text-muted-foreground">{provider.tagline}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="rounded-full"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>

            {/* Metaphor quote */}
            <div className="mb-8 p-6 rounded-2xl glass-card border-l-4 border-primary">
              <Quote className="w-8 h-8 text-primary mb-3 opacity-50" />
              <p className="text-lg italic text-muted-foreground">{provider.metaphor}</p>
            </div>

            {/* Accordion sections */}
            <Accordion type="multiple" defaultValue={['requirements', 'compute', 'strengths']} className="space-y-4">
              {sections.map((section) => (
                <AccordionItem
                  key={section.id}
                  value={section.id}
                  className="glass-card rounded-xl border-0 overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-secondary/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <section.icon className={`w-5 h-5 ${provider.colorClass}`} />
                      <span className="font-semibold">{section.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    {section.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Best For / Not Ideal For */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="glass-card rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-500" />
                  Best For
                </h3>
                <ul className="space-y-2">
                  {provider.bestFor.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-card rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-500" />
                  Not Ideal For
                </h3>
                <ul className="space-y-2">
                  {provider.notIdealFor.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Engineer's Take */}
            <div className={`mt-8 p-6 rounded-2xl ${provider.gradientClass} text-white`}>
              <h3 className="font-bold text-lg mb-3">🧠 Engineer's Take</h3>
              <p className="leading-relaxed">{provider.engineerTake}</p>
            </div>

            {/* Close button */}
            <div className="mt-8 text-center">
              <Button
                onClick={onClose}
                variant="outline"
                size="lg"
                className="min-w-[200px]"
              >
                Close Details
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
