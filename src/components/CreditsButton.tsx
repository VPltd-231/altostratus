import { FC } from 'react';
import { DollarSign } from 'lucide-react';
import { CHECKOUT_URL } from '@/lib/links';
import { cn } from '@/lib/utils';

interface CreditsButtonProps {
  className?: string;
  onClick?: () => void;
}

/** Header CTA: light button with a circling gradient border and flashing hover. Pure CSS animation. */
export const CreditsButton: FC<CreditsButtonProps> = ({ className, onClick }) => (
  <a
    href={CHECKOUT_URL}
    target="_blank"
    rel="noopener noreferrer"
    onClick={onClick}
    className={cn('btn-credits', className)}
  >
    <span className="btn-credits__inner">
      <DollarSign className="h-4 w-4" aria-hidden="true" />
      <span>Get $100'000 Cloud Credits</span>
    </span>
  </a>
);
