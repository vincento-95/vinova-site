import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { v4 as uuidv4 } from 'uuid'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

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
      // Convert base64 data URL to buffer
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

    // Insert e-label
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
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ slug: data.slug })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Erreur serveur' }, { status: 500 })
  }
}
