import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import './nprogress.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { AuthProvider } from '@/lib/auth/context'
import { LoadingProvider } from '@/lib/contexts/loading-context'
import { Header } from '@/components/common/header'
import { Footer } from '@/components/common/footer'
import { GlobalLoader } from '@/components/common/global-loader'
import { Toaster } from 'react-hot-toast'
import { Suspense } from 'react'
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RASS Learning - Learn and Grow',
  description: 'Professional Learning Management System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <LoadingProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem={false}
              storageKey="rass-theme"
            >
              <Suspense fallback={null}>
                <GlobalLoader />
              </Suspense>
              <div className="flex min-h-screen flex-col">
                <Suspense fallback={<div className="h-16 bg-white dark:bg-gray-900" />}>
                  <Header />
                </Suspense>
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#333',
                    color: '#fff',
                  },
                }}
              />
            </ThemeProvider>
          </LoadingProvider>
        </AuthProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}