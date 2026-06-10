'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { ProfileDisplay } from '@/components/ProfileDisplay';
import { Brandmark, Wordmark } from '@/components/Brandmark';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Platform', href: '/platform' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Resources', href: '/resources' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'border-b border-border/70 bg-background/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <Brandmark className="size-9 transition-transform group-hover:-rotate-6" />
          <Wordmark className="text-[1.35rem]" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                  active
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-accent"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div className="hidden md:flex">
          <ProfileDisplay />
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsMobileMenuOpen((v) => !v)}
          className="rounded-full p-2 text-foreground transition-colors hover:bg-accent md:hidden"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            <div
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute right-0 top-0 bottom-0 flex w-80 max-w-[85%] flex-col border-l border-border bg-background p-6 shadow-2xl"
            >
              <div className="mb-10 flex items-center justify-between">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2.5"
                >
                  <Brandmark className="size-9" />
                  <Wordmark />
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-full p-2 hover:bg-accent"
                  aria-label="Close menu"
                >
                  <X className="size-6 text-foreground" />
                </button>
              </div>

              <nav className="flex flex-col">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.25 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="group flex items-center justify-between border-b border-border/70 py-4 font-serif text-2xl text-foreground"
                    >
                      {item.label}
                      <ArrowRight className="size-5 -translate-x-1 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto pt-8">
                <ProfileDisplay />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
