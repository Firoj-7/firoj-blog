'use client'

import { useState, useEffect } from 'react'
import { toggleUpvote, checkUpvoteStatus } from '@/lib/actions/upvotes'

interface UpvoteButtonProps {
  postId: string
  upvotesCount: number
}

export default function UpvoteButton({ postId, upvotesCount: initialCount }: UpvoteButtonProps) {
  const [isUpvoted, setIsUpvoted] = useState(false)
  const [upvotesCount, setUpvotesCount] = useState(initialCount)
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    async function checkStatus() {
      const status = await checkUpvoteStatus(postId)
      setIsUpvoted(status)
      setChecking(false)
    }
    checkStatus()
  }, [postId])

  const handleUpvote = async () => {
    if (loading || checking) return

    setLoading(true)
    const result = await toggleUpvote(postId)

    if (result.success) {
      setIsUpvoted(result.isUpvoted)
      // Use the actual count from the server if available, otherwise update locally
      if (result.upvotesCount !== undefined) {
        setUpvotesCount(result.upvotesCount)
      } else {
        setUpvotesCount((prev) => result.isUpvoted ? prev + 1 : prev - 1)
      }
    }

    setLoading(false)
  }

  if (checking) {
    return (
      <button
        disabled
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 disabled:opacity-50"
      >
        <span>↑</span>
        <span>{upvotesCount}</span>
      </button>
    )
  }

  return (
    <button
      onClick={handleUpvote}
      disabled={loading}
      className={`flex items-center gap-2 px-4 py-2 border rounded-md transition-colors ${
        isUpvoted
          ? 'bg-blue-50 border-blue-300 text-blue-600 hover:bg-blue-100'
          : 'border-gray-300 text-gray-600 hover:bg-gray-50'
      } disabled:opacity-50`}
      aria-label={isUpvoted ? 'Remove upvote' : 'Upvote this post'}
    >
      <span className={isUpvoted ? 'text-blue-600' : ''}>↑</span>
      <span>{upvotesCount}</span>
    </button>
  )
}

