'use server'

import { defineQuery } from 'next-sanity'
import { sanityFetch } from '@/shared/api/sanity/fetch'

export const getAllCategories = async () => {
  const CATEGORIES_QUERY = defineQuery(`*[_type=="category"] | order(name asc)`)

  try {
    const categories = await sanityFetch({
      query: CATEGORIES_QUERY,
    })
    return categories || []
  } catch (error) {
    console.log('Error fetching all categories:', error)
    return []
  }
}
