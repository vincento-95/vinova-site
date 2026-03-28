import Link from 'next/link'

interface CTAProps {
  title?: string
  description?: string
  buttonText?: string
  buttonLink?: string
}

export default function BlogCTA({
  title = "Générez votre fiche technique + E-Label en 30 secondes",
  description = "Fiche technique + E-Label + QR code. Une seule saisie.",
  buttonText = "Essayer gratuitement",
  buttonLink = "/#contact",
}: CTAProps) {
  return (
    <div className="not-prose my-8 bg-wine rounded-[var(--radius-lg)] p-6 md:p-8 text-center">
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-white/80 text-sm mb-5">{description}</p>
      <Link
        href={buttonLink}
        className="inline-block bg-white text-wine font-semibold px-6 py-3 rounded-[var(--radius)] hover:bg-gray-100 transition"
      >
        {buttonText}
      </Link>
    </div>
  )
}
