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
      <Link
        href="/"
        className="text-link hover:underline mb-8 inline-block text-sm"
      >
        ← Back to home
      </Link>

      <article className="content">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
            <time dateTime={post.published_at || post.created_at}>
              {formatDate(post.published_at || post.created_at)}
            </time>
            <span>•</span>
            <span>{post.reading_time} min read</span>
          </div>
        </header>

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </Layout>
  )
}

