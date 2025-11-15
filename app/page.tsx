import { getPublishedPosts } from '@/lib/actions/posts'
import Layout from '@/components/Layout'
import PostList from '@/components/PostList'

export const metadata = {
  title: 'Home',
  description: 'Firoj Ansari\'s Blog',
  openGraph: {
    title: 'Firoj Ansari\'s Blog',
    description: 'Firoj Ansari\'s Blog',
    type: 'website',
  },
}

export default async function Home() {
  const posts = await getPublishedPosts()

  return (
    <Layout>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          Firoj Ansari
        </h1>
        <PostList posts={posts} />
      </div>
    </Layout>
  )
}

