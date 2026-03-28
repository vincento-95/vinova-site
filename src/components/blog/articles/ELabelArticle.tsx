import Link from 'next/link'
import BlogFAQ from '../BlogFAQ'

export default function ELabelArticle() {
  return (
    <>
      <p>Si vous êtes vigneron, négociant ou importateur de vin, vous avez forcément entendu parler du nouvel étiquetage européen. Depuis le millésime 2024, chaque vin commercialisé dans l&apos;Union européenne doit afficher ses ingrédients et ses valeurs nutritionnelles — soit directement sur l&apos;étiquette, soit via un QR code renvoyant vers une page web appelée <strong>E-Label</strong>. Si vous cherchez un outil pour <Link href="/e-label">créer votre E-Label conforme UE</Link>, FicheVin vous permet de le faire en quelques minutes.</p>

      <p>Ce guide fait le point sur ce qui est obligatoire, ce qui est facultatif, et comment vous mettre en conformité concrètement sans perdre des journées entières.</p>

      <div className="blog-callout blog-callout-warning">
        <div className="blog-callout-label">⚠ Attention</div>
        <p>Tout vin produit à partir du millésime 2024 et commercialisé dans l&apos;UE doit être conforme. Les vins non conformes peuvent être retirés du marché par la DGCCRF.</p>
      </div>

      {/* TOC */}
      <div className="blog-toc">
        <div className="blog-toc-title">Sommaire</div>
        <ol>
          <li><a href="#changement">Ce qui a changé depuis décembre 2023</a></li>
          <li><a href="#concerne">Qui est concerné exactement ?</a></li>
          <li><a href="#contenu">Que doit contenir un E-Label conforme ?</a></li>
          <li><a href="#calcul">Comment calculer les valeurs nutritionnelles</a></li>
          <li><a href="#qrcode">Le QR code : les règles à respecter</a></li>
          <li><a href="#duree">Durée d&apos;hébergement de la page E-Label</a></li>
          <li><a href="#sanctions">Les sanctions en cas de non-conformité</a></li>
          <li><a href="#comment">Comment créer votre E-Label concrètement</a></li>
          <li><a href="#erreurs">Les erreurs les plus fréquentes</a></li>
          <li><a href="#faq">FAQ rapide</a></li>
        </ol>
      </div>

      {/* SECTION 1 */}
      <h2 id="changement">Ce qui a changé depuis décembre 2023</h2>

      <p>Le Règlement européen (UE) 2021/2117, adopté le 2 décembre 2021, a modifié les règles d&apos;étiquetage des vins en Europe. L&apos;obligation est entrée en vigueur le <strong>8 décembre 2023</strong> et s&apos;applique à tous les vins produits à partir de cette date — concrètement, à partir du <strong>millésime 2024</strong> pour les vins tranquilles.</p>

      <p>Avant cette date, les vins étaient l&apos;un des rares produits alimentaires exemptés de l&apos;obligation d&apos;afficher leurs ingrédients et leurs informations nutritionnelles. Ce n&apos;est plus le cas.</p>

      <h3>Ce qui est désormais obligatoire</h3>

      <p>Chaque vin commercialisé dans l&apos;UE doit communiquer au consommateur la <strong>liste des ingrédients</strong> utilisés dans sa fabrication et encore présents dans le produit fini, par ordre décroissant de poids. Cela inclut les raisins, les additifs (sulfites, acide tartrique, gomme arabique, etc.) et les substances allergéniques.</p>

      <p>Il faut aussi fournir la <strong>déclaration nutritionnelle</strong> complète pour 100 ml, comprenant la valeur énergétique (en kJ et kcal), les quantités de matières grasses, d&apos;acides gras saturés, de glucides, de sucres, de protéines et de sel.</p>

      <div className="blog-key-figure">
        <div className="blog-key-figure-number">59 000</div>
        <div className="blog-key-figure-label">exploitations viticoles concernées en France</div>
      </div>

      <h3>Ce qui doit rester sur l&apos;étiquette physique</h3>

      <p>Même si vous utilisez un QR code pour dématérialiser une partie des informations, certains éléments doivent <strong>impérativement</strong> figurer sur l&apos;étiquette papier collée sur la bouteille.</p>

      <p>La <strong>valeur énergétique</strong> exprimée en kJ et kcal pour 100 ml (vous pouvez utiliser le symbole &quot;E&quot; comme raccourci, par exemple : &quot;E (100 ml) : 340 kJ / 81 kcal&quot;).</p>

      <p>Les <strong>mentions d&apos;allergènes</strong>, notamment &quot;contient des sulfites&quot;. Si votre vin contient des substances issues de lait ou d&apos;œuf (utilisées comme agents de collage), cela doit aussi apparaître sur l&apos;étiquette physique.</p>

      <p>Toutes les autres mentions obligatoires qui existaient déjà avant la réforme : dénomination, degré d&apos;alcool, volume, provenance, numéro de lot, embouteilleur.</p>

      {/* Schéma : ce qui va où */}
      <figure style={{ margin: '36px 0', textAlign: 'center' }}>
        <div style={{ background: '#F7F5F2', borderRadius: 10, padding: '32px 24px', display: 'inline-block', width: '100%', maxWidth: 600 }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center', flex: '1 1 200px' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🏷️</div>
              <div style={{ fontWeight: 600, color: '#1A1A1A', fontSize: 15, marginBottom: 6 }}>Étiquette physique</div>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: 13, color: '#5A5A5A', lineHeight: 1.8 }}>
                <li>Valeur énergétique (kJ/kcal)</li>
                <li>Mentions d&apos;allergènes</li>
                <li>Dénomination, degré, volume</li>
                <li>QR code + mention</li>
              </ul>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', fontSize: 24, color: '#722F37' }}>→</div>
            <div style={{ textAlign: 'center', flex: '1 1 200px' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📱</div>
              <div style={{ fontWeight: 600, color: '#1A1A1A', fontSize: 15, marginBottom: 6 }}>Page E-Label (QR code)</div>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: 13, color: '#5A5A5A', lineHeight: 1.8 }}>
                <li>Liste complète des ingrédients</li>
                <li>Tableau nutritionnel détaillé</li>
                <li>Allergènes en gras</li>
                <li>Multi-langues</li>
              </ul>
            </div>
          </div>
        </div>
        <figcaption style={{ fontSize: 13, color: '#8A8A8A', marginTop: 12 }}>Répartition des informations entre étiquette physique et E-Label numérique</figcaption>
      </figure>

      <h3>Ce qui peut être dématérialisé via le QR code</h3>

      <p>La <strong>liste complète des ingrédients</strong> et la <strong>déclaration nutritionnelle détaillée</strong> peuvent être renvoyées vers une page web accessible via un QR code imprimé sur l&apos;étiquette. C&apos;est cette page web qu&apos;on appelle l&apos;<strong>E-Label</strong>. C&apos;est l&apos;option choisie par la grande majorité des producteurs, parce qu&apos;elle évite de surcharger la contre-étiquette.</p>

      <div className="blog-divider" />

      {/* SECTION 2 */}
      <h2 id="concerne">Qui est concerné exactement ?</h2>

      <p>La réglementation s&apos;applique à <strong>tous les acteurs</strong> qui commercialisent du vin dans l&apos;Union européenne.</p>

      <h3>Les vignerons et domaines viticoles</h3>
      <p>Que vous vendiez 500 bouteilles en vente directe ou 500 000 bouteilles via la grande distribution, l&apos;obligation est la même. Chaque cuvée de chaque millésime produit à partir de 2024 doit avoir son E-Label.</p>

      <h3>Les négociants</h3>
      <p>Si vous achetez du vin, l&apos;assemblez et le conditionnez sous votre marque, l&apos;E-Label est de <strong>votre</strong> responsabilité. Vous devez disposer des informations sur les ingrédients utilisés par vos fournisseurs.</p>

      <h3>Les importateurs</h3>
      <p>Vous importez des vins étrangers dans l&apos;UE ? L&apos;E-Label est obligatoire, même si le vin est produit hors de l&apos;Union. C&apos;est souvent l&apos;importateur qui doit créer l&apos;E-Label, car le producteur étranger ne connaît pas la réglementation européenne.</p>

      <h3>Les cavistes et distributeurs</h3>
      <p>Vous n&apos;êtes pas directement responsables de la création de l&apos;E-Label, mais vous ne pouvez pas vendre un vin non conforme. Si un de vos fournisseurs n&apos;a pas encore son E-Label, c&apos;est un risque pour vous aussi.</p>

      <div className="blog-callout blog-callout-info">
        <div className="blog-callout-label">ℹ Bon à savoir</div>
        <p>Les vins produits et étiquetés avant le 8 décembre 2023 peuvent continuer à être vendus jusqu&apos;à épuisement des stocks, sans E-Label. Seuls les vins du millésime 2024 et suivants sont concernés.</p>
      </div>

      <div className="blog-divider" />

      {/* SECTION 3 */}
      <h2 id="contenu">Que doit contenir un E-Label conforme ?</h2>

      <p>La page web vers laquelle pointe le QR code doit contenir des informations précises, dans un format strict.</p>

      <h3>Les informations obligatoires</h3>
      <p><strong>La liste des ingrédients</strong>, dans l&apos;ordre décroissant de poids au moment de leur utilisation. Pour un vin rouge classique, cela ressemble à :</p>
      <p><em>Raisins, sulfites (dioxyde de soufre E220), acide tartrique (E334), gomme arabique (E414).</em></p>
      <p>Les <strong>substances allergéniques</strong> doivent être mises en évidence dans la liste (en gras, en majuscules, ou soulignées). Les allergènes courants dans le vin sont les sulfites, les substances issues du lait (caséine) et les substances issues de l&apos;œuf (albumine).</p>

      <p><strong>La déclaration nutritionnelle</strong> sous forme de tableau, pour 100 ml :</p>

      <table className="blog-table">
        <thead>
          <tr><th>Valeur nutritionnelle</th><th>Pour 100 ml</th></tr>
        </thead>
        <tbody>
          <tr><td>Énergie</td><td>340 kJ / 81 kcal</td></tr>
          <tr><td>Matières grasses</td><td>0 g</td></tr>
          <tr><td style={{ paddingLeft: 32 }}>dont acides gras saturés</td><td>0 g</td></tr>
          <tr><td>Glucides</td><td>1,0 g</td></tr>
          <tr><td style={{ paddingLeft: 32 }}>dont sucres</td><td>1,0 g</td></tr>
          <tr><td>Protéines</td><td>0 g</td></tr>
          <tr><td>Sel</td><td>0 g</td></tr>
        </tbody>
      </table>

      <p>Pour le vin, les valeurs de matières grasses, protéines et sel sont quasi toujours nulles. La réglementation autorise la mention &quot;contient des quantités négligeables de lipides, acides gras saturés, protéines et sel&quot;.</p>

      <h3>Ce qui est interdit sur la page E-Label</h3>
      <p>La page E-Label <strong>ne doit pas</strong> contenir d&apos;information commerciale ou marketing (pas de lien vers votre site, pas de description du domaine), ni de système de collecte de données personnelles (pas de cookies de tracking, pas de formulaire). La page doit être purement informative.</p>

      <h3>Les langues</h3>
      <p>La page E-Label doit être disponible dans <strong>la langue du pays où le vin est commercialisé</strong>. Si vous vendez en France, en Allemagne et en Italie, votre page doit être disponible en français, allemand et italien.</p>

      <div className="blog-divider" />

      {/* SECTION 4 */}
      <h2 id="calcul">Comment calculer les valeurs nutritionnelles de votre vin</h2>

      <p>Le calcul est plus simple qu&apos;il n&apos;y paraît. Vous avez besoin de trois données que vous connaissez déjà : le <strong>degré d&apos;alcool</strong> (% vol), le <strong>sucre résiduel</strong> (en g/L), et l&apos;<strong>acidité totale</strong> (en g/L d&apos;acide tartrique).</p>

      <h3>La formule de calcul</h3>
      <p><strong>L&apos;énergie provenant de l&apos;alcool</strong> est le poste principal. Pour 100 ml de vin, la formule simplifiée est : degré d&apos;alcool × 5,6 = kcal provenant de l&apos;alcool. Exemple : un vin à 13,5 % vol → 13,5 × 5,6 = <strong>75,6 kcal</strong>.</p>
      <p><strong>L&apos;énergie provenant des sucres</strong> : divisez votre sucre résiduel (en g/L) par 10, puis multipliez par 4. Exemple : un vin sec à 2 g/L → 0,2 × 4 = <strong>0,8 kcal</strong>.</p>
      <p><strong>L&apos;énergie provenant des acides organiques</strong> : divisez votre acidité totale par 10 et multipliez par 3. Exemple : acidité de 5 g/L → 0,5 × 3 = <strong>1,5 kcal</strong>.</p>
      <p><strong>Énergie totale</strong> = 75,6 + 0,8 + 1,5 = <strong>77,9 kcal</strong> pour 100 ml. Pour convertir en kJ, multipliez par 4,184 = <strong>326 kJ</strong>.</p>

      <div className="blog-callout blog-callout-tip">
        <div className="blog-callout-label">💡 Astuce</div>
        <p>Vous n&apos;avez pas envie de faire ces calculs vous-même ? Notre <Link href="/e-label">générateur d&apos;E-Labels</Link> calcule automatiquement les valeurs nutritionnelles à partir de votre degré d&apos;alcool, sucre résiduel et acidité. En 30 secondes.</p>
      </div>

      <div className="blog-divider" />

      {/* SECTION 5 */}
      <h2 id="qrcode">Le QR code : les règles à respecter</h2>

      <h3>Emplacement sur la bouteille</h3>
      <p>Le QR code doit se trouver <strong>dans le même champ visuel</strong> que les autres mentions obligatoires. Si vos mentions sont sur la contre-étiquette, le QR code doit aussi y être.</p>

      <h3>Mention informative obligatoire</h3>
      <p>Le QR code doit être accompagné d&apos;une mention comme <strong>&quot;Ingrédients et informations nutritionnelles&quot;</strong>. Sans cette mention, le consommateur ne sait pas ce que le QR code contient.</p>

      <h3>Taille et lisibilité</h3>
      <p>Pas de taille minimale imposée, mais le QR code doit être scannable facilement. Un minimum de <strong>13 mm × 13 mm</strong> est recommandé, imprimé à 300 dpi. Testez toujours vos QR codes une fois imprimés sur l&apos;étiquette finale.</p>

      {/* Schéma : flux QR code */}
      <figure style={{ margin: '36px 0', textAlign: 'center' }}>
        <div style={{ background: '#F7F5F2', borderRadius: 10, padding: '28px 24px', display: 'inline-block', width: '100%', maxWidth: 600 }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ background: '#fff', border: '1px solid #E8E5E0', borderRadius: 8, padding: '16px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>📝</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A' }}>Remplir le formulaire</div>
              <div style={{ fontSize: 11, color: '#8A8A8A' }}>Degré, sucre, acidité, ingrédients</div>
            </div>
            <div style={{ fontSize: 20, color: '#722F37' }}>→</div>
            <div style={{ background: '#fff', border: '1px solid #E8E5E0', borderRadius: 8, padding: '16px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>⚙️</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A' }}>Calcul automatique</div>
              <div style={{ fontSize: 11, color: '#8A8A8A' }}>Valeurs nutritionnelles UE</div>
            </div>
            <div style={{ fontSize: 20, color: '#722F37' }}>→</div>
            <div style={{ background: '#fff', border: '1px solid #E8E5E0', borderRadius: 8, padding: '16px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>📲</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A' }}>QR code + page</div>
              <div style={{ fontSize: 11, color: '#8A8A8A' }}>Téléchargement PNG / SVG</div>
            </div>
          </div>
        </div>
        <figcaption style={{ fontSize: 13, color: '#8A8A8A', marginTop: 12 }}>Les 3 étapes pour créer un E-Label avec <Link href="/e-label" style={{ color: '#722F37' }}>FicheVin</Link></figcaption>
      </figure>

      <h3>Un QR code par vin</h3>
      <p>Chaque cuvée/millésime distinct doit avoir son propre QR code. Un Merlot 2024 et un Merlot 2025 sont deux vins différents, ils ont besoin de deux QR codes. En revanche, toutes les bouteilles d&apos;un même vin peuvent partager le même QR code.</p>

      <div className="blog-divider" />

      {/* SECTION 6 */}
      <h2 id="duree">Combien de temps la page E-Label doit-elle rester en ligne ?</h2>
      <p>Votre QR code est <strong>imprimé physiquement</strong> sur des bouteilles qui peuvent rester en cave ou en rayon pendant des années. La réglementation prévoit que la page doit rester accessible <strong>entre 3 et 10 ans</strong> selon le type de vin.</p>
      <p>Si vous hébergez votre page vous-même et que vous oubliez de renouveler votre hébergement dans 3 ans, toutes les bouteilles en circulation auront un QR code mort. C&apos;est pourquoi il est recommandé d&apos;utiliser une solution dédiée qui garantit l&apos;hébergement sur la durée.</p>

      <div className="blog-divider" />

      {/* SECTION 7 */}
      <h2 id="sanctions">Les sanctions en cas de non-conformité</h2>
      <p>Les contrôles sont effectués par la <strong>DGCCRF</strong> en France. Les sanctions possibles sont le <strong>retrait du marché</strong> des produits non conformes, et des amendes administratives. Les contrôles se sont intensifiés depuis 2025, notamment lors des salons professionnels et chez les distributeurs.</p>

      <div className="blog-divider" />

      {/* SECTION 8 */}
      <h2 id="comment">Comment créer votre E-Label concrètement</h2>

      <h3>Option 1 : tout faire sur l&apos;étiquette papier</h3>
      <p>Vous imprimez la liste des ingrédients et le tableau nutritionnel directement sur votre contre-étiquette. Pas besoin de QR code. C&apos;est conforme, mais cela surcharge l&apos;étiquette et c&apos;est difficilement compatible avec l&apos;export multi-langues.</p>

      <h3>Option 2 : créer la page E-Label vous-même</h3>
      <p>Vous créez une page web statique sur votre propre site. C&apos;est gratuit, mais vous devez vous assurer que la page reste en ligne pendant 10 ans, qu&apos;elle ne contient aucun contenu marketing, et qu&apos;elle est traduite. Pour 5 vins, c&apos;est faisable. Pour 50, c&apos;est un cauchemar.</p>

      <h3>Option 3 : utiliser un outil dédié</h3>
      <p>Des plateformes spécialisées comme <Link href="/e-label">FicheVin</Link> génèrent votre E-Label, votre QR code et hébergent votre page automatiquement. Vous remplissez un formulaire, vous récupérez votre QR code prêt à envoyer à l&apos;imprimeur. C&apos;est la solution choisie par la majorité des producteurs.</p>

      <div className="blog-cta">
        <h3>Générez votre E-Label + fiche technique en 30 secondes</h3>
        <p>FicheVin génère votre E-Label conforme UE, votre QR code et votre fiche technique commerciale à partir des mêmes données. Une seule saisie, deux documents.</p>
        <Link href="/#contact" className="blog-cta-button">Essayer gratuitement →</Link>
      </div>

      <div className="blog-divider" />

      {/* SECTION 9 */}
      <h2 id="erreurs">Les erreurs les plus fréquentes</h2>

      <p><strong>Oublier les agents de collage.</strong> Même si la caséine (lait) ou l&apos;albumine d&apos;œuf ne sont plus présentes dans le produit fini, leur utilisation doit être mentionnée comme allergène potentiel. Beaucoup de vignerons l&apos;oublient.</p>
      <p><strong>Utiliser le même QR code pour tous les vins.</strong> Chaque cuvée/millésime a ses propres ingrédients et valeurs nutritionnelles. Un QR code unique pour tout le domaine n&apos;est pas conforme.</p>
      <p><strong>Mettre du contenu marketing sur la page E-Label.</strong> Pas de lien vers votre boutique en ligne, pas de description du domaine. La page doit être purement informative.</p>
      <p><strong>Oublier la traduction pour l&apos;export.</strong> Un E-Label uniquement en français ne suffit pas pour les vins exportés en Allemagne ou en Italie.</p>
      <p><strong>Ne pas afficher la valeur énergétique sur l&apos;étiquette physique.</strong> Même avec un QR code, la mention &quot;E (100 ml) : X kJ / Y kcal&quot; doit apparaître sur l&apos;étiquette papier. C&apos;est l&apos;erreur la plus courante.</p>

      <div className="blog-divider" />

      {/* SECTION 10 - FAQ */}
      <h2 id="faq">FAQ rapide</h2>

      <BlogFAQ items={[
        { q: 'Les vins bio sont-ils exemptés ?', a: 'Non. La réglementation s\'applique à tous les vins, bio ou conventionnels, AOC ou IGP, tranquilles ou effervescents.' },
        { q: 'Et les vins en vrac ?', a: 'Oui, les vins en vrac sont aussi concernés. Les informations doivent figurer sur les documents d\'accompagnement (DAE, DSA).' },
        { q: 'Mon imprimeur peut-il générer le QR code ?', a: 'L\'imprimeur imprime le QR code sur l\'étiquette, mais il ne crée pas la page E-Label qui se trouve derrière. Vous devez d\'abord créer la page E-Label et le QR code, puis fournir le fichier à votre imprimeur.' },
        { q: 'La bière et les spiritueux sont-ils concernés ?', a: 'Pas encore. La réglementation actuelle ne couvre que les vins et les vins aromatisés. L\'UE travaille sur une extension aux spiritueux et à la bière.' },
        { q: 'Combien coûte un E-Label ?', a: 'Les prix varient de gratuit (si vous le faites vous-même) à 2-9 € par vin sur les plateformes spécialisées, ou des abonnements annuels à partir de 60-300 €/an selon le nombre de références.' },
      ]} />

      <div className="blog-divider" />

      {/* CONCLUSION */}
      <h2>En résumé</h2>
      <p>L&apos;E-Label n&apos;est pas optionnel : c&apos;est une <strong>obligation légale</strong> pour tout vin du millésime 2024 et suivants vendu dans l&apos;UE. La bonne nouvelle, c&apos;est que la mise en conformité est simple si vous utilisez les bons outils. Les données nécessaires — degré, sucre résiduel, acidité, additifs — sont des informations que vous avez déjà.</p>
      <p>Ne repoussez pas cette mise en conformité. Les contrôles existent, les sanctions aussi, et vos acheteurs professionnels exigent de plus en plus un E-Label avant de référencer un nouveau vin.</p>

      <div className="blog-cta">
        <h3>Mettez-vous en conformité en 2 minutes</h3>
        <p>FicheVin génère votre E-Label conforme UE + votre fiche technique commerciale + votre QR code. Testez gratuitement.</p>
        <Link href="/#contact" className="blog-cta-button">Créer mon E-Label gratuit →</Link>
      </div>
    </>
  )
}
