import { SearchPage } from '@/pages/search'
import { searchProductsByName } from '@/entities/product'

interface Props {
  searchParams: Promise<{ query?: string }>
}

const Page: React.FC<Props> = async ({ searchParams }) => {
  const { query } = await searchParams

  const products = query ? await searchProductsByName(query) : []

  return <SearchPage products={products} query={query} />
}

export default Page
