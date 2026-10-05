import { useEffect, useRef } from 'react';
import { useLanguage } from '@/hooks/use-language';

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
    __gtDomPatched?: boolean;
  }
}

const SCRIPT_ID = 'google-translate-script';

const cookieVariants = (host: string) => ['path=/', `path=/;domain=${host}`, `path=/;domain=.${host}`];

export const setTranslateCookie = (code: string) => {
  const value = code === 'en' ? '/en/en' : `/en/${code}`;
  cookieVariants(window.location.hostname).forEach((attrs) => {
    document.cookie = `googtrans=${value};${attrs}`;
  });
};

const clearTranslateCookie = () => {
  cookieVariants(window.location.hostname).forEach((attrs) => {
    document.cookie = `googtrans=;${attrs};expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  });
};

/**
 * Google Translate wraps text nodes in <font> tags. When React later updates
 * or removes one of those nodes it throws "removeChild/insertBefore: The node
 * to be removed is not a child of this node". These guards make React's DOM
 * calls a no-op in that situation instead of crashing the page.
 */
const patchDomForTranslate = () => {
  if (window.__gtDomPatched) return;
  window.__gtDomPatched = true;

  const removeChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function <T extends Node>(this: Node, child: T): T {
    if (child.parentNode !== this) return child;
    return removeChild.call(this, child) as T;
  };

  const insertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function <T extends Node>(this: Node, node: T, ref: Node | null): T {
    if (ref && ref.parentNode !== this) return node;
    return insertBefore.call(this, node, ref) as T;
  };
};

const whenIdle = (cb: () => void) => {
  const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number })
    .requestIdleCallback;
  if (ric) ric(cb, { timeout: 3000 });
  else window.setTimeout(cb, 1500);
};

/**
 * Loads the Google Website Translator only for visitors on a translated URL
 * (/de, /fr, ...), after the page has gone idle. English visitors never
 * download the script. The widget reads the `googtrans` cookie at boot, so the
 * language segment of the URL is written to the cookie first.
 */
export const GoogleTranslate = () => {
  const { language } = useLanguage();
  const bootLanguage = useRef(language.code);

  useEffect(() => {
    const alreadyLoaded = !!document.getElementById(SCRIPT_ID);

    if (language.code === 'en') {
      clearTranslateCookie();
      // Back/forward from a translated page to English: the widget has already
      // rewritten the DOM, so a fresh document is the only clean reset.
      if (alreadyLoaded && bootLanguage.current !== 'en') window.location.reload();
      return;
    }

    setTranslateCookie(language.code);

    if (alreadyLoaded) {
      if (bootLanguage.current !== language.code) window.location.reload();
      return;
    }

    whenIdle(() => {
      if (document.getElementById(SCRIPT_ID)) return;
      patchDomForTranslate();

      window.googleTranslateElementInit = () => {
        if (!window.google?.translate?.TranslateElement) return;
        new window.google.translate.TranslateElement(
          { pageLanguage: 'en', autoDisplay: false },
          'google_translate_element',
        );
      };

      const script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    });
  }, [language.code]);

  return <div id="google_translate_element" className="hidden" aria-hidden="true" />;
};
