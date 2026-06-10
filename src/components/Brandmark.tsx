import { cn } from '@/lib/utils';

/** LeadLens lens mark — a stylized aperture/lens with a focus dot. */
export function Brandmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-xl bg-foreground text-background',
        className
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-[58%]"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
        <circle cx="11" cy="11" r="2.4" fill="var(--brand)" />
        <path
          d="M16.5 16.5L21 21"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'font-serif text-xl font-semibold tracking-tight text-foreground',
        className
      )}
    >
      Lead<span className="text-brand">Lens</span>
    </span>
  );
}
