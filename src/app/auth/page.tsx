'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight, CheckCircle, AlertCircle, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

type AuthTab = 'signin' | 'signup';

export default function AuthPage() {
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

      setSuccess('Successfully signed in!');

      // Redirect to results if there's an analysisId, otherwise use returnUrl or go to dashboard
      setTimeout(() => {
        if (analysisId) {
          router.push(`/results?analysisId=${analysisId}&email=${encodeURIComponent(email)}`);
        } else if (returnUrl) {
          router.push(returnUrl);
        } else {
          router.push('/dashboard');
        }
      }, 1000);
    } catch (err: any) {
      setError('An error occurred during sign in. Please try again.');
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
      // Validate passwords match
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Validate password strength
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      // Sign up with AuthContext
      await signUp(email, password, { fullName, company, role });

      setSuccess('Account created successfully! Please check your email to verify your account.');

      // Redirect to results if there's an analysisId, otherwise use returnUrl or go to dashboard
      setTimeout(() => {
        if (analysisId) {
          router.push(`/results?analysisId=${analysisId}&email=${encodeURIComponent(email)}`);
        } else if (returnUrl) {
          router.push(returnUrl);
        } else {
          router.push('/dashboard');
        }
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'An error occurred during sign up');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
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

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-3 mb-4">
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
            <br></br>
            <br></br>
            {activeTab === 'signin' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-muted-foreground">
            {activeTab === 'signin'
              ? 'Sign in to access your audit results'
              : 'Start optimizing your conversion rates today'}
          </p>
        </motion.div>

        {/* Auth Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-card/80 backdrop-blur-xl border-border shadow-2xl rounded-3xl overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-border">
              <button
                onClick={() => {
                  setActiveTab('signin');
                  setError('');
                  setSuccess('');
                }}
                className={`flex-1 py-4 px-6 text-sm font-medium transition-all relative ${activeTab === 'signin'
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                Sign In
                {activeTab === 'signin' && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-400 via-pink-500 to-blue-500"
                    layoutId="tab-indicator"
                  />
                )}
              </button>
              <button
                onClick={() => {
                  setActiveTab('signup');
                  setError('');
                  setSuccess('');
                }}
                className={`flex-1 py-4 px-6 text-sm font-medium transition-all relative ${activeTab === 'signup'
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                Sign Up
                {activeTab === 'signup' && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-400 via-pink-500 to-blue-500"
                    layoutId="tab-indicator"
                  />
                )}
              </button>
            </div>

            <CardContent className="p-8">
              <AnimatePresence mode="wait">
                {activeTab === 'signin' ? (
                  <motion.form
                    key="signin"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSignIn}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="signin-email" className="text-foreground/80">
                        Email Address
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/60" />
                        <Input
                          id="signin-email"
                          type="email"
                          placeholder="you@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 bg-secondary/50 border-border focus-visible:ring-orange-500 h-12 rounded-xl"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signin-password" className="text-foreground/80">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="signin-password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 bg-secondary/50 border-border focus-visible:ring-orange-500 h-12 rounded-xl"
                          required
                        />
                      </div>
                      <div className="text-right">
                        <button
                          type="button"
                          onClick={() => {
                            // TODO: Implement forgot password functionality
                            alert('Forgot password functionality will be implemented soon!');
                          }}
                          className="text-sm text-orange-500 hover:text-orange-600 font-medium transition-colors"
                        >
                          Forgot password?
                        </button>
                      </div>
                    </div>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-lg"
                      >
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        {error}
                      </motion.div>
                    )}

                    {success && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-green-600 text-sm bg-green-50 p-3 rounded-lg"
                      >
                        <CheckCircle className="w-4 h-4 flex-shrink-0" />
                        {success}
                      </motion.div>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-orange-400 via-pink-500 to-blue-500 text-white hover:opacity-90 h-12 rounded-xl font-bold text-lg shadow-lg transition-all hover:scale-105"
                    >
                      {isSubmitting ? 'Signing in...' : 'Sign In'}
                      {!isSubmitting && <ArrowRight className="ml-2 w-5 h-5" />}
                    </Button>
                  </motion.form>
                ) : (
                  <motion.form
                    key="signup"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSignUp}
                    className="space-y-5"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="signup-name" className="text-foreground/80">
                        Full Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/60" />
                        <Input
                          id="signup-name"
                          type="text"
                          placeholder="John Doe"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="pl-10 bg-secondary/50 border-border focus-visible:ring-orange-500 h-12 rounded-xl"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-company" className="text-foreground/80">
                        Company
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/60" />
                        <Input
                          id="signup-company"
                          type="text"
                          placeholder="Acme Inc."
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          className="pl-10 bg-secondary/50 border-border focus-visible:ring-orange-500 h-12 rounded-xl"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-role" className="text-foreground/80">
                        Role
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/60" />
                        <Input
                          id="signup-role"
                          type="text"
                          placeholder="Marketing Manager"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="pl-10 bg-secondary/50 border-border focus-visible:ring-orange-500 h-12 rounded-xl"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-foreground/80">
                        Email Address
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/60" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="you@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 bg-secondary/50 border-border focus-visible:ring-orange-500 h-12 rounded-xl"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-foreground/80">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/60" />
                        <Input
                          id="signup-password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 bg-secondary/50 border-border focus-visible:ring-orange-500 h-12 rounded-xl"
                          required
                        />
                      </div>
                      <p className="text-xs text-muted-foreground/60">Must be at least 6 characters</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-confirm" className="text-foreground/80">
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/60" />
                        <Input
                          id="signup-confirm"
                          type="password"
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="pl-10 bg-secondary/50 border-border focus-visible:ring-orange-500 h-12 rounded-xl"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-secondary rounded-xl border border-border">
                      <input
                        id="marketing"
                        type="checkbox"
                        checked={agreeMarketing}
                        onChange={(e) => setAgreeMarketing(e.target.checked)}
                        className="w-4 h-4 mt-1 rounded border-border text-orange-500 focus:ring-orange-500"
                      />
                      <div className="text-sm">
                        <label htmlFor="marketing" className="font-medium text-foreground/80 cursor-pointer">
                          I agree to receive marketing emails
                        </label>
                        <p className="text-muted-foreground mt-1">
                          Get optimization tips, product updates, and exclusive offers. Unsubscribe anytime.
                        </p>
                      </div>
                    </div>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-lg"
                      >
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        {error}
                      </motion.div>
                    )}

                    {success && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-green-600 text-sm bg-green-50 p-3 rounded-lg"
                      >
                        <CheckCircle className="w-4 h-4 flex-shrink-0" />
                        {success}
                      </motion.div>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-orange-400 via-pink-500 to-blue-500 text-white hover:opacity-90 h-12 rounded-xl font-bold text-lg shadow-lg transition-all hover:scale-105"
                    >
                      {isSubmitting ? 'Creating account...' : 'Create Account'}
                      {!isSubmitting && <ArrowRight className="ml-2 w-5 h-5" />}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        {/* Back to home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-6"
        >
          <button
            onClick={() => router.push('/')}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to home
          </button>
        </motion.div>
      </div>
    </div>
  );
}
