'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-white flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <h1 className="text-4xl font-bold mb-4 text-foreground">Something went wrong!</h1>
            <p className="text-gray-600 mb-8">
              A critical error occurred. Please refresh the page or try again later.
            </p>
            <button
              onClick={reset}
              className="px-6 py-2.5 bg-foreground text-white rounded-md hover:opacity-90 transition-opacity focus-ring"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}

