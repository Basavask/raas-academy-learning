import Image from 'next/image'

export function DreamCompanies() {
  const companies = [
    { name: 'Google', logo: '/companies/google.png' },
    { name: 'Microsoft', logo: '/companies/microsoft.png' },
    { name: 'Amazon', logo: '/companies/amazon.png' },
    { name: 'Apple', logo: '/companies/apple.png' },
    { name: 'Meta', logo: '/companies/meta.png' },
    { name: 'Netflix', logo: '/companies/netflix.png' },
    { name: 'Adobe', logo: '/companies/adobe.png' },
    { name: 'Salesforce', logo: '/companies/salesforce.png' },
  ]

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-4">
          Dream Companies to Start Your Career With
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
          Our alumni work at top tech companies worldwide
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
          {companies.map((company, index) => (
            <div key={index} className="flex items-center justify-center">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center p-4">
                {company.logo ? (
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={60}
                    height={60}
                    className="object-contain filter grayscale hover:grayscale-0 transition-all"
                  />
                ) : (
                  <span className="text-sm font-semibold text-gray-400">
                    {company.name}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}