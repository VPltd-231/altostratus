import { FC, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, ArrowRight, Star, Rocket, TrendingUp, Mail, CheckCircle, Shield, Clock, X, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

/**
 * Where the email form posts to (a serverless function, Formspree, etc.).
 * Set VITE_GUIDE_SIGNUP_URL at build time. Without it the form is disabled
 * rather than pretending to send anything.
 */
const SIGNUP_URL = import.meta.env.VITE_GUIDE_SIGNUP_URL as string | undefined;

type SubmitStatus = 'idle' | 'sending' | 'done' | 'error';

export const CreditsHardSell: FC = () => {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !SIGNUP_URL || status === 'sending') return;
    setStatus('sending');
    try {
      const res = await fetch(SIGNUP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, source: 'credits-guide' }),
      });
      if (!res.ok) throw new Error(`Signup failed: ${res.status}`);
      setStatus('done');
      window.setTimeout(() => {
        setShowEmailForm(false);
        setStatus('idle');
        setEmail('');
      }, 4000);
    } catch {
      setStatus('error');
    }
  };

  const upsellFeatures = [
    { 
      icon: TrendingUp, 
      title: 'Funding Options', 
      desc: 'Receive approval for up to 6 figures in free balance\u00a0',
      gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
      glow: 'group-hover:shadow-[0_0_40px_rgba(139,92,246,0.4)]',
      bgAccent: 'bg-violet-500/10'
    },
    { 
      icon: Zap, 
      title: 'Optimized for Efficiency', 
      desc: 'Scalable, growth-optimized infrastructure & networking quick deployment',
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
      glow: 'group-hover:shadow-[0_0_40px_rgba(20,184,166,0.4)]',
      bgAccent: 'bg-emerald-500/10'
    },
    { 
      icon: Rocket, 
      title: 'Market Mover Advantage', 
      desc: 'Shorten speed to market & reduce launch costs',
      gradient: 'from-amber-500 via-orange-500 to-rose-500',
      glow: 'group-hover:shadow-[0_0_40px_rgba(249,115,22,0.4)]',
      bgAccent: 'bg-amber-500/10'
    },
  ];

  return (
    <section className="py-24 px-4 relative">
      <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-oracle/5" />

      <div className="max-w-5xl mx-auto relative z-10">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Floating badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card border border-primary/30 mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold bg-gradient-to-r from-primary to-gcp bg-clip-text text-transparent">
              EXCLUSIVE INSIDER GUIDE
            </span>
            <Sparkles className="w-4 h-4 text-gcp" />
          </div>

          {/* Main headline */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            <span className="text-foreground">Unlock</span>{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-primary via-gcp to-azure bg-clip-text text-transparent">
                $100,000+
              </span>
            </span>
            <br />
            <span className="text-foreground">in Cloud Credits</span>
          </h2>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            The complete playbook for startups, developers, and enterprises to secure 
            <span className="text-foreground font-semibold"> 5 to 6 figures</span> in free cloud 
            credits from AWS, Google Cloud, Azure, and more.
          </p>


          {/* Redesigned Upsell Feature Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14">
            {upsellFeatures.map((feature, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ delay: Math.min(i * 0.08, 0.24), duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative rounded-2xl overflow-hidden transition-shadow duration-300 hover:-translate-y-1 ${feature.glow}`}
              >
                {/* Soft background accent */}
                <div className={`absolute inset-0 ${feature.bgAccent} opacity-50 group-hover:opacity-80 transition-opacity duration-300`} />
                
                {/* Gradient border line at top */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient}`} />
                
                {/* Inner content */}
                <div className="relative glass-card rounded-2xl p-6 h-full border border-border/40">
                  {/* Icon with soft gradient background */}
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:scale-110 group-hover:rotate-2 transition-all duration-300`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="font-semibold text-base mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              </m.div>
            ))}
          </div>

          {/* Restyled CTA Section */}
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl p-[2px] bg-gradient-to-r from-primary via-gcp to-azure"
          >
            <div className="glass-card rounded-3xl p-8 sm:p-12 relative overflow-hidden bg-card/98">
              {/* Inner gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-oracle/5" />
              
              <div className="relative z-10">
                <div className="flex justify-center gap-1 mb-4" aria-hidden>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>

                <p className="text-xl font-bold mb-2">
                  The startup playbook for free cloud credits
                </p>
                <p className="text-muted-foreground mb-8">
                  Programs, eligibility and application tips for AWS, Google Cloud, Azure and more
                </p>

                {/* Email Form or CTA */}
                <AnimatePresence mode="wait">
                  {!showEmailForm ? (
                    <m.div
                      key="cta"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                      <Button
                        onClick={() => setShowEmailForm(true)}
                        disabled={!SIGNUP_URL}
                        size="lg"
                        className="group bg-gradient-to-r from-primary via-gcp to-azure text-white font-bold px-10 py-7 text-lg rounded-2xl transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.35)]"
                      >
                        <span className="flex items-center gap-3">
                          <Zap className="w-6 h-6" />
                          {SIGNUP_URL ? 'Get the Complete Guide' : 'Guide coming soon'}
                          {SIGNUP_URL && <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />}
                        </span>
                      </Button>
                    </m.div>
                  ) : (
                    <m.form
                      key="form"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      onSubmit={handleSubmit}
                      className="max-w-md mx-auto"
                    >
                      {status !== 'done' ? (
                        <div className="space-y-4">
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                              type="email"
                              placeholder="Enter your email address"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              aria-label="Email address"
                              autoComplete="email"
                              className="pl-12 py-6 text-lg rounded-xl bg-secondary/50 border-border/50 focus:border-primary"
                              required
                            />
                          </div>
                          {status === 'error' && (
                            <p role="alert" className="flex items-center justify-center gap-2 text-sm text-destructive">
                              <AlertCircle className="w-4 h-4" />
                              Something went wrong. Please try again.
                            </p>
                          )}
                          <div className="flex gap-3">
                            <Button
                              type="submit"
                              disabled={status === 'sending'}
                              className="flex-1 bg-gradient-to-r from-primary to-gcp text-white font-bold py-6 rounded-xl"
                            >
                              {status === 'sending' ? (
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              ) : (
                                <CheckCircle className="w-5 h-5 mr-2" />
                              )}
                              {status === 'sending' ? 'Sending…' : 'Send Me the Guide'}
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
                        <div role="status" className="flex flex-col items-center gap-3 py-4">
                          <CheckCircle className="w-16 h-16 text-green-500" />
                          <p className="text-xl font-bold">Thanks! We've got your email.</p>
                        </div>
                      )}
                    </m.form>
                  )}
                </AnimatePresence>

                {/* Bottom Trust Strip with Icons */}
                <div className="flex flex-wrap justify-center gap-8 mt-10 pt-8 border-t border-border/30">
                  {[
                    { icon: Shield, text: 'No credit card required' },
                    { icon: Clock, text: 'Updated for 2026' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <item.icon className="w-4 h-4 text-primary" />
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </m.div>

        </m.div>
      </div>
    </section>
  );
};
