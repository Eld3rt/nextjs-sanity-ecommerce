import { CartPage } from '@/pages/cart'
import { currentUser } from '@clerk/nextjs/server'

const Page = async () => {
  const user = await currentUser()

  const userInfo = user ? { id: user.id, fullName: user.fullName, email: user.emailAddresses[0].emailAddress } : null

  return <CartPage user={userInfo} />
}

export default Page
