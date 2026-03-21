import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import ELabelContent from '@/components/elabel/ELabelContent'

interface PageProps {
  params: Promise<{ slug: string }>
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function WineELabelPage({ params }: PageProps) {
  const { slug } = await params

  const { data, error } = await supabase
    .from('elabels')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) notFound()

  const wine = {
    name: data.wine_name,
    vintage: data.vintage,
    appellation: data.appellation,
    alcohol_content: data.alcohol_content,
    grape_varieties: data.grape_varieties || [],
    photo: data.photo_url || null,
  }

  const elabel = {
    ingredients: data.ingredients || [],
    nutrition: data.nutrition || {},
    allergens: data.allergens || [],
    fining_agents: (data.ingredients || [])
      .filter((i: any) => i.category === 'agent_collage')
      .map((i: any) => i.name),
    languages: data.languages || ['fr'],
  }

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '1.5rem 1rem' }}>
      <ELabelContent wine={wine} elabel={elabel} />
    </div>
  )
}
