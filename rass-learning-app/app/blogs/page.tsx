import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blogs - RAAS Learning',
  description: 'Latest insights, tips, and updates from RAAS Learning',
}

export default function BlogsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Latest Insights & Updates
        </h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            Stay updated with the latest trends in education, technology, and career development through our expert insights and industry analysis.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Coming Soon</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Industry Trends
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Analysis of current industry trends and their impact on education and career development.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Coming Soon</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Career Tips
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Practical advice and tips for career growth, skill development, and professional success.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Coming Soon</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Technology Insights
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Latest developments in technology and their implications for education and training.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Coming Soon</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Success Stories
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Inspiring stories from our alumni and their journey to professional success.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Subscribe to our newsletter to stay updated with the latest insights and updates.
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Subscribe Now
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 