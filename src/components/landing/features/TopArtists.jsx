import React, { lazy, useState, useEffect } from 'react'
import { FaPause, FaPlay } from "react-icons/fa6"
const AudioPlayer = lazy(() => import('../utils/AudioPlayer'))

const TopArtists = ({ response, image, menuName, menuIcon1, menuIcon2, heading, subHeading }) => {
  const [songDetails, setSongDetails] = useState('')
  const [showControls, setShowControls] = useState(false)
  const [play, setPlay] = useState(false)
  const songName = songDetails && songDetails.data[0].name
  const artistName = songDetails && songDetails.data[0].primaryArtists
  const songImage = songDetails && songDetails.data[0].image[1].link

  useEffect(() => {
    if(play){
      const playbackId = response && response.data.trending.songs[4].id
      localStorage.setItem('playback', playbackId)
    }
  }, [play])

  function trim(details) {
    return details?.length > 15 ? details?.substring(0, 15) + '...' : details?.substring(0, 15)
  }

  return (
    <div
      className='relative w-96 h-[550px] mt-20 bg-[#020f14] rounded-[50px]'
      onClick={() => setPlay(!play)}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div>
        {play
          ? <FaPause size={35} />
          : <FaPlay size={35} />
        }
      </div>
      <div>
        <div className='text-white opacity-80 text-sm font-bold absolute top-10 left-10 z-50 flex'>
          <button className='rounded-3xl border-2 py-1 px-2'>
            {menuName}
          </button>
          <button className='rounded-full border-2 py-1 px-2'>
            {menuIcon1}
          </button>
        </div>
        <button className='text-black text-4xl bg-white absolute right-5 top-5 z-50 p-4 rounded-full'>
          {menuIcon2}
        </button>
        <h1 className='text-white absolute z-50 left-10 bottom-24 max-w-60 text-3xl font-bold'>
          {heading}
        </h1>
        <p className='text-white opacity-80 absolute left-10 z-50 bottom-10 max-w-72 text-md font-semibold'>
          {subHeading}
        </p>
        <div className='absolute top-28 justify-center flex o2pacity-90'>
          <img
            className={'rounded-full w-1/2'}
            src={image}
          />
          <div className='w-24 rounded-r-full mt-3 bg-black bg-yellow-400' />
        </div>
      </div>
      <AudioPlayer songResponse={(data) => setSongDetails(data)} playingStatus={play} />
    </div>
  )
}

export default TopArtists