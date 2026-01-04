import type { Metadata } from 'next'
import '../globals.css'
import { Header } from '@/widgets/header'
import { Footer } from '@/widgets/footer'
import { ClerkProvider } from '@clerk/nextjs'
import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity/visual-editing'
import { DisableDraftMode } from '@/app/providers'
import { SanityLive } from '@/shared/api/sanity/live'
import { Toaster } from 'sonner'
import { currentUser } from '@clerk/nextjs/server'
import { CartProvider } from '@/entities/cart'
import { getUserCart, getGuestCart } from '@/entities/cart'

export const metadata: Metadata = {
  title: 'HappyShop',
}

interface Props {
  children: React.ReactNode
}

const Layout: React.FC<Props> = async ({ children }) => {
  const user = await currentUser()
  const cart = user?.id ? await getUserCart(user.id) : await getGuestCart()
  return (
    <ClerkProvider>
      <div>
        <CartProvider cart={cart}>
          <Header />
          {children}
          <Toaster />
          {(await draftMode()).isEnabled && (
            <>
              <SanityLive />
              <VisualEditing />
              <DisableDraftMode />
            </>
          )}
          <Footer />
        </CartProvider>
      </div>
    </ClerkProvider>
  )
}

export default Layout
