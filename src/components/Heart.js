import React from 'react'
import { HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconFilled } from '@heroicons/react/24/solid'
import classNames from 'classnames'
export default function Heart({ isFilled = false, coverClass = false, className = '', FilledHeartClassName = '', HeartClassName = '', onClick = () => {} }) {
  return (
    <>
      { isFilled ? 
      <HeartIconFilled onClick={onClick} className={coverClass ? `${className} ${FilledHeartClassName}` : `btn text-red-400 ${className} ${FilledHeartClassName}`}/> : 
      <HeartIcon onClick={onClick} className={coverClass ? `${className} ${HeartClassName}` : `btn ${className} ${HeartClassName}`}/>}
    </>
  )
}
