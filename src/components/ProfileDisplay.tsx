'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, CreditCard, LogOut, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export function ProfileDisplay() {
  const { user, pricingPlan, signOut } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const planColors = {
    free: 'text-gray-400',
    starter: 'text-blue-400',
    pro: 'text-purple-400',
    enterprise: 'text-orange-400',
  };

  const planLabels = {
    free: 'Free',
    starter: 'Starter',
    pro: 'Pro',
    enterprise: 'Enterprise',
  };

  if (!user) {
    // Show sign up and contact sales buttons when not authenticated
    return (
      <div className="flex items-center gap-4">
        <Link href="/auth">
          <Button
            variant="ghost"
            className="font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
          >
            Sign Up
          </Button>
        </Link>
        <Link href="/contact">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              className="animate-cycle-colors text-white hover:opacity-90 rounded-full px-6 font-bold shadow-lg transition-all"
              style={{
                backgroundImage: 'linear-gradient(90deg, #fb923c, #ec4899, #3b82f6, #fb923c)',
              }}
            >
              Contact Sales
            </Button>
          </motion.div>
        </Link>
      </div>
    );
  }

  const fullName = user.user_metadata?.full_name || user.email;
  const currentPlan = pricingPlan;

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-accent transition-colors group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="w-8 h-8 bg-gradient-to-br from-orange-400 via-pink-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
          {fullName.charAt(0).toUpperCase()}
        </div>
        <span className="font-medium text-foreground">{fullName}</span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      {/* Hover tooltip for pricing plan */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-secondary border border-border rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        <span className={planColors[currentPlan]}>Current Plan: {planLabels[currentPlan]}</span>
      </div>

      {/* Dropdown menu */}
      <AnimatePresence>
        {isDropdownOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDropdownOpen(false)}
              className="fixed inset-0 z-40"
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-2">
                <Link
                  href="/pricing"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors text-sm"
                >
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span>Current Plan: Starter</span>
                </Link>
                <Link
                  href="/settings"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors text-sm"
                >
                  <Settings className="w-4 h-4 text-muted-foreground" />
                  <span>Settings</span>
                </Link>
                <Link
                  href="/pricing"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors text-sm"
                >
                  <CreditCard className="w-4 h-4 text-muted-foreground" />
                  <span>Upgrade Plan</span>
                </Link>
                <div className="border-t border-border my-2" />
                <button
                  onClick={() => {
                    signOut();
                    setIsDropdownOpen(false);
                  }}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors text-sm w-full text-left"
                >
                  <LogOut className="w-4 h-4 text-muted-foreground" />
                  <span>Sign Out</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}