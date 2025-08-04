import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Corporate Solutions - RAAS Learning',
  description: 'Enterprise learning solutions and corporate training programs',
}

export default function CorporatePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Corporate Solutions</h1>
          <p className="text-xl opacity-90">
            Transform your organization with our enterprise learning solutions
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Custom Training Programs */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Custom Training Programs
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We&apos;ll design tailored learning experiences that align with your organization&apos;s specific needs and goals.
            </p>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• Industry-specific curriculum</li>
              <li>• Flexible delivery formats</li>
              <li>• Progress tracking & analytics</li>
            </ul>
          </div>

          {/* Team Upskilling */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Team Upskilling
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Empower your workforce with the latest skills and technologies to stay competitive in today&apos;s market.
            </p>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• Technical skill development</li>
              <li>• Leadership training</li>
              <li>• Certification programs</li>
            </ul>
          </div>

          {/* Learning Management */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Learning Management
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Comprehensive LMS solutions to manage, track, and optimize your organization&apos;s learning initiatives.
            </p>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• Centralized learning platform</li>
              <li>• Advanced reporting & insights</li>
              <li>• Integration capabilities</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 