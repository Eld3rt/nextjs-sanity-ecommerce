'use server'

import { USER_CART_QUERY_RESULT } from '@/sanity.types'
import { backendClient } from '@/shared/api/sanity/backend-client'
import { currentUser } from '@clerk/nextjs/server'
import { cookies } from 'next/headers'

export const createCart = async () => {
  const user = await currentUser()
  const cookieStore = await cookies()

  let newCart: USER_CART_QUERY_RESULT

  if (user) {
    newCart = await backendClient.create({
      _type: 'cart',
      clerkUserId: user.id,
      items: [],
    })
  } else {
    newCart = await backendClient.create({
      _type: 'cart',
      clerkUserId: undefined,
      items: [],
    })

    cookieStore.set('localCartId', newCart._id, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
  }

  return newCart
}

