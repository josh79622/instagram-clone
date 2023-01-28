import React from 'react'
import MiniProfile from './MiniProfile'
import Posts from './Posts'
import Stories from './Stories'
import Suggestions from './Suggestions'
import { useSession } from 'next-auth/react'
import classNames from 'classnames'

export default function Feed() {
  const { data: session } = useSession()
  return (
    <main className={classNames("grid grid-cols-1 mx-auto", {
      "md:grid-cols-3 md:max-w-6xl": session,
      "md:grid-cols-2 md:max-w-3xl": !session,
    })}>
      <section className="md:col-span-2">
        {/* Stories */}
        <Stories/>
        {/* Posts */}
        <Posts/>
      </section>
      {
        session ?
        <section className='hidden md:inline-grid md:col-span-1'>
          <div className="fixed w-[380px]">
            {/* Mini Profile */}
            <MiniProfile/>
            {/* Suggestions */}
            <Suggestions/>
          </div>
      </section> : ''
      }    
    </main>
  )
}
