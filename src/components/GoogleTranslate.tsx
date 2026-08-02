import { useEffect, useRef } from 'react';
import { useLanguage } from '@/hooks/use-language';

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

const SCRIPT_ID = 'google-translate-script';

export const setTranslateCookie = (code: string) => {
  const value = code === 'en' ? '/en/en' : `/en/${code}`;
  const host = window.location.hostname;
  document.cookie = `googtrans=${value};path=/`;
  document.cookie = `googtrans=${value};path=/;domain=${host}`;
  document.cookie = `googtrans=${value};path=/;domain=.${host}`;
};

/**
 * Loads the Google Website Translator widget once. The widget reads the
 * `googtrans` cookie at boot, so the language segment of the URL is written to
 * the cookie before the script initialises. English is the source language.
 */
export const GoogleTranslate = () => {
  const { language } = useLanguage();
  const bootLanguage = useRef(language.code);

  useEffect(() => {
    setTranslateCookie(language.code);

    if (document.getElementById(SCRIPT_ID)) {
      // Language changed after boot (e.g. browser back/forward) — the widget
      // can only re-run against the cookie on a fresh document.
      if (bootLanguage.current !== language.code) window.location.reload();
      return;
    }

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate?.TranslateElement) return;
      new window.google.translate.TranslateElement(
        { pageLanguage: 'en', autoDisplay: false },
        'google_translate_element'
      );
    };

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);
  }, [language.code]);

  return <div id="google_translate_element" className="hidden" aria-hidden="true" />;
};
