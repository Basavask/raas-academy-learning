"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Clock, 
  Users, 
  Star, 
  CheckCircle, 
  Play, 
  BookOpen, 
  Award,
  Calendar,
  MapPin,
  DollarSign,
  ArrowRight,
  ChevronRight,
  User,
  GraduationCap,
  Briefcase,
  Heart
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ImageWithSkeleton } from '@/components/ui/skeleton'

interface Course {
  id: string
  title: string
  description: string
  imageUrl?: string
  category: string
  level: string
  price: number
  duration: string
  slug?: string
  modules?: any[]
  _count?: {
    enrollments: number
  }
}

interface CourseDetailViewProps {
  course: Course
  isEnrolled: boolean
  isAuthenticated: boolean
}

export function CourseDetailView({ course, isEnrolled, isAuthenticated }: CourseDetailViewProps) {
  const [activeTab, setActiveTab] = useState('details')

  const stats = [
    { icon: Users, label: 'Students Enrolled', value: course._count?.enrollments || 0 },
    { icon: Star, label: 'Average Rating', value: '4.8' },
    { icon: Award, label: 'Certification', value: 'Industry Recognized' },
    { icon: Clock, label: 'Duration', value: course.duration }
  ]

  const features = [
    'Live Interactive Sessions',
    'Industry Expert Instructors',
    'Real-world Projects',
    'Career Support',
    'Job Placement Assistance',
    'Lifetime Access'
  ]

  const admissionSteps = [
    {
      icon: User,
      title: 'Register',
      description: 'Sign up for the program with your basic details'
    },
    {
      icon: BookOpen,
      title: 'Entrance Test',
      description: 'Complete the assessment to evaluate your readiness'
    },
    {
      icon: CheckCircle,
      title: 'Interview',
      description: 'Attend a personal interview with our experts'
    },
    {
      icon: GraduationCap,
      title: 'Enrollment',
      description: 'Complete enrollment and start your learning journey'
    }
  ]

  const studentJourney = [
    {
      phase: 'Foundation',
      duration: '4 weeks',
      description: 'Build strong fundamentals and core concepts'
    },
    {
      phase: 'Advanced Learning',
      duration: '8 weeks',
      description: 'Deep dive into advanced topics and techniques'
    },
    {
      phase: 'Project Work',
      duration: '4 weeks',
      description: 'Apply knowledge through real-world projects'
    },
    {
      phase: 'Career Preparation',
      duration: '2 weeks',
      description: 'Interview preparation and job placement support'
    }
  ]

  const dreamCompanies = [
    'TCS', 'Infosys', 'Wipro', 'HCL', 'Tech Mahindra',
    'Accenture', 'Cognizant', 'Capgemini', 'IBM', 'Microsoft'
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">
                {course.category}
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                {course.title}
              </h1>
              <p className="text-xl opacity-90 mb-6">
                India's Leading Outcome-Focused Program
              </p>
              
              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold">₹{course.price.toLocaleString()}</div>
                  <div className="text-sm opacity-80">Starting Salary</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">5+ Yrs</div>
                  <div className="text-sm opacity-80">Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">5000+</div>
                  <div className="text-sm opacity-80">Companies Trust</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">95%</div>
                  <div className="text-sm opacity-80">Placement Rate</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {isEnrolled ? (
                  <Button size="lg" asChild>
                    <Link href={`/courses/${course.slug || course.id}/learn`}>
                      Continue Learning
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                      Enroll Now
                    </Button>
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                      Download Brochure
                    </Button>
                  </>
                )}
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="relative">
                {course.imageUrl ? (
                  <Image
                    src={course.imageUrl}
                    alt={course.title}
                    width={400}
                    height={300}
                    className="rounded-lg shadow-xl"
                  />
                ) : (
                  <div className="w-96 h-64 bg-white/10 rounded-lg flex items-center justify-center">
                    <span className="text-6xl font-bold opacity-50">
                      {course.category?.charAt(0) || "C"}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="details">Course Details</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="admission">Admission Process</TabsTrigger>
              <TabsTrigger value="journey">Student Journey</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          
          {/* Course Details Tab */}
          <TabsContent value="details" className="space-y-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Why Choose This Course */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Why Choose This Course?</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Our comprehensive curriculum, hands-on projects, and live classes prepare you to be job-ready from day one.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      {features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Dream Companies */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Dream Companies to Start Your Career</h2>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {dreamCompanies.map((company, index) => (
                        <div key={index} className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-center">
                          <span className="font-medium">{company}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Pay After Placement */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Pay After Placement</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Zero upfront, pay only when you get hired
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <DollarSign className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                        <h3 className="font-semibold mb-2">Zero Upfront Fee</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Apply and study for ZERO upfront fee</p>
                      </div>
                      <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
                        <h3 className="font-semibold mb-2">Pay After Job</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Pay only when you get a job of 3.5LPA or more</p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <Award className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                        <h3 className="font-semibold mb-2">Salary-Based Fees</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Pay the fees based on your salary range</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Course Stats */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Course Overview</h3>
                    <div className="space-y-4">
                      {stats.map((stat, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <stat.icon className="h-5 w-5 text-blue-600" />
                          <div>
                            <div className="font-medium">{stat.value}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <Button className="w-full" size="lg">
                        Enroll Now
                      </Button>
                      <Button variant="outline" className="w-full">
                        Download Brochure
                      </Button>
                      <Button variant="outline" className="w-full">
                        Schedule Consultation
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Curriculum Tab */}
          <TabsContent value="curriculum" className="space-y-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  Our learn-by-doing curriculum is continually updated to provide a practical, hands-on learning experience.
                </p>
                
                <div className="space-y-6">
                  {course.modules?.map((module: any, index: number) => (
                    <div key={module.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold">Module {index + 1}: {module.title}</h3>
                        <Badge variant="secondary">{module.duration || '4 weeks'}</Badge>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">
                        {module.description || 'Comprehensive learning module with hands-on projects and real-world applications.'}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Play className="h-4 w-4" />
                          {module.lessons || 12} Lessons
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {module.duration || '4 weeks'}
                        </span>
                      </div>
                    </div>
                  )) || (
                    <div className="text-center py-8">
                      <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-500">Curriculum details will be available soon</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Admission Process Tab */}
          <TabsContent value="admission" className="space-y-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Admission Process</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  With extensive industry experience, our team guides you through a simple and transparent admission process.
                </p>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {admissionSteps.map((step, index) => (
                    <div key={index} className="text-center">
                      <div className="relative">
                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <step.icon className="h-8 w-8 text-blue-600" />
                        </div>
                        {index < admissionSteps.length - 1 && (
                          <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-200 dark:bg-gray-700 transform translate-x-2">
                            <ChevronRight className="h-4 w-4 text-gray-400 absolute right-0 top-1/2 transform -translate-y-1/2" />
                          </div>
                        )}
                      </div>
                      <h3 className="font-semibold mb-2">{step.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{step.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Student Journey Tab */}
          <TabsContent value="journey" className="space-y-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Student Journey</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  Your complete learning journey from foundation to career placement
                </p>
                
                <div className="space-y-6">
                  {studentJourney.map((phase, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{phase.phase}</h3>
                          <Badge variant="outline">{phase.duration}</Badge>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">{phase.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="space-y-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                
                <div className="space-y-4">
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">What is the medium of instruction?</h3>
                    <p className="text-gray-600 dark:text-gray-300">All our courses are conducted in English with support for Hindi when needed.</p>
                  </div>
                  
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">What is the course fee?</h3>
                    <p className="text-gray-600 dark:text-gray-300">We offer flexible payment options including Pay After Placement. Contact us for detailed pricing.</p>
                  </div>
                  
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">What is the duration of the program?</h3>
                    <p className="text-gray-600 dark:text-gray-300">The program duration is {course.duration} with flexible learning options available.</p>
                  </div>
                  
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Does RAAS help me get a job?</h3>
                    <p className="text-gray-600 dark:text-gray-300">Yes, we provide comprehensive career support including interview preparation and job placement assistance.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}