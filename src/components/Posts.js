import { db } from '../../firebase'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { username } from 'minifaker'
import React, { useEffect, useState } from 'react'
import Post from './Post'

export default function Posts() {
  // const posts = [
  //   {
  //     id: "1",
  //     username: "josh.tsai",
  //     userImage: 'https://tractive.com/blog/wp-content/uploads/2016/04/puppy-care-guide-for-new-parents.jpg',
  //     images: [
  //       'https://images.unsplash.com/photo-1674582037808-7ca33039f3a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1775&q=80',
  //       'https://images.unsplash.com/photo-1674594430972-c3b9e6589e53?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
  //     ],
  //     caption: "Good day!"
  //   },
  //   {
  //     id: "2",
  //     username: "josh.tsai2",
  //     userImage: 'https://tractive.com/blog/wp-content/uploads/2016/04/puppy-care-guide-for-new-parents.jpg',
  //     images: ['https://images.unsplash.com/photo-1674594430972-c3b9e6589e53?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'],
  //     caption: "Cool!"
  //   },
  // ]
  const [posts, setPosts] = useState([])
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'posts'), orderBy('timestamp', 'desc')), (snapshot) => {
        setPosts(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
      }
    )
    return unsubscribe
  }, [])
  
  console.log('POSTS', posts)
  return (
    <div>
      {
        posts.map((post) => (
          <Post 
            key={post.id}
            id={post.id}
            username={post.username}
            userImage={post.profileImage}
            images={post.images}
            caption={post.caption}
          />
        ))
      }
    </div>
  )
}
