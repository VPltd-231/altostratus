import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, ArrowRight, Star, Rocket, TrendingUp, Mail, CheckCircle, Shield, Clock, Users, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export const CreditsHardSell: FC = () => {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setShowEmailForm(false);
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  const upsellFeatures = [
    { 
      icon: TrendingUp, 
      title: 'Funding Options', 
      desc: 'Learn how to take advantage of promotions',
      gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
      glow: 'group-hover:shadow-[0_0_40px_rgba(139,92,246,0.4)]',
      bgAccent: 'bg-violet-500/10'
    },
    { 
      icon: Zap, 
      title: 'Quick Wins', 
      desc: 'Proven strategies that deliver results fast',
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
      glow: 'group-hover:shadow-[0_0_40px_rgba(20,184,166,0.4)]',
      bgAccent: 'bg-emerald-500/10'
    },
    { 
      icon: Rocket, 
      title: 'Stack Credits', 
      desc: 'Combine multiple programs legally',
      gradient: 'from-amber-500 via-orange-500 to-rose-500',
      glow: 'group-hover:shadow-[0_0_40px_rgba(249,115,22,0.4)]',
      bgAccent: 'bg-amber-500/10'
    },
  ];

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-oracle/5" />
        
        <motion.div 
          className="absolute top-20 left-[10%] w-72 h-72 bg-primary/20 rounded-full blur-[100px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-[10%] w-96 h-96 bg-oracle/15 rounded-full blur-[120px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gcp/10 rounded-full blur-[150px]"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />

        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Floating badge */}
          <motion.div 
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card border border-primary/30 mb-8"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-semibold bg-gradient-to-r from-primary to-gcp bg-clip-text text-transparent">
              EXCLUSIVE INSIDER GUIDE
            </span>
            <Sparkles className="w-4 h-4 text-gcp animate-pulse" />
          </motion.div>

          {/* Main headline */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            <span className="text-foreground">Unlock</span>{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-primary via-gcp to-azure bg-clip-text text-transparent">
                $100,000+
              </span>
              <motion.div 
                className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-gcp/20 to-azure/20 blur-xl -z-10"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </span>
            <br />
            <span className="text-foreground">in Cloud Credits</span>
          </h2>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            The complete playbook for startups, developers, and enterprises to secure 
            <span className="text-foreground font-semibold"> 5 to 6 figures</span> in free cloud 
            credits from AWS, Google Cloud, Azure, and more.
          </p>

          {/* Redesigned Upsell Feature Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14">
            {upsellFeatures.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: i * 0.2,
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{ scale: 1.03, y: -6 }}
                className={`group relative rounded-2xl overflow-hidden transition-all duration-500 ${feature.glow}`}
              >
                {/* Soft background accent */}
                <div className={`absolute inset-0 ${feature.bgAccent} opacity-50 group-hover:opacity-80 transition-opacity duration-300`} />
                
                {/* Gradient border line at top */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient}`} />
                
                {/* Inner content */}
                <div className="relative glass-card rounded-2xl p-6 h-full border border-border/40 bg-card/80 backdrop-blur-xl">
                  {/* Icon with soft gradient background */}
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:scale-110 group-hover:rotate-2 transition-all duration-300`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="font-semibold text-base mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Restyled CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ 
              delay: 0.4,
              duration: 0.7,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="relative rounded-3xl p-[2px] bg-gradient-to-r from-primary via-gcp to-azure"
          >
            <div className="glass-card rounded-3xl p-8 sm:p-12 relative overflow-hidden bg-card/98">
              {/* Inner gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-oracle/5" />
              
              <div className="relative z-10">
                {/* Animated Stars */}
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0, rotate: -180 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 200 }}
                    >
                      <Star className="w-6 h-6 text-yellow-500 fill-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
                    </motion.div>
                  ))}
                </div>

                <p className="text-xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                  Join 10,000+ developers & founders
                </p>
                <p className="text-muted-foreground mb-8">
                  who've already saved millions on cloud infrastructure
                </p>

                {/* Email Form or CTA */}
                <AnimatePresence mode="wait">
                  {!showEmailForm ? (
                    <motion.div
                      key="cta"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                      <Button
                        onClick={() => setShowEmailForm(true)}
                        size="lg"
                        className="group relative overflow-hidden bg-gradient-to-r from-primary via-gcp to-azure text-white font-bold px-10 py-7 text-lg rounded-2xl hover:shadow-[0_0_50px_rgba(59,130,246,0.4)] transition-all duration-300"
                      >
                        <motion.span 
                          className="absolute inset-0 bg-white/20"
                          initial={{ x: '-100%', opacity: 0 }}
                          whileHover={{ x: '100%', opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                        <span className="relative flex items-center gap-3">
                          <Zap className="w-6 h-6" />
                          Get the Complete Guide
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </span>
                      </Button>
                      
                      <div className="flex items-center gap-3">
                        <span className="text-2xl line-through text-muted-foreground/50">$59</span>
                        <Button
                          variant="outline"
                          size="lg"
                          className="font-semibold px-6 py-6 text-base rounded-xl border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
                        >
                          <Sparkles className="w-4 h-4 mr-2" />
                          Sneak Peek
                        </Button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      onSubmit={handleSubmit}
                      className="max-w-md mx-auto"
                    >
                      {!isSubmitted ? (
                        <div className="space-y-4">
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                              type="email"
                              placeholder="Enter your email address"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="pl-12 py-6 text-lg rounded-xl bg-secondary/50 border-border/50 focus:border-primary"
                              required
                            />
                          </div>
                          <div className="flex gap-3">
                            <Button
                              type="submit"
                              className="flex-1 bg-gradient-to-r from-primary to-gcp text-white font-bold py-6 rounded-xl"
                            >
                              <CheckCircle className="w-5 h-5 mr-2" />
                              Send Me the Guide
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              onClick={() => setShowEmailForm(false)}
                              className="px-4 rounded-xl"
                            >
                              <X className="w-5 h-5" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex flex-col items-center gap-3 py-4"
                        >
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 0.5 }}
                          >
                            <CheckCircle className="w-16 h-16 text-green-500" />
                          </motion.div>
                          <p className="text-xl font-bold">Check your inbox! 🎉</p>
                        </motion.div>
                      )}
                    </motion.form>
                  )}
                </AnimatePresence>

                {/* Bottom Trust Strip with Icons */}
                <div className="flex flex-wrap justify-center gap-8 mt-10 pt-8 border-t border-border/30">
                  {[
                    { icon: Shield, text: 'No credit card required' },
                    { icon: Zap, text: 'Instant access' },
                    { icon: Clock, text: 'Updated for 2026' },
                    { icon: Users, text: '10K+ downloads' },
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      <item.icon className="w-4 h-4 text-primary" />
                      {item.text}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
