import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Moment from 'react-moment';
import Heart from './Heart';
import { collection, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useSession } from 'next-auth/react';

export default function Comment({comment, postId}) {
  const { data: session } = useSession()
  const [hasLike, setHasLike] = useState(false)
  const [likes, setLikes] = useState([])
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'posts', postId, 'comments', comment.id, 'likes'), (snapshot) => {
        console.log('LIKE!!!!!!!!!')
        setLikes(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
      }
    )
    return unsubscribe
  }, [postId, comment])
  useEffect(() => {
    setHasLike(!!likes.find((like) => like.id === session?.user.uid))
  }, [likes, session])
  async function likeComment() {
    if (hasLike) {
      await deleteDoc(doc(db, 'posts', postId, 'comments', comment.id, 'likes', session?.user.uid))
    } else {
      await setDoc(doc(db, 'posts', postId, 'comments', comment.id, 'likes', session?.user.uid), {
        username: session?.user.username,
      })
    }
  }
  return (
    <div key={comment.id} className="flex items-center space-x-2 mb-2">
      <Image width={100} height={100} src={comment.userImage} className='h-7 w-7 rounded-full object-cover' alt={comment.userImage}/>
      <p className="font-semibold">{comment.username}</p>
      <p className="flex-1 truncate">{comment.comment}</p>
      <Moment fromNow>{comment.timestamp?.toDate()}</Moment>
      {
        session && 
        <Heart onClick={likeComment} isFilled={hasLike} className=" w-3"/>
      }
    </div>
  )
}
