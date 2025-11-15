'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { Comment } from '@/types/database'

export async function getApprovedComments(postId: string): Promise<Comment[]> {
  try {
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', postId)
      .eq('is_approved', true)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Error fetching comments:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Unexpected error in getApprovedComments:', error)
    return []
  }
}

export async function createComment(
  postId: string,
  formData: {
    author_name: string
    author_email: string
    content: string
    parent_id?: string | null
  }
): Promise<{ success: boolean; comment?: Comment; error?: string }> {
  try {
    if (!formData.author_name.trim() || !formData.author_email.trim() || !formData.content.trim()) {
      return { success: false, error: 'Name, email, and comment are required' }
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.author_email)) {
      return { success: false, error: 'Please enter a valid email address' }
    }

    const supabase = await createClient()

    const { data, error } = await supabase
      .from('comments')
      .insert({
        post_id: postId,
        author_name: formData.author_name.trim(),
        author_email: formData.author_email.trim(),
        content: formData.content.trim(),
        parent_id: formData.parent_id || null,
        is_approved: true, // Comments are automatically approved
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating comment:', error)
      return { success: false, error: error.message }
    }

    // Revalidate the post page to show the new comment immediately
    revalidatePath(`/[slug]`, 'page')

    return { success: true, comment: data }
  } catch (error: any) {
    console.error('Unexpected error in createComment:', error)
    return { success: false, error: 'Failed to submit comment' }
  }
}

