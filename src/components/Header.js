import Image from 'next/image'
import React from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function Header() {
  return (  
    <div className="flex items-center justify-between max-w-6xl">
      {/* Logo */}
      <div className=" cursor-pointer h-24 w-24 relative hidden lg:inline-grid">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png"
          layout='fill'
          className="object-contain"
          alt="LOGO"
        />
      </div>
      <div className=" cursor-pointer h-24 w-10 relative lg:hidden">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Instagram-Icon.png/1200px-Instagram-Icon.png"
          layout='fill'
          className="object-contain"
          alt="LOGO"
        />
      </div>
      {/* Search */}
      <div className="relative">
        <div className="absolute top-2 left-2">
          <MagnifyingGlassIcon className='w-5 text-gray-500'/>
        </div>
        <input type="text" className=" pl-10 border-gray-500 bg-gray-50 text-sm focus:ring-black focus:border-black rounded-md" placeholder='Search'/>
      </div>
      {/* Menu */}
      <div className="">Right</div>
    </div>
      
  )
}
