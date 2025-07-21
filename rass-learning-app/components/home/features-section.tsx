import { 
    Clock, 
    Code, 
    Users, 
    Trophy, 
    Layout, 
    HeadphonesIcon,
    BarChart,
    Briefcase,
    GraduationCap,
    Calendar
  } from 'lucide-react'
  
  const features = [
    {
      icon: Clock,
      title: "Flexible Hybrid Learning",
      description: "Experience the energy of live, instructor-led classes combined with the freedom of self-paced preparatory modules."
    },
    {
      icon: Code,
      title: "Applied, Hands-On Learning",
      description: "Bridge the gap between theory and practice with immersive projects and labs that mirror professional tasks."
    },
    {
      icon: Trophy,
      title: "Practice for Mastery",
      description: "Ensure you master every concept with module-specific assignments and practical challenges designed to test your knowledge."
    },
    {
      icon: Layout,
      title: "Your Central Learning Hub",
      description: "Navigate your entire learning journey from lessons to peer collaboration—on one intuitive, state-of-the-art platform."
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 Expert Mentorship",
      description: "Receive timely guidance whenever you need it from our dedicated team of expert mentors, committed to ensuring your success."
    },
    {
      icon: BarChart,
      title: "Data-Driven Insights",
      description: "Track your learning journey and identify areas for improvement with a personalized dashboard showing detailed performance analytics."
    },
    {
      icon: Trophy,
      title: "Innovate & Compete",
      description: "Showcase your talent to the industry by participating in high-stakes hackathons and real-world coding challenges."
    },
    {
      icon: Briefcase,
      title: "Bridge to Your Career",
      description: "Translate your training into professional experience by qualifying for exclusive internship opportunities with our network of partner companies."
    },
    {
      icon: GraduationCap,
      title: "Learn from the Best",
      description: "Go beyond the curriculum with exclusive masterclasses and Q&A sessions featuring top-tier leaders from industry and academia."
    },
    {
      icon: Calendar,
      title: "Exclusive Community Events",
      description: "Stay on the cutting edge with our regular lineup of expert-led workshops, webinars, and virtual conferences."
    }
  ]
  
  export function FeaturesSection() {
    return (
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Go Beyond Theory. Become Job-Ready.
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Translate your knowledge into action: Successfully complete your training 
              and the official FutureSkills Prime assessment to unlock exclusive virtual 
              internships and real-world job simulations.
            </p>
          </div>
  
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }