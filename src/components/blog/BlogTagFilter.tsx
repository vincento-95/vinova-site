'use client'

import { useState } from 'react'

export default function BlogTagFilter({ tags }: { tags: string[] }) {
  const [active, setActive] = useState<string | null>(null)

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => setActive(null)}
        className={`text-sm px-3 py-1.5 rounded-full transition ${
          active === null
            ? 'bg-wine text-white'
            : 'bg-accent text-text-secondary hover:bg-border'
        }`}
      >
        Tous
      </button>
      {tags.map(tag => (
        <button
          key={tag}
          onClick={() => setActive(active === tag ? null : tag)}
          className={`text-sm px-3 py-1.5 rounded-full transition ${
            active === tag
              ? 'bg-wine text-white'
              : 'bg-accent text-text-secondary hover:bg-border'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}
