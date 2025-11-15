'use server'

import { createClient } from '@/lib/supabase/server'
import { generateSlug, calculateReadingTime } from '@/lib/utils'
import { revalidatePath } from 'next/cache'
import type { Post } from '@/types/database'

export async function getPublishedPosts(): Promise<Post[]> {
  try {
    const supabase = await createClient()
    
    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('Supabase environment variables are not set')
      return []
    }

    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false })

    if (error) {
      // If table doesn't exist, return empty array instead of crashing
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        console.warn('Posts table does not exist yet. Please run the database schema SQL.')
        return []
      }
      console.error('Error fetching published posts:', error)
      return []
    }

    return data || []
  } catch (error: any) {
    console.error('Unexpected error in getPublishedPosts:', error)
    // Return empty array to prevent page crash
    return []
  }
}

export async function getAllPosts(): Promise<Post[]> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts:', error)
    return []
  }

  return data || []
}

export async function getPostBySlug(slug: string, publishedOnly: boolean = true): Promise<Post | null> {
  try {
    const supabase = await createClient()
    
    let query = supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)

    if (publishedOnly) {
      query = query.eq('published', true)
    }

    const { data, error } = await query.single()

    if (error) {
      // Post not found is not an error, just return null
      if (error.code === 'PGRST116') {
        return null
      }
      console.error('Error fetching post by slug:', error)
      throw new Error('Failed to fetch post')
    }

    return data || null
  } catch (error) {
    console.error('Unexpected error in getPostBySlug:', error)
    return null
  }
}

export async function createPost(formData: {
  title: string
  slug?: string
  content: string
  excerpt?: string
  published: boolean
}): Promise<{ success: boolean; post?: Post; error?: string }> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: 'Unauthorized' }
  }

  if (!formData.title.trim() || !formData.content.trim()) {
    return { success: false, error: 'Title and content are required' }
  }

  const slug = formData.slug || generateSlug(formData.title)
  const readingTime = calculateReadingTime(formData.content)

  const postData = {
    title: formData.title.trim(),
    slug,
    content: formData.content.trim(),
    excerpt: formData.excerpt?.trim() || null,
    published: formData.published,
    published_at: formData.published ? new Date().toISOString() : null,
    reading_time: readingTime,
    author_id: user.id,
  }

  const { data, error } = await supabase
    .from('posts')
    .insert(postData)
    .select()
    .single()

  if (error) {
    console.error('Error creating post:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/')
  revalidatePath(`/${slug}`)
  revalidatePath('/admin')

  return { success: true, post: data }
}

export async function updatePost(
  postId: string,
  formData: {
    title: string
    slug?: string
    content: string
    excerpt?: string
    published: boolean
  }
): Promise<{ success: boolean; post?: Post; error?: string }> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: 'Unauthorized' }
  }

  if (!formData.title.trim() || !formData.content.trim()) {
    return { success: false, error: 'Title and content are required' }
  }

  // Get existing post to check slug changes
  const { data: existingPost } = await supabase
    .from('posts')
    .select('slug, published_at')
    .eq('id', postId)
    .single()

  const slug = formData.slug || generateSlug(formData.title)
  const readingTime = calculateReadingTime(formData.content)

  const postData = {
    title: formData.title.trim(),
    slug,
    content: formData.content.trim(),
    excerpt: formData.excerpt?.trim() || null,
    published: formData.published,
    published_at: formData.published
      ? (existingPost?.published_at || new Date().toISOString())
      : null,
    reading_time: readingTime,
    updated_at: new Date().toISOString(),
  }

  const { data, error } = await supabase
    .from('posts')
    .update(postData)
    .eq('id', postId)
    .select()
    .single()

  if (error) {
    console.error('Error updating post:', error)
    return { success: false, error: error.message }
  }

  // Revalidate all relevant paths
  revalidatePath('/')
  if (existingPost?.slug) {
    revalidatePath(`/${existingPost.slug}`)
  }
  if (slug !== existingPost?.slug) {
    revalidatePath(`/${slug}`)
  }
  revalidatePath('/admin')

  return { success: true, post: data }
}

export async function deletePost(postId: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: 'Unauthorized' }
  }

  // Get post slug before deletion for revalidation
  const { data: post } = await supabase
    .from('posts')
    .select('slug')
    .eq('id', postId)
    .single()

  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', postId)

  if (error) {
    console.error('Error deleting post:', error)
    return { success: false, error: error.message }
  }

  // Revalidate paths
  revalidatePath('/')
  if (post?.slug) {
    revalidatePath(`/${post.slug}`)
  }
  revalidatePath('/admin')

  return { success: true }
}

