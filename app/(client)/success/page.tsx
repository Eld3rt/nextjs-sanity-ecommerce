import { SuccessPage } from '@/pages/success'
import { stripe } from '@/shared/api'
import { notFound } from 'next/navigation'

interface Props {
  searchParams: Promise<{ session_id?: string }>
}

const Page: React.FC<Props> = async ({ searchParams }) => {
  const { session_id } = await searchParams

  if (!session_id) {
    notFound()
  }

  const session = await stripe.checkout.sessions.retrieve(session_id)
  const orderNumber = session.metadata?.orderNumber as string
  const orderDate = new Date(session.created * 1000).toLocaleDateString()
  const orderEmail = session.customer_details?.email ?? null

  return <SuccessPage orderNumber={orderNumber} orderDate={orderDate} orderEmail={orderEmail} />
}

export default Page
