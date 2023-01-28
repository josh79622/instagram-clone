import { PlusCircleIcon } from '@heroicons/react/24/solid'

export default function Story({image, username, isUser}) {
  return (
    <div className="relative group cursor-pointer hover:scale-110">
      <img className="h-14 rounded-full p-[1.5px] border border-red-500 border-2 transition-transform duration-200 ease-out" src={image} alt={username}/>
      { isUser && <PlusCircleIcon className="absolute h-5 top-10 right-0 text-blue-600 bg-white rounded-full"/>}
      <p className="truncate text-xs w-14">{username}</p>
    </div>
  )
}
