import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Linkedin, Twitter, Globe } from 'lucide-react'

export function InstructorSection({ instructor }: { instructor: Instructor }) {
  if (!instructor) return null

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Meet Your Instructor</h2>
        
        <Card className="max-w-4xl mx-auto p-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-4">
                {instructor.profileImage ? (
                  <Image
                    src={instructor.profileImage}
                    alt={instructor.name}
                    fill
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-4xl font-bold text-gray-400">
                      {instructor.name?.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <h3 className="text-xl font-semibold mb-2">{instructor.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {instructor.title || 'Senior Instructor'}
              </p>
              <div className="flex justify-center gap-3">
                <a href="#" className="text-gray-600 hover:text-primary">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-primary">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-primary">
                  <Globe className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <h4 className="text-lg font-semibold mb-3">About</h4>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {instructor.bio || 'Experienced professional with years of industry experience and passion for teaching.'}
              </p>
              
              <h4 className="text-lg font-semibold mb-3">Experience</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• 10+ years in the industry</li>
                <li>• Trained 5000+ students</li>
                <li>• Worked with Fortune 500 companies</li>
                <li>• Published author and speaker</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}