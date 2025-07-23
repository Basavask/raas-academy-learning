"use client"

import { Award, Shield } from 'lucide-react'
import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center overflow-hidden">
      {/* Decorative Background Pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(circle at 30% 40%, rgba(59,130,246,0.08) 0, transparent 60%),' +
            'radial-gradient(circle at 70% 60%, rgba(16,185,129,0.08) 0, transparent 60%)',
        }}
      />
      {/* Dark mode overlay for extra depth */}
      <div className="absolute inset-0 z-0 pointer-events-none dark:bg-gradient-to-br dark:from-gray-900/80 dark:via-gray-900/60 dark:to-gray-900/80" />
      {/* Hero Slider */}
      <div className="relative w-full max-w-7xl mx-auto mb-10 px-2 md:px-6 z-10">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="rounded-2xl shadow-2xl bg-white dark:bg-gray-900"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="flex flex-col md:flex-row items-center min-h-[420px] md:min-h-[480px] lg:min-h-[540px]">
              {/* Left Content */}
              <div className="flex-1 p-6 md:p-12 lg:p-16 flex flex-col justify-center">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">11 Years of Accelerating<br className="hidden md:block"/> Career Growth</h2>
                <p className="text-lg md:text-2xl text-gray-700 dark:text-gray-300 mb-2">Trusted by 12.4 million professionals to build industry-relevant and future-ready skills.</p>
                <p className="font-semibold text-base md:text-lg text-gray-900 dark:text-white mb-6">4/5 alumni landed their dream roles*</p>
                <button className="bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg mb-6 w-fit shadow-md hover:bg-primary/90 transition">EXPLORE PROGRAMS →</button>
                {/* Ratings */}
                <div className="flex flex-wrap gap-6 items-center mt-2">
                  <div className="flex items-center gap-1 text-yellow-500 text-lg font-bold"><span>★ 4.8</span><span className="text-green-600 text-base font-normal ml-1">Trustpilot</span></div>
                  <div className="flex items-center gap-1 text-yellow-500 text-lg font-bold"><span>★ 4.89</span><span className="text-green-600 text-base font-normal ml-1">Course Report</span></div>
                  <div className="flex items-center gap-1 text-yellow-500 text-lg font-bold"><span>★ 4.97</span><span className="text-red-500 text-base font-normal ml-1">switchup</span></div>
                  <div className="flex items-center gap-1 text-yellow-500 text-lg font-bold"><span>★ 4.7</span><span className="text-gray-600 dark:text-gray-300 text-base font-normal ml-1">Career Karma</span></div>
                </div>
              </div>
              {/* Right Image */}
              <div className="flex-1 flex items-center justify-center p-6 md:p-8">
                <div className="relative w-full h-64 md:h-96 lg:h-[420px] max-w-md mx-auto">
                  <Image src="/public/placeholder-person.png" alt="Professional" fill className="object-cover rounded-2xl shadow-lg" />
                </div>
              </div>
            </div>
          </SwiperSlide>
          {/* Slide 2 */}
          <SwiperSlide>
            <div className="flex flex-col md:flex-row items-center min-h-[420px] md:min-h-[480px] lg:min-h-[540px]">
              <div className="flex-1 p-6 md:p-12 lg:p-16 flex flex-col justify-center">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">Learn from Industry Experts</h2>
                <p className="text-lg md:text-2xl text-gray-700 dark:text-gray-300 mb-2">Courses designed and delivered by top professionals for real-world skills.</p>
                <p className="font-semibold text-base md:text-lg text-gray-900 dark:text-white mb-6">Personalized mentorship and support</p>
                <button className="bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg mb-6 w-fit shadow-md hover:bg-primary/90 transition">BROWSE COURSES →</button>
                <div className="flex flex-wrap gap-6 items-center mt-2">
                  <div className="flex items-center gap-1 text-yellow-500 text-lg font-bold"><span>★ 4.8</span><span className="text-green-600 text-base font-normal ml-1">Trustpilot</span></div>
                  <div className="flex items-center gap-1 text-yellow-500 text-lg font-bold"><span>★ 4.89</span><span className="text-green-600 text-base font-normal ml-1">Course Report</span></div>
                  <div className="flex items-center gap-1 text-yellow-500 text-lg font-bold"><span>★ 4.97</span><span className="text-red-500 text-base font-normal ml-1">switchup</span></div>
                  <div className="flex items-center gap-1 text-yellow-500 text-lg font-bold"><span>★ 4.7</span><span className="text-gray-600 dark:text-gray-300 text-base font-normal ml-1">Career Karma</span></div>
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center p-6 md:p-8">
                <div className="relative w-full h-64 md:h-96 lg:h-[420px] max-w-md mx-auto">
                  <Image src="/public/stu-learn-icon.png" alt="Mentor" fill className="object-cover rounded-2xl shadow-lg" />
                </div>
              </div>
            </div>
          </SwiperSlide>
          {/* Slide 3 */}
          <SwiperSlide>
            <div className="flex flex-col md:flex-row items-center min-h-[420px] md:min-h-[480px] lg:min-h-[540px]">
              <div className="flex-1 p-6 md:p-12 lg:p-16 flex flex-col justify-center">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">Achieve Your Career Goals</h2>
                <p className="text-lg md:text-2xl text-gray-700 dark:text-gray-300 mb-2">Join thousands of successful learners who advanced their careers with us.</p>
                <p className="font-semibold text-base md:text-lg text-gray-900 dark:text-white mb-6">Start your journey today</p>
                <button className="bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg mb-6 w-fit shadow-md hover:bg-primary/90 transition">GET STARTED →</button>
                <div className="flex flex-wrap gap-6 items-center mt-2">
                  <div className="flex items-center gap-1 text-yellow-500 text-lg font-bold"><span>★ 4.8</span><span className="text-green-600 text-base font-normal ml-1">Trustpilot</span></div>
                  <div className="flex items-center gap-1 text-yellow-500 text-lg font-bold"><span>★ 4.89</span><span className="text-green-600 text-base font-normal ml-1">Course Report</span></div>
                  <div className="flex items-center gap-1 text-yellow-500 text-lg font-bold"><span>★ 4.97</span><span className="text-red-500 text-base font-normal ml-1">switchup</span></div>
                  <div className="flex items-center gap-1 text-yellow-500 text-lg font-bold"><span>★ 4.7</span><span className="text-gray-600 dark:text-gray-300 text-base font-normal ml-1">Career Karma</span></div>
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center p-6 md:p-8">
                <div className="relative w-full h-64 md:h-96 lg:h-[420px] max-w-md mx-auto">
                  <Image src="/public/globe.svg" alt="Success" fill className="object-cover rounded-2xl shadow-lg" />
                </div>
              </div>
            </div>
          </SwiperSlide>
          {/* Gold Standard in Tech Certifications Slide */}
          <SwiperSlide>
            <div className="flex flex-col md:flex-row items-center min-h-[420px] md:min-h-[480px] lg:min-h-[540px] bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-center px-4 py-12 rounded-2xl">
              {/* Left Content */}
              <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left p-4 md:p-12">
                <Shield className="mx-auto md:mx-0 mb-6 h-16 w-16 text-primary" />
                <h2 className="text-3xl md:text-4xl font-bold mb-2">The Gold Standard in Tech Certifications</h2>
                <h3 className="text-xl md:text-2xl text-primary mb-6">Delivered in Partnership with NASSCOM&apos;s FutureSkills Prime</h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
                  As an officially recognized partner of NASSCOM&apos;s FutureSkills Prime, we are committed to building India&apos;s next generation of tech talent. Our programs are built upon the official joint framework of the Ministry of Electronics & IT (MeitY) and NASSCOM&apos;s Skill development initiative, <span className="font-bold text-primary dark:text-white">empowering</span> every participant with the elite, industry-validated skills needed to excel professionally.
                </p>
              </div>
              {/* Right Image */}
              <div className="flex-1 flex items-center justify-center p-6 md:p-8">
                <div className="relative w-full h-64 md:h-96 lg:h-[420px] max-w-md mx-auto">
                  <Image src="/globe.svg" alt="Tech Certification" fill className="object-contain rounded-2xl shadow-lg bg-white dark:bg-gray-900" />
                </div>
              </div>
            </div>
          </SwiperSlide>
          {/* Startup India Slide */}
          <SwiperSlide>
            <div className="flex flex-col md:flex-row items-center min-h-[420px] md:min-h-[480px] lg:min-h-[540px] bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-center px-4 py-12 rounded-2xl">
              {/* Left Content */}
              <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left p-4 md:p-12">
                <Award className="mx-auto md:mx-0 mb-6 h-16 w-16 text-primary" />
                <h2 className="text-3xl md:text-4xl font-bold mb-2">An Innovative Approach. Backed by Startup India.</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
                  Our commitment to revolutionizing education is officially recognized by the Government of India&apos;s Startup India initiative.
                </p>
              </div>
              {/* Right Image */}
              <div className="flex-1 flex items-center justify-center p-6 md:p-8">
                <div className="relative w-full h-64 md:h-96 lg:h-[420px] max-w-md mx-auto">
                  <Image src="/window.svg" alt="Startup India" fill className="object-contain rounded-2xl shadow-lg bg-white dark:bg-gray-900" />
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      {/* Remove the Logos Slider Section from here */}
      {/* End Logos Slider Section */}
      {/* Existing Hero Content (optional, can be removed if not needed) */}
      {/* <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20"> ... </div> */}
    </section>
  )
}