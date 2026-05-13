'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProfileDisplay } from '@/components/ProfileDisplay';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { number: '01', label: 'Platforms', href: '/platform' },
  { number: '02', label: 'Solutions', href: '/solutions' },
  { number: '03', label: 'Resources', href: '/resources' },
  { number: '04', label: 'Pricing', href: '/pricing' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg'
          : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="w-10 h-10 bg-gradient-to-br from-orange-400 via-pink-500 to-blue-500 rounded-xl flex items-center justify-center font-black text-lg text-white shadow-lg"
            >
              LL
            </motion.div>
            <span className="font-bold text-2xl tracking-tight text-foreground group-hover:text-foreground/80 transition-colors">
              LeadLens
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative group flex items-center gap-2 text-sm font-medium transition-colors ${pathname === item.href
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                <span className="text-xs text-gray-400 group-hover:text-orange-500 transition-colors">
                  {item.number}
                </span>
                {item.label}
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 via-pink-500 to-blue-500 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <ProfileDisplay />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-background/95 backdrop-blur-xl shadow-2xl overflow-y-auto border-l border-border/50"
            >
              <div className="p-6">
                {/* Close Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="absolute top-6 right-6 p-2 rounded-lg hover:bg-accent transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6 text-foreground" />
                </button>

                {/* Logo */}
                <div className="flex items-center gap-3 mb-12 mt-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-400 via-pink-500 to-blue-500 rounded-xl flex items-center justify-center font-black text-lg text-white shadow-lg">
                    LL
                  </div>
                  <span className="font-bold text-xl tracking-tight text-foreground">
                    LeadLens
                  </span>
                </div>

                {/* Nav Items */}
                <nav className="space-y-6">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-4 text-lg font-medium transition-colors group ${pathname === item.href
                            ? 'text-foreground'
                            : 'text-muted-foreground hover:text-foreground'
                          }`}
                      >
                        <span className="text-sm text-gray-400 group-hover:text-orange-500 transition-colors">
                          {item.number}
                        </span>
                        {item.label}
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* CTA Buttons */}
                <div className="mt-12">
                  <ProfileDisplay />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
