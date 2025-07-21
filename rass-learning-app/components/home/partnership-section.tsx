import Image from 'next/image'
import { Shield, Award } from 'lucide-react'

export function PartnershipSection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* NASSCOM Partnership */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Shield className="h-16 w-16 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            The Gold Standard in Tech Certifications
          </h2>
          <h3 className="text-xl md:text-2xl text-primary mb-8">
            Delivered in Partnership with NASSCOM's FutureSkills Prime
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
            As an officially recognized partner of NASSCOM's FutureSkills Prime, 
            we are committed to building India's next generation of tech talent. 
            Our programs are built upon the official joint framework of the Ministry 
            of Electronics & IT (MeitY) and NASSCOM's Skill development initiative, 
            <strong> empowering</strong> every participant with the elite, industry-validated 
            skills needed to excel professionally.
          </p>
        </div>

        {/* Startup India Recognition */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Award className="h-16 w-16 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            An Innovative Approach. Backed by Startup India.
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
            Our commitment to revolutionizing education is officially recognized 
            by the Government of India's Startup India initiative.
          </p>
        </div>
      </div>
    </section>
  )
}