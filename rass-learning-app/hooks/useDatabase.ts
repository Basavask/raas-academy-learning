import { useState, useEffect } from 'react'
import { ApiResponse } from '@/types'

interface UseFetchOptions {
  immediate?: boolean
}

export function useFetch<T>(
  url: string,
  options?: UseFetchOptions
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(url)
      const result: ApiResponse<T> = await response.json()
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch data')
      }
      
      setData(result.data || null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (options?.immediate !== false) {
      fetchData()
    }
  }, [url])

  return { data, loading, error, refetch: fetchData }
}

export function useMutation<TData, TVariables>(
  url: string,
  method: 'POST' | 'PUT' | 'DELETE' = 'POST'
) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const mutate = async (variables: TVariables): Promise<ApiResponse<TData>> => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(variables),
      })
      
      const result: ApiResponse<TData> = await response.json()
      
      if (!result.success) {
        throw new Error(result.error || 'Operation failed')
      }
      
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { mutate, loading, error }
}