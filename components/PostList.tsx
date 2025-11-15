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
    <div role="list">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      
      {/* Pagination - Simple version for now */}
      {posts.length > 0 && (
        <div className="mt-12 flex justify-start">
          <div className="bg-blue-600 text-white w-8 h-8 rounded flex items-center justify-center text-sm font-medium">
            1
          </div>
        </div>
      )}
    </div>
  )
}

