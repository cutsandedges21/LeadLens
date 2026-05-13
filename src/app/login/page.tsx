'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const analysisId = searchParams.get('analysisId');
  const emailParam = searchParams.get('email');
  const returnUrl = searchParams.get('returnUrl');
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeMarketing, setAgreeMarketing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (emailParam) setEmail(emailParam);
  }, [emailParam]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Authenticate with Supabase
      const { error: authError } = await signIn(email, password);

      if (authError) {
        setError('Invalid email or password. Please try again.');
        return;
      }

      if (agreeMarketing) {
        await fetch('/api/marketing', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, agreed: true }),
        });
      }

      // Redirect to results if there's an analysisId, otherwise use returnUrl or go to dashboard
      if (analysisId) {
        router.push(`/results?analysisId=${analysisId}&email=${encodeURIComponent(email)}`);
      } else if (returnUrl) {
        router.push(returnUrl);
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-12 h-12 bg-foreground text-background rounded-xl mx-auto flex items-center justify-center font-black text-2xl mb-6 shadow-xl">
            LL
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-foreground">Welcome Back</h1>
          <p className="text-muted-foreground">Log in to view your audit results.</p>
        </div>

        <Card className="bg-card border-border shadow-2xl">
          <CardContent className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-purple-500 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-purple-500 transition-colors"
                  required
                />
              </div>

              <div className="flex items-start gap-3 p-4 bg-secondary/50 border border-border rounded-xl">
                <div className="flex items-center h-5">
                  <input
                    id="marketing"
                    type="checkbox"
                    checked={agreeMarketing}
                    onChange={(e) => setAgreeMarketing(e.target.checked)}
                    className="w-4 h-4 rounded border-border bg-card text-purple-600 focus:ring-purple-600 focus:ring-offset-background"
                  />
                </div>
                <div className="text-sm">
                  <label htmlFor="marketing" className="font-medium text-foreground/80">
                    I agree to receive automated email advertisements.
                  </label>
                  <p className="text-muted-foreground mt-1">We'll send you optimization tips and product updates. You can unsubscribe at any time.</p>
                </div>
              </div>

              {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-foreground text-background hover:bg-foreground/90 py-6 rounded-xl font-bold text-lg shadow-xl transition-all"
              >
                {isSubmitting ? 'Authenticating...' : 'Sign In & View Report'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
