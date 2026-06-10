'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Brandmark, Wordmark } from '@/components/Brandmark';
import { useAuth } from '@/contexts/AuthContext';

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const analysisId = searchParams.get('analysisId');
  const emailParam = searchParams.get('email');
  const returnUrl = searchParams.get('returnUrl');
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (emailParam) setEmail(emailParam);
  }, [emailParam]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      const { error: authError } = await signIn(email, password);
      if (authError) {
        setError('Invalid email or password. Please try again.');
        return;
      }
      setTimeout(() => {
        if (analysisId) {
          router.push(`/results?analysisId=${analysisId}&email=${encodeURIComponent(email)}`);
        } else if (returnUrl) {
          router.push(returnUrl);
        } else {
          router.push('/dashboard');
        }
      }, 700);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-dot-grid px-5 py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Brandmark className="size-9" />
            <Wordmark />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> Home
          </Link>
        </div>

        <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
          <h1 className="font-editorial text-3xl font-bold text-foreground">
            Welcome back
          </h1>
          <p className="mt-1.5 text-muted-foreground">
            Sign in to continue to your dashboard.
          </p>

          <form onSubmit={handleSignIn} className="mt-7 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email address</Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground/60" />
                <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="pl-11" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground/60" />
                <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="pl-11" />
              </div>
            </div>

            {error && (
              <p className="flex items-center gap-2 rounded-xl bg-destructive/10 px-3.5 py-2.5 text-sm font-medium text-destructive">
                <AlertCircle className="size-4 shrink-0" />
                {error}
              </p>
            )}

            <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Signing in…' : 'Sign in'}
              {!isSubmitting && <ArrowRight className="size-4" />}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            New to LeadLens?{' '}
            <Link href="/auth" className="font-medium text-brand hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginPageContent />
    </Suspense>
  );
}
