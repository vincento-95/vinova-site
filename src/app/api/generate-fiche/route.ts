import { NextRequest, NextResponse } from "next/server";
import { generateWineAI } from "@/lib/ai-generate";

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID manquant." },
        { status: 400 }
      );
    }

    // Verify payment via Stripe REST API
    const stripeRes = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${sessionId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        },
      }
    );

    const session = await stripeRes.json();

    if (!stripeRes.ok) {
      console.error("Stripe retrieve error:", session);
      return NextResponse.json(
        { error: "Session de paiement introuvable." },
        { status: 400 }
      );
    }

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Le paiement n'a pas été confirmé." },
        { status: 402 }
      );
    }

    const nomVin = session.metadata?.nomVin || "Vin inconnu";
    const domaine = session.metadata?.domaine || "Domaine inconnu";
    const wineName = `${nomVin} ${domaine}`;

    // Extract user-provided fields from metadata
    const userFields = {
      grape: session.metadata?.cepages || "",
      region: session.metadata?.appellation || "",
      vintage: session.metadata?.millesime || "",
      alcohol: session.metadata?.alcool || "",
      extraInfo: session.metadata?.extraInfo || "",
    };

    const langCode = session.metadata?.langue || "FR";

    const anthropicApiKey = process.env.ANTHROPIC_API_KEY;
    const perplexityApiKey = process.env.PERPLEXITY_API_KEY;

    if (!anthropicApiKey) {
      return NextResponse.json(
        { error: "Clé API Anthropic non configurée." },
        { status: 500 }
      );
    }

    // Generate wine data via AI pipeline
    const wineData = await generateWineAI(
      wineName,
      anthropicApiKey,
      perplexityApiKey || undefined,
      { userFields, langCode }
    );

    return NextResponse.json({ wine: wineData });
  } catch (err) {
    console.error("Generate fiche error:", err);
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    return NextResponse.json(
      { error: `Erreur lors de la génération : ${message}` },
      { status: 500 }
    );
  }
}
