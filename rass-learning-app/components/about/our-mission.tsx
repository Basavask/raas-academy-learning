import { Target, Users, TrendingUp } from 'lucide-react'

const stats = [
  { value: '15,000+', label: 'Students Transformed' },
  { value: '85%', label: 'Placement Rate' },
  { value: '3.5L', label: 'Average Salary' },
  { value: '2,500+', label: 'Hiring Partners' },
]

export function OurMission() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              To democratize tech education and create a diverse talent pool that can contribute to 
              India&apos;s growing digital economy. We believe that talent is evenly distributed, but 
              opportunities are not - and we&apos;re here to bridge that gap.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Target className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Outcome-Focused</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Pay after placement model ensures our success is tied to yours
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Users className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Industry-Aligned</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Curriculum designed with top tech companies
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <TrendingUp className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Career Transformation</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    From any background to tech professional in months
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-orange-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}