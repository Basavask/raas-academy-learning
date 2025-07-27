import { useState } from 'react'
import Image from 'next/image'

// Structured skeleton component for larger content areas
export function StructuredSkeleton({ className }: { className: string }) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg ${className}`}>
      <div className="w-full h-full p-4">
        {/* Image placeholder - square in top-left */}
        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg mb-3"></div>
        
        {/* Text line placeholders */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  )
}

// Simple skeleton component for smaller images
export function SimpleSkeleton({ className }: { className: string }) {
  return (
    <div className={`bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg ${className}`}>
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-300 dark:border-gray-600 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    </div>
  )
}

// Image component with loading state for any image
export function ImageWithSkeleton({ 
  src, 
  alt, 
  className, 
  useStructuredSkeleton = false 
}: { 
  src: string; 
  alt: string; 
  className: string;
  useStructuredSkeleton?: boolean;
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div className={`bg-gray-100 dark:bg-gray-800 flex items-center justify-center ${className}`}>
        <span className="text-gray-500 dark:text-gray-400 text-sm">Image not available</span>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        useStructuredSkeleton ? 
          <StructuredSkeleton className="absolute inset-0" /> : 
          <SimpleSkeleton className="absolute inset-0" />
      )}
      <Image 
        src={src} 
        alt={alt} 
        fill 
        className={`object-contain rounded-lg shadow-lg transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false)
          setHasError(true)
        }}
      />
    </div>
  )
} 