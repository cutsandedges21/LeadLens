'use client';

import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProtectedButton } from '@/components/ProtectedButton';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

const tiers = [
  {
    name: 'Free',
    description: 'For trying it out.',
    price: 0,
    planId: 'starter',
    features: [
      '1 audit per week',
      'Conversion score',
      'Top 3 prioritized fixes',
      'Web · YouTube · Instagram',
    ],
    cta: 'Start free',
    popular: false,
  },
  {
    name: 'Pro',
    description: 'For founders shipping fast.',
    price: 28,
    planId: 'pro',
    features: [
      'Unlimited audits',
      'Full prioritized fix list',
      'Impact estimates per fix',
      'Audit history & tracking',
      'Priority analysis',
    ],
    cta: 'Go Pro',
    popular: true,
  },
  {
    name: 'Max',
    description: 'For teams optimizing at scale.',
    price: 140,
    planId: 'enterprise',
    features: [
      'Everything in Pro',
      'Shareable team reports',
      'Trend analytics',
      'API access',
      'Dedicated support',
    ],
    cta: 'Choose Max',
    popular: false,
  },
];

const faqs = [
  {
    q: 'Does LeadLens make the changes for me?',
    a: 'No — LeadLens is diagnostic. It tells you exactly what to fix and ranks it by impact. You stay in control of what gets changed.',
  },
  {
    q: 'What can I audit?',
    a: 'Websites and landing pages first, plus YouTube channels and Instagram profiles. Paste any link and LeadLens detects the platform.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Plans are month-to-month — upgrade, downgrade, or cancel whenever you like.',
  },
];

export default function PricingPage() {
  const { user, pricingPlan } = useAuth();

  const handlePlanUpgrade = async (planId: string) => {
    if (!user || !supabase) return;
    if (planId === 'starter') {
      window.location.href = '/dashboard';
      return;
    }
    try {
      const { error } = await supabase.auth.updateUser({
        data: { pricing_plan: planId },
      });
      if (error) throw error;
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Failed to upgrade plan:', error);
      alert('Failed to upgrade plan. Please try again.');
    }
  };

  return (
    <main className="bg-dot-grid">
      <section className="mx-auto max-w-7xl px-5 pb-24 pt-36 sm:px-8 lg:pt-44">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand">
            Pricing
          </span>
          <h1 className="font-editorial mt-4 text-5xl font-bold leading-[1.05] text-foreground sm:text-6xl">
            Start free. Upgrade when it{' '}
            <span className="italic text-brand">pays for itself</span>.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            One price for clarity on every page you ship. No agencies, no
            retainers — just the fixes that matter, ranked by impact.
          </p>
        </div>

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className={`relative flex flex-col rounded-3xl border bg-card p-8 shadow-sm ${
                tier.popular ? 'border-brand ring-1 ring-brand' : 'border-border'
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-8 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-brand-foreground">
                  Most popular
                </span>
              )}
              <h3 className="text-xl font-semibold text-foreground">{tier.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {tier.description}
              </p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="font-display text-5xl font-bold text-foreground">
                  ${tier.price}
                </span>
                <span className="text-muted-foreground">/mo</span>
              </div>

              <ul className="mt-7 flex-1 space-y-3.5">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm text-foreground"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                {user ? (
                  <Button
                    onClick={() => handlePlanUpgrade(tier.planId)}
                    variant={tier.popular ? 'brand' : 'outline'}
                    size="lg"
                    className="w-full"
                    disabled={pricingPlan === tier.planId}
                  >
                    {pricingPlan === tier.planId ? 'Current plan' : tier.cta}
                  </Button>
                ) : (
                  <ProtectedButton redirectTo="/pricing">
                    <Button
                      variant={tier.popular ? 'brand' : 'outline'}
                      size="lg"
                      className="w-full"
                    >
                      {tier.cta}
                      <ArrowRight className="size-4" />
                    </Button>
                  </ProtectedButton>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mx-auto mt-24 max-w-3xl">
          <h2 className="font-editorial text-center text-3xl font-bold text-foreground sm:text-4xl">
            Questions, answered.
          </h2>
          <div className="mt-10 space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-3xl border border-border bg-card p-6 shadow-sm"
              >
                <h3 className="text-base font-semibold text-foreground">
                  {faq.q}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
