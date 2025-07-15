export function StatsSection() {
    const stats = [
      { value: "50+", label: "Expert Instructors" },
      { value: "1000+", label: "Active Students" },
      { value: "100+", label: "Course Hours" },
      { value: "95%", label: "Success Rate" },
    ]
  
    return (
      <section className="py-20 bg-primary-500 dark:bg-primary-600">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-primary-100">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }