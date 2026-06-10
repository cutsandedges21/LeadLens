'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const plans = [
  {
    name: 'Free',
    price: '$0',
    cadence: 'forever',
    blurb: 'One full audit to see the magic.',
    features: ['1 audit', 'Conversion score', 'Top 3 fixes'],
    cta: 'Start free',
    popular: false,
  },
  {
    name: 'Starter',
    price: '$29',
    cadence: '/mo',
    blurb: 'For founders shipping fast.',
    features: ['25 audits / mo', 'Full fix list', 'Web · YouTube · Instagram', 'History & tracking'],
    cta: 'Choose Starter',
    popular: true,
  },
  {
    name: 'Pro',
    price: '$79',
    cadence: '/mo',
    blurb: 'For teams optimizing at scale.',
    features: ['Unlimited audits', 'Priority analysis', 'Shareable reports', 'Trend analytics'],
    cta: 'Choose Pro',
    popular: false,
  },
];

export function PricingPeek() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-brand">
          Pricing
        </span>
        <h2 className="font-editorial mt-4 text-4xl font-bold leading-tight text-foreground sm:text-5xl">
          Start free. Upgrade when it pays for itself.
        </h2>
      </div>

      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className={`relative flex flex-col rounded-3xl border bg-card p-7 shadow-sm ${
              plan.popular
                ? 'border-brand ring-1 ring-brand'
                : 'border-border'
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-7 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-brand-foreground">
                Most popular
              </span>
            )}
            <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="font-display text-4xl font-bold text-foreground">
                {plan.price}
              </span>
              <span className="text-sm text-muted-foreground">{plan.cadence}</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{plan.blurb}</p>

            <ul className="mt-6 flex-1 space-y-3">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-foreground">
                  <Check className="size-4 shrink-0 text-brand" />
                  {f}
                </li>
              ))}
            </ul>

            <Link href="/pricing" className="mt-7">
              <Button
                variant={plan.popular ? 'brand' : 'outline'}
                className="w-full"
              >
                {plan.cta}
              </Button>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
