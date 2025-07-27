"use client"

import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center overflow-hidden pt-2 pb-8 md:pt-3 md:pb-12" style={{ paddingLeft: '80px', paddingRight: '80px' }}>
      {/* Hero Slider */}
      <div className="relative w-full px-1 md:px-2 lg:px-3 z-10">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="rounded-xl shadow-lg bg-white/90 dark:bg-gray-900/90"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="flex flex-col md:flex-row items-center min-h-[260px] md:min-h-[320px] lg:min-h-[380px]">
              {/* Left Content */}
              <div className="flex-1 p-4 md:p-6 lg:p-8 flex flex-col justify-center">
                <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">Become the talent that every company wants to hire</h2>
                <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 mb-2">India&apos;s #1 Outcome-Focused Skill Development Initiative</p>
                <p className="font-semibold text-xs text-gray-900 dark:text-white mb-3">4/5 alumni landed their dream roles*</p>
                <button className="bg-primary text-white px-3 py-2 rounded-lg font-semibold text-xs md:text-sm mb-2 w-fit shadow-md hover:bg-primary/90 transition">EXPLORE PROGRAMS →</button>
                {/* Ratings */}
                <div className="flex flex-wrap gap-2 items-center mt-1">
                  <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold"><span>★ 4.8</span><span className="text-green-600 text-xs font-normal ml-1">Trustpilot</span></div>
                  <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold"><span>★ 4.89</span><span className="text-green-600 text-xs font-normal ml-1">Course Report</span></div>
                  <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold"><span>★ 4.97</span><span className="text-red-500 text-xs font-normal ml-1">switchup</span></div>
                  <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold"><span>★ 4.7</span><span className="text-gray-600 dark:text-gray-300 text-xs font-normal ml-1">Career Karma</span></div>
                </div>
              </div>
              {/* Right Image */}
              <div className="flex-1 flex items-center justify-center p-3 md:p-4">
                <div className="relative w-[180px] h-[120px] md:w-[240px] md:h-[160px] lg:w-[300px] lg:h-[200px] max-w-full mx-auto">
                  <Image src="/images/hero1.svg" alt="Professional" fill className="object-contain rounded-lg shadow-lg" />
                </div>
              </div>
            </div>
          </SwiperSlide>
          {/* Slide 2 */}
          <SwiperSlide>
            <div className="flex flex-col md:flex-row items-center min-h-[260px] md:min-h-[320px] lg:min-h-[380px]">
              <div className="flex-1 p-4 md:p-6 lg:p-8 flex flex-col justify-center">
                <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">The Gold Standard in Tech Certifications</h2>
                <p className="text-xs md:text-sm text-primary mb-2">Delivered in Partnership with NASSCOM&apos;s FutureSkills Prime</p>
                <p className="text-xs text-gray-700 dark:text-gray-300 mb-3">
                  As an officially recognized partner of NASSCOM&apos;s FutureSkills Prime, we are committed to building India&apos;s next generation of tech talent. Our programs are built upon the official joint framework of the Ministry of Electronics &amp; IT (MeitY) and NASSCOM&apos;s Skill development initiative, empowering every participant with the elite, industry-validated skills needed to excel professionally.
                </p>
                <button className="bg-primary text-white px-3 py-2 rounded-lg font-semibold text-xs md:text-sm mb-2 w-fit shadow-md hover:bg-primary/90 transition">LEARN MORE →</button>
              </div>
              <div className="flex-1 flex items-center justify-center p-3 md:p-4">
                <div className="relative w-[180px] h-[120px] md:w-[240px] md:h-[160px] lg:w-[300px] lg:h-[200px] max-w-full mx-auto">
                  <Image src="/images/hero1.svg" alt="Tech Certification" fill className="object-contain rounded-lg shadow-lg" />
                </div>
              </div>
            </div>
          </SwiperSlide>
          {/* Slide 3 */}
          <SwiperSlide>
            <div className="flex flex-col md:flex-row items-center min-h-[260px] md:min-h-[320px] lg:min-h-[380px]">
              <div className="flex-1 p-4 md:p-6 lg:p-8 flex flex-col justify-center">
                <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">An Innovative Approach. Backed by Startup India.</h2>
                <p className="text-xs text-gray-700 dark:text-gray-300 mb-3">
                  Our commitment to revolutionizing education is officially recognized by the Government of India&apos;s Startup India initiative.
                </p>
                <button className="bg-primary text-white px-3 py-2 rounded-lg font-semibold text-xs md:text-sm mb-2 w-fit shadow-md hover:bg-primary/90 transition">GET STARTED →</button>
              </div>
              <div className="flex-1 flex items-center justify-center p-3 md:p-4">
                <div className="relative w-[180px] h-[120px] md:w-[240px] md:h-[160px] lg:w-[300px] lg:h-[200px] max-w-full mx-auto">
                  <Image src="/images/hero1.svg" alt="Startup India" fill className="object-contain rounded-lg shadow-lg" />
                </div>
              </div>
            </div>
          </SwiperSlide>
          {/* Slide 4 */}
          <SwiperSlide>
            <div className="flex flex-col md:flex-row items-center min-h-[260px] md:min-h-[320px] lg:min-h-[380px]">
              <div className="flex-1 p-4 md:p-6 lg:p-8 flex flex-col justify-center">
                <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">Go Beyond Theory. Become Job-Ready.</h2>
                <p className="text-xs text-gray-700 dark:text-gray-300 mb-3">
                  Translate your knowledge into action: Successfully complete your training and the official FutureSkills Prime assessment to unlock exclusive virtual internships and real-world job simulations.
                </p>
                <button className="bg-primary text-white px-3 py-2 rounded-lg font-semibold text-xs md:text-sm mb-2 w-fit shadow-md hover:bg-primary/90 transition">BROWSE COURSES →</button>
              </div>
              <div className="flex-1 flex items-center justify-center p-3 md:p-4">
                <div className="relative w-[180px] h-[120px] md:w-[240px] md:h-[160px] lg:w-[300px] lg:h-[200px] max-w-full mx-auto">
                  <Image src="/images/hero1.svg" alt="Job Ready" fill className="object-contain rounded-lg shadow-lg" />
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
        
        {/* Custom Navigation Buttons - Clean circles with proper positioning */}
        <button className="swiper-button-prev absolute -left-1 md:-left-1 lg:-left-1 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 border border-gray-200 dark:border-gray-600">
          <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button className="swiper-button-next absolute -right-1 md:-right-1 lg:-right-1 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 border border-gray-200 dark:border-gray-600">
          <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  )
}