import { Cloud } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/use-language';
import { localizedPath } from '@/lib/languages';

/** Static brand mark (replaces the always-animating 3D logo). */
export const Logo = () => {
  const { language } = useLanguage();
  return (
    <Link
      to={localizedPath('/', language.code)}
      className="notranslate flex items-center gap-2.5"
      translate="no"
      aria-label="RunRateHost home"
    >
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-primary to-gcp">
        <Cloud className="h-5 w-5 text-white" aria-hidden />
      </span>
      <span className="text-xl font-bold">
        <span className="gradient-text">RunRate</span>
        <span className="text-foreground">Host</span>
      </span>
    </Link>
  );
};
