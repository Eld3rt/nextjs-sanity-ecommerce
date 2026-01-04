'use server'

import { getUserCart, getGuestCart } from '@/entities/cart'
import { createCart } from './create-cart'
import { currentUser } from '@clerk/nextjs/server'
import { backendClient } from '@/shared/api/sanity/backend-client'
import { refresh } from 'next/cache'

export const resetCart = async () => {
  const user = await currentUser()
  const cart = (user ? await getUserCart(user?.id) : await getGuestCart()) ?? (await createCart())

  await backendClient.patch(cart._id).set({ items: [] }).commit()

  refresh()
}
