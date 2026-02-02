import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Server, HardDrive, Wifi, DollarSign, Database, Code, Zap } from 'lucide-react';
import { Slider } from './ui/slider';
import { CloudIcon } from './CloudIcon';

interface PricingEstimate {
  provider: string;
  id: 'aws' | 'gcp' | 'azure' | 'oracle' | 'ibm';
  monthly: number;
  savings: string;
}

export const PricingCalculator: FC = () => {
  const [computeHours, setComputeHours] = useState([200]);
  const [storageGB, setStorageGB] = useState([50]);
  const [bandwidthGB, setBandwidthGB] = useState([100]);
  const [databaseGB, setDatabaseGB] = useState([20]);
  const [functionsM, setFunctionsM] = useState([1]);
  const [apiRequestsK, setApiRequestsK] = useState([100]);

  // Simplified pricing estimates (illustrative)
  const calculateEstimates = (): PricingEstimate[] => {
    const compute = computeHours[0];
    const storage = storageGB[0];
    const bandwidth = bandwidthGB[0];
    const database = databaseGB[0];
    const functions = functionsM[0];
    const apiRequests = apiRequestsK[0];

    const estimates: PricingEstimate[] = [
      {
        provider: 'AWS',
        id: 'aws',
        monthly: compute * 0.0116 + storage * 0.023 + bandwidth * 0.09 + database * 0.115 + functions * 0.20 + apiRequests * 0.0035,
        savings: compute <= 750 ? 'Free tier covers compute!' : ''
      },
      {
        provider: 'GCP',
        id: 'gcp',
        monthly: compute * 0.0104 + storage * 0.02 + bandwidth * 0.12 + database * 0.10 + functions * 0.16 + apiRequests * 0.003,
        savings: '$300 credits available'
      },
      {
        provider: 'Azure',
        id: 'azure',
        monthly: compute * 0.0114 + storage * 0.0184 + bandwidth * 0.087 + database * 0.12 + functions * 0.18 + apiRequests * 0.0036,
        savings: '$200 credits available'
      },
      {
        provider: 'Oracle',
        id: 'oracle',
        monthly: compute * 0.015 + storage * 0.0255 + Math.max(0, bandwidth - 10000) * 0.0085 + database * 0.095 + functions * 0.20 + apiRequests * 0.003,
        savings: '10TB bandwidth FREE!'
      },
      {
        provider: 'IBM',
        id: 'ibm',
        monthly: compute * 0.02 + storage * 0.03 + bandwidth * 0.09 + database * 0.13 + functions * 0.25 + apiRequests * 0.004,
        savings: 'Lite tier available'
      },
    ];
    
    return estimates.sort((a, b) => a.monthly - b.monthly);
  };

  const estimates = calculateEstimates();
  const lowestPrice = estimates[0].monthly;

  return (
    <section className="py-20 px-4" id="calculator">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <Calculator className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Interactive Tool</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">Pricing</span> Calculator
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Estimate your monthly cloud costs across all providers. Adjust the sliders to match your expected usage.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sliders Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8 relative overflow-hidden"
          >
            {/* Decorative gradient blob */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 space-y-8">
              {/* Compute Hours */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/20">
                      <Server className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-semibold">Compute Hours</span>
                  </div>
                  <span className="text-2xl font-bold text-primary">{computeHours[0]}<span className="text-sm text-muted-foreground">/mo</span></span>
                </div>
                <Slider
                  value={computeHours}
                  onValueChange={setComputeHours}
                  max={2000}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>0 hrs</span>
                  <span>2,000 hrs</span>
                </div>
              </div>

              {/* Storage */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gcp/20">
                      <HardDrive className="w-5 h-5 text-gcp" />
                    </div>
                    <span className="font-semibold">Storage</span>
                  </div>
                  <span className="text-2xl font-bold text-gcp">{storageGB[0]}<span className="text-sm text-muted-foreground"> GB</span></span>
                </div>
                <Slider
                  value={storageGB}
                  onValueChange={setStorageGB}
                  max={500}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>0 GB</span>
                  <span>500 GB</span>
                </div>
              </div>

              {/* Bandwidth */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-azure/20">
                      <Wifi className="w-5 h-5 text-azure" />
                    </div>
                    <span className="font-semibold">Bandwidth</span>
                  </div>
                  <span className="text-2xl font-bold text-azure">{bandwidthGB[0]}<span className="text-sm text-muted-foreground"> GB</span></span>
                </div>
                <Slider
                  value={bandwidthGB}
                  onValueChange={setBandwidthGB}
                  max={1000}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>0 GB</span>
                  <span>1,000 GB</span>
                </div>
              </div>

              {/* Database */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-oracle/20">
                      <Database className="w-5 h-5 text-oracle" />
                    </div>
                    <span className="font-semibold">Database</span>
                  </div>
                  <span className="text-2xl font-bold text-oracle">{databaseGB[0]}<span className="text-sm text-muted-foreground"> GB</span></span>
                </div>
                <Slider
                  value={databaseGB}
                  onValueChange={setDatabaseGB}
                  max={200}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>0 GB</span>
                  <span>200 GB</span>
                </div>
              </div>

              {/* Serverless Functions */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/20">
                      <Code className="w-5 h-5 text-purple-500" />
                    </div>
                    <span className="font-semibold">Functions</span>
                  </div>
                  <span className="text-2xl font-bold text-purple-500">{functionsM[0]}<span className="text-sm text-muted-foreground">M inv</span></span>
                </div>
                <Slider
                  value={functionsM}
                  onValueChange={setFunctionsM}
                  max={10}
                  step={0.5}
                  className="w-full"
                />
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>0</span>
                  <span>10M invocations</span>
                </div>
              </div>

              {/* API Requests */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/20">
                      <Zap className="w-5 h-5 text-emerald-500" />
                    </div>
                    <span className="font-semibold">API Requests</span>
                  </div>
                  <span className="text-2xl font-bold text-emerald-500">{apiRequestsK[0]}<span className="text-sm text-muted-foreground">K/mo</span></span>
                </div>
                <Slider
                  value={apiRequestsK}
                  onValueChange={setApiRequestsK}
                  max={1000}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>0</span>
                  <span>1M requests</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8 relative overflow-hidden"
          >
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-oracle/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                Estimated Monthly Costs
              </h3>

              <div className="space-y-4">
                {estimates.map((estimate, index) => {
                  const isLowest = estimate.monthly === lowestPrice;
                  const savingsPercent = ((estimates[estimates.length - 1].monthly - estimate.monthly) / estimates[estimates.length - 1].monthly * 100).toFixed(0);
                  
                  return (
                    <motion.div
                      key={estimate.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`p-4 rounded-xl border transition-all duration-300 ${
                        isLowest 
                          ? 'bg-primary/10 border-primary/50 glow-primary' 
                          : 'bg-secondary/50 border-border/50 hover:border-border'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg gradient-${estimate.id}`}>
                            <CloudIcon provider={estimate.id} size={20} className="text-white" />
                          </div>
                          <div>
                            <p className="font-semibold">{estimate.provider}</p>
                            {estimate.savings && (
                              <p className="text-xs text-muted-foreground">{estimate.savings}</p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-xl font-bold ${isLowest ? 'text-primary' : ''}`}>
                            ${estimate.monthly.toFixed(2)}
                          </p>
                          {isLowest && (
                            <span className="text-xs font-medium text-primary bg-primary/20 px-2 py-0.5 rounded-full">
                              Best Value
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <p className="mt-6 text-xs text-muted-foreground text-center">
                * Estimates are illustrative. Actual costs vary by region, instance type, and usage patterns.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
