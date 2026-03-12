import { NextRequest, NextResponse } from "next/server";
import { PRICE_PER_FICHE } from "@/lib/constants";

export async function POST(request: NextRequest) {
  try {
    const { nomVin, domaine, cepages, appellation, millesime, alcool, langue, extraInfo } =
      await request.json();

    if (!nomVin || !domaine) {
      return NextResponse.json(
        { error: "Le nom du vin et le domaine sont requis." },
        { status: 400 }
      );
    }

    const origin = request.headers.get("origin") || "http://localhost:3000";

    const params = new URLSearchParams();
    params.append("payment_method_types[]", "card");
    params.append("line_items[0][price_data][currency]", "eur");
    params.append("line_items[0][price_data][product_data][name]", `Fiche technique — ${nomVin}`);
    params.append("line_items[0][price_data][product_data][description]", `Domaine : ${domaine}`);
    params.append("line_items[0][price_data][unit_amount]", String(PRICE_PER_FICHE));
    params.append("line_items[0][quantity]", "1");
    params.append("mode", "payment");
    params.append("metadata[nomVin]", nomVin);
    params.append("metadata[domaine]", domaine);
    params.append("metadata[cepages]", cepages || "");
    params.append("metadata[appellation]", appellation || "");
    params.append("metadata[millesime]", millesime || "");
    params.append("metadata[alcool]", alcool || "");
    params.append("metadata[langue]", langue || "FR");
    params.append("metadata[extraInfo]", (extraInfo || "").slice(0, 500));
    params.append("success_url", `${origin}/?session_id={CHECKOUT_SESSION_ID}`);
    params.append("cancel_url", `${origin}/#generer`);

    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const session = await res.json();

    if (!res.ok) {
      console.error("Stripe API error:", session);
      return NextResponse.json(
        { error: session.error?.message || "Erreur Stripe" },
        { status: res.status }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    return NextResponse.json(
      { error: `Erreur lors de la création du paiement: ${message}` },
      { status: 500 }
    );
  }
}
