import { useEffect, lazy, useRef } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { useLocation } from 'react-router-dom'
import useRQGlobalState from '../../../utils/useRQGlobalState'
import { artistSongs, recommendedSongs } from '../../../api/apiMethods'
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
  const location = useLocation()
  let currentPath = location.pathname

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
    let isPublic = currentPath.startsWith('/public/')
    const songId = playbackDetails?.data[0]?.id
    const artistsId = playbackDetails?.data[0]?.primaryArtistsId?.split(',')
    const albumsResponse = isPublic
      ? await artistSongs(artistsId[0], 1, 'latest')
      : await recommendedSongs(songId)
    if (!isPublic && albumsResponse?.data) {
      const updatedData = [playbackDetails?.data[0], ...albumsResponse.data]

      setPlaybackDetails(updatedData)
    }

    if (isPublic && albumsResponse?.data?.results) {
      const updatedData = [playbackDetails?.data[0], ...albumsResponse?.data?.results]

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
        <div className='relative z-10 flex mt-10 ml-20 mr-40 justify-between'>
          <AudioController />
          <MenuButtons isPublic='true' />
          <VolumeController isPublic='true' />
        </div>
      )}
      <Player />
    </>
  )
}

export default Playback
