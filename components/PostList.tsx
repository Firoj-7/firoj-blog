import PostCard from './PostCard'
import type { Post } from '@/types/database'

interface PostListProps {
  posts: Post[]
}

export default function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-16" role="status" aria-live="polite">
        <p className="text-gray-500 text-lg">No posts yet. Check back soon!</p>
      </div>
    )
  }

  return (
    <div className="space-y-12" role="list">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}

