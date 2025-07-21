import { HeroSection } from '@/components/home/hero-section'
import { PartnershipSection } from '@/components/home/partnership-section'
import { FeaturesSection } from '@/components/home/features-section'
import { CoursePreview } from '@/components/home/course-preview'
import { SuccessStories } from '@/components/home/success-stories'
import { CTASection } from '@/components/home/cta-section'
import { StatsSection } from '@/components/home/stats-section'

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <PartnershipSection />
      <FeaturesSection />
      <CoursePreview />
      <StatsSection />
      <SuccessStories />
      <CTASection />
    </main>
  )
}