import React, { useEffect, useState, lazy } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { Helmet } from 'react-helmet-async'
import { useDocumentTitle } from '@uidotdev/usehooks'
import useRQGlobalState from '../../../utils/useRQGlobalState'
const AudioDetails = lazy(() => import('./AudioDetails'))
const AudioVisualizer = lazy(() => import('./AudioVisualizer'))
const AudioController = lazy(() => import('./AudioController'))
const MenuButtons = lazy(() => import('./MenuButtons'))
const VolumeController = lazy(() => import('./VolumeController'))

const Container = styled.div`
  ${tw`bg-black w-screen p-1 text-sm font-semibold`}
`
const SubContainer = styled.div`
  ${tw`grid grid-cols-3 justify-between`}
`

const Playback = ({ result }) => {
  const [data, setData] = useState(null)
  const [isPlaying, setPlaying] = useState(true)
  const [audioPlayer, setAudioPlayer] = useState(true)
  const currentPlayer = audioPlayer?.current

  const response = useRQGlobalState('playbackId', null)

  useEffect(() => {
    if (!response[0]?.isPending && response[0]?.data != null) {
      setData(response[0])
      result(response[0])
    }
  }, [response[0]?.pending, response[0]?.data])

  useDocumentTitle(data
    ? `${data?.data[0]?.name || 'unknown'} - ${data?.data[0]?.primaryArtists || 'unknown'}`
    : 'Sparklines - A music streaming platform'
  )

  return (
    <Container>
      <Helmet>
        <link
          rel='icon'
          type='image/png'
          href='/icons/favicon.png'
          sizes='16x16'
        />
      </Helmet>
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
