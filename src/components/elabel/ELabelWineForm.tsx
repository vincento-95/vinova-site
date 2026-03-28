'use client'

import { useState, useRef } from 'react'
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react'
import type { WineColor } from '@/lib/types'
import { calculateNutrition } from '@/lib/nutrition'
import { INGREDIENTS, INGREDIENT_CATEGORIES, getIngredientsByCategory, type IngredientCategory } from '@/lib/ingredients'
import { EU_LANGUAGES, type LanguageCode } from '@/lib/elabel-translations'
import ELabelNutritionPreview from './ELabelNutritionPreview'

const WINE_COLORS: { value: WineColor; label: string }[] = [
  { value: 'rouge', label: 'Rouge' },
  { value: 'blanc', label: 'Blanc' },
  { value: 'rosé', label: 'Rosé' },
  { value: 'mousseux', label: 'Mousseux' },
  { value: 'liquoreux', label: 'Liquoreux' },
]

const STEPS = [
  'Informations du vin',
  'Ingrédients',
  'Prévisualisation',
  'Votre E-Label',
]

export default function ELabelWineForm() {
  const [step, setStep] = useState(0)
  const qrCanvasRef = useRef<HTMLDivElement>(null)
  const qrSvgRef = useRef<HTMLDivElement>(null)

  const [name, setName] = useState('')
  const [vintage, setVintage] = useState<string>('')
  const [appellation, setAppellation] = useState('')
  const [color, setColor] = useState<WineColor>('rouge')
  const [grapeVarieties, setGrapeVarieties] = useState<string[]>([''])
  const [alcoholContent, setAlcoholContent] = useState(13)
  const [residualSugar, setResidualSugar] = useState(2)
  const [totalAcidity, setTotalAcidity] = useState(5)
  const [email, setEmail] = useState('')

  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(['raisins', 'e220'])
  const [languages, setLanguages] = useState<string[]>(['fr'])
  const [slug, setSlug] = useState('')
  const [photo, setPhoto] = useState<string | null>(null)

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      alert('Image trop lourde (max 5 Mo)')
      return
    }
    const reader = new FileReader()
    reader.onload = () => setPhoto(reader.result as string)
    reader.readAsDataURL(file)
  }

  const nutrition = calculateNutrition({ alcoholContent, residualSugar, totalAcidity })
  const selectedIngredientObjects = INGREDIENTS.filter(i => selectedIngredients.includes(i.id))
  const allergens = selectedIngredientObjects.filter(i => i.isAllergen)

  const canNext = () => {
    if (step === 0) return name.trim() !== '' && alcoholContent > 0
    if (step === 1) return selectedIngredients.length > 0
    if (step === 2) return languages.length > 0
    return true
  }

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''

  const [elabelUrl, setElabelUrl] = useState('')

  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState('')

  const handleGenerate = async () => {
    setGenerating(true)
    setError('')

    try {
      const res = await fetch('/api/create-elabel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          vintage: vintage ? parseInt(vintage) : null,
          appellation,
          color,
          grapeVarieties: grapeVarieties.filter(g => g.trim()),
          alcoholContent,
          residualSugar,
          totalAcidity,
          ingredients: selectedIngredientObjects.map(i => ({
            id: i.id, name: i.name, code: i.code, category: i.category,
            isAllergen: i.isAllergen, allergenType: i.allergenType,
          })),
          nutrition,
          allergens: [...new Set(allergens.map(a => a.allergenType!))],
          languages,
          email,
          photo: photo || null,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erreur')

      // Redirect to Stripe Checkout
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setGenerating(false)
    }
  }

  const downloadPNG = () => {
    const canvas = qrCanvasRef.current?.querySelector('canvas')
    if (!canvas) return
    const newCanvas = document.createElement('canvas')
    const ctx = newCanvas.getContext('2d')!
    const padding = 40
    newCanvas.width = canvas.width + 40
    newCanvas.height = canvas.height + padding + 40
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, newCanvas.width, newCanvas.height)
    ctx.fillStyle = '#333333'
    ctx.font = '14px Arial, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('Ingrédients et informations nutritionnelles', newCanvas.width / 2, 25)
    ctx.drawImage(canvas, 20, padding)
    const link = document.createElement('a')
    link.download = `qrcode-${slug}.png`
    link.href = newCanvas.toDataURL('image/png')
    link.click()
  }

  const downloadSVG = () => {
    const svgElement = qrSvgRef.current?.querySelector('svg')
    if (!svgElement) return
    const svgData = svgElement.outerHTML
    const fullSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="440" viewBox="0 0 400 440">
  <rect width="400" height="440" fill="white"/>
  <text x="200" y="25" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="#333">Ingrédients et informations nutritionnelles</text>
  <g transform="translate(28, 40)">${svgData}</g>
</svg>`
    const blob = new Blob([fullSvg], { type: 'image/svg+xml' })
    const link = document.createElement('a')
    link.download = `qrcode-${slug}.svg`
    link.href = URL.createObjectURL(blob)
    link.click()
  }

  const inputClass = "w-full rounded-[var(--radius)] border border-border bg-surface px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-wine focus:border-transparent"

  return (
    <div>
      {/* Step indicator */}
      <div className="flex items-center justify-between mb-8">
        {STEPS.map((label, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition ${
              i === step ? 'bg-wine text-white' : i < step ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'
            }`}>
              {i < step ? '✓' : i + 1}
            </div>
            <span className={`text-sm hidden sm:block whitespace-nowrap ${i === step ? 'text-text font-medium' : 'text-text-secondary'}`}>
              {label}
            </span>
            {i < STEPS.length - 1 && <div className="w-12 h-px bg-border flex-shrink-0" />}
          </div>
        ))}
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-[var(--radius)] px-4 py-3 text-sm">{error}</div>
      )}

      {/* Step 1: General info */}
      {step === 0 && (
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-text mb-1">Votre email <span className="text-text-secondary">(optionnel)</span></label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className={inputClass} placeholder="vous@domaine.fr" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1">Nom du vin <span className="text-red-500">*</span></label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} className={inputClass} placeholder="ex : Château Margaux" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">Millésime</label>
              <input type="number" value={vintage} onChange={e => setVintage(e.target.value)} className={inputClass} placeholder="2022" min={1900} max={2030} />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">Couleur</label>
              <select value={color} onChange={e => setColor(e.target.value as WineColor)} className={inputClass}>
                {WINE_COLORS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1">Appellation</label>
            <input type="text" value={appellation} onChange={e => setAppellation(e.target.value)} className={inputClass} placeholder="ex : Margaux AOC" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1">Cépages</label>
            {grapeVarieties.map((grape, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input type="text" value={grape} onChange={e => { const u = [...grapeVarieties]; u[i] = e.target.value; setGrapeVarieties(u) }} className={`flex-1 ${inputClass}`} placeholder="ex : Cabernet Sauvignon 60%" />
                {grapeVarieties.length > 1 && (
                  <button type="button" onClick={() => setGrapeVarieties(grapeVarieties.filter((_, j) => j !== i))} className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-[var(--radius)]">×</button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => setGrapeVarieties([...grapeVarieties, ''])} className="text-sm text-wine hover:underline">+ Ajouter un cépage</button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">Degré alcool (% vol) <span className="text-red-500">*</span></label>
              <input type="number" step="0.1" value={alcoholContent} onChange={e => setAlcoholContent(parseFloat(e.target.value) || 0)} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">Sucre résiduel (g/L)</label>
              <input type="number" step="0.1" value={residualSugar} onChange={e => setResidualSugar(parseFloat(e.target.value) || 0)} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">Acidité totale (g/L)</label>
              <input type="number" step="0.1" value={totalAcidity} onChange={e => setTotalAcidity(parseFloat(e.target.value) || 0)} className={inputClass} />
            </div>
          </div>
          {/* Photo */}
          <div>
            <label className="block text-sm font-medium text-text mb-1">Photo du vin <span className="text-text-secondary">(optionnel)</span></label>
            <div className="flex items-start gap-4">
              <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-border rounded-[var(--radius)] p-6 hover:border-wine cursor-pointer transition">
                <svg className="w-8 h-8 text-text-secondary mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                </svg>
                <span className="text-sm text-text-secondary">Cliquez pour ajouter une photo</span>
                <span className="text-xs text-text-secondary mt-1">JPG, PNG — max 5 Mo</span>
                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
              </label>
              {photo && (
                <div className="relative">
                  <img src={photo} alt="Aperçu" className="w-24 h-32 object-cover rounded-[var(--radius)] border border-border" />
                  <button type="button" onClick={() => setPhoto(null)} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600">×</button>
                </div>
              )}
            </div>
          </div>

          <div className="bg-accent rounded-[var(--radius)] p-4">
            <p className="text-sm font-medium text-text mb-2">Aperçu nutritionnel (pour 100 ml)</p>
            <p className="text-sm text-text-secondary">
              Énergie : {nutrition.energyKj} kJ / {nutrition.energyKcal} kcal · Glucides : {nutrition.carbohydrates.toFixed(1).replace('.', ',')} g · Sucres : {nutrition.sugars.toFixed(1).replace('.', ',')} g
            </p>
          </div>
        </div>
      )}

      {/* Step 2: Ingredients */}
      {step === 1 && (
        <div className="space-y-6">
          <p className="text-sm text-text-secondary">
            Sélectionnez les ingrédients utilisés dans la vinification. Les <span className="font-bold underline">allergènes</span> sont mis en évidence.
          </p>
          {(Object.entries(getIngredientsByCategory()) as [IngredientCategory, typeof INGREDIENTS][]).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-text mb-2">{INGREDIENT_CATEGORIES[category]}</h3>
              <div className="space-y-1">
                {items.map(ingredient => (
                  <label key={ingredient.id} className={`flex items-center gap-3 px-3 py-2 rounded-[var(--radius)] hover:bg-accent cursor-pointer ${ingredient.isAllergen ? 'border border-orange-200 bg-orange-50/50' : ''}`}>
                    <input type="checkbox" checked={selectedIngredients.includes(ingredient.id)}
                      onChange={e => { if (e.target.checked) setSelectedIngredients(p => [...p, ingredient.id]); else setSelectedIngredients(p => p.filter(id => id !== ingredient.id)) }}
                      className="rounded border-border text-wine focus:ring-wine" />
                    <span className={`text-sm ${ingredient.isAllergen ? 'font-bold' : ''}`}>
                      {ingredient.name}{ingredient.code && <span className="text-text-secondary"> ({ingredient.code})</span>}
                    </span>
                    {ingredient.isAllergen && <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">ALLERGÈNE — {ingredient.allergenType}</span>}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Step 3: Preview + Languages */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-text mb-2">Langues de l&apos;E-Label</h3>
            <p className="text-sm text-text-secondary mb-3">Sélectionnez les langues des pays où le vin est commercialisé.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {(Object.entries(EU_LANGUAGES) as [LanguageCode, string][]).map(([code, label]) => (
                <label key={code} className="flex items-center gap-2 px-3 py-2 rounded-[var(--radius)] border border-border hover:bg-accent cursor-pointer text-sm">
                  <input type="checkbox" checked={languages.includes(code)}
                    onChange={e => { if (e.target.checked) setLanguages(p => [...p, code]); else setLanguages(p => p.filter(l => l !== code)) }}
                    className="rounded border-border text-wine focus:ring-wine" />
                  {label}
                </label>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text mb-2">Prévisualisation</h3>
            <div className="border border-border rounded-[var(--radius-lg)] p-6 bg-surface">
              {photo && (
                <div className="flex justify-center mb-4">
                  <img src={photo} alt={name} className="h-40 object-contain rounded-[var(--radius)]" />
                </div>
              )}
              <h2 className="text-lg font-bold text-text mb-1">{name}</h2>
              {vintage && <p className="text-sm text-text-secondary">Millésime {vintage}</p>}
              {appellation && <p className="text-sm text-text-secondary">{appellation}</p>}
              <p className="text-sm text-text-secondary mb-4">{alcoholContent}% vol</p>
              <h4 className="font-semibold text-sm text-text mb-2">Ingrédients</h4>
              <p className="text-sm text-text-secondary mb-4">
                {selectedIngredientObjects.filter(i => i.category !== 'agent_collage').map((i, idx) => (
                  <span key={i.id}>{idx > 0 && ', '}{i.isAllergen ? <strong className="underline">{i.name}</strong> : i.name}{i.code && ` (${i.code})`}</span>
                ))}
              </p>
              {selectedIngredientObjects.filter(i => i.category === 'agent_collage').length > 0 && (
                <p className="text-sm text-text-secondary mb-4 italic">
                  Agents de collage : {selectedIngredientObjects.filter(i => i.category === 'agent_collage').map((i, idx) => (
                    <span key={i.id}>{idx > 0 && ', '}{i.isAllergen ? <strong className="underline">{i.name}</strong> : i.name}</span>
                  ))}
                </p>
              )}
              {allergens.length > 0 && (
                <div className="bg-orange-50 border border-orange-200 rounded-[var(--radius)] px-3 py-2 mb-4">
                  <p className="text-sm font-medium text-orange-800">Contient : {[...new Set(allergens.map(a => a.allergenType))].join(', ')}</p>
                </div>
              )}
              <ELabelNutritionPreview nutrition={nutrition} />
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Result */}
      {step === 3 && (
        <div className="text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-xl font-bold text-text mb-2">E-label généré !</h2>
          <p className="text-text-secondary mb-8">{name}</p>
          <div className="bg-surface border border-border rounded-[var(--radius-lg)] p-8 inline-block mb-6">
            <p className="text-xs text-text-secondary mb-4 font-medium">Ingrédients et informations nutritionnelles</p>
            <div ref={qrCanvasRef}>
              <QRCodeCanvas value={elabelUrl} size={220} fgColor="#722F37" bgColor="#FFFFFF" level="M" />
            </div>
            <div ref={qrSvgRef} className="hidden">
              <QRCodeSVG value={elabelUrl} size={344} fgColor="#722F37" bgColor="#FFFFFF" level="M" />
            </div>
            {/* URL masquée — trop longue pour l'affichage */}
          </div>
          <div className="flex justify-center gap-4 mb-6">
            <button onClick={downloadPNG} className="rounded-[var(--radius)] bg-wine px-6 py-3 text-white font-medium hover:bg-wine-dark transition">Télécharger PNG</button>
            <button onClick={downloadSVG} className="rounded-[var(--radius)] border border-wine text-wine px-6 py-3 font-medium hover:bg-wine hover:text-white transition">Télécharger SVG</button>
          </div>
          <a href={`/wines/${slug}`} target="_blank" className="text-wine hover:underline font-medium">Voir la page E-Label →</a>
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
      )}

      {/* Navigation */}
      {step < 3 && (
        <div className="flex justify-between mt-8 pt-6 border-t border-border">
          <button onClick={() => setStep(s => s - 1)} disabled={step === 0} className="px-5 py-2.5 text-sm text-text-secondary hover:text-text disabled:invisible">← Précédent</button>
          {step < 2 ? (
            <button onClick={() => setStep(s => s + 1)} disabled={!canNext()} className="rounded-[var(--radius)] bg-wine px-5 py-2.5 text-white font-medium hover:bg-wine-dark transition disabled:opacity-50">Suivant →</button>
          ) : (
            <button onClick={handleGenerate} disabled={!canNext() || generating} className="rounded-[var(--radius)] bg-wine px-6 py-3 text-white font-semibold hover:bg-wine-dark transition disabled:opacity-50">
              {generating ? 'Redirection vers le paiement...' : 'Générer mon E-Label pour 3 €'}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
