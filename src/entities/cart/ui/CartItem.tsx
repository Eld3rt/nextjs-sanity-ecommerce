import { GUEST_CART_QUERY_RESULT, USER_CART_QUERY_RESULT } from '@/sanity.types'
import { urlFor } from '@/shared/api/sanity'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'
import { PriceFormatter, SubmitButton } from '@/shared/ui'
import { QuantityButtons, deleteProductFromCart } from '@/features/cart'
import Form from 'next/form'
import Link from 'next/link'

interface Props {
  cartItem: NonNullable<USER_CART_QUERY_RESULT>['items'][number] | NonNullable<GUEST_CART_QUERY_RESULT>['items'][number]
}

const CartItem: React.FC<Props> = ({ cartItem }) => {
  const deleteProductFromCartAction = deleteProductFromCart.bind(null, cartItem.product._id)

  return (
    <div key={cartItem.product._id} className="grid grid-cols-5 md:grid-cols-6 border-b p-1 sm:p-2.5 last:border-b-0">
      <div className="col-span-2 md:col-span-3 flex items-center">
        <Form action={deleteProductFromCartAction} className="px-2 py-1 sm:px-4 sm:py-2">
          <SubmitButton variant={null} className="group w-4 h-4 sm:w-5 sm:h-5 p-0 cursor-pointer">
            <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 mr-1 text-gray-500 group-hover:text-red-600 hoverEffect" />
          </SubmitButton>
        </Form>
        {cartItem.product.image && (
          <div className="hidden sm:block border p-0.5 sm:p-1 mr-2 rounded-md overflow-hidden group">
            <Image
              src={urlFor(cartItem.product.image).url()}
              alt="productImage"
              width={300}
              height={300}
              loading="lazy"
              className="w-10 h-10 md:w-full md:h-14 object-cover group-hover:scale-105 overflow-hidden transition-transform duration-500"
            />
          </div>
        )}
        <Link href={`/product/${cartItem.product.slug.current}`} className="text-xs sm:text-sm text-center">
          {cartItem.product.name}
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <PriceFormatter amount={cartItem.product.price} />
      </div>
      <QuantityButtons
        product={cartItem.product}
        itemCount={cartItem.quantity}
        className="text-xs sm:text-sm gap-0 sm:gap-1"
      />
      <div className="flex items-center justify-center">
        <PriceFormatter amount={cartItem.product.price * cartItem.quantity} />
      </div>
    </div>
  )
}

export { CartItem }
