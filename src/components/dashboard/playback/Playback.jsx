import React, { useEffect, useState, lazy } from 'react'
import { playbackSong } from '../../../utils/apiMethods'
import styled from 'styled-components'
import tw from 'twin.macro'
const AudioDetails = lazy(() => import('./AudioDetails'))
const AudioController = lazy(() => import('./AudioController'))
const AudioVisualizer = lazy(() => import('./AudioVisualizer'))

const Container = styled.div`${tw`fixed bottom-0 bg-black w-screen p-2 text-sm font-semibold`}`
const SubContainer = styled.div`${tw`grid grid-cols-3 justify-between`}`

const Playback = () => {
  const [data, setData] = useState()
  const [isPlaying, setPlaying] = useState(true)
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
      {
        data &&
        <SubContainer>
          <div className='flex'>
            <AudioDetails details={data.data[0]} />
            <AudioVisualizer show={isPlaying} />
          </div>
          <AudioController audioSrc={data.data[0].downloadUrl[4].link} returnPlaying={(value) => setPlaying(value)} />
        </SubContainer>
      }
    </Container>
  )
}

export default Playback