'use client';

import { useRef } from 'react';
import { ScrollRoute } from '@/components/ScrollRoute';
import { HeroSection } from '@/components/HeroSection';
import { SocialProof } from '@/components/SocialProof';
import { ProblemSolutionSection } from '@/components/ProblemSolutionSection';
import { HowItWorks } from '@/components/HowItWorks';
import { FeaturesSection } from '@/components/FeaturesSection';
import { ResultsSection } from '@/components/ResultsSection';
import { PricingPeek } from '@/components/PricingPeek';
import { CTASection } from '@/components/CTASection';

export default function HomePage() {
  const mainRef = useRef<HTMLElement>(null);

  return (
    <main ref={mainRef} className="relative">
      <ScrollRoute containerRef={mainRef} />
      <div className="relative z-10">
        <HeroSection />
        <SocialProof />
        <ProblemSolutionSection />
        <HowItWorks />
        <FeaturesSection />
        <ResultsSection />
        <PricingPeek />
        <CTASection />
      </div>
    </main>
  );
}
