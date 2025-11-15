import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AdminLayout from '@/components/AdminLayout'
import PostEditor from '@/components/PostEditor'

async function checkAuth() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  return user
}

export default async function NewPostPage() {
  await checkAuth()

  return (
    <AdminLayout title="Create a new post">
      <PostEditor />
    </AdminLayout>
  )
}

