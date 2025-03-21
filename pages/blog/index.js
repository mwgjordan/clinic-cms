import Link from 'next/link'
import { getAllContent } from '../../lib/markdown'

export default function BlogIndex({ posts }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      
      {posts.length === 0 && (
        <p>No blog posts found.</p>
      )}
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div key={post.slug} className="border rounded-lg overflow-hidden shadow-md">
            {post.thumbnail && (
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.thumbnail} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <div className="text-sm text-gray-500 mb-4">
                {post.date && new Date(post.date).toLocaleDateString()}
              </div>
              <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:underline">
                Read more
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const allPosts = getAllContent('content/blog')
  
  // Convert Date objects to ISO strings for serialization
  const posts = allPosts.map(post => ({
    ...post,
    date: post.date ? post.date.toISOString() : null,
  }))
  
  return {
    props: {
      posts,
    },
  }
}
