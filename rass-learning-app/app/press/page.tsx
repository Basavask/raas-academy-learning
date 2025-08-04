"use client"

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink, Calendar, Newspaper } from 'lucide-react'
import Image from 'next/image'

const pressArticles = [
  {
    id: '1',
    title: 'RAAS Learning Launches Advanced Tech Certification Program',
    excerpt: 'Staying true to its commitment to upskilling recent graduates and working professionals, RAAS Learning, India\'s fastest-growing edtech platform, has launched an advanced certification program in collaboration with leading industry partners.',
    content: 'The program aims to bridge the gap between academic learning and industry requirements, providing students with hands-on experience and real-world project exposure. With the rapid evolution of technology, there is an increasing demand for skilled professionals who can adapt to changing industry needs.',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    logoUrl: 'https://via.placeholder.com/120x40/DC2626/FFFFFF?text=INDIA+TODAY',
    publication: 'India Today',
    link: '#',
    date: '2024-01-15',
    author: 'Technology Desk'
  },
  {
    id: '2',
    title: 'IIT Collaboration Brings Industry-Ready Skills to Students',
    excerpt: 'NEW DELHI: The Indian Institute of Technology (IIT) Roorkee in collaboration with RAAS Learning has launched a comprehensive certification program designed to equip students with industry-ready skills.',
    content: 'This partnership represents a significant step forward in integrating academic excellence with practical industry experience. The program includes specialized modules in emerging technologies, mentorship from industry experts, and guaranteed placement assistance.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    logoUrl: 'https://via.placeholder.com/120x40/DC2626/FFFFFF?text=CAREERS+360',
    publication: 'Careers 360',
    link: '#',
    date: '2024-01-10',
    author: 'Education Bureau'
  },
  {
    id: '3',
    title: 'Digital Transformation Drives Demand for Tech Skills',
    excerpt: 'The global pandemic, one of the most unprecedented events in recent history, created widespread disruption for businesses worldwide, accelerating the need for digital transformation.',
    content: 'As organizations rapidly adopted digital technologies, the demand for skilled professionals in areas like data science, artificial intelligence, and cloud computing has surged. RAAS Learning has positioned itself as a key player in addressing this skills gap.',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    logoUrl: 'https://via.placeholder.com/120x40/DC2626/FFFFFF?text=TOI',
    publication: 'Times of India',
    link: '#',
    date: '2024-01-08',
    author: 'Business Desk'
  },
  {
    id: '4',
    title: 'Advanced Certification Program Launches 4th Batch',
    excerpt: 'IIT Roorkee in partnership with RAAS Learning launches the 4th batch of the advanced certification programme in collaboration with industry leaders.',
    content: 'The success of the previous three batches has demonstrated the effectiveness of this industry-academia partnership. Students from previous batches have achieved an impressive 95% placement rate with average salary packages exceeding industry standards.',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    logoUrl: 'https://via.placeholder.com/120x40/000000/FFFFFF?text=INDIAN+EXPRESS',
    publication: 'The Indian Express',
    link: '#',
    date: '2024-01-05',
    author: 'Education Correspondent'
  },
  {
    id: '5',
    title: 'EdTech Revolution: RAAS Learning\'s Impact on Skill Development',
    excerpt: 'As the demand for digital skills continues to grow, RAAS Learning has emerged as a key player in transforming India\'s education landscape.',
    content: 'The platform\'s innovative approach to learning, combining theoretical knowledge with practical application, has set new standards in the edtech industry. Their focus on outcome-based learning ensures that students are not just educated but employable.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    logoUrl: 'https://via.placeholder.com/120x40/1E40AF/FFFFFF?text=ECONOMIC+TIMES',
    publication: 'Economic Times',
    link: '#',
    date: '2024-01-03',
    author: 'Technology Editor'
  },
  {
    id: '6',
    title: 'Future of Work: Upskilling in the Digital Age',
    excerpt: 'With automation and AI reshaping industries, professionals are turning to platforms like RAAS Learning to acquire future-ready skills.',
    content: 'The future of work is being redefined by technological advancements. Professionals across industries are recognizing the need to continuously upskill to remain relevant in an increasingly competitive job market.',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    logoUrl: 'https://via.placeholder.com/120x40/059669/FFFFFF?text=HINDUSTAN+TIMES',
    publication: 'Hindustan Times',
    link: '#',
    date: '2024-01-01',
    author: 'Career Desk'
  }
]

export default function PressPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Press Coverage
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Stay updated with the latest news, announcements, and media coverage about RAAS Learning and our impact on education
            </p>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8">
          {pressArticles.map((article) => (
            <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative h-64 md:h-full">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <CardContent className="p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    {/* Publication Info */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-24 h-8 relative">
                        <Image
                          src={article.logoUrl}
                          alt={article.publication}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(article.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                    </div>

                    {/* Article Title */}
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {article.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                      {article.excerpt}
                    </p>

                    {/* Full Content */}
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {article.content}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Newspaper className="h-4 w-4" />
                      <span>By {article.author}</span>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => window.open(article.link, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Read Full Article
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Stay Updated
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive the latest press releases, announcements, and updates about RAAS Learning
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Subscribe to Newsletter
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 