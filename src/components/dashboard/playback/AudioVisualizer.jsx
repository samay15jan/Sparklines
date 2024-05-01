import React from 'react'
import { Audio } from 'react-loader-spinner'

const AudioVisualizer = ({ show }) => {
  return (
    <>
      {
        show ?
          <Audio
            height="60"
            width="15"
            color="#1db954"
            ariaLabel="audio-loading"
            wrapperStyle={{ marginLeft: '10px', marginTop: '4px' }}
            wrapperClass="wrapper-class"
            visible={true}
          />
          : ''
      }
    </>
  )
}

export default AudioVisualizer