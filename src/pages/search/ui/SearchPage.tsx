import { Container } from '@/shared/ui'
import { FilterProvider } from '@/src/features/product'
import { ProductGrid } from '@/src/entities/product'
import { PRODUCTS_BY_CATEGORY_QUERY_RESULT } from '@/sanity.types'

interface Props {
  products: PRODUCTS_BY_CATEGORY_QUERY_RESULT
  query?: string
}

const SearchPage: React.FC<Props> = ({ products, query }) => {
  return (
    <Container className="min-h-screen">
      {products.length > 0 && (
        <h1 className="text-3xl font-bold mb-12 mt-18 text-center">
          Search results for <span className="text-primaryYellow">{query}</span>
        </h1>
      )}
      <FilterProvider filterOption={query}>
        <ProductGrid queryFilter={query} products={products} />
      </FilterProvider>
    </Container>
  )
}

export { SearchPage }
