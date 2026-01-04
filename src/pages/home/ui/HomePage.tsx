import { Container } from '@/shared/ui'
import { DiscountBanner } from '@/widgets/discount-banner'
import { CategorySelector } from '@/src/features/category'
import { ProductGrid } from '@/src/entities/product'
import { FilterProvider } from '@/src/features/product'
import { Category, Sale } from '@/sanity.types'
import { PRODUCTS_BY_CATEGORY_QUERY_RESULT } from '@/sanity.types'

interface Props {
  products: PRODUCTS_BY_CATEGORY_QUERY_RESULT
  categories: Category[]
  sales: Sale[]
  categoryFilter?: string
}

const HomePage: React.FC<Props> = ({ products, categories, sales, categoryFilter }) => {
  return (
    <Container>
      <DiscountBanner sales={sales} />
      <FilterProvider filterOption={categoryFilter}>
        <CategorySelector categories={categories} />
        <ProductGrid title={true} categoryFilter={categoryFilter} products={products} />
      </FilterProvider>
    </Container>
  )
}

export { HomePage }
