import { motion, useScroll, useTransform } from 'framer-motion';
import { Cloud, Server, Database, Shield, Zap, ArrowDown } from 'lucide-react';
import { CloudIcon } from './CloudIcon';
import { Button } from './ui/button';
import { useRef } from 'react';

export const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
      {/* Animated background grid with parallax */}
      <motion.div className="absolute inset-0 opacity-20" style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}>
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </motion.div>

      {/* Floating cloud icons */}
      <motion.div 
        className="absolute top-20 left-[10%] text-aws opacity-30"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <CloudIcon provider="aws" size={80} />
      </motion.div>
      
      <motion.div 
        className="absolute top-32 right-[15%] text-gcp opacity-30"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <CloudIcon provider="gcp" size={70} />
      </motion.div>
      
      <motion.div 
        className="absolute bottom-32 left-[20%] text-azure opacity-30"
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <CloudIcon provider="azure" size={60} />
      </motion.div>
      
      <motion.div 
        className="absolute bottom-40 right-[25%] text-oracle opacity-30"
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <CloudIcon provider="oracle" size={65} />
      </motion.div>

      <motion.div 
        className="absolute top-1/2 right-[8%] text-ibm opacity-30"
        animate={{ y: [0, -22, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      >
        <CloudIcon provider="ibm" size={55} />
      </motion.div>

      {/* Main content with parallax */}
      <motion.div 
        className="relative z-10 max-w-5xl mx-auto text-center"
        style={{ y, opacity, scale }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Cloud className="w-10 h-10 text-primary" />
            <span className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
              RunRateHost · Cloud Cost Intelligence
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            <span className="gradient-text">Save On Your</span>
            <br />
            <span className="text-foreground">Cloud Hosting Infrastructure</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            RunRateHost benchmarks AWS, Google Cloud, Azure, Oracle, and IBM side-by-side —
            uncover free tiers, hidden fees, and the fastest path to a lower monthly run-rate.
          </p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-10"
          >
            <Button 
              onClick={scrollToPricing}
              size="lg"
              className="group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Started
              <ArrowDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Feature badges */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {[
            { icon: Server, label: 'Compute' },
            { icon: Database, label: 'Databases' },
            { icon: Shield, label: 'Security' },
            { icon: Zap, label: 'Serverless' },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-4 py-2 rounded-full glass-card"
            >
              <item.icon className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Provider logos row */}
        <motion.div 
          className="flex flex-wrap justify-center items-center gap-8 sm:gap-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {[
            { id: 'aws' as const, color: 'text-aws' },
            { id: 'gcp' as const, color: 'text-gcp' },
            { id: 'azure' as const, color: 'text-azure' },
            { id: 'oracle' as const, color: 'text-oracle' },
            { id: 'ibm' as const, color: 'text-ibm' },
          ].map((provider, i) => (
            <motion.div
              key={provider.id}
              className={`${provider.color} opacity-60 hover:opacity-100 transition-all duration-300 cursor-pointer`}
              whileHover={{ scale: 1.15, y: -5 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.6, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              <CloudIcon provider={provider.id} size={36} />
            </motion.div>
          ))}
        </motion.div>

      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ opacity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <motion.div 
            className="w-1.5 h-3 bg-primary rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};
