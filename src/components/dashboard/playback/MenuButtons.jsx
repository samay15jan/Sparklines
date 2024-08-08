import React, { useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { HiOutlineHeart } from 'react-icons/hi'
import { CgPlayButtonR } from 'react-icons/cg'
import { MdOutlineLyrics } from 'react-icons/md'
import { HiOutlineQueueList } from 'react-icons/hi2'
import { LuMonitorSpeaker } from 'react-icons/lu'
import useRQGlobalState from '../../../utils/useRQGlobalState'

const ButtonsContainer = styled.div`
  ${tw`mt-6 ml-20 flex justify-center gap-4 opacity-70`}
`

const MenuButtons = () => {
  const [selectedScreen, setSelectedScreen] = useRQGlobalState(
    'contentPlay',
    'nowPlaying'
  )
  const [isLike, setLiked] = useState(false)
  const [isShowNowPlaying, showNowPlaying] = useState(true)
  const [isShowLyrics, showLyrics] = useState(false)
  const [isShowqueue, showQueue] = useState(false)
  const [isDevices, setDevices] = useState(false)

  function handleButtons(type) {
    if (type === 'like') {
      setLiked(!isLike)
    }
    if (type === 'nowPlaying') {
      showNowPlaying(!isShowNowPlaying)
      showLyrics(false)
      showQueue(false)
      setSelectedScreen('nowPlaying')
    }
    if (type === 'lyrics') {
      showNowPlaying(false)
      showLyrics(!isShowLyrics)
      showQueue(false)
      setSelectedScreen('lyrics')
    }
    if (type === 'queue') {
      showNowPlaying(false)
      showLyrics(false)
      showQueue(!isShowqueue)
      setSelectedScreen('queue')
    }
    if (type === 'devices') {
      setDevices(!isDevices)
    }
  }

  return (
    <ButtonsContainer>
      <HiOutlineHeart
        size={20}
        onClick={() => handleButtons('like')}
        style={isLike ? { color: '#1db954' } : ''}
        className='cursor-pointer'
      />
      <CgPlayButtonR
        size={18}
        onClick={() => handleButtons('nowPlaying')}
        style={isShowNowPlaying ? { color: '#1db954' } : ''}
        className='cursor-pointer'
      />
      <MdOutlineLyrics
        size={18}
        onClick={() => handleButtons('lyrics')}
        style={isShowLyrics ? { color: '#1db954' } : ''}
        className='cursor-pointer'
      />
      <HiOutlineQueueList
        size={18}
        onClick={() => handleButtons('queue')}
        style={isShowqueue ? { color: '#1db954' } : ''}
        className='cursor-pointer'
      />
      <LuMonitorSpeaker
        size={18}
        onClick={() => handleButtons('devices')}
        style={isDevices ? { color: '#1db954' } : ''}
        className='cursor-pointer'
      />
    </ButtonsContainer>
  )
}

export default MenuButtons
