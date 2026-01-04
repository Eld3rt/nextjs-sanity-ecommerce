'use server'

import { defineQuery } from 'next-sanity'
import { sanityFetch } from '@/shared/api/sanity/fetch'

export const getOrders = async (userId: string) => {
  if (!userId) {
    throw new Error('User ID is required')
  }
  const ORDERS_QUERY = defineQuery(`*[_type == 'order' && clerkUserId == $userId] | order(orderData desc){
    ...,"items": coalesce(
			items[]{
			...,product->
			},
			[])
  }`)

  try {
    const orders = await sanityFetch({
      query: ORDERS_QUERY,
      params: { userId },
    })
    return orders || []
  } catch (error) {
    console.error('Error fetching orders:', error)
    return []
  }
}
