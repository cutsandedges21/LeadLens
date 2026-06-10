'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Building2, MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main className="bg-dot-grid">
      <section className="mx-auto max-w-7xl px-5 pb-24 pt-36 sm:px-8 lg:pt-44">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Left — pitch */}
          <div className="lg:pt-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand">
              Contact
            </span>
            <h1 className="font-editorial mt-4 text-5xl font-bold leading-[1.05] text-foreground sm:text-6xl">
              Let&apos;s talk about your{' '}
              <span className="italic text-brand">conversions</span>.
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
              Running audits across a big site, multiple brands, or a team? Tell
              us what you&apos;re working on and we&apos;ll help you get the most
              out of LeadLens.
            </p>

            <div className="mt-10 space-y-4">
              {[
                { Icon: Mail, label: 'Email', value: 'team@leadlens.app' },
                { Icon: MessageSquare, label: 'Support', value: 'Replies within one business day' },
              ].map((row) => (
                <div key={row.label} className="flex items-center gap-4">
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-secondary text-foreground">
                    <row.Icon className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {row.label}
                    </p>
                    <p className="text-sm text-muted-foreground">{row.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-3xl border border-border bg-card p-7 shadow-sm sm:p-8">
              {sent ? (
                <div className="flex flex-col items-center py-12 text-center">
                  <span className="flex size-14 items-center justify-center rounded-full bg-brand/10 text-brand">
                    <CheckCircle2 className="size-7" />
                  </span>
                  <h2 className="mt-5 text-xl font-semibold text-foreground">
                    Thanks — we&apos;ll be in touch.
                  </h2>
                  <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                    Your message is on its way. Expect a reply within one
                    business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email">Work email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground/60" />
                      <Input
                        id="email"
                        type="email"
                        required
                        placeholder="you@company.com"
                        className="pl-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company-size">Company size</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground/60" />
                      <select
                        id="company-size"
                        className="h-11 w-full rounded-xl border border-input bg-card pl-11 pr-4 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/25"
                      >
                        <option>1–10</option>
                        <option>11–50</option>
                        <option>51–200</option>
                        <option>201+</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">How can we help?</Label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      placeholder="Tell us what you'd like to audit and improve…"
                      className="w-full resize-none rounded-xl border border-input bg-card px-4 py-3 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/25"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Send message <ArrowRight className="size-4" />
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
