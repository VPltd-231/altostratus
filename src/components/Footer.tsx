import { FC } from 'react';
import { Cloud, Github, ExternalLink } from 'lucide-react';

export const Footer: FC = () => {
  return (
    <footer className="border-t border-border py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and description */}
          <div className="flex items-center gap-3">
            <Cloud className="w-6 h-6 text-primary" />
            <span className="font-bold">CloudCompare</span>
            <span className="text-muted-foreground text-sm">
              — Your guide to cloud infrastructure
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span>Built with precision for engineers</span>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 pt-6 border-t border-border/50 text-center text-xs text-muted-foreground">
          <p>
            Information is based on publicly available data and may change. 
            Always verify with official provider documentation before making decisions.
          </p>
          <p className="mt-2">
            AWS, Google Cloud, Microsoft Azure, Oracle Cloud, and IBM Cloud are trademarks of their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
};
