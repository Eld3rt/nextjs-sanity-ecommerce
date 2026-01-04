'use server'

import { PRODUCTS_QUERY_RESULT } from '@/sanity.types'
import { getUserCart, getGuestCart } from '@/entities/cart'
import { backendClient } from '@/shared/api/sanity/backend-client'
import { cookies } from 'next/headers'

interface CartItem {
  product: PRODUCTS_QUERY_RESULT[number]
  quantity: number
}

export const mergeCarts = async (userId: string) => {
  const localCart = await getGuestCart()
  if (!localCart) return

  const cookieStore = await cookies()

  const userCart = await getUserCart(userId)

  if (userCart) {
    const mergedCartItems = mergeCartItems(localCart.items, userCart.items)
    try {
      await backendClient
        .transaction()
        .patch(userCart._id, { unset: ['items'] })
        .patch(userCart._id, {
          set: {
            items: mergedCartItems.map(item => ({
              product: { _type: 'reference', _ref: item.product._id },
              quantity: item.quantity,
            })),
          },
        })
        .delete(localCart._id)
        .commit({ autoGenerateArrayKeys: true })

      cookieStore.delete('localCartId')
    } catch (err) {
      throw new Error(
        'Failed to merge carts for existing user cart: ' + (err instanceof Error ? err.message : String(err))
      )
    }
  } else {
    try {
      await backendClient
        .transaction()
        .create({
          _type: 'cart',
          clerkUserId: userId,
          items: localCart.items.map(item => ({
            product: { _type: 'reference', _ref: item.product._id },
            quantity: item.quantity,
          })),
        })
        .delete(localCart._id)
        .commit({ autoGenerateArrayKeys: true })

      cookieStore.delete('localCartId')
    } catch (err) {
      throw new Error('Failed to create user cart during merge: ' + (err instanceof Error ? err.message : String(err)))
    }
  }
}

const mergeCartItems = (...cartItems: CartItem[][]): CartItem[] => {
  return cartItems.reduce((acc, items) => {
    items.forEach(item => {
      const existingItem = acc.find(i => i.product._id === item.product._id)
      if (existingItem) {
        existingItem.quantity += item.quantity
      } else {
        acc.push(item)
      }
    })
    return acc
  }, [] as CartItem[])
}
