"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/cn'
import { Menu, X, User, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from '@/hooks/use-route-loading'

export function Header() {
    const pathname = usePathname()
    const { data: session, status } = useSession()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [moreDropdownOpen, setMoreDropdownOpen] = useState(false)
    const router = useRouter()

    const isLoading = status === 'loading'
    
    // Updated navigation items - removed Contact and About as they'll be handled separately
    const navItems = [
        { href: '/', label: 'Home' },
        { href: '/courses', label: 'Courses' },
        { href: '/corporate', label: 'Corporate' },
        { href: '/universities', label: 'Universities' },
    ]

    // More dropdown items
    const moreItems = [
        { href: '/about', label: 'About' },
        { href: '/blogs', label: 'Blogs' },
        // Future pages can be added here
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
        <>
            <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-gray-800 dark:bg-gray-950/95 dark:supports-[backdrop-filter]:bg-gray-950/60">
                <div className="container mx-auto px-4">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo and Navigation */}
                        <div className="flex items-center space-x-8">
                            <Link href="/" className="flex items-center">
                                <Image
                                    src="/logo.png"
                                    alt="RAAS Logo"
                                    width={160}
                                    height={40}
                                    priority
                                />
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
                                
                                {/* More Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                                        className={cn(
                                            "flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary-500 dark:hover:text-primary-400",
                                            moreDropdownOpen
                                                ? "text-primary-500 dark:text-primary-400"
                                                : "text-gray-700 dark:text-gray-300"
                                        )}
                                    >
                                        <span>More</span>
                                        <ChevronDown className={cn(
                                            "h-4 w-4 transition-transform",
                                            moreDropdownOpen ? "rotate-180" : ""
                                        )} />
                                    </button>
                                    
                                    {moreDropdownOpen && (
                                        <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                                            {moreItems.map((item) => (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    className={cn(
                                                        "block px-4 py-2 text-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-700",
                                                        pathname === item.href
                                                            ? "text-primary-500 dark:text-primary-400 bg-gray-50 dark:bg-gray-700"
                                                            : "text-gray-700 dark:text-gray-300"
                                                    )}
                                                    onClick={() => setMoreDropdownOpen(false)}
                                                >
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>

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
                        </div>
                        
                        {/* Right Section */}
                        <div className="flex items-center space-x-4">
                            <ThemeToggle />

                            {/* Contact Us Button - Desktop */}
                            <div className="hidden md:block">
                                <Button variant="outline" asChild>
                                    <Link href="/contact">Contact Us</Link>
                                </Button>
                            </div>

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

                                {/* Mobile More Items */}
                                {moreItems.map((item) => (
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
                                    {/* Mobile Contact Us Button */}
                                    <Button variant="outline" asChild className="w-full">
                                        <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>
                                    </Button>
                                    
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
            {/* Spacer to prevent content from being hidden behind the fixed header */}
            <div className="h-16 w-full" />
        </>
    )
}