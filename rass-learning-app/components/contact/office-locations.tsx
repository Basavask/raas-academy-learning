import { Card, CardContent } from '@/components/ui/card'

const offices = [
  {
    city: 'Bengaluru',
    address: '123, Tech Park, Koramangala, Bengaluru - 560034',
    phone: '+91 98765 43210',
  },
  {
    city: 'Hydrabad',
    address: '456, Business Hub, Andheri West, Hydrabad - 400058',
    phone: '+91 87654 32109',
  },
  {
    city: 'Delhi NCR',
    address: '789, Corporate Tower, Gurugram - 122002',
    phone: '+91 76543 21098',
  },
]

export function OfficeLocations() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Office Locations
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Visit us at any of our offices across India
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {offices.map((office, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {office.city}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  {office.address}
                </p>
                <p className="text-primary font-medium">
                  {office.phone}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}