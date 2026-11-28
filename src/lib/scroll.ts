/**
 * Jump to a section by id and keep it pinned while lazy sections above it mount
 * and change height (otherwise smooth-scroll lands short of the target).
 */
export function scrollToSection(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;

  // Lets LazyMount mount the target right away (it listens for hashchange).
  history.pushState(null, '', `#${id}`);
  window.dispatchEvent(new HashChangeEvent('hashchange'));

  const stop = performance.now() + 1200;
  const align = () => {
    if (Math.abs(el.getBoundingClientRect().top) > 2) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: 'instant' });
    }
    if (performance.now() < stop) requestAnimationFrame(align);
  };
  align();
}
