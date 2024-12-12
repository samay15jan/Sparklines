import { useEffect, lazy, useRef } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useDocumentTitle } from '@uidotdev/usehooks'
import useRQGlobalState from '../../../utils/useRQGlobalState'
import { recommendedSongs } from '../../../api/apiMethods'
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
  const [playbackDetails, setPlaybackDetails] =
    useRQGlobalState('playbackQueue')
  const [currentSong, setCurrentSong] = useRQGlobalState('currentSong', null)
  const [id, setId] = useRQGlobalState('currentId', currentSong?.data?.id)

  useEffect(() => {
    if (!currentSong?.data) return
    setId(currentSong?.data?.id)
    if (!id) {
      setId(currentSong?.data?.id)
    }
  }, [currentSong, id])

  useEffect(() => {
    setPlayerRef(audioRef?.current)
  }, [audioRef?.current])

  useEffect(() => {
    if (!playbackDetails?.isPending && playbackDetails?.data != null) {
      setPlaybackDetails(playbackDetails?.data)
      setCurrentSong(playbackDetails?.data[0])
    }
  }, [playbackDetails?.isPending, playbackDetails?.data])

  // Handle Queue
  useEffect(() => {
    if (!audioRef?.current) return
    const audioElement = audioRef.current

    const handleSongEnd = async () => {
      if (!playbackDetails?.data) return
      const newData = playbackDetails?.data?.filter(
        (song) => song?.id != id?.data
      )
      setPlaybackDetails(newData)
      setCurrentSong(newData[0])
    }
    audioElement.addEventListener('ended', handleSongEnd)
  }, [audioRef?.current?.currentTime, playbackDetails?.data])

  // fetch new data for queue
  useEffect(() => {
    if (playbackDetails?.data?.length == 1) {
      fetchNewData()
    }
  }, [playbackDetails?.data])

  async function fetchNewData() {
    const songId = playbackDetails?.data[0]?.id
    const albumsResponse = await recommendedSongs(songId)
    if (albumsResponse?.data) {
      const updatedData = [playbackDetails?.data[0], ...albumsResponse.data]

      setPlaybackDetails(updatedData)
    }
  }

  return (
    <>
      {currentSong?.data?.downloadUrl && (
        <audio
          ref={audioRef}
          autoPlay
          src={currentSong?.data?.downloadUrl[4]?.link}
        ></audio>
      )}
    </>
  )
}

const Playback = ({ isPublic }) => {
  const [currentSong] = useRQGlobalState('currentSong', null)

  // Set Webpage Title
  useDocumentTitle(
    currentSong
      ? `${currentSong?.data?.name || 'unknown'} - ${currentSong?.data?.primaryArtists || 'unknown'}`
      : 'Sparklines - A music streaming platform'
  )

  return (
    <>
      {!isPublic && (
        <Container>
          <SubContainer>
            <div className='flex'>
              <AudioDetails />
              <AudioVisualizer />
            </div>
            <AudioController />
            <div className='flex'>
              <MenuButtons />
              <VolumeController />
            </div>
          </SubContainer>
        </Container>
      )}
      {isPublic && (
        <div className='relative z-10 flex mt-10 mx-20 justify-between'>
          <AudioController />
          <VolumeController isPublic='true' />
        </div>
      )}
      <Player />
    </>
  )
}

export default Playback
