'use client'

import { GUEST_CART_QUERY_RESULT, USER_CART_QUERY_RESULT } from '@/sanity.types'
import { createContext, useContext } from 'react'

type CartContextValue = {
  cart: USER_CART_QUERY_RESULT | GUEST_CART_QUERY_RESULT
}

interface Props {
  children: React.ReactNode
  cart: USER_CART_QUERY_RESULT | GUEST_CART_QUERY_RESULT
}

const CartContext = createContext<CartContextValue | null>(null)

export const useCartContext = () => {
  const value = useContext(CartContext)
  if (!value) throw new Error('CartContext is not found')
  return value
}

const CartProvider: React.FC<Props> = ({ cart, children }) => {
  return <CartContext.Provider value={{ cart }}>{children}</CartContext.Provider>
}

export { CartProvider }

