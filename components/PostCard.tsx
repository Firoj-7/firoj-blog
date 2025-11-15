import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import type { Post } from '@/types/database'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="border-b border-gray-200 pb-8 last:border-b-0">
      <Link 
        href={`/${post.slug}`}
        className="block group"
        aria-label={`Read ${post.title}`}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-link transition-colors">
          {post.title}
        </h2>
      </Link>
      {post.excerpt && (
        <p className="text-gray-600 text-base md:text-lg mb-4 leading-relaxed">
          {post.excerpt}
        </p>
      )}
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <time 
          dateTime={post.published_at || post.created_at}
          className="font-medium"
        >
          {formatDate(post.published_at || post.created_at)}
        </time>
        <span aria-hidden="true">•</span>
        <span>{post.reading_time} min read</span>
      </div>
    </article>
  )
}

