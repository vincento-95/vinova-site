import { MDXRemote } from 'next-mdx-remote/rsc'
import BlogCTA from './BlogCTA'
import Callout from './Callout'
import KeyFigure from './KeyFigure'

const components = {
  CTA: BlogCTA,
  Callout,
  KeyFigure,
  h1: ({ children, ...props }: any) => {
    const text = typeof children === 'string' ? children : ''
    const id = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    return <h1 id={id} className="text-3xl font-bold text-text mt-10 mb-4" {...props}>{children}</h1>
  },
  h2: ({ children, ...props }: any) => {
    const text = typeof children === 'string' ? children : ''
    const id = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    return <h2 id={id} className="text-2xl font-bold text-text mt-10 mb-4" {...props}>{children}</h2>
  },
  h3: ({ children, ...props }: any) => {
    const text = typeof children === 'string' ? children : ''
    const id = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    return <h3 id={id} className="text-xl font-bold text-text mt-8 mb-3" {...props}>{children}</h3>
  },
  p: (props: any) => <p className="text-text-secondary leading-relaxed mb-4" {...props} />,
  a: (props: any) => <a className="text-wine underline hover:text-wine-dark" {...props} />,
  strong: (props: any) => <strong className="text-text font-semibold" {...props} />,
  em: (props: any) => <em className="italic" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-6 mb-4 space-y-1" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-6 mb-4 space-y-1" {...props} />,
  li: (props: any) => <li className="text-text-secondary leading-relaxed" {...props} />,
  blockquote: (props: any) => <blockquote className="border-l-4 border-wine pl-4 italic text-text-secondary my-6" {...props} />,
  hr: () => <hr className="border-border my-8" />,
  table: (props: any) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  thead: (props: any) => <thead {...props} />,
  tbody: (props: any) => <tbody {...props} />,
  tr: (props: any) => <tr {...props} />,
  th: (props: any) => <th className="border border-border bg-accent px-3 py-2 text-left font-semibold text-text" {...props} />,
  td: (props: any) => <td className="border border-border px-3 py-2 text-text-secondary" {...props} />,
  img: (props: any) => <img className="rounded-[var(--radius)] my-6" loading="lazy" {...props} />,
  code: (props: any) => <code className="bg-accent text-wine px-1.5 py-0.5 rounded text-sm" {...props} />,
  pre: (props: any) => <pre className="bg-text text-white rounded-[var(--radius)] p-4 overflow-x-auto my-6 text-sm" {...props} />,
}

export default function MDXContent({ source }: { source: string }) {
  return (
    <div className="max-w-none">
      <MDXRemote source={source} components={components} />
    </div>
  )
}
