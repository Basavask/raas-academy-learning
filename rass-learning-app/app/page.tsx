import { HeroSection } from '@/components/home/hero-section'
import { LogosSlider } from '@/components/home/logos-slider'
import { PartnershipSection } from '@/components/home/partnership-section'
import { FeaturesSection } from '@/components/home/features-section'
import { CoursePreview } from '@/components/home/course-preview'
import { SuccessStories } from '@/components/home/success-stories'
import { CTASection } from '@/components/home/cta-section'
import { StatsSection } from '@/components/home/stats-section'
import { SubscribeNews } from '@/components/common/subscribe-news'
import { ScrollToTop } from '@/components/common/scroll-to-top'

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <LogosSlider />
      <div className="border-t border-gray-200 dark:border-gray-700">
        <PartnershipSection />
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700">
        <CoursePreview />
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700">
        <FeaturesSection />
      </div>
     
      <div className="border-t border-gray-200 dark:border-gray-700">
        <StatsSection />
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700">
        <SuccessStories />
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700">
        <CTASection />
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700">
        <SubscribeNews />
      </div>
      <ScrollToTop />
    </main>
  )
}