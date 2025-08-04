"use client"

import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export function HeroSection() {
  return (
    <section className="relative bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden pt-2 pb-8 md:pt-3 md:pb-12" style={{ paddingLeft: '20px', paddingRight: '20px' }}>
      {/* Hero Slider */}
      <div className="relative w-full max-w-6xl z-10">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          autoplay={{ delay: 10000, disableOnInteraction: false }}
          className="rounded-xl shadow-lg bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
        >
          {/* Slide 1 - Blue/Purple Theme */}
          <SwiperSlide>
            <div className="flex flex-col md:flex-row items-center min-h-[450px] md:min-h-[420px] lg:min-h-[450px] bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950/20 dark:via-gray-900 dark:to-purple-950/20">
              {/* Left Content */}
              <div className="flex-1 p-4 md:p-6 lg:p-8 flex flex-col justify-center">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3 leading-tight font-sans">Become the talent that every company wants to hire</h2>
                <p className="text-sm md:text-base text-blue-600 dark:text-blue-400 mb-3 font-medium">India&apos;s #1 Outcome-Focused Skill Development Initiative</p>
                <p className="font-semibold text-sm text-purple-600 dark:text-purple-400 mb-4">4/5 alumni landed their dream roles*</p>
                <div className="flex justify-center md:justify-start mb-4">
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold text-sm md:text-base shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">EXPLORE PROGRAMS →</button>
                </div>
                {/* Ratings */}
                <div className="flex flex-wrap gap-3 items-center justify-center md:justify-start">
                  <div className="flex items-center gap-1 text-yellow-500 text-sm font-bold"><span>★ 4.8</span><span className="text-green-600 text-sm font-normal ml-1">Trustpilot</span></div>
                  <div className="flex items-center gap-1 text-yellow-500 text-sm font-bold"><span>★ 4.89</span><span className="text-green-600 text-sm font-normal ml-1">Course Report</span></div>
                  <div className="flex items-center gap-1 text-yellow-500 text-sm font-bold"><span>★ 4.97</span><span className="text-red-500 text-sm font-normal ml-1">switchup</span></div>
                  <div className="flex items-center gap-1 text-yellow-500 text-sm font-bold"><span>★ 4.7</span><span className="text-gray-600 dark:text-gray-300 text-sm font-normal ml-1">Career Karma</span></div>
                </div>
              </div>
              {/* Right Image - Full size */}
              <div className="flex-1 flex items-center justify-center p-4 md:p-6 min-h-[300px] md:min-h-[400px]">
                <Image
                  src="/images/hero1.svg"
                  alt="Professional"
                  className="w-full h-full max-w-[400px] max-h-[300px] object-contain"
                  width={400}
                  height={300}
                />
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 - NASSCOM Partnership (Reference Design) */}
          <SwiperSlide>
            <div className="flex flex-col md:flex-row items-center min-h-[450px] md:min-h-[420px] lg:min-h-[450px] bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-green-950/20 dark:via-gray-900 dark:to-green-950/20">
              {/* Left Content - Takes up half the space */}
              <div className="w-full md:w-1/2 p-4 md:p-6 lg:p-8 flex flex-col justify-center">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3 leading-tight font-sans">The Gold Standard in Tech Certifications</h2>
                <p className="text-sm md:text-base text-green-600 dark:text-green-400 mb-3 font-medium">Delivered in Partnership with NASSCOM&apos;s FutureSkills Prime</p>
                <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4">
                  As an officially recognized partner of NASSCOM&apos;s FutureSkills Prime, we are committed to building India&apos;s next generation of tech talent. Our programs are built upon the official joint framework of the Ministry of Electronics &amp; IT (MeitY) and NASSCOM&apos;s Skill development initiative, empowering every participant with the elite, industry-validated skills needed to excel professionally.
                </p>
                <div className="flex justify-center md:justify-start mb-4">
                  <button className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg font-semibold text-sm md:text-base shadow-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105">LEARN MORE →</button>
                </div>
              </div>
              {/* Right Image - Takes up the other half and extends to edge */}
              <div className="flex-1 flex items-center justify-center p-4 md:p-6 min-h-[300px] md:min-h-[400px]">
                <Image
                  src="/images/hero1.svg"
                  alt="Professional"
                  className="w-full h-full max-w-[400px] max-h-[300px] object-contain"
                  width={400}
                  height={300}
                />
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 - Orange/Red Theme */}
          <SwiperSlide>
            <div className="flex flex-col md:flex-row items-center min-h-[450px] md:min-h-[420px] lg:min-h-[450px] bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-orange-950/20 dark:via-gray-900 dark:to-red-950/20">
              <div className="flex-1 p-4 md:p-6 lg:p-8 flex flex-col justify-center">
                {/* DPIIT Logo - Moved to the very beginning */}
                <div className="mb-4 flex justify-center md:justify-start">
                  <Image src="/images/DPIIT_start.jpg" alt="DPIIT Startup India" width={120} height={80} className="dpiit-logo rounded-lg shadow-md" />
                </div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3 leading-tight font-sans">An Innovative Approach. Backed by Startup India.</h2>
                <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4">
                  Our commitment to revolutionizing education is officially recognized by the Government of India&apos;s Startup India initiative.
                </p>
                <div className="flex justify-center md:justify-start mb-4">
                  <button className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-lg font-semibold text-sm md:text-base shadow-lg hover:from-orange-700 hover:to-red-700 transition-all duration-300 transform hover:scale-105">GET STARTED →</button>
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center p-4 md:p-6 min-h-[300px] md:min-h-[400px]">
                <Image
                  src="/images/hero_startupindia_website.svg"
                  alt="Startup India"
                  className="w-full h-full max-w-[400px] max-h-[300px] object-contain"
                  width={400}
                  height={300}
                />
              </div>
            </div>
          </SwiperSlide>
          

          {/* Slide 4 - Indigo/Purple Theme */}
          <SwiperSlide>
            <div className="flex flex-col md:flex-row items-center min-h-[450px] md:min-h-[420px] lg:min-h-[450px] bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-indigo-950/20 dark:via-gray-900 dark:to-purple-950/20">
              <div className="flex-1 p-4 md:p-6 lg:p-8 flex flex-col justify-center">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3 leading-tight font-sans">Go Beyond Theory. Become Job-Ready.</h2>
                <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4">
                  Translate your knowledge into action: Successfully complete your training and the official FutureSkills Prime assessment to unlock exclusive virtual internships and real-world job simulations.
                </p>
                <div className="flex justify-center md:justify-start mb-4">
                  <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold text-sm md:text-base shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">BROWSE COURSES →</button>
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center p-4 md:p-6 min-h-[300px] md:min-h-[400px]">
                <Image
                  src="/images/hero1.svg"
                  alt="Job Ready"
                  className="w-full h-full max-w-[400px] max-h-[300px] object-contain"
                  width={400}
                  height={300}
                />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  )
}