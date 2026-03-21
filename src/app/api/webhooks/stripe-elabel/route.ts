import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  // If webhook secret is configured, verify signature
  if (process.env.STRIPE_ELABEL_WEBHOOK_SECRET && signature) {
    try {
      stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_ELABEL_WEBHOOK_SECRET
      )
    } catch {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }
  }

  const event = JSON.parse(body)

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const slug = session.metadata?.elabel_slug

    if (slug) {
      await supabase
        .from('elabels')
        .update({ paid: true })
        .eq('slug', slug)
    }
  }

  return NextResponse.json({ received: true })
}
