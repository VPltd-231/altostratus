import { lazy, type ComponentType } from 'react';

/** `React.lazy` for modules with named exports. */
export const lazyNamed = <T extends Record<string, ComponentType<any>>, K extends keyof T>(
  load: () => Promise<T>,
  name: K,
) => lazy(() => load().then((mod) => ({ default: mod[name] })));
