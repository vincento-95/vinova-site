'use client'

import { useState } from 'react'

interface FAQItem {
  q: string
  a: string
}

export default function BlogFAQ({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div>
      {items.map((item, i) => (
        <div key={i} className="blog-faq-item">
          <button
            className="blog-faq-q"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            {item.q}
            <span className={`blog-faq-icon ${openIndex === i ? 'open' : ''}`}>+</span>
          </button>
          {openIndex === i && (
            <div className="blog-faq-a">{item.a}</div>
          )}
        </div>
      ))}
    </div>
  )
}
