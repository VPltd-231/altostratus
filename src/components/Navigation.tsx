import { FC, useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';

// Order matches the order of the sections on the page.
const navLinks = [
  { href: '#providers', label: 'Providers' },
  { href: '#comparison', label: 'Compare' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#credits', label: 'Credits' },
  { href: '#recommendations', label: 'Tips' },
];

export const Navigation: FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Scrolled state: passive listener, state only changes when the boolean flips.
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section: IntersectionObserver instead of getBoundingClientRect() on
  // every scroll event (which forced a layout each time).
  useEffect(() => {
    const observed = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );

    const mo = new MutationObserver(() => observeAll());

    const observeAll = () => {
      navLinks.forEach(({ href }) => {
        const el = document.getElementById(href.slice(1));
        if (el && !observed.has(el)) {
          observed.add(el);
          io.observe(el);
        }
      });
      // Everything found: stop watching the DOM.
      if (observed.size === navLinks.length) mo.disconnect();
    };

    observeAll();
    // Lazy sections mount later; re-check as the DOM grows.
    if (observed.size < navLinks.length) mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  // Close the mobile menu with Escape.
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsMobileMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-40 transition-[padding,background-color] duration-300 ${
          isScrolled ? 'glass-nav py-3' : 'py-5'
        }`}
        aria-label="Primary"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
          <Logo />

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                  activeSection === link.href.slice(1)
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                {link.label}
              </a>
            ))}
            <LanguageSwitcher />
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="icon"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="glass-card fixed inset-x-0 top-16 z-30 p-6 md:hidden"
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`rounded-lg px-4 py-3 text-lg font-medium transition-colors ${
                  activeSection === link.href.slice(1) ? 'bg-primary/10 text-primary' : 'hover:bg-secondary'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
