"use client"
import { useState } from 'react'
import Image from 'next/image'

export function SubscribeNews() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'loading'>('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setError('')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      setStatus('error')
      return
    }
    try {
      const res = await fetch('/api/subscribe-news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        const data = await res.json()
        setError(data.error || 'Something went wrong.')
        console.log("error", data.error)
        setStatus('error')
      }
    } catch(err: unknown) {
      console.log("error", err as Error)
      setError('Something went wrong.')
      setStatus('error')
    }
  }

  return (
    <section className="w-full flex justify-center py-16 bg-transparent">
      <div className="w-full max-w-6xl bg-gray-100 dark:bg-gray-800 rounded-2xl flex flex-col md:flex-row overflow-hidden shadow-lg">
        {/* Left */}
        <div className="flex-1 flex flex-col justify-center p-8 md:p-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">Subscribe for Career – Boosting Insights!</h2>
          <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleSubmit}>
            <input
              type="email"
              className="flex-1 px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 text-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Email Address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-3 rounded-md text-lg transition"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          {status === 'success' && <p className="text-green-600 mt-4">Thank you for subscribing!</p>}
          {status === 'error' && <p className="text-red-600 mt-4">{error}</p>}
        </div>
        {/* Right */}
        <div className="flex-1 relative min-h-[280px] md:min-h-[360px]">
          <Image
            src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&q=80"
            alt="People collaborating"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  )
} 