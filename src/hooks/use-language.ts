import { useLocation } from 'react-router-dom';
import { getLanguage, languagePaths, LanguageMeta } from '@/lib/languages';

/** Derives the active language + the language-agnostic route from the URL. */
export const useLanguage = (): { language: LanguageMeta; route: string } => {
  const { pathname, hash } = useLocation();
  const segments = pathname.split('/').filter(Boolean);
  const first = segments[0];

  if (first && languagePaths.includes(first)) {
    const route = '/' + segments.slice(1).join('/');
    return { language: getLanguage(first), route: (route === '/' ? '/' : route) + hash };
  }

  return { language: getLanguage('en'), route: pathname + hash };
};
