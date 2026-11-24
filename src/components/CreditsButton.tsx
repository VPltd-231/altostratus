import { FC } from 'react';
import { DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CreditsButtonProps {
  className?: string;
  size?: 'default' | 'lg';
  onClick?: () => void;
}

/** CTA that scrolls to the credits section: light button with a circling gradient border and flashing hover. Pure CSS animation. */
export const CreditsButton: FC<CreditsButtonProps> = ({ className, onClick, size = 'default' }) => (
  <a
    href="#credits"
    onClick={onClick}
    className={cn('btn-credits', size === 'lg' && 'btn-credits--lg', className)}
  >
    <span className="btn-credits__inner">
      <DollarSign className="h-4 w-4" aria-hidden="true" />
      <span>Get $100'000 Cloud Credits</span>
    </span>
  </a>
);
