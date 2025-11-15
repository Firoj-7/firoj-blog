import { createClient } from '@/lib/supabase/server'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  try {
    const supabase = await createClient()

    // Fetch all published posts
    const { data: posts, error } = await supabase
      .from('posts')
      .select('slug, published_at, updated_at')
      .eq('published', true)
      .order('published_at', { ascending: false })

    // If table doesn't exist or error, return just static pages
    if (error || !posts) {
      console.warn('Could not fetch posts for sitemap:', error)
      return staticPages
    }

    // Dynamic post pages
    const postPages: MetadataRoute.Sitemap =
      posts.map((post) => ({
        url: `${siteUrl}/${post.slug}`,
        lastModified: post.updated_at ? new Date(post.updated_at) : new Date(post.published_at || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }))

    return [...staticPages, ...postPages]
  } catch (error) {
    console.warn('Error generating sitemap:', error)
    return staticPages
  }
}

