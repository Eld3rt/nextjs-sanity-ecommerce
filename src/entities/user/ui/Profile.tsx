'use client'

import { UserButton, useUser } from '@clerk/nextjs'
import { LoaderCircle } from 'lucide-react'

const Profile = () => {
  const { user, isLoaded } = useUser()

  if (!user) return null

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoaderCircle className="w-5 h-5 animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex items-center text-sm gap-2 border border-gray-200 px-2 py-1 rounded-md shadow-md">
      <UserButton />
      <div className="text-xs">
        <p className="text-gray-400">Welcome Back</p>
        <p className="font-bold">{user.fullName}</p>
      </div>
    </div>
  )
}

export { Profile }

