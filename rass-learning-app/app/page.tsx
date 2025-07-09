
import { StatsSection } from "@/components/landing/stats-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { CoursesSection } from "@/components/landing/courses-section";
import { CTASection } from "@/components/landing/cta-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HeroSection } from "@/components/landing/hero-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <CoursesSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  )
}