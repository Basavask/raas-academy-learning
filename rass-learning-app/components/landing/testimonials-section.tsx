"use client"

import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'
import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Web Developer",
    content: "RAAS Learning transformed my career. The courses are well-structured and the instructors are amazing!",
    rating: 5,
    image: "https://ui-avatars.com/api/?name=Priya+Sharma&background=4f46e5&color=fff"
  },
  {
    id: 2,
    name: "Rahul Verma",
    role: "Data Analyst",
    content: "The Data Science course helped me land my dream job. Highly recommend RAAS Learning!",
    rating: 5,
    image: "https://ui-avatars.com/api/?name=Rahul+Verma&background=10b981&color=fff"
  },
  {
    id: 3,
    name: "Anita Desai",
    role: "Digital Marketer",
    content: "Excellent platform with great support. The community is very helpful and engaging.",
    rating: 5,
    image: "https://ui-avatars.com/api/?name=Anita+Desai&background=f59e0b&color=fff"
  },
  {
    id: 4,
    name: "Vikram Singh",
    role: "Full Stack Developer",
    content: "The hands-on projects and real-world applications made all the difference in my learning journey.",
    rating: 5,
    image: "https://ui-avatars.com/api/?name=Vikram+Singh&background=dc2626&color=fff"
  },
  {
    id: 5,
    name: "Meera Patel",
    role: "UX Designer",
    content: "RAAS Learning's industry-focused curriculum helped me transition into tech successfully.",
    rating: 5,
    image: "https://ui-avatars.com/api/?name=Meera+Patel&background=7c3aed&color=fff"
  },
  {
    id: 6,
    name: "Arjun Kumar",
    role: "DevOps Engineer",
    content: "The mentorship and career guidance provided by RAAS Learning were invaluable to my success.",
    rating: 5,
    image: "https://ui-avatars.com/api/?name=Arjun+Kumar&background=059669&color=fff"
  }
]

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Success Stories
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Hear from our students who have transformed their careers
          </p>
        </div>

        {/* Auto-sliding Testimonials Carousel */}
        <div className="max-w-6xl mx-auto">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            pagination={{ 
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{ 
              delay: 10000, 
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            loop={true}
            className="testimonials-swiper"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 italic flex-grow">
                      &quot;{testimonial.content}&quot;
                    </p>
                    <div className="flex items-center gap-3 mt-auto">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}