import { ProductPage } from '@/pages/product'
import { getProductBySlug } from '@/entities/product'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

const Page: React.FC<Props> = async ({ params }) => {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return notFound()
  }

  return <ProductPage product={product} />
}

export default Page
