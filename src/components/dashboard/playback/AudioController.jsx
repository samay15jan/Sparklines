import { lazy } from 'react'
const SeekBar = lazy(() => import('./Seekbar'))
const ControllerButtons = lazy(() => import('./ControllerButtons'))

const AudioController = () => {
  return (
    <div className='flex justify-center lg:w-full'>
      <div className='grid grid-cols-1 lg:w-full lg:max-w-xl lg:justify-items-center lg:gap-1'>
        <ControllerButtons />
        <SeekBar />
      </div>
    </div>
  )
}

export default AudioController