"use client"

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

interface CourseSearchProps {
  defaultValue?: string
}

export function CourseSearch({ defaultValue }: CourseSearchProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(defaultValue || '')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())
    if (search) {
      params.set('search', search)
    } else {
      params.delete('search')
    }
    params.set('page', '1')
    router.push(`/courses?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="flex gap-2 max-w-lg">
      <Input
        type="search"
        placeholder="Search courses..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1"
      />
      <Button type="submit">
        <Search className="h-4 w-4 mr-2" />
        Search
      </Button>
    </form>
  )
}