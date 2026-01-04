'use server'

import { getUserCart, getGuestCart } from '@/entities/cart'
import { createCart } from './create-cart'
import { currentUser } from '@clerk/nextjs/server'
import { backendClient } from '@/shared/api/sanity/backend-client'
import { refresh } from 'next/cache'

export const deleteProductFromCart = async (productId: string) => {
  const user = await currentUser()
  const cart = (user ? await getUserCart(user?.id) : await getGuestCart()) ?? (await createCart())

  const idx = cart.items.findIndex(item => item.product?._id === productId)

  await backendClient
    .patch(cart._id)
    .unset([`items[${idx}]`])
    .commit()

  refresh()
}
