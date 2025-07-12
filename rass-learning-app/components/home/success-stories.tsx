"use client"

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const stories = [
  {
    id: 1,
    name: "Mayuri Samanta",
    role: "Fresher to SDE1 at LogWinTech Pvt. Ltd.",
    story: "Mayuri comes from Navsari, near Surat in Gujarat. As a child, she showed promise and attended an English medium school, where she consistently ranked among the top students. After scoring exceptionally well in her 12th-grade exams, Mayuri received widespread recognition in her district, with her achievements featured in local newspapers. She chose to pursue commerce after high school. To support her family, she provided tuition to neighbourhood kids while also aspiring to become a Chartered Accountant. Unfortunately, her dream of becoming a CA didn't materialize despite several attempts at the exams. Facing pressure to marry, Mayuri felt trapped and kept her desire for a different career path hidden. To delay marriage, she pretended to have completed a course in banking and government exams, all while feeling trapped and desperate for a way out.",
    image: "/testimonials/mayuri.jpg"
  },
  // Add more stories as needed
]

export function SuccessStories() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Shaping Success Stories Since 2019
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Your Goal. Our Mission
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {stories.map((story) => (
            <Card key={story.id} className="overflow-hidden">
              <CardContent className="p-8">
                <blockquote className="text-lg leading-relaxed mb-6 text-gray-700 dark:text-gray-300">
                  <span className="text-4xl text-primary-500 opacity-50">"</span>
                  {story.story}
                  <span className="text-4xl text-primary-500 opacity-50">"</span>
                </blockquote>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-lg">{story.name}</h4>
                    <p className="text-gray-600 dark:text-gray-400">{story.role}</p>
                  </div>
                  <Button variant="ghost" asChild>
                    <Link href="/success-stories">
                      Read More Stories
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}