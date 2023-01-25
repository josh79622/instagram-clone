import React, { use } from 'react'

export default function Story({image, username}) {
  return (
    <div>
      <img src={image} alt={username}/>
      <p>{username}</p>
    </div>
  )
}
