import React from 'react'

export default function MiniProfile() {
  return (
    <div className="flex items-center mt-14 ml-10 justify-between">
      <img src="https://tractive.com/blog/wp-content/uploads/2016/04/puppy-care-guide-for-new-parents.jpg" alt="user-logo" class="h-16 w-16 border p-[2px] rounded-full object-cover cursor-pointer"/>
      <div className="flex-1 ml-4">
        <h2 className="font-bold">Josh Tsai</h2>
        <h3 className="text-gray-400 text-sm">Welcome to instagram</h3>
      </div>
      <button className="font-semibold text-blue-400 text-sm">Sign out</button>
    </div>
  )
}
