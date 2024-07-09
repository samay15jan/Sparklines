import React, { useEffect, useState } from 'react'
import {
  FaCirclePlay,
  FaCirclePause,
  FaRepeat,
  FaShuffle,
  FaForwardStep,
  FaBackwardStep,
} from 'react-icons/fa6'
import styled from 'styled-components'
import tw from 'twin.macro'
import useRQGlobalState from '../../../utils/useRQGlobalState'

const ButtonsContainer = styled.div`
  ${tw`flex justify-center gap-6 my-1`}
`

const ControllerButtons = ({ playerRef }) => {
  const [playing, setPlaying] = useState('')
  const [audioURL, setaudioURL] = useState('')
  const [isLooping, setLooping] = useState(false)
  const [isShuffling, setShuffling] = useState(false)
  const [isPrevious, setPrevious] = useState(false)
  const [isNext, setNext] = useState(false)

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
  }

  useEffect(() => {
    if(!playerRef.paused){
      setPlaying(true)
    }
  })
  // handle playback Controls
  useEffect(() => {
    if (!playerRef) return
    if (playing) {
      playerRef?.play()
    } else {
      playerRef?.pause()
    }

    if(playerRef?.currentSrc != audioURL){
      setaudioURL(playerRef?.currentSrc)
    }
  }, [playing, playerRef, audioURL])

  // handle Looping
  // useEffect(() => {
  //   if (isLooping) {
  //     playerRef?.loop = true
  //   }
  //   if (!isLooping && playerRef?.loop) {
  //     playerRef?.loop = false
  //   }
  // }, [isLooping])

  return (
    <ButtonsContainer>
      <FaShuffle
        size={20}
        style={
          isShuffling
            ? { color: '#1db954', marginTop: '10px' }
            : { opacity: 0.6, marginTop: '10px' }
        }
        onClick={() => handleButtons('shuffle')}
      />

      <FaBackwardStep
        size={25}
        style={
          isPrevious
            ? { color: '#1db954', marginTop: '8px' }
            : { opacity: 0.6, marginTop: '8px' }
        }
        onClick={() => handleButtons('previous')}
      />

      <button onClick={() => setPlaying(!playing)}>
        {playing ? <FaCirclePause size={35} /> : <FaCirclePlay size={35} />}
      </button>

      <FaForwardStep
        size={25}
        style={
          isNext
            ? { color: '#1db954', marginTop: '8px' }
            : { opacity: 0.6, marginTop: '8px' }
        }
        onClick={() => handleButtons('next')}
      />

      <FaRepeat
        size={20}
        style={
          isLooping
            ? { color: '#1db954', marginTop: '10px' }
            : { opacity: 0.6, marginTop: '10px' }
        }
        onClick={() => handleButtons('loop')}
      />
    </ButtonsContainer>
  )
}

export default ControllerButtons
