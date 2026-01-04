import { HomePage } from '@/pages/home'
import { getAllProducts, getProductsByCategory } from '@/entities/product'
import { getAllCategories } from '@/entities/category'
import { getSales } from '@/entities/sale'

interface Props {
  searchParams: Promise<{ category?: string }>
}

const Page: React.FC<Props> = async ({ searchParams }) => {
  const { category } = await searchParams

  const [products, categories, sales] = await Promise.all([
    category ? getProductsByCategory(category) : getAllProducts(),
    getAllCategories(),
    getSales(),
  ])

  return <HomePage products={products} categories={categories} sales={sales} categoryFilter={category} />
}

export default Page
