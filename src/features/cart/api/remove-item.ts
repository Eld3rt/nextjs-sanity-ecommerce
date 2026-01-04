'use server'

import { getUserCart, getGuestCart } from '@/entities/cart'
import { createCart } from './create-cart'
import { currentUser } from '@clerk/nextjs/server'
import { backendClient } from '@/shared/api/sanity/backend-client'
import { Cart } from '@/sanity.types'
import { refresh } from 'next/cache'

export const removeItemFromCart = async (productId: string) => {
  const user = await currentUser()
  const cart = (user ? await getUserCart(user?.id) : await getGuestCart()) ?? (await createCart())

  const idx = cart.items.findIndex(item => item.product?._id === productId)

  try {
    if (idx >= 0) {
      if (cart.items[idx].quantity > 1) {
        await backendClient
          .patch(cart._id)
          .inc({ [`items[${idx}].quantity`]: -1 })
          .commit<Cart>()
      } else {
        await backendClient
          .patch(cart._id)
          .unset([`items[${idx}]`])
          .commit<Cart>()
      }
    }
  } catch (error) {
    console.error('Error removing item from cart:', error)
    throw error
  }
  refresh()
}
