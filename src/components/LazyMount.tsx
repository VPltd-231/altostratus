import { useEffect, useRef, useState, type ReactNode } from 'react';

interface LazyMountProps {
  children: ReactNode;
  /** Anchor id so in-page links (#pricing) still resolve before mount. */
  id?: string;
  /** Reserved height before mount, so the scrollbar and anchors don't jump. */
  minHeight?: number;
  /** How far before the viewport to start mounting. */
  rootMargin?: string;
}

/**
 * Defers rendering of below-the-fold content until it is about to scroll into
 * view. Combined with lazy-loaded chunks this keeps the initial JS, DOM and
 * paint work small. `content-visibility: auto` then skips layout/paint for
 * sections that have scrolled far off screen.
 */
export const LazyMount = ({ children, id, minHeight = 600, rootMargin = '800px' }: LazyMountProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || show) return;

    // If the visitor jumps to an anchor (#pricing) we must mount immediately.
    const mountOnHash = () => {
      if (id && window.location.hash === `#${id}`) setShow(true);
    };
    mountOnHash();
    window.addEventListener('hashchange', mountOnHash);

    if (typeof IntersectionObserver === 'undefined') {
      setShow(true);
      return () => window.removeEventListener('hashchange', mountOnHash);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      window.removeEventListener('hashchange', mountOnHash);
    };
  }, [id, rootMargin, show]);

  return (
    <div
      ref={ref}
      id={id}
      className={show ? 'cv-auto' : undefined}
      style={show ? undefined : { minHeight }}
    >
      {show ? children : null}
    </div>
  );
};
