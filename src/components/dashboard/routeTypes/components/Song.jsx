import React, { useState } from 'react'
import useRQGlobalState from '../../../../utils/useRQGlobalState'
import { songDetails } from '../../../../api/apiMethods'
import { FaPlay } from 'react-icons/fa6'
import { MdExplicit } from 'react-icons/md'

const Song = ({
  id,
  songData,
  index,
  name,
  artistName,
  time,
  explicit,
  type,
  menu,
}) => {
  const [hover, setHover] = useState(false)
  const [data, setData] = useRQGlobalState('playbackQueue', null)

  const handleClick = async (newId) => {
    const { data } = await songDetails(newId)
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
    <div className={menu === 'search' ? '' : 'ml-7 mr-9'}>
      <div
        className='hover:bg-[#353535] relative rounded-md py-2 px-5 pr-8 grid grid-cols-5 justify-between'
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => handleClick(songData?.id || id)}
      >
        <div
          className={
            menu === 'search'
              ? 'flex gap-4 col-span-3'
              : 'flex gap-4 col-span-4'
          }
        >
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
            {type && (
              <img
                className='w-10 mr-3 rounded-sm'
                src={songData?.image[2]?.link}
              />
            )}
            <div>
              <h1
                className={
                  type === 'artist' ? 'text-[16px] font-medium' : 'font-bold'
                }
              >
                {songData?.name || name || 'Unknown'}
              </h1>
              <h1 className='flex opacity-80'>
                {songData?.explicitContent == 1 ||
                  (explicit && <MdExplicit size={20} className='opacity-80' />)}
                {type != 'artist' && (
                  <>
                    {(songData?.primaryArtists?.length > 0 &&
                      songData?.primaryArtists[0]?.name) ||
                      songData?.primaryArtists ||
                      artistName ||
                      'Unknown'}
                  </>
                )}
              </h1>
            </div>
          </div>
        </div>
        <div
          className={
            menu === 'search'
              ? 'flex justify-between col-span-2'
              : 'absolute right-8'
          }
        >
          {menu === 'search' && (
            <h1 className='mt-3 text-sm font-medium opacity-80'>
              {songData?.album?.name}
            </h1>
          )}
          <h1 className='pt-2 font-medium mr-2 text-sm opacity-80'>
            {formatTime(songData?.duration) || time || '0:00'}
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Song
