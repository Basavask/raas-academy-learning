import { Card } from '@/components/ui/card'
import { CheckCircle, Users, Clock, Award, Globe } from 'lucide-react'

export function CourseDetails({ course }: { course: any }) {
  const details = [
    { icon: Clock, label: 'Duration', value: course.duration },
    { icon: Users, label: 'Enrolled', value: `${course.enrollments?.length || 0} students` },
    { icon: Award, label: 'Certificate', value: 'Yes, upon completion' },
    { icon: Globe, label: 'Language', value: 'English' },
  ]

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-6">Course Overview</h2>
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p>{course.longDescription || course.description}</p>
            </div>
            
            {course.prerequisites && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Prerequisites</h3>
                <ul className="space-y-2">
                  {course.prerequisites.map((prereq: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>{prereq}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4">
              <h3 className="text-xl font-semibold mb-4">Course Details</h3>
              <div className="space-y-4">
                {details.map((detail, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <detail.icon className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-gray-500">{detail.label}</p>
                      <p className="font-medium">{detail.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}