import { OrdersPage } from '@/pages/orders'
import { getOrders } from '@/entities/order'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const Page = async () => {
  const { userId } = await auth()
  if (!userId) {
    return redirect('/')
  }

  const orders = await getOrders(userId)

  return <OrdersPage orders={orders} />
}

export default Page
