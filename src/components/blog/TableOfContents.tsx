'use client'

import { useState } from 'react'

interface Heading {
  id: string
  text: string
  level: number
}

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [open, setOpen] = useState(false)

  if (headings.length === 0) return null

  const list = (
    <nav className="space-y-1">
      {headings.map(h => (
        <a
          key={h.id}
          href={`#${h.id}`}
          className={`block text-sm hover:text-wine transition-colors ${
            h.level === 3 ? 'pl-4 text-text-secondary' : 'text-text font-medium'
          }`}
        >
          {h.text}
        </a>
      ))}
    </nav>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block sticky top-20 w-56 shrink-0">
        <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">Sommaire</p>
        {list}
      </aside>

      {/* Mobile collapsible */}
      <div className="lg:hidden mb-8 border border-border rounded-[var(--radius)] bg-accent">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-text"
        >
          Sommaire
          <svg className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
        {open && <div className="px-4 pb-3">{list}</div>}
      </div>
    </>
  )
}
