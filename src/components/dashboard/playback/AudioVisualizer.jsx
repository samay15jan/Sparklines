import React, { useEffect, useState } from 'react'
import { Audio } from 'react-loader-spinner'
import useRQGlobalState from '../../../utils/useRQGlobalState'

const AudioVisualizer = () => {
  const [playerRef] = useRQGlobalState('playerRef', null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef?.data?.paused) {
        setShow(false)
      } else {
        setShow(true)
      }
    }, 1000)

    return () => clearInterval(interval)
  })

  return (
    <>
      {show ? (
        <Audio
          height='60'
          width='15'
          color='#1db954'
          ariaLabel='audio-loading'
          wrapperStyle={{ marginLeft: '10px', marginTop: '4px' }}
          wrapperClass='wrapper-class'
          visible={true}
        />
      ) : (
        ''
      )}
    </>
  )
}

export default AudioVisualizer
