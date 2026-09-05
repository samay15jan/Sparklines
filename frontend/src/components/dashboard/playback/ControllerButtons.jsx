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
  ${tw`flex items-center justify-center gap-3 my-1 lg:gap-5`}
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
        className={`hidden w-5 h-5 cursor-pointer lg:block lg:w-6 lg:h-6 ${
          isShuffling ? 'text-[#1db954]' : 'opacity-60'
        }`}
        onClick={() => handleButtons('shuffle')}
      />

      <FaBackwardStep
        className={`hidden w-[25px] h-[25px] cursor-pointer lg:block lg:w-7 lg:h-7 ${
          isPrevious ? 'text-[#1db954]' : 'opacity-60'
        }`}
        onClick={() => handleButtons('previous')}
      />

      <button
        onClick={() => setPlaying(!playing)}
        className='flex min-h-11 min-w-11 items-center justify-center lg:min-h-0 lg:min-w-0'
        aria-label={playing ? 'Pause' : 'Play'}
      >
        {playing ? (
          <FaCirclePause className='w-[35px] h-[35px] lg:h-10 lg:w-10' />
        ) : (
          <FaCirclePlay className='w-[35px] h-[35px] lg:h-10 lg:w-10' />
        )}
      </button>

      <button
        onClick={() => handleButtons('next')}
        className='flex min-h-11 min-w-11 items-center justify-center lg:min-h-0 lg:min-w-0'
        aria-label='Next'
      >
        <FaForwardStep
          className={`w-[25px] h-[25px] lg:w-7 lg:h-7 ${
            isNext ? 'text-[#1db954]' : 'opacity-60'
          }`}
        />
      </button>

      <FaRepeat
        className={`hidden w-5 h-5 cursor-pointer lg:block lg:w-6 lg:h-6 ${
          isLooping ? 'text-[#1db954]' : 'opacity-60'
        }`}
        onClick={() => handleButtons('loop')}
      />
    </ButtonsContainer>
  )
}

export default ControllerButtons