"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Course, CourseModule } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, Users, BookOpen, CheckCircle, PlayCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { loadRazorpayScript } from '@/lib/utils/razorpay-script'
import { LoadingButton } from '../ui/loading-button'

interface CourseDetailViewProps {
    course: Course & {
        modules: CourseModule[]
        _count: { enrollments: number }
    }
    isEnrolled: boolean
    isAuthenticated: boolean
}

export function CourseDetailView({ course, isEnrolled, isAuthenticated }: CourseDetailViewProps) {
    const router = useRouter()
    const [isProcessing, setIsProcessing] = useState(false)

    const handleEnroll = async () => {
        if (!isAuthenticated) {
            router.push(`/login?callbackUrl=/courses/${course.id}`)
            return
        }

        setIsProcessing(true)
        try {
            // Load Razorpay script
            const res = await loadRazorpayScript()
            if (!res) {
                toast.error('Razorpay SDK failed to load')
                return
            }

            // Create order
            const orderResponse = await fetch('/api/payment/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ courseId: course.id })
            })

            if (!orderResponse.ok) {
                throw new Error('Failed to create order')
            }

            const order = await orderResponse.json()

            // Configure Razorpay options
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: 'RASS Learning',
                description: `Enrollment for ${course.title}`,
                order_id: order.id,
                handler: async function (response: unknown) {
                    try {
                        const r = response as {
                          razorpay_order_id: string;
                          razorpay_payment_id: string;
                          razorpay_signature: string;
                        }
                        // Verify payment
                        const verifyResponse = await fetch('/api/payment/verify', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                razorpay_order_id: r.razorpay_order_id,
                                razorpay_payment_id: r.razorpay_payment_id,
                                razorpay_signature: r.razorpay_signature,
                                courseId: course.id
                            })
                        })

                        if (!verifyResponse.ok) {
                            throw new Error('Payment verification failed')
                        }

                        toast.success('Payment successful! You are now enrolled.')
                        router.push(`/courses/${course.id}/learn`)
                    } catch {
                        toast.error('Payment verification failed')
                    }
                },
                prefill: {
                    name: '',
                    email: '',
                    contact: ''
                },
                theme: {
                    color: '#f97316'
                }
            }

            const RazorpayConstructor = (window as unknown as { Razorpay: new (options: object) => unknown }).Razorpay;
            const paymentObject = new RazorpayConstructor(options);
            (paymentObject as unknown as { open: () => void }).open()
        } catch {
            toast.error('Failed to initiate payment')
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Hero Section */}
            <div className="bg-white dark:bg-gray-800 border-b">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                {course.title}
                            </h1>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                                {course.description}
                            </p>

                            <div className="flex flex-wrap gap-4 text-sm">
                                {course.duration && (
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-5 w-5 text-gray-400" />
                                        <span>{course.duration}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <Users className="h-5 w-5 text-gray-400" />
                                    <span>{course._count.enrollments} students enrolled</span>
                                </div>
                                {course.level && (
                                    <div className="flex items-center gap-2">
                                        <BookOpen className="h-5 w-5 text-gray-400" />
                                        <span className="capitalize">{course.level}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <Card className="sticky top-24">
                                <div className="relative h-48 w-full">
                                    <Image
                                        src={course.imageUrl || 'https://via.placeholder.com/400x300'}
                                        alt={course.title}
                                        fill
                                        className="object-cover rounded-t-lg"
                                    />
                                </div>
                                <CardContent className="p-6">
                                    <div className="mb-6">
                                        <span className="text-3xl font-bold text-primary-500">
                                            ₹{course.price.toLocaleString()}
                                        </span>
                                    </div>

                                    {isEnrolled ? (
                                        <Button className="w-full" asChild>
                                            <Link href={`/courses/${course.id}/learn`}>
                                                <PlayCircle className="mr-2 h-4 w-4" />
                                                Continue Learning
                                            </Link>
                                        </Button>
                                    ) : (
                                        <LoadingButton
                                            className="w-full"
                                            onClick={handleEnroll}
                                            loading={isProcessing}
                                            loadingText="Processing..."
                                        >
                                            Enroll Now
                                        </LoadingButton>
                                    )}

                                    <div className="mt-6 space-y-2">
                                        <div className="flex items-center gap-2 text-sm">
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                            <span>Lifetime access</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                            <span>Certificate of completion</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                            <span>Learn at your own pace</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Content - Same as before */}
            <div className="container mx-auto px-4 py-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Course Content</CardTitle>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {course.modules.length} modules
                        </p>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {course.modules.map((module, index) => (
                                <div
                                    key={module.id}
                                    className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                                >
                                    <div className="flex-shrink-0 w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                                        <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                                            {index + 1}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium">{module.title}</h4>
                                        {module.description && (
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                {module.description}
                                            </p>
                                        )}
                                    </div>
                                    {module.duration && (
                                        <span className="text-sm text-gray-500">{module.duration}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}