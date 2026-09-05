import { useEffect, useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import useRQGlobalState from '../../../utils/useRQGlobalState'

const Container = styled.div`
  ${tw`flex w-full items-center gap-2 lg:gap-3`}
`
const TimeLabel = styled.label`
  ${tw`hidden text-[11px] opacity-60 tabular-nums lg:block lg:text-xs`}
`
const SeekingBar = styled.input`
  ${tw`w-full`}
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  height: 4px;
  border-radius: 20px;
  outline: none;
  cursor: pointer;

  /* Chrome / Safari / Edge */
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 4px;
    border-radius: 20px;
    background: ${({ $progress = 0 }) =>
      `linear-gradient(
        to right,
        #ffffff 0%,
        #ffffff ${$progress}%,
        #4d4d4d ${$progress}%,
        #4d4d4d 100%
      )`};
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    margin-top: -3px;

    width: 10px;
    height: 10px;
    border-radius: 50%;

    background-color: #ffffff;
    opacity: 0;
    transition: opacity 0.1s;
  }

  &:hover::-webkit-slider-thumb {
    opacity: 1;
  }

  /* Firefox */
  &::-moz-range-track {
    height: 4px;
    border-radius: 20px;
    background-color: #4d4d4d;
  }

  &::-moz-range-progress {
    height: 4px;
    border-radius: 20px;
    background-color: #ffffff;
  }

  &::-moz-range-thumb {
    width: 10px;
    height: 10px;
    border: none;
    border-radius: 50%;
    background-color: #ffffff;
    opacity: 0;
  }

  &:hover::-moz-range-thumb {
    opacity: 1;
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