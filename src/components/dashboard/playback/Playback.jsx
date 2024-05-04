import React, { useEffect, useState, lazy } from 'react'
import { playbackSong } from '../../../utils/apiMethods'
import styled from 'styled-components'
import tw from 'twin.macro'

const AudioDetails = lazy(() => import('./AudioDetails'))
const AudioVisualizer = lazy(() => import('./AudioVisualizer'))
const AudioController = lazy(() => import('./AudioController'))
const MenuButtons = lazy(() => import('./MenuButtons'))
const VolumeController = lazy(() => import('./VolumeController'))

const Container = styled.div`${tw`fixed bottom-0 bg-black w-screen p-2 text-sm font-semibold`}`
const SubContainer = styled.div`${tw`grid grid-cols-3 justify-between`}`

const Playback = () => {
  const [data, setData] = useState()
  const [isPlaying, setPlaying] = useState(true)
  const [audioPlayer, setAudioPlayer] = useState(true)
  const playbackId = localStorage.getItem('playback')

  useEffect(() => {
    if (playbackId) {
      getData()
    }
  }, [playbackId])

  async function getData() {
    const response = await playbackSong()
    setData(response)
  }

  return (
    <Container>
        <SubContainer>
          <div className='flex'>
            <AudioDetails details={data?.data[0]} />
            <AudioVisualizer show={isPlaying} />
          </div>
          <AudioController
            audioSrc={data?.data[0]?.downloadUrl[4].link}
            returnPlaying={(value) => setPlaying(value)}
            returnPlayerRef={(e) => setAudioPlayer(e)}
          />
          <div className='flex'>
            <MenuButtons />
            <VolumeController audioPlayer={audioPlayer} />
          </div>
        </SubContainer>
    </Container>
  )
}

export default Playback