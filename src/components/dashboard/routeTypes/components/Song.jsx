import React, { useState } from 'react'
import useRQGlobalState from '../../../../utils/useRQGlobalState'
import { songDetails } from '../../../../api/apiMethods'
import { FaPlay } from 'react-icons/fa6'
import { MdExplicit } from 'react-icons/md'

const Song = ({ id, songData, index, name, artistName, time, explicit }) => {
  const [hover, setHover] = useState(false)
  const [data, setData] = useRQGlobalState('playbackId', null)

  const handleClick = async (id) => {
    const { data } = await songDetails(id)
    setData(data)
  }

  function formatTime(time) {
    if (time) {
      const minutes = Math.floor(time / 60)
      const seconds = Math.floor(time % 60)
      return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }
  }

  return (
    <div>
      <div
        className='hover:bg-[#353535] rounded-md py-2 px-5 pr-8 ml-7 mr-9 flex justify-between'
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => handleClick(songData?.id || id)}
      >
        <div className='flex gap-4'>
          <h1
            className={
              index + 1 < 10
                ? 'mr-3 pt-2 text-sm font-medium'
                : 'mr-1 pt-2 text-sm font-medium'
            }
          >
            {hover ? (
              <FaPlay className='mt-1 ml-[-6px] pl-1' size={12} />
            ) : (
              index + 1
            )}
          </h1>
          <div className='flex text-sm'>
            <div>
              <h1 className='font-bold'>
                {songData?.name || name || 'Unknown'}
              </h1>
              <h1 className='flex opacity-80'>
                {songData?.explicitContent == 1 ||
                  (explicit && <MdExplicit size={20} className='opacity-80' />)}
                {songData?.primaryArtists || artistName || 'Unknown'}
              </h1>
            </div>
          </div>
        </div>
        <h1 className='pt-2 font-medium mr-2 text-sm opacity-80'>
          {formatTime(songData?.duration) || time || '0:00'}
        </h1>
      </div>
    </div>
  )
}

export default Song
