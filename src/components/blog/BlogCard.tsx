import Link from 'next/link'
import type { BlogPostMeta } from '@/lib/blog'

export default function BlogCard({ post }: { post: BlogPostMeta }) {
  const formattedDate = new Date(post.date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-surface border border-border rounded-[var(--radius-lg)] overflow-hidden hover:shadow-[var(--shadow-card-lg)] transition-shadow"
    >
      {post.image && (
        <div className="aspect-[16/9] overflow-hidden bg-accent">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-3 text-xs text-text-secondary mb-2">
          <time dateTime={post.date}>{formattedDate}</time>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>
        <h2 className="text-lg font-bold text-text group-hover:text-wine transition-colors mb-2 line-clamp-2">
          {post.title}
        </h2>
        <p className="text-sm text-text-secondary line-clamp-2 mb-3">
          {post.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <span key={tag} className="text-xs bg-accent text-text-secondary px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
