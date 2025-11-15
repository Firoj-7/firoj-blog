'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Editor from './Editor'
import { generateSlug } from '@/lib/utils'
import { createPost, updatePost, deletePost } from '@/lib/actions/posts'
import { validatePostData } from '@/lib/validation'
import type { Post } from '@/types/database'

interface PostEditorProps {
  post?: Post
}

export default function PostEditor({ post }: PostEditorProps) {
  const router = useRouter()
  const [title, setTitle] = useState(post?.title || '')
  const [slug, setSlug] = useState(post?.slug || '')
  const [content, setContent] = useState(post?.content || '')
  const [excerpt, setExcerpt] = useState(post?.excerpt || '')
  const [published, setPublished] = useState(post?.published || false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (!post && title) {
      const generatedSlug = generateSlug(title)
      setSlug(generatedSlug)
    }
  }, [title, post])

  const handleSave = async (publish: boolean = false) => {
    setError('')
    setSuccess('')

    // Validate form data
    const validation = validatePostData({
      title,
      slug: slug || undefined,
      content,
      excerpt: excerpt || undefined,
    })

    if (!validation.valid) {
      const firstError = Object.values(validation.errors)[0]
      setError(firstError || 'Please check your input')
      return
    }

    setSaving(true)

    const formData = {
      title: title.trim(),
      slug: slug || undefined,
      content: content.trim(),
      excerpt: excerpt.trim() || undefined,
      published: publish || published,
    }

    try {
      let result
      if (post) {
        result = await updatePost(post.id, formData)
      } else {
        result = await createPost(formData)
      }

      if (result.success) {
        setSuccess(publish ? 'Post published successfully!' : 'Draft saved successfully!')
        setTimeout(() => {
          router.push('/admin')
          router.refresh()
        }, 1000)
      } else {
        setError(result.error || 'Failed to save post')
        setSaving(false)
      }
    } catch (err: any) {
      setError(err.message || 'Failed to save post')
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!post) return

    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return
    }

    setSaving(true)
    setError('')

    const result = await deletePost(post.id)

    if (result.success) {
      router.push('/admin')
      router.refresh()
    } else {
      setError(result.error || 'Failed to delete post')
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md" role="alert">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md" role="alert">
          {success}
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Title *
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-link focus:border-transparent transition-colors"
          placeholder="Enter post title"
          aria-required="true"
        />
      </div>

      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
          Slug
        </label>
        <input
          id="slug"
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-link focus:border-transparent transition-colors"
          placeholder="url-friendly-slug"
        />
        <p className="mt-1 text-xs text-gray-500">Leave empty to auto-generate from title</p>
      </div>

      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
          Excerpt (optional)
        </label>
        <textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={3}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-link focus:border-transparent transition-colors resize-y"
          placeholder="Brief description of the post"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Content *
        </label>
        <Editor content={content} onChange={setContent} />
      </div>

      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-md">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="w-4 h-4 text-link focus:ring-link border-gray-300 rounded"
            aria-label="Publish post"
          />
          <span className="text-sm font-medium text-gray-700">Published</span>
        </label>
      </div>

      <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200">
        <button
          onClick={() => handleSave(false)}
          disabled={saving}
          className="px-6 py-2.5 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-link focus:ring-offset-2"
          aria-label="Save as draft"
        >
          {saving ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin">⏳</span> Saving...
            </span>
          ) : (
            'Save Draft'
          )}
        </button>
        <button
          onClick={() => handleSave(true)}
          disabled={saving}
          className="px-6 py-2.5 bg-foreground text-white rounded-md hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity focus:outline-none focus:ring-2 focus:ring-link focus:ring-offset-2"
          aria-label="Publish post"
        >
          {saving ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin">⏳</span> Publishing...
            </span>
          ) : (
            'Publish'
          )}
        </button>
        {post && (
          <button
            onClick={handleDelete}
            disabled={saving}
            className="px-6 py-2.5 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ml-auto focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            aria-label="Delete post"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  )
}

