import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { HiOutlineHeart } from 'react-icons/hi'
import { CgPlayButtonR } from 'react-icons/cg'
import { MdOutlineLyrics } from 'react-icons/md'
import { HiOutlineQueueList } from 'react-icons/hi2'
import { LuMonitorSpeaker } from 'react-icons/lu'

const ButtonsContainer = styled.div`
  ${tw`mt-6 ml-20 flex justify-center gap-4 opacity-70`}
`

const MenuButtons = () => {
  return (
    <ButtonsContainer>
      <HiOutlineHeart size={20} />
      <CgPlayButtonR size={18} />
      <MdOutlineLyrics size={18} />
      <HiOutlineQueueList size={18} />
      <LuMonitorSpeaker size={18} />
    </ButtonsContainer>
  )
}

export default MenuButtons
