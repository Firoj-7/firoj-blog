import { getApprovedComments } from '@/lib/actions/comments'
import { formatDate } from '@/lib/utils'
import type { Comment } from '@/types/database'

interface CommentsListProps {
  postId: string
}

export default async function CommentsList({ postId }: CommentsListProps) {
  const comments = await getApprovedComments(postId)

  if (comments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No comments yet. Be the first to comment!</p>
      </div>
    )
  }

  // Group comments by parent_id
  const topLevelComments = comments.filter((c) => !c.parent_id)
  const repliesMap = new Map<string, Comment[]>()
  
  comments.forEach((comment) => {
    if (comment.parent_id) {
      if (!repliesMap.has(comment.parent_id)) {
        repliesMap.set(comment.parent_id, [])
      }
      repliesMap.get(comment.parent_id)!.push(comment)
    }
  })

  return (
    <div className="space-y-6">
      {topLevelComments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          replies={repliesMap.get(comment.id) || []}
        />
      ))}
    </div>
  )
}

function CommentItem({ comment, replies }: { comment: Comment; replies: Comment[] }) {
  return (
    <div className="border-l-2 border-gray-200 pl-4">
      <div className="mb-2">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-gray-900">{comment.author_name}</span>
          <span className="text-sm text-gray-500">
            {formatDate(comment.created_at)}
          </span>
        </div>
        <p className="text-gray-700 leading-relaxed">{comment.content}</p>
      </div>
      {replies.length > 0 && (
        <div className="mt-4 ml-4 space-y-4">
          {replies.map((reply) => (
            <div key={reply.id} className="border-l-2 border-gray-100 pl-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-gray-900">{reply.author_name}</span>
                <span className="text-sm text-gray-500">
                  {formatDate(reply.created_at)}
                </span>
              </div>
              <p className="text-gray-700 leading-relaxed">{reply.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

