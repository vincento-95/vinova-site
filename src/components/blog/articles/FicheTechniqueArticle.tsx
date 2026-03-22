import Link from 'next/link'
import BlogFAQ from '../BlogFAQ'

export default function FicheTechniqueArticle() {
  return (
    <>
      <p>Vous gérez 50, 100, 200 références et vos fiches techniques datent du millésime précédent — quand elles existent. Vos commerciaux envoient des PDF Word sans logo, des pages web copiées-collées, ou pire : rien du tout. Le caviste qui reçoit ça passe au fournisseur suivant.</p>

      <p>Une fiche technique bien faite, c&apos;est le premier argument de vente de votre vin. Ce guide vous donne le modèle exact, section par section, avec des exemples concrets et les erreurs à éviter.</p>

      <p>Si vous cherchez un outil pour <Link href="/">générer vos fiches techniques automatiquement</Link>, FicheVin le fait en 2 minutes par vin.</p>

      {/* TOC */}
      <div className="blog-toc">
        <div className="blog-toc-title">Sommaire</div>
        <ol>
          <li><a href="#a-quoi-sert">À quoi sert une fiche technique vin</a></li>
          <li><a href="#informations">Les 12 informations indispensables</a></li>
          <li><a href="#modele">Modèle type d&apos;une fiche technique complète</a></li>
          <li><a href="#degustation">Comment rédiger la dégustation (œil, nez, bouche)</a></li>
          <li><a href="#accords">Les accords mets-vins : comment les choisir</a></li>
          <li><a href="#erreurs">Les erreurs les plus fréquentes</a></li>
          <li><a href="#difference">Fiche technique vs fiche commerciale</a></li>
          <li><a href="#creer">Comment créer vos fiches efficacement</a></li>
          <li><a href="#exemples">Exemples avant/après</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ol>
      </div>

      {/* ===== SECTION 1 ===== */}
      <h2 id="a-quoi-sert">À quoi sert une fiche technique vin</h2>

      <p>Une fiche technique vin est un document PDF ou papier qui accompagne chaque référence de votre catalogue. C&apos;est l&apos;outil que vos commerciaux envoient par email aux cavistes, restaurateurs et distributeurs pour présenter un vin.</p>

      <h3>Pour vos commerciaux</h3>
      <p>Sans fiche technique, votre commercial doit décrire le vin de mémoire. Avec une fiche structurée, il envoie un PDF professionnel qui fait le travail de vente à sa place. Le caviste le lit, le transmet à son équipe, le garde dans ses dossiers.</p>

      <h3>Pour vos clients (cavistes, CHR)</h3>
      <p>Le caviste reçoit des dizaines de propositions par semaine. Il compare les fiches. Celle qui a une dégustation structurée, des accords mets-vins concrets et un design soigné se démarque. Celle qui dit juste &quot;vin rouge, 13%, viande rouge&quot; finit à la poubelle.</p>

      <h3>Pour votre image de marque</h3>
      <p>Votre fiche technique est le premier contact visuel entre votre entreprise et un acheteur potentiel. Logo, charte graphique, mise en page soignée : c&apos;est votre carte de visite.</p>

      <div className="blog-key-figure">
        <div className="blog-key-figure-number">50 h/an</div>
        <div className="blog-key-figure-label">passées à créer des fiches techniques pour un importateur avec 100 références (à 30 min/fiche)</div>
      </div>

      <div className="blog-divider" />

      {/* ===== SECTION 2 ===== */}
      <h2 id="informations">Les 12 informations indispensables</h2>

      <p>Voici les informations qu&apos;une fiche technique vin professionnelle doit contenir. Toutes ne sont pas obligatoires légalement, mais toutes sont attendues par les acheteurs professionnels.</p>

      <h3>Informations de base</h3>

      <p><strong>1. Nom du vin / cuvée</strong> — le nom exact tel qu&apos;il apparaît sur l&apos;étiquette.</p>
      <p><strong>2. Domaine / producteur</strong> — avec une courte description (3-4 phrases) : histoire, philosophie, superficie, particularité.</p>
      <p><strong>3. Appellation / région / pays</strong> — l&apos;appellation officielle (AOC, DOC, DOCG, etc.), la région viticole et le pays d&apos;origine.</p>
      <p><strong>4. Millésime</strong> — l&apos;année de vendange. Chaque millésime a ses caractéristiques propres, la fiche doit être mise à jour chaque année.</p>
      <p><strong>5. Cépage(s)</strong> — avec les pourcentages d&apos;assemblage si connus (ex : &quot;60% Merlot, 40% Cabernet Sauvignon&quot;).</p>
      <p><strong>6. Degré d&apos;alcool</strong> — en pourcentage volumique (ex : &quot;13,5% vol.&quot;). Information légale obligatoire souvent oubliée sur les fiches.</p>

      <h3>Informations de dégustation</h3>

      <p><strong>7. Notes de dégustation</strong> — structurées en trois parties : œil (aspect visuel), nez (arômes), bouche (saveurs, texture, finale). C&apos;est la section la plus importante pour vendre le vin.</p>
      <p><strong>8. Accords mets-vins</strong> — 3 à 4 suggestions de plats précis, pas juste &quot;viande rouge&quot; ou &quot;poisson&quot;.</p>

      <h3>Informations de service</h3>

      <p><strong>9. Température de service</strong> — en degrés Celsius (ex : &quot;16-18°C&quot;).</p>
      <p><strong>10. Potentiel de garde</strong> — fenêtre de dégustation optimale (ex : &quot;À boire maintenant – 2032&quot;).</p>
      <p><strong>11. Conseil de carafage</strong> — si le vin nécessite une aération, précisez la durée recommandée.</p>

      <h3>Information de vinification</h3>

      <p><strong>12. Vinification et élevage</strong> — méthode de vendange, fermentation, type et durée d&apos;élevage (fût de chêne, cuve inox, etc.).</p>

      <div className="blog-callout blog-callout-info">
        <div className="blog-callout-label">ℹ Bon à savoir</div>
        <p>Les acheteurs professionnels accordent le plus d&apos;importance à trois sections : la dégustation, les accords mets-vins et le degré d&apos;alcool. Ce sont paradoxalement les trois sections les plus souvent absentes ou bâclées.</p>
      </div>

      <div className="blog-divider" />

      {/* ===== SECTION 3 ===== */}
      <h2 id="modele">Modèle type d&apos;une fiche technique complète</h2>

      <p>Voici la structure recommandée pour une fiche technique vin d&apos;une page (format PDF, A4) :</p>

      <h3>En-tête</h3>
      <ul>
        <li>Logo de votre entreprise (importateur/négociant)</li>
        <li>Nom du vin en grand</li>
        <li>Appellation et millésime</li>
        <li>Photo de la bouteille</li>
      </ul>

      <h3>Bloc &quot;Le domaine&quot;</h3>
      <p>3-4 phrases sur le domaine : histoire, terroir, philosophie de vinification. Terminez par une phrase qui explique pourquoi cette cuvée mérite l&apos;attention (positionnement dans la gamme, rapport qualité-prix, distinction).</p>

      <h3>Bloc &quot;Données techniques&quot;</h3>
      <p>Présenté sous forme de tableau ou de pictogrammes :</p>

      <table className="blog-table">
        <thead>
          <tr><th>Donnée</th><th>Exemple</th></tr>
        </thead>
        <tbody>
          <tr><td>Type</td><td>Rouge</td></tr>
          <tr><td>Cépage(s)</td><td>Sangiovese 100%</td></tr>
          <tr><td>Alcool</td><td>13,5% vol.</td></tr>
          <tr><td>Température</td><td>16-18°C</td></tr>
          <tr><td>Garde</td><td>À boire maintenant – 2033</td></tr>
        </tbody>
      </table>

      <h3>Bloc &quot;Notes de dégustation&quot;</h3>
      <p>Trois sections distinctes :</p>
      <ul>
        <li><strong>Œil</strong> : 2-3 phrases sur la robe (couleur, intensité, reflets, limpidité)</li>
        <li><strong>Nez</strong> : 2-3 phrases avec minimum 3 arômes spécifiques</li>
        <li><strong>Bouche</strong> : 2-3 phrases décrivant une progression (attaque → milieu → finale)</li>
      </ul>

      <h3>Bloc &quot;Accords mets-vins&quot;</h3>
      <p>4 plats précis et adaptés au profil réel du vin. Pas de généralités.</p>

      <h3>Bloc &quot;Service&quot;</h3>
      <ul>
        <li>Moment de service idéal (apéritif, repas, méditation)</li>
        <li>Conseil de carafage</li>
        <li>Type de verre recommandé</li>
      </ul>

      <h3>Pied de page</h3>
      <p>Coordonnées de l&apos;importateur, site web, réseaux sociaux.</p>

      <div className="blog-divider" />

      {/* ===== SECTION 4 ===== */}
      <h2 id="degustation">Comment rédiger la dégustation (œil, nez, bouche)</h2>

      <p>C&apos;est la section qui fait vendre le vin. Et c&apos;est celle que la plupart des importateurs bâclent ou copient-collent d&apos;un vin à l&apos;autre.</p>

      <h3>L&apos;œil</h3>
      <p>Décrivez la robe du vin en termes professionnels. La couleur (rubis, grenat, pourpre, or pâle, jaune doré), l&apos;intensité (légère, moyenne, profonde), la limpidité (limpide, brillant, voilé), et les reflets éventuels (violacés, orangés, verts).</p>
      <p><strong>Exemple pour un rouge :</strong> <em>&quot;Robe grenat profond aux reflets violacés, d&apos;une belle intensité. La couleur témoigne d&apos;une extraction soignée et d&apos;une maturité optimale des raisins.&quot;</em></p>
      <p><strong>Exemple pour un blanc :</strong> <em>&quot;Robe or pâle aux reflets verts caractéristiques, limpide et brillante. Les nuances dorées témoignent de la concentration du fruit.&quot;</em></p>

      <h3>Le nez</h3>
      <p>Décrivez les arômes en étant spécifique. Évitez &quot;arômes de fruits&quot; — dites plutôt &quot;cassis, mûre, violette&quot;. Regroupez les arômes par famille : fruits, fleurs, épices, boisé, minéral.</p>
      <p><strong>Exemple :</strong> <em>&quot;Bouquet expressif dominé par les fruits noirs mûrs — cassis, mûre sauvage — rehaussé de notes d&apos;épices douces (cannelle, poivre blanc) et d&apos;une touche vanillée apportée par l&apos;élevage en fût.&quot;</em></p>

      <h3>La bouche</h3>
      <p>Décrivez une progression : l&apos;attaque (première impression), le milieu de bouche (structure, texture) et la finale (longueur, dernières impressions).</p>
      <p><strong>Exemple :</strong> <em>&quot;Attaque franche et généreuse, révélant un fruit mûr et concentré. Le milieu de bouche déploie des tanins soyeux et une acidité fraîche qui structure l&apos;ensemble. La finale s&apos;étire longuement sur des notes de réglisse et de cacao.&quot;</em></p>

      <div className="blog-callout blog-callout-tip">
        <div className="blog-callout-label">💡 Règle d&apos;or</div>
        <p>Si on lit votre dégustation et qu&apos;on n&apos;a pas envie d&apos;ouvrir la bouteille, la fiche a échoué.</p>
      </div>

      <div className="blog-divider" />

      {/* ===== SECTION 5 ===== */}
      <h2 id="accords">Les accords mets-vins : comment les choisir</h2>

      <p>&quot;Viande rouge&quot; n&apos;est pas un accord mets-vins. C&apos;est une catégorie. Un accord, c&apos;est un plat précis.</p>

      <h3>La méthode</h3>
      <p>Partez du profil du vin et proposez 4 plats qui fonctionnent par complémentarité ou par contraste :</p>

      <ul>
        <li><strong>Vin rouge charpenté</strong> (Barolo, Châteauneuf-du-Pape) : côte de bœuf grillée au thym, daube provençale, fromage d&apos;Époisses, carré d&apos;agneau en croûte d&apos;herbes</li>
        <li><strong>Vin blanc sec minéral</strong> (Chablis, Sancerre) : huîtres de Belon, coquilles Saint-Jacques poêlées, sole meunière, chèvre frais sur toast</li>
        <li><strong>Vin rosé de Provence</strong> : salade niçoise, tian de légumes, gambas grillées, pizza Margherita</li>
        <li><strong>Vin effervescent</strong> (Champagne, Crémant) : gougères au comté, sashimi de saumon, risotto aux crevettes, tarte aux fruits frais</li>
      </ul>

      <h3>Ce qu&apos;il faut éviter</h3>
      <ul>
        <li>Les accords trop vagues : &quot;viande&quot;, &quot;poisson&quot;, &quot;fromage&quot;</li>
        <li>Les accords incohérents : un Sauternes avec un steak</li>
        <li>Copier-coller les mêmes accords sur tous les rouges de votre catalogue</li>
      </ul>

      <div className="blog-divider" />

      {/* ===== SECTION 6 ===== */}
      <h2 id="erreurs">Les erreurs les plus fréquentes</h2>

      <p>Après avoir audité les fiches de dizaines d&apos;importateurs, voici les erreurs qui reviennent systématiquement.</p>

      <h3>Erreur 1 : le copier-coller entre fiches</h3>
      <p>Un commercial copie la fiche d&apos;un vin pour en créer une autre et oublie de modifier certains champs. Résultat : un Gewurztraminer étiqueté &quot;100% Sauvignon Blanc&quot;. Ça arrive plus souvent qu&apos;on ne le pense.</p>

      <h3>Erreur 2 : pas de degré d&apos;alcool</h3>
      <p>C&apos;est une information légale obligatoire. Pourtant, dans un audit de 24 fiches d&apos;importateurs, 11 ne mentionnaient pas le degré d&apos;alcool. C&apos;est aussi l&apos;une des premières choses qu&apos;un caviste regarde.</p>

      <h3>Erreur 3 : des accords mets-vins paresseux</h3>
      <p>&quot;Se marie avec les viandes rouges et les fromages&quot; — c&apos;est vrai pour 90% des vins rouges du monde. Ce n&apos;est pas une information utile. Proposez des plats précis.</p>

      <h3>Erreur 4 : aucune mise à jour au changement de millésime</h3>
      <p>Le millésime 2022 n&apos;est pas le millésime 2023. Le degré change, les arômes évoluent, les assemblages varient. Envoyer une fiche du millésime précédent à un acheteur, c&apos;est lui envoyer des informations fausses.</p>

      <h3>Erreur 5 : un design qui ne représente pas votre marque</h3>
      <p>Une fiche en Word sans logo, en Times New Roman, avec des tableaux gris. Votre vin vaut 30€ la bouteille mais sa fiche ressemble à un devoir de collège.</p>

      <div className="blog-divider" />

      {/* ===== SECTION 7 ===== */}
      <h2 id="difference">Fiche technique vs fiche commerciale : quelle différence ?</h2>

      <p>On confond souvent les deux, mais elles n&apos;ont pas le même objectif.</p>

      <h3>La fiche technique</h3>
      <p>Document factuel et complet : toutes les données du vin (cépage, degré, vinification, élevage, sol, rendement). C&apos;est le document de référence pour les professionnels qui veulent tout savoir.</p>

      <h3>La fiche commerciale</h3>
      <p>Document orienté vente : dégustation attractive, accords mets-vins, histoire du domaine, mise en page soignée. C&apos;est le document que le commercial envoie pour donner envie d&apos;acheter.</p>

      <h3>La meilleure approche</h3>
      <p>Combinez les deux dans un seul document. Les acheteurs professionnels veulent des données techniques ET une présentation qui donne envie. Une fiche qui a les deux est plus efficace que deux documents séparés.</p>

      <div className="blog-divider" />

      {/* ===== SECTION 8 ===== */}
      <h2 id="creer">Comment créer vos fiches efficacement</h2>

      <h3>Option 1 : en interne (Word/InDesign)</h3>
      <p>Vous créez chaque fiche manuellement dans Word ou InDesign. C&apos;est gratuit mais c&apos;est 30 minutes par fiche minimum. Pour 100 références, c&apos;est 50 heures de travail. Et chaque changement de millésime, on recommence.</p>
      <p><strong>Adapté pour :</strong> moins de 10 références, si vous avez un graphiste en interne.</p>

      <h3>Option 2 : un graphiste freelance</h3>
      <p>Vous sous-traitez la mise en page à un freelance. Comptez 30 à 50€ par fiche. Pour 100 références : 3 000 à 5 000€. Plus les allers-retours de correction, les mises à jour, les traductions.</p>
      <p><strong>Adapté pour :</strong> un one-shot sur un petit catalogue.</p>

      <h3>Option 3 : un outil de génération automatique</h3>
      <p>Des solutions comme <Link href="/">FicheVin</Link> génèrent une fiche complète — dégustation, accords, données techniques, PDF brandé avec votre logo — en moins de 2 minutes. Vous saisissez les données de base (nom, cépage, appellation, degré) et l&apos;IA complète la dégustation, les accords et la mise en page.</p>
      <p><strong>Adapté pour :</strong> les importateurs et négociants avec 50+ références qui veulent un catalogue homogène sans y passer des semaines.</p>

      <div className="blog-cta">
        <h3>Générez vos fiches en 2 minutes</h3>
        <p>FicheVin crée des fiches techniques complètes et professionnelles à partir de vos données. Dégustation structurée, accords mets-vins, PDF brandé. Testez gratuitement sur 5 de vos vins.</p>
        <Link href="/#contact" className="blog-cta-button">Essayer gratuitement →</Link>
      </div>

      <div className="blog-divider" />

      {/* ===== SECTION 9 ===== */}
      <h2 id="exemples">Exemples avant/après</h2>

      <h3>Avant : fiche typique d&apos;un importateur</h3>
      <div style={{ background: '#F7F5F2', borderRadius: 10, padding: '24px 28px', margin: '20px 0', borderLeft: '4px solid #E8E5E0' }}>
        <p style={{ marginBottom: 8 }}><strong>Vin :</strong> Chianti Classico DOCG</p>
        <p style={{ marginBottom: 8 }}><strong>Cépage :</strong> Sangiovese</p>
        <p style={{ marginBottom: 8 }}><strong>Région :</strong> Toscane</p>
        <p style={{ marginBottom: 8 }}><strong>Dégustation :</strong> Vin rouge fruité aux tanins souples.</p>
        <p style={{ marginBottom: 0 }}><strong>Accords :</strong> Viandes rouges, pâtes.</p>
      </div>
      <p>5 lignes. Pas de degré, pas de millésime, pas de température, pas d&apos;histoire, pas de garde. Le caviste lit ça en 3 secondes et passe au suivant.</p>

      <h3>Après : fiche générée par FicheVin</h3>
      <div style={{ background: '#fff', border: '1px solid #E8E5E0', borderRadius: 10, padding: '24px 28px', margin: '20px 0', borderLeft: '4px solid #722F37' }}>
        <p style={{ fontWeight: 700, fontSize: 18, color: '#1A1A1A', marginBottom: 12 }}>Isole e Olena — Chianti Classico DOCG 2021</p>
        <p style={{ marginBottom: 12 }}><strong>Le domaine :</strong> Isole e Olena est un domaine historique situé au cœur du Chianti Classico, à Barberino Val d&apos;Elsa. Depuis 1956, la famille De Marchi perpétue une viticulture exigeante sur 56 hectares de vignes en altitude (350-450 m). Cette cuvée incarne l&apos;expression pure du Sangiovese toscan.</p>
        <p style={{ marginBottom: 12, fontSize: 14, color: '#5A5A5A' }}>Sangiovese 100% · 13,5% vol. · 16-18°C · À boire maintenant – 2033</p>
        <p style={{ marginBottom: 8 }}><strong>Œil :</strong> Robe rubis intense aux reflets grenat, limpide et brillante.</p>
        <p style={{ marginBottom: 8 }}><strong>Nez :</strong> Bouquet élégant de cerises noires, violette et touches d&apos;épices douces. Fond subtil de tabac blond et terre humide.</p>
        <p style={{ marginBottom: 12 }}><strong>Bouche :</strong> Attaque franche sur le fruit mûr. Milieu de bouche structuré par des tanins fins et une acidité vive typique du Sangiovese. Finale longue sur la cerise et le cuir.</p>
        <p style={{ marginBottom: 8 }}><strong>Accords :</strong> Bistecca alla fiorentina, pappardelle au ragù de sanglier, pecorino toscano affiné, aubergines alla parmigiana.</p>
        <p style={{ marginBottom: 0 }}><strong>Service :</strong> Carafage 30 minutes recommandé. Verre à Bourgogne.</p>
      </div>
      <p>La différence est visible en une seconde. Le caviste a envie d&apos;ouvrir la bouteille.</p>

      <div className="blog-divider" />

      {/* ===== SECTION 10 ===== */}
      <h2 id="faq">FAQ</h2>

      <BlogFAQ items={[
        { q: 'Quelle est la taille idéale d\'une fiche technique vin ?', a: 'Une page A4 recto. C\'est suffisant pour contenir toutes les informations essentielles. Au-delà, le document perd en efficacité — personne ne lit une fiche de 3 pages.' },
        { q: 'Faut-il une fiche par millésime ?', a: 'Oui. Le degré d\'alcool, les arômes et parfois l\'assemblage changent d\'un millésime à l\'autre. Envoyer une fiche du millésime 2022 pour vendre le 2023 est une erreur professionnelle.' },
        { q: 'Comment gérer les traductions pour l\'export ?', a: 'Si vous exportez, vos fiches doivent exister dans la langue du marché cible. L\'anglais est le minimum. L\'italien, l\'espagnol et l\'allemand sont un plus selon vos marchés. FicheVin génère les traductions automatiquement.' },
        { q: 'Quel format de fichier utiliser ?', a: 'PDF. C\'est le seul format qui garantit que la mise en page sera identique sur tous les écrans et à l\'impression. Évitez Word (mise en page instable), JPG (pas imprimable proprement) et les liens web (pas consultables hors connexion).' },
        { q: 'Combien coûte la création de fiches techniques ?', a: 'En interne : gratuit mais 30 min/fiche. Par un freelance : 30 à 50€/fiche. Via un outil automatisé comme FicheVin : à partir de 9€/fiche à l\'unité ou fiches illimitées à 490€/mois.' },
      ]} />

      <div className="blog-divider" />

      {/* ===== CONCLUSION ===== */}
      <h2>En résumé</h2>

      <p>Une fiche technique vin professionnelle contient 12 informations clés, une dégustation structurée en œil/nez/bouche, des accords mets-vins précis et un design qui représente votre marque. C&apos;est le premier outil de vente de vos commerciaux — et souvent le premier contact entre votre vin et un acheteur.</p>

      <p>Ne laissez pas vos vins être représentés par des PDF Word sans logo. Chaque référence de votre catalogue mérite une fiche à la hauteur.</p>

      <div className="blog-cta">
        <h3>Créez vos fiches en 2 minutes</h3>
        <p>FicheVin génère des fiches techniques complètes et professionnelles pour les importateurs et négociants de vin. Testez gratuitement sur 5 de vos vins.</p>
        <Link href="/#contact" className="blog-cta-button">Créer mes fiches gratuitement →</Link>
      </div>
    </>
  )
}
