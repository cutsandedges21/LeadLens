'use client';

import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, FileText, LifeBuoy, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const guides = [
  {
    Icon: GraduationCap,
    tag: 'Guide',
    title: 'The 7 conversion leaks on almost every landing page',
    body: 'The patterns LeadLens flags most often — and how to fix each one.',
  },
  {
    Icon: BookOpen,
    tag: 'Playbook',
    title: 'Reading your conversion score',
    body: 'What the number means, how fixes are ranked, and where to start.',
  },
  {
    Icon: FileText,
    tag: 'Guide',
    title: 'Auditing YouTube & Instagram',
    body: 'How conversion thinking applies beyond the website — and what to change.',
  },
  {
    Icon: LifeBuoy,
    tag: 'Help',
    title: 'Getting the most from your first audit',
    body: 'A short walkthrough from first link to your prioritized fix list.',
  },
];

export default function ResourcesPage() {
  return (
    <main className="bg-dot-grid">
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-36 sm:px-8 lg:pt-44">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand">
            Resources
          </span>
          <h1 className="font-editorial mt-4 text-5xl font-bold leading-[1.05] text-foreground sm:text-6xl">
            Learn to find — and fix — what converts.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Short, practical guides on conversion, written the same way LeadLens
            gives advice: specific and free of fluff.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <div className="grid gap-5 md:grid-cols-2">
          {guides.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: (i % 2) * 0.08 }}
            >
              <Link
                href="/contact"
                className="group flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-secondary text-foreground">
                    <g.Icon className="size-5" />
                  </span>
                  <ArrowUpRight className="size-5 text-muted-foreground transition-colors group-hover:text-brand" />
                </div>
                <span className="mt-5 text-xs font-semibold uppercase tracking-wider text-brand">
                  {g.tag}
                </span>
                <h2 className="mt-2 text-xl font-semibold leading-snug text-foreground">
                  {g.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {g.body}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
