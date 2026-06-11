'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  Loader2,
  Lock,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';
import { AuditInput } from '@/components/AuditInput';

type AppState = 'idle' | 'analyzing' | 'gated';

const sampleFixes = [
  { label: 'Weak primary CTA', impact: '+12%', tone: 'text-destructive' },
  { label: 'Slow hero image (4.1s)', impact: '+7%', tone: 'text-amber-600' },
  { label: 'No social proof above fold', impact: '+5%', tone: 'text-amber-600' },
  { label: 'Unclear value proposition', impact: '+4%', tone: 'text-amber-600' },
];

export function HeroSection() {
  const [appState, setAppState] = useState<AppState>('idle');
  const [analysisId, setAnalysisId] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleAnalyze = async (url: string) => {
    setError('');
    setAppState('analyzing');
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');
      setAnalysisId(data.analysisId);
      setTimeout(() => setAppState('gated'), 1600);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
      setAppState('idle');
    }
  };

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !analysisId) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    window.location.href = `/auth?email=${encodeURIComponent(email)}&analysisId=${analysisId}`;
  };

  return (
    <section className="relative overflow-hidden bg-dot-grid">
      {/* soft background blooms */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-float-slow absolute -left-24 top-10 size-[26rem] rounded-full bg-brand/10 blur-3xl" />
        <div className="animate-float-slow absolute -right-20 top-40 size-[22rem] rounded-full bg-secondary blur-3xl [animation-delay:3s]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-36 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-28 lg:pt-44">
        {/* LEFT */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm"
          >
            <Sparkles className="size-3.5 text-brand" />
            AI conversion audits for web, YouTube &amp; Instagram
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-editorial mt-6 text-5xl font-bold leading-[1.04] text-foreground sm:text-6xl lg:text-[4.25rem]"
          >
            See what&apos;s costing you conversions — and exactly{' '}
            <span className="text-brand italic">how to fix it</span>
            <span
              data-route-origin
              aria-hidden
              className="ml-0.5 inline-block size-2.5 -translate-y-[0.06em] rounded-full bg-brand align-baseline sm:size-3"
            />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            Paste a link. LeadLens audits it and hands you a prioritized list of
            fixes, ranked by impact. No agencies, no guesswork — you decide what
            to change.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-8 max-w-xl"
          >
            <AnimatePresence mode="wait">
              {appState === 'gated' ? (
                <motion.form
                  key="gate"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleUnlock}
                  className="rounded-2xl border border-border bg-card p-5 shadow-sm"
                >
                  <p className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <CheckCircle2 className="size-4 text-brand" />
                    Your audit is ready.
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Where should we send the full report?
                  </p>
                  <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                    <input
                      type="email"
                      autoFocus
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="h-12 flex-1 rounded-xl border border-input bg-background px-4 text-base text-foreground outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/25"
                    />
                    <button
                      type="submit"
                      className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-foreground px-6 text-sm font-semibold text-background transition-all hover:-translate-y-0.5 hover:shadow-md"
                    >
                      See my report <ArrowRight className="size-4" />
                    </button>
                  </div>
                </motion.form>
              ) : appState === 'analyzing' ? (
                <motion.div
                  key="analyzing"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 text-sm text-foreground shadow-sm"
                >
                  <Loader2 className="size-5 animate-spin text-brand" />
                  <span>
                    Analyzing your page — reading the layout, copy, and
                    conversion signals…
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key="input"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <AuditInput onSubmit={handleAnalyze} />
                </motion.div>
              )}
            </AnimatePresence>

            {error && (
              <p className="mt-3 text-sm font-medium text-destructive">{error}</p>
            )}

            <p className="mt-5 text-sm text-muted-foreground">
              Free first audit · No credit card · Results in ~60 seconds
            </p>
          </motion.div>
        </div>

        {/* RIGHT — live report card */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="glow-card rounded-3xl border border-border bg-card p-6 shadow-xl shadow-foreground/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-lg bg-foreground text-background">
                  <TrendingUp className="size-4" />
                </span>
                <span className="text-sm font-medium text-foreground">
                  Conversion report
                </span>
              </div>
              <span className="rounded-full bg-secondary px-2.5 py-1 text-xs text-muted-foreground">
                acme.com
              </span>
            </div>

            <div className="mt-6 flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Conversion score
                </p>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="font-display text-5xl font-bold text-foreground">
                    64
                  </span>
                  <span className="text-sm text-muted-foreground">/ 100</span>
                </div>
              </div>
              <span className="mb-1 inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                +28 possible
              </span>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '64%' }}
                transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
                className="h-full rounded-full bg-brand"
              />
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Top fixes, by impact
            </p>
            <ul className="mt-3 space-y-2.5">
              {sampleFixes.map((fix, i) => (
                <motion.li
                  key={fix.label}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-3.5 py-2.5"
                >
                  <span className="text-sm text-foreground">{fix.label}</span>
                  <span className={`text-sm font-bold ${fix.tone}`}>
                    {fix.impact}
                  </span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-5 flex items-center justify-center gap-1.5 text-sm font-medium text-brand">
              <Lock className="size-3.5" />
              Full report — run your audit to unlock
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
