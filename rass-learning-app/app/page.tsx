import { HeroSection } from '@/components/home/hero-section'
import { PartnersSection } from '@/components/home/partners-section'
import { CoursePreview } from '@/components/home/course-preview'
import { SuccessStories } from '@/components/home/success-stories'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PartnersSection />
      <CoursePreview />
      <SuccessStories />
    </>
  )
}