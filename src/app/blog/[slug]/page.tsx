import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getPostBySlug, getAllPosts, getRelatedPosts } from '@/lib/blog'
import BlogCard from '@/components/blog/BlogCard'
import ArticleContent from '@/components/blog/ArticleContent'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllPosts().map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: 'Article non trouvé' }

  return {
    title: `${post.title} | FicheVin`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      locale: 'fr_FR',
      url: `https://fichevin.fr/blog/${post.slug}`,
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.description },
    alternates: { canonical: `https://fichevin.fr/blog/${post.slug}` },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const related = getRelatedPosts(post.slug, post.tags, 2)

  const formattedDate = new Date(post.date).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { '@type': 'Organization', name: post.author },
    publisher: { '@type': 'Organization', name: 'FicheVin', url: 'https://fichevin.fr' },
    mainEntityOfPage: `https://fichevin.fr/blog/${post.slug}`,
  }

  return (
    <>
      <Header />
      <div className="blog-page" style={{ minHeight: '100vh' }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Breadcrumbs */}
        <div className="article-breadcrumbs" style={{ paddingTop: '56px' }}>
          <Link href="/">Accueil</Link> › <Link href="/blog">Blog</Link> › {post.title.length > 50 ? post.title.slice(0, 50) + '…' : post.title}
        </div>

        {/* Hero */}
        <header className="article-hero">
          <div className="article-tags">
            {post.tags.map(tag => (
              <span key={tag} className="article-tag">{tag}</span>
            ))}
          </div>
          <h1>{post.title}</h1>
          <div className="article-meta">
            <span>Par {post.author}</span>
            <div className="article-meta-dot" />
            <span>{formattedDate}</span>
            <div className="article-meta-dot" />
            <span>{post.readingTime}</span>
          </div>
        </header>

        {/* Article body */}
        <article className="article-body">
          <ArticleContent slug={slug} />
        </article>

        {/* Related */}
        {related.length > 0 && (
          <section style={{ maxWidth: 740, margin: '0 auto', padding: '0 24px 80px' }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1A1A1A', marginBottom: 24 }}>Articles suggérés</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {related.map(p => <BlogCard key={p.slug} post={p} />)}
            </div>
          </section>
        )}
      </div>
      <Footer />
    </>
  )
}
