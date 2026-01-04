import { getUserCart, getGuestCart } from '@/entities/cart'
import Link from 'next/link'
import { MdOutlineShoppingCart } from 'react-icons/md'

interface Props {
  userId?: string
}
const CartIcon: React.FC<Props> = async ({ userId }) => {
  const cart = userId ? await getUserCart(userId) : await getGuestCart()
  return (
    <Link
      href={'/cart'}
      className="flex items-center text-sm gap-2 border border-gray-200 px-2 py-1 rounded-md shadow-md hover:shadow-none hoverEffect"
    >
      <MdOutlineShoppingCart className="text-2xl text-primaryYellow" />
      <div className="flex flex-col">
        <p className="text-xs">
          <span className="font-semibold">{cart?.items.length ? cart.items.length : 0} </span>
          items
        </p>
        <p className="font-semibold">Cart</p>
      </div>
    </Link>
  )
}

export { CartIcon }
