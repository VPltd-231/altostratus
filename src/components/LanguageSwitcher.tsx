import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/hooks/use-language';
import { languages, localizedPath } from '@/lib/languages';

export const LanguageSwitcher = () => {
  const { language, route } = useLanguage();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const select = (code: string) => {
    setOpen(false);
    navigate(localizedPath(route.split('#')[0] || '/', code));
  };

  return (
    <div className="relative notranslate" translate="no">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Select language"
        aria-expanded={open}
        className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{language.flag} {language.label}</span>
        <span className="sm:hidden">{language.flag}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.ul
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="absolute right-0 mt-2 w-60 max-h-[70vh] overflow-y-auto glass-card rounded-xl p-2 z-50 shadow-xl"
            >
              {languages.map((l) => (
                <li key={l.code}>
                  <button
                    onClick={() => select(l.code)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      l.code === language.code
                        ? 'bg-primary/10 text-primary'
                        : 'hover:bg-secondary text-foreground'
                    }`}
                  >
                    <span className="text-base">{l.flag}</span>
                    <span className="flex-1 text-left">
                      <span className="block font-medium">{l.label}</span>
                      <span className="block text-xs text-muted-foreground">{l.country}</span>
                    </span>
                    {l.code === language.code && <Check className="w-4 h-4" />}
                  </button>
                </li>
              ))}
            </motion.ul>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
