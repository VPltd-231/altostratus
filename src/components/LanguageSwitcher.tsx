import { Globe, Check, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/hooks/use-language';
import { languages, localizedPath } from '@/lib/languages';
import { setTranslateCookie } from '@/components/GoogleTranslate';

export const LanguageSwitcher = () => {
  const { language, route } = useLanguage();

  const select = (code: string) => {
    if (code === language.code) return;
    // The Google widget applies its language at document load, so switching
    // language performs a real navigation to the localized URL.
    setTranslateCookie(code);
    window.location.assign(localizedPath(route.split('#')[0] || '/', code));
  };

  return (
    <div className="notranslate" translate="no">
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label="Select language"
          className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Globe className="h-4 w-4" aria-hidden />
          <span className="hidden sm:inline">
            {language.flag} {language.label}
          </span>
          <span className="sm:hidden">{language.flag}</span>
          <ChevronDown className="h-3.5 w-3.5" aria-hidden />
        </DropdownMenuTrigger>
        {/* Content is portalled outside the wrapper above, so opt out of translation here too. */}
        <DropdownMenuContent
          align="end"
          translate="no"
          className="notranslate max-h-[70vh] w-60 overflow-y-auto rounded-xl p-2"
        >
          {languages.map((l) => (
            <DropdownMenuItem
              key={l.code}
              onSelect={() => select(l.code)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
                l.code === language.code ? 'bg-primary/10 text-primary' : ''
              }`}
            >
              <span className="text-base">{l.flag}</span>
              <span className="flex-1 text-left">
                <span className="block font-medium">{l.label}</span>
                <span className="block text-xs text-muted-foreground">{l.country}</span>
              </span>
              {l.code === language.code && <Check className="h-4 w-4" aria-hidden />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
