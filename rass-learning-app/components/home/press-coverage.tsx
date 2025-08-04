"use client"

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import Image from 'next/image'

interface PressItem {
  id: string
  title: string
  excerpt: string
  imageUrl: string
  logoUrl: string
  publication: string
  link: string
  date: string
}

const pressItems: PressItem[] = [
  {
    id: '1',
    title: 'RAAS Learning Launches Advanced Tech Certification Program',
    excerpt: 'Staying true to its commitment to upskilling recent graduates and working professionals, RAAS Learning, India\'s fastest-growing edtech platform, has launched...',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80',
    logoUrl: 'https://via.placeholder.com/120x40/DC2626/FFFFFF?text=INDIA+TODAY',
    publication: 'India Today',
    link: '#',
    date: '2024-01-15'
  },
  {
    id: '2',
    title: 'IIT Collaboration Brings Industry-Ready Skills to Students',
    excerpt: 'NEW DELHI: The Indian Institute of Technology (IIT) Roorkee in collaboration with RAAS Learning has launched a comprehensive certification program...',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80',
    logoUrl: 'https://via.placeholder.com/120x40/DC2626/FFFFFF?text=CAREERS+360',
    publication: 'Careers 360',
    link: '#',
    date: '2024-01-10'
  },
  {
    id: '3',
    title: 'Digital Transformation Drives Demand for Tech Skills',
    excerpt: 'The global pandemic, one of the most unprecedented events in recent history, created widespread disruption for businesses worldwide...',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80',
    logoUrl: 'https://via.placeholder.com/120x40/DC2626/FFFFFF?text=TOI',
    publication: 'Times of India',
    link: '#',
    date: '2024-01-08'
  },
  {
    id: '4',
    title: 'Advanced Certification Program Launches 4th Batch',
    excerpt: 'IIT Roorkee in partnership with RAAS Learning launches the 4th batch of the advanced certification programme in collaboration with industry leaders...',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80',
    logoUrl: 'https://via.placeholder.com/120x40/000000/FFFFFF?text=INDIAN+EXPRESS',
    publication: 'The Indian Express',
    link: '#',
    date: '2024-01-05'
  },
  {
    id: '5',
    title: "EdTech Revolution: RAAS Learning's Impact on Skill Development",
    excerpt: 'As the demand for digital skills continues to grow, RAAS Learning has emerged as a key player in transforming India\'s education landscape...',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80',
    logoUrl: 'https://via.placeholder.com/120x40/1E40AF/FFFFFF?text=ECONOMIC+TIMES',
    publication: 'Economic Times',
    link: '#',
    date: '2024-01-03'
  },
  {
    id: '6',
    title: 'Future of Work: Upskilling in the Digital Age',
    excerpt: 'With automation and AI reshaping industries, professionals are turning to platforms like RAAS Learning to acquire future-ready skills...',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80',
    logoUrl: 'https://via.placeholder.com/120x40/059669/FFFFFF?text=HINDUSTAN+TIMES',
    publication: 'Hindustan Times',
    link: '#',
    date: '2024-01-01'
  }
]

export function PressCoverage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const itemsPerSlide = 4
  const totalSlides = Math.ceil(pressItems.length / itemsPerSlide)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex)
  }

  const getVisibleItems = () => {
    const startIndex = currentSlide * itemsPerSlide
    return pressItems.slice(startIndex, startIndex + itemsPerSlide)
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Press Coverage
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            See what leading publications are saying about RAAS Learning and our impact on education
          </p>
        </div>

        {/* Press Coverage Carousel */}
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-600"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-600"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </button>

          {/* Cards Container */}
          <div className="px-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {getVisibleItems().map((item) => (
                <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                  </div>

                  <CardContent className="p-4">
                    {/* Publication Logo */}
                    <div className="mb-3">
                      <div className="w-24 h-8 relative">
                        <Image
                          src={item.logoUrl}
                          alt={item.publication}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-2 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-xs line-clamp-3 mb-3">
                        {item.excerpt}
                      </p>
                      
                      {/* Date and Read More */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(item.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs p-1 h-auto"
                          onClick={() => window.open(item.link, '_blank')}
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Read
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide
                    ? 'bg-primary'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
            onClick={() => window.open('/press', '_blank')}
          >
            Read More
          </Button>
        </div>
      </div>
    </section>
  )
} 