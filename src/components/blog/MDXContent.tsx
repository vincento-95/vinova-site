import { MDXRemote } from 'next-mdx-remote/rsc'
import BlogCTA from './BlogCTA'
import Callout from './Callout'
import KeyFigure from './KeyFigure'

const components = {
  CTA: BlogCTA,
  Callout,
  KeyFigure,
  h2: ({ children, ...props }: any) => {
    const text = typeof children === 'string' ? children : ''
    const id = text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    return <h2 id={id} {...props}>{children}</h2>
  },
  h3: ({ children, ...props }: any) => {
    const text = typeof children === 'string' ? children : ''
    const id = text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    return <h3 id={id} {...props}>{children}</h3>
  },
}

export default function MDXContent({ source }: { source: string }) {
  return (
    <div className="prose prose-lg max-w-none
      prose-headings:text-text prose-headings:font-bold
      prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
      prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
      prose-p:text-text-secondary prose-p:leading-relaxed
      prose-a:text-wine prose-a:underline hover:prose-a:text-wine-dark
      prose-strong:text-text
      prose-li:text-text-secondary
      prose-blockquote:border-wine prose-blockquote:text-text-secondary
      prose-img:rounded-[var(--radius)]
    ">
      <MDXRemote source={source} components={components} />
    </div>
  )
}
