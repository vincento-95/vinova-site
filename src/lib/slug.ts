import { v4 as uuidv4 } from 'uuid'

/**
 * Génère un slug unique pour un e-label à partir du nom du vin
 */
export function generateSlug(wineName: string): string {
  const base = wineName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // supprime les accents
    .replace(/[^a-z0-9]+/g, '-')     // remplace les caractères spéciaux par des tirets
    .replace(/^-|-$/g, '')           // supprime les tirets en début/fin
    .substring(0, 50)                // limite la longueur

  const suffix = uuidv4().substring(0, 8)
  return `${base}-${suffix}`
}
