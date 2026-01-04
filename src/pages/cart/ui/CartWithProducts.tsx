'use client'

import { GUEST_CART_QUERY_RESULT, USER_CART_QUERY_RESULT } from '@/sanity.types'
import { ShoppingBag } from 'lucide-react'
import { PriceFormatter, Separator, SubmitButton } from '@/shared/ui'
import Link from 'next/link'
import { CartItem } from '@/entities/cart'
import { createCheckoutSession, Metadata } from '@/features/checkout'
import { resetCart } from '@/features/cart'
import { ulid } from 'ulid'
import Form from 'next/form'

interface Props {
  user: {
    id: string
    fullName: string | null
    email: string
  } | null
  cart: NonNullable<USER_CART_QUERY_RESULT> | NonNullable<GUEST_CART_QUERY_RESULT>
}

type CartItem =
  | NonNullable<USER_CART_QUERY_RESULT>['items'][number]
  | NonNullable<GUEST_CART_QUERY_RESULT>['items'][number]

const CartWithProducts: React.FC<Props> = ({ cart, user }) => {
  const getSubTotalPrice = (items: CartItem[]) => {
    return items.reduce((total, item) => {
      const price = item.product.price ?? 0
      const discount = ((item.product.discount ?? 0) * price) / 100
      const discountedPrice = price + discount
      return total + discountedPrice * item.quantity
    }, 0)
  }

  const getTotalPrice = (items: CartItem[]) => {
    return items.reduce((total, item) => {
      return total + (item.product.price ?? 0) * item.quantity
    }, 0)
  }

  const handleCheckout = async () => {
    const metadata: Metadata = {
      orderNumber: ulid(),
      customerName: 'Unknown',
      customerEmail: null,
      clerkUserId: null,
    }

    try {
      if (user) {
        if (user.fullName) {
          metadata.customerName = user.fullName
        }
        metadata.clerkUserId = user.id
        metadata.customerEmail = user.email
      } else {
        metadata.customerName = 'Guest'
      }
      const checkoutUrl = await createCheckoutSession(cart.items, metadata)
      if (checkoutUrl) {
        resetCart()
        window.location.href = checkoutUrl
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
    }
  }

  return (
    <>
      <div className="flex items-center gap-2 py-5">
        <ShoppingBag className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-semibold">Shopping Cart</h1>
      </div>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 order-2 lg:order-1">
          <div className="inline-block w-full bg-white p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>SubTotal</span>
                <PriceFormatter amount={getSubTotalPrice(cart.items)} />
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <PriceFormatter amount={getSubTotalPrice(cart.items) - getTotalPrice(cart.items)} />
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <PriceFormatter amount={getTotalPrice(cart.items)} className="text-lg font-bold text-black" />
              </div>
              <Form action={handleCheckout}>
                <SubmitButton className="w-full">Proceed to Checkout</SubmitButton>
              </Form>
              <Link href="/" className="block text-center text-sm text-primary hover:underline">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 rounded-lg order-1 lg:order-2">
          <div className="grid grid-cols-5 md:grid-cols-6 border rounded-tr-lg rounded-tl-lg bg-white p-2.5 text-xs sm:text-base font-semibold text-center">
            <h2 className="col-span-2 md:col-span-3">Product</h2>
            <h2>Price</h2>
            <h2>Quantity</h2>
            <h2>Total</h2>
          </div>
          <div className="border bg-white border-t-0 rounded-br-lg rounded-bl-lg">
            {cart.items.map(item => {
              return <CartItem key={item._key} cartItem={item} />
            })}
            <Form action={resetCart}>
              <SubmitButton className="m-5 font-semibold" variant="destructive">
                Reset Cart
              </SubmitButton>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export { CartWithProducts }
