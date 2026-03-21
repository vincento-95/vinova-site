/**
 * Traductions pour les e-labels UE
 * Langues officielles de l'Union européenne
 */

export const EU_LANGUAGES = {
  fr: 'Français',
  en: 'English',
  de: 'Deutsch',
  es: 'Español',
  it: 'Italiano',
  pt: 'Português',
  nl: 'Nederlands',
  pl: 'Polski',
  ro: 'Română',
  el: 'Ελληνικά',
  cs: 'Čeština',
  hu: 'Magyar',
  sv: 'Svenska',
  bg: 'Български',
  da: 'Dansk',
  fi: 'Suomi',
  sk: 'Slovenčina',
  hr: 'Hrvatski',
  lt: 'Lietuvių',
  sl: 'Slovenščina',
  lv: 'Latviešu',
  et: 'Eesti',
  ga: 'Gaeilge',
  mt: 'Malti',
} as const

export type LanguageCode = keyof typeof EU_LANGUAGES

interface TranslationStrings {
  ingredients: string
  nutritionalInfo: string
  nutritionalValues: string
  per100ml: string
  energy: string
  fat: string
  saturatedFat: string
  carbohydrates: string
  sugars: string
  protein: string
  salt: string
  allergens: string
  allergensWarning: string
  containsTraces: string
  negligibleNote: string
  finingAgents: string
  vintage: string
  appellation: string
  alcoholContent: string
  selectLanguage: string
}

export const TRANSLATIONS: Record<string, TranslationStrings> = {
  fr: {
    ingredients: 'Ingrédients',
    nutritionalInfo: 'Informations nutritionnelles',
    nutritionalValues: 'Déclaration nutritionnelle',
    per100ml: 'Pour 100 ml',
    energy: 'Énergie',
    fat: 'Matières grasses',
    saturatedFat: 'dont acides gras saturés',
    carbohydrates: 'Glucides',
    sugars: 'dont sucres',
    protein: 'Protéines',
    salt: 'Sel',
    allergens: 'Allergènes',
    allergensWarning: 'Contient :',
    containsTraces: 'Peut contenir des traces de :',
    negligibleNote: 'Contient des quantités négligeables de lipides, acides gras saturés, protéines et sel.',
    finingAgents: 'Agents de collage utilisés',
    vintage: 'Millésime',
    appellation: 'Appellation',
    alcoholContent: 'Titre alcoométrique',
    selectLanguage: 'Langue',
  },
  en: {
    ingredients: 'Ingredients',
    nutritionalInfo: 'Nutritional information',
    nutritionalValues: 'Nutrition declaration',
    per100ml: 'Per 100 ml',
    energy: 'Energy',
    fat: 'Fat',
    saturatedFat: 'of which saturates',
    carbohydrates: 'Carbohydrate',
    sugars: 'of which sugars',
    protein: 'Protein',
    salt: 'Salt',
    allergens: 'Allergens',
    allergensWarning: 'Contains:',
    containsTraces: 'May contain traces of:',
    negligibleNote: 'Contains negligible amounts of fat, saturates, protein and salt.',
    finingAgents: 'Fining agents used',
    vintage: 'Vintage',
    appellation: 'Appellation',
    alcoholContent: 'Alcohol content',
    selectLanguage: 'Language',
  },
  de: {
    ingredients: 'Zutaten',
    nutritionalInfo: 'Nährwertinformationen',
    nutritionalValues: 'Nährwertdeklaration',
    per100ml: 'Pro 100 ml',
    energy: 'Energie',
    fat: 'Fett',
    saturatedFat: 'davon gesättigte Fettsäuren',
    carbohydrates: 'Kohlenhydrate',
    sugars: 'davon Zucker',
    protein: 'Eiweiß',
    salt: 'Salz',
    allergens: 'Allergene',
    allergensWarning: 'Enthält:',
    containsTraces: 'Kann Spuren enthalten von:',
    negligibleNote: 'Enthält vernachlässigbare Mengen an Fett, gesättigten Fettsäuren, Eiweiß und Salz.',
    finingAgents: 'Verwendete Schönungsmittel',
    vintage: 'Jahrgang',
    appellation: 'Herkunftsbezeichnung',
    alcoholContent: 'Alkoholgehalt',
    selectLanguage: 'Sprache',
  },
  es: {
    ingredients: 'Ingredientes',
    nutritionalInfo: 'Información nutricional',
    nutritionalValues: 'Declaración nutricional',
    per100ml: 'Por 100 ml',
    energy: 'Energía',
    fat: 'Grasas',
    saturatedFat: 'de las cuales saturadas',
    carbohydrates: 'Hidratos de carbono',
    sugars: 'de los cuales azúcares',
    protein: 'Proteínas',
    salt: 'Sal',
    allergens: 'Alérgenos',
    allergensWarning: 'Contiene:',
    containsTraces: 'Puede contener trazas de:',
    negligibleNote: 'Contiene cantidades insignificantes de grasas, grasas saturadas, proteínas y sal.',
    finingAgents: 'Agentes de clarificación utilizados',
    vintage: 'Añada',
    appellation: 'Denominación',
    alcoholContent: 'Grado alcohólico',
    selectLanguage: 'Idioma',
  },
  it: {
    ingredients: 'Ingredienti',
    nutritionalInfo: 'Informazioni nutrizionali',
    nutritionalValues: 'Dichiarazione nutrizionale',
    per100ml: 'Per 100 ml',
    energy: 'Energia',
    fat: 'Grassi',
    saturatedFat: 'di cui acidi grassi saturi',
    carbohydrates: 'Carboidrati',
    sugars: 'di cui zuccheri',
    protein: 'Proteine',
    salt: 'Sale',
    allergens: 'Allergeni',
    allergensWarning: 'Contiene:',
    containsTraces: 'Può contenere tracce di:',
    negligibleNote: 'Contiene quantità trascurabili di grassi, acidi grassi saturi, proteine e sale.',
    finingAgents: 'Coadiuvanti di chiarifica utilizzati',
    vintage: 'Annata',
    appellation: 'Denominazione',
    alcoholContent: 'Titolo alcolometrico',
    selectLanguage: 'Lingua',
  },
  pt: {
    ingredients: 'Ingredientes',
    nutritionalInfo: 'Informação nutricional',
    nutritionalValues: 'Declaração nutricional',
    per100ml: 'Por 100 ml',
    energy: 'Energia',
    fat: 'Lípidos',
    saturatedFat: 'dos quais saturados',
    carbohydrates: 'Hidratos de carbono',
    sugars: 'dos quais açúcares',
    protein: 'Proteínas',
    salt: 'Sal',
    allergens: 'Alergénios',
    allergensWarning: 'Contém:',
    containsTraces: 'Pode conter vestígios de:',
    negligibleNote: 'Contém quantidades negligenciáveis de lípidos, ácidos gordos saturados, proteínas e sal.',
    finingAgents: 'Agentes de colagem utilizados',
    vintage: 'Colheita',
    appellation: 'Denominação',
    alcoholContent: 'Título alcoométrico',
    selectLanguage: 'Idioma',
  },
  nl: {
    ingredients: 'Ingrediënten',
    nutritionalInfo: 'Voedingsinformatie',
    nutritionalValues: 'Voedingswaardeverklaring',
    per100ml: 'Per 100 ml',
    energy: 'Energie',
    fat: 'Vetten',
    saturatedFat: 'waarvan verzadigde vetzuren',
    carbohydrates: 'Koolhydraten',
    sugars: 'waarvan suikers',
    protein: 'Eiwitten',
    salt: 'Zout',
    allergens: 'Allergenen',
    allergensWarning: 'Bevat:',
    containsTraces: 'Kan sporen bevatten van:',
    negligibleNote: 'Bevat verwaarloosbare hoeveelheden vet, verzadigde vetzuren, eiwitten en zout.',
    finingAgents: 'Gebruikte klaringsmiddelen',
    vintage: 'Oogstjaar',
    appellation: 'Oorsprongsbenaming',
    alcoholContent: 'Alcoholgehalte',
    selectLanguage: 'Taal',
  },
  pl: {
    ingredients: 'Składniki',
    nutritionalInfo: 'Informacja o wartości odżywczej',
    nutritionalValues: 'Wartość odżywcza',
    per100ml: 'W 100 ml',
    energy: 'Energia',
    fat: 'Tłuszcz',
    saturatedFat: 'w tym kwasy tłuszczowe nasycone',
    carbohydrates: 'Węglowodany',
    sugars: 'w tym cukry',
    protein: 'Białko',
    salt: 'Sól',
    allergens: 'Alergeny',
    allergensWarning: 'Zawiera:',
    containsTraces: 'Może zawierać śladowe ilości:',
    negligibleNote: 'Zawiera znikome ilości tłuszczu, kwasów tłuszczowych nasyconych, białka i soli.',
    finingAgents: 'Zastosowane środki klarujące',
    vintage: 'Rocznik',
    appellation: 'Oznaczenie pochodzenia',
    alcoholContent: 'Zawartość alkoholu',
    selectLanguage: 'Język',
  },
}

export function getTranslation(lang: string): TranslationStrings {
  return TRANSLATIONS[lang] || TRANSLATIONS.fr
}
