import { Suspense, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { ChevronDown, Layers } from 'lucide-react';
import { lazyNamed } from '@/lib/lazy';

// The architecture diagram is only downloaded when the visitor opens it.
const CloudArchitecture = lazyNamed(() => import('@/components/CloudArchitecture'), 'CloudArchitecture');

export const TechStackToggle = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="tech-stack-panel"
          className="glass-card group flex w-full items-center justify-between gap-4 rounded-2xl px-6 py-5 transition-colors hover:border-primary/40"
        >
          <div className="flex items-center gap-3 text-left">
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <Layers className="h-5 w-5" aria-hidden />
            </div>
            <div>
              <h2 className="text-lg font-bold sm:text-xl">Cloud Hosting Tech Stack</h2>
              <p className="text-xs text-muted-foreground sm:text-sm">
                Interactive architecture overview — {open ? 'click to hide' : 'click to explore'}
              </p>
            </div>
          </div>
          <ChevronDown
            className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${
              open ? 'rotate-180 text-primary' : ''
            }`}
            aria-hidden
          />
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <m.div
              id="tech-stack-panel"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <Suspense fallback={<div className="h-64" aria-busy="true" />}>
                <CloudArchitecture />
              </Suspense>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
