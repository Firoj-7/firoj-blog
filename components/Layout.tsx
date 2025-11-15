import Link from 'next/link'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Left Sidebar */}
          <aside className="lg:col-span-1">
            <Sidebar />
          </aside>
          
          {/* Main Content */}
          <main className="lg:col-span-3">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

function Sidebar() {
  return (
    <div className="sticky top-8">
      {/* Name */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Firoj Ansari
      </h1>
      
      {/* Follow Button */}
      <a
        href="https://x.com/yourusername"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors mb-6 text-sm font-medium"
      >
        Follow @X
      </a>
      
      {/* Search */}
      <div className="mb-6">
        <input
          type="search"
          placeholder="Search this site..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          aria-label="Search this site"
        />
      </div>
      
      {/* Archive Link */}
      <div className="mb-6">
        <Link
          href="/"
          className="text-blue-600 hover:underline text-sm flex items-center gap-2"
        >
          Browse the Archive
          <span className="text-orange-500">▶</span>
        </Link>
      </div>
      
      {/* RSS Feed */}
      <div>
        <Link
          href="/feed"
          className="text-blue-600 hover:underline text-sm flex items-center gap-2"
          aria-label="RSS Feed"
        >
          RSS Feed
          <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3.429 2.571c0 1.893 1.54 3.429 3.429 3.429v1.714c-2.833 0-5.143-2.31-5.143-5.143H3.429zm5.143 0c0 3.16 2.57 5.714 5.714 5.714v1.714c-4.125 0-7.429-3.304-7.429-7.429H8.572zm5.714 0c0 4.446 3.618 8.036 8.036 8.036v1.714c-5.393 0-9.75-4.357-9.75-9.75h1.714zM2.286 12.571c0 .79.64 1.429 1.429 1.429s1.429-.64 1.429-1.429-.64-1.429-1.429-1.429-1.429.64-1.429 1.429z"/>
          </svg>
        </Link>
      </div>
    </div>
  )
}

