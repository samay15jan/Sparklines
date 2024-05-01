import React, { useRef, useEffect, useState } from 'react'
import { FaCirclePlay, FaCirclePause, FaRepeat, FaShuffle, FaForwardStep, FaBackwardStep, FaHeart } from "react-icons/fa6"

const AudioController = ({ audioSrc, returnPlaying }) => {
  const audioPlayer = useRef()
  const currentPlayer = audioPlayer?.current
  const [playing, isPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(null)
  const [isLooping, setLooping] = useState(null)
  const [isShuffling, setShuffling] = useState(null)
  const [isPrevious, setPrevious] = useState(null)
  const [isNext, setNext] = useState(null)
  const [isLiked, setLike] = useState(null)

  useEffect(() => {
    if (currentPlayer) {
      if (playing) {
        currentPlayer.play()
      } else {
        currentPlayer.pause()
      }
    }
    returnPlaying(playing)
  }, [playing])

  if (currentPlayer && playing) {
    setInterval(() => {
      const time = formatTime(currentPlayer.currentTime)
      setCurrentTime(time)
    }, 1000)
  }

  function formatTime(time) {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    const finalFormat = `${minutes}:${seconds.toString().padStart(2, '0')}`
    return finalFormat === 'NaN:NaN' ? '0:00' : finalFormat
  }

  function handleButtons(type) {
    if (type === 'shuffle') {
      setShuffling(!isShuffling)
    }
    if (type === 'previous') {
      setPrevious(!isPrevious)
    }
    if (type === 'next') {
      setNext(!isNext)
    }
    if (type === 'loop') {
      setLooping(!isLooping)
    }
    if (type === 'like') {
      setLike(!isLiked)
    }
  }

  return (
    <div className='flex justify-center'>
      <div className='grid grid-cols-1'>
        <div className='flex justify-center gap-6 my-1'>
          <FaShuffle size={20} style={isShuffling ? { color: '#1db954', marginTop: '10px' } : { opacity: 0.6, marginTop: '10px' }} onClick={() => handleButtons('shuffle')} />
          <FaBackwardStep size={25} style={isPrevious ? { color: '#1db954', marginTop: '8px' } : { opacity: 0.6, marginTop: '8px' }} onClick={() => handleButtons('previous')} />

          <button onClick={() => isPlaying(!playing)}>
            {playing ? <FaCirclePause size={35} /> : <FaCirclePlay size={35} />}
          </button>

          <FaForwardStep size={25} style={isNext ? { color: '#1db954', marginTop: '8px' } : { opacity: 0.6, marginTop: '8px' }} onClick={() => handleButtons('next')} />
          <FaRepeat size={20} style={isLooping ? { color: '#1db954', marginTop: '10px' } : { opacity: 0.6, marginTop: '10px' }} onClick={() => handleButtons('loop')} />
        </div>
        <div className='flex gap-2 opacity-60'>
          <label className='mt-1 text-[12px]'>{currentTime || '0:00'}</label>
          <input className='w-[60vh]' type="range" min="0" max={currentPlayer?.duration} value={currentPlayer?.currentTime.toFixed(0) || 0}
            onChange={(e) => {
              if (currentPlayer) {
                currentPlayer.currentTime = parseFloat(e.target.value);
              }
            }}
          />
          <label className='mt-1 text-[12px]'>{formatTime(currentPlayer?.duration)}</label>
        </div>
      </div>

      <audio ref={audioPlayer} src={audioSrc}></audio>
    </div>
  )
}

export default AudioController