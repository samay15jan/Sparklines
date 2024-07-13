import React, { lazy } from 'react'
const SeekBar = lazy(() => import('./Seekbar'))
const ControllerButtons = lazy(() => import('./ControllerButtons'))

const AudioController = () => {

  return (
    <div className='flex justify-center'>
        <div className='grid grid-cols-1'>
          <ControllerButtons/>
          <SeekBar />
        </div>
    </div>
  )
}

export default AudioController
