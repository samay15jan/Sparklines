import React, { useRef, useEffect, useState, lazy } from 'react'

const SeekBar = lazy(() => import('./Seekbar'))
const ControllerButtons = lazy(() => import('./ControllerButtons'))

const AudioController = ({ audioSrc, returnPlaying, returnPlayerRef }) => {
  const audioPlayer = useRef()
  const currentPlayer = audioPlayer?.current
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (currentPlayer) {
      if (playing) {
        currentPlayer.play()
      } else {
        currentPlayer.pause()
      }
    }
    returnPlaying(playing)
    returnPlayerRef(audioPlayer)
  }, [playing])

  return (
    <div className='flex justify-center'>
      <div className='grid grid-cols-1'>
          <ControllerButtons playing={playing} setPlaying={(e) => setPlaying(e)}/>
          <SeekBar currentPlayer={currentPlayer} playing={playing}/>
      </div>
      <audio ref={audioPlayer} src={audioSrc}></audio>
    </div>
  )
}

export default AudioController