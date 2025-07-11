import NProgress from 'nprogress'

class ApiClient {
  private baseUrl: string = ''

  async fetch(url: string, options?: RequestInit) {
    NProgress.start()
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      })
      
      NProgress.done()
      return response
    } catch (error) {
      NProgress.done()
      throw error
    }
  }

  async get(url: string) {
    return this.fetch(url, { method: 'GET' })
  }

  async post(url: string, data?: any) {
    return this.fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async put(url: string, data?: any) {
    return this.fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async delete(url: string) {
    return this.fetch(url, { method: 'DELETE' })
  }
}

export const apiClient = new ApiClient()