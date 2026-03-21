import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'
import { v4 as uuidv4 } from 'uuid'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

function generateSlug(name: string): string {
  const base = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 50)
  return `${base}-${uuidv4().substring(0, 8)}`
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body.name || !body.alcoholContent) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
    }

    const slug = generateSlug(body.name)

    // Upload photo to Supabase Storage if provided
    let photoUrl: string | null = null
    if (body.photo) {
      const base64Data = body.photo.split(',')[1]
      if (base64Data) {
        const buffer = Buffer.from(base64Data, 'base64')
        const fileName = `${slug}.jpg`

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('elabel-photos')
          .upload(fileName, buffer, {
            contentType: 'image/jpeg',
            upsert: true,
          })

        if (!uploadError && uploadData) {
          const { data: urlData } = supabase.storage
            .from('elabel-photos')
            .getPublicUrl(fileName)
          photoUrl = urlData.publicUrl
        }
      }
    }

    // Insert e-label (unpaid)
    const { data, error } = await supabase
      .from('elabels')
      .insert({
        slug,
        wine_name: body.name,
        vintage: body.vintage || null,
        appellation: body.appellation || null,
        color: body.color || null,
        grape_varieties: body.grapeVarieties || [],
        alcohol_content: body.alcoholContent,
        residual_sugar: body.residualSugar || 0,
        total_acidity: body.totalAcidity || 0,
        ingredients: body.ingredients || [],
        nutrition: body.nutrition || {},
        allergens: body.allergens || [],
        languages: body.languages || ['fr'],
        photo_url: photoUrl,
        email: body.email || null,
        paid: false,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Create Stripe Checkout session
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.fichevin.fr'

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      ...(body.email ? { customer_email: body.email } : {}),
      line_items: [
        {
          price_data: {
            currency: 'eur',
            unit_amount: 300, // 3€
            product_data: {
              name: `E-label — ${body.name}`,
              description: 'E-label conforme UE avec QR code pour étiquette de vin',
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/e-label/succes?slug=${slug}`,
      cancel_url: `${baseUrl}/e-label?cancelled=true`,
      metadata: {
        elabel_slug: slug,
      },
    })

    return NextResponse.json({ checkoutUrl: session.url })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Erreur serveur' }, { status: 500 })
  }
}
