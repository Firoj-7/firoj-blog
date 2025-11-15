import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getAllPosts } from '@/lib/actions/posts'
import AdminLayout from '@/components/AdminLayout'
import PostTable from '@/components/PostTable'

export default async function AdminDashboard() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  const posts = await getAllPosts()

  return (
    <AdminLayout>
      <div className="mb-6">
        <Link
          href="/admin/new"
          className="inline-block bg-foreground text-white px-6 py-2 rounded-md hover:opacity-90 transition-opacity"
        >
          + New Post
        </Link>
      </div>

      <PostTable posts={posts} />
    </AdminLayout>
  )
}

