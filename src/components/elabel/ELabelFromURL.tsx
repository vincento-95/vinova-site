'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import ELabelContent from './ELabelContent'

function ELabelRenderer() {
  const searchParams = useSearchParams()
  const encoded = searchParams.get('d')

  if (!encoded) {
    return (
      <div className="max-w-md mx-auto text-center py-16 px-4">
        <h1 className="text-xl font-bold text-gray-900 mb-2">E-label non trouvé</h1>
        <p className="text-gray-500 text-sm">Ce lien n&apos;est pas valide ou l&apos;e-label n&apos;existe plus.</p>
      </div>
    )
  }

  try {
    const json = decodeURIComponent(escape(atob(encoded)))
    const data = JSON.parse(json)

    // Reconstruct full data from compact format
    const wine = {
      name: data.n,
      vintage: data.v,
      appellation: data.a,
      alcohol_content: data.al,
      grape_varieties: data.g || [],
      photo: data.p || null,
    }

    const elabel = {
      ingredients: (data.i || []).map((i: any) => ({
        id: i.id,
        name: i.n,
        code: i.c || undefined,
        category: i.cat,
        isAllergen: i.al,
        allergenType: i.at || undefined,
      })),
      nutrition: data.nu,
      allergens: data.ag || [],
      fining_agents: (data.i || [])
        .filter((i: any) => i.cat === 'agent_collage')
        .map((i: any) => i.n),
      languages: data.l || ['fr'],
    }

    return (
      <div className="max-w-md mx-auto px-4 py-6">
        <ELabelContent wine={wine} elabel={elabel} />
      </div>
    )
  } catch {
    return (
      <div className="max-w-md mx-auto text-center py-16 px-4">
        <h1 className="text-xl font-bold text-gray-900 mb-2">Erreur</h1>
        <p className="text-gray-500 text-sm">Impossible de lire les données de cet e-label.</p>
      </div>
    )
  }
}

export default function ELabelFromURL() {
  return (
    <Suspense fallback={<div className="max-w-md mx-auto text-center py-16"><p className="text-gray-500">Chargement...</p></div>}>
      <ELabelRenderer />
    </Suspense>
  )
}
