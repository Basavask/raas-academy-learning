"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Course, CourseModule } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Clock, Users, BookOpen, CheckCircle, PlayCircle, Download } from 'lucide-react'
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

const highlights = [
    'Learn from industry leaders and top international faculties from institutions such as Harvard, Wharton',
    'Master AI tools to make smarter, data-driven decisions and optimize business strategies.',
    'Work on real-life case studies and live projects to gain practical, hands-on experience.'
]

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
            const res = await loadRazorpayScript()
            if (!res) {
                toast.error('Razorpay SDK failed to load')
                return
            }
            const orderResponse = await fetch('/api/payment/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ courseId: course.id })
            })
            if (!orderResponse.ok) {
                throw new Error('Failed to create order')
            }
            const order = await orderResponse.json()
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: 'RAAS Learning',
                description: `Enrollment for ${course.title}`,
                order_id: order.id,
                handler: async function (response: unknown) {
                    try {
                        const r = response as {
                          razorpay_order_id: string;
                          razorpay_payment_id: string;
                          razorpay_signature: string;
                        }
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
                prefill: { name: '', email: '', contact: '' },
                theme: { color: '#f97316' }
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

    // Example info cards (replace with real data as needed)
    const infoCards = [
        { label: 'Qualifier Test Date', value: '20 July, 2025' },
        { label: 'Program Duration', value: course.duration || '6 Months' },
        { label: 'Time Commitment', value: '8-10 Hrs/ week' },
        { label: 'Available Seats/ Cohort', value: '250' },
        { label: 'Eligibility', value: course.level ? `${course.level} Level` : 'Beginner Level' },
        { label: 'Learning Mode', value: 'Online' },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
            <div className="relative max-w-7xl mx-auto min-h-[420px] flex flex-col md:flex-row items-stretch">
                {/* Left Content (60%) */}
                <div className="w-full md:w-[60%] z-10 flex flex-col justify-center px-6 py-12 md:py-20">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-2 leading-tight">
                        {course.title}
                    </h1>
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
                        from <span className="text-primary font-bold">RAAS Academy</span>
                    </h2>
                    <ul className="list-disc pl-6 mb-8 space-y-2 text-gray-700 dark:text-gray-200 text-lg">
                        {highlights.map((h, i) => <li key={i}>{h}</li>)}
                    </ul>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                        {infoCards.map((card, i) => (
                            <div key={i} className="border-2 border-blue-400 rounded-xl px-6 py-5 bg-white/80 dark:bg-gray-900/60 text-center flex flex-col items-center justify-center">
                                <span className="text-sm font-medium text-gray-500 mb-1">{card.label}</span>
                                <span className="text-lg md:text-xl font-bold text-blue-700 dark:text-blue-400">{card.value}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        {isEnrolled ? (
                            <Button size="lg" className="bg-primary hover:bg-blue-700 text-white font-bold px-12 py-6 text-2xl rounded-xl shadow w-full max-w-xs md:max-w-md" asChild>
                                <Link href={`/courses/${course.id}/learn`}>
                                    <PlayCircle className="mr-2 h-6 w-6" />
                                    Continue Learning
                                </Link>
                            </Button>
                        ) : (
                            <LoadingButton
                                size="lg"
                                className="bg-primary hover:bg-blue-700 text-white font-bold px-12 py-6 text-2xl rounded-xl shadow w-full max-w-xs md:max-w-md"
                                onClick={handleEnroll}
                                loading={isProcessing}
                                loadingText="Processing..."
                            >
                                Enroll Now
                            </LoadingButton>
                        )}
                    </div>
                </div>
                {/* Right Image (40%) */}
                <div className="relative w-full md:w-[40%] min-h-[320px] md:min-h-[420px] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={course.imageUrl || 'https://via.placeholder.com/800x600'}
                            alt={course.title}
                            fill
                            className="object-cover object-center w-full h-full"
                            priority
                        />
                        {/* Only one right-to-left blue gradient overlay for seamless blend */}
                        <div className="absolute inset-0 bg-gradient-to-l from-blue-600/80 via-blue-400/30 to-transparent dark:from-blue-900/80 dark:via-blue-800/30 dark:to-transparent pointer-events-none" />
                    </div>
                    {/* Logo bottom right */}
                    <div className="absolute bottom-6 right-6 z-10 bg-white/90 dark:bg-gray-900/80 rounded-xl p-3 shadow-lg flex items-center">
                        <Image src="/logo.png" alt="RAAS Academy" width={48} height={48} className="rounded" />
                    </div>
                </div>
            </div>
            {/* Curriculum Section */}
            <div className="max-w-5xl mx-auto px-4 py-12">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Curriculum</h3>
                <div className="divide-y divide-gray-200 dark:divide-gray-700 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    {course.modules.map((module, idx) => (
                        <div key={module.id}>
                            <div className="flex flex-col md:flex-row md:items-center justify-between px-6 py-5">
                                <div className="flex items-center gap-4 mb-2 md:mb-0">
                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold">
                                        {idx + 1}
                                    </span>
                                    <span className="font-medium text-lg text-gray-900 dark:text-white">{module.title}</span>
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center gap-2 text-gray-500 text-sm">
                                    {module.duration && <span><Clock className="inline h-4 w-4 mr-1" />{module.duration}</span>}
                                </div>
                            </div>
                            {module.description && (
                                <div className="px-6 md:px-16 pb-6 text-gray-700 dark:text-gray-300">
                                    <p className="mb-2 text-base">{module.description}</p>
                                    {module.content && <p className="text-sm opacity-80">{module.content}</p>}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            {/* Learning Journey Section */}
            <div className="max-w-6xl mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">What is our Learning Journey?</h2>
                <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-0">
                    {[
                        {
                            step: 1,
                            title: 'Upskill Now',
                            desc: 'Master essential tools and build a solid foundation.'
                        },
                        {
                            step: 2,
                            title: 'Capstone Project',
                            desc: 'Craft a standout portfolio with industry-focused capstone projects.'
                        },
                        {
                            step: 3,
                            title: 'Elevate Profile',
                            desc: 'Optimize your resume, LinkedIn, and GitHub profile for better visibility.'
                        },
                        {
                            step: 4,
                            title: 'Career Goals',
                            desc: 'Achieve your dream role with comprehensive end-to-end career support.'
                        }
                    ].map((item, idx) => (
                        <div key={item.step} className="flex flex-col items-center flex-1">
                            <div className="relative flex flex-col items-center">
                                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                    <span className="text-4xl font-bold text-primary">{item.step}</span>
                                </div>
                                {idx < 3 && (
                                    <div className="hidden md:block absolute right-[-50%] top-1/2 w-full h-0.5 bg-primary/20" style={{zIndex: -1}} />
                                )}
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-center">{item.title}</h4>
                            <p className="text-gray-600 dark:text-gray-300 text-center max-w-xs">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}