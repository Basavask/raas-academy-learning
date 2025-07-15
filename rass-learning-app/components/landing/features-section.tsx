import { BookOpen, Users, Award, Clock, Globe, TrendingUp } from 'lucide-react'

const features = [
  {
    icon: BookOpen,
    title: "Quality Courses",
    description: "Learn from industry experts with our comprehensive course catalog"
  },
  {
    icon: Users,
    title: "Community Learning",
    description: "Join a vibrant community of learners and grow together"
  },
  {
    icon: Award,
    title: "Certificates",
    description: "Earn certificates upon successful completion of courses"
  },
  {
    icon: Clock,
    title: "Learn at Your Pace",
    description: "Access courses anytime, anywhere, at your convenience"
  },
  {
    icon: Globe,
    title: "Global Access",
    description: "Learn from anywhere in the world with internet connection"
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description: "Advance your career with in-demand skills and knowledge"
  }
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose RASS Learning?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We provide the best learning experience with cutting-edge features designed for your success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700"
            >
              <feature.icon className="h-12 w-12 text-primary-500 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}