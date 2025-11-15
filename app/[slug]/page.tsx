import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug } from '@/lib/actions/posts'
import { formatDate, stripHtml } from '@/lib/utils'
import Layout from '@/components/Layout'
import type { Post } from '@/types/database'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug, true)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const description = post.excerpt || stripHtml(post.content).substring(0, 160)

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      publishedTime: post.published_at || undefined,
      url: `${siteUrl}/${post.slug}`,
      siteName: 'Personal Blog',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
    },
  }
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug, true)

  if (!post) {
    notFound()
  }

  return (
    <Layout>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          Firoj Ansari
        </h1>
        
        <article>
          <header className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-blue-600">
              {post.title}
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Posted on {formatDate(post.published_at || post.created_at)}
            </p>
          </header>

          <div
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </Layout>
  )
}

