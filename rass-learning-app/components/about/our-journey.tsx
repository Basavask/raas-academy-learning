const milestones = [
    { year: '2019', event: 'Started with a vision to transform tech education' },
    { year: '2020', event: 'Launched first cohort with 30 students' },
    { year: '2021', event: 'Crossed 1000+ placements milestone' },
    { year: '2022', event: 'Expanded to 5 new tech stacks' },
    { year: '2023', event: 'Reached 10,000+ students transformed' },
    { year: '2024', event: 'Launched AI-powered learning platform' },
  ]
  
  export function OurJourney() {
    return (
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Journey
            </h2>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary/20"></div>
            
            {/* Milestones */}
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div 
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                      <span className="text-primary font-bold text-xl">{milestone.year}</span>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">{milestone.event}</p>
                    </div>
                  </div>
                  
                  {/* Center dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }