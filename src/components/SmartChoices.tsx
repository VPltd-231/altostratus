import { useState } from 'react';
import { m } from 'framer-motion';
import { RECOMMENDATIONS, type Recommendation } from '@/data/content';


/**
 * Flip card that works with mouse, keyboard and touch: tap/Enter toggles it,
 * and on hover-capable screens it also flips on hover.
 */
const FlipCard = ({ rec, index }: { rec: Recommendation; index: number }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <m.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <button
        type="button"
        aria-pressed={flipped}
        aria-label={`${rec.title}: ${rec.provider}. Press to ${flipped ? 'hide' : 'show'} details`}
        onClick={() => setFlipped((v) => !v)}
        className="group perspective-1000 block h-48 w-full rounded-2xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <div
          className={`preserve-3d relative h-full w-full transition-transform duration-500 [@media(hover:hover)]:group-hover:[transform:rotateY(180deg)] ${
            flipped ? '[transform:rotateY(180deg)]' : ''
          }`}
        >
          <div className="backface-hidden absolute inset-0">
            <div className={`h-full rounded-2xl bg-gradient-to-br p-[2px] ${rec.gradient}`}>
              <div className="glass-card flex h-full flex-col justify-between rounded-2xl bg-card p-6">
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {rec.title}
                    </span>
                    <span className="text-2xl" aria-hidden>{rec.icon}</span>
                  </div>
                  <p className="mb-2 text-2xl font-bold">{rec.provider}</p>
                </div>
                <p className="text-sm text-muted-foreground">{rec.reason}</p>
                <span className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                  Tap for more →
                </span>
              </div>
            </div>
          </div>

          <div className="backface-hidden rotate-y-180 absolute inset-0">
            <div
              className={`flex h-full flex-col justify-center rounded-2xl bg-gradient-to-br p-6 text-white ${rec.gradient}`}
            >
              <div className="mb-4 text-4xl" aria-hidden>{rec.icon}</div>
              <p className="text-sm font-medium leading-relaxed">{rec.backText}</p>
            </div>
          </div>
        </div>
      </button>
    </m.div>
  );
};

export const SmartChoices = () => (
  <section className="relative bg-secondary/30 px-4 py-24">
    <div className="relative z-10 mx-auto max-w-5xl">
      <div className="mb-12 text-center">
        <div className="glass-card mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 px-4 py-2">
          <span className="h-2 w-2 rounded-full bg-primary" aria-hidden />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Overview</span>
        </div>

        <h2 className="mb-4 text-3xl font-bold sm:text-5xl">
          <span className="gradient-text">Quick</span> Peek
        </h2>
        <p className="mx-auto max-w-xl text-muted-foreground">
          Tap or hover a card to reveal detailed insights for each use case
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {RECOMMENDATIONS.map((rec, i) => (
          <FlipCard key={rec.title} rec={rec} index={i} />
        ))}
      </div>
    </div>
  </section>
);
