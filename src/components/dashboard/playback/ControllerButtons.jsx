import React, { useState } from 'react'
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

const ButtonsContainer = styled.div`
  ${tw`flex justify-center gap-6 my-1`}
`

const ControllerButtons = ({ playing, setPlaying, currentPlayer }) => {
  const [isLooping, setLooping] = useState(null)
  const [isShuffling, setShuffling] = useState(null)
  const [isPrevious, setPrevious] = useState(null)
  const [isNext, setNext] = useState(null)

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
