import React, { useEffect, lazy, useRef } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
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

const Player = () => {
  const audioRef = useRef()
  const [playerRef, setPlayerRef] = useRQGlobalState('playerRef', null)
  const [playbackDetails, setPlaybackDetails] = useRQGlobalState('playbackQueue', null)
  const [currentSong, setCurrentSong] = useRQGlobalState('currentSong', null)

  useEffect(() => {
    setPlayerRef(audioRef?.current)
  }, [audioRef])

  useEffect(() => {
    if (!playbackDetails?.isPending && playbackDetails?.data != null) {
      setPlaybackDetails(playbackDetails?.data)
      setCurrentSong(playbackDetails?.data[0])
    }
  }, [playbackDetails?.pending, playbackDetails?.data])

  // TODO = FIX AUTO QUEUE PLAYBACK

  // useEffect(() => {
  //   if (!audioRef?.current) return
  //   const audioElement = audioRef.current

  //   const handleSongEnd = () => {
  //     if (!playbackDetails && !currentSong) return
  //     const newData = playbackDetails?.data?.filter((song) => song?.id != currentSong?.data?.id)
  //     setPlaybackDetails(newData)
  //     setCurrentSong(newData[0])
  //   }
  //   audioElement.addEventListener('ended', handleSongEnd)
  // }, [audioRef])

  return (
    <>
      {currentSong &&
        <audio ref={audioRef} autoPlay src={currentSong?.data?.downloadUrl[4]?.link} ></audio>
      }
    </>
  )
}

const Playback = () => {
  const [currentSong, setCurrentSong] = useRQGlobalState('currentSong', null)

  // Set Webpage Title
  useDocumentTitle(currentSong
    ? `${currentSong?.data?.name || 'unknown'} - ${currentSong?.data?.primaryArtists || 'unknown'}`
    : 'Sparklines - A music streaming platform'
  )

  return (
    <Container>
      <SubContainer>
        <div className='flex'>
          <AudioDetails />
          <AudioVisualizer show={false} /> {/* fix it */}
        </div>
        <AudioController />
        <div className='flex'>
          <MenuButtons />
          <VolumeController />
        </div>
      </SubContainer>
      <Player />
    </Container>
  )
}

export default Playback
