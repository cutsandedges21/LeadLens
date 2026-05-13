'use client';

import { motion } from 'framer-motion';
import { BookOpen, Code, ArrowRight, Download } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const resources = [
  {
    icon: BookOpen,
    tag: 'E-BOOK',
    tagColor: 'text-purple-500',
    name: 'The 2026 Conversion Handbook',
    description: 'Learn how the top 1% of YC startups structure their landing pages for maximum lead capture.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Code,
    tag: 'DEVELOPER DOCS',
    tagColor: 'text-orange-500',
    name: 'LeadLens API',
    description: 'Integrate our AI auditor directly into your SaaS product using our REST API.',
    color: 'from-orange-500 to-red-500',
  },
];

export default function ResourcesPage() {
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

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-foreground">
            Resources
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The ultimate database of CRO knowledge, case studies, and engineering docs
          </p>
        </motion.div>

        {/* Resource Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {resources.map((resource, index) => (
            <motion.div
              key={resource.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Card className="h-full bg-card/80 backdrop-blur-xl border-2 border-border rounded-2xl p-8 transition-all hover:shadow-2xl hover:scale-105 cursor-pointer group">
                <div className="text-sm font-bold mb-2">{resource.tag}</div>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 via-pink-500 to-blue-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <resource.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-foreground">{resource.name}</h3>
                <p className="text-muted-foreground mb-6">{resource.description}</p>
                <Button
                  className={`w-full bg-gradient-to-r ${resource.color} text-white hover:opacity-90 font-bold transition-all hover:scale-105`}
                >
                  Download
                  <Download className="ml-2 w-4 h-4" />
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
