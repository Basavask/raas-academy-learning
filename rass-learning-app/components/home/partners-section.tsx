const partners = [
  { name: 'IIT Delhi', logo: '/partners/iit-delhi.png' },
  { name: 'IIM Mumbai', logo: '/partners/iim-mumbai.png' },
  { name: 'IIM Sirmaur', logo: '/partners/iim-sirmaur.png' },
  { name: 'TiHAN IIT Hyderabad', logo: '/partners/tihan.png' },
  { name: 'BITS School of Management', logo: '/partners/bitsom.png' },
  { name: 'SP Jain', logo: '/partners/sp-jain.png' },
]

const placementPartners = [
  { name: 'BharatPe', logo: '/companies/bharatpe.png' },
  { name: 'Meesho', logo: '/companies/meesho.png' },
  { name: 'Coinswitch', logo: '/companies/coinswitch.png' },
  { name: 'Capgemini', logo: '/companies/capgemini.png' },
]

export function PartnersSection() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-sm font-semibold text-gray-600 dark:text-gray-400 mb-8 uppercase tracking-wider">
          In Partnership With Leading Institutions
        </h2>
        
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mb-16">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100"
            >
              <div className="h-16 w-32 relative flex items-center justify-center">
                <span className="text-gray-600 font-semibold">{partner.name}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-16">
          <h2 className="text-center text-sm font-semibold text-gray-600 dark:text-gray-400 mb-8 uppercase tracking-wider">
            Our Students Work At
          </h2>
          
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {placementPartners.map((company) => (
              <div
                key={company.name}
                className="grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100"
              >
                <div className="h-12 w-28 relative flex items-center justify-center">
                  <span className="text-gray-600 font-semibold">{company.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}