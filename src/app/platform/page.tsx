'use client';

import { motion } from 'framer-motion';
import {
  Type,
  LayoutTemplate,
  Gauge,
  MousePointerClick,
  ShieldCheck,
  Smartphone,
  Link2,
  ScanSearch,
  ListChecks,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const signals = [
  { Icon: Type, title: 'Copy & messaging', body: 'Clarity of your headline, value proposition, and calls-to-action.' },
  { Icon: LayoutTemplate, title: 'Layout & hierarchy', body: 'What gets attention first — and whether it’s the thing that converts.' },
  { Icon: Gauge, title: 'Speed & performance', body: 'Load time and weight that quietly cost you visitors before they read a word.' },
  { Icon: MousePointerClick, title: 'Calls-to-action', body: 'Whether the next step is obvious, single, and compelling.' },
  { Icon: ShieldCheck, title: 'Trust & proof', body: 'Social proof, guarantees, and credibility cues in the right places.' },
  { Icon: Smartphone, title: 'Mobile experience', body: 'How the page actually behaves where most of your traffic lives.' },
];

const steps = [
  { Icon: Link2, title: 'Paste a link', body: 'Website, YouTube, or Instagram — detected automatically.' },
  { Icon: ScanSearch, title: 'AI audits everything', body: 'A consultant-grade pass over copy, layout, speed, and trust signals.' },
  { Icon: ListChecks, title: 'Get ranked fixes', body: 'A prioritized list with estimated impact, so you know what to do first.' },
];

export default function PlatformPage() {
  return (
    <main className="bg-dot-grid">
      <section className="mx-auto max-w-7xl px-5 pb-20 pt-36 sm:px-8 lg:pt-44">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand">
            The platform
          </span>
          <h1 className="font-editorial mt-4 text-5xl font-bold leading-[1.05] text-foreground sm:text-6xl">
            A second pair of expert eyes on every page.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            LeadLens reads your page the way a seasoned conversion consultant
            would — then tells you precisely what to change and why. It diagnoses;
            you decide.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/auth">
              <Button size="lg">
                Run a free audit <ArrowRight className="size-4" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" size="lg">
                See pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="rounded-3xl border border-border bg-card p-7 shadow-sm"
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-foreground text-background">
                <s.Icon className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* What it analyzes */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand">
            What it analyzes
          </span>
          <h2 className="font-editorial mt-4 text-4xl font-bold leading-tight text-foreground sm:text-5xl">
            Six lenses on every page.
          </h2>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {signals.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
              className="rounded-3xl border border-border bg-card p-6 shadow-sm"
            >
              <span className="flex size-11 items-center justify-center rounded-2xl bg-secondary text-foreground">
                <s.Icon className="size-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-foreground">
                {s.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
