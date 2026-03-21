interface KeyFigureProps {
  number: string
  label: string
}

export default function KeyFigure({ number, label }: KeyFigureProps) {
  return (
    <div className="not-prose my-8 text-center">
      <div className="text-4xl md:text-5xl font-bold text-wine">{number}</div>
      <p className="text-text-secondary text-sm mt-2">{label}</p>
    </div>
  )
}
