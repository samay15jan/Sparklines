import React, { lazy } from 'react'
import useRQGlobalState from '../../../utils/useRQGlobalState'
const SeekBar = lazy(() => import('./Seekbar'))
const ControllerButtons = lazy(() => import('./ControllerButtons'))

const AudioController = () => {
  const [playerRef] = useRQGlobalState('playerRef')

  return (
    <div className='flex justify-center'>
      {playerRef?.data &&
        <div className='grid grid-cols-1'>
          <ControllerButtons playerRef={playerRef?.data} />
          <SeekBar playerRef={playerRef?.data} />
        </div>
      }
    </div>
  )
}

export default AudioController
