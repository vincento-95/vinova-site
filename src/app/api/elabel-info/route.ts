import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')

  if (!slug) return NextResponse.json({ error: 'Missing slug' }, { status: 400 })

  const { data } = await supabase
    .from('elabels')
    .select('wine_name')
    .eq('slug', slug)
    .single()

  return NextResponse.json({ wine_name: data?.wine_name || null })
}
