"use client"

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Star, Quote } from 'lucide-react'
import { Review } from '@/types/review'

export function AlumniSpeaks({ courseId }: { courseId: string }) {
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    // Fetch reviews from API
    fetchReviews()
  }, [courseId])

  const fetchReviews = async () => {
    try {
      const response = await fetch(`/api/courses/${courseId}/reviews`)
      const data: Review[] = await response.json()
      setReviews(data)
    } catch (error) {
      console.error('Failed to fetch reviews:', error)
    }
  }

  // Mock data for now
  const mockReviews: Review[] = [
    {
      id: 1,
      user: {
        name: 'Rahul Sharma',
        profileImage: null,
        company: 'Microsoft'
      },
      rating: 5,
      comment: 'This course transformed my career. The practical approach and industry-relevant projects helped me land my dream job.',
      createdAt: new Date('2024-01-15')
    },
    {
      id: 2,
      user: {
        name: 'Priya Patel',
        profileImage: null,
        company: 'Amazon'
      },
      rating: 5,
      comment: 'Best investment I made in my career. The mentorship and support system is unmatched.',
      createdAt: new Date('2024-02-20')
    },
    {
      id: 3,
      user: {
        name: 'Amit Kumar',
        profileImage: null,
        company: 'Google'
      },
      rating: 5,
      comment: 'The curriculum is comprehensive and up-to-date. Loved the hands-on projects!',
      createdAt: new Date('2024-03-10')
    }
  ]

  const displayReviews = reviews.length > 0 ? reviews : mockReviews

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Alumni Speaks</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {displayReviews.map((review: Review) => (
            <Card key={review.id} className="p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <Quote className="h-8 w-8 text-gray-300 mb-2" />
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {review.comment}
              </p>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="font-semibold text-gray-600 dark:text-gray-400">
                    {review.user.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold">{review.user.name}</p>
                  <p className="text-sm text-gray-500">{review.user.company}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}