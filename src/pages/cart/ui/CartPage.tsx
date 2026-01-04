import { Container } from '@/shared/ui'
import { getGuestCart, getUserCart } from '@/src/entities/cart'
import { CartWithProducts } from './CartWithProducts'
import { EmptyCart } from './EmptyCart'

interface Props {
  user: {
    id: string
    fullName: string | null
    email: string
  } | null
}

const CartPage: React.FC<Props> = async ({ user }) => {
	const cart = user?.id ? await getUserCart(user.id) : await getGuestCart()

  return (
    <div className="bg-gray-50 pb-10">
      <Container className="min-h-screen">
        {cart && cart.items.length ? <CartWithProducts user={user} cart={cart} /> : <EmptyCart />}
      </Container>
    </div>
  )
}

export { CartPage }

