import React, { useState, useEffect } from 'react'
import minifaker from 'minifaker'

export default function Suggestions() {
  const [suggestions, setSuggestions] = useState([])
  console.log('suggestions', suggestions)
  useEffect(() => {
    const suggestions = minifaker.array(5, (i) => ({
      username: minifaker.username({ locale: 'en' }).toLowerCase(),
      jobTitle: minifaker.jobTitle(),
      id: i,
      image: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`,
    }))
    setSuggestions(suggestions)
  }, [])
  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between mb-5 text-sm">
        <h3 className="font-bold text-gray-400">Suggestions for you</h3>
        <button className="text-gray-600 font-semibold">See all</button>
      </div>
      {
        suggestions.map((suggestion) => (
          <div key={suggestion.id} className="flex items-center justify-between mt-3">
            <img className="h-10 w-10 rounded-full object-cover p-[2px] border" src={suggestion.image} alt={suggestion.username} />
            <div className="flex-1 ml-4">
              <h2 className="font-semibold text-sm">{suggestion.username}</h2>
              <h3 className="text-gray-400 text-sm truncate max-w-[230px]">{suggestion.jobTitle}</h3>
            </div>
            <button className="text-blue-400 font-semibold text-sm">Follow</button>
          </div>
        ))
      }
    </div>
  )
}
