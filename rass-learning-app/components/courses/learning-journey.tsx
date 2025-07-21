import { Card } from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'

export function LearningJourney({ course }: { course: any }) {
  const journey = [
    {
      week: 'Week 1-2',
      title: 'Foundation',
      description: 'Learn the fundamentals and core concepts',
      topics: ['Basic concepts', 'Environment setup', 'First project']
    },
    {
      week: 'Week 3-4',
      title: 'Deep Dive',
      description: 'Advanced topics and real-world applications',
      topics: ['Advanced features', 'Best practices', 'Complex projects']
    },
    {
      week: 'Week 5-6',
      title: 'Specialization',
      description: 'Choose your path and build expertise',
      topics: ['Specialized tracks', 'Industry projects', 'Portfolio building']
    },
    {
      week: 'Week 7-8',
      title: 'Mastery',
      description: 'Polish your skills and prepare for the industry',
      topics: ['Interview prep', 'Final project', 'Certification']
    }
  ]

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Your Learning Journey</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {journey.map((phase, index) => (
            <Card key={index} className="p-6 relative">
              {index < journey.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-primary"></div>
              )}
              <div className="text-sm font-semibold text-primary mb-2">{phase.week}</div>
              <h3 className="text-xl font-semibold mb-2">{phase.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{phase.description}</p>
              <ul className="space-y-2">
                {phase.topics.map((topic, topicIndex) => (
                  <li key={topicIndex} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}