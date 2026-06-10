'use client';

import { motion } from 'framer-motion';
import { Link2, ScanSearch, ListChecks } from 'lucide-react';

const steps = [
  {
    n: '01',
    Icon: Link2,
    title: 'Paste a link',
    body: 'Any website, YouTube channel, or Instagram profile. LeadLens detects the platform automatically.',
  },
  {
    n: '02',
    Icon: ScanSearch,
    title: 'AI audits everything',
    body: 'It reads the layout, copy, speed, and conversion signals the way a seasoned CRO consultant would.',
  },
  {
    n: '03',
    Icon: ListChecks,
    title: 'Get fixes, ranked',
    body: 'A prioritized list of changes with estimated impact — so you know exactly what to do first.',
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
      <div className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-widest text-brand">
          How it works
        </span>
        <h2 className="font-editorial mt-4 text-4xl font-bold leading-tight text-foreground sm:text-5xl">
          From link to a plan in about a minute.
        </h2>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {steps.map((step, i) => (
          <motion.div
            key={step.n}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative rounded-3xl border border-border bg-card p-7 shadow-sm"
          >
            <span className="font-display text-sm font-semibold text-brand">
              {step.n}
            </span>
            <span className="mt-5 flex size-12 items-center justify-center rounded-2xl bg-foreground text-background">
              <step.Icon className="size-5" />
            </span>
            <h3 className="mt-5 text-xl font-semibold text-foreground">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {step.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
