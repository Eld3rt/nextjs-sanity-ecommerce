import Link from 'next/link'
import { ClerkLoaded } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { Container } from '@/shared/ui'
import Image from 'next/image'
import logo from '@/public/logo.jpg'
import { CartIcon } from '@/src/entities/cart'
import { BsBasket } from 'react-icons/bs'
import { FiUser } from 'react-icons/fi'
import { getOrders } from '@/entities/order'
import { Profile } from '@/src/entities/user'

const Header = async () => {
  const user = await currentUser()
  const userId = user?.id
  const orders = userId ? await getOrders(userId) : null

  return (
    <div className="bg-white sticky top-0 z-50 border-b border-b-gray-200 py-1">
      <Container>
        <header className="flex gap-2 flex-wrap justify-between items-center py-2">
          <Link href={'/'}>
            <Image src={logo} alt="logo" className="w-24" width={100} height={100} />
          </Link>
          <form action="/search" className="w-full sm:w-auto sm:flex-1 sm:mx-4 sm:mt-0">
            <input
              type="text"
              name="query"
              placeholder="Search for products"
              className="bg-gray-50 text-gray-800 px-4 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border border-gray-200 w-full max-w-4xl rounded-md hoverEffect"
            />
          </form>
          <div className="flex items-center space-x-4 sm:mt-0 flex-1 sm:flex-none flex-wrap gap-y-[1rem]">
            <CartIcon userId={userId} />
            <ClerkLoaded>
              {user && (
                <Link
                  href={'/orders'}
                  className="flex items-center text-sm gap-2 border border-gray-200 px-2 py-1 rounded-md shadow-md hover:shadow-none hoverEffect"
                >
                  <BsBasket className="text-2xl text-primaryYellow" />
                  <span className="flex flex-col">
                    <p className="text-xs">
                      <span className="font-semibold">{orders && orders.length > 0 ? orders.length : 0}</span> items
                    </p>
                    <p className="font-semibold">Orders</p>
                  </span>
                </Link>
              )}

              {user ? (
                <Profile />
              ) : (
                <Link
                  href={'/sign-in'}
                  className="flex items-center text-sm gap-2 border border-gray-200 px-2 py-1 rounded-md shadow-md cursor-pointer hover:shadow-none hoverEffect"
                >
                  <FiUser className="text-2xl text-primaryYellow" />
                  <span className="flex flex-col">
                    <p className="text-xs">Account</p>
                    <p className="font-semibold">Login</p>
                  </span>
                </Link>
              )}
            </ClerkLoaded>
          </div>
        </header>
      </Container>
    </div>
  )
}

export { Header }
