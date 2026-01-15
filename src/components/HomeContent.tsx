'use client';

import { HeroSection } from "./home/HeroSection";
import { FeaturesSection } from "./home/FeaturesSection";
import { UseCasesSection } from "./home/UseCasesSection";
import { CTASection } from "./home/CTASection";
import { Testimonials } from "./Testimonials";

interface HomeContentProps {
  userId?: string | null;
}

export default function HomeContent({ userId }: HomeContentProps) {
  return (
    <div className="flex flex-col">
      <HeroSection userId={userId} />
      <FeaturesSection />
      <UseCasesSection />
      <Testimonials />
      <CTASection userId={userId} />
    </div>
  );
} 