import React, { useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { SlVolumeOff, SlVolume1, SlVolume2 } from "react-icons/sl"
import { FaExpandAlt } from "react-icons/fa"

const SeekingBar = styled.input`${tw`mt-3 w-[15vh]`}
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

const VolumeController = ({ audioPlayer }) => {
  const [currentVolume, setVolume] = useState(100)
  const currentPlayer = audioPlayer?.current

  return (
    <div className='flex gap-3 mt-5 absolute right-5'>
      <div className='mt-1 opacity-80'>
        {
          currentVolume > 0 && currentVolume < 50 && <SlVolume1 size={18} />
          || currentVolume >= 50 && <SlVolume2 size={18} />
          || currentVolume === 0 && <SlVolumeOff size={18} />
        }
      </div>

      <SeekingBar
        type="range"
        min="0"
        max="100"
        value={currentVolume}
        onChange={(e) => {
          if (currentPlayer) {
            currentPlayer.volume = parseFloat(e.target.value / 100).toFixed(1)
            const volume = currentPlayer.volume * 100
            setVolume(volume)
          }
        }}
      />
      <FaExpandAlt size={15} style={{ opacity:0.7, marginTop:'7px', marginLeft:'5px' }}/>
    </div>
  )
}

export default VolumeController