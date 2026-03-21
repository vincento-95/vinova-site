import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BlogCard from '@/components/blog/BlogCard'
import { getAllPosts, getAllTags } from '@/lib/blog'
import BlogTagFilter from '@/components/blog/BlogTagFilter'

export const metadata: Metadata = {
  title: 'Blog FicheVin — Guides pratiques pour la documentation de vos vins',
  description:
    'Articles, guides et actualités sur la réglementation viticole UE, les e-labels, les fiches techniques et le marketing du vin.',
  openGraph: {
    title: 'Blog FicheVin — Guides pratiques pour la documentation de vos vins',
    description:
      'Articles, guides et actualités sur la réglementation viticole UE, les e-labels, les fiches techniques et le marketing du vin.',
    type: 'website',
    locale: 'fr_FR',
    url: 'https://fichevin.fr/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog FicheVin',
    description: 'Guides pratiques pour la documentation de vos vins',
  },
  alternates: {
    canonical: 'https://fichevin.fr/blog',
  },
}

export default function BlogPage() {
  const posts = getAllPosts()
  const tags = getAllTags()

  return (
    <>
      <Header />
      <main className="pt-14 min-h-screen bg-bg">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-text mb-2">Blog FicheVin</h1>
            <p className="text-text-secondary">
              Guides pratiques pour la documentation de vos vins
            </p>
          </div>

          {tags.length > 0 && <BlogTagFilter tags={tags} />}

          {posts.length === 0 ? (
            <div className="text-center py-16 bg-surface border border-border rounded-[var(--radius-lg)]">
              <p className="text-text-secondary">Aucun article pour le moment. Revenez bientôt !</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {posts.map(post => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
