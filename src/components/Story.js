import { PlusCircleIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'

export default function Story({image, username, isUser}) {
  return (
    <div className="relative group cursor-pointer hover:scale-110">
      {
        isUser ?
        <Image width={100} height={100} className="rounded-full p-[1.5px] border border-red-500 border-2 transition-transform duration-200 ease-out" src={image} alt={username}/> :
        <img className="h-14 w-14 rounded-full p-[1.5px] border border-red-500 border-2 transition-transform duration-200 ease-out" src={image} alt={username}/>
      }
      { isUser && <PlusCircleIcon className="absolute h-5 top-10 right-0 text-blue-600 bg-white rounded-full"/>}
      <p className="truncate text-xs w-14">{username}</p>
    </div>
  )
}
