import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug } from '@/lib/actions/posts'
import { formatDate, stripHtml } from '@/lib/utils'
import Layout from '@/components/Layout'
import UpvoteButton from '@/components/UpvoteButton'
import CommentForm from '@/components/CommentForm'
import CommentsList from '@/components/CommentsList'
import type { Post } from '@/types/database'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug, true)

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

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug, true)

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
            <div className="flex items-center gap-4 mb-6">
              <p className="text-sm text-gray-600">
                Posted on {formatDate(post.published_at || post.created_at)}
              </p>
              <UpvoteButton postId={post.id} upvotesCount={post.upvotes_count} />
            </div>
          </header>

          <div
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Comments Section */}
        <section className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-bold mb-6 text-gray-900">Comments ({post.comments_count})</h3>
          
          <div className="mb-8">
            <CommentsList postId={post.id} />
          </div>

          <div className="mt-8">
            <h4 className="text-lg font-semibold mb-4 text-gray-900">Leave a Comment</h4>
            <CommentForm postId={post.id} />
          </div>
        </section>
      </div>
    </Layout>
  )
}

