'use client';

import { motion } from 'framer-motion';
import { Building2, Users, ShoppingCart, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const solutions = [
  {
    icon: Building2,
    name: 'For Agencies',
    description: 'Close more clients by running free audits on their infrastructure. Hand them a 40/100 score and tell them exactly how your agency will fix it.',
    color: 'from-orange-400 to-pink-500',
    borderColor: 'border-orange-500/50',
  },
  {
    icon: Users,
    name: 'For Creators',
    description: 'You have traffic but no conversions. Our AI analyzes your funnel to turn passive followers into newsletter subscribers and paid community members.',
    color: 'from-pink-500 to-purple-500',
    borderColor: 'border-pink-500/50',
  },
  {
    icon: ShoppingCart,
    name: 'For E-Com Brands',
    description: 'Stop abandoning carts. We identify UX friction in your checkout flow and missing trust signals that are costing you thousands daily.',
    color: 'from-emerald-500 to-teal-500',
    borderColor: 'border-emerald-500/50',
  },
];

export default function SolutionsPage() {
  return (
    <div
      className="min-h-screen py-32 px-4"
      style={{
        background: 'linear-gradient(135deg, var(--background) 0%, var(--secondary) 50%, var(--background) 100%)',
      }}
    >
      {/* Background floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '300px',
            height: '300px',
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
            width: '250px',
            height: '250px',
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

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-foreground">
            Solutions
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Custom-tailored insights depending on your business model
          </p>
        </motion.div>

        {/* Solution Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Card
                className={`h-full bg-card/80 backdrop-blur-xl border-2 ${solution.borderColor} rounded-3xl p-8 transition-all hover:shadow-2xl hover:scale-105`}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 via-pink-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <solution.icon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-4 text-foreground">{solution.name}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {solution.description}
                </p>
                <Button
                  className={`w-full bg-gradient-to-r ${solution.color} text-white hover:opacity-90 font-bold transition-all hover:scale-105`}
                >
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-20 text-center"
        >
          <Link href="/">
            <Button
              variant="outline"
              className="bg-card/80 backdrop-blur-sm border-2 border-border text-foreground hover:bg-accent px-8 py-4 rounded-full font-bold transition-all hover:scale-105"
            >
              ← Back to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
