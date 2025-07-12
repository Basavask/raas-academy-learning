import { Heart, Lightbulb, Shield, Zap } from 'lucide-react'

const values = [
  {
    icon: Heart,
    title: 'Student First',
    description: 'Every decision we make prioritizes student success and career outcomes'
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Constantly evolving our teaching methods and curriculum to stay ahead'
  },
  {
    icon: Shield,
    title: 'Integrity',
    description: 'Transparent in our processes, honest in our commitments'
  },
  {
    icon: Zap,
    title: 'Impact',
    description: 'Measuring success by the lives transformed and careers launched'
  }
]

export function OurValues() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Core Values
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <value.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {value.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}