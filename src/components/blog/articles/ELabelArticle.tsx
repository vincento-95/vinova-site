import Link from 'next/link'

function Callout({ type, children }: { type: 'warning' | 'info' | 'tip'; children: React.ReactNode }) {
  const styles = {
    warning: { bg: 'bg-orange-50', border: 'border-orange-200', icon: '⚠️', text: 'text-orange-900' },
    info: { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'ℹ️', text: 'text-blue-900' },
    tip: { bg: 'bg-green-50', border: 'border-green-200', icon: '💡', text: 'text-green-900' },
  }
  const s = styles[type]
  return (
    <div className={`${s.bg} border ${s.border} rounded-[var(--radius)] px-4 py-4 flex gap-3 my-6`}>
      <span className="text-lg leading-none mt-0.5">{s.icon}</span>
      <div className={`text-sm leading-relaxed ${s.text}`}>{children}</div>
    </div>
  )
}

function KeyFigure({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center my-10">
      <div className="text-4xl md:text-5xl font-bold text-wine">{number}</div>
      <p className="text-text-secondary text-sm mt-2">{label}</p>
    </div>
  )
}

function CTA({ title, description, buttonText, buttonLink }: { title: string; description: string; buttonText: string; buttonLink: string }) {
  return (
    <div className="bg-wine rounded-[var(--radius-lg)] p-6 md:p-8 text-center my-10">
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-white/80 text-sm mb-5">{description}</p>
      <Link href={buttonLink} className="inline-block bg-white text-wine font-semibold px-6 py-3 rounded-[var(--radius)] hover:bg-gray-100 transition">
        {buttonText}
      </Link>
    </div>
  )
}

// Styles réutilisables
const h2 = "text-2xl font-bold text-text mt-12 mb-4"
const h3 = "text-xl font-semibold text-text mt-8 mb-3"
const p = "text-text-secondary leading-relaxed mb-4"
const li = "text-text-secondary leading-relaxed"
const strong = "text-text font-semibold"

export default function ELabelArticle() {
  return (
    <div>
      <p className={p}>
        Si vous êtes vigneron, négociant ou importateur de vin, vous avez forcément entendu parler du nouvel étiquetage européen. Depuis le millésime 2024, chaque vin commercialisé dans l&apos;Union européenne doit afficher ses ingrédients et ses valeurs nutritionnelles — soit directement sur l&apos;étiquette, soit via un QR code renvoyant vers une page web appelée <strong className={strong}>e-label</strong>.
      </p>
      <p className={p}>
        Ce guide fait le point sur ce qui est obligatoire, ce qui est facultatif, et comment vous mettre en conformité concrètement sans perdre des journées entières.
      </p>

      <Callout type="warning">
        Tout vin produit à partir du millésime 2024 et commercialisé dans l&apos;UE doit être conforme. Les vins non conformes peuvent être retirés du marché par la DGCCRF.
      </Callout>

      {/* ===== CE QUI A CHANGÉ ===== */}
      <h2 className={h2}>Ce qui a changé depuis décembre 2023</h2>

      <p className={p}>
        Le Règlement européen (UE) 2021/2117, adopté le 2 décembre 2021, a modifié les règles d&apos;étiquetage des vins en Europe. L&apos;obligation est entrée en vigueur le <strong className={strong}>8 décembre 2023</strong> et s&apos;applique à tous les vins produits à partir de cette date — concrètement, à partir du <strong className={strong}>millésime 2024</strong> pour les vins tranquilles.
      </p>
      <p className={p}>
        Avant cette date, les vins étaient l&apos;un des rares produits alimentaires exemptés de l&apos;obligation d&apos;afficher leurs ingrédients et leurs informations nutritionnelles. Ce n&apos;est plus le cas.
      </p>

      <h3 className={h3}>Ce qui est désormais obligatoire</h3>
      <p className={p}>Chaque vin commercialisé dans l&apos;UE doit communiquer au consommateur :</p>
      <p className={p}>
        La <strong className={strong}>liste des ingrédients</strong> utilisés dans sa fabrication et encore présents dans le produit fini, par ordre décroissant de poids. Cela inclut les raisins, les additifs (sulfites, acide tartrique, gomme arabique, etc.) et les substances allergéniques.
      </p>
      <p className={p}>
        La <strong className={strong}>déclaration nutritionnelle</strong> complète pour 100 ml, comprenant la valeur énergétique (en kJ et kcal), les quantités de matières grasses, d&apos;acides gras saturés, de glucides, de sucres, de protéines et de sel.
      </p>

      <KeyFigure number="59 000" label="exploitations viticoles concernées en France" />

      <h3 className={h3}>Ce qui doit rester sur l&apos;étiquette physique</h3>
      <p className={p}>
        Même si vous utilisez un QR code pour dématérialiser une partie des informations, certains éléments doivent <strong className={strong}>impérativement</strong> figurer sur l&apos;étiquette papier collée sur la bouteille :
      </p>
      <p className={p}>
        La <strong className={strong}>valeur énergétique</strong> exprimée en kJ et kcal pour 100 ml (vous pouvez utiliser le symbole &quot;E&quot; comme raccourci, par exemple : &quot;E (100 ml) : 340 kJ / 81 kcal&quot;).
      </p>
      <p className={p}>
        Les <strong className={strong}>mentions d&apos;allergènes</strong>, notamment &quot;contient des sulfites&quot;. Si votre vin contient des substances issues de lait ou d&apos;œuf (utilisées comme agents de collage), cela doit aussi apparaître sur l&apos;étiquette physique.
      </p>
      <p className={p}>
        Toutes les autres mentions obligatoires qui existaient déjà avant la réforme : dénomination, degré d&apos;alcool, volume, provenance, numéro de lot, embouteilleur.
      </p>

      <h3 className={h3}>Ce qui peut être dématérialisé via le QR code</h3>
      <p className={p}>
        La <strong className={strong}>liste complète des ingrédients</strong> et la <strong className={strong}>déclaration nutritionnelle détaillée</strong> peuvent être renvoyées vers une page web accessible via un QR code imprimé sur l&apos;étiquette. C&apos;est cette page web qu&apos;on appelle l&apos;<strong className={strong}>e-label</strong>.
      </p>
      <p className={p}>
        C&apos;est l&apos;option choisie par la grande majorité des producteurs, parce qu&apos;elle évite de surcharger la contre-étiquette avec un tableau nutritionnel et une longue liste d&apos;ingrédients.
      </p>

      {/* ===== QUI EST CONCERNÉ ===== */}
      <h2 className={h2}>Qui est concerné exactement ?</h2>
      <p className={p}>La réglementation s&apos;applique à <strong className={strong}>tous les acteurs</strong> qui commercialisent du vin dans l&apos;Union européenne.</p>

      <h3 className={h3}>Les vignerons et domaines viticoles</h3>
      <p className={p}>
        Que vous vendiez 500 bouteilles en vente directe ou 500 000 bouteilles via la grande distribution, l&apos;obligation est la même. Chaque cuvée de chaque millésime produit à partir de 2024 doit avoir son e-label.
      </p>

      <h3 className={h3}>Les négociants</h3>
      <p className={p}>
        Si vous achetez du vin, l&apos;assemblez et le conditionnez sous votre marque, l&apos;e-label est de <strong className={strong}>votre</strong> responsabilité. Vous devez disposer des informations sur les ingrédients utilisés par vos fournisseurs pour pouvoir les déclarer.
      </p>

      <h3 className={h3}>Les importateurs</h3>
      <p className={p}>
        Vous importez des vins étrangers (Italie, Espagne, Chili, Argentine, etc.) dans l&apos;UE ? L&apos;e-label est obligatoire, même si le vin est produit hors de l&apos;Union. C&apos;est souvent l&apos;importateur qui doit créer l&apos;e-label, car le producteur étranger ne connaît pas forcément la réglementation européenne.
      </p>

      <h3 className={h3}>Les cavistes et distributeurs</h3>
      <p className={p}>
        Vous n&apos;êtes pas directement responsables de la création de l&apos;e-label, mais vous ne pouvez pas vendre un vin non conforme. Si un de vos fournisseurs n&apos;a pas encore son e-label, c&apos;est un risque pour vous aussi.
      </p>

      <Callout type="info">
        Les vins produits et étiquetés avant le 8 décembre 2023 peuvent continuer à être vendus jusqu&apos;à épuisement des stocks, sans e-label. Seuls les vins du millésime 2024 et suivants sont concernés.
      </Callout>

      {/* ===== CONTENU E-LABEL ===== */}
      <h2 className={h2}>Que doit contenir un e-label conforme ?</h2>
      <p className={p}>La page web vers laquelle pointe le QR code doit contenir des informations précises, dans un format strict.</p>

      <h3 className={h3}>Les informations obligatoires</h3>
      <p className={p}>
        <strong className={strong}>La liste des ingrédients</strong>, dans l&apos;ordre décroissant de poids au moment de leur utilisation. Pour un vin rouge classique, cela ressemble à :
      </p>
      <p className={`${p} italic`}>
        Raisins, sulfites (dioxyde de soufre E220), acide tartrique (E334), gomme arabique (E414).
      </p>
      <p className={p}>
        Les <strong className={strong}>substances allergéniques</strong> doivent être mises en évidence dans la liste (en gras, en majuscules, ou soulignées). Les allergènes courants dans le vin sont les sulfites (quasi systématiques), les substances issues du lait (caséine utilisée en collage) et les substances issues de l&apos;œuf (albumine d&apos;œuf).
      </p>
      <p className={p}>
        <strong className={strong}>La déclaration nutritionnelle</strong> sous forme de tableau, pour 100 ml :
      </p>

      {/* Tableau nutritionnel */}
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="border border-border bg-accent px-4 py-2 text-left font-semibold text-text">Valeur nutritionnelle</th>
              <th className="border border-border bg-accent px-4 py-2 text-left font-semibold text-text">Pour 100 ml</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-border px-4 py-2 text-text-secondary">Énergie</td><td className="border border-border px-4 py-2 text-text-secondary">340 kJ / 81 kcal</td></tr>
            <tr><td className="border border-border px-4 py-2 text-text-secondary">Matières grasses</td><td className="border border-border px-4 py-2 text-text-secondary">0 g</td></tr>
            <tr><td className="border border-border px-4 py-2 text-text-secondary pl-6">dont acides gras saturés</td><td className="border border-border px-4 py-2 text-text-secondary">0 g</td></tr>
            <tr><td className="border border-border px-4 py-2 text-text-secondary">Glucides</td><td className="border border-border px-4 py-2 text-text-secondary">1,0 g</td></tr>
            <tr><td className="border border-border px-4 py-2 text-text-secondary pl-6">dont sucres</td><td className="border border-border px-4 py-2 text-text-secondary">1,0 g</td></tr>
            <tr><td className="border border-border px-4 py-2 text-text-secondary">Protéines</td><td className="border border-border px-4 py-2 text-text-secondary">0 g</td></tr>
            <tr><td className="border border-border px-4 py-2 text-text-secondary">Sel</td><td className="border border-border px-4 py-2 text-text-secondary">0 g</td></tr>
          </tbody>
        </table>
      </div>

      <p className={p}>
        Pour le vin, les valeurs de matières grasses, protéines et sel sont quasi toujours nulles ou négligeables. La réglementation autorise la mention &quot;contient des quantités négligeables de lipides, acides gras saturés, protéines et sel&quot; au lieu d&apos;afficher des zéros partout.
      </p>

      <h3 className={h3}>Ce qui est interdit sur la page e-label</h3>
      <p className={p}>La réglementation est très stricte sur ce point. La page e-label <strong className={strong}>ne doit pas</strong> contenir :</p>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li className={li}>Aucune information commerciale ou marketing (pas de lien vers votre site, pas de description du domaine, pas de photos promotionnelles).</li>
        <li className={li}>Aucun système de collecte de données personnelles (pas de cookies de tracking, pas de formulaire, pas de pixels publicitaires).</li>
      </ul>
      <p className={p}>La page doit être purement informative. C&apos;est un document réglementaire, pas un outil de communication.</p>

      <h3 className={h3}>Les langues</h3>
      <p className={p}>
        La page e-label doit être disponible dans <strong className={strong}>la langue du pays où le vin est commercialisé</strong>. Si vous vendez en France, en Allemagne et en Italie, votre page doit être disponible en français, allemand et italien.
      </p>

      {/* ===== CALCUL NUTRITIONNEL ===== */}
      <h2 className={h2}>Comment calculer les valeurs nutritionnelles de votre vin ?</h2>
      <p className={p}>
        Le calcul est plus simple qu&apos;il n&apos;y paraît. Vous avez besoin de trois données que vous connaissez déjà : le <strong className={strong}>degré d&apos;alcool</strong> (% vol), le <strong className={strong}>sucre résiduel</strong> (en g/L), et l&apos;<strong className={strong}>acidité totale</strong> (en g/L d&apos;acide tartrique).
      </p>

      <h3 className={h3}>La formule de calcul</h3>
      <p className={p}>
        <strong className={strong}>L&apos;énergie provenant de l&apos;alcool</strong> est le poste principal. L&apos;alcool apporte environ 7 kcal par gramme. Pour 100 ml de vin, la formule simplifiée est : degré d&apos;alcool × 5,6 = kcal provenant de l&apos;alcool.
      </p>
      <p className={p}>Exemple : un vin à 13,5 % vol → 13,5 × 5,6 = <strong className={strong}>75,6 kcal</strong> provenant de l&apos;alcool.</p>

      <p className={p}>
        <strong className={strong}>L&apos;énergie provenant des sucres</strong> : les glucides apportent 4 kcal par gramme. Divisez votre sucre résiduel (en g/L) par 10 pour obtenir la valeur en g/100ml, puis multipliez par 4.
      </p>
      <p className={p}>Exemple : un vin sec à 2 g/L de sucre résiduel → 0,2 g/100ml × 4 = <strong className={strong}>0,8 kcal</strong>.</p>

      <p className={p}>
        <strong className={strong}>L&apos;énergie provenant des acides organiques</strong> : les acides apportent environ 3 kcal par gramme. Divisez votre acidité totale par 10 et multipliez par 3.
      </p>
      <p className={p}>Exemple : acidité totale de 5 g/L → 0,5 × 3 = <strong className={strong}>1,5 kcal</strong>.</p>
      <p className={p}><strong className={strong}>Énergie totale</strong> = 75,6 + 0,8 + 1,5 = <strong className={strong}>77,9 kcal</strong> pour 100 ml. Pour convertir en kJ, multipliez par 4,184 = <strong className={strong}>326 kJ</strong>.</p>

      <Callout type="tip">
        Vous n&apos;avez pas envie de faire ces calculs vous-même ? FicheVin génère automatiquement les valeurs nutritionnelles à partir de votre degré d&apos;alcool, sucre résiduel et acidité. En 30 secondes.
      </Callout>

      {/* ===== QR CODE ===== */}
      <h2 className={h2}>Le QR code : les règles à respecter</h2>
      <p className={p}>Le QR code n&apos;est pas un simple autocollant que vous collez n&apos;importe où. Il y a des règles précises.</p>

      <h3 className={h3}>Emplacement sur la bouteille</h3>
      <p className={p}>
        Le QR code doit se trouver <strong className={strong}>dans le même champ visuel</strong> que les autres mentions obligatoires. Concrètement, si vos mentions obligatoires sont sur la contre-étiquette, le QR code doit aussi y être.
      </p>

      <h3 className={h3}>Mention informative obligatoire</h3>
      <p className={p}>
        Le QR code doit être accompagné d&apos;une mention comme <strong className={strong}>&quot;Ingrédients et informations nutritionnelles&quot;</strong>. Sans cette mention, le consommateur ne sait pas ce que le QR code contient.
      </p>

      <h3 className={h3}>Taille et lisibilité</h3>
      <p className={p}>
        Il n&apos;y a pas de taille minimale imposée par le règlement, mais le QR code doit être <strong className={strong}>scannable facilement</strong>. En pratique, un minimum de 13 mm × 13 mm est recommandé, imprimé à 300 dpi ou plus.
      </p>

      <h3 className={h3}>Un QR code par vin</h3>
      <p className={p}>
        Chaque cuvée/millésime distinct doit avoir son propre QR code pointant vers sa propre page e-label. Un Merlot 2024 et un Merlot 2025 sont deux vins différents, ils ont besoin de deux QR codes différents.
      </p>

      {/* ===== DURÉE EN LIGNE ===== */}
      <h2 className={h2}>Combien de temps la page e-label doit-elle rester en ligne ?</h2>
      <p className={p}>
        Votre QR code est <strong className={strong}>imprimé physiquement</strong> sur des bouteilles qui peuvent rester en cave ou en rayon pendant des années. La réglementation prévoit que la page doit rester accessible <strong className={strong}>entre 3 et 10 ans</strong> selon le type de vin.
      </p>
      <p className={p}>
        Si vous hébergez votre page e-label vous-même et que vous oubliez de renouveler votre hébergement dans 3 ans, toutes les bouteilles en circulation auront un QR code qui renvoie vers une page d&apos;erreur. C&apos;est pourquoi il est recommandé d&apos;utiliser une solution dédiée qui garantit l&apos;hébergement sur la durée.
      </p>

      {/* ===== SANCTIONS ===== */}
      <h2 className={h2}>Les sanctions en cas de non-conformité</h2>
      <p className={p}>
        Les contrôles sont effectués par la <strong className={strong}>DGCCRF</strong> en France. Les sanctions possibles sont le retrait du marché des produits non conformes et des amendes administratives. Les contrôles se sont intensifiés depuis 2025, notamment lors des salons professionnels et chez les distributeurs.
      </p>

      {/* ===== COMMENT CRÉER ===== */}
      <h2 className={h2}>Comment créer votre e-label concrètement ?</h2>
      <p className={p}>Vous avez trois options.</p>

      <h3 className={h3}>Option 1 : tout faire sur l&apos;étiquette papier</h3>
      <p className={p}>
        Vous imprimez la liste des ingrédients et le tableau nutritionnel directement sur votre contre-étiquette. C&apos;est conforme, mais cela surcharge considérablement l&apos;étiquette et c&apos;est difficilement compatible avec l&apos;export multi-langues.
      </p>

      <h3 className={h3}>Option 2 : créer la page e-label vous-même</h3>
      <p className={p}>
        Vous créez une page web statique sur votre propre site. C&apos;est gratuit, mais vous devez vous assurer que la page reste en ligne pendant 10 ans, qu&apos;elle ne contient aucun contenu marketing, et qu&apos;elle est traduite dans les langues nécessaires. Pour 5 vins, c&apos;est faisable. Pour 50, c&apos;est un cauchemar.
      </p>

      <h3 className={h3}>Option 3 : utiliser un outil dédié</h3>
      <p className={p}>
        Des plateformes spécialisées génèrent votre e-label, votre QR code et hébergent votre page automatiquement. C&apos;est la solution choisie par la majorité des producteurs.
      </p>

      <CTA
        title="Générez votre e-label + fiche technique en 30 secondes"
        description="FicheVin génère votre e-label conforme UE, votre QR code et votre fiche technique commerciale à partir des mêmes données. Une seule saisie, deux documents."
        buttonText="Essayer gratuitement"
        buttonLink="/#contact"
      />

      {/* ===== ERREURS ===== */}
      <h2 className={h2}>Les erreurs les plus fréquentes</h2>
      <p className={p}>Voici les erreurs qu&apos;on voit revenir le plus souvent :</p>
      <ul className="list-disc pl-6 mb-6 space-y-3">
        <li className={li}><strong className={strong}>Oublier les agents de collage.</strong> Même si la caséine (lait) ou l&apos;albumine d&apos;œuf ne sont plus présentes dans le produit fini, leur utilisation doit être mentionnée.</li>
        <li className={li}><strong className={strong}>Utiliser le même QR code pour tous les vins.</strong> Chaque cuvée/millésime a ses propres ingrédients et valeurs nutritionnelles.</li>
        <li className={li}><strong className={strong}>Mettre du contenu marketing sur la page e-label.</strong> Pas de lien vers votre boutique, pas de description du domaine.</li>
        <li className={li}><strong className={strong}>Oublier la traduction pour l&apos;export.</strong> Un e-label uniquement en français ne suffit pas pour les vins exportés.</li>
        <li className={li}><strong className={strong}>Ne pas afficher la valeur énergétique sur l&apos;étiquette physique.</strong> Même avec un QR code, la mention énergétique doit apparaître sur l&apos;étiquette papier.</li>
      </ul>

      {/* ===== FAQ ===== */}
      <h2 className={h2}>FAQ rapide</h2>

      <h3 className={h3}>Les vins bio sont-ils exemptés ?</h3>
      <p className={p}>Non. La réglementation s&apos;applique à tous les vins, bio ou conventionnels, AOC ou IGP, tranquilles ou effervescents.</p>

      <h3 className={h3}>Et les vins en vrac ?</h3>
      <p className={p}>Oui, les vins en vrac sont aussi concernés. Les informations doivent figurer sur les documents d&apos;accompagnement (DAE, DSA).</p>

      <h3 className={h3}>Mon imprimeur peut-il générer le QR code ?</h3>
      <p className={p}>L&apos;imprimeur imprime le QR code sur l&apos;étiquette, mais il ne crée pas la page e-label qui se trouve derrière. Vous devez d&apos;abord créer la page e-label et le QR code, puis fournir le fichier à votre imprimeur.</p>

      <h3 className={h3}>La bière et les spiritueux sont-ils concernés ?</h3>
      <p className={p}>Pas encore. La réglementation actuelle ne couvre que les vins et les vins aromatisés. Mais l&apos;UE travaille déjà sur une extension.</p>

      <h3 className={h3}>Combien coûte un e-label ?</h3>
      <p className={p}>Les prix varient de gratuit (si vous le faites vous-même) à 2-9 € par vin sur les plateformes spécialisées, ou des abonnements annuels à partir de 60-300 €/an selon le nombre de références.</p>

      {/* ===== RÉSUMÉ ===== */}
      <h2 className={h2}>En résumé</h2>
      <p className={p}>
        L&apos;e-label n&apos;est pas optionnel : c&apos;est une obligation légale pour tout vin du millésime 2024 et suivants vendu dans l&apos;UE. La bonne nouvelle, c&apos;est que la mise en conformité est simple si vous utilisez les bons outils. Les données nécessaires (degré, sucre résiduel, acidité, additifs utilisés) sont des informations que vous avez déjà.
      </p>
      <p className={p}>
        Ne repoussez pas cette mise en conformité. Les contrôles existent, les sanctions aussi, et vos acheteurs professionnels exigent de plus en plus un e-label avant de référencer un nouveau vin.
      </p>
    </div>
  )
}
