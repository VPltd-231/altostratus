import type { ReactNode } from 'react';
import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';

/**
 * Loads only the animation features we use (~15 kB instead of the full
 * framer-motion bundle) and honours the visitor's reduced-motion setting.
 * Use `m.*` components (not `motion.*`) everywhere inside this provider.
 */
export const MotionProvider = ({ children }: { children: ReactNode }) => (
  <MotionConfig reducedMotion="user">
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  </MotionConfig>
);
