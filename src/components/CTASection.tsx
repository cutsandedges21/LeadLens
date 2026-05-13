'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useScrollTrigger } from '@/lib/parallax';
import { ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProtectedButton } from '@/components/ProtectedButton';
import Link from 'next/link';

export function CTASection() {
  const { isVisible, elementRef } = useScrollTrigger(0.1);
  const { scrollYProgress } = useScroll({
    target: elementRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      ref={elementRef as any}
      className="relative py-32 overflow-hidden bg-gradient-to-br from-background via-secondary/10 to-background"
    >
      {/* Dramatic background floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '400px',
            height: '400px',
            left: '10%',
            top: '20%',
            backgroundColor: 'rgba(255, 107, 107, 0.25)',
            filter: 'blur(120px)',
          }}
          animate={{
            y: [0, -80, 0],
            x: [0, 60, 0],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '350px',
            height: '350px',
            right: '15%',
            bottom: '10%',
            backgroundColor: 'rgba(78, 205, 196, 0.25)',
            filter: 'blur(100px)',
          }}
          animate={{
            y: [0, 80, 0],
            x: [0, -60, 0],
            scale: [1, 1.15, 1],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '250px',
            height: '250px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            filter: 'blur(80px)',
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, 40, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '200px',
            height: '200px',
            left: '30%',
            bottom: '30%',
            backgroundColor: 'rgba(108, 92, 231, 0.2)',
            filter: 'blur(70px)',
          }}
          animate={{
            y: [0, 60, 0],
            x: [0, -35, 0],
            scale: [1, 1.25, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <motion.div
        style={{ scale, opacity, y }}
        className="container mx-auto px-4 relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-black text-foreground mb-8 leading-tight"
          >
            Ready to stop{' '}
            <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              losing revenue?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Join thousands of companies using LeadLens to optimize their conversion funnels and maximize their ROI
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <ProtectedButton redirectTo="/dashboard">
              <Link href="/">
                <Button
                  size="lg"
                  className="animate-cycle-colors hover:opacity-90 text-white text-lg px-10 py-6 rounded-full font-bold shadow-2xl transition-all hover:scale-105"
                  style={{
                    backgroundImage: 'linear-gradient(90deg, #fb923c, #ec4899, #3b82f6, #fb923c)',
                  }}
                >
                  Start Your Free Audit
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </ProtectedButton>
            <ProtectedButton redirectTo="/contact">
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-border text-foreground hover:bg-accent text-lg px-10 py-6 rounded-full font-bold transition-all hover:scale-105"
                >
                  Schedule a Demo
                </Button>
              </Link>
            </ProtectedButton>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-8"
          >
            {[
              { icon: CheckCircle, label: 'No credit card required' },
              { icon: Clock, label: 'Results in 2 minutes' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.6 }}
                className="flex items-center gap-2 text-muted-foreground"
              >
                <item.icon className="w-5 h-5 text-green-500" />
                <span className="font-medium">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}