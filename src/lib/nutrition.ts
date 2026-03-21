/**
 * Calcul des valeurs nutritionnelles pour le vin
 * Conforme au Règlement UE 2021/2117
 */

export interface NutritionInput {
  alcoholContent: number   // % vol (ex: 13.5)
  residualSugar: number    // g/L
  totalAcidity: number     // g/L (acide tartrique)
}

export interface NutritionValues {
  energyKj: number
  energyKcal: number
  fat: number
  saturatedFat: number
  carbohydrates: number
  sugars: number
  protein: number
  salt: number
}

export function calculateNutrition(input: NutritionInput): NutritionValues {
  // Énergie provenant de l'alcool (approximation standard UE)
  // alcool_vol * 7.89 (densité) * 0.8 (facteur) ≈ alcool_vol * 5.6
  const energyAlcoholKcal = input.alcoholContent * 5.6

  // Énergie provenant des sucres résiduels
  // 4 kcal/g de glucides, divisé par 10 pour obtenir g/100ml
  const energySugarKcal = (input.residualSugar * 4) / 10

  // Énergie provenant des acides organiques
  // 3 kcal/g d'acide organique, divisé par 10 pour 100ml
  const energyAcidKcal = (input.totalAcidity * 3) / 10

  // Énergie totale pour 100ml
  const energyKcal = energyAlcoholKcal + energySugarKcal + energyAcidKcal
  const energyKj = energyKcal * 4.184

  // Glucides = sucre résiduel converti en g/100ml
  const carbohydrates = input.residualSugar / 10

  return {
    energyKj: Math.round(energyKj),
    energyKcal: Math.round(energyKcal),
    fat: 0,
    saturatedFat: 0,
    carbohydrates: Math.round(carbohydrates * 10) / 10,
    sugars: Math.round(carbohydrates * 10) / 10,
    protein: 0,
    salt: 0,
  }
}

/**
 * Formate les valeurs nutritionnelles pour l'affichage
 */
export function formatNutritionValue(value: number, unit: string): string {
  if (value === 0) return `< 0,1 ${unit}`
  return `${value.toFixed(1).replace('.', ',')} ${unit}`
}
