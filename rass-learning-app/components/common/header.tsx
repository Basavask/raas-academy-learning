"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/cn'
import { Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from '@/hooks/use-route-loading'

export function Header() {
    const pathname = usePathname()
    const { data: session, status } = useSession()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    // const [mounted, setMounted] = useState(false)
    const router = useRouter()

    //   useEffect(() => {
    //     setMounted(true)
    //   }, [])
    const isLoading = status === 'loading'
    const navItems = [
        { href: '/', label: 'Home' },
        { href: '/courses', label: 'Courses' },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
    ]

    const handleSignOut = async () => {
        try {
            await signOut({ redirect: true, callbackUrl: '/' })
        } catch (error) {
            console.error('Sign out error:', error)
        }
    }

    const getDashboardLink = () => {
        if (session?.user?.role === 'ADMIN') {
            return '/admin/dashboard'
        }
        return '/student/dashboard'
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-gray-800 dark:bg-gray-950/95 dark:supports-[backdrop-filter]:bg-gray-950/60">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    {/* <Link href="/" className="flex items-center">
                        <div className="h-10 w-10 rounded-lg bg-primary-500 flex items-center justify-center mr-2">
                            <span className="text-white font-bold text-xl">R</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                            RASS Learning
                        </span>
                    </Link> */}
                    {/* // Update the logo section: */}
                    <Link href="/" className="flex items-center">
                        <div className="bg-black dark:bg-white rounded-full px-4 py-1.5">
                            <span className="text-white dark:text-black font-bold text-lg tracking-tight">RASS Learning</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary-500 dark:hover:text-primary-400",
                                    pathname === item.href
                                        ? "text-primary-500 dark:text-primary-400"
                                        : "text-gray-700 dark:text-gray-300"
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}

                        {/* Show dashboard link immediately if session exists */}
                        {session && (
                            <Link
                                href={getDashboardLink()}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary-500 dark:hover:text-primary-400",
                                    pathname.includes('dashboard')
                                        ? "text-primary-500 dark:text-primary-400"
                                        : "text-gray-700 dark:text-gray-300"
                                )}
                            >
                                Dashboard
                            </Link>
                        )}
                    </nav>

                    {/* Right Section */}
                    <div className="flex items-center space-x-4">
                        <ThemeToggle />

                        {/* Desktop Auth Section */}
                        <div className="hidden md:flex items-center">
                            {isLoading ? (
                                // Show skeleton while loading
                                <div className="flex items-center space-x-3">
                                    <div className="h-8 w-8 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-full" />
                                    <div className="h-4 w-20 animate-pulse bg-gray-200 dark:bg-gray-700 rounded" />
                                </div>
                            ) : session ? (
                                // User is logged in
                                <div className="flex items-center space-x-3">
                                    <Link
                                        href="/profile"
                                        className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400"
                                    >
                                        {session.user.image ? (
                                            <Image
                                                src={session.user.image}
                                                alt={session.user.name || 'User'}
                                                width={32}
                                                height={32}
                                                className="rounded-full"
                                                priority
                                            />
                                        ) : (
                                            <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center">
                                                <User className="h-4 w-4 text-white" />
                                            </div>
                                        )}
                                        <span>{session.user.name || 'User'}</span>
                                    </Link>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => router.push(getDashboardLink())}
                                        className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                                    >
                                        <LayoutDashboard className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleSignOut}
                                        className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                                    >
                                        <LogOut className="h-4 w-4" />
                                    </Button>
                                </div>
                            ) : (
                                // User is not logged in
                                <div className="flex items-center space-x-2">
                                    <Button variant="ghost" asChild>
                                        <Link href="/login">Login</Link>
                                    </Button>
                                    <Button asChild>
                                        <Link href="/register">Sign Up</Link>
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            type="button"
                            className="md:hidden p-2 text-gray-700 dark:text-gray-300"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu - only show when not loading */}
                {!isLoading && mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
                        <nav className="flex flex-col space-y-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "text-sm font-medium transition-colors hover:text-primary-500 dark:hover:text-primary-400",
                                        pathname === item.href
                                            ? "text-primary-500 dark:text-primary-400"
                                            : "text-gray-700 dark:text-gray-300"
                                    )}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            ))}

                            {session && (
                                <Link
                                    href={getDashboardLink()}
                                    className={cn(
                                        "text-sm font-medium transition-colors hover:text-primary-500 dark:hover:text-primary-400",
                                        pathname.includes('dashboard')
                                            ? "text-primary-500 dark:text-primary-400"
                                            : "text-gray-700 dark:text-gray-300"
                                    )}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Dashboard
                                </Link>
                            )}

                            <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200 dark:border-gray-800">
                                {session ? (
                                    <>
                                        <Button variant="outline" asChild className="w-full">
                                            <Link href="/profile">Profile</Link>
                                        </Button>
                                        <Button variant="outline" asChild className="w-full">
                                            <Link href={getDashboardLink()}>Dashboard</Link>
                                        </Button>
                                        <Button variant="outline" onClick={handleSignOut} className="w-full">
                                            Sign Out
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button variant="outline" asChild className="w-full">
                                            <Link href="/login">Login</Link>
                                        </Button>
                                        <Button asChild className="w-full">
                                            <Link href="/register">Sign Up</Link>
                                        </Button>
                                    </>
                                )}
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    )
}