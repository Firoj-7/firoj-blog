'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { createHash } from 'crypto'

// Generate a unique identifier for the user (based on IP and user agent)
async function getUserIdentifier(): Promise<string> {
  const headersList = await headers()
  const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown'
  const userAgent = headersList.get('user-agent') || 'unknown'
  
  // Create a hash of IP + user agent for privacy
  const hash = createHash('sha256')
  hash.update(`${ip}-${userAgent}`)
  return hash.digest('hex')
}

export async function checkUpvoteStatus(postId: string): Promise<boolean> {
  try {
    const supabase = await createClient()
    const userIdentifier = await getUserIdentifier()

    const { data, error } = await supabase
      .from('upvotes')
      .select('id')
      .eq('post_id', postId)
      .eq('user_identifier', userIdentifier)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Error checking upvote status:', error)
      return false
    }

    return !!data
  } catch (error) {
    console.error('Unexpected error in checkUpvoteStatus:', error)
    return false
  }
}

export async function toggleUpvote(postId: string): Promise<{ success: boolean; isUpvoted: boolean; error?: string }> {
  try {
    const supabase = await createClient()
    const userIdentifier = await getUserIdentifier()

    // Check if already upvoted
    const { data: existing } = await supabase
      .from('upvotes')
      .select('id')
      .eq('post_id', postId)
      .eq('user_identifier', userIdentifier)
      .single()

    if (existing) {
      // Remove upvote
      const { error } = await supabase
        .from('upvotes')
        .delete()
        .eq('post_id', postId)
        .eq('user_identifier', userIdentifier)

      if (error) {
        console.error('Error removing upvote:', error)
        return { success: false, isUpvoted: true, error: error.message }
      }

      revalidatePath(`/[slug]`, 'page')
      return { success: true, isUpvoted: false }
    } else {
      // Add upvote
      const { error } = await supabase
        .from('upvotes')
        .insert({
          post_id: postId,
          user_identifier: userIdentifier,
        })

      if (error) {
        console.error('Error adding upvote:', error)
        return { success: false, isUpvoted: false, error: error.message }
      }

      revalidatePath(`/[slug]`, 'page')
      return { success: true, isUpvoted: true }
    }
  } catch (error: any) {
    console.error('Unexpected error in toggleUpvote:', error)
    return { success: false, isUpvoted: false, error: 'Failed to toggle upvote' }
  }
}

