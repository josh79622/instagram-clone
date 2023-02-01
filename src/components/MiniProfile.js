import React from 'react'
import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image'

export default function MiniProfile() {
  const { data: session } = useSession()
  return (
    <div className="flex items-center mt-14 ml-10 justify-between">
      <Image width={100} height={100} src={session.user.image} alt="user-logo" className="h-16 w-16 border p-[2px] rounded-full object-cover cursor-pointer"/>
      <div className="flex-1 ml-4">
        <h2 className="font-bold">{session.user.username}</h2>
        <h3 className="text-gray-400 text-sm">{session.user.name}</h3>
      </div>
      <button onClick={signOut} className="font-semibold text-blue-400 text-sm">Sign out</button>
    </div>
  )
}
