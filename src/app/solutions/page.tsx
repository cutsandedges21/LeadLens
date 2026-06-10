'use client';

import { motion } from 'framer-motion';
import { Rocket, Megaphone, Briefcase, Clapperboard, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const personas = [
  {
    Icon: Rocket,
    title: 'Founders',
    body: 'You don’t have a CRO team. LeadLens is the next best thing — a focused list of what to fix before you spend more on traffic.',
    points: ['Validate a landing page in minutes', 'Prioritize before you redesign', 'Spend dev time where it pays back'],
  },
  {
    Icon: Megaphone,
    title: 'Marketers',
    body: 'Stop guessing why a campaign underperforms. See the on-page reasons conversions leak — and exactly how to plug them.',
    points: ['Audit every campaign landing page', 'Back recommendations with impact', 'Report wins with before/after scores'],
  },
  {
    Icon: Briefcase,
    title: 'Agencies',
    body: 'Walk into every pitch with a credible, specific audit. Show prospects what’s costing them money before you’ve signed.',
    points: ['Instant audits for pitches', 'Consistent, branded reports', 'Multi-client tracking'],
  },
  {
    Icon: Clapperboard,
    title: 'Creators',
    body: 'Conversion isn’t only a website thing. Point LeadLens at your YouTube channel or Instagram profile and grow what matters.',
    points: ['Audit YouTube & Instagram', 'Sharpen your profile and CTAs', 'Turn views into followers and sales'],
  },
];

export default function SolutionsPage() {
  return (
    <main className="bg-dot-grid">
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-36 sm:px-8 lg:pt-44">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand">
            Solutions
          </span>
          <h1 className="font-editorial mt-4 text-5xl font-bold leading-[1.05] text-foreground sm:text-6xl">
            Built for everyone who lives or dies by{' '}
            <span className="italic text-brand">conversion</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Same engine, tuned to your job. Whatever you’re optimizing, LeadLens
            tells you what to fix first.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <div className="grid gap-5 md:grid-cols-2">
          {personas.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: (i % 2) * 0.08 }}
              className="flex flex-col rounded-3xl border border-border bg-card p-8 shadow-sm"
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-foreground text-background">
                <p.Icon className="size-5" />
              </span>
              <h2 className="mt-5 text-2xl font-semibold text-foreground">
                {p.title}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                {p.body}
              </p>
              <ul className="mt-5 space-y-2.5">
                {p.points.map((pt) => (
                  <li
                    key={pt}
                    className="flex items-center gap-2.5 text-sm text-foreground"
                  >
                    <span className="size-1.5 rounded-full bg-brand" />
                    {pt}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-3 text-center">
          <Link href="/auth">
            <Button size="lg">
              Run your first audit <ArrowRight className="size-4" />
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground">
            Free to start · No credit card
          </p>
        </div>
      </section>
    </main>
  );
}
