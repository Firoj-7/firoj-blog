export type Post = {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  published: boolean
  published_at: string | null
  created_at: string
  updated_at: string
  author_id: string | null
  reading_time: number
  upvotes_count: number
  comments_count: number
}

export type Comment = {
  id: string
  post_id: string
  author_name: string
  author_email: string
  content: string
  created_at: string
  updated_at: string
  parent_id: string | null
  is_approved: boolean
}

export type Upvote = {
  id: string
  post_id: string
  user_identifier: string
  created_at: string
}

