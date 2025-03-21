import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Get all files from a directory
export function getFiles(directory) {
  const dirPath = path.join(process.cwd(), directory)
  
  // Check if directory exists
  if (!fs.existsSync(dirPath)) {
    return []
  }
  
  const fileNames = fs.readdirSync(dirPath)
  return fileNames.map(fileName => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, '')
      }
    }
  })
}

// Get all content data for listing pages
export function getAllContent(directory) {
  const dirPath = path.join(process.cwd(), directory)
  
  // Check if directory exists
  if (!fs.existsSync(dirPath)) {
    return []
  }
  
  const fileNames = fs.readdirSync(dirPath)
  const allContent = fileNames.map(fileName => {
    // Remove ".md" from file name to get slug
    const slug = fileName.replace(/\.md$/, '')
    
    // Read markdown file as string
    const fullPath = path.join(dirPath, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    
    // Use gray-matter to parse the post metadata section
    const { data } = matter(fileContents)
    
    // Ensure date is serializable
    const serializedData = { ...data };
    if (serializedData.date instanceof Date) {
      serializedData.date = serializedData.date.toISOString();
    }
    
    // Combine the data with the slug
    return {
      slug,
      ...serializedData
    }
  })
  
  // Sort content by date if it exists
  return allContent.sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date) - new Date(a.date)
    }
    return 0
  })
}

// Get content for a single page or post
export function getContentBySlug(directory, slug) {
  const fullPath = path.join(process.cwd(), directory, `${slug}.md`)
  
  // Check if file exists
  if (!fs.existsSync(fullPath)) {
    return null
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  
  // Use gray-matter to parse the post metadata section
  const { data, content } = matter(fileContents)
  
  // Combine the data with the slug and content
  // Convert date to ISO string if it exists to ensure it's serializable
  const serializedData = { ...data };
  if (serializedData.date instanceof Date) {
    serializedData.date = serializedData.date.toISOString();
  }
  
  return {
    slug,
    content,
    ...serializedData
  }
}
