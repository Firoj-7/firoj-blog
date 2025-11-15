import { getPublishedPosts } from '@/lib/actions/posts'
import Layout from '@/components/Layout'
import PostList from '@/components/PostList'

export const metadata = {
  title: 'Home',
  description: 'A minimalist personal blogging platform',
  openGraph: {
    title: 'Personal Blog',
    description: 'A minimalist personal blogging platform',
    type: 'website',
  },
}

export default async function Home() {
  const posts = await getPublishedPosts()

  return (
    <Layout>
      <PostList posts={posts} />
    </Layout>
  )
}

