"use client"

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { ChevronDown, ChevronUp } from 'lucide-react'

export function FAQSection({ courseId }: { courseId: string }) {
  const [faqs, setFaqs] = useState<{ id: number; question: string; answer: string }[]>([])
  const [expandedItems, setExpandedItems] = useState<number[]>([])

  useEffect(() => {
    // Fetch FAQs from API
    fetchFAQs()
  }, [courseId])

  const fetchFAQs = async () => {
    try {
      const response = await fetch(`/api/courses/${courseId}/faqs`)
      const data: { id: number; question: string; answer: string }[] = await response.json()
      setFaqs(data)
    } catch (error) {
      console.error('Failed to fetch FAQs:', error)
    }
  }

  // Mock data
  const mockFAQs = [
    {
      id: 1,
      question: 'Do I need prior experience to join this course?',
      answer: 'No, this course is designed for beginners. We start from the basics and gradually move to advanced topics.'
    },
    {
      id: 2,
      question: 'What kind of support will I get during the course?',
      answer: 'You get 24/7 doubt resolution, weekly 1-on-1 mentorship sessions, and access to our community forum.'
    },
    {
      id: 3,
      question: 'Will I get a certificate after completion?',
      answer: 'Yes, you will receive an industry-recognized certificate upon successful completion of the course and projects.'
    },
    {
      id: 4,
      question: 'Is there a refund policy?',
      answer: 'Yes, we offer a 7-day money-back guarantee if you are not satisfied with the course.'
    },
    {
      id: 5,
      question: 'Can I pay in installments?',
      answer: 'Yes, we offer flexible payment options including EMI. Contact our support team for more details.'
    }
  ]

  const displayFAQs = faqs.length > 0 ? faqs : mockFAQs

  const toggleFAQ = (id: number) => {
    setExpandedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {displayFAQs.map((faq: { id: number; question: string; answer: string }) => (
            <Card key={faq.id} className="overflow-hidden">
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <h3 className="text-left font-medium">{faq.question}</h3>
                {expandedItems.includes(faq.id) ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              
              {expandedItems.includes(faq.id) && (
                <div className="px-6 pb-4 border-t">
                  <p className="text-gray-600 dark:text-gray-400 pt-4">
                    {faq.answer}
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}