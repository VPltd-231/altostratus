import { FC } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Gift, ArrowRight, Star, Rocket, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';

export const CreditsHardSell: FC = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0">
        {/* Gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-oracle/5" />
        
        {/* Floating orbs */}
        <motion.div 
          className="absolute top-20 left-[10%] w-72 h-72 bg-primary/20 rounded-full blur-[100px]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-[10%] w-96 h-96 bg-oracle/15 rounded-full blur-[120px]"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gcp/10 rounded-full blur-[150px]"
          animate={{ 
            rotate: [0, 360],
          }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
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

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
            The complete playbook for startups, developers, and enterprises to secure 
            <span className="text-foreground font-semibold"> 5 to 6 figures</span> in free cloud 
            credits from AWS, Google Cloud, Azure, and more. Stop paying full price.
          </p>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {[
              { icon: Gift, title: 'Startup Programs', desc: 'Access every major provider\'s startup initiative', color: 'text-primary' },
              { icon: TrendingUp, title: 'Step-by-Step', desc: 'Exact application strategies that work', color: 'text-gcp' },
              { icon: Rocket, title: 'Stack Credits', desc: 'Combine multiple programs legally', color: 'text-oracle' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-xl p-5 border border-border/50 hover:border-primary/30 transition-all duration-300 group"
              >
                <feature.icon className={`w-8 h-8 ${feature.color} mb-3 group-hover:scale-110 transition-transform`} />
                <h3 className="font-bold mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-8 sm:p-12 border border-primary/20 relative overflow-hidden"
          >
            {/* Inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-oracle/10" />
            
            <div className="relative z-10">
              {/* Stars decoration */}
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  </motion.div>
                ))}
              </div>

              <p className="text-lg font-semibold mb-2">Join 10,000+ developers & founders</p>
              <p className="text-muted-foreground mb-8">
                who've already saved millions on cloud infrastructure
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="group relative overflow-hidden bg-gradient-to-r from-primary via-gcp to-azure text-white font-bold px-8 py-6 text-lg rounded-xl hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300"
                >
                  <motion.span 
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: '-100%', opacity: 0 }}
                    whileHover={{ x: '100%', opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="relative flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Get the Complete Guide
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
                
                <p className="text-sm text-muted-foreground">
                  <span className="line-through opacity-60">$49</span>{' '}
                  <span className="text-primary font-bold">FREE</span> for a limited time
                </p>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap justify-center gap-6 mt-8 pt-6 border-t border-border/50">
                {['No credit card required', 'Instant access', 'Updated for 2026'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
