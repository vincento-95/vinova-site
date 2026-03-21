/**
 * Liste des ingrédients possibles pour le vin (UE)
 * Conforme au Règlement UE 2021/2117
 */

export interface Ingredient {
  id: string
  name: string
  code?: string          // Code E
  category: IngredientCategory
  isAllergen: boolean
  allergenType?: string  // Type d'allergène (sulfites, œuf, lait, poisson)
}

export type IngredientCategory =
  | 'base'
  | 'regulateur_acidite'
  | 'conservateur'
  | 'stabilisant'
  | 'agent_collage'
  | 'gaz'
  | 'autre'

export const INGREDIENT_CATEGORIES: Record<IngredientCategory, string> = {
  base: 'Base',
  regulateur_acidite: 'Régulateurs d\'acidité',
  conservateur: 'Conservateurs',
  stabilisant: 'Stabilisants',
  agent_collage: 'Agents de collage (traces potentielles)',
  gaz: 'Gaz',
  autre: 'Autres',
}

export const INGREDIENTS: Ingredient[] = [
  // Base
  { id: 'raisins', name: 'Raisins', category: 'base', isAllergen: false },

  // Régulateurs d'acidité
  { id: 'e334', name: 'Acide tartrique', code: 'E334', category: 'regulateur_acidite', isAllergen: false },
  { id: 'e296', name: 'Acide malique', code: 'E296', category: 'regulateur_acidite', isAllergen: false },
  { id: 'e270', name: 'Acide lactique', code: 'E270', category: 'regulateur_acidite', isAllergen: false },
  { id: 'e330', name: 'Acide citrique', code: 'E330', category: 'regulateur_acidite', isAllergen: false },
  { id: 'e501', name: 'Bicarbonate de potassium', code: 'E501', category: 'regulateur_acidite', isAllergen: false },

  // Conservateurs
  { id: 'e220', name: 'Dioxyde de soufre / sulfites', code: 'E220', category: 'conservateur', isAllergen: true, allergenType: 'sulfites' },
  { id: 'e202', name: 'Sorbate de potassium', code: 'E202', category: 'conservateur', isAllergen: false },
  { id: 'e300', name: 'Acide ascorbique', code: 'E300', category: 'conservateur', isAllergen: false },
  { id: 'e1105', name: 'Lysozyme', code: 'E1105', category: 'conservateur', isAllergen: true, allergenType: 'œuf' },

  // Stabilisants
  { id: 'e414', name: 'Gomme arabique', code: 'E414', category: 'stabilisant', isAllergen: false },
  { id: 'e353', name: 'Acide métatartrique', code: 'E353', category: 'stabilisant', isAllergen: false },
  { id: 'e466', name: 'Carboxyméthylcellulose', code: 'E466', category: 'stabilisant', isAllergen: false },
  { id: 'e456', name: 'Polyaspartate de potassium', code: 'E456', category: 'stabilisant', isAllergen: false },

  // Agents de collage
  { id: 'caseine', name: 'Caséine', category: 'agent_collage', isAllergen: true, allergenType: 'lait' },
  { id: 'albumine', name: 'Albumine d\'œuf', category: 'agent_collage', isAllergen: true, allergenType: 'œuf' },
  { id: 'bentonite', name: 'Bentonite', category: 'agent_collage', isAllergen: false },
  { id: 'gelatine', name: 'Gélatine', category: 'agent_collage', isAllergen: false },
  { id: 'pvpp', name: 'PVPP', category: 'agent_collage', isAllergen: false },
  { id: 'proteines_pois', name: 'Protéines de pois', category: 'agent_collage', isAllergen: false },
  { id: 'colle_poisson', name: 'Colle de poisson', category: 'agent_collage', isAllergen: true, allergenType: 'poisson' },

  // Gaz
  { id: 'co2', name: 'Dioxyde de carbone', category: 'gaz', isAllergen: false },

  // Autres
  { id: 'tanins', name: 'Tanins œnologiques', category: 'autre', isAllergen: false },
  { id: 'charbon', name: 'Charbon actif', category: 'autre', isAllergen: false },
  { id: 'resine_pin', name: 'Résine de pin', category: 'autre', isAllergen: false },
]

export function getIngredientsByCategory(): Record<IngredientCategory, Ingredient[]> {
  const grouped = {} as Record<IngredientCategory, Ingredient[]>
  for (const cat of Object.keys(INGREDIENT_CATEGORIES) as IngredientCategory[]) {
    grouped[cat] = INGREDIENTS.filter(i => i.category === cat)
  }
  return grouped
}

export function getAllergens(selectedIds: string[]): Ingredient[] {
  return INGREDIENTS.filter(i => selectedIds.includes(i.id) && i.isAllergen)
}

export function formatIngredientName(ingredient: Ingredient): string {
  let name = ingredient.name
  if (ingredient.code) {
    name += ` (${ingredient.code})`
  }
  return name
}
