'use client';

import { motion } from 'framer-motion';
import { MousePointerClick, Hourglass, EyeOff, Unplug } from 'lucide-react';

const leaks = [
  {
    Icon: MousePointerClick,
    title: 'Confusing calls-to-action',
    body: 'Visitors don’t know what to do next, so they do nothing.',
  },
  {
    Icon: Hourglass,
    title: 'Slow, heavy pages',
    body: 'Every extra second quietly shaves points off your conversion rate.',
  },
  {
    Icon: EyeOff,
    title: 'Buried value & proof',
    body: 'The reason to buy is there — just not where attention actually goes.',
  },
  {
    Icon: Unplug,
    title: 'Leaky funnels',
    body: 'Friction between steps loses people you already paid to acquire.',
  },
];

export function ProblemSolutionSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand">
            The problem
          </span>
          <h2 className="font-editorial mt-4 text-4xl font-bold leading-tight text-foreground sm:text-5xl">
            Most pages lose money in places you can&apos;t see.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            Your traffic is working. Your page isn’t — quite. The gaps are small,
            specific, and invisible until something points right at them. That’s
            the entire job of LeadLens: make the leaks obvious, and tell you which
            one to plug first.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {leaks.map((leak, i) => (
            <motion.div
              key={leak.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="rounded-3xl border border-border bg-card p-6 shadow-sm"
            >
              <span className="flex size-11 items-center justify-center rounded-2xl bg-secondary text-foreground">
                <leak.Icon className="size-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-foreground">
                {leak.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {leak.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
