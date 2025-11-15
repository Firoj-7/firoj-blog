import Link from 'next/link'
import LogoutButton from './LogoutButton'

interface AdminLayoutProps {
  children: React.ReactNode
  title?: string
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-6 py-16">
        <AdminHeader title={title} />
        {children}
      </main>
    </div>
  )
}

function AdminHeader({ title }: { title?: string }) {
  return (
    <header className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl font-bold">
            <Link href="/admin" className="hover:opacity-80">
              Admin Dashboard
            </Link>
          </h1>
          {title && <p className="text-gray-600 mt-2">{title}</p>}
        </div>
        <LogoutButton />
      </div>
      <nav className="flex gap-4 border-b border-gray-200 pb-4">
        <Link
          href="/admin"
          className="text-link hover:underline text-sm"
        >
          Dashboard
        </Link>
        <Link
          href="/admin/new"
          className="text-link hover:underline text-sm"
        >
          New Post
        </Link>
        <Link
          href="/"
          target="_blank"
          className="text-link hover:underline text-sm"
        >
          View Site
        </Link>
      </nav>
    </header>
  )
}

