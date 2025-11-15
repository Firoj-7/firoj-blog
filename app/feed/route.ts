import { createClient } from '@/lib/supabase/server'
import { stripHtml } from '@/lib/utils'
import type { Post } from '@/types/database'

async function getPosts(): Promise<Post[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts:', error)
    return []
  }

  return data || []
}

function generateRSS(posts: Post[]): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const items = posts
    .map((post) => {
      const postUrl = `${siteUrl}/${post.slug}`
      const pubDate = post.published_at || post.created_at
      const description = post.excerpt || stripHtml(post.content).substring(0, 200) + '...'

      return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid>${postUrl}</guid>
      <pubDate>${new Date(pubDate).toUTCString()}</pubDate>
      <description><![CDATA[${description}]]></description>
    </item>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Personal Blog</title>
    <link>${siteUrl}</link>
    <description>A minimalist personal blogging platform</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`
}

export async function GET() {
  const posts = await getPosts()
  const rss = generateRSS(posts)

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}

