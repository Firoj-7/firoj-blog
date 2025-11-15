import { redirect, notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getPostBySlug } from '@/lib/actions/posts'
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

export default async function EditPostPage({ params }: { params: { slug: string } }) {
  await checkAuth()
  
  // Use getPostBySlug with publishedOnly: false to get all posts (including drafts)
  const post = await getPostBySlug(params.slug, false)

  if (!post) {
    console.error('Post not found for slug:', params.slug)
    notFound()
  }

  return (
    <AdminLayout title={`Edit: ${post.title}`}>
      <PostEditor post={post} />
    </AdminLayout>
  )
}

