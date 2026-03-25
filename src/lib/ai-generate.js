/**
 * Server-side AI wine sheet generation — EXACT copy of wine-fiches original.
 * 2-step pipeline: Research (Perplexity or Claude) → Format (Claude JSON)
 * Only adaptation: direct API calls instead of proxy routes, no Vision step.
 */
import { defaultWine } from './defaults.js';
import { getLang } from './translations.js';

// Color mapping for wine types (keys always in French)
const WINE_COLORS = {
  'Rouge': '#722F37',
  'Blanc sec': '#C5A855',
  'Blanc moelleux': '#DAA520',
  'Blanc liquoreux': '#B8860B',
  'Rosé': '#E8919A',
  'Effervescent': '#C5A855',
  'Vin doux naturel': '#8B4513',
  'Vin de liqueur': '#CC7722',
};

// ── Helper: sleep ──
function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

// ── Anthropic API call (direct, server-side) with retry on overload ──
async function callAnthropic(apiKey, system, messages, maxTokens = 4096) {
  const maxRetries = 3;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: maxTokens,
        temperature: 0,
        system,
        messages,
      }),
    });

    if (res.status === 529 || res.status === 503 || res.status === 429) {
      console.warn(`[Anthropic] Overloaded/rate-limited (${res.status}), retry ${attempt}/${maxRetries}...`);
      if (attempt < maxRetries) {
        await sleep(2000 * attempt); // 2s, 4s, 6s
        continue;
      }
    }

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `Erreur Anthropic (${res.status})`);
    }

    const data = await res.json();
    const text = data.content?.[0]?.text || '';
    if (!text) throw new Error('Réponse vide de l\'IA');
    return text;
  }

  throw new Error('Serveur IA surchargé. Veuillez réessayer dans quelques instants.');
}

// ── Perplexity API call (direct, server-side) with retry ──
async function callPerplexity(apiKey, messages) {
  const maxRetries = 3;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const res = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'sonar-pro',
        messages,
        temperature: 0,
      }),
    });

    if (res.status === 529 || res.status === 503 || res.status === 429) {
      console.warn(`[Perplexity] Overloaded/rate-limited (${res.status}), retry ${attempt}/${maxRetries}...`);
      if (attempt < maxRetries) {
        await sleep(2000 * attempt);
        continue;
      }
    }

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `Erreur Perplexity (${res.status})`);
    }

    const data = await res.json();
    const text = data.choices?.[0]?.message?.content || '';
    if (!text) throw new Error('Réponse vide de Perplexity');
    return text;
  }

  throw new Error('Serveur de recherche surchargé. Veuillez réessayer.');
}

// ── Step 2 — Research ──────────────────────────────────────────────

/**
 * System prompt for Claude research (fallback when no Perplexity key).
 */
function getResearchSystem(langCode) {
  const lang = getLang(langCode);
  return `Tu es un encyclopédiste du vin et un sommelier passionné. Tu connais les domaines, terroirs et millésimes du monde entier. Tu écris pour des importateurs professionnels qui veulent VENDRE ce vin.

RÈGLES STRICTES :
1. Ne fournis QUE des informations que tu sais FACTUELLEMENT CORRECTES.
2. Si tu n'es pas sûr d'une information, écris explicitement "[INCERTAIN]" à côté.
3. Pour les domaines célèbres (classés, renommés), tu DOIS fournir les données réelles : superficie exacte, cépages exacts avec pourcentages d'assemblage, type de sol réel, méthodes de vinification connues, scores critiques réels publiés.
4. Pour les domaines moins connus, donne uniquement ce que tu sais avec certitude de la région/appellation (type de sol typique, cépages autorisés, méthodes courantes de l'appellation).
5. JAMAIS d'invention. Mieux vaut dire "inconnu" que d'inventer.
6. Cite tes sources quand possible (ex: "selon le site du domaine", "classement officiel de 1855", "Parker 2020").
7. POSITIONNEMENT : explique toujours pourquoi cette cuvée mérite attention — son positionnement dans la gamme du producteur, son rapport qualité-prix, ce qui la distingue.
8. ORTHOGRAPHE EXACTE DES NOMS : respecte scrupuleusement l'orthographe du domaine avec accents, particules ("de", "di", "von"…), majuscules. Ex : "Château de Sárospatak" et non "Château Sarospatak". En cas de doute, marque [INCERTAIN].
9. GÉOGRAPHIE PRÉCISE : ne jamais attribuer un élément géographique (confluence, fleuve, montagne…) à un lieu précis sans certitude. Ex : ne pas dire qu'un domaine est "à la confluence de X et Y" s'il est simplement dans la même région. Décrire uniquement ce qui est géographiquement vrai pour le lieu EXACT du domaine.
10. CÉPAGES — INTERDIT D'INVENTER DES POURCENTAGES : si tu ne connais pas l'assemblage EXACT et VÉRIFIÉ de CE vin précis, écris uniquement les cépages connus SANS pourcentages, ou marque [INCERTAIN]. Ne JAMAIS plaquer un assemblage "typique de la région" comme si c'était celui du vin.

IMPORTANT : Tu dois aussi identifier :
- Le nom exact de la cuvée (avec orthographe exacte, accents, particules)
- Le nom exact du domaine/château (avec orthographe exacte, accents, particules)
- Le millésime (si mentionné)
- La région / appellation exacte
- Le pays
- Les cépages exacts (avec % d'assemblage UNIQUEMENT si vérifié pour CE vin)
- Le type de vin (Rouge, Blanc sec, Blanc moelleux, Blanc liquoreux, Rosé, Effervescent, Vin doux naturel, Vin de liqueur). IMPORTANT : ne JAMAIS utiliser "Dessert" comme type. Pour les vins à sucre résiduel élevé (Tokaji Aszú, Sauternes, Trockenbeerenauslese…) → "Blanc liquoreux". Pour les vins doux moins concentrés (vendanges tardives, moelleux) → "Blanc moelleux".
- Le degré d'alcool du millésime si connu

Tu réponds en ${lang.promptLang}, en prose structurée (pas de JSON).`;
}

/**
 * Build the research query for Claude (fallback mode).
 */
function buildClaudeResearchQuery(wineName, langCode) {
  const lang = getLang(langCode);
  let query = `Fais une recherche approfondie et exhaustive sur ce vin : "${wineName}"`;

  query += `

Identifie d'abord :
- Quel est le domaine/château exact ?
- Quelle est la cuvée exacte ?
- Quel millésime (si mentionné) ?
- Quelle appellation / région ?
- Quel pays ?
- Quels cépages (avec pourcentages d'assemblage si connu) ?
- Quel type de vin (rouge, blanc sec, blanc moelleux, blanc liquoreux, rosé, effervescent, vin doux naturel, vin de liqueur) ?

Puis donne TOUTES les informations VÉRIFIÉES que tu connais sur :
1. DOMAINE : histoire, fondation, superficie, philosophie, propriétaire, classement officiel
2. TERROIR : sol exact (géologie), exposition, altitude, climat, parcelles
3. VITICULTURE : âge des vignes, rendements, vendange, certifications (bio, biodynamie)
4. VINIFICATION : cuves, température fermentation, macération, techniques
5. ÉLEVAGE : type de fûts, durée, % bois neuf, tonneliers
6. PROFIL DU VIN : robe, nez, bouche — basé sur le profil réel
7. SCORES CRITIQUES ET FENÊTRES DE DÉGUSTATION — SECTION CRUCIALE :
   Pour CE millésime précis, recherche et liste TOUS les scores publiés avec les fenêtres de dégustation (drinking window) de chaque critique :
   - Robert Parker / Wine Advocate : score + drinking window
   - Vinous (Antonio Galloni) : score + drinking window
   - James Suckling : score + drinking window
   - Wine Spectator : score + drinking window
   - Wine Enthusiast : score + drinking window
   - Decanter : score + drinking window
   - Jancis Robinson : score + drinking window
   - RVF (La Revue du Vin de France) : score + drinking window
   UNIQUEMENT des scores réellement publiés. NE JAMAIS INVENTER de score.
   La fenêtre de dégustation (drinking window) est INDISPENSABLE — c'est elle qui détermine le champ "garde" de la fiche.
8. SERVICE : verrerie recommandée, moment de service idéal, carafage
9. ACCORDS : plats précis qui fonctionnent avec ce vin

IMPORTANT : La GARDE / FENÊTRE DE DÉGUSTATION doit OBLIGATOIREMENT provenir des critiques professionnels (Parker, Vinous, Wine Spectator, etc.). NE JAMAIS inventer ou estimer une fenêtre de garde. Si aucun critique n'a publié de fenêtre, marquer [INCERTAIN].

Marque [INCERTAIN] tout ce dont tu n'es pas sûr à 100%.

Réponds en ${lang.promptLang}.`;

  return query;
}

/**
 * Build the research query for Perplexity.
 */
function buildPerplexityMessages(wineName, langCode) {
  const lang = getLang(langCode);

  return [
    {
      role: 'user',
      content: `Recherche approfondie sur ce vin : "${wineName}"

Je suis importateur de vins et j'ai besoin d'informations PRÉCISES et SOURCÉES pour créer une fiche technique professionnelle.

RÈGLES CRITIQUES :
- ORTHOGRAPHE EXACTE : respecte les accents, particules ("de", "di"), majuscules dans les noms de domaine. Ex : "Château de Sárospatak", pas "Château Sarospatak".
- GÉOGRAPHIE : ne jamais attribuer un élément géographique (confluence, fleuve) à un lieu s'il n'y est pas exactement situé. Vérifier la localisation précise du domaine.
- CÉPAGES : ne donne des pourcentages d'assemblage QUE s'ils sont vérifiés pour CE vin précis. Ne jamais plaquer un assemblage "typique de la région".

Trouve et vérifie TOUTES ces informations :

1. IDENTITÉ : nom exact du domaine/producteur (orthographe précise avec accents), nom de la cuvée, appellation exacte, région, pays
2. CÉPAGES : variétés exactes avec pourcentages d'assemblage UNIQUEMENT si vérifiés pour ce vin précis
3. DEGRÉ D'ALCOOL : pour ce millésime si possible
4. DOMAINE : histoire, date de fondation, superficie du vignoble, propriétaire actuel, philosophie, classement officiel
5. TERROIR : composition exacte du sol (géologie), exposition, altitude, microclima, parcelles
6. VITICULTURE : âge des vignes, rendements, type de vendange, certifications (bio, biodynamie, HVE)
7. VINIFICATION : type de cuves, durée de macération, techniques spécifiques
8. ÉLEVAGE : type de contenant (fûts, cuves), durée, % bois neuf si applicable
9. PROFIL GUSTATIF : robe, arômes au nez, en bouche — basé sur des notes de dégustation publiées
10. SCORES CRITIQUES ET FENÊTRES DE DÉGUSTATION — SECTION LA PLUS IMPORTANTE :
    Pour CE millésime précis, recherche sur Wine-Searcher, CellarTracker, Vinous, et les sites des critiques. Liste CHAQUE score trouvé avec sa fenêtre de dégustation (drinking window) :
    - Robert Parker / Wine Advocate : score/100 + drinking window (ex: "95/100, drink 2020-2040")
    - Vinous (Antonio Galloni) : score/100 + drinking window
    - James Suckling : score/100 + drinking window
    - Wine Spectator : score/100 + drinking window
    - Wine Enthusiast : score/100 + drinking window
    - Decanter : score/100 + drinking window
    - Jancis Robinson : score/20 + drinking window
    - RVF (La Revue du Vin de France) : score + drinking window
    UNIQUEMENT des scores réellement publiés pour CE millésime. NE JAMAIS INVENTER.
    La fenêtre de dégustation est CRUCIALE — elle détermine la garde sur la fiche technique.
11. SERVICE : verrerie recommandée, moment de service idéal, carafage
12. ACCORDS METS-VINS : suggestions de plats

IMPORTANT : La GARDE doit provenir des fenêtres de dégustation publiées par les critiques professionnels. NE JAMAIS inventer une fenêtre de garde.
Cite tes sources. Si une information n'est pas vérifiable, indique-le clairement.

Réponds en ${lang.promptLang}, en prose structurée et détaillée.`,
    },
  ];
}

// ── Step 3 — Format (Claude) ───────────────────────────────────────

function getFormatSystem(langCode) {
  const lang = getLang(langCode);
  return `LANGUE DE SORTIE : Tu dois rédiger TOUS les textes descriptifs (domaineDesc, oeil, nez, bouche, accords, carafage, garde, verrerie, momentService) en ${lang.promptLang}. Les noms propres (domaine, appellation, cépage) restent dans leur langue d'origine.

IMPORTANT : Le champ "type" doit TOUJOURS être une de ces valeurs exactes EN FRANÇAIS : Rouge | Blanc sec | Blanc moelleux | Blanc liquoreux | Rosé | Effervescent | Vin doux naturel | Vin de liqueur. Ne PAS traduire ce champ. Ne JAMAIS utiliser "Dessert" comme type. Règles de classification :
- Vins à sucre résiduel très élevé (Tokaji Aszú, Sauternes, Trockenbeerenauslese, Beerenauslese, SGN…) → "Blanc liquoreux"
- Vins doux moins concentrés (vendanges tardives, moelleux, demi-sec sucré…) → "Blanc moelleux"
- Vins blancs secs → "Blanc sec"
- Vins mutés/fortifiés type Porto, Xérès, Madère, Marsala → "Vin de liqueur"
- Vins doux naturels (Banyuls, Rivesaltes, Muscat de Beaumes-de-Venise, Maury…) → "Vin doux naturel"

Tu es un rédacteur de fiches techniques vins pour importateurs professionnels. Tu écris des fiches qui donnent ENVIE d'ouvrir la bouteille ce soir. Si on lit ta fiche et qu'on n'a pas envie du vin, la fiche a échoué.

Tu reçois un rapport de recherche sur un vin. Ta mission : extraire les informations et les formater en JSON pour une fiche technique d'importateur.

RÈGLES ABSOLUES :
1. Tout champ marqué [INCERTAIN] dans la recherche → mets "" (chaîne vide) dans le JSON.
2. ORTHOGRAPHE EXACTE DES NOMS : les champs "domaine" et "name" doivent respecter scrupuleusement l'orthographe originale avec accents, particules ("de", "di", "von"…), majuscules. Ex : "Château de Sárospatak" et non "Château Sarospatak".
3. GÉOGRAPHIE : dans "domaineDesc", ne JAMAIS attribuer un élément géographique (confluence de rivières, proximité d'un fleuve, montagne) au domaine sans certitude absolue. Si le rapport mentionne un fait géographique régional, ne pas l'attribuer au domaine spécifique.
4. CÉPAGES : si le rapport ne donne PAS de pourcentages vérifiés pour CE vin, écrire les cépages SANS pourcentages (ex: "Furmint, Hárslevelű") ou avec "majoritaire" (ex: "Furmint majoritaire, Hárslevelű"). Ne JAMAIS inventer des pourcentages.
5. CHAMPS OBLIGATOIRES — doivent TOUJOURS être remplis, même si tu dois te baser sur tes connaissances de l'appellation/cépage :
   - "grape" : cépages TOUJOURS remplis — avec % UNIQUEMENT si vérifiés, sinon sans % (ex: "Furmint majoritaire, Hárslevelű")
   - "alcohol" : degré TOUJOURS rempli (ex: "14,5%", "13%")
   - "temperature" : format court "XX-XX°C" (ex: "16-18°C")
   - "garde" : C'est la FENÊTRE DE DÉGUSTATION (drinking window) = jusqu'à quand on peut garder/boire le vin. Nous sommes en 2026.
     ÉTAPE 1 : Cherche dans le rapport TOUTES les mentions de "drink", "drinking window", "through", "until", et les plages d'années des critiques (Parker, Vinous, Suckling, Wine Spectator, etc.).
     ÉTAPE 2 : Prend l'année de fin la plus tardive parmi tous les critiques.
     ÉTAPE 3 : Format STRICT → "À boire maintenant – XXXX" (ex: "À boire maintenant – 2040").
     Si aucune drinking window trouvée : estimer → "À boire maintenant – XXXX" (basé sur le potentiel du cépage/région).
     INTERDIT : pas de "Apogée estimée", pas d'année avant 2026, pas de prose. Juste "À boire maintenant – XXXX".
   - "carafage" : recommandation concise OBLIGATOIRE
   - "verrerie" : type de verre recommandé, MAX 10 mots (ex: "Verre à Bourgogne pour exprimer la finesse aromatique")
   - "momentService" : quand servir, MAX 15 mots (ex: "Idéal en apéritif ou en fin de repas avec le dessert")
   - "oeil" : MAX 2 phrases courtes, vocabulaire œnologique professionnel. CONCIS.
   - "nez" : MAX 2 phrases courtes, minimum 2 arômes SPÉCIFIQUES. CONCIS.
   - "bouche" : MAX 2 phrases courtes décrivant une PROGRESSION (attaque → milieu → finale). CONCIS.
   - "accords" : TOUJOURS 3 plats PRÉCIS adaptés au profil réel (PAS 4, seulement 3)
   - "domaineDesc" : MAX 3 phrases COURTES. Terminer par pourquoi cette cuvée mérite attention. PAS de longs paragraphes.
   - "vinification" : MAX 2 phrases courtes si connu. Sinon "".
   - "elevage" : MAX 1 phrase courte si connu. Sinon "".
6. Les scores critiques : UNIQUEMENT des scores réellement publiés. Le champ "critics" est un tableau d'objets contenant UNIQUEMENT des scores RÉELLEMENT trouvés dans le rapport de recherche. Si aucun score → tableau vide [].
7. Pour les champs factuels (sol, superficie, etc.) : si non vérifié → "".
8. CONCISION ABSOLUE — LA FICHE DOIT TENIR SUR 1 PAGE A4 :
   - Chaque champ : 2 phrases MAX sauf domaineDesc (3 phrases max).
   - Privilégie l'impact sur la longueur. Chaque mot doit compter.
   - INTERDIT de dépasser 2 phrases pour oeil, nez, bouche, carafage, momentService.
   - Si tu hésites entre une phrase longue et deux phrases courtes, choisis UNE phrase percutante.

STYLE D'ÉCRITURE — RÈGLES STRICTES :
- BANNIR les arômes génériques seuls. Jamais "fruits rouges" seul → "cassis écrasé, mûre sauvage". Jamais "épices" seul → "poivre noir fraîchement moulu, cannelle douce". Toujours PRÉCISER l'arôme.
- BANNIR les mots : "moyenne", "correct", "présent", "classique", "agréable", "intéressant", "sympathique". Ces mots sont INTERDITS (et leurs équivalents dans la langue de sortie).
- NEZ : minimum 2 arômes spécifiques nommés précisément. Créer une image sensorielle vivante.
- BOUCHE : TOUJOURS décrire une progression : attaque → milieu de bouche → finale. La finale doit être qualifiée qualitativement (arôme persistant identifié, sensation laissée). JAMAIS de durée en secondes ou caudalies.
- TON : professionnel mais engageant. Chaque phrase doit donner envie. Écrire comme un sommelier passionné qui recommande CE vin à un client exigeant.

TEMPÉRATURE DE SERVICE — RÈGLES (si l'utilisateur n'a PAS fourni de température) :
- Effervescent doux / Moscato / Asti : 8-12°C
- Blanc sec léger : 8-10°C
- Blanc sec corsé / boisé : 10-12°C
- Rosé : 8-10°C
- Rouge léger (Pinot Noir, Gamay) : 14-16°C
- Rouge moyen (Merlot, Sangiovese) : 16-17°C
- Rouge puissant (Cabernet, Barolo, Amarone) : 17-18°C
- Champagne / Crémant : 6-8°C
- Vin doux / liquoreux : 8-10°C
RÈGLE ABSOLUE : si l'utilisateur a fourni une température dans "informations supplémentaires", utilise SA valeur, pas la règle ci-dessus.

GARDE — RÈGLES (si aucune drinking window de critique n'est trouvée ET si l'utilisateur n'a PAS fourni de garde) :
- Effervescent doux à faible degré (Moscato d'Asti, Lambrusco, < 8% vol) : "À boire dans l'année" ou "À boire maintenant – ${new Date().getFullYear() + 1}"
- Blanc sec simple : "À boire maintenant – ${new Date().getFullYear() + 3}"
- Blanc sec de garde (Bourgogne, Riesling GC) : "À boire maintenant – ${new Date().getFullYear() + 10}"
- Rosé : "À boire maintenant – ${new Date().getFullYear() + 2}"
- Rouge léger / jeune : "À boire maintenant – ${new Date().getFullYear() + 4}"
- Rouge de garde (Barolo, Amarone, Bordeaux GCC) : "À boire maintenant – ${new Date().getFullYear() + 20}"
- Prosecco / Crémant : "À boire maintenant – ${new Date().getFullYear() + 2}"
- Champagne millésimé : "À boire maintenant – ${new Date().getFullYear() + 12}"
RÈGLE ABSOLUE : si l'utilisateur a fourni une garde dans "informations supplémentaires", utilise SA valeur. L'utilisateur a TOUJOURS raison.

CARAFAGE — RÈGLES :
- Vin rouge de moins de 5 ans d'âge : minimum 30 minutes de carafage recommandé, sauf Pinot Noir léger/jeune.
- Vin rouge structuré/tannique de moins de 5 ans : recommander 1h minimum.
- Vin blanc/rosé : pas de carafage sauf cuvées ambitieuses boisées.

VERRERIE — RÈGLES :
- Rouge structuré/tannique : "Verre à Bordeaux pour canaliser la structure tannique"
- Rouge élégant/Pinot Noir : "Verre à Bourgogne pour laisser s'exprimer la finesse aromatique"
- Blanc sec : "Verre à vin blanc pour concentrer la fraîcheur"
- Blanc aromatique/moelleux : "Verre à vin blanc étroit pour concentrer les arômes"
- Effervescent : "Flûte à champagne ou verre tulipe pour préserver l'effervescence"
- Rosé : "Verre à vin blanc ou verre à rosé"
- Toujours inclure une courte justification liée au profil du vin.

MOMENT DE SERVICE — RÈGLES :
- Effervescent/rosé léger : "Idéal en apéritif"
- Blanc moelleux/liquoreux : "En apéritif ou en fin de repas avec le dessert"
- Rouge léger : "En entrée ou avec des plats légers"
- Rouge structuré : "En plat principal, idéal avec des viandes ou des plats en sauce"
- Adapter selon le profil réel du vin. Toujours donner 2-3 contextes de dégustation.

RÉGION — RÈGLES :
- Pour les vins de Bordeaux, utiliser "Gironde" comme nom de région (PAS "Bordelais"). Ex: "Bordeaux AOC, Gironde, France".

ACCORDS METS-VINS — RÈGLES :
- Les accords doivent TOUJOURS correspondre au positionnement du vin.
- Vin accessible/entrée de gamme (Bordeaux générique, vins de négoce, < 15€) → plats du quotidien gourmands : entrecôte grillée, pâtes aux champignons, burger maison, planche de charcuterie. PAS de gibier, truffe, plats gastronomiques complexes.
- Vin milieu de gamme (crus bourgeois, villages, 15-30€) → cuisine soignée mais abordable : magret de canard, côte de bœuf, daube provençale, fromages affinés.
- Vin haut de gamme (grands crus, cuvées prestige, > 30€) → accords gastronomiques : carré d'agneau en croûte d'herbes, pigeon rôti aux cèpes, gibier noble.
- En cas de doute sur le positionnement, choisir des accords ACCESSIBLES plutôt que trop ambitieux.
- BLANCS MINÉRAUX / VIFS : jamais d'accords avec des sauces puissantes (cacahuète, tamarin, soja sucré, curry fort) qui écrasent la minéralité. Privilégier : gambas grillées, Saint-Jacques poêlées, poisson en croûte de sel, ceviche, fromage de chèvre frais.
- COHÉRENCE AROMATIQUE : chaque accord doit RESPECTER le profil du vin. Un vin délicat = plat délicat. Un vin puissant = plat puissant. Ne jamais proposer un plat qui domine le vin.

Réponds UNIQUEMENT avec un objet JSON valide (pas de markdown, pas de commentaire, pas de texte avant/après) :
{
  "name": "nom de la cuvée / appellation (ex: Barbaresco DOCG, Châteauneuf-du-Pape)",
  "domaine": "nom du domaine/château (ex: Morra Gabriele, Château Margaux)",
  "vintage": "millésime (ex: 2015) ou '' si non spécifié",
  "region": "appellation + région + pays (ex: Bordeaux AOC, Gironde, France)",
  "country": "pays",
  "grape": "cépages avec % — OBLIGATOIRE",
  "type": "Rouge | Blanc sec | Blanc moelleux | Blanc liquoreux | Rosé | Effervescent | Vin doux naturel | Vin de liqueur — TOUJOURS EN FRANÇAIS, JAMAIS 'Dessert'",
  "alcohol": "degré — OBLIGATOIRE (ex: 14,5%)",
  "domaineDesc": "3-4 phrases + phrase finale sur le positionnement de CETTE cuvée — en ${lang.promptLang}",
  "oeil": "robe, reflets, limpidité — 2-3 phrases évocatrices — en ${lang.promptLang}",
  "nez": "arômes SPÉCIFIQUES (min 2 nommés précisément) — 2-3 phrases — en ${lang.promptLang}",
  "bouche": "progression attaque → milieu → finale qualifiée — 2-3 phrases — en ${lang.promptLang}",
  "accords": ["plat précis 1", "plat précis 2", "plat précis 3"],
  "temperature": "XX-XX°C — OBLIGATOIRE",
  "carafage": "recommandation avec durée — OBLIGATOIRE — en ${lang.promptLang}",
  "garde": "Fenêtre de dégustation des critiques — OBLIGATOIRE, format: 'À boire maintenant – XXXX' ou 'XXXX-XXXX'",
  "verrerie": "MAX 10 mots — type de verre + raison courte — OBLIGATOIRE — en ${lang.promptLang}",
  "momentService": "MAX 15 mots — quand servir (2-3 contextes) — OBLIGATOIRE — en ${lang.promptLang}",
  "critics": [{"name": "Wine Advocate", "score": "95", "window": "2020-2040"}, {"name": "James Suckling", "score": "96", "window": "2020-2035"}],
  "notes": "",
  "superficie": "superficie réelle si connue",
  "ageVignes": "âge des vignes si connu",
  "sol": "composition du sol si connue",
  "exposition": "exposition si connue",
  "altitude": "altitude si connue",
  "rendement": "rendement si connu",
  "vendange": "type de vendange si connu",
  "vinification": "processus de vinification si connu — 1-2 phrases max",
  "elevage": "élevage si connu — 1-2 phrases max",
  "certification": "certifications réelles — vide si non certifié",
  "sulfites": "Contient des sulfites"
}`;
}

// ── Main generation function ───────────────────────────────────────

/**
 * Generate a complete wine technical sheet using the 2-step pipeline.
 * Server-side adaptation of wine-fiches generateFromName().
 *
 * @param {string} wineName - Free-text wine name + domaine
 * @param {string} anthropicApiKey - Anthropic API key (required)
 * @param {string} [perplexityApiKey] - Perplexity API key (optional)
 * @param {object} [options] - Additional options
 * @param {object} [options.userFields] - User-provided fields
 * @param {string} [options.langCode='FR'] - Output language code
 * @returns {Promise<object>} - Complete wine object ready to display
 */
export async function generateWineAI(wineName, anthropicApiKey, perplexityApiKey, options = {}) {
  const { userFields = {}, langCode = 'FR' } = options;
  const lang = getLang(langCode);

  // Build user-provided fields block (EXACT original — "VÉRITÉ ABSOLUE")
  const userFieldLines = [];
  if (userFields.grape) userFieldLines.push(`Cépage(s) : ${userFields.grape}`);
  if (userFields.region) userFieldLines.push(`Appellation / Région / Pays : ${userFields.region}`);
  if (userFields.vintage) userFieldLines.push(`Millésime : ${userFields.vintage}`);
  if (userFields.alcohol) userFieldLines.push(`Degré d'alcool : ${userFields.alcohol}`);
  if (userFields.extraInfo) userFieldLines.push(`Informations supplémentaires : ${userFields.extraInfo}`);
  const userFieldsBlock = userFieldLines.length > 0
    ? `\n\nINFORMATIONS FOURNIES PAR LE CLIENT (VÉRITÉ ABSOLUE — ne JAMAIS contredire) :\n${userFieldLines.join('\n')}\n\nCes données sont FOURNIES PAR L'IMPORTATEUR et sont donc EXACTES. Ne les modifie pas, ne les arrondis pas, ne les "corrige" pas. Les informations supplémentaires peuvent contenir des directives sur la garde, les scores critiques, l'élevage, ou toute autre information à prendre en compte en priorité.`
    : '';

  // ── Step 1: Research ──
  let research;

  if (perplexityApiKey) {
    // Try Perplexity first
    try {
      const perplexityMessages = buildPerplexityMessages(wineName, langCode);
      // Inject user fields into the last message
      if (userFieldsBlock) {
        perplexityMessages[0].content += userFieldsBlock;
      }
      research = await callPerplexity(perplexityApiKey, perplexityMessages);
    } catch (err) {
      console.warn('Perplexity failed, falling back to Claude:', err.message);
      // Fallback to Claude
      const researchQuery = buildClaudeResearchQuery(wineName, langCode) + userFieldsBlock;
      research = await callAnthropic(anthropicApiKey, getResearchSystem(langCode), [
        { role: 'user', content: researchQuery },
      ], 4096);
    }
  } else {
    // No Perplexity key — use Claude
    const researchQuery = buildClaudeResearchQuery(wineName, langCode) + userFieldsBlock;
    research = await callAnthropic(anthropicApiKey, getResearchSystem(langCode), [
      { role: 'user', content: researchQuery },
    ], 4096);
  }

  // ── Step 1b: Critic scores & drinking windows (dedicated search) ──
  let criticData = '';

  // Extract vintage from user fields or wine name for targeted search
  const vintageMatch = (userFields.vintage || wineName).match(/\b(19|20)\d{2}\b/);
  const vintageStr = vintageMatch ? vintageMatch[0] : '';

  console.log('━━━ [STEP 1b] Critic search ━━━');
  console.log('[critics] perplexityApiKey?', !!perplexityApiKey, '| vintageStr:', vintageStr);

  if (perplexityApiKey && vintageStr) {
    try {
      const criticMessages = [
        {
          role: 'user',
          content: `Find ALL professional critic scores and drinking windows for: "${wineName}" ${vintageStr}

Search Wine-Searcher, CellarTracker, Vinous, Wine Advocate, James Suckling, Wine Spectator, Wine Enthusiast, Decanter.

For EACH critic that reviewed this EXACT vintage, provide:
- Critic name
- Score (e.g. 95/100)
- Drinking window (e.g. "2020-2040")

Format your answer as a simple list:
- Wine Advocate: XX/100, drink YYYY-YYYY
- Vinous: XX/100, drink YYYY-YYYY
- James Suckling: XX/100, drink YYYY-YYYY
etc.

ONLY real published scores for this exact vintage. If no score found for a critic, skip it.`,
        },
      ];
      criticData = await callPerplexity(perplexityApiKey, criticMessages);
      console.log('[critics] ✅ Perplexity response (first 500 chars):', criticData.substring(0, 500));
    } catch (err) {
      console.error('[critics] ❌ Perplexity critic search FAILED:', err.message);
    }
  } else {
    console.warn('[critics] ⚠️ SKIPPED — perplexityApiKey:', !!perplexityApiKey, 'vintageStr:', vintageStr);
  }

  // ── Step 2: Format ──

  let formatQuery = `Voici le rapport de recherche. Extrais UNIQUEMENT les informations vérifiées en JSON.

IMPORTANT : Tout ce qui est [INCERTAIN] → "". Ne garde QUE le factuel confirmé.
RAPPEL : Tous les textes descriptifs doivent être en ${lang.promptLang}. Le champ "type" reste EN FRANÇAIS (Rouge | Blanc sec | Blanc moelleux | Blanc liquoreux | Rosé | Effervescent | Vin doux naturel | Vin de liqueur). JAMAIS "Dessert".`;

  if (userFieldsBlock) {
    formatQuery += `
${userFieldsBlock}

RAPPEL CRITIQUE :
- Les données client (cépages, appellation, millésime, degré, température) sont PRIORITAIRES sur toute autre source. Recopie-les TELLES QUELLES dans le JSON.
- Le champ "domaine" du JSON doit être EXACTEMENT le nom fourni par le client, pas celui trouvé par la recherche.
- Si les informations supplémentaires contiennent une description du domaine, UTILISE-LA EN PRIORITÉ pour rédiger "domaineDesc". Tu peux compléter mais JAMAIS ignorer ce que le client a écrit.
- Si les informations supplémentaires mentionnent une température (ex: "10-12°C"), utilise CETTE température, pas celle que tu estimerais.
- Si les informations supplémentaires mentionnent une garde ou fenêtre de dégustation, utilise-la en priorité.
- GARDE pour les vins effervescents légers (Moscato d'Asti, Prosecco, Asti Spumante, < 8% vol) : "À boire dans l'année" ou "À boire maintenant – ${new Date().getFullYear() + 1}". Ces vins ne se gardent PAS.`;
  }

  if (criticData) {
    formatQuery += `

--- SCORES CRITIQUES ET DRINKING WINDOWS (SOURCE FIABLE — prioritaire pour "garde" et "critics") ---
${criticData}
--- FIN SCORES CRITIQUES ---

INSTRUCTION CRITIQUE : Utilise les données ci-dessus pour remplir le champ "critics". Chaque critique doit avoir : "name" (nom court), "score" (note), et "window" (fenêtre de dégustation, ex: "2020-2040"). Le champ "garde" sera calculé automatiquement — mets simplement la fenêtre la plus tardive trouvée.`;
  }

  formatQuery += `

--- RAPPORT DE RECHERCHE ---
${research}
--- FIN RAPPORT ---

Génère le JSON.`;

  const jsonText = await callAnthropic(anthropicApiKey, getFormatSystem(langCode), [
    { role: 'user', content: formatQuery },
  ], 4096);

  // ── Parse JSON ──

  const jsonStr = jsonText.replace(/^```json?\s*/i, '').replace(/\s*```$/i, '').trim();

  let parsed;
  try {
    parsed = JSON.parse(jsonStr);
  } catch {
    throw new Error('Réponse IA invalide (JSON malformé)');
  }

  // Build complete wine object
  const wine = { ...defaultWine };
  for (const key of Object.keys(defaultWine)) {
    if (parsed[key] !== undefined && parsed[key] !== '') {
      wine[key] = parsed[key];
    }
  }

  // ── Post-process: compute garde from critics' drinking windows ──
  console.log('━━━ [POST-PROCESS] Critics & Garde ━━━');
  console.log('[post] parsed.critics:', JSON.stringify(parsed.critics));
  console.log('[post] parsed.garde:', parsed.garde);
  if (Array.isArray(wine.critics) && wine.critics.length > 0) {
    let latestYear = 0;
    for (const c of wine.critics) {
      if (c.window) {
        const years = c.window.match(/\b(20\d{2})\b/g);
        if (years) {
          const endYear = Math.max(...years.map(Number));
          if (endYear > latestYear) latestYear = endYear;
        }
      }
    }
    if (latestYear > 0) {
      const currentYear = new Date().getFullYear();
      const gardeYear = Math.max(latestYear, currentYear);
      wine.garde = `À boire maintenant – ${gardeYear}`;
      console.log(`[garde] Computed from critics: ${wine.garde} (raw: ${latestYear}, clamped to min ${currentYear})`);
    }
  }

  // Auto-assign color based on type (always French key)
  if (parsed.type && WINE_COLORS[parsed.type]) {
    wine.color = WINE_COLORS[parsed.type];
  }

  // Stamp language on wine object
  wine.lang = langCode;

  // Generate ID
  wine.id = Date.now().toString(36);

  return wine;
}
