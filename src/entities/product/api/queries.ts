'use server'

import { defineQuery } from 'next-sanity'
import { sanityFetch } from '@/shared/api/sanity/fetch'

export const getAllProducts = async () => {
  const PRODUCTS_QUERY = defineQuery(`*[_type=="product"] | order(name asc){
    ...,"categories": coalesce(
			categories[]->,
			[])
  }`)
  try {
    const products = await sanityFetch({
      query: PRODUCTS_QUERY,
    })
    return products || []
  } catch (error) {
    console.log('Error fetching all products:', error)
    return []
  }
}

export const getProductBySlug = async (slug: string) => {
  const PRODUCT_BY_ID_QUERY = defineQuery(
    `*[_type == "product" && slug.current == $slug] | order(name asc) [0]{
    ...,"categories": coalesce(
			categories[]->,
			[])
  }`
  )

  try {
    const product = await sanityFetch({
      query: PRODUCT_BY_ID_QUERY,
      params: {
        slug,
      },
    })
    return product || null
  } catch (error) {
    console.error('Error fetching product by ID:', error)
    return null
  }
}

export const searchProductsByName = async (searchParam: string) => {
  const PRODUCT_SEARCH_QUERY = defineQuery(
    `*[_type == "product" && name match $searchParam] | order(name asc){
    ...,"categories": coalesce(
			categories[]->,
			[])
  }`
  )

  try {
    const products = await sanityFetch({
      query: PRODUCT_SEARCH_QUERY,
      params: {
        searchParam: `${searchParam}`,
      },
    })
    return products || []
  } catch (error) {
    console.error('Error fetching products by name:', error)
    return []
  }
}

export const getProductsByCategory = async (categorySlug: string) => {
  const PRODUCTS_BY_CATEGORY_QUERY = defineQuery(
    `*[_type == 'product' && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(name asc){
    ...,"categories": coalesce(
			categories[]->,
			[])
  }`
  )
  try {
    const products = await sanityFetch({
      query: PRODUCTS_BY_CATEGORY_QUERY,
      params: {
        categorySlug,
      },
    })
    return products || []
  } catch (error) {
    console.error('Error fetching products by category:', error)
    return []
  }
}
