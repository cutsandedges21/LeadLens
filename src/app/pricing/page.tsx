'use client';

import { motion } from 'framer-motion';
import { Check, ArrowRight, Zap, Shield, Headphones } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ProtectedButton } from '@/components/ProtectedButton';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

const tiers = [
  {
    name: 'Starter',
    description: 'For single founders',
    price: 0,
    planId: 'starter',
    features: [
      '1 AI Audit per week',
      'Basic heuristic analysis',
      'Standard reporting',
      'Email support',
    ],
    cta: 'Use LeadLens for free',
    popular: false,
  },
  {
    name: 'Pro',
    description: 'For growing teams',
    price: 28,
    planId: 'pro',
    features: [
      'Unlimited AI Audits',
      'Deep DOM analysis',
      'Competitor benchmarking',
      'Priority support',
      'Advanced analytics',
      'Custom reports',
    ],
    cta: 'Go Pro',
    popular: true,
  },
  {
    name: 'Max',
    description: 'For massive scale',
    price: 140,
    planId: 'enterprise',
    features: [
      'Dedicated AI Agent',
      'Custom reporting models',
      'API Access',
      'SLA guarantee',
      'Dedicated support',
      'White-label options',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export default function PricingPage() {
  const { user, pricingPlan } = useAuth();

  const handlePlanUpgrade = async (planId: string) => {
    if (!user || !supabase) return;

    // For Starter plan (free), just redirect to dashboard without upgrading
    if (planId === 'starter') {
      window.location.href = '/dashboard';
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          pricing_plan: planId,
        },
      });

      if (error) throw error;

      // Redirect to dashboard after successful upgrade
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Failed to upgrade plan:', error);
      alert('Failed to upgrade plan. Please try again.');
    }
  };
  return (
    <div
      className="min-h-screen py-32 px-4"
      style={{
        background: 'linear-gradient(135deg, var(--background) 0%, var(--secondary) 50%, var(--background) 100%)',
      }}
    >
      {/* Background floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '300px',
            height: '300px',
            left: '10%',
            top: '20%',
            backgroundColor: 'rgba(255, 107, 107, 0.15)',
            filter: 'blur(80px)',
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '250px',
            height: '250px',
            right: '15%',
            bottom: '30%',
            backgroundColor: 'rgba(78, 205, 196, 0.15)',
            filter: 'blur(60px)',
          }}
          animate={{
            y: [0, 30, 0],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-foreground">
            Unlock AI Agents
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose your tier and let our AI systematically improve your conversion rates
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={`relative ${tier.popular
                ? 'transform scale-105 z-10'
                : ''
                }`}
            >
              {tier.popular && (
                <div
                  className="absolute -top-0 top-3 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-8 py-5 rounded-full uppercase tracking-widest shadow-lg animate-cycle-colors transition-transform duration-200 hover:scale-105"
                  style={{
                    backgroundImage: 'linear-gradient(90deg, #fb923c, #ec4899, #3b82f6, #fb923c)',
                  }}
                >
                  Most Popular
                </div>
              )}


              <br></br>
              <br></br>
              <br></br>
              <br></br>

              <Card
                className={`h-full backdrop-blur-xl ${tier.popular
                  ? 'animate-border-cycle shadow-2xl z-10'
                  : 'bg-card/80 border-2 border-border shadow-lg'
                  } rounded-3xl p-8 transition-all hover:shadow-2xl hover:scale-105`}
              >
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2 text-foreground">{tier.name}</h3>
                  <p className="text-muted-foreground text-sm mb-6">{tier.description}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black text-foreground">${tier.price}</span>
                    <span className="text-lg text-muted-foreground font-normal">/mo</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-foreground/80">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {user ? (
                  <Button
                    onClick={() => handlePlanUpgrade(tier.planId)}
                    className={`w-full h-12 font-bold text-lg transition-all hover:scale-105 ${tier.popular
                      ? 'animate-cycle-colors text-white hover:opacity-90 shadow-lg'
                      : 'bg-secondary text-foreground hover:bg-secondary/80'
                      }`}
                    style={tier.popular ? {
                      backgroundImage: 'linear-gradient(90deg, #fb923c, #ec4899, #3b82f6, #fb923c)',
                    } : undefined}
                  >
                    {pricingPlan === tier.planId ? 'Current Plan' : tier.cta}
                  </Button>
                ) : (
                  <ProtectedButton redirectTo="/pricing">
                    <Button
                      className={`w-full h-12 font-bold text-lg transition-all hover:scale-105 ${tier.popular
                        ? 'animate-cycle-colors text-white hover:opacity-90 shadow-lg'
                        : 'bg-secondary text-foreground hover:bg-secondary/80'
                        }`}
                      style={tier.popular ? {
                        backgroundImage: 'linear-gradient(90deg, #fb923c, #ec4899, #3b82f6, #fb923c)',
                      } : undefined}
                    >
                      {tier.cta}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </ProtectedButton>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        <br></br>
        <br></br>
        <br></br>
        <br></br>


        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-20 grid md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: Zap,
              title: 'Lightning Fast',
              description: 'Get results in under 2 minutes with our optimized AI agents',
            },
            {
              icon: Shield,
              title: 'Enterprise Security',
              description: 'Bank-level encryption and SOC 2 Type II compliance',
            },
            {
              icon: Headphones,
              title: '24/7 Support',
              description: 'Dedicated support team ready to help you succeed',
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              className="bg-card/60 backdrop-blur-sm rounded-2xl p-6 border border-border text-center"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 via-pink-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-20 text-center"
        >
          <Link href="/">
            <Button
              variant="outline"
              className="bg-card/80 backdrop-blur-sm border-2 border-border text-foreground hover:bg-accent px-8 py-4 rounded-full font-bold transition-all hover:scale-105"
            >
              ← Back to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
