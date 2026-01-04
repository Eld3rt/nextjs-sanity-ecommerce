'use server'

import { defineQuery } from 'next-sanity'
import { sanityFetch } from '@/shared/api/sanity/fetch'

export const getSales = async () => {
  const SALE_QUERY = defineQuery(`*[_type == 'sale'] | order(name asc)`)
  try {
    const sales = await sanityFetch({
      query: SALE_QUERY,
    })
    return sales || []
  } catch (error) {
    console.error('Error fetching sales:', error)
    return []
  }
}
