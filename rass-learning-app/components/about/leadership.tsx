import Image from 'next/image'

const leaders = [
  {
    name: 'Prateek Shukla',
    role: 'CEO & Co-Founder',
    image: '/team/prateek.jpg',
    bio: 'IIT Bombay alumnus with a vision to democratize quality education'
  },
  {
    name: 'Nrupul Dev',
    role: 'CTO & Co-Founder',
    image: '/team/nrupul.jpg',
    bio: 'Former tech lead at top companies, passionate about teaching'
  },
  {
    name: 'Yogesh Bhat',
    role: 'VP - Engineering',
    image: '/team/yogesh.jpg',
    bio: 'Building scalable systems to transform education delivery'
  }
]

export function Leadership() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Leadership Team
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Experienced professionals committed to transforming education
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {leaders.map((leader, index) => (
            <div key={index} className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/40"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">
                    {leader.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {leader.name}
              </h3>
              <p className="text-primary font-medium mb-2">{leader.role}</p>
              <p className="text-gray-600 dark:text-gray-400">{leader.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}