import ReactMarkdown from 'react-markdown'
import { getFiles, getContentBySlug } from '../lib/markdown'

export default function Page({ page }) {
  if (!page) {
    return <div>Page not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{page.title}</h1>
        </header>
        
        {page.thumbnail && (
          <div className="mb-8">
            <img 
              src={page.thumbnail} 
              alt={page.title} 
              className="w-full max-h-96 object-cover rounded-lg"
            />
          </div>
        )}
        
        <div className="prose max-w-none">
          <ReactMarkdown>{page.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  )
}

export async function getStaticPaths() {
  const pages = getFiles('content/pages')
  
  return {
    paths: pages,
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const page = getContentBySlug('content/pages', params.slug)
  
  if (!page) {
    return {
      notFound: true,
    }
  }
  
  return {
    props: {
      page,
    },
  }
}
