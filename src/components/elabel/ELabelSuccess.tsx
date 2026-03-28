'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState, useRef } from 'react'
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react'
import Link from 'next/link'

function SuccessContent() {
  const searchParams = useSearchParams()
  const slug = searchParams.get('slug')
  const [wineName, setWineName] = useState('')
  const [loading, setLoading] = useState(true)
  const [paid, setPaid] = useState(false)
  const qrCanvasRef = useRef<HTMLDivElement>(null)
  const qrSvgRef = useRef<HTMLDivElement>(null)

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
  const elabelUrl = `${baseUrl}/wines/${slug}`

  useEffect(() => {
    if (!slug) return

    // Mark as paid (backup in case webhook is slow)
    fetch(`/api/mark-paid`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug }),
    })

    // Fetch wine name
    fetch(`/api/elabel-info?slug=${slug}`)
      .then(r => r.json())
      .then(data => {
        setWineName(data.wine_name || 'Votre vin')
        setPaid(true)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [slug])

  const downloadPNG = () => {
    const canvas = qrCanvasRef.current?.querySelector('canvas')
    if (!canvas) return
    const newCanvas = document.createElement('canvas')
    const ctx = newCanvas.getContext('2d')!
    newCanvas.width = canvas.width + 40
    newCanvas.height = canvas.height + 80
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, newCanvas.width, newCanvas.height)
    ctx.fillStyle = '#333333'
    ctx.font = '14px Arial, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('Ingrédients et informations nutritionnelles', newCanvas.width / 2, 25)
    ctx.drawImage(canvas, 20, 40)
    const link = document.createElement('a')
    link.download = `qrcode-${slug}.png`
    link.href = newCanvas.toDataURL('image/png')
    link.click()
  }

  const downloadSVG = () => {
    const svgElement = qrSvgRef.current?.querySelector('svg')
    if (!svgElement) return
    const fullSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="440" viewBox="0 0 400 440">
  <rect width="400" height="440" fill="white"/>
  <text x="200" y="25" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="#333">Ingrédients et informations nutritionnelles</text>
  <g transform="translate(28, 40)">${svgElement.outerHTML}</g>
</svg>`
    const blob = new Blob([fullSvg], { type: 'image/svg+xml' })
    const link = document.createElement('a')
    link.download = `qrcode-${slug}.svg`
    link.href = URL.createObjectURL(blob)
    link.click()
  }

  if (!slug) {
    return (
      <div className="text-center py-16">
        <p className="text-text-secondary">Lien invalide.</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="text-center py-16">
        <p className="text-text-secondary">Vérification du paiement...</p>
      </div>
    )
  }

  return (
    <div className="text-center">
      <div className="text-5xl mb-4">✅</div>
      <h1 className="text-2xl font-bold text-text mb-2">E-Label créé avec succès !</h1>
      <p className="text-text-secondary mb-8">{wineName}</p>

      {/* QR Code */}
      <div className="bg-surface border border-border rounded-[var(--radius-lg)] p-8 inline-block mb-6">
        <p className="text-xs text-text-secondary mb-4 font-medium">
          Ingrédients et informations nutritionnelles
        </p>
        <div ref={qrCanvasRef}>
          <QRCodeCanvas value={elabelUrl} size={220} fgColor="#722F37" bgColor="#FFFFFF" level="M" />
        </div>
        <div ref={qrSvgRef} className="hidden">
          <QRCodeSVG value={elabelUrl} size={344} fgColor="#722F37" bgColor="#FFFFFF" level="M" />
        </div>
      </div>

      {/* Download buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button onClick={downloadPNG} className="rounded-[var(--radius)] bg-wine px-6 py-3 text-white font-medium hover:bg-wine-dark transition">
          Télécharger PNG
        </button>
        <button onClick={downloadSVG} className="rounded-[var(--radius)] border border-wine text-wine px-6 py-3 font-medium hover:bg-wine hover:text-white transition">
          Télécharger SVG
        </button>
      </div>

      <Link href={`/wines/${slug}`} target="_blank" className="text-wine hover:underline font-medium">
        Voir la page E-Label →
      </Link>

      <div className="bg-accent rounded-[var(--radius)] p-5 text-left text-sm text-text-secondary mt-8 max-w-lg mx-auto">
        <p className="font-medium text-text mb-2">Conseils pour vos étiquettes</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Utilisez le SVG pour une qualité optimale à l&apos;impression</li>
          <li>Taille minimum recommandée : 2 cm × 2 cm</li>
          <li>Ajoutez le texte &quot;Ingrédients et informations nutritionnelles&quot; au-dessus du QR code</li>
          <li>Testez le QR code après impression</li>
        </ul>
      </div>
    </div>
  )
}

export default function ELabelSuccess() {
  return (
    <Suspense fallback={<div className="text-center py-16"><p className="text-text-secondary">Chargement...</p></div>}>
      <SuccessContent />
    </Suspense>
  )
}
