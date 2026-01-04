'use client'

import { ProductCard, ProductSkeleton } from '@/entities/product'
import { PRODUCTS_BY_CATEGORY_QUERY_RESULT } from '@/sanity.types'
import { useFilterContext } from '@/src/features/product'

interface Props {
  products: PRODUCTS_BY_CATEGORY_QUERY_RESULT
  categoryFilter?: string
  queryFilter?: string
  title?: boolean
}

const ProductGrid: React.FC<Props> = ({ products, categoryFilter, queryFilter, title }) => {
  const { isPending } = useFilterContext()

  if (queryFilter && !products.length) {
    return (
      <div className="bg-white p-8 min-w-full min-h-screen text-center">
        <h1 className="text-3xl font-bold mb-3 mt-18">
          No products found for: <span className="text-primaryYellow">{queryFilter}</span>
        </h1>
        <p className="text-gray-600">Try searching with different keywords</p>
      </div>
    )
  }

  if (categoryFilter && !products.length) {
    return (
      <div className="py-12 px-6 text-center text-gray-600">
        <h2 className="text-xl font-semibold mb-2">No products found</h2>
        <p className="text-sm">
          There are currently no products to display. Try a different category or check back later.
        </p>
      </div>
    )
  }

  return (
    <>
      {title && (
        <div className="pb-5">
          <h2 className="text-2xl font-semibold text-gray-600">
            Day of the <span className="text-primaryYellow">Deal</span>
          </h2>
          <p className="text-sm text-gray-500 font-thin">Don&apos;t wait. The time will never be just right.</p>
        </div>
      )}
      {isPending ? (
        <ProductSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-10">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </>
  )
}

export { ProductGrid }
