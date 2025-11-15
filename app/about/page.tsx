import Layout from '@/components/Layout'

export const metadata = {
  title: 'About',
  description: 'About this blog',
}

export default function AboutPage() {
  return (
    <Layout>
      <article className="content">
        <h1 className="text-4xl font-bold mb-6">About</h1>
        <div className="prose prose-lg max-w-none">
          <p>
            This is a minimalist personal blogging platform built with Next.js,
            Supabase, and Tailwind CSS. It features a clean design focused on
            excellent typography and readability.
          </p>
          <p>
            The platform is designed to be simple, fast, and focused on content.
            No distractions, just words.
          </p>
        </div>
      </article>
    </Layout>
  )
}

