interface CalloutProps {
  type?: 'info' | 'warning' | 'tip'
  children: React.ReactNode
}

const STYLES = {
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: 'ℹ️',
    text: 'text-blue-900',
  },
  warning: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    icon: '⚠️',
    text: 'text-orange-900',
  },
  tip: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    icon: '💡',
    text: 'text-green-900',
  },
}

export default function Callout({ type = 'info', children }: CalloutProps) {
  const s = STYLES[type]

  return (
    <div className={`not-prose my-6 ${s.bg} border ${s.border} rounded-[var(--radius)] px-4 py-4 flex gap-3`}>
      <span className="text-lg leading-none mt-0.5">{s.icon}</span>
      <div className={`text-sm leading-relaxed ${s.text}`}>{children}</div>
    </div>
  )
}
