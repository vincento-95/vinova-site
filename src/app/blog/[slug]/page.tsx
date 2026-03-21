import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getPostBySlug, getAllPosts, getRelatedPosts, extractHeadings } from '@/lib/blog'
import BlogCard from '@/components/blog/BlogCard'
import ArticleContent from '@/components/blog/ArticleContent'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(post => ({ slug: post.slug }))
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
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
    alternates: {
      canonical: `https://fichevin.fr/blog/${post.slug}`,
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const related = getRelatedPosts(post.slug, post.tags, 2)

  const formattedDate = new Date(post.date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
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
      <main className="pt-14 min-h-screen bg-bg">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <article className="mx-auto max-w-3xl px-6 py-12">
          {/* Breadcrumbs */}
          <nav className="text-sm text-text-secondary mb-6">
            <Link href="/" className="hover:text-wine">Accueil</Link>
            <span className="mx-2">›</span>
            <Link href="/blog" className="hover:text-wine">Blog</Link>
            <span className="mx-2">›</span>
            <span className="text-text">{post.title}</span>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.map(tag => (
                <Link key={tag} href="/blog" className="text-xs bg-wine-50 text-wine px-2.5 py-1 rounded-full hover:bg-wine-100 transition">
                  {tag}
                </Link>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-text leading-tight mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-text-secondary">
              <span>{post.author}</span>
              <span>·</span>
              <time dateTime={post.date}>{formattedDate}</time>
              <span>·</span>
              <span>{post.readingTime}</span>
            </div>
          </header>

          {/* Article body */}
          <ArticleContent slug={slug} />

          {/* Bottom CTA */}
          <div className="mt-14 bg-wine rounded-[var(--radius-lg)] p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Mettez-vous en conformité en 2 minutes</h3>
            <p className="text-white/80 text-sm mb-5">FicheVin génère votre e-label conforme UE + votre fiche technique commerciale + votre QR code. Testez gratuitement.</p>
            <Link href="/#contact" className="inline-block bg-white text-wine font-semibold px-6 py-3 rounded-[var(--radius)] hover:bg-gray-100 transition">
              Créer mon e-label gratuit
            </Link>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <section className="mt-16">
              <h2 className="text-xl font-bold text-text mb-6">Articles suggérés</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {related.map(p => <BlogCard key={p.slug} post={p} />)}
              </div>
            </section>
          )}
        </article>
      </main>
      <Footer />
    </>
  )
}
