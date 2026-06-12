import { cn } from '@/lib/utils';

interface TagProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md';
}

export function Tag({ label, active = false, onClick, size = 'sm' }: TagProps) {
  const isButton = !!onClick;
  const Component = isButton ? 'button' : 'span';

  return (
    <Component
      type={isButton ? 'button' : undefined}
      onClick={onClick}
      className={cn(
        'inline-flex items-center font-mono uppercase tracking-wider transition-all',
        size === 'sm' ? 'text-[0.625rem] px-2 py-1' : 'text-xs px-3 py-1.5',
        active
          ? 'bg-[var(--color-accent-glow)] text-[var(--color-accent)] border border-[var(--color-border-accent)]'
          : 'bg-transparent text-[var(--color-text-muted)] border border-[rgba(255,255,255,0.06)]',
        isButton && 'cursor-pointer hover:text-[var(--color-text-secondary)] hover:border-[rgba(255,255,255,0.12)]'
      )}
    >
      {label}
    </Component>
  );
}
