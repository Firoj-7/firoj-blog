export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center" role="status" aria-live="polite">
      <div className="text-center">
        <div className="spinner mx-auto mb-4 w-8 h-8 border-4 border-link border-t-transparent"></div>
        <p className="text-gray-600">Loading...</p>
        <span className="sr-only">Loading content</span>
      </div>
    </div>
  )
}

export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-[3px]',
    lg: 'w-8 h-8 border-4',
  }

  return (
    <div
      className={`spinner ${sizeClasses[size]} border-link border-t-transparent`}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

