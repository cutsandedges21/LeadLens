'use client';

import { motion } from 'framer-motion';
import { useScrollTrigger } from '@/lib/parallax';
import { AlertTriangle, CheckCircle, Zap, Smartphone, Clock, BarChart } from 'lucide-react';

const mistakes = [
  {
    icon: AlertTriangle,
    problem: 'Forms are too long',
    solution: 'AI identifies optimal field count',
    color: 'from-orange-400 to-orange-500',
  },
  {
    icon: CheckCircle,
    problem: 'CTA buttons are hidden',
    solution: 'Heatmap analysis reveals blind spots',
    color: 'from-pink-400 to-pink-500',
  },
  {
    icon: Smartphone,
    problem: 'Mobile experience is poor',
    solution: 'Responsive optimization recommendations',
    color: 'from-blue-400 to-blue-500',
  },
  {
    icon: Clock,
    problem: 'Loading speed is slow',
    solution: 'Performance bottleneck detection',
    color: 'from-purple-400 to-purple-500',
  },
  {
    icon: BarChart,
    problem: 'Conversion paths are unclear',
    solution: 'User journey mapping and optimization',
    color: 'from-indigo-400 to-indigo-500',
  },
  {
    icon: Zap,
    problem: 'Trust signals are missing',
    solution: 'Social proof and credibility enhancement',
    color: 'from-rose-400 to-rose-500',
  },
];

export function ProblemSolutionSection() {
  const { isVisible, elementRef } = useScrollTrigger(0.1);

  return (
    <section
      ref={elementRef as any}
      className="relative py-32 overflow-hidden bg-gradient-to-b from-background via-secondary/20 to-background"
    >
      {/* Background floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '200px',
            height: '200px',
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
            width: '150px',
            height: '150px',
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

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4"
          >
            Stop losing revenue
          </motion.p>
          <h2 className="text-5xl md:text-6xl font-black text-foreground mb-6">
            Common Conversion Mistakes
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            LeadLens identifies and fixes these issues automatically
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mistakes.map((mistake, index) => {
            const Icon = mistake.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <div className="bg-card/80 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-border h-full transition-all duration-300 hover:shadow-2xl">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${mistake.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{mistake.problem}</h3>
                  <p className="text-muted-foreground leading-relaxed">{mistake.solution}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}