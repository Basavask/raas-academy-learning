import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Universities - RAAS Learning',
  description: 'Academic partnerships and university programs from RAAS Learning',
}

export default function UniversitiesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          University Partnerships
        </h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            Partner with RAAS Learning to enhance your academic programs and provide students with industry-relevant skills and certifications.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Academic Partnerships
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Collaborate with universities to integrate industry-relevant training programs into academic curricula.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Student Programs
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Specialized training programs designed for university students to enhance their employability and career prospects.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Faculty Development
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Professional development programs for university faculty to stay updated with industry trends and technologies.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Research Collaboration
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Joint research initiatives and projects to advance knowledge in education technology and skill development.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Interested in partnering with us? Contact us to explore collaboration opportunities.
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Partner With Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 