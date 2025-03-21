import ReactMarkdown from 'react-markdown'
import { getFiles, getContentBySlug } from '../../lib/markdown'

export default function BlogPost({ post }) {
  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
          {post.date && (
            <div className="text-gray-500">
              {new Date(post.date).toLocaleDateString()}
            </div>
          )}
        </header>
        
        {post.thumbnail && (
          <div className="mb-8">
            <img 
              src={post.thumbnail} 
              alt={post.title} 
              className="w-full max-h-96 object-cover rounded-lg"
            />
          </div>
        )}
        
        <div className="prose max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  )
}

export async function getStaticPaths() {
  const posts = getFiles('content/blog')
  
  return {
    paths: posts,
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const post = getContentBySlug('content/blog', params.slug)
  
  if (!post) {
    return {
      notFound: true,
    }
  }
  
  return {
    props: {
      post,
    },
  }
}
