import { NextRequest, NextResponse } from "next/server";
import { generateWineAI } from "@/lib/ai-generate";

export async function POST(request: NextRequest) {
  try {
    const { nomVin, domaine, cepages, appellation, millesime, alcool, langue, extraInfo, vinification, colisage } =
      await request.json();

    if (!nomVin || !domaine) {
      return NextResponse.json(
        { error: "Le nom du vin et le domaine sont requis." },
        { status: 400 }
      );
    }

    const wineName = `${nomVin} ${domaine}`;
    const langCode = langue || "FR";

    // Build combined extraInfo with vinification and colisage
    let combinedExtra = extraInfo || "";
    if (vinification) {
      combinedExtra += `\n\nVinification / Élevage fourni par le client : ${vinification}`;
    }
    if (colisage) {
      combinedExtra += `\n\nColisage / Conditionnement : ${colisage}`;
    }

    const userFields = {
      grape: cepages || "",
      region: appellation || "",
      vintage: millesime || "",
      alcohol: alcool || "",
      extraInfo: combinedExtra,
    };

    const anthropicApiKey = process.env.ANTHROPIC_API_KEY;
    const perplexityApiKey = process.env.PERPLEXITY_API_KEY;

    if (!anthropicApiKey) {
      return NextResponse.json(
        { error: "Clé API Anthropic non configurée." },
        { status: 500 }
      );
    }

    const wineData = await generateWineAI(
      wineName,
      anthropicApiKey,
      perplexityApiKey || undefined,
      { userFields, langCode }
    ) as any;

    // ══════════════════════════════════════════════════════════════
    // FORCE USER FIELDS — L'utilisateur a TOUJOURS raison.
    // L'IA peut inventer des noms/valeurs différentes, on écrase.
    // ══════════════════════════════════════════════════════════════

    // Bug 1: Le champ "Domaine" doit TOUJOURS être celui de l'utilisateur
    if (domaine) wineData.domaine = domaine;

    // Le nom du vin tel que saisi
    if (nomVin) wineData.name = nomVin;

    // Millésime tel que saisi
    if (millesime) wineData.vintage = millesime;

    // Cépages tels que saisis
    if (cepages) wineData.grape = cepages;

    // Degré d'alcool tel que saisi
    if (alcool) wineData.alcohol = alcool;

    // Appellation/région telle que saisie
    if (appellation) wineData.region = appellation;

    // Bug 3: Extraire température/garde/carafage des infos supplémentaires
    // et écraser les valeurs IA si l'utilisateur les a fournies
    if (extraInfo) {
      // Température : cherche "XX-XX°C" ou "XX°C" dans extraInfo
      const tempMatch = extraInfo.match(/(\d{1,2}\s*[-–]\s*\d{1,2}\s*°\s*C)/i);
      if (tempMatch) wineData.temperature = tempMatch[1].replace(/\s+/g, '');

      // Garde : cherche des patterns comme "à boire dans l'année", "2025-2027", etc.
      const gardePatterns = [
        /garde\s*[:：]\s*([^\n.]+)/i,
        /à boire\s+([^\n.]+)/i,
        /drinking window\s*[:：]\s*([^\n.]+)/i,
      ];
      for (const pattern of gardePatterns) {
        const m = extraInfo.match(pattern);
        if (m) { wineData.garde = m[1].trim(); break; }
      }
    }

    // Add vinification and colisage as direct fields
    if (vinification) wineData.vinificationUser = vinification;
    if (colisage) wineData.colisage = colisage;

    return NextResponse.json({ wine: wineData });
  } catch (err) {
    console.error("Generate fiche direct error:", err);
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    return NextResponse.json(
      { error: `Erreur lors de la génération : ${message}` },
      { status: 500 }
    );
  }
}
