import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { mergeCarts } from '@/features/cart'

export const GET = async (req: Request) => {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.redirect(new URL('/sign-in', req.url))
  }
  await mergeCarts(userId)
  return NextResponse.redirect(new URL('/', req.url))
}
