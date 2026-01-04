'use server'

import { stripe } from '@/shared/api'
import Stripe from 'stripe'
import { urlFor } from '@/shared/api/sanity'
import { GUEST_CART_QUERY_RESULT, USER_CART_QUERY_RESULT } from '@/sanity.types'

export interface Metadata {
  orderNumber: string
  customerName: string
  customerEmail: string | null
  clerkUserId: string | null
}

export const createCheckoutSession = async (
  items: NonNullable<USER_CART_QUERY_RESULT>['items'] | NonNullable<GUEST_CART_QUERY_RESULT>['items'],
  metadata: Metadata
) => {
  try {
    const itemsWithoutPrice = items.filter(item => !item.product.price)
    if (itemsWithoutPrice.length > 0) {
      throw new Error('Some items do not have a price')
    }
    let customerId: string | null = null

    if (metadata.customerEmail) {
      const customers = await stripe.customers.list({
        email: metadata.customerEmail,
        limit: 1,
      })

      if (customers.data.length > 0) {
        customerId = customers.data[0].id
      }
    }

    const sessionPayload: Stripe.Checkout.SessionCreateParams = {
      metadata: {
        orderNumber: metadata.orderNumber,
        customerName: metadata.customerName,
        clerkUserId: metadata.clerkUserId,
      },
      mode: 'payment',
      allow_promotion_codes: true,
      phone_number_collection: { enabled: true },
      payment_method_types: ['card'],
      line_items: items.map(item => ({
        price_data: {
          currency: 'USD',
          unit_amount: Math.round(item.product.price! * 100), // Convert to cents
          product_data: {
            name: item.product.name,
            description: item.product.description,
            metadata: { id: item.product._id },
            images: item.product.image ? [urlFor(item.product.image).url()] : undefined,
          },
        },
        quantity: item.quantity,
      })),
      success_url: `${
        process.env.NEXT_PUBLIC_BASE_URL || `https://${process.env.BASE_URL}`
      }/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: process.env.NEXT_PUBLIC_BASE_URL,
    }

    if (customerId) {
      sessionPayload.customer = customerId
    } else if (metadata.customerEmail) {
      sessionPayload.customer_email = metadata.customerEmail
      sessionPayload.customer_creation = 'always'
    } else {
      sessionPayload.customer_creation = 'always'
    }

    const session = await stripe.checkout.sessions.create(sessionPayload)

    return session.url
  } catch (error) {
    console.error('Error creating checkout session:', error)
    throw error
  }
}
