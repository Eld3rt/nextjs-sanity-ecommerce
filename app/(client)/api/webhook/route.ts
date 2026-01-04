import { Metadata } from '@/features/checkout/api/create-session'
import { stripe } from '@/shared/api'
import { backendClient } from '@/shared/api/sanity/backend-client'
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export const POST = async (req: NextRequest) => {
  const body = await req.text()
  const headersList = await headers()
  const sig = headersList.get('stripe-signature')

  if (!sig) {
    return NextResponse.json(
      {
        error: 'No signature',
      },
      { status: 400 }
    )
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    console.log('Stripe webhook secret is not set')
    return NextResponse.json(
      {
        error: 'Stripe webhook secret is not set',
      },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return NextResponse.json(
      {
        error: `Webhook Error: ${error}`,
      },
      { status: 400 }
    )
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    try {
      await createOrderInSanity(session)
    } catch (error) {
      console.error('Error creating order in sanity:', error)
      return NextResponse.json(
        {
          error: `Error creating order: ${error}`,
        },
        { status: 400 }
      )
    }
  }
  return NextResponse.json({ received: true })
}

async function createOrderInSanity(session: Stripe.Checkout.Session) {
  const { id, amount_total, currency, metadata, payment_intent, customer, customer_details, total_details } = session

  const { orderNumber, customerName, clerkUserId } = metadata as unknown as Omit<Metadata, 'customerEmail'>

  const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(id, { expand: ['data.price.product'] })

  const sanityProducts = lineItemsWithProduct.data.map(item => ({
    _key: crypto.randomUUID(),
    product: {
      _type: 'reference',
      _ref: (item.price?.product as Stripe.Product)?.metadata?.id,
    },
    quantity: item.quantity || 0,
  }))

  if (!amount_total || !currency || !payment_intent || !customer || !customer_details?.email || !total_details) {
    throw new Error('Missing required Stripe session data')
  }

  await backendClient.create({
    _type: 'order',
    orderNumber,
    stripeCheckoutSessionId: id,
    stripePaymentIntentId: payment_intent,
    customerName,
    stripeCustomerId: customer,
    clerkUserId: clerkUserId || undefined,
    email: customer_details.email,
    currency,
    amountDiscount: total_details.amount_discount / 100,
    items: sanityProducts,
    totalPrice: amount_total / 100,
    status: 'paid',
    orderDate: new Date().toISOString(),
  })
}
