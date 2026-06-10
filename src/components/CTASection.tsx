'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-28 pt-10 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-[2.5rem] border border-border bg-foreground px-6 py-20 text-center shadow-xl sm:px-12"
      >
        <div className="pointer-events-none absolute -left-20 -top-20 size-72 rounded-full bg-brand/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-16 size-72 rounded-full bg-brand/20 blur-3xl" />

        <div className="relative">
          <h2 className="font-editorial mx-auto max-w-2xl text-4xl font-bold leading-tight text-background sm:text-5xl">
            Run your first audit, <span className="italic text-brand">free</span>.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg text-background/70">
            See exactly what’s costing you conversions in about a minute. No
            credit card, no commitment.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/auth">
              <Button variant="brand" size="lg" className="w-full sm:w-auto">
                Start free <ArrowRight className="size-4" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button
                variant="outline"
                size="lg"
                className="w-full border-background/25 bg-transparent text-background hover:bg-background/10 hover:text-background sm:w-auto"
              >
                See pricing
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
