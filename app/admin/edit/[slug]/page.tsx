import { redirect, notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AdminLayout from '@/components/AdminLayout'
import PostEditor from '@/components/PostEditor'
import type { Post } from '@/types/database'

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

async function getPost(slug: string): Promise<Post | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) {
    return null
  }

  return data
}

export default async function EditPostPage({ params }: { params: { slug: string } }) {
  await checkAuth()
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <AdminLayout title={`Edit: ${post.title}`}>
      <PostEditor post={post} />
    </AdminLayout>
  )
}

