'use client';

import { useState } from 'react';
import { Globe, ArrowRight, Loader2 } from 'lucide-react';
import { YouTubeIcon, InstagramIcon } from '@/components/PlatformIcons';
import { cn } from '@/lib/utils';

type Platform = 'website' | 'youtube' | 'instagram';
type IconType = React.ComponentType<{ className?: string }>;

function detectPlatform(value: string): Platform {
  const v = value.toLowerCase();
  if (/youtube\.com|youtu\.be/.test(v)) return 'youtube';
  if (/instagram\.com|instagr\.am/.test(v)) return 'instagram';
  return 'website';
}

const platforms: { id: Platform; label: string; Icon: IconType }[] = [
  { id: 'website', label: 'Website', Icon: Globe },
  { id: 'youtube', label: 'YouTube', Icon: YouTubeIcon },
  { id: 'instagram', label: 'Instagram', Icon: InstagramIcon },
];

export function AuditInput({
  onSubmit,
  loading = false,
  size = 'lg',
  className,
  autoFocus = false,
}: {
  onSubmit: (url: string) => void;
  loading?: boolean;
  size?: 'lg' | 'md';
  className?: string;
  autoFocus?: boolean;
}) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const active = detectPlatform(url);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!url.trim()) {
      setError('Paste a link to get started.');
      return;
    }
    let finalUrl = url.trim();
    if (!/^https?:\/\//i.test(finalUrl)) finalUrl = 'https://' + finalUrl;
    try {
      new URL(finalUrl);
    } catch {
      setError('That doesn’t look like a valid URL.');
      return;
    }
    onSubmit(finalUrl);
  };

  return (
    <div className={cn('w-full', className)}>
      <form
        onSubmit={handleSubmit}
        className={cn(
          'flex flex-col gap-2 rounded-2xl border border-border bg-card p-2 shadow-sm sm:flex-row sm:items-center',
          'focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/25'
        )}
      >
        <div className="flex flex-1 items-center gap-2.5 pl-3">
          <Globe className="size-5 shrink-0 text-muted-foreground" />
          <input
            autoFocus={autoFocus}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste a website, YouTube, or Instagram URL…"
            className={cn(
              'w-full bg-transparent text-foreground outline-none placeholder:text-muted-foreground/70',
              size === 'lg' ? 'h-12 text-base' : 'h-10 text-sm'
            )}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={cn(
            'inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-foreground font-semibold text-background shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md disabled:pointer-events-none disabled:opacity-60',
            size === 'lg' ? 'h-12 px-6 text-sm' : 'h-10 px-5 text-sm'
          )}
        >
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Analyzing…
            </>
          ) : (
            <>
              Run free audit <ArrowRight className="size-4" />
            </>
          )}
        </button>
      </form>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {platforms.map(({ id, label, Icon }) => {
          const isActive = active === id && url.length > 0;
          return (
            <span
              key={id}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors',
                isActive
                  ? 'border-foreground/20 bg-accent text-foreground'
                  : 'border-border text-muted-foreground'
              )}
            >
              <Icon className="size-3.5" />
              {label}
            </span>
          );
        })}
        <span className="text-xs text-muted-foreground/70">· auto-detected</span>
      </div>

      {error && <p className="mt-2 text-sm font-medium text-destructive">{error}</p>}
    </div>
  );
}
