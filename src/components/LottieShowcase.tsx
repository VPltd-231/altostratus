import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion } from 'framer-motion';

export const LottieShowcase = () => {
  return (
    <section
      aria-label="Cloud infrastructure animation"
      className="relative px-4 py-16 sm:py-24 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 max-w-5xl mx-auto text-center"
      >
        <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          Connected Cloud Infrastructure
        </span>
        <h2 className="mt-3 text-2xl sm:text-4xl font-bold">
          <span className="gradient-text">Unified</span> Cloud Connectivity
        </h2>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
          See how workloads, devices, and providers link together through modern, encrypted cloud pathways.
        </p>

        <div className="mt-8 mx-auto w-full max-w-2xl aspect-[16/10] rounded-2xl glass-card overflow-hidden border border-border/40">
          <DotLottieReact
            src="https://assets-v2.lottiefiles.com/a/7df71b6e-c672-11ee-95fb-6f78396fdeb3/g0CUieSuhu.lottie"
            loop
            autoplay
          />
        </div>
      </motion.div>
    </section>
  );
};

export default LottieShowcase;
