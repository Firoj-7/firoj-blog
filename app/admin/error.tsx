'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Admin error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4 text-foreground">Admin Error</h1>
        <p className="text-gray-600 mb-8">
          {error.message || 'An error occurred in the admin panel. Please try again.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-2.5 bg-foreground text-white rounded-md hover:opacity-90 transition-opacity focus-ring"
          >
            Try again
          </button>
          <Link
            href="/admin"
            className="px-6 py-2.5 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors focus-ring"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}

