import ELabelArticle from './articles/ELabelArticle'
import FicheTechniqueArticle from './articles/FicheTechniqueArticle'

const ARTICLES: Record<string, React.ComponentType> = {
  'e-label-vin-reglementation-ue': ELabelArticle,
  'fiche-technique-vin-modele': FicheTechniqueArticle,
}

export default function ArticleContent({ slug }: { slug: string }) {
  const Article = ARTICLES[slug]
  if (!Article) return <p className="text-text-secondary">Contenu non disponible.</p>
  return <Article />
}
