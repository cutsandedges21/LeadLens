'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, CreditCard, LogOut, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

const planLabels: Record<string, string> = {
  free: 'Free',
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

const planColors: Record<string, string> = {
  free: 'text-muted-foreground',
  starter: 'text-brand',
  pro: 'text-violet-500',
  enterprise: 'text-amber-500',
};

export function ProfileDisplay() {
  const { user, pricingPlan, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) {
    return (
      <div className="flex w-full items-center gap-2 md:w-auto">
        <Link href="/auth" className="flex-1 md:flex-none">
          <Button variant="ghost" className="w-full md:w-auto">
            Sign in
          </Button>
        </Link>
        <Link href="/auth" className="flex-1 md:flex-none">
          <Button className="w-full md:w-auto">Start free</Button>
        </Link>
      </div>
    );
  }

  const fullName = user.user_metadata?.full_name || user.email || 'Account';
  const initial = fullName.charAt(0).toUpperCase();

  return (
    <div className="relative w-full md:w-auto">
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="flex w-full items-center gap-2.5 rounded-full border border-border bg-card px-2 py-1.5 transition-colors hover:bg-accent md:w-auto"
      >
        <span className="flex size-8 items-center justify-center rounded-full bg-foreground text-sm font-semibold text-background">
          {initial}
        </span>
        <span className="hidden text-sm font-medium text-foreground sm:block">
          {fullName.split(' ')[0]}
        </span>
        <ChevronDown
          className={`size-4 text-muted-foreground transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.16 }}
              className="absolute right-0 top-full z-50 mt-2 w-60 overflow-hidden rounded-2xl border border-border bg-popover shadow-xl"
            >
              <div className="border-b border-border px-4 py-3">
                <p className="truncate text-sm font-medium text-foreground">
                  {fullName}
                </p>
                <p className={`text-xs font-medium ${planColors[pricingPlan]}`}>
                  {planLabels[pricingPlan]} plan
                </p>
              </div>
              <div className="p-1.5">
                <Link
                  href="/settings"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent"
                >
                  <Settings className="size-4 text-muted-foreground" />
                  Settings
                </Link>
                <Link
                  href="/pricing"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent"
                >
                  <CreditCard className="size-4 text-muted-foreground" />
                  Upgrade plan
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-accent"
                >
                  <LogOut className="size-4 text-muted-foreground" />
                  Sign out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
