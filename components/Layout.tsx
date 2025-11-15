import Link from 'next/link'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-16">
        <Header />
        {children}
        <Footer />
      </main>
    </div>
  )
}

function Header() {
  return (
    <header className="mb-12 md:mb-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">
        <Link 
          href="/" 
          className="text-foreground hover:text-link transition-colors focus-ring rounded"
        >
          Personal Blog
        </Link>
      </h1>
      <p className="text-gray-600 text-base md:text-lg mb-3 md:mb-4">
        A minimalist blogging platform
      </p>
      <nav 
        className="flex flex-wrap gap-3 md:gap-4 text-sm"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="text-link hover:underline focus-ring rounded px-1"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="text-link hover:underline focus-ring rounded px-1"
        >
          About
        </Link>
        <Link
          href="/feed"
          className="text-link hover:underline focus-ring rounded px-1"
          aria-label="RSS Feed"
        >
          RSS Feed
        </Link>
      </nav>
    </header>
  )
}

function Footer() {
  return (
    <footer className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
      <p>© {new Date().getFullYear()} Personal Blog</p>
    </footer>
  )
}

