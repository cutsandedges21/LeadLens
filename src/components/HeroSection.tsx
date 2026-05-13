'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ArrowRight, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { FloatingShapes } from '@/components/FloatingShapes';
import { useParallax } from '@/lib/parallax';
import Link from 'next/link';

type AppState = 'idle' | 'analyzing' | 'gated';

export function HeroSection() {
  const [appState, setAppState] = useState<AppState>('idle');
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [analysisId, setAnalysisId] = useState('');
  const [error, setError] = useState('');

  const { offset: heroOffset, elementRef: heroRef } = useParallax({ speed: 0.4 });

  const isValidUrl = (urlString: string) => {
    try {
      new URL(urlString);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!url) {
      setError('Please enter a URL.');
      return;
    }

    let finalUrl = url;
    if (!/^https?:\/\//i.test(finalUrl)) {
      finalUrl = 'https://' + finalUrl;
      setUrl(finalUrl);
    }

    if (!isValidUrl(finalUrl)) {
      setError('Please enter a valid URL (e.g., https://example.com).');
      return;
    }

    setAppState('analyzing');

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: finalUrl }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to analyze');

      setAnalysisId(data.analysisId);
      setTimeout(() => setAppState('gated'), 2500);
    } catch (err: any) {
      setError(err.message);
      setAppState('idle');
    }
  };

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !analysisId) return;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    window.location.href = `/auth?email=${encodeURIComponent(email)}&analysisId=${analysisId}`;
  };

  return (
    <section
      ref={heroRef as any}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, var(--background) 0%, var(--secondary) 50%, var(--background) 100%)',
      }}
    >
      <FloatingShapes />

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        <AnimatePresence mode="wait">
          {appState === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="mb-8"
              >

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="text-7xl md:text-9xl font-black tracking-tighter text-foreground leading-[1] mb-6"
                >
                  <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                    Diagnose.
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-pink-500 via-blue-500 to-orange-400 bg-clip-text text-transparent">
                    Optimize.
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-500 via-orange-400 to-pink-500 bg-clip-text text-transparent">
                    Scale.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed mb-12"
                >
                  Stop losing revenue to unseen funnel friction. Deploy our AI agents to systematically audit your digital assets and execute high-yield conversion plays.
                </motion.p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="max-w-2xl mx-auto"
              >
                <Card className="bg-card/80 backdrop-blur-xl border-border shadow-2xl rounded-2xl p-2 relative overflow-hidden group">
                  <div className="absolute inset-0 border border-orange-500/0 group-hover:border-orange-500/30 rounded-2xl transition-colors duration-500 pointer-events-none"></div>
                  <form onSubmit={handleAnalyze} className="flex flex-col md:flex-row gap-2 relative z-10">
                    <div className="relative flex-1">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Enter target URL (e.g., https://acme.com)"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="pl-12 bg-secondary/50 border-0 focus-visible:ring-2 focus-visible:ring-orange-500 text-lg h-14 rounded-xl placeholder:text-muted-foreground/60 font-medium text-foreground"
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="animate-cycle-colors hover:opacity-90 text-white h-14 px-8 rounded-xl text-sm font-bold shadow-lg transition-all"
                      style={{
                        backgroundImage: 'linear-gradient(90deg, #fb923c, #ec4899, #3b82f6, #fb923c)',
                      }}
                    >
                      Initiate Audit <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </form>
                </Card>
                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 mt-4 text-sm font-bold px-2 flex items-center justify-center gap-2"
                  >
                    {error}
                  </motion.p>
                )}
              </motion.div>
            </motion.div>
          )}

          {appState === 'analyzing' && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-xl mx-auto"
            >
              <Card className="bg-card/90 backdrop-blur-xl border-border shadow-2xl rounded-3xl p-12 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent animate-[shimmer_2s_infinite]"></div>

                <div className="relative w-24 h-24 mx-auto mb-8">
                  <div className="absolute inset-0 border-2 border-border rounded-full"></div>
                  <motion.div
                    className="absolute inset-0 border-2 border-orange-500 rounded-full border-t-transparent"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  ></motion.div>
                  <div className="absolute inset-0 m-auto w-12 h-12 bg-secondary rounded-full flex items-center justify-center shadow-lg">
                    <Cpu className="w-5 h-5 text-orange-500" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-6 tracking-tight text-foreground">Agent Executing Protocol</h3>
                <div className="space-y-4 text-left max-w-sm mx-auto bg-secondary/50 p-6 rounded-2xl border border-border font-mono text-sm">
                  <p className="flex items-center gap-3 text-muted-foreground">
                    <span className="w-4 text-center">✓</span> [SYS] Parsing DOM structure
                  </p>
                  <p className="flex items-center gap-3 text-muted-foreground">
                    <span className="w-4 text-center">✓</span> [SYS] Evaluating heuristics
                  </p>
                  <p className="flex items-center gap-3 text-orange-500 animate-pulse">
                    <span className="w-4 text-center">...</span> [AI] Computing delta scores
                  </p>
                </div>
              </Card>
            </motion.div>
          )}

          {appState === 'gated' && (
            <motion.div
              key="gated"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto"
            >
              <Card className="overflow-hidden bg-card/90 backdrop-blur-xl border-border shadow-2xl rounded-3xl relative">
                <div className="relative p-12 md:p-16 flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-secondary border border-border text-foreground rounded-2xl flex items-center justify-center mb-8 shadow-lg">
                    <ArrowRight className="w-8 h-8" />
                  </div>
                  <h2 className="text-4xl font-black mb-4 tracking-tight text-foreground">Audit Locked</h2>
                  <p className="text-lg text-muted-foreground mb-10 max-w-md font-medium">
                    Critical revenue leaks identified. Enter your work email to decrypt the full analysis report.
                  </p>

                  <form onSubmit={handleUnlock} className="w-full max-w-sm space-y-4">
                    <Input
                      type="email"
                      placeholder="commander@enterprise.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-secondary border-border h-14 text-center text-lg rounded-xl focus-visible:ring-2 focus-visible:ring-orange-500 text-foreground font-mono"
                    />
                    <Button
                      type="submit"
                      className="w-full h-14 animate-cycle-colors hover:opacity-90 text-white font-bold text-sm uppercase tracking-widest rounded-xl shadow-lg transition-all"
                      style={{
                        backgroundImage: 'linear-gradient(90deg, #fb923c, #ec4899, #3b82f6, #fb923c)',
                      }}
                    >
                      Decrypt Report
                    </Button>
                    {error && <p className="text-red-500 text-sm font-bold mt-2">{error}</p>}
                    <p className="text-xs text-gray-400 font-medium pt-4 tracking-wider uppercase">Secure connection established</p>
                  </form>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}