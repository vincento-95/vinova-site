import ELabelClientPage from '@/components/elabel/ELabelClientPage'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function WineELabelPage({ params }: PageProps) {
  const { slug } = await params
  return <ELabelClientPage slug={slug} />
}
