import { useEffect } from 'react';
import { useLanguage } from '@/hooks/use-language';

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

const SCRIPT_ID = 'google-translate-script';

const setCookie = (value: string) => {
  const host = window.location.hostname;
  document.cookie = `googtrans=${value};path=/`;
  document.cookie = `googtrans=${value};path=/;domain=${host}`;
  document.cookie = `googtrans=${value};path=/;domain=.${host}`;
};

/**
 * Loads the Google Website Translator widget once and keeps the rendered page
 * in sync with the language segment of the URL. English is the source language
 * and never goes through the widget.
 */
export const GoogleTranslate = () => {
  const { language } = useLanguage();

  useEffect(() => {
    if (document.getElementById(SCRIPT_ID)) return;

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate?.TranslateElement) return;
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          autoDisplay: false,
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        'google_translate_element'
      );
    };

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    const target = language.code;
    setCookie(target === 'en' ? '/en/en' : `/en/${target}`);

    let attempts = 0;
    const apply = () => {
      const select = document.querySelector<HTMLSelectElement>('select.goog-te-combo');
      if (!select) {
        if (attempts++ < 40) window.setTimeout(apply, 250);
        return;
      }
      const value = target === 'en' ? '' : target;
      if (select.value === value) return;
      select.value = value;
      select.dispatchEvent(new Event('change'));
    };

    apply();
  }, [language.code]);

  return <div id="google_translate_element" className="hidden" aria-hidden="true" />;
};
