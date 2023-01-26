import React from 'react'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid'
import { HeartIcon, ChatBubbleOvalLeftEllipsisIcon, BookmarkIcon, FaceSmileIcon } from '@heroicons/react/24/outline'

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

      {/* Post Buttons */}
      <div className="flex justify-between px-4 pt-4">
        <div className="flex space-x-4">
          <HeartIcon class="btn"/>
          <ChatBubbleOvalLeftEllipsisIcon class="btn"/>
        </div>
        <BookmarkIcon class="btn"/>
      </div>

      {/* Post Caption */}
      <p className="p-5 truncate">
        <span className="font-bold mr-2">{username}</span>
        {caption}
      </p>
      {/* Post Comments */}

      {/* Post Input Box */}
      <form action="" className="flex items-center p-4">
        <FaceSmileIcon className="h-7"/>
        <input className="border-none flex-1 focus:ring-0" type="text" placeholder="enter your comment"/>
        <button className="text-blue-400 font-bold">Post</button>
      </form>
    </div>
  )
}
