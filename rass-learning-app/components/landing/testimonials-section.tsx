import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'
import Image from 'next/image'

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Web Developer",
    content: "RASS Learning transformed my career. The courses are well-structured and the instructors are amazing!",
    rating: 5,
    image: "https://ui-avatars.com/api/?name=Priya+Sharma&background=4f46e5&color=fff"
  },
  {
    id: 2,
    name: "Rahul Verma",
    role: "Data Analyst",
    content: "The Data Science course helped me land my dream job. Highly recommend RASS Learning!",
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6 italic">
                  &quot;{testimonial.content}&quot;
                </p>
                <div className="flex items-center gap-3">
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
          ))}
        </div>
      </div>
    </section>
  )
}