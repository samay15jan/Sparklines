import { useEffect, useState } from 'react'
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

const ControllerButtons = () => {
  const [playerRef] = useRQGlobalState('playerRef', null)
  const [playbackDetails, setPlaybackDetails] =
    useRQGlobalState('playbackQueue')
  const [playing, setPlaying] = useState('')
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

  // Fisher-Yates shuffle / Knuth shuffle algorithm
  function shuffleItems(array) {
    const shuffledArray = array.slice()
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ]
    }
    return shuffledArray
  }

  // Check Playing
  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef?.data?.paused) {
        setPlaying(false)
      } else {
        setPlaying(true)
      }
    }, 1000)

    return () => clearInterval(interval)
  })

  // handle playback Controls
  useEffect(() => {
    if (!playerRef?.data) return
    if (playing) {
      playerRef?.data?.play()
    } else {
      playerRef?.data?.pause()
    }
  }, [playing, playerRef?.data])

  // handle Looping
  useEffect(() => {
    if (!playerRef?.data) return
    if (isLooping) {
      playerRef.data.loop = true
    }
    if (!isLooping && playerRef?.data?.loop) {
      playerRef.data.loop = false
    }
  }, [isLooping])

  // handle shuffle
  useEffect(() => {
    if (!playbackDetails?.data || !isShuffling) return
    const songs = playbackDetails?.data?.slice()
    const [firstItem, ...restItems] = songs
    const shuffledItems = shuffleItems(restItems)
    const newArray = [firstItem, ...shuffledItems]
    setPlaybackDetails(newArray)
  }, [isShuffling])

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
