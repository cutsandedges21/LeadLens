'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useScrollTrigger } from '@/lib/parallax';
import { ArrowUp, TrendingUp, Zap, DollarSign, Monitor, Smartphone, CheckCircle } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

const stats = [
  {
    value: 47,
    label: 'increase in conversions',
    suffix: '%',
    icon: ArrowUp,
    color: 'from-orange-400 to-pink-500',
  },
  {
    value: 2.3,
    label: 'revenue growth',
    suffix: 'x',
    icon: TrendingUp,
    color: 'from-pink-500 to-blue-500',
  },
  {
    value: 89,
    label: 'faster page loads',
    suffix: '%',
    icon: Zap,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    value: 3.2,
    label: 'average ROI',
    suffix: 'x',
    icon: DollarSign,
    color: 'from-cyan-500 to-teal-500',
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const { isVisible } = useScrollTrigger(0.5);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start * 10) / 10);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <span className="text-5xl md:text-6xl font-black text-foreground">
      {count}{suffix}
    </span>
  );
}

function WebsiteMockup({ improvements }: { improvements: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-card rounded-2xl shadow-2xl p-6 border border-border relative overflow-hidden"
    >
      {/* Browser header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-400" />
        <div className="w-3 h-3 rounded-full bg-yellow-400" />
        <div className="w-3 h-3 rounded-full bg-green-400" />
        <div className="flex-1 bg-secondary rounded-lg h-8 ml-4" />
      </div>

      {/* Website mockup content */}
      <div className="space-y-4">
        {/* Hero section */}
        <div className="h-32 bg-gradient-to-r from-orange-100 to-pink-100 rounded-xl relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-8 bg-white/50 rounded-lg" />
          </div>
          <CheckCircle className="absolute top-2 right-2 w-6 h-6 text-green-500" />
        </div>

        {/* Content sections */}
        <div className="grid grid-cols-2 gap-4">
          <div className="h-24 bg-secondary/50 rounded-xl relative">
            <CheckCircle className="absolute top-2 right-2 w-5 h-5 text-green-500" />
            <div className="p-3 space-y-2">
              <div className="h-3 bg-border rounded w-3/4" />
              <div className="h-2 bg-secondary rounded w-1/2" />
            </div>
          </div>
          <div className="h-24 bg-secondary/50 rounded-xl relative">
            <CheckCircle className="absolute top-2 right-2 w-5 h-5 text-green-500" />
            <div className="p-3 space-y-2">
              <div className="h-3 bg-border rounded w-2/3" />
              <div className="h-2 bg-secondary rounded w-1/3" />
            </div>
          </div>
        </div>

        {/* CTA section */}
        <div className="h-20 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-8 bg-white/60 rounded-lg" />
          </div>
          <CheckCircle className="absolute top-2 right-2 w-6 h-6 text-green-500" />
        </div>

        {/* Improvement indicators */}
        <div className="flex flex-wrap gap-2 pt-2">
          {improvements.map((improvement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
              className="flex items-center gap-1 bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-xs font-semibold"
            >
              <ArrowUp className="w-3 h-3" />
              {improvement}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function ResultsSection() {
  const { isVisible, elementRef } = useScrollTrigger(0.1);
  const { scrollYProgress } = useScroll({
    target: elementRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section
      ref={elementRef as any}
      className="relative py-32 overflow-hidden bg-gradient-to-b from-background via-secondary/10 to-background"
    >
      {/* Background floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '250px',
            height: '250px',
            left: '8%',
            top: '15%',
            backgroundColor: 'rgba(255, 154, 162, 0.12)',
            filter: 'blur(90px)',
          }}
          animate={{
            y: [0, -35, 0],
            x: [0, 25, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '200px',
            height: '200px',
            right: '12%',
            bottom: '25%',
            backgroundColor: 'rgba(78, 205, 196, 0.12)',
            filter: 'blur(70px)',
          }}
          animate={{
            y: [0, 35, 0],
            x: [0, -25, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-black text-foreground mb-6">
            Proven Results
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See what LeadLens can do for your business
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Stats */}
          <motion.div style={{ y: y1 }} className="space-y-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                  className="flex items-start gap-6"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg flex-shrink-0`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    <p className="text-lg text-muted-foreground mt-2">{stat.label}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Mockups */}
          <motion.div style={{ y: y2 }} className="space-y-8">
            <WebsiteMockup improvements={['Conversion', 'Speed', 'UX']} />
            <WebsiteMockup improvements={['Mobile', 'SEO', 'CTA']} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}