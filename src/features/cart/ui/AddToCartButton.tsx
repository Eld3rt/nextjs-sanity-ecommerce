'use client'

import { PRODUCTS_QUERY_RESULT } from '@/sanity.types'
import { twMerge } from 'tailwind-merge'
import { PriceFormatter, SubmitButton } from '@/shared/ui'
import { QuantityButtons } from './QuantityButtons'
import { addItemToCart } from '../api'
import { useCartContext } from '@/entities/cart'
import Form from 'next/form'

interface Props {
  product: PRODUCTS_QUERY_RESULT[number]
  className?: string
}

const AddToCartButton: React.FC<Props> = ({ product, className }) => {
  const { cart } = useCartContext()

  const getItemCount = (productId: string) => {
    const item = cart?.items.find(item => item.product._id === productId)
    return item ? item.quantity : 0
  }
  const itemCount = getItemCount(product._id)

  const addItemToCartAction = addItemToCart.bind(null, product._id)

  return (
    <div className="h-12">
      {itemCount ? (
        <div className="text-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Quantity</span>
            <QuantityButtons product={product} itemCount={itemCount} />
          </div>
          <div className="flex items-center justify-between border-t pt-1">
            <span className="text-xs font-semibold">Subtotal</span>
            <PriceFormatter amount={product.price * itemCount} />
          </div>
        </div>
      ) : (
        <Form action={addItemToCartAction} className="h-full">
          <SubmitButton
            isDisabled={product.stock === 0}
            className={twMerge(
              'bg-primaryYellow/10 border text-black border-primaryYellow w-full py-2 mt-2 rounded-md font-medium hover:bg-primaryYellow hover:text-white hoverEffect disabled:hover:cursor-not-allowed disabled:hover:bg-primaryYellow/10 disabled:text-gray-400 disabled:hover:text-gray-400 disabled:border-primaryYellow/10',
              className
            )}
          >
            Add to cart
          </SubmitButton>
        </Form>
      )}
    </div>
  )
}

export { AddToCartButton }
