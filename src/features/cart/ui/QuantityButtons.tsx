import { HiMinus, HiPlus } from 'react-icons/hi2'
import { PRODUCTS_QUERY_RESULT } from '@/sanity.types'
import { twMerge } from 'tailwind-merge'
import { addItemToCart, removeItemFromCart } from '../api'
import Form from 'next/form'
import { SubmitButton } from '@/shared/ui'

interface Props {
  product: PRODUCTS_QUERY_RESULT[number]
  itemCount: number
  className?: string
  borderStyle?: string
}

const QuantityButtons: React.FC<Props> = ({ product, itemCount, className, borderStyle }) => {
  const removeItemFromCartAction = removeItemFromCart.bind(null, product._id)
  const addItemToCartAction = addItemToCart.bind(null, product._id)

  return (
    <div className={twMerge('flex items-center justify-center gap-1 pb-1 text-base', borderStyle, className)}>
      <Form action={removeItemFromCartAction}>
        <SubmitButton
          variant="outline"
          size="icon"
          withoutLoader={true}
          className="w-4 h-4 sm:w-6 sm:h-6"
          isDisabled={itemCount === 0 || product.stock === 0}
        >
          <HiMinus />
        </SubmitButton>
      </Form>
      <span className="font-semibold w-4 sm:w-8 text-center text-primaryYellow">{itemCount}</span>
      <Form action={addItemToCartAction}>
        <SubmitButton
          variant="outline"
          size="icon"
          withoutLoader={true}
          className="w-4 h-4 sm:w-6 sm:h-6"
          isDisabled={product.stock === 0}
        >
          <HiPlus />
        </SubmitButton>
      </Form>
    </div>
  )
}

export { QuantityButtons }

