import type { NutritionValues } from '@/lib/nutrition'

export default function ELabelNutritionPreview({ nutrition }: { nutrition: NutritionValues }) {
  const fmt = (v: number) => v === 0 ? '< 0,1' : v.toFixed(1).replace('.', ',')

  return (
    <div>
      <h4 className="font-semibold text-sm text-text mb-2">Déclaration nutritionnelle</h4>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr><th className="border border-border bg-accent px-3 py-2 text-left font-semibold">Pour 100 ml</th><th className="border border-border bg-accent px-3 py-2"></th></tr>
        </thead>
        <tbody>
          <tr><td className="border border-border px-3 py-2">Énergie</td><td className="border border-border px-3 py-2">{nutrition.energyKj} kJ / {nutrition.energyKcal} kcal</td></tr>
          <tr><td className="border border-border px-3 py-2">Matières grasses</td><td className="border border-border px-3 py-2">{fmt(nutrition.fat)} g</td></tr>
          <tr><td className="border border-border px-3 py-2 pl-6 text-text-secondary">dont acides gras saturés</td><td className="border border-border px-3 py-2">{fmt(nutrition.saturatedFat)} g</td></tr>
          <tr><td className="border border-border px-3 py-2">Glucides</td><td className="border border-border px-3 py-2">{fmt(nutrition.carbohydrates)} g</td></tr>
          <tr><td className="border border-border px-3 py-2 pl-6 text-text-secondary">dont sucres</td><td className="border border-border px-3 py-2">{fmt(nutrition.sugars)} g</td></tr>
          <tr><td className="border border-border px-3 py-2">Protéines</td><td className="border border-border px-3 py-2">{fmt(nutrition.protein)} g</td></tr>
          <tr><td className="border border-border px-3 py-2">Sel</td><td className="border border-border px-3 py-2">{fmt(nutrition.salt)} g</td></tr>
        </tbody>
      </table>
      <p className="text-xs text-text-secondary mt-2 italic">
        Contient des quantités négligeables de lipides, acides gras saturés, protéines et sel.
      </p>
    </div>
  )
}
