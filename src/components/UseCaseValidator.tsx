import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, AlertCircle, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { CloudProvider } from '@/data/cloudProviders';
import { Button } from './ui/button';

interface UseCaseValidatorProps {
  provider: CloudProvider;
}

interface UseCase {
  id: string;
  label: string;
  description: string;
  category: 'compute' | 'database' | 'storage' | 'networking' | 'serverless';
}

const useCases: UseCase[] = [
  { id: 'static-site', label: 'Static Website Hosting', description: 'HTML/CSS/JS sites, blogs, portfolios', category: 'storage' },
  { id: 'api-backend', label: 'REST API Backend', description: 'Node.js, Python Flask, Express servers', category: 'compute' },
  { id: 'database-app', label: 'Database-Driven App', description: 'CRUD applications, user data storage', category: 'database' },
  { id: 'file-storage', label: 'File Storage & CDN', description: 'Images, videos, document hosting', category: 'storage' },
  { id: 'serverless-api', label: 'Serverless Functions', description: 'Event-driven APIs, webhooks, cron jobs', category: 'serverless' },
  { id: 'container-app', label: 'Containerized App', description: 'Docker, Kubernetes deployments', category: 'compute' },
  { id: 'high-traffic', label: 'High Traffic Site', description: '100k+ monthly visitors, video streaming', category: 'networking' },
  { id: 'ml-workload', label: 'ML/AI Workload', description: 'Model training, inference, data processing', category: 'compute' },
  { id: 'real-time', label: 'Real-time Application', description: 'WebSockets, chat, live updates', category: 'networking' },
  { id: 'enterprise', label: 'Enterprise Integration', description: 'Active Directory, SSO, compliance', category: 'compute' },
];

const getProviderScore = (provider: CloudProvider, useCase: UseCase): { score: 'excellent' | 'good' | 'limited' | 'poor'; reason: string } => {
  const scores: Record<string, Record<string, { score: 'excellent' | 'good' | 'limited' | 'poor'; reason: string }>> = {
    aws: {
      'static-site': { score: 'excellent', reason: 'S3 + CloudFront is industry standard for static hosting' },
      'api-backend': { score: 'excellent', reason: 'EC2 free tier + Lambda provides flexible API hosting' },
      'database-app': { score: 'good', reason: 'RDS free tier available but limited to 12 months' },
      'file-storage': { score: 'good', reason: '5GB S3 free, but egress costs can add up quickly' },
      'serverless-api': { score: 'excellent', reason: '1M Lambda invocations/month is very generous' },
      'container-app': { score: 'good', reason: 'ECS/EKS available but complex for beginners' },
      'high-traffic': { score: 'limited', reason: 'Only 1GB/month egress free - costs scale fast' },
      'ml-workload': { score: 'good', reason: 'SageMaker available but not in free tier' },
      'real-time': { score: 'good', reason: 'API Gateway WebSocket support, but usage limits apply' },
      'enterprise': { score: 'excellent', reason: 'Most comprehensive enterprise feature set' },
    },
    gcp: {
      'static-site': { score: 'excellent', reason: 'Cloud Storage + Firebase Hosting excellent for static sites' },
      'api-backend': { score: 'good', reason: 'e2-micro always free but shared CPU limits performance' },
      'database-app': { score: 'limited', reason: 'Cloud SQL NOT in free tier - major gotcha' },
      'file-storage': { score: 'good', reason: '5GB Cloud Storage free, good CDN integration' },
      'serverless-api': { score: 'excellent', reason: 'Cloud Functions + Cloud Run very generous free tier' },
      'container-app': { score: 'excellent', reason: 'Best Kubernetes support, Cloud Run is exceptional' },
      'high-traffic': { score: 'limited', reason: 'Only 1GB/month egress, same limitation as AWS' },
      'ml-workload': { score: 'good', reason: 'Vertex AI available, good for ML but costs apply' },
      'real-time': { score: 'good', reason: 'Firebase Realtime Database in free tier' },
      'enterprise': { score: 'good', reason: 'Strong IAM but less enterprise tooling than Azure' },
    },
    azure: {
      'static-site': { score: 'good', reason: 'Static Web Apps free tier available' },
      'api-backend': { score: 'good', reason: 'B1s VM free for 12 months, good .NET support' },
      'database-app': { score: 'good', reason: 'Azure SQL limited DTUs free, Cosmos DB always free' },
      'file-storage': { score: 'good', reason: '5GB Blob Storage, integrates with Azure CDN' },
      'serverless-api': { score: 'excellent', reason: '1M Azure Functions executions/month free' },
      'container-app': { score: 'good', reason: 'Container Apps available, AKS for Kubernetes' },
      'high-traffic': { score: 'good', reason: '15GB egress more generous than AWS/GCP' },
      'ml-workload': { score: 'good', reason: 'Azure ML available, good cognitive services' },
      'real-time': { score: 'good', reason: 'SignalR available but limited free tier' },
      'enterprise': { score: 'excellent', reason: 'Best Active Directory and enterprise integration' },
    },
    oracle: {
      'static-site': { score: 'good', reason: 'Object Storage works but less polished than competitors' },
      'api-backend': { score: 'excellent', reason: '24GB ARM compute always free is unmatched' },
      'database-app': { score: 'excellent', reason: 'Autonomous Database always free tier is remarkable' },
      'file-storage': { score: 'limited', reason: 'Limited Object Storage, block volumes are generous' },
      'serverless-api': { score: 'limited', reason: 'Functions available but ecosystem is smaller' },
      'container-app': { score: 'good', reason: 'OKE available, ARM instances great for containers' },
      'high-traffic': { score: 'excellent', reason: '10TB/month egress is industry-leading by far' },
      'ml-workload': { score: 'limited', reason: 'Limited ML services compared to big three' },
      'real-time': { score: 'good', reason: 'Can self-host with generous compute resources' },
      'enterprise': { score: 'good', reason: 'Enterprise-grade but less tooling ecosystem' },
    },
    ibm: {
      'static-site': { score: 'limited', reason: 'Cloud Foundry works but apps sleep when idle' },
      'api-backend': { score: 'limited', reason: 'PaaS model with memory limits, no VM access' },
      'database-app': { score: 'excellent', reason: 'Best managed database Lite tiers in the industry' },
      'file-storage': { score: 'limited', reason: 'Very limited Object Storage on Lite plan' },
      'serverless-api': { score: 'good', reason: 'Cloud Functions available, based on OpenWhisk' },
      'container-app': { score: 'limited', reason: 'Kubernetes available but requires paid tier' },
      'high-traffic': { score: 'poor', reason: 'No free bandwidth guarantees, not optimized for this' },
      'ml-workload': { score: 'good', reason: 'Watson AI services available in Lite tier' },
      'real-time': { score: 'limited', reason: 'Limited options, not a core strength' },
      'enterprise': { score: 'good', reason: 'Strong compliance and API management' },
    },
  };

  return scores[provider.id]?.[useCase.id] || { score: 'limited', reason: 'Limited information available' };
};

export const UseCaseValidator: FC<UseCaseValidatorProps> = ({ provider }) => {
  const [selectedUseCases, setSelectedUseCases] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleUseCase = (id: string) => {
    setSelectedUseCases(prev => 
      prev.includes(id) ? prev.filter(uc => uc !== id) : [...prev, id]
    );
    setShowResults(false);
  };

  const getScoreIcon = (score: string) => {
    switch (score) {
      case 'excellent': return <Check className="w-5 h-5 text-green-500" />;
      case 'good': return <Check className="w-5 h-5 text-blue-500" />;
      case 'limited': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'poor': return <X className="w-5 h-5 text-red-500" />;
      default: return null;
    }
  };

  const getScoreClass = (score: string) => {
    switch (score) {
      case 'excellent': return 'border-green-500/50 bg-green-500/10';
      case 'good': return 'border-blue-500/50 bg-blue-500/10';
      case 'limited': return 'border-yellow-500/50 bg-yellow-500/10';
      case 'poor': return 'border-red-500/50 bg-red-500/10';
      default: return '';
    }
  };

  const overallScore = () => {
    if (selectedUseCases.length === 0) return null;
    const scores = selectedUseCases.map(id => {
      const useCase = useCases.find(uc => uc.id === id)!;
      return getProviderScore(provider, useCase).score;
    });
    const scoreValues = { excellent: 4, good: 3, limited: 2, poor: 1 };
    const avg = scores.reduce((sum, s) => sum + scoreValues[s], 0) / scores.length;
    if (avg >= 3.5) return { label: 'Excellent Match', color: 'text-green-500', bg: 'bg-green-500/20' };
    if (avg >= 2.5) return { label: 'Good Match', color: 'text-blue-500', bg: 'bg-blue-500/20' };
    if (avg >= 1.5) return { label: 'Limited Fit', color: 'text-yellow-500', bg: 'bg-yellow-500/20' };
    return { label: 'Not Recommended', color: 'text-red-500', bg: 'bg-red-500/20' };
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
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-bold">Use Case Validator</h3>
            <p className="text-sm text-muted-foreground">Check if {provider.name} fits your needs</p>
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
            <div className="px-6 pb-6 space-y-6">
              {/* Use Case Selection */}
              <div>
                <p className="text-sm text-muted-foreground mb-4">Select your planned use cases:</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                  {useCases.map((useCase) => (
                    <motion.button
                      key={useCase.id}
                      onClick={() => toggleUseCase(useCase.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-3 rounded-xl border-2 text-left transition-all duration-300 ${
                        selectedUseCases.includes(useCase.id)
                          ? `${provider.gradientClass} border-transparent text-white`
                          : 'border-border/50 hover:border-border bg-secondary/30'
                      }`}
                    >
                      <p className="text-xs font-semibold">{useCase.label}</p>
                      <p className={`text-[10px] mt-1 ${selectedUseCases.includes(useCase.id) ? 'text-white/80' : 'text-muted-foreground'}`}>
                        {useCase.description}
                      </p>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Validate Button */}
              {selectedUseCases.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Button 
                    onClick={() => setShowResults(true)}
                    className={`w-full ${provider.gradientClass} text-white border-0`}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Validate {selectedUseCases.length} Use Case{selectedUseCases.length > 1 ? 's' : ''}
                  </Button>
                </motion.div>
              )}

              {/* Results */}
              <AnimatePresence>
                {showResults && selectedUseCases.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    {/* Overall Score */}
                    {overallScore() && (
                      <motion.div 
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className={`p-4 rounded-xl ${overallScore()!.bg} border border-current/20 text-center`}
                      >
                        <p className={`text-2xl font-bold ${overallScore()!.color}`}>
                          {overallScore()!.label}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          for {provider.name}
                        </p>
                      </motion.div>
                    )}

                    {/* Individual Results */}
                    <div className="space-y-2">
                      {selectedUseCases.map((id, index) => {
                        const useCase = useCases.find(uc => uc.id === id)!;
                        const result = getProviderScore(provider, useCase);
                        return (
                          <motion.div
                            key={id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`p-4 rounded-xl border-2 ${getScoreClass(result.score)}`}
                          >
                            <div className="flex items-start gap-3">
                              {getScoreIcon(result.score)}
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm">{useCase.label}</p>
                                <p className="text-xs text-muted-foreground mt-1">{result.reason}</p>
                              </div>
                              <span className={`text-xs font-bold uppercase px-2 py-1 rounded-md ${getScoreClass(result.score)}`}>
                                {result.score}
                              </span>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
