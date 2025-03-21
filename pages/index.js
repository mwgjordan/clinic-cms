import Head from 'next/head'
import Link from 'next/link'
import Header from '@components/Header'
import Footer from '@components/Footer'
import { getAllContent } from '../lib/markdown'

export default function Home({ latestPosts }) {
  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>Clinic CMS - Healthcare Services</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="py-8">
        <Header title="Welcome to Our Clinic" />
        
        <section className="my-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Quality Healthcare for Your Family</h2>
          <p className="text-xl max-w-3xl mx-auto">
            We provide comprehensive healthcare services with a focus on patient comfort and well-being.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/about" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
              About Us
            </Link>
            <Link href="/blog" className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition">
              Our Blog
            </Link>
          </div>
        </section>
        
        {latestPosts.length > 0 && (
          <section className="my-12">
            <h2 className="text-2xl font-bold mb-6">Latest from Our Blog</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post) => (
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
                    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
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
            <div className="mt-6 text-center">
              <Link href="/blog" className="text-blue-600 hover:underline">
                View all posts
              </Link>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const allPosts = getAllContent('content/blog')
  
  // Convert Date objects to ISO strings for serialization
  const latestPosts = allPosts.slice(0, 3).map(post => ({
    ...post,
    date: post.date ? post.date.toISOString() : null,
  }))
  
  return {
    props: {
      latestPosts,
    },
  }
}
