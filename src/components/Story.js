import React, { use } from 'react'

export default function Story({image, username}) {
  return (
    <div>
      <img className="h-14 rounded-full p-[1.5px] border border-red-500 border-2 cursor-pointer hover:scale-110 transition-transform duration-200 ease-out" src={image} alt={username}/>
      <p className="truncate text-xs w-14">{username}</p>
    </div>
  )
}
