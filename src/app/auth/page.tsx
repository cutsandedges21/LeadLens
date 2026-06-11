'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, AlertCircle, CheckCircle2, Mail, Lock, User, ArrowLeft, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Brandmark, Wordmark } from '@/components/Brandmark';
import { useAuth } from '@/contexts/AuthContext';

type AuthTab = 'signin' | 'signup';

function AuthPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const analysisId = searchParams.get('analysisId');
  const emailParam = searchParams.get('email');
  const returnUrl = searchParams.get('returnUrl');
  const { signIn, signUp } = useAuth();

  const [activeTab, setActiveTab] = useState<AuthTab>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [agreeMarketing, setAgreeMarketing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (emailParam) setEmail(emailParam);
  }, [emailParam]);

  const redirectAfterAuth = (delay: number) => {
    setTimeout(() => {
      if (analysisId) {
        router.push(`/results?analysisId=${analysisId}&email=${encodeURIComponent(email)}`);
      } else if (returnUrl) {
        router.push(returnUrl);
      } else {
        router.push('/dashboard');
      }
    }, delay);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');
    try {
      const { error: authError } = await signIn(email, password);
      if (authError) {
        setError('Invalid email or password. Please try again.');
        return;
      }
      setSuccess('Welcome back — signing you in.');
      redirectAfterAuth(900);
    } catch {
      setError('Something went wrong during sign in. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');
    try {
      if (password !== confirmPassword) throw new Error('Passwords do not match.');
      if (password.length < 6) throw new Error('Password must be at least 6 characters.');
      await signUp(email, password, { fullName, company, role });
      setSuccess('Account created — check your email to verify.');
      redirectAfterAuth(1800);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong during sign up.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Brand panel */}
      <div className="relative hidden overflow-hidden bg-foreground lg:flex lg:w-[44%] lg:flex-col lg:justify-between lg:p-12">
        <div className="pointer-events-none absolute -left-24 top-1/3 size-80 rounded-full bg-brand/30 blur-3xl" />
        <Link href="/" className="relative flex items-center gap-2.5">
          <Brandmark className="size-9 bg-background text-foreground" />
          <span className="font-serif text-xl font-semibold tracking-tight text-background">
            Lead<span className="text-brand">Lens</span>
          </span>
        </Link>

        <div className="relative max-w-md">
          <h2 className="font-editorial text-4xl font-bold leading-tight text-background">
            See what&apos;s costing you conversions — and exactly how to fix it
          </h2>
          <p className="mt-4 text-background/70">
            Your audit is waiting. Sign in to view the full report, with every
            fix ranked by impact.
          </p>
        </div>

        <div className="relative flex items-center gap-3 rounded-2xl border border-background/15 bg-background/5 p-4">
          <span className="flex size-9 items-center justify-center rounded-xl bg-background text-foreground">
            <TrendingUp className="size-4" />
          </span>
          <p className="text-sm text-background/80">
            Trusted by growth teams optimizing websites, YouTube &amp; Instagram.
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex flex-1 items-center justify-center bg-dot-grid px-5 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center justify-between lg:hidden">
            <Link href="/" className="flex items-center gap-2.5">
              <Brandmark className="size-9" />
              <Wordmark />
            </Link>
          </div>

          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> Back to home
          </Link>

          <h1 className="font-editorial text-3xl font-bold text-foreground">
            {activeTab === 'signin' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="mt-1.5 text-muted-foreground">
            {activeTab === 'signin'
              ? 'Sign in to access your audit results.'
              : 'Start finding what to fix in about a minute.'}
          </p>

          {/* Tabs */}
          <div className="mt-7 grid grid-cols-2 gap-1 rounded-full border border-border bg-card p-1">
            {(['signin', 'signup'] as AuthTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setError('');
                  setSuccess('');
                }}
                className="relative rounded-full px-4 py-2 text-sm font-medium transition-colors"
              >
                {activeTab === tab && (
                  <motion.span
                    layoutId="auth-tab"
                    className="absolute inset-0 rounded-full bg-foreground"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span
                  className={`relative ${
                    activeTab === tab ? 'text-background' : 'text-muted-foreground'
                  }`}
                >
                  {tab === 'signin' ? 'Sign in' : 'Sign up'}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-6">
            <AnimatePresence mode="wait">
              {activeTab === 'signin' ? (
                <motion.form
                  key="signin"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={handleSignIn}
                  className="space-y-4"
                >
                  <Field id="signin-email" label="Email address" Icon={Mail}>
                    <Input id="signin-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="pl-11" />
                  </Field>
                  <Field id="signin-password" label="Password" Icon={Lock}>
                    <Input id="signin-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="pl-11" />
                  </Field>
                  <Feedback error={error} success={success} />
                  <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? 'Signing in…' : 'Sign in'}
                    {!isSubmitting && <ArrowRight className="size-4" />}
                  </Button>
                </motion.form>
              ) : (
                <motion.form
                  key="signup"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={handleSignUp}
                  className="space-y-4"
                >
                  <Field id="signup-name" label="Full name" Icon={User}>
                    <Input id="signup-name" required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Jane Doe" className="pl-11" />
                  </Field>
                  <div className="grid grid-cols-2 gap-3">
                    <Field id="signup-company" label="Company" Icon={User}>
                      <Input id="signup-company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Acme" className="pl-11" />
                    </Field>
                    <Field id="signup-role" label="Role" Icon={User}>
                      <Input id="signup-role" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Growth" className="pl-11" />
                    </Field>
                  </div>
                  <Field id="signup-email" label="Email address" Icon={Mail}>
                    <Input id="signup-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="pl-11" />
                  </Field>
                  <Field id="signup-password" label="Password" Icon={Lock}>
                    <Input id="signup-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" className="pl-11" />
                  </Field>
                  <Field id="signup-confirm" label="Confirm password" Icon={Lock}>
                    <Input id="signup-confirm" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className="pl-11" />
                  </Field>
                  <label className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4">
                    <input type="checkbox" checked={agreeMarketing} onChange={(e) => setAgreeMarketing(e.target.checked)} className="mt-0.5 size-4 rounded border-border accent-[var(--brand)]" />
                    <span className="text-sm text-muted-foreground">
                      Send me occasional conversion tips and product updates.
                    </span>
                  </label>
                  <Feedback error={error} success={success} />
                  <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? 'Creating account…' : 'Create account'}
                    {!isSubmitting && <ArrowRight className="size-4" />}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ id, label, Icon, children }: { id: string; label: string; Icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground/60" />
        {children}
      </div>
    </div>
  );
}

function Feedback({ error, success }: { error: string; success: string }) {
  if (!error && !success) return null;
  return error ? (
    <p className="flex items-center gap-2 rounded-xl bg-destructive/10 px-3.5 py-2.5 text-sm font-medium text-destructive">
      <AlertCircle className="size-4 shrink-0" />
      {error}
    </p>
  ) : (
    <p className="flex items-center gap-2 rounded-xl bg-emerald-500/10 px-3.5 py-2.5 text-sm font-medium text-emerald-600">
      <CheckCircle2 className="size-4 shrink-0" />
      {success}
    </p>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={null}>
      <AuthPageContent />
    </Suspense>
  );
}
