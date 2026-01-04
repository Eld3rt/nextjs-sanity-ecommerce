import { Container, PriceView } from '@/shared/ui'
import { AddToCartButton } from '@/features/cart'
import { urlFor } from '@/shared/api/sanity'
import { PRODUCTS_QUERY_RESULT } from '@/sanity.types'

interface Props {
  product: PRODUCTS_QUERY_RESULT[number]
}

const ProductPage: React.FC<Props> = ({ product }) => {
  return (
    <div className="md:pb-36">
      <Container className="flex flex-col md:flex-row gap-10 py-10">
        {product.image && (
          <div className="grid items-center group overflow-hidden rounded-md">
            <img
              src={urlFor(product.image).size(1000, 1000).url()}
              alt="productImage"
              className="w-full max-h-[550px] object-contain group-hover:scale-110 hoverEffect"
            />
          </div>
        )}
        <div className="w-full md:w-1/2 flex flex-col gap-5">
          <div>
            <p className="text-4xl font-bold mb-2">{product.name}</p>
          </div>
          <PriceView
            price={product.price}
            discount={product.discount}
            label={product.label}
            className="text-lg font-bold"
          />
          {product.stock && (
            <p className="bg-green-100 w-24 text-center text-green-600 text-sm py-2.5 font-semibold rounded-lg">
              In Stock
            </p>
          )}

          <p className="text-sm text-gray-600 tracking-wide">{product.description}</p>
          <div className="mt-auto">
            <AddToCartButton product={product} />
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <div className="w-[235px] border border-primaryYellow/20 text-center p-3 hover:border-primaryYellow hoverEffect rounded-md">
              <p className="text-base font-semibold text-black">Free Shipping</p>
              <p className="text-sm text-gray-500">Free shipping over order</p>
            </div>
            <div className="w-[235px] border border-primaryYellow/20 text-center p-3 hover:border-primaryYellow hoverEffect rounded-md">
              <p className="text-base font-semibold text-black">Flexible Payment</p>
              <p className="text-sm text-gray-500">Pay with Multiple Credit Cards</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export { ProductPage }

