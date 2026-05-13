'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldAlert, TrendingUp, Zap, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const analysisId = searchParams.get('analysisId');
  const email = searchParams.get('email');
  
  const [report, setReport] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReport() {
      if (!analysisId || !email) {
        setError('Missing analysis information. Please go back and try again.');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/capture-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ analysisId, email }),
        });
        
        const data = await res.json();
        
        if (!res.ok) throw new Error(data.error || 'Failed to fetch report');
        
        setReport(data.report);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchReport();
  }, [analysisId, email]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-secondary border-t-purple-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-foreground px-4">
        <div className="bg-card border border-red-500/50 p-8 rounded-3xl max-w-md text-center">
          <ShieldAlert className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Report Unavailable</h2>
          <p className="text-muted-foreground mb-6">{error || 'Could not load the report.'}</p>
          <Link href="/">
            <Button className="w-full bg-primary text-primary-foreground font-bold">Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-purple-500/30">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6 flex items-center justify-between border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-foreground text-background rounded-lg flex items-center justify-center font-black text-lg">LL</div>
          <span className="font-bold text-xl tracking-tight">LeadLens</span>
        </div>
        <Link href="/">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground hover:bg-secondary">Dashboard Home</Button>
        </Link>
      </nav>

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 text-foreground">Audit Intel</h1>
          <p className="text-muted-foreground text-lg">Analysis complete for {email}</p>
        </div>

        {/* Bento Grid Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Main Score Card */}
          <Card className="lg:col-span-1 bg-card border-border shadow-[0_0_40px_rgba(168,85,247,0.05)] rounded-3xl relative overflow-hidden group hover:border-purple-500/30 transition-colors">
            <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-purple-600 to-orange-500 opacity-50" />
            <CardContent className="flex flex-col items-center justify-center h-full py-12">
              <p className="text-sm font-bold text-muted-foreground tracking-widest uppercase mb-6">Conversion Score</p>
              <div className="relative w-48 h-48 flex items-center justify-center mb-6">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-secondary" />
                  <circle
                    cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="8" fill="transparent" strokeLinecap="round"
                    strokeDasharray={552}
                    strokeDashoffset={552 - (552 * report.scores.overall) / 100}
                    className={report.scores.overall > 60 ? "text-orange-500" : "text-red-500"}
                    style={{ transition: 'stroke-dashoffset 2s ease-out' }}
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-6xl font-black text-foreground">{report.scores.overall}</span>
                  <span className="text-muted-foreground text-sm font-bold">/ 100</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Executive Summary */}
          <Card className="lg:col-span-2 bg-card border-border rounded-3xl p-2 hover:border-border/80 transition-colors">
            <CardContent className="p-8 h-full flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-6 h-6 text-purple-500" />
                <h2 className="text-xl font-bold">Executive Summary</h2>
              </div>
              <p className="text-xl text-foreground/80 leading-relaxed font-medium mb-10">"{report.overallInterpretation}"</p>
              
              <div className="grid grid-cols-4 gap-4 pt-8 border-t border-border/50">
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">UX/UI</p>
                  <p className="text-3xl font-black">{report.scores.ux}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Messaging</p>
                  <p className="text-3xl font-black">{report.scores.messaging}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Trust</p>
                  <p className="text-3xl font-black">{report.scores.trust}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Speed</p>
                  <p className="text-3xl font-black">{report.scores.speed}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Critical Issues */}
          <div className="space-y-6">
            <Card className="bg-card border-border rounded-3xl overflow-hidden h-full">
              <CardHeader className="bg-secondary/20 border-b border-border p-6">
                <CardTitle className="flex items-center gap-3 text-red-500">
                  <ShieldAlert className="w-5 h-5" />
                  Critical Anomalies
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {report.criticalIssues.map((issue: any, i: number) => (
                  <div key={i} className="bg-secondary/10 rounded-2xl p-6 border border-red-500/20">
                    <h4 className="text-xl font-bold mb-4">{issue.problem}</h4>
                    <div className="space-y-4">
                      <div>
                        <span className="text-xs font-bold text-red-400 uppercase tracking-wider">Revenue Impact</span>
                        <p className="text-muted-foreground mt-1 text-sm">{issue.impact}</p>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">Directive</span>
                        <p className="text-foreground/90 mt-1 text-sm font-medium">{issue.fix}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Lost Opportunities & Quick Wins */}
          <div className="space-y-6 flex flex-col">
            <Card className="bg-card border-border rounded-3xl overflow-hidden flex-1">
              <CardHeader className="bg-secondary/20 border-b border-border p-6">
                <CardTitle className="flex items-center gap-3 text-orange-500">
                  <TrendingUp className="w-5 h-5" />
                  Untapped Potential
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {report.lostOpportunities.map((opp: any, i: number) => (
                  <div key={i} className="border-l-2 border-orange-500 pl-4 py-1">
                    <h4 className="font-bold text-lg text-foreground">{opp.missingElement}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{opp.revenueImpact}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-card border-border rounded-3xl overflow-hidden">
              <CardHeader className="bg-secondary/20 border-b border-border p-6">
                <CardTitle className="flex items-center gap-3 text-emerald-500">
                  <CheckCircle className="w-5 h-5" />
                  Immediate Execution Protocol
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {report.actionableImprovements.map((improvement: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1 text-emerald-500"><CheckCircle className="w-4 h-4" /></div>
                      <span className="text-muted-foreground text-sm">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-br from-purple-900/10 via-background to-background border-purple-500/30 rounded-3xl overflow-hidden relative shadow-[0_0_50px_rgba(168,85,247,0.15)]">
            <CardContent className="p-16 relative z-10 flex flex-col items-center">
              <h3 className="text-4xl font-black mb-4 text-foreground">Initiate Fixes</h3>
              <p className="text-muted-foreground max-w-xl mb-8">Your architecture is leaking revenue. Upgrade to a Pro agent to have our AI automatically generate the code required to patch these vulnerabilities.</p>
              <Link href="/pricing">
                <Button className="bg-foreground text-background hover:bg-foreground/90 h-14 px-8 font-bold text-lg rounded-xl">
                  Deploy AI Agents <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
