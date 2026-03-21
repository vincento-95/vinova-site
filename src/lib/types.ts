export type WineColor = 'rouge' | 'blanc' | 'rosé' | 'mousseux' | 'liquoreux'
export type PlanType = 'free' | 'unit' | 'starter' | 'pro'

export interface User {
  id: string
  email: string
  company_name: string | null
  plan: PlanType
  stripe_customer_id: string | null
  created_at: string
}

export interface Wine {
  id: string
  user_id: string
  name: string
  vintage: number | null
  appellation: string | null
  color: WineColor
  grape_varieties: string[]
  alcohol_content: number
  residual_sugar: number
  total_acidity: number
  created_at: string
  updated_at: string
}

export interface ELabel {
  id: string
  wine_id: string
  slug: string
  ingredients: IngredientData[]
  nutrition: NutritionData
  allergens: string[]
  additives: string[]
  fining_agents: string[]
  languages: string[]
  is_published: boolean
  qr_code_url: string | null
  paid: boolean
  created_at: string
}

export interface IngredientData {
  id: string
  name: string
  code?: string
  category: string
  isAllergen: boolean
  allergenType?: string
}

export interface NutritionData {
  energyKj: number
  energyKcal: number
  fat: number
  saturatedFat: number
  carbohydrates: number
  sugars: number
  protein: number
  salt: number
}

export interface WineWithELabel extends Wine {
  elabels: ELabel[]
}

export interface WineFormData {
  // Step 1 - General info
  name: string
  vintage: number | null
  appellation: string
  color: WineColor
  grapeVarieties: string[]
  alcoholContent: number
  residualSugar: number
  totalAcidity: number
  // Step 2 - Ingredients
  selectedIngredients: string[]
  // Step 3 - Languages
  languages: string[]
}
