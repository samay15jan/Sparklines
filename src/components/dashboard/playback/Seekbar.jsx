import React, { useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

const Container = styled.div`${tw`flex gap-2`}`
const TimeLabel = styled.label`${tw`mt-1 text-[12px] opacity-60`}`
const SeekingBar = styled.input`${tw`mt-3 w-[60vh]`}
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
    border: solid 1px #FFFFFF;
  }
  &:hover::-webkit-slider-runnable-track {
    background-color: #1db954;
    border: solid 1px #1db954;
  }
  &::-webkit-slider-thumb{
    opacity: 0;
  }
  &:hover::-webkit-slider-thumb{
      opacity: 1;
      width: 10px;
      height: 10px;
  }

  /* For Firefox */
  &::-moz-range-progress {
    background-color: #FFFFFF;
    border: solid 1px #FFFFFF;
  }
  &:hover::-moz-range-progress {
    background-color: #1db954;
    border: solid 1px #1db954;
  }

  &::-moz-range-thumb{
    opacity: 0;
  }
  &:hover::-moz-range-thumb{
    opacity: 1;
    width: 10px;
    height: 10px;
  }
`

const Seekbar = ({ currentPlayer, playing }) => {
  const [currentTime, setCurrentTime] = useState(null)

  if (currentPlayer && playing) {
    setInterval(() => {
      const time = formatTime(currentPlayer.currentTime)
      setCurrentTime(time)
    }, 1000)
  }

  function formatTime(time) {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    const finalFormat = `${minutes}:${seconds.toString().padStart(2, '0')}`
    return finalFormat === 'NaN:NaN' ? '0:00' : finalFormat
  }

  return (
    <Container>
      <TimeLabel>
        {currentTime || '0:00'}
      </TimeLabel>

      <SeekingBar
        type="range"
        min="0"
        max={currentPlayer?.duration}
        value={currentPlayer?.currentTime.toFixed(0) || 0}
        onChange={(e) => {
          if (currentPlayer) {
            currentPlayer.currentTime = parseFloat(e.target.value);
          }
        }}
      />

      <TimeLabel>
        {formatTime(currentPlayer?.duration)}
      </TimeLabel>
    </Container>
  )
}

export default Seekbar