'use client'

import { useState } from 'react'
import { getTranslation, EU_LANGUAGES, type LanguageCode } from '@/lib/elabel-translations'
import type { NutritionData, IngredientData } from '@/lib/types'

interface Props {
  wine: {
    name: string
    vintage: number | null
    appellation: string | null
    alcohol_content: number
    grape_varieties: string[]
    photo?: string | null
  }
  elabel: {
    ingredients: IngredientData[]
    nutrition: NutritionData
    allergens: string[]
    fining_agents: string[]
    languages: string[]
  }
}

export default function ELabelContent({ wine, elabel }: Props) {
  const availableLanguages = elabel.languages.filter((l): l is LanguageCode => l in EU_LANGUAGES)
  const [lang, setLang] = useState<string>(availableLanguages[0] || 'fr')
  const t = getTranslation(lang)
  const fmt = (v: number) => v === 0 ? '< 0,1' : v.toFixed(1).replace('.', ',')

  const mainIngredients = elabel.ingredients.filter(i => i.category !== 'agent_collage')
  const finingIngredients = elabel.ingredients.filter(i => i.category === 'agent_collage')

  return (
    <div>
      {availableLanguages.length > 1 && (
        <div className="mb-6">
          <label className="text-xs text-gray-500 block mb-1">{t.selectLanguage}</label>
          <select value={lang} onChange={e => setLang(e.target.value)} className="rounded border border-gray-300 px-2 py-1 text-sm">
            {availableLanguages.map(code => <option key={code} value={code}>{EU_LANGUAGES[code]}</option>)}
          </select>
        </div>
      )}

      {wine.photo && (
        <div className="flex justify-center mb-4">
          <img src={wine.photo} alt={wine.name} className="h-44 object-contain rounded-lg" />
        </div>
      )}

      <h1 className="text-xl font-bold text-gray-900 mb-1">{wine.name}</h1>
      {wine.vintage && <p className="text-sm text-gray-600">{t.vintage} {wine.vintage}</p>}
      {wine.appellation && <p className="text-sm text-gray-600">{t.appellation} : {wine.appellation}</p>}
      <p className="text-sm text-gray-600 mb-6">{t.alcoholContent} : {wine.alcohol_content}% vol</p>

      <section className="mb-6">
        <h2 className="text-base font-bold text-gray-900 mb-2 border-b pb-1">{t.ingredients}</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          {mainIngredients.map((ingredient, idx) => (
            <span key={ingredient.id}>
              {idx > 0 && ', '}
              {ingredient.isAllergen ? <strong className="underline">{ingredient.name}{ingredient.code && ` (${ingredient.code})`}</strong> : <>{ingredient.name}{ingredient.code && ` (${ingredient.code})`}</>}
            </span>
          ))}.
        </p>
      </section>

      {finingIngredients.length > 0 && (
        <section className="mb-6">
          <h3 className="text-sm font-semibold text-gray-800 mb-1">{t.finingAgents}</h3>
          <p className="text-sm text-gray-600">
            {t.containsTraces}{' '}
            {finingIngredients.map((ingredient, idx) => (
              <span key={ingredient.id}>{idx > 0 && ', '}{ingredient.isAllergen ? <strong className="underline">{ingredient.name}</strong> : ingredient.name}</span>
            ))}.
          </p>
        </section>
      )}

      {elabel.allergens.length > 0 && (
        <section className="mb-6 bg-orange-50 border border-orange-200 rounded-lg px-4 py-3">
          <p className="text-sm font-bold text-orange-900">{t.allergensWarning} <span className="underline">{elabel.allergens.join(', ')}</span></p>
        </section>
      )}

      <section>
        <h2 className="text-base font-bold text-gray-900 mb-2 border-b pb-1">{t.nutritionalValues}</h2>
        <table className="w-full border-collapse text-sm">
          <thead><tr><th className="border border-gray-300 bg-gray-50 px-3 py-2 text-left font-semibold">{t.per100ml}</th><th className="border border-gray-300 bg-gray-50 px-3 py-2"></th></tr></thead>
          <tbody>
            <tr><td className="border border-gray-300 px-3 py-2">{t.energy}</td><td className="border border-gray-300 px-3 py-2">{elabel.nutrition.energyKj} kJ / {elabel.nutrition.energyKcal} kcal</td></tr>
            <tr><td className="border border-gray-300 px-3 py-2">{t.fat}</td><td className="border border-gray-300 px-3 py-2">{fmt(elabel.nutrition.fat)} g</td></tr>
            <tr><td className="border border-gray-300 px-3 py-2 pl-6 text-gray-500">{t.saturatedFat}</td><td className="border border-gray-300 px-3 py-2">{fmt(elabel.nutrition.saturatedFat)} g</td></tr>
            <tr><td className="border border-gray-300 px-3 py-2">{t.carbohydrates}</td><td className="border border-gray-300 px-3 py-2">{fmt(elabel.nutrition.carbohydrates)} g</td></tr>
            <tr><td className="border border-gray-300 px-3 py-2 pl-6 text-gray-500">{t.sugars}</td><td className="border border-gray-300 px-3 py-2">{fmt(elabel.nutrition.sugars)} g</td></tr>
            <tr><td className="border border-gray-300 px-3 py-2">{t.protein}</td><td className="border border-gray-300 px-3 py-2">{fmt(elabel.nutrition.protein)} g</td></tr>
            <tr><td className="border border-gray-300 px-3 py-2">{t.salt}</td><td className="border border-gray-300 px-3 py-2">{fmt(elabel.nutrition.salt)} g</td></tr>
          </tbody>
        </table>
        <p className="text-xs text-gray-500 mt-2 italic">{t.negligibleNote}</p>
      </section>
    </div>
  )
}
