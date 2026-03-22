import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  lastModified?: string
  author: string
  tags: string[]
  image?: string
  readingTime: string
  content: string
}

export interface BlogPostMeta {
  slug: string
  title: string
  description: string
  date: string
  lastModified?: string
  author: string
  tags: string[]
  image?: string
  readingTime: string
}

function parseMdxFile(filename: string): BlogPost {
  const filePath = path.join(BLOG_DIR, filename)
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const stats = readingTime(content)

  return {
    slug: data.slug || filename.replace(/\.mdx$/, ''),
    title: data.title || 'Sans titre',
    description: data.description || '',
    date: data.date || new Date().toISOString(),
    lastModified: data.lastModified || undefined,
    author: data.author || 'FicheVin',
    tags: data.tags || [],
    image: data.image || undefined,
    readingTime: data.readingTime || stats.text.replace('read', 'de lecture').replace('min', 'min'),
    content,
  }
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'))

  return files
    .map(f => {
      const post = parseMdxFile(f)
      const { content, ...meta } = post
      return meta
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): BlogPost | null {
  if (!fs.existsSync(BLOG_DIR)) return null

  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'))

  for (const file of files) {
    const post = parseMdxFile(file)
    if (post.slug === slug) return post
  }

  return null
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tags = new Set<string>()
  posts.forEach(p => p.tags.forEach(t => tags.add(t)))
  return Array.from(tags).sort()
}

export function getRelatedPosts(currentSlug: string, tags: string[], limit = 3): BlogPostMeta[] {
  const all = getAllPosts().filter(p => p.slug !== currentSlug)
  const scored = all.map(post => ({
    post,
    score: post.tags.filter(t => tags.includes(t)).length,
  }))
  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, limit).map(s => s.post)
}

export function extractHeadings(content: string): { id: string; text: string; level: number }[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const headings: { id: string; text: string; level: number }[] = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const text = match[2].trim()
    const id = text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    headings.push({ id, text, level: match[1].length })
  }

  return headings
}
