import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import useRQGlobalState from '../../../utils/useRQGlobalState'

const Container = styled.div`
  ${tw`flex gap-2`}
`
const TimeLabel = styled.label`
  ${tw`mt-1 text-[12px] opacity-60`}
`
const SeekingBar = styled.input`
  ${tw`mt-3 w-[60vh]`}
  -webkit-appearance: none;
  -moz-appearance: none;
  border: solid 1px #4d4d4d;
  border-radius: 20px;
  height: 4px;
  outline: none;
  background-color: #4d4d4d;
  color: white;

  /* For Chrome/Safari */
  &::-webkit-slider-runnable-track {
    background-color: #121212;
    border: solid 1px #ffffff;
  }
  &:hover::-webkit-slider-runnable-track {
    background-color: #1db954;
    border: solid 1px #1db954;
  }
  &::-webkit-slider-thumb {
    opacity: 0;
  }
  &:hover::-webkit-slider-thumb {
    opacity: 1;
    width: 10px;
    height: 10px;
  }

  /* For Firefox */
  &::-moz-range-progress {
    background-color: #ffffff;
    border: solid 1px #ffffff;
  }
  &:hover::-moz-range-progress {
    background-color: #1db954;
    border: solid 1px #1db954;
  }

  &::-moz-range-thumb {
    opacity: 0;
  }
  &:hover::-moz-range-thumb {
    opacity: 1;
    width: 10px;
    height: 10px;
  }
`

const Seekbar = () => {
  const [playerRef] = useRQGlobalState('playerRef', null)
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef?.data) {
        setCurrentTime(playerRef.data.currentTime)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [playerRef])

  const handleSeekChange = (event) => {
    const newTime = parseFloat(event.target.value)
    if (playerRef?.data) {
      playerRef.data.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  function formatTime(time) {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    if ((!minutes, !seconds)) return
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <>
      {playerRef && (
        <Container>
          <TimeLabel>{formatTime(currentTime) || '0:00'}</TimeLabel>

          <SeekingBar
            type='range'
            min='0'
            max={playerRef?.data?.duration || 100}
            step='0.1'
            value={currentTime || 0}
            onChange={handleSeekChange}
          />

          <TimeLabel>
            {formatTime(playerRef?.data?.duration) || '0:00'}
          </TimeLabel>
        </Container>
      )}
    </>
  )
}

export default Seekbar
