import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { v4 as uuidv4 } from 'uuid'

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

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

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
      console.error('Supabase insert error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Create Stripe Checkout session (using REST API like create-checkout-session)
    const origin = request.headers.get('origin') || 'https://www.fichevin.fr'

    const params = new URLSearchParams()
    params.append('payment_method_types[]', 'card')
    params.append('line_items[0][price_data][currency]', 'eur')
    params.append('line_items[0][price_data][product_data][name]', `E-label — ${body.name}`)
    params.append('line_items[0][price_data][product_data][description]', 'E-label conforme UE avec QR code')
    params.append('line_items[0][price_data][unit_amount]', '300')
    params.append('line_items[0][quantity]', '1')
    params.append('mode', 'payment')
    params.append('metadata[elabel_slug]', slug)
    if (body.email) params.append('customer_email', body.email)
    params.append('success_url', `${origin}/e-label/succes?slug=${slug}`)
    params.append('cancel_url', `${origin}/e-label?cancelled=true`)

    const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    })

    const session = await stripeRes.json()

    if (!stripeRes.ok) {
      console.error('Stripe API error:', session)
      return NextResponse.json({ error: session.error?.message || 'Erreur Stripe' }, { status: stripeRes.status })
    }

    return NextResponse.json({ checkoutUrl: session.url })
  } catch (err: any) {
    console.error('create-elabel error:', err.message || err)
    return NextResponse.json({ error: err.message || 'Erreur serveur' }, { status: 500 })
  }
}
