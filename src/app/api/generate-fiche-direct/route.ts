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
    );

    // Add vinification and colisage as direct fields on the wine object
    if (vinification) (wineData as any).vinificationUser = vinification;
    if (colisage) (wineData as any).colisage = colisage;

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
