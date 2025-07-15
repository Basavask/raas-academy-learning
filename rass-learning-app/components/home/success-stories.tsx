"use client"

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

const stories = [
  {
    id: 1,
    name: "Mayuri Samanta",
    role: "Fresher to SDE1 at LogWinTech Pvt. Ltd.",
    story: "Mayuri comes from Navsari, near Surat in Gujarat. As a child, she showed promise and attended an English medium school, where she consistently ranked among the top students. After scoring exceptionally well in her 12th-grade exams, Mayuri received widespread recognition in her district, with her achievements featured in local newspapers. She chose to pursue commerce after high school. To support her family, she provided tuition to neighbourhood kids while also aspiring to become a Chartered Accountant. Unfortunately, her dream of becoming a CA didn't materialize despite several attempts at the exams.",
    image: "/testimonials/mayuri.jpg"
  },
  {
    id: 2,
    name: "Rohit Kumar",
    role: "Support Executive to Data Analyst at TechCorp",
    story: "Coming from a small town in Bihar, Rohit always dreamed of working in tech but lacked the resources and guidance. After completing his graduation in commerce, he worked as a customer support executive for 2 years. Despite working full-time, he dedicated his nights to learning Python, SQL, and data visualization. His dedication paid off when he secured a role as a Data Analyst with a 150% salary hike. Today, he mentors other students from similar backgrounds, helping them transition into tech careers.",
    image: "/testimonials/rohit.jpg"
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Teacher to Full Stack Developer at StartupX",
    story: "Priya spent 5 years teaching mathematics at a government school in Rajasthan. While she loved teaching, the limited growth opportunities and low salary made her reconsider her career. During the pandemic, she started learning web development through online resources. The structured curriculum at RASS Learning helped her master React, Node.js, and modern web technologies. Within 8 months, she built a portfolio of projects and landed her first tech job. The transition wasn't easy - she faced self-doubt and imposter syndrome, but the supportive community kept her motivated. Now she earns 3x her teaching salary and works on exciting projects.",
    image: "/testimonials/priya.jpg"
  },
  {
    id: 4,
    name: "Akash Patel",
    role: "Delivery Boy to Software Engineer at InfoTech Solutions",
    story: "Akash's journey is nothing short of inspirational. After dropping out of college due to financial constraints, he worked as a food delivery boy in Mumbai to support his family. During his delivery runs, he would listen to programming tutorials on YouTube. A chance encounter with a customer who worked in IT changed his life - they encouraged him to pursue formal training. He enrolled in RASS Learning's web development program, studying late into the night after his shifts. His first project, a delivery optimization app, caught the attention of recruiters. Today, he works as a Software Engineer and has brought his entire family to Mumbai, fulfilling his dream of giving them a better life.",
    image: "/testimonials/akash.jpg"
  },
  {
    id: 5,
    name: "Sneha Reddy",
    role: "HR Executive to Product Manager at FinTech Innovations",
    story: "With 3 years of experience in HR, Sneha felt unfulfilled and wanted to transition into a more strategic role. She was fascinated by how products were built and decided to learn product management. The journey was challenging - learning about user research, analytics, and technical concepts while working full-time. RASS Learning's mentorship program connected her with experienced PMs who guided her transition. She started by taking on small product-related projects in her company, then moved to a Product Analyst role, and finally became a Product Manager. Her HR background actually became her strength, helping her understand user psychology better. She now leads a team building financial products that impact millions.",
    image: "/testimonials/sneha.jpg"
  }
]

export function SuccessStories() {
  const [currentStory, setCurrentStory] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const handlePrevious = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentStory((prev) => (prev === 0 ? stories.length - 1 : prev - 1))
      setIsAnimating(false)
    }, 300)
  }

  const handleNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentStory((prev) => (prev === stories.length - 1 ? 0 : prev + 1))
      setIsAnimating(false)
    }, 300)
  }

  const goToStory = (index: number) => {
    if (isAnimating || index === currentStory) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentStory(index)
      setIsAnimating(false)
    }, 300)
  }

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-pink-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Shaping Success Stories Since 2019
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400">
            Your Goal. Our Mission
          </p>
        </div>

        {/* Story Card */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Pink border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-200 to-pink-300 dark:from-pink-800 dark:to-pink-900 rounded-3xl transform rotate-1"></div>
            
            {/* Main card */}
            <Card className={`relative bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-10 lg:p-12 shadow-xl transition-all duration-300 ${
              isAnimating ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'
            }`}>
              {/* Quote marks */}
              <div className="absolute top-6 left-6 md:top-10 md:left-10 text-6xl md:text-8xl text-gray-200 dark:text-gray-700 font-serif">
                "
              </div>

              {/* Story content */}
              <div className="relative z-10">
                <div className="mb-8">
                  <p className="text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300 italic">
                    {stories[currentStory].story}
                  </p>
                </div>

                {/* Author info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-pink-400 to-red-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg md:text-xl">
                      {stories[currentStory].name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg md:text-xl text-gray-900 dark:text-white">
                      {stories[currentStory].name}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                      {stories[currentStory].role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quote end mark */}
              <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 text-6xl md:text-8xl text-gray-200 dark:text-gray-700 font-serif transform rotate-180">
                "
              </div>
            </Card>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            {/* Previous button */}
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevious}
              className="rounded-full border-2 border-pink-300 hover:border-pink-400 hover:bg-pink-50 dark:border-pink-700 dark:hover:border-pink-600 dark:hover:bg-pink-900/20"
              disabled={isAnimating}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            {/* Dots indicator */}
            <div className="flex items-center gap-2 px-4">
              {stories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToStory(index)}
                  className={`transition-all duration-300 ${
                    index === currentStory
                      ? 'w-2 h-2 md:w-3 md:h-3 bg-pink-500 dark:bg-pink-400'
                      : 'w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  } rounded-full`}
                  disabled={isAnimating}
                />
              ))}
            </div>

            {/* Next button */}
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              className="rounded-full border-2 border-pink-300 hover:border-pink-400 hover:bg-pink-50 dark:border-pink-700 dark:hover:border-pink-600 dark:hover:bg-pink-900/20"
              disabled={isAnimating}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}