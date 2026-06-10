'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          variant="outline"
          size="icon-lg"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="size-12 rounded-full border-border bg-card/90 shadow-lg backdrop-blur-xl transition-all duration-300 hover:bg-accent"
          aria-label="Toggle theme"
        >
          <AnimatePresence mode="wait" initial={false}>
            {theme === 'dark' ? (
              <motion.span
                key="moon"
                initial={{ y: 16, opacity: 0, rotate: -30 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: -16, opacity: 0, rotate: 30 }}
                transition={{ duration: 0.18 }}
              >
                <Moon className="size-5 text-brand" />
              </motion.span>
            ) : (
              <motion.span
                key="sun"
                initial={{ y: 16, opacity: 0, rotate: -30 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: -16, opacity: 0, rotate: 30 }}
                transition={{ duration: 0.18 }}
              >
                <Sun className="size-5 text-foreground" />
              </motion.span>
            )}
          </AnimatePresence>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </motion.div>
    </div>
  );
}
