'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const stats = [
  { value: '+31%', label: 'average conversion lift' },
  { value: '12,400+', label: 'pages audited' },
  { value: '~60s', label: 'to a full report' },
  { value: '4.9/5', label: 'customer rating' },
];

export function ResultsSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
      <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-sm">
        <div className="grid divide-border border-border md:grid-cols-4 md:divide-x">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="border-b border-border p-8 text-center last:border-b-0 md:border-b-0"
            >
              <div className="font-display text-4xl font-bold text-foreground">
                {s.value}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-border bg-secondary/40 p-8 sm:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center gap-1 text-brand">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-5" fill="currentColor" />
              ))}
            </div>
            <blockquote className="font-editorial mt-6 text-2xl font-medium leading-snug text-foreground sm:text-3xl">
              “We ran our landing page through LeadLens, shipped the top three
              fixes, and conversion was up double digits within a week. It paid
              for itself almost immediately.”
            </blockquote>
            <div className="mt-6 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Maya Chen</span> ·
              Head of Growth, Northwind
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
