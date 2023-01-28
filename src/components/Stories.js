import React, { useState, useEffect } from 'react'
import minifaker from 'minifaker'
import 'minifaker/locales/en'
import Story from './Story'
import { useSession } from 'next-auth/react'

export default function Stories() {
  const { data: session } = useSession()
  const [storyUsers, setStoryUsers] = useState([])
  useEffect(() => {
    const storyUsers = minifaker.array(20, (i) => ({
      username: minifaker.username({ locale: 'en' }).toLowerCase(),
      image: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`,
      id: i,
    }))
    setStoryUsers(storyUsers)
  }, [])
  return (
    <div className="flex space-x-2 p-6 bg-white mt-8 border border-gray-200 overflow-scroll rounded-sm scrollbar-none">
      { session && <Story username={session.user.username} image={session.user.image} isUser={true}/> }
      {
        storyUsers.map((user) => (
          <Story key={user.id} username={user.username} image={user.image} />
        ))
      }
    </div>
  )
}
