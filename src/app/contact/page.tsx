'use client';

import { motion } from 'framer-motion';
import { Mail, Building2, MessageSquare, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ContactPage() {
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
            Contact Sales
          </h1>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto">
            Our team is ready to help you scale your conversion infrastructure
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <Card className="bg-card/80 backdrop-blur-xl border-2 border-border rounded-3xl p-8 max-w-md mx-auto shadow-2xl">
            <div className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-foreground/80">
                  Work Email
                </Label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/60" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    className="pl-10 bg-secondary/50 border-border focus-visible:ring-orange-500 h-12 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="company-size" className="text-foreground/80">
                  Company Size
                </Label>
                <div className="relative mt-2">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/60" />
                  <select
                    id="company-size"
                    className="w-full pl-10 bg-secondary/50 border-border rounded-xl px-4 py-3 h-12 focus:outline-none focus:ring-2 focus:ring-orange-500 text-foreground"
                  >
                    <option>1-10</option>
                    <option>11-50</option>
                    <option>51-200</option>
                    <option>201+</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="message" className="text-foreground/80">
                  How can we help?
                </Label>
                <div className="relative mt-2">
                  <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-muted-foreground/60" />
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Tell us about your conversion challenges..."
                    className="w-full pl-10 bg-secondary/50 border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 text-foreground resize-none"
                  />
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-orange-400 via-pink-500 to-blue-500 text-white hover:opacity-90 h-12 rounded-xl font-bold text-lg shadow-lg transition-all hover:scale-105">
                Submit Inquiry
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </Card>
        </motion.div>

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
              className="bg-card/80 backdrop-blur-sm border-2 border-border text-foreground/80 hover:bg-accent px-8 py-4 rounded-full font-bold transition-all hover:scale-105"
            >
              ← Back to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
