import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Corporate - RAAS Learning',
  description: 'Corporate training and development solutions from RAAS Learning',
}

export default function CorporatePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Corporate Training Solutions
        </h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            Transform your organization with our comprehensive corporate training programs designed to upskill your workforce and drive business growth.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Custom Training Programs
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Tailored training solutions designed specifically for your organization's needs and industry requirements.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Skill Development
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Comprehensive skill development programs to enhance your team's capabilities and productivity.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Certification Programs
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Industry-recognized certification programs to validate your team's expertise and knowledge.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Consulting Services
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Expert consulting services to help you identify training needs and implement effective learning strategies.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Ready to transform your organization? Contact us to learn more about our corporate training solutions.
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 