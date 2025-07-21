import { Card } from '@/components/ui/card'
import { 
  Users, 
  Video, 
  FileText, 
  Code, 
  Trophy, 
  HeadphonesIcon,
  Briefcase,
  Calendar
} from 'lucide-react'

export function CourseHighlights() {
  const highlights = [
    {
      icon: Video,
      title: 'Live Sessions',
      description: 'Interactive live classes with industry experts'
    },
    {
      icon: Code,
      title: 'Hands-on Projects',
      description: 'Build 10+ real-world projects'
    },
    {
      icon: HeadphonesIcon,
      title: '24/7 Support',
      description: 'Get help whenever you need it'
    },
    {
      icon: Users,
      title: 'Peer Learning',
      description: 'Learn with a community of 1000+ students'
    },
    {
      icon: Trophy,
      title: 'Competitions',
      description: 'Participate in hackathons and challenges'
    },
    {
      icon: Briefcase,
      title: 'Job Assistance',
      description: 'Exclusive access to partner companies'
    },
    {
      icon: FileText,
      title: 'Resources',
      description: 'Comprehensive study materials and notes'
    },
    {
      icon: Calendar,
      title: 'Flexible Schedule',
      description: 'Learn at your own pace'
    }
  ]

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Course Highlights</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((highlight, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                <highlight.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{highlight.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {highlight.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}