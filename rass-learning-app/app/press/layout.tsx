import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Press Coverage - RAAS Learning',
  description: 'Latest news and press coverage about RAAS Learning from leading publications',
}

export default function PressLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 