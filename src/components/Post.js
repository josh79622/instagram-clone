import React from 'react'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid'

export default function Post({id, username, userImage, images, caption}) {
  return (
    <div className="bg-white my-7 border rounded-md">
      {/* Post Header */}
      <div className="flex items-center p-5">
        <img className='h-12 w-12 rounded-full object-cover border p-1 mr-3' src={userImage} alt={username}/>
        <p className="font-bold flex-1">{username}</p>
        <EllipsisHorizontalIcon className="h-5"/>
      </div>

      {/* Post Image */}
      <img src={images[0]} alt={caption} className="w-full object-cover"/>
    </div>
  )
}
