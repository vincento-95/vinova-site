'use client'

import { useEffect, useState } from 'react'
import ELabelContent from './ELabelContent'

export default function ELabelClientPage({ slug }: { slug: string }) {
  const [data, setData] = useState<any>(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(`elabel-${slug}`)
    if (stored) {
      setData(JSON.parse(stored))
    } else {
      setNotFound(true)
    }
  }, [slug])

  if (notFound) {
    return (
      <div className="max-w-md mx-auto text-center py-16 px-4">
        <h1 className="text-xl font-bold text-gray-900 mb-2">E-label non trouvé</h1>
        <p className="text-gray-500 text-sm">Ce lien n&apos;est pas valide ou l&apos;e-label n&apos;existe plus.</p>
      </div>
    )
  }

  if (!data) {
    return <div className="max-w-md mx-auto text-center py-16"><p className="text-gray-500">Chargement...</p></div>
  }

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <ELabelContent wine={data.wine} elabel={data.elabel} />
    </div>
  )
}
