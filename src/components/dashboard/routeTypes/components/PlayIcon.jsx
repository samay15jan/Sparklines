import React, { useState, useEffect } from 'react'
import { FaCirclePlay } from "react-icons/fa6"

const PlayIcon = (id) => {
  const [newId, setId] = useState('')

  useEffect(() => {
    localStorage.setItem('playback', JSON.stringify([newId]))
  }, [newId])

  return (
    <div>
      <FaCirclePlay
        size={55}
        color='#1ed760'
        onClick={() => setId(id.id)}
        className='absolute ml-1 bottom-[-80px] drop-shadow-3xl bg-black rounded-full transition ease-in-out delay-50 hover:-translate-1 duration-100 hover:scale-110'
      />
    </div>
  )
}

export default PlayIcon