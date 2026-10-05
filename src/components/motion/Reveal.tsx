import type { ReactNode } from 'react';
import { m } from 'framer-motion';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds. Keep stagger short; long cascades feel slow. */
  delay?: number;
}

/** One-shot fade/slide-in when the element nears the viewport. */
export const Reveal = ({ children, className, delay = 0 }: RevealProps) => (
  <m.div
    className={className}
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '0px 0px -10% 0px' }}
    transition={{ duration: 0.4, delay: Math.min(delay, 0.3), ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </m.div>
);
