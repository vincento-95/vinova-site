import Link from 'next/link'
import ELabelArticle from './articles/ELabelArticle'

const ARTICLES: Record<string, React.ComponentType> = {
  'e-label-vin-reglementation-ue': ELabelArticle,
}

export default function ArticleContent({ slug }: { slug: string }) {
  const Article = ARTICLES[slug]
  if (!Article) return <p className="text-text-secondary">Contenu non disponible.</p>
  return <Article />
}
