import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import type { Post } from '@/types/database'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="mb-12 last:mb-0">
      <Link 
        href={`/${post.slug}`}
        className="block group"
        aria-label={`Read ${post.title}`}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-blue-600 hover:text-blue-700 transition-colors">
          {post.title}
        </h2>
      </Link>
      <div className="prose prose-lg max-w-none mb-4">
        {post.excerpt ? (
          <p className="text-gray-700 leading-relaxed mb-4">
            {post.excerpt}
          </p>
        ) : (
          <div 
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ 
              __html: post.content.substring(0, 300).replace(/<[^>]*>/g, '') + '...' 
            }} 
          />
        )}
      </div>
      <p className="text-sm text-gray-600">
        Posted on {formatDate(post.published_at || post.created_at)}
      </p>
    </article>
  )
}

