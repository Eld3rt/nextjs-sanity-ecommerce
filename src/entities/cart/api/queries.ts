'use server'

import { defineQuery } from 'next-sanity'
import { sanityFetch } from '@/shared/api/sanity/fetch'
import { cookies } from 'next/headers'

export const getUserCart = async (userId: string) => {
  if (!userId) {
    throw new Error('User ID is required')
  }

  const USER_CART_QUERY = defineQuery(`*[_type == "cart" && clerkUserId == $userId][0]{
      ...,"items": coalesce(
			items[]{
			...,product->{
			...,"categories": coalesce(
				categories[]->,
				[])}
			},
			[])
    	}`)

  try {
    const cart = await sanityFetch({
      query: USER_CART_QUERY,
      params: { userId },
    })
    return cart || null
  } catch (error) {
    console.error('Error fetching cart', error)
    return null
  }
}

export const getGuestCart = async () => {
  const cookieStore = await cookies()
  const localCartId = cookieStore.get('localCartId')?.value

  if (!localCartId) return null

  const GUEST_CART_QUERY = defineQuery(`*[_type == "cart" && _id == $localCartId][0]{
      ...,"items": coalesce(
			items[]{
			...,product->{
			...,"categories": coalesce(
				categories[]->,
				[])}
			},
			[])
    	}`)

  try {
    const cart = await sanityFetch({
      query: GUEST_CART_QUERY,
      params: { localCartId },
    })

    return cart
  } catch (error) {
    console.error('Error fetching cart', error)
    return null
  }
}

