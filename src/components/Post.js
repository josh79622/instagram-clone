import React, { useState  } from 'react'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid'
import { HeartIcon, ChatBubbleOvalLeftEllipsisIcon, BookmarkIcon, FaceSmileIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react';

import ImageSlider from './ImageSlider';
import Image from 'next/image';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';

export default function Post({id, username, userImage, images, caption}) {
  const { data: session } = useSession();
  const [comment, setComment] = useState('');
  const items = images ? images.map((image, index) => ({
    src: image,
    caption: caption,
    alt: `${caption} ${index + 1}`
  })) : []

  async function sendComment(event) {
    event.preventDefault();
    const commentToSend = comment
    setComment('');
    await addDoc(collection(db, 'posts', id, 'comments'), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    })
  }
  return (
    <div className="bg-white my-7 border rounded-md">
      {/* Post Header */}
      <div className="flex items-center p-5">
        <Image width={100} height={100} className='h-12 w-12 rounded-full object-cover border p-1 mr-3' src={userImage} alt={username}/>
        <p className="font-bold flex-1">{username}</p>
        <EllipsisHorizontalIcon className="h-5"/>
      </div>

      {/* Post Image */}
      <ImageSlider items={items} imageClassName="w-full h-[400px] object-contain"/>
      {/* <img src={images[0]} alt={caption} className="w-full h-[400px] object-contain"/> */}

      {/* Post Buttons */}
      {
        session &&
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            <HeartIcon className="btn"/>
            <ChatBubbleOvalLeftEllipsisIcon className="btn"/>
          </div>
          <BookmarkIcon className="btn"/>
        </div>
      }

      {/* Post Caption */}
      <p className="p-5 truncate">
        <span className="font-bold mr-2">{username}</span>
        {caption}
      </p>
      {/* Post Comments */}

      {/* Post Input Box */}
      {
        session &&
        <form action="" className="flex items-center p-4">
          <FaceSmileIcon className="h-7"/>
          <input value={comment} onChange={(e) => setComment(e.target.value)} className="border-none flex-1 focus:ring-0" type="text" placeholder="enter your comment" />
          <button onClick={sendComment} disabled={!comment.trim()} className="text-blue-400 font-bold disabled:text-blue-200">Post</button>
        </form>
      }
    </div>
  )
}
