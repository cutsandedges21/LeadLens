'use client';

import { motion } from 'framer-motion';
import { Globe, Camera, Video, Check, ArrowRight, TrendingUp, Users, Zap } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const platforms = [
  {
    icon: Globe,
    emoji: '🌐',
    name: 'Websites & Landing Pages',
    description: 'Our core AI agent crawls your DOM, analyzes your copy against 10M+ conversion benchmarks, and identifies hidden friction points in your user journey.',
    features: ['DOM parsing', 'Lighthouse integration', 'Copywriting heuristics'],
    color: 'from-orange-400 to-pink-500',
    borderColor: 'border-orange-500/50',
    metrics: [
      { label: 'Conversion Rate', value: '47%', change: '+23%' },
      { label: 'Page Speed', value: '1.2s', change: '-40%' },
      { label: 'Bounce Rate', value: '32%', change: '-18%' },
    ],
  },
  {
    icon: Camera,
    emoji: '📸',
    name: 'Instagram Profiles',
    description: 'We map your grid aesthetic, analyze bio positioning, and measure engagement velocity to calculate your profile\'s latent revenue potential.',
    features: ['Bio optimization', 'Engagement velocity', 'Funnel leakage analysis'],
    color: 'from-pink-500 to-rose-500',
    borderColor: 'border-pink-500/50',
    metrics: [
      { label: 'Engagement Rate', value: '8.5%', change: '+156%' },
      { label: 'Follower Growth', value: '2.4K', change: '+89%' },
      { label: 'Link Clicks', value: '12.3%', change: '+67%' },
    ],
  },
  {
    icon: Video,
    emoji: '▶️',
    name: 'YouTube Channels',
    description: 'Stop bleeding subscribers. We audit your thumbnails, hooks, and descriptions to ensure your viewer retention turns into community building.',
    features: ['Hook retention', 'Description CTA tracking', 'Thumbnail contrast checks'],
    color: 'from-red-500 to-orange-500',
    borderColor: 'border-red-500/50',
    metrics: [
      { label: 'Watch Time', value: '4:32', change: '+45%' },
      { label: 'Subscriber Rate', value: '3.2%', change: '+78%' },
      { label: 'CTR', value: '8.9%', change: '+34%' },
    ],
  },
];

export default function PlatformPage() {
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
            Supported Platforms
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            LeadLens intelligently parses data structures from across the web. Whether you are an agency, a creator, or a SaaS company, we integrate directly with your growth channels.
          </p>
        </motion.div>

        {/* Platform Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Card
                className={`h-full bg-card/80 backdrop-blur-xl border-2 ${platform.borderColor} rounded-3xl p-8 transition-all hover:shadow-2xl hover:scale-105`}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 via-pink-500 to-blue-500 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg">
                  {platform.emoji}
                </div>
                <h2 className="text-2xl font-bold mb-4 text-foreground">{platform.name}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {platform.description}
                </p>

                {/* Metrics Preview */}
                <div className="mb-6 space-y-3">
                  {platform.metrics.map((metric, mIndex) => (
                    <div
                      key={mIndex}
                      className="flex items-center justify-between bg-secondary/50 rounded-xl p-3 border border-border"
                    >
                      <div className="flex items-center gap-2">
                        {mIndex === 0 && <TrendingUp className="w-4 h-4 text-orange-500" />}
                        {mIndex === 1 && <Zap className="w-4 h-4 text-pink-500" />}
                        {mIndex === 2 && <Users className="w-4 h-4 text-blue-500" />}
                        <span className="text-sm font-medium text-foreground/80">{metric.label}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-foreground">{metric.value}</div>
                        <div className="text-xs font-semibold text-green-600">{metric.change}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <ul className="text-foreground/80 text-sm text-left space-y-2 mb-8">
                  {platform.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full bg-gradient-to-r ${platform.color} text-white hover:opacity-90 font-bold transition-all hover:scale-105`}
                >
                  Get Started
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
