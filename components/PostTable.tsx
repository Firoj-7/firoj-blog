import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import type { Post } from '@/types/database'

interface PostTableProps {
  posts: Post[]
}

export default function PostTable({ posts }: PostTableProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12 border border-gray-200 rounded-md">
        <p className="text-gray-500">No posts yet. Create your first post!</p>
      </div>
    )
  }

  return (
    <div className="border border-gray-200 rounded-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
              Title
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
              Status
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
              Created
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {posts.map((post) => (
            <tr key={post.id} className="hover:bg-gray-50">
              <td className="px-4 py-3">
                <Link
                  href={`/admin/edit/${post.slug}`}
                  className="text-link hover:underline font-medium"
                >
                  {post.title}
                </Link>
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-block px-2 py-1 text-xs rounded ${
                    post.published
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {post.published ? 'Published' : 'Draft'}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {formatDate(post.created_at)}
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-3">
                  <Link
                    href={`/admin/edit/${post.slug}`}
                    className="text-link hover:underline text-sm"
                  >
                    Edit
                  </Link>
                  {post.published && (
                    <Link
                      href={`/${post.slug}`}
                      target="_blank"
                      className="text-link hover:underline text-sm"
                    >
                      View
                    </Link>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

