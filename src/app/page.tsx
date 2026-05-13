'use client';

import { HeroSection } from '@/components/HeroSection';
import { ProblemSolutionSection } from '@/components/ProblemSolutionSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { ResultsSection } from '@/components/ResultsSection';
import { CTASection } from '@/components/CTASection';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ProblemSolutionSection />
      <FeaturesSection />
      <ResultsSection />
      <CTASection />
    </main>
  );
}