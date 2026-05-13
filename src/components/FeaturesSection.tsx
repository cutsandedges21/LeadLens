'use client';

import { motion } from 'framer-motion';
import { useScrollTrigger } from '@/lib/parallax';
import { TrendingUp, Clock, DollarSign, Shield, Brain, Zap } from 'lucide-react';

const features = [
  {
    icon: TrendingUp,
    benefit: 'Increase Revenue',
    impact: 'Convert 47% more visitors',
    hint: 'AI-powered funnel analysis',
    color: 'from-orange-400 to-pink-500',
    stat: '47%',
  },
  {
    icon: Clock,
    benefit: 'Save Time',
    impact: 'Automated audits in minutes',
    hint: 'Intelligent scraping & detection',
    color: 'from-pink-500 to-blue-500',
    stat: '10x',
  },
  {
    icon: DollarSign,
    benefit: 'Maximize ROI',
    impact: '3.2x average return',
    hint: 'Data-driven optimization',
    color: 'from-blue-500 to-cyan-500',
    stat: '3.2x',
  },
  {
    icon: Shield,
    benefit: 'Scale Confidently',
    impact: 'Enterprise-grade insights',
    hint: 'Advanced analytics platform',
    color: 'from-cyan-500 to-teal-500',
    stat: '99.9%',
  },
];

export function FeaturesSection() {
  const { isVisible, elementRef } = useScrollTrigger(0.1);

  return (
    <section
      ref={elementRef as any}
      className="relative py-32 overflow-hidden bg-gradient-to-br from-background via-secondary/10 to-background"
    >
      {/* Background floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '300px',
            height: '300px',
            left: '5%',
            top: '10%',
            backgroundColor: 'rgba(255, 154, 162, 0.2)',
            filter: 'blur(100px)',
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, 40, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '250px',
            height: '250px',
            right: '10%',
            bottom: '20%',
            backgroundColor: 'rgba(78, 205, 196, 0.2)',
            filter: 'blur(80px)',
          }}
          animate={{
            y: [0, 40, 0],
            x: [0, -30, 0],
            scale: [1, 1.15, 1],
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
            width: '180px',
            height: '180px',
            left: '60%',
            top: '60%',
            backgroundColor: 'rgba(255, 206, 86, 0.15)',
            filter: 'blur(70px)',
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 25, 0],
          }}
          transition={{
            duration: 12,
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
            Business Benefits
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real results from real companies using LeadLens
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.15, duration: 0.8 }}
                whileHover={{ scale: 1.03 }}
                className="group"
              >
                <div className="bg-card/80 backdrop-blur-xl rounded-3xl p-10 shadow-xl border border-border h-full transition-all duration-300 hover:shadow-2xl relative overflow-hidden">
                  {/* Background gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  />

                  {/* Stat badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isVisible ? { scale: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.15, type: 'spring' }}
                    className={`absolute top-6 right-6 w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}
                  >
                    <span className="text-2xl font-black text-white">{feature.stat}</span>
                  </motion.div>

                  <div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-10 h-10 text-white" />
                  </div>

                  <h3 className="text-3xl font-black text-foreground mb-4">{feature.benefit}</h3>
                  <p className="text-xl text-foreground/90 font-semibold mb-6">{feature.impact}</p>

                  <div className="pt-6 border-t border-border">
                    <p className="text-sm text-muted-foreground font-medium">
                      <span className="text-muted-foreground/60">Powered by:</span> {feature.hint}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional technical hints */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { icon: Brain, label: 'AI Analysis' },
            { icon: Zap, label: 'Real-time' },
            { icon: Shield, label: 'Secure' },
            { icon: TrendingUp, label: 'Scalable' },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-secondary mb-3">
                <item.icon className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-sm font-semibold text-muted-foreground">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}