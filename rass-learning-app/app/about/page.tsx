import { AboutHero } from "@/components/about/about-hero";
import { Leadership } from "@/components/about/leadership";
import { OurJourney } from "@/components/about/our-journey";
import { OurMission } from "@/components/about/our-mission";
import { OurValues } from "@/components/about/our-values";


export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <OurMission />
      <OurValues />
      <Leadership />
      <OurJourney />
    </main>
  )
}